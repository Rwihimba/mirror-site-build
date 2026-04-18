
## Goal
Build an automated candidate pipeline: application → branded email with assignment → reminders → Calendly scheduling → completion tracking, all configurable from the admin dashboard.

## Architecture

```text
Application submitted
   → trigger email (assignment instructions, dynamic vars, branded)
   → reminder cron (assignment deadline approaching / overdue)
   → candidate completes assignment → submits via tracked link
   → schedule-meeting email with Calendly link
   → reminder if not scheduled
   → all replies/notifications mirrored to info@minetech.co.rw
   → admin dashboard tracks status at every stage
```

## Database changes (migration)

New tables:
- `email_templates` — `key` (e.g. `assignment_invite`, `assignment_reminder`, `schedule_meeting`, `schedule_reminder`, `submission_received`), `subject`, `body_html` (with `{{variables}}`), `from_name`, `delay_minutes` (when to send after trigger), `is_active`, branding fields (logo_url, primary_color, signature_html).
- `pipeline_settings` — singleton row: `calendly_url`, `assignment_link`, `assignment_duration_hours`, `reminder_offsets_hours` (array), `notification_email` (default `info@minetech.co.rw`), `brand_logo_url`, `brand_primary_color`.
- `candidate_pipeline` — one row per `job_application_id`: `stage` (enum: `applied`, `assignment_sent`, `assignment_submitted`, `meeting_scheduled`, `completed`, `rejected`), `assignment_due_at`, `meeting_scheduled_at`, `calendly_event_url`, `submission_payload jsonb`, timestamps.
- `email_log` — record of every email sent: `application_id`, `template_key`, `to`, `status`, `sent_at`, `error`.
- `scheduled_emails` — queue: `application_id`, `template_key`, `send_at`, `status` (pending/sent/cancelled).

Trigger on `job_applications` insert → create `candidate_pipeline` row + enqueue `assignment_invite` (immediate or per template `delay_minutes`) + reminder schedule.

## Edge functions

- `send-pipeline-email` — renders template with variables, sends via Resend, logs to `email_log`, BCCs `info@minetech.co.rw`.
- `process-email-queue` — cron every 5 min: picks `scheduled_emails` where `send_at <= now()` and dispatches.
- `submit-assignment` — public endpoint candidate hits via tracked link to submit work; updates `candidate_pipeline.stage = assignment_submitted`, schedules `schedule_meeting` email, notifies admin.
- `calendly-webhook` — receives Calendly event payload, marks `meeting_scheduled`, stores event URL, cancels pending scheduling reminders.

Cron jobs (pg_cron) run `process-email-queue` every 5 minutes.

## Admin dashboard additions (new tab "Pipeline")

- **Email Templates editor**: list 5 default templates, edit subject/body with variable insert helper (`{{candidate_name}}`, `{{job_title}}`, `{{assignment_link}}`, `{{deadline}}`, `{{calendly_url}}`), preview pane, toggle active.
- **Pipeline Settings**: Calendly URL, assignment link, assignment duration (hours), reminder offsets, notification email, brand logo upload, primary color.
- **Candidates board**: kanban-style columns by stage; click candidate → see timeline (emails sent, submission, meeting), manual actions (resend email, advance stage, mark rejected).

## Required user input

Two pieces I need from you to wire this end-to-end:

1. **Resend API key** — to send branded emails. (We'll request it as a secret.)
2. **Calendly Personal Access Token** — to receive webhooks for meeting bookings. Optional if you're fine with just sending the link and tracking submissions manually.

## Files to create/edit

- `supabase/migrations/<new>.sql` — tables, enum, default template seeds, trigger, pg_cron job
- `supabase/functions/send-pipeline-email/index.ts`
- `supabase/functions/process-email-queue/index.ts`
- `supabase/functions/submit-assignment/index.ts`
- `supabase/functions/calendly-webhook/index.ts`
- `supabase/config.toml` — add 4 function blocks (`verify_jwt = false` for `submit-assignment` and `calendly-webhook`)
- `src/components/admin/PipelineSettings.tsx`
- `src/components/admin/EmailTemplatesEditor.tsx`
- `src/components/admin/CandidatesBoard.tsx`
- `src/pages/AdminDashboard.tsx` — add "Pipeline" tab with three sub-tabs
- `src/pages/AssignmentSubmit.tsx` + route — public page where candidate submits assignment via tracked link

## Questions before I build

1. **Email provider**: Resend (recommended, simple API key) or use Lovable's built-in email infrastructure (requires verifying a sender domain)?
2. **Calendly integration depth**: just embed/link the URL, or full webhook integration that auto-marks meetings as scheduled?
3. **Assignment submission**: candidates submit via a hosted form on your site (file upload + text), or just instructed to email back?
4. **Default reminder timing**: e.g. reminder at 50% of deadline + 1 reminder after deadline missed — confirm or specify your own.
