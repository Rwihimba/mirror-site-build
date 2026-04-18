import { createClient } from 'npm:@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const SITE_NAME = 'MineTech Careers'
const SENDER_DOMAIN = 'notify.minetech.co.rw'
const FROM_DOMAIN = 'minetech.co.rw'
const ROOT_URL = 'https://minetech.co.rw'

function render(template: string, vars: Record<string, string>): string {
  return template.replace(/\{\{(\w+)\}\}/g, (_, k) => vars[k] ?? '')
}

function wrapEmail(bodyHtml: string, settings: any): string {
  const logo = settings.brand_logo_url
    ? `<img src="${settings.brand_logo_url}" alt="MineTech" style="height:40px;margin-bottom:24px"/>`
    : `<div style="font-family:Montserrat,Arial,sans-serif;font-weight:700;font-size:20px;color:${settings.brand_primary_color};margin-bottom:24px">MineTech</div>`
  return `<!DOCTYPE html><html><body style="margin:0;background:#f5f5f5;font-family:Montserrat,Arial,sans-serif;color:#222">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:32px 0">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background:#fff;padding:32px;border-radius:4px">
<tr><td>${logo}${bodyHtml}<hr style="border:none;border-top:1px solid #eee;margin:32px 0"/>${settings.brand_signature_html ?? ''}</td></tr>
</table></td></tr></table></body></html>`
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders })

  try {
    const { application_id, template_key } = await req.json()
    if (!application_id || !template_key) {
      return new Response(JSON.stringify({ error: 'Missing params' }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
    }

    const supabase = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!)

    const [{ data: app }, { data: tmpl }, { data: settings }, { data: pipeline }] = await Promise.all([
      supabase.from('job_applications').select('*, jobs(title)').eq('id', application_id).single(),
      supabase.from('pipeline_email_templates').select('*').eq('key', template_key).maybeSingle(),
      supabase.from('pipeline_settings').select('*').eq('id', 1).single(),
      supabase.from('candidate_pipeline').select('*').eq('application_id', application_id).maybeSingle(),
    ])

    if (!app || !tmpl || !settings) {
      return new Response(JSON.stringify({ error: 'Not found' }), { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
    }
    if (!tmpl.is_active) {
      return new Response(JSON.stringify({ skipped: 'template_inactive' }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
    }
    if (!app.applicant_email) {
      await supabase.from('pipeline_email_log').insert({ application_id, template_key, recipient: '', status: 'failed', error: 'no email' })
      return new Response(JSON.stringify({ error: 'No applicant email' }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
    }

    const submissionLink = pipeline?.submission_token
      ? `${ROOT_URL}/assignment/${pipeline.submission_token}`
      : ''

    const vars: Record<string, string> = {
      candidate_name: app.applicant_name || 'there',
      job_title: (app.jobs as any)?.title || 'the role',
      assignment_link: settings.assignment_link || '',
      submission_link: submissionLink,
      calendly_url: settings.calendly_url || '',
      deadline: pipeline?.assignment_due_at ? new Date(pipeline.assignment_due_at).toLocaleString() : '',
      primary_color: settings.brand_primary_color || '#7A3E1A',
    }

    const subject = render(tmpl.subject, vars)
    const bodyHtml = render(tmpl.body_html, vars)
    const html = wrapEmail(bodyHtml, settings)

    const messageId = crypto.randomUUID()

    const { error: enqueueError } = await supabase.rpc('enqueue_email', {
      queue_name: 'transactional_emails',
      payload: {
        message_id: messageId,
        to: app.applicant_email,
        bcc: settings.notification_email,
        from: `${tmpl.from_name || SITE_NAME} <careers@${FROM_DOMAIN}>`,
        sender_domain: SENDER_DOMAIN,
        subject,
        html,
        purpose: 'transactional',
        label: template_key,
        queued_at: new Date().toISOString(),
      },
    })

    await supabase.from('pipeline_email_log').insert({
      application_id,
      template_key,
      recipient: app.applicant_email,
      subject,
      status: enqueueError ? 'failed' : 'queued',
      error: enqueueError?.message ?? null,
    })

    if (enqueueError) {
      return new Response(JSON.stringify({ error: enqueueError.message }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
    }

    // Stage transitions
    if (template_key === 'assignment_invite' && pipeline?.stage === 'applied') {
      await supabase.from('candidate_pipeline').update({ stage: 'assignment_sent' }).eq('application_id', application_id)
    }

    return new Response(JSON.stringify({ success: true, message_id: messageId }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
  } catch (e) {
    console.error('send-pipeline-email error', e)
    return new Response(JSON.stringify({ error: String(e) }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
  }
})
