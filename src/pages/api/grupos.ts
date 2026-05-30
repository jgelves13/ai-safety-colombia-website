import type { APIRoute } from 'astro';
import { validate } from '../../lib/groups-interest/schema';
import { insertInterest } from '../../lib/groups-interest/supabase';
import {
  sendInterestConfirmation,
  sendInterestNotification,
  sendInterestFailureAlert,
} from '../../lib/groups-interest/emails';

export const prerender = false;

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });

export const POST: APIRoute = async ({ request }) => {
  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return json({ error: 'Invalid JSON' }, 400);
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
