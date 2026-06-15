import type { APIRoute } from 'astro';
import { validate } from '../../lib/hackathon-apply/schema';
import { translateToEnglish } from '../../lib/hackathon-apply/translate';
import { insertApplication } from '../../lib/hackathon-apply/supabase';
import { markDraftComplete } from '../../lib/hackathon-apply/draftSupabase';
import { isPastDeadline, HARD_DEADLINE_ISO, bypassGranted, BYPASS_HEADER } from '../../lib/hackathon-apply/deadline';
import {
  sendApplicantConfirmation,
  sendFailureAlert,
} from '../../lib/hackathon-apply/emails';
import { clientIp, rateLimit, isHoneypot } from '../../lib/antiAbuse';

export const prerender = false;

const json = (body: unknown, status = 200, headers: Record<string, string> = {}) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...headers },
  });

export const POST: APIRoute = async ({ request, clientAddress }) => {
  // Hard deadline first — cheapest gate, denies before we touch state.
  // Exception: a private bypass link carries a secret code in the BYPASS_HEADER
  // that, when valid, lets a hand-picked applicant submit after close.
  if (isPastDeadline() && !bypassGranted(request.headers.get(BYPASS_HEADER))) {
    return json({ error: 'deadline_passed', deadline: HARD_DEADLINE_ISO }, 403);
  }

  // Flood backstop: a real applicant submits once (maybe a couple retries).
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

  // Honeypot: bots fill the hidden `website` field. Fake success, do nothing —
  // never touches Supabase/Resend, so it can't drain the free-tier quotas.
  if (isHoneypot(raw)) {
    return json({ ok: true });
  }

  const parsed = validate(raw);
  if (!parsed.ok) return json({ error: parsed.error }, 400);
  const original = parsed.data;

  const translated = await translateToEnglish(original);

  // The ONLY thing a submission needs to succeed is the data landing in
  // Supabase. Save it first and gate the whole response on that.
  const dbResult = await insertApplication(original, translated);

  // A real failure is the data not saving. That, and only that, blocks the
  // applicant and is worth an alert. (Alerting on email failures would burn
  // the same Resend quota that just ran out — a death spiral on deadline day.)
  if (!dbResult.ok) {
    sendFailureAlert({ stage: 'supabase', error: dbResult.error, payload: original }).catch(() => undefined);
    return json({ error: 'submission_failed' }, 502);
  }

  // Confirmation email is best-effort. If Resend's daily quota is exhausted
  // this silently no-ops: the applicant still sees success, no data is lost,
  // and the application is in Supabase + the synced Sheet regardless.
  const applicantResult = await sendApplicantConfirmation(original);

  markDraftComplete(original.email).catch(() => undefined);

  return json({ ok: true, partial: !applicantResult.ok });
};
