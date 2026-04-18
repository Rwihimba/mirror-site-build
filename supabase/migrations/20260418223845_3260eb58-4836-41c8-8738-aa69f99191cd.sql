
-- Per-job pipeline config
ALTER TABLE public.jobs
  ADD COLUMN IF NOT EXISTS pipeline_enabled boolean NOT NULL DEFAULT true,
  ADD COLUMN IF NOT EXISTS assignment_instructions text,
  ADD COLUMN IF NOT EXISTS assignment_pdf_path text,
  ADD COLUMN IF NOT EXISTS assignment_link text,
  ADD COLUMN IF NOT EXISTS assignment_duration_hours integer,
  ADD COLUMN IF NOT EXISTS calendly_url text;

-- Update trigger function to respect per-job config and only run when enabled
CREATE OR REPLACE FUNCTION public.handle_new_application()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_settings public.pipeline_settings%ROWTYPE;
  v_job public.jobs%ROWTYPE;
  v_due timestamptz;
  v_offset integer;
  v_hours integer;
BEGIN
  SELECT * INTO v_job FROM public.jobs WHERE id = NEW.job_id;
  IF NOT COALESCE(v_job.pipeline_enabled, true) THEN
    RETURN NEW;
  END IF;

  SELECT * INTO v_settings FROM public.pipeline_settings WHERE id = 1;
  v_hours := COALESCE(v_job.assignment_duration_hours, v_settings.assignment_duration_hours, 72);
  v_due := now() + make_interval(hours => v_hours);

  INSERT INTO public.candidate_pipeline (application_id, stage, assignment_due_at)
  VALUES (NEW.id, 'applied', v_due);

  INSERT INTO public.pipeline_scheduled_emails (application_id, template_key, send_at)
  VALUES (NEW.id, 'assignment_invite', now());

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

-- Ensure trigger exists
DROP TRIGGER IF EXISTS trg_new_application ON public.job_applications;
CREATE TRIGGER trg_new_application
AFTER INSERT ON public.job_applications
FOR EACH ROW
EXECUTE FUNCTION public.handle_new_application();

-- Storage buckets
INSERT INTO storage.buckets (id, name, public)
VALUES ('assignment-files', 'assignment-files', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public)
VALUES ('assignment-submissions', 'assignment-submissions', false)
ON CONFLICT (id) DO NOTHING;

-- Public read for assignment briefs
DROP POLICY IF EXISTS "Public read assignment files" ON storage.objects;
CREATE POLICY "Public read assignment files" ON storage.objects
FOR SELECT USING (bucket_id = 'assignment-files');

-- Admins manage assignment files
DROP POLICY IF EXISTS "Admins manage assignment files" ON storage.objects;
CREATE POLICY "Admins manage assignment files" ON storage.objects
FOR ALL TO authenticated
USING (bucket_id = 'assignment-files' AND public.has_role(auth.uid(), 'admin'))
WITH CHECK (bucket_id = 'assignment-files' AND public.has_role(auth.uid(), 'admin'));

-- Anyone can upload submissions (candidates are anonymous via tracked link)
DROP POLICY IF EXISTS "Public upload submissions" ON storage.objects;
CREATE POLICY "Public upload submissions" ON storage.objects
FOR INSERT TO anon, authenticated
WITH CHECK (bucket_id = 'assignment-submissions');

-- Admins read submissions
DROP POLICY IF EXISTS "Admins read submissions" ON storage.objects;
CREATE POLICY "Admins read submissions" ON storage.objects
FOR SELECT TO authenticated
USING (bucket_id = 'assignment-submissions' AND public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins delete submissions" ON storage.objects;
CREATE POLICY "Admins delete submissions" ON storage.objects
FOR DELETE TO authenticated
USING (bucket_id = 'assignment-submissions' AND public.has_role(auth.uid(), 'admin'));
