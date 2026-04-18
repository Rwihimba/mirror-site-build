-- Pipeline stage enum
CREATE TYPE public.pipeline_stage AS ENUM (
  'applied',
  'assignment_sent',
  'assignment_submitted',
  'meeting_scheduled',
  'completed',
  'rejected'
);

-- Email templates editable in admin
CREATE TABLE public.pipeline_email_templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text NOT NULL UNIQUE,
  name text NOT NULL,
  subject text NOT NULL,
  body_html text NOT NULL,
  from_name text NOT NULL DEFAULT 'MineTech Careers',
  delay_minutes integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Singleton pipeline settings
CREATE TABLE public.pipeline_settings (
  id integer PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  calendly_url text DEFAULT '',
  assignment_link text DEFAULT '',
  assignment_duration_hours integer NOT NULL DEFAULT 72,
  reminder_offsets_hours integer[] NOT NULL DEFAULT ARRAY[24, -2]::integer[],
  notification_email text NOT NULL DEFAULT 'info@minetech.co.rw',
  brand_logo_url text DEFAULT '',
  brand_primary_color text DEFAULT '#7A3E1A',
  brand_signature_html text DEFAULT '<p>The MineTech Team</p>',
  updated_at timestamptz NOT NULL DEFAULT now()
);

INSERT INTO public.pipeline_settings (id) VALUES (1);

-- Per-application pipeline state
CREATE TABLE public.candidate_pipeline (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id uuid NOT NULL UNIQUE REFERENCES public.job_applications(id) ON DELETE CASCADE,
  stage public.pipeline_stage NOT NULL DEFAULT 'applied',
  assignment_due_at timestamptz,
  meeting_scheduled_at timestamptz,
  calendly_event_url text,
  submission_payload jsonb,
  submission_token text UNIQUE DEFAULT encode(gen_random_bytes(24), 'hex'),
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Email send log scoped to pipeline
CREATE TABLE public.pipeline_email_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id uuid REFERENCES public.job_applications(id) ON DELETE CASCADE,
  template_key text NOT NULL,
  recipient text NOT NULL,
  subject text,
  status text NOT NULL DEFAULT 'sent',
  error text,
  sent_at timestamptz NOT NULL DEFAULT now()
);

-- Scheduled emails queue (separate from generic email queue)
CREATE TABLE public.pipeline_scheduled_emails (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id uuid NOT NULL REFERENCES public.job_applications(id) ON DELETE CASCADE,
  template_key text NOT NULL,
  send_at timestamptz NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  attempts integer NOT NULL DEFAULT 0,
  last_error text,
  created_at timestamptz NOT NULL DEFAULT now(),
  sent_at timestamptz
);

CREATE INDEX idx_scheduled_emails_due ON public.pipeline_scheduled_emails (status, send_at);
CREATE INDEX idx_pipeline_log_app ON public.pipeline_email_log (application_id, sent_at DESC);
CREATE INDEX idx_pipeline_stage ON public.candidate_pipeline (stage);

-- RLS
ALTER TABLE public.pipeline_email_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pipeline_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.candidate_pipeline ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pipeline_email_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pipeline_scheduled_emails ENABLE ROW LEVEL SECURITY;

