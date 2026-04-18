import { createClient } from 'npm:@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders })

  const supabase = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!)
  const projectRef = (Deno.env.get('SUPABASE_URL')!).split('//')[1].split('.')[0]
  const sendUrl = `https://${projectRef}.supabase.co/functions/v1/send-pipeline-email`

  const { data: due, error } = await supabase
    .from('pipeline_scheduled_emails')
    .select('*')
    .eq('status', 'pending')
    .lte('send_at', new Date().toISOString())
    .limit(50)

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
  }

  let processed = 0
  for (const item of due ?? []) {
    try {
      const res = await fetch(sendUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')}`,
        },
        body: JSON.stringify({ application_id: item.application_id, template_key: item.template_key }),
      })
      const ok = res.ok
      await supabase.from('pipeline_scheduled_emails').update({
        status: ok ? 'sent' : 'failed',
        attempts: item.attempts + 1,
        sent_at: ok ? new Date().toISOString() : null,
        last_error: ok ? null : await res.text(),
      }).eq('id', item.id)
      if (ok) processed++
    } catch (e) {
      await supabase.from('pipeline_scheduled_emails').update({
        attempts: item.attempts + 1,
        last_error: String(e),
      }).eq('id', item.id)
    }
  }

  return new Response(JSON.stringify({ processed, total: due?.length ?? 0 }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
})
