-- ============ JOBS + APPLICATIONS SYSTEM ============

-- 1. Jobs table
CREATE TABLE public.jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  department TEXT,
  location TEXT,
  employment_type TEXT,
  short_description TEXT,
  description JSONB NOT NULL DEFAULT '[]'::jsonb,
  form_schema JSONB NOT NULL DEFAULT '[]'::jsonb,
  is_published BOOLEAN NOT NULL DEFAULT false,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published jobs"
ON public.jobs FOR SELECT
USING (is_published = true);

CREATE POLICY "Admins can view all jobs"
ON public.jobs FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can insert jobs"
ON public.jobs FOR INSERT
TO authenticated
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update jobs"
ON public.jobs FOR UPDATE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete jobs"
ON public.jobs FOR DELETE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER update_jobs_updated_at
BEFORE UPDATE ON public.jobs
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX idx_jobs_published ON public.jobs(is_published, sort_order);
CREATE INDEX idx_jobs_slug ON public.jobs(slug);

-- 2. Job applications table
CREATE TABLE public.job_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id UUID NOT NULL REFERENCES public.jobs(id) ON DELETE CASCADE,
  applicant_name TEXT,
  applicant_email TEXT,
  responses JSONB NOT NULL DEFAULT '{}'::jsonb,
  cv_path TEXT,
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit an application"
ON public.job_applications FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Admins can view applications"
ON public.job_applications FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update applications"
ON public.job_applications FOR UPDATE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete applications"
ON public.job_applications FOR DELETE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER update_job_applications_updated_at
BEFORE UPDATE ON public.job_applications
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX idx_job_applications_job_id ON public.job_applications(job_id, created_at DESC);

-- 3. Storage bucket for CVs (private)
INSERT INTO storage.buckets (id, name, public)
VALUES ('job-applications', 'job-applications', false);

CREATE POLICY "Anyone can upload CVs"
ON storage.objects FOR INSERT
TO anon, authenticated
WITH CHECK (bucket_id = 'job-applications');

CREATE POLICY "Admins can read CVs"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'job-applications' AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete CVs"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'job-applications' AND has_role(auth.uid(), 'admin'::app_role));

-- 4. Seed the 8 existing jobs with default form schema
INSERT INTO public.jobs (slug, title, category, department, location, employment_type, short_description, description, form_schema, is_published, sort_order) VALUES
('senior-full-stack-engineer', 'Senior Full-Stack Engineer', 'Core Technical', 'Engineering', 'Kigali, Rwanda (Hybrid)', 'Full-time',
 'Build and scale our integrated mining platform.',
 '[
   {"heading":"About the Role","body":"Build and scale our integrated mining platform powering operations across Rwanda and beyond. You will work across the stack to ship reliable, field-ready software."},
   {"heading":"What You will Do","body":"Design and implement features end-to-end. Collaborate with mining domain experts. Improve performance and reliability of real-time data systems."},
   {"heading":"Requirements","body":"Strong experience with Flutter, Python, and cloud infrastructure. Experience with real-time data systems preferred. A bias toward shipping."}
 ]'::jsonb,
 '[
   {"id":"name","type":"text","label":"Full Name","required":true},
   {"id":"email","type":"email","label":"Email Address","required":true},
   {"id":"phone","type":"phone","label":"Phone Number","required":false},
   {"id":"github","type":"text","label":"GitHub Profile URL","required":false},
   {"id":"portfolio","type":"text","label":"Portfolio / LinkedIn","required":false},
   {"id":"cv","type":"file","label":"CV / Resume (PDF, DOC, DOCX)","required":true,"accept":".pdf,.doc,.docx"},
   {"id":"cover","type":"textarea","label":"Why do you want to join MineTech?","required":false}
 ]'::jsonb,
 true, 1),