-- Admins manage everything
CREATE POLICY "Admins manage templates" ON public.pipeline_email_templates
  FOR ALL TO authenticated USING (has_role(auth.uid(), 'admin')) WITH CHECK (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins manage settings" ON public.pipeline_settings
  FOR ALL TO authenticated USING (has_role(auth.uid(), 'admin')) WITH CHECK (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins manage candidate pipeline" ON public.candidate_pipeline
  FOR ALL TO authenticated USING (has_role(auth.uid(), 'admin')) WITH CHECK (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins read email log" ON public.pipeline_email_log
  FOR SELECT TO authenticated USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins manage scheduled emails" ON public.pipeline_scheduled_emails
  FOR ALL TO authenticated USING (has_role(auth.uid(), 'admin')) WITH CHECK (has_role(auth.uid(), 'admin'));

-- Updated_at triggers
CREATE TRIGGER trg_templates_updated BEFORE UPDATE ON public.pipeline_email_templates
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER trg_settings_updated BEFORE UPDATE ON public.pipeline_settings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER trg_pipeline_updated BEFORE UPDATE ON public.candidate_pipeline
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Trigger: when a job_application is inserted, create pipeline + schedule emails
CREATE OR REPLACE FUNCTION public.handle_new_application()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_settings public.pipeline_settings%ROWTYPE;
  v_due timestamptz;
  v_offset integer;
BEGIN
  SELECT * INTO v_settings FROM public.pipeline_settings WHERE id = 1;
  v_due := now() + make_interval(hours => COALESCE(v_settings.assignment_duration_hours, 72));

  INSERT INTO public.candidate_pipeline (application_id, stage, assignment_due_at)
  VALUES (NEW.id, 'applied', v_due);

  -- Immediate assignment invite
  INSERT INTO public.pipeline_scheduled_emails (application_id, template_key, send_at)
  VALUES (NEW.id, 'assignment_invite', now());

  -- Reminders relative to deadline
  IF v_settings.reminder_offsets_hours IS NOT NULL THEN
    FOREACH v_offset IN ARRAY v_settings.reminder_offsets_hours LOOP
      INSERT INTO public.pipeline_scheduled_emails (application_id, template_key, send_at)
      VALUES (
        NEW.id,
        CASE WHEN v_offset < 0 THEN 'assignment_overdue' ELSE 'assignment_reminder' END,
        v_due - make_interval(hours => v_offset)
      );
    END LOOP;
  END IF;

  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_new_application
  AFTER INSERT ON public.job_applications
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_application();

-- Seed default templates
INSERT INTO public.pipeline_email_templates (key, name, subject, body_html, delay_minutes) VALUES
('assignment_invite', 'Assignment Invitation',
 'Your next step at MineTech: {{job_title}} assignment',
 '<p>Hi {{candidate_name}},</p><p>Thank you for applying for the <strong>{{job_title}}</strong> role at MineTech. As the next step, please complete the assignment below by <strong>{{deadline}}</strong>.</p><p><a href="{{assignment_link}}" style="display:inline-block;padding:12px 20px;background:{{primary_color}};color:#fff;text-decoration:none;border-radius:4px">Open assignment</a></p><p>When you''re done, submit your work here: <a href="{{submission_link}}">{{submission_link}}</a></p>',
 0),
('assignment_reminder', 'Assignment Reminder',
 'Reminder: complete your {{job_title}} assignment',
 '<p>Hi {{candidate_name}},</p><p>This is a friendly reminder that your assignment for the <strong>{{job_title}}</strong> role is due on <strong>{{deadline}}</strong>.</p><p><a href="{{submission_link}}" style="display:inline-block;padding:12px 20px;background:{{primary_color}};color:#fff;text-decoration:none;border-radius:4px">Submit your assignment</a></p>',
 0),
('assignment_overdue', 'Assignment Overdue',
 'Last chance: {{job_title}} assignment',
 '<p>Hi {{candidate_name}},</p><p>We noticed your assignment deadline has passed. If you''re still interested, please submit as soon as possible.</p><p><a href="{{submission_link}}">Submit now</a></p>',
 0),
('submission_received', 'Submission Received',
 'We received your assignment',
 '<p>Hi {{candidate_name}},</p><p>Thanks — we''ve received your submission for <strong>{{job_title}}</strong>. Our team will review and get back to you shortly.</p>',
 0),
('schedule_meeting', 'Schedule Your Interview',
 'Schedule your interview for {{job_title}}',
 '<p>Hi {{candidate_name}},</p><p>Great work on the assignment! Please book a time that suits you for the next conversation.</p><p><a href="{{calendly_url}}" style="display:inline-block;padding:12px 20px;background:{{primary_color}};color:#fff;text-decoration:none;border-radius:4px">Pick a time</a></p>',
 0),
('schedule_reminder', 'Schedule Reminder',
 'Reminder: book your interview',
 '<p>Hi {{candidate_name}},</p><p>Just a quick nudge to book your interview slot.</p><p><a href="{{calendly_url}}">Pick a time</a></p>',
 0);
