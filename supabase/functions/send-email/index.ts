import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { to, subject, html, reply_to } = await req.json();

    const apiKey = Deno.env.get('RESEND_API_KEY') ?? 're_cPD5ndEs_N87VTSGVpSfeCdZKQt8riBvic';

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: 'NRGsolution <noreply@nrg-solution.com>',
        to,
        subject,
        html,
        ...(reply_to ? { reply_to } : {}),
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error('Resend API error:', res.status, data);
    } else {
      console.log('Resend email sent OK to:', to);
    }

    return new Response(JSON.stringify(data), {
      status: res.status,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Edge function error:', err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