('data-scientist-mining-intelligence', 'Data Scientist - Mining Intelligence', 'Core Technical', 'Engineering', 'Kigali, Rwanda (Hybrid)', 'Full-time',
 'Develop predictive models for grade control and safety monitoring.',
 '[
   {"heading":"About the Role","body":"Develop predictive models for grade control, safety monitoring, and operational efficiency in African mining contexts."},
   {"heading":"What You will Do","body":"Design models from real production data. Collaborate with engineering and operations. Translate domain knowledge into measurable outcomes."},
   {"heading":"Requirements","body":"Strong applied ML background. Mining domain knowledge a plus. Experience with geospatial data."}
 ]'::jsonb,
 '[
   {"id":"name","type":"text","label":"Full Name","required":true},
   {"id":"email","type":"email","label":"Email Address","required":true},
   {"id":"phone","type":"phone","label":"Phone Number","required":false},
   {"id":"github","type":"text","label":"GitHub Profile URL","required":false},
   {"id":"portfolio","type":"text","label":"Portfolio / LinkedIn","required":false},
   {"id":"cv","type":"file","label":"CV / Resume (PDF, DOC, DOCX)","required":true,"accept":".pdf,.doc,.docx"},
   {"id":"cover","type":"textarea","label":"Why do you want to join MineTech?","required":false}
 ]'::jsonb,
 true, 2),

('mobile-application-developer', 'Mobile Application Developer', 'Core Technical', 'Engineering', 'Kigali, Rwanda (Hybrid)', 'Full-time',
 'Build field-ready mobile solutions for mining operations.',
 '[
   {"heading":"About the Role","body":"Build field-ready mobile solutions used by mining teams in real operating conditions."},
   {"heading":"What You will Do","body":"Ship offline-first features. Work closely with field operators to refine UX. Integrate with backend services."},
   {"heading":"Requirements","body":"Flutter or React Native experience. Offline-first architecture experience. Pragmatic, user-focused mindset."}
 ]'::jsonb,
 '[
   {"id":"name","type":"text","label":"Full Name","required":true},
   {"id":"email","type":"email","label":"Email Address","required":true},
   {"id":"phone","type":"phone","label":"Phone Number","required":false},
   {"id":"github","type":"text","label":"GitHub Profile URL","required":false},
   {"id":"portfolio","type":"text","label":"Portfolio / LinkedIn","required":false},
   {"id":"cv","type":"file","label":"CV / Resume (PDF, DOC, DOCX)","required":true,"accept":".pdf,.doc,.docx"},
   {"id":"cover","type":"textarea","label":"Why do you want to join MineTech?","required":false}
 ]'::jsonb,
 true, 3),

('mining-operations-specialist', 'Mining Operations Specialist', 'Domain Expert', 'Operations', 'Rwanda (Field)', 'Full-time',
 'Bridge technology and mining operations.',
 '[
   {"heading":"About the Role","body":"Bridge technology and mining operations. Translate field realities into product requirements."},
   {"heading":"What You will Do","body":"Partner with engineering and clients. Lead site assessments. Define operational best practices."},
   {"heading":"Requirements","body":"Geology or Mining Engineering background. Experience in African mining contexts."}
 ]'::jsonb,
 '[
   {"id":"name","type":"text","label":"Full Name","required":true},
   {"id":"email","type":"email","label":"Email Address","required":true},
   {"id":"phone","type":"phone","label":"Phone Number","required":false},
   {"id":"portfolio","type":"text","label":"LinkedIn Profile","required":false},
   {"id":"cv","type":"file","label":"CV / Resume (PDF, DOC, DOCX)","required":true,"accept":".pdf,.doc,.docx"},
   {"id":"cover","type":"textarea","label":"Why do you want to join MineTech?","required":false}
 ]'::jsonb,
 true, 4),

('compliance-safety-systems-analyst', 'Compliance & Safety Systems Analyst', 'Domain Expert', 'Compliance', 'Kigali, Rwanda', 'Full-time',
 'Design digital compliance workflows aligned with Rwanda Mines Board.',
 '[
   {"heading":"About the Role","body":"Design digital compliance workflows aligned with Rwanda Mines Board and international safety standards."},
   {"heading":"What You will Do","body":"Map regulatory requirements to product features. Train clients on compliance workflows."},
   {"heading":"Requirements","body":"Mining safety certification preferred. Strong regulatory knowledge essential."}
 ]'::jsonb,
 '[
   {"id":"name","type":"text","label":"Full Name","required":true},
   {"id":"email","type":"email","label":"Email Address","required":true},
   {"id":"phone","type":"phone","label":"Phone Number","required":false},
   {"id":"portfolio","type":"text","label":"LinkedIn Profile","required":false},
   {"id":"cv","type":"file","label":"CV / Resume (PDF, DOC, DOCX)","required":true,"accept":".pdf,.doc,.docx"},
   {"id":"cover","type":"textarea","label":"Why do you want to join MineTech?","required":false}
 ]'::jsonb,
 true, 5),

