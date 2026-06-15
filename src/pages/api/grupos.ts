import type { APIRoute } from 'astro';
import { validate } from '../../lib/groups-interest/schema';
import { insertInterest } from '../../lib/groups-interest/supabase';
import {
  sendInterestConfirmation,
  sendInterestFailureAlert,
} from '../../lib/groups-interest/emails';
import { clientIp, rateLimit, isHoneypot } from '../../lib/antiAbuse';

export const prerender = false;

const json = (body: unknown, status = 200, headers: Record<string, string> = {}) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...headers },
  });

export const POST: APIRoute = async ({ request, clientAddress }) => {
  const rl = rateLimit(clientIp(request, clientAddress), 8, 10 * 60 * 1000);
  if (!rl.ok) {
    return json({ error: 'rate_limited' }, 429, { 'Retry-After': String(rl.retryAfter) });
  }

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return json({ error: 'Invalid JSON' }, 400);
  }

  // Honeypot: silently accept bot submissions without hitting Supabase/Resend.
  if (isHoneypot(raw)) {
    return json({ ok: true });
  }

  const parsed = validate(raw);
  if (!parsed.ok) return json({ error: parsed.error }, 400);
  const payload = parsed.data;

  // Approximate location from the visitor's IP. Vercel injects these headers
  // for free at the edge — no external geo-IP service, no cookie. City names
  // arrive URL-encoded (e.g. "Bogot%C3%A1"). This is best-effort metadata only
  // (VPNs / mobile carriers can misplace it); it never affects the response.
  const decodeHeader = (v: string | null) => {
    if (!v) return null;
    try {
      return decodeURIComponent(v) || null;
    } catch {
      return v || null;
    }
  };
  const geo = {
    city: decodeHeader(request.headers.get('x-vercel-ip-city')),
    region: decodeHeader(request.headers.get('x-vercel-ip-country-region')),
    country: decodeHeader(request.headers.get('x-vercel-ip-country')),
  };

  // Success is gated on the Supabase insert ONLY. Email is best-effort so a
  // drained Resend daily quota never shows the user an error or loses data
  // (everything is in Supabase + the synced Sheet). Same fix as aplicar.ts.
  const dbResult = await insertInterest(payload, geo);

  if (!dbResult.ok) {
    sendInterestFailureAlert({ stage: 'supabase', error: dbResult.error, payload }).catch(() => undefined);
    return json({ error: 'submission_failed' }, 502);
  }

  const applicantResult = await sendInterestConfirmation(payload);

  return json({ ok: true, partial: !applicantResult.ok });
};
