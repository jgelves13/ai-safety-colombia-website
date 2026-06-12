import type { APIRoute } from 'astro';
import { validate } from '../../lib/hackathon-apply/schema';
import { translateToEnglish } from '../../lib/hackathon-apply/translate';
import { insertApplication } from '../../lib/hackathon-apply/supabase';
import { markDraftComplete } from '../../lib/hackathon-apply/draftSupabase';
import {
  sendApartEmail,
  sendApplicantConfirmation,
  sendHubNotification,
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

  const dbResult = await insertApplication(original, translated);
  const apartResult = await sendApartEmail(translated, original);
  const applicantResult = await sendApplicantConfirmation(original);
  const hubResult = await sendHubNotification(translated, original);

  const failures: string[] = [];
  if (!dbResult.ok) failures.push(`supabase: ${dbResult.error}`);
  if (!apartResult.ok) failures.push(`apart-email: ${apartResult.error}`);
  if (!applicantResult.ok) failures.push(`applicant-email: ${applicantResult.error}`);
  if (!hubResult.ok) failures.push(`hub-notify: ${hubResult.error}`);

  const applicantOk = applicantResult.ok;
  const apartOk = apartResult.ok;
  const userVisibleOk = applicantOk && apartOk;

  if (failures.length > 0) {
    sendFailureAlert({ stage: failures.join(' | '), error: failures.join('\n'), payload: original }).catch(() => undefined);
  }

  if (!userVisibleOk) {
    return json({ error: 'submission_failed' }, 502);
  }

  markDraftComplete(original.email).catch(() => undefined);

  return json({ ok: true, partial: failures.length > 0 });
};
