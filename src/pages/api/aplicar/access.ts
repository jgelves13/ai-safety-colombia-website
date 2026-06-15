import type { APIRoute } from 'astro';
import { bypassGranted, BYPASS_PARAM } from '../../../lib/hackathon-apply/deadline';
import { clientIp, rateLimit } from '../../../lib/antiAbuse';

export const prerender = false;

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  });

// Used by the apply page to decide whether a private bypass link is valid and
// the closed form should be reopened. Returns only a boolean — never echoes the
// code or reveals whether a bypass is even configured.
export const GET: APIRoute = async ({ request, url, clientAddress }) => {
  // Brute-force backstop: the token is long+random, but bound the attempts.
  const rl = rateLimit(clientIp(request, clientAddress), 30, 10 * 60 * 1000);
  if (!rl.ok) return json({ ok: false }, 429);

  const code = url.searchParams.get(BYPASS_PARAM) || url.searchParams.get('code') || '';
  return json({ ok: bypassGranted(code) });
};
