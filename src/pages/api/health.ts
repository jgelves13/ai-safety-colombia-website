import type { APIRoute } from 'astro';

export const prerender = false;

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  });

// Lightweight liveness/readiness probe for external uptime monitoring
// (Better Stack). Returns 200 only when the serverless function runs AND
// Supabase — the one dependency a submission cannot survive without — answers.
// Anything else (Resend, Gemini) is best-effort in the apply flow, so it does
// NOT fail the health check; it's reported for visibility only.
//
// A single Better Stack monitor on https://aisafetycolombia.org/api/health
// therefore catches the two failure modes that actually block applicants:
//   1. Vercel function is down  -> request never returns / 5xx -> monitor fires
//   2. Supabase is unreachable  -> we return 503 here          -> monitor fires
export const GET: APIRoute = async () => {
  const startedAt = Date.now();
  const url = import.meta.env.SUPABASE_URL || process.env.SUPABASE_URL;
  const key = import.meta.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

  const checks: Record<string, { ok: boolean; ms?: number; detail?: string }> = {};

  // Supabase: cheapest possible read — count 0 rows on hub_applications.
  if (!url || !key) {
    checks.supabase = { ok: false, detail: 'env_not_configured' };
  } else {
    const t0 = Date.now();
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 5000);
      const res = await fetch(
        `${url}/rest/v1/hub_applications?select=email&limit=1`,
        {
          method: 'GET',
          headers: {
            apikey: key,
            Authorization: `Bearer ${key}`,
            // Ask PostgREST for an exact count without returning rows.
            Prefer: 'count=exact',
            Range: '0-0',
          },
          signal: controller.signal,
        },
      ).finally(() => clearTimeout(timer));
      checks.supabase = res.ok || res.status === 206
        ? { ok: true, ms: Date.now() - t0 }
        : { ok: false, ms: Date.now() - t0, detail: `http_${res.status}` };
    } catch (err: any) {
      checks.supabase = {
        ok: false,
        ms: Date.now() - t0,
        detail: err?.name === 'AbortError' ? 'timeout' : (err?.message || 'fetch_failed'),
      };
    }
  }

  const healthy = checks.supabase?.ok === true;
  return json(
    {
      ok: healthy,
      status: healthy ? 'healthy' : 'degraded',
      ts: new Date().toISOString(),
      tookMs: Date.now() - startedAt,
      checks,
    },
    healthy ? 200 : 503,
  );
};
