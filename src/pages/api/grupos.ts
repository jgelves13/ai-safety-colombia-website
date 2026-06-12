import type { APIRoute } from 'astro';
import { validate } from '../../lib/groups-interest/schema';
import { insertInterest } from '../../lib/groups-interest/supabase';
import {
  sendInterestConfirmation,
  sendInterestNotification,
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

  const dbResult = await insertInterest(payload);
  const applicantResult = await sendInterestConfirmation(payload);
  const notifyResult = await sendInterestNotification(payload);

  const failures: string[] = [];
  if (!dbResult.ok) failures.push(`supabase: ${dbResult.error}`);
  if (!applicantResult.ok) failures.push(`applicant-email: ${applicantResult.error}`);
  if (!notifyResult.ok) failures.push(`notify-email: ${notifyResult.error}`);

  if (failures.length > 0) {
    sendInterestFailureAlert({
      stage: failures.join(' | '),
      error: failures.join('\n'),
      payload,
    }).catch(() => undefined);
  }

  if (!applicantResult.ok) {
    return json({ error: 'submission_failed' }, 502);
  }

  return json({ ok: true, partial: failures.length > 0 });
};