('business-development-manager-mining', 'Business Development Manager - Mining Sector', 'Growth & Market', 'Business Development', 'Kigali, Rwanda', 'Full-time',
 'Drive partnerships with mining operations and cooperatives.',
 '[
   {"heading":"About the Role","body":"Drive partnerships with mining operations and cooperatives across East Africa."},
   {"heading":"What You will Do","body":"Build a qualified pipeline. Negotiate partnerships. Represent MineTech in the mining ecosystem."},
   {"heading":"Requirements","body":"Existing mining industry relationships valued. Rwanda or East Africa market knowledge."}
 ]'::jsonb,
 '[
   {"id":"name","type":"text","label":"Full Name","required":true},
   {"id":"email","type":"email","label":"Email Address","required":true},
   {"id":"phone","type":"phone","label":"Phone Number","required":false},
   {"id":"portfolio","type":"text","label":"LinkedIn Profile","required":false},
   {"id":"cv","type":"file","label":"CV / Resume (PDF, DOC, DOCX)","required":true,"accept":".pdf,.doc,.docx"},
   {"id":"cover","type":"textarea","label":"Why do you want to join MineTech?","required":false}
 ]'::jsonb,
 true, 6),

('customer-success-engineer', 'Customer Success Engineer', 'Growth & Market', 'Customer Success', 'Kigali, Rwanda (Hybrid)', 'Full-time',
 'Lead platform implementation and training.',
 '[
   {"heading":"About the Role","body":"Lead platform implementation and training, helping operations transition from paper-based systems."},
   {"heading":"What You will Do","body":"Onboard new clients. Build training materials. Collect product feedback from the field."},
   {"heading":"Requirements","body":"Strong technical and people skills. Experience supporting enterprise clients is a plus."}
 ]'::jsonb,
 '[
   {"id":"name","type":"text","label":"Full Name","required":true},
   {"id":"email","type":"email","label":"Email Address","required":true},
   {"id":"phone","type":"phone","label":"Phone Number","required":false},
   {"id":"portfolio","type":"text","label":"LinkedIn Profile","required":false},
   {"id":"cv","type":"file","label":"CV / Resume (PDF, DOC, DOCX)","required":true,"accept":".pdf,.doc,.docx"},
   {"id":"cover","type":"textarea","label":"Why do you want to join MineTech?","required":false}
 ]'::jsonb,
 true, 7),

('implementation-specialist', 'Implementation Specialist', 'Growth & Market', 'Customer Success', 'Rwanda (Travel required)', 'Full-time',
 'On-site deployment and training across mining sites in Rwanda.',
 '[
   {"heading":"About the Role","body":"On-site deployment and training across mining sites in Rwanda."},
   {"heading":"What You will Do","body":"Travel to sites. Deploy and configure the platform. Train field teams."},
   {"heading":"Requirements","body":"Willingness to travel. Bilingual English / Kinyarwanda required."}
 ]'::jsonb,
 '[
   {"id":"name","type":"text","label":"Full Name","required":true},
   {"id":"email","type":"email","label":"Email Address","required":true},
   {"id":"phone","type":"phone","label":"Phone Number","required":false},
   {"id":"languages","type":"checkbox","label":"Languages spoken","required":true,"options":["English","Kinyarwanda","French","Swahili"]},
   {"id":"portfolio","type":"text","label":"LinkedIn Profile","required":false},
   {"id":"cv","type":"file","label":"CV / Resume (PDF, DOC, DOCX)","required":true,"accept":".pdf,.doc,.docx"},
   {"id":"cover","type":"textarea","label":"Why do you want to join MineTech?","required":false}
 ]'::jsonb,
 true, 8);