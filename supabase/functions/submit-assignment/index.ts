import { createClient } from 'npm:@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders })

  try {
    const { token, payload } = await req.json()
    if (!token) return new Response(JSON.stringify({ error: 'Missing token' }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })

    const supabase = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!)

    const { data: pipeline, error } = await supabase
      .from('candidate_pipeline')
      .select('*, job_applications(id, applicant_email, applicant_name, jobs(title))')
      .eq('submission_token', token)
      .maybeSingle()

    if (error || !pipeline) {
      return new Response(JSON.stringify({ error: 'Invalid link' }), { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
    }

    const app: any = pipeline.job_applications

    await supabase.from('candidate_pipeline').update({
      stage: 'assignment_submitted',
      submission_payload: payload,
    }).eq('id', pipeline.id)

    // Cancel pending assignment reminders
    await supabase.from('pipeline_scheduled_emails').update({ status: 'cancelled' })
      .eq('application_id', pipeline.application_id)
      .eq('status', 'pending')
      .in('template_key', ['assignment_reminder', 'assignment_overdue'])

    // Schedule confirmation + meeting invite immediately, plus reminder in 48h
    const now = new Date().toISOString()
    const remindAt = new Date(Date.now() + 48 * 3600 * 1000).toISOString()
    await supabase.from('pipeline_scheduled_emails').insert([
      { application_id: pipeline.application_id, template_key: 'submission_received', send_at: now },
      { application_id: pipeline.application_id, template_key: 'schedule_meeting', send_at: now },
      { application_id: pipeline.application_id, template_key: 'schedule_reminder', send_at: remindAt },
    ])

    return new Response(JSON.stringify({
      success: true,
      candidate: { name: app?.applicant_name, job: app?.jobs?.title },
    }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
  }
})
