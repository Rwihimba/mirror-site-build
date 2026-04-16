-- Popup analytics table
CREATE TABLE public.popup_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type TEXT NOT NULL CHECK (event_type IN ('impression', 'click', 'dismiss')),
  variant TEXT NOT NULL,
  intent TEXT NOT NULL,
  path TEXT NOT NULL,
  referrer TEXT,
  ab_bucket TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.popup_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can log popup events"
ON public.popup_events FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Admins can view popup events"
ON public.popup_events FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE INDEX idx_popup_events_created_at ON public.popup_events(created_at DESC);
CREATE INDEX idx_popup_events_variant ON public.popup_events(variant, event_type);