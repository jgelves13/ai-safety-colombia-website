import type { APIRoute } from 'astro';
import {
  getPending6hReminders,
  getPending48hReminders,
  markReminderSent,
  markDraftComplete,
  isEmailAlreadySubmitted,
} from '../../../lib/hackathon-apply/draftSupabase';
import { sendDraftReminder } from '../../../lib/hackathon-apply/draftEmails';
import { isPastDeadline } from '../../../lib/hackathon-apply/deadline';

export const prerender = false;

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });

const env = (k: string) =>
  ((import.meta as any).env as any)?.[k] || process.env[k] || '';

async function processBatch(which: '6h' | '48h') {
  const drafts = which === '6h' ? await getPending6hReminders() : await getPending48hReminders();
  let sent = 0;
  let skipped = 0;
  let failed = 0;
  for (const d of drafts) {
    if (await isEmailAlreadySubmitted(d.email)) {
      await markDraftComplete(d.email);
      skipped++;
      continue;
    }
    const r = await sendDraftReminder(d, which);
    if (r.ok) {
      await markReminderSent(d.id, which);
      sent++;
    } else {
      failed++;
    }
  }
  return { total: drafts.length, sent, skipped, failed };
}

async function handler(request: Request): Promise<Response> {
  const secret = env('CRON_SECRET');
  const auth = request.headers.get('authorization') || '';
  const url = new URL(request.url);
  const querySecret = url.searchParams.get('secret') || '';
  const provided = auth.startsWith('Bearer ') ? auth.slice(7) : querySecret;
  if (!secret || provided !== secret) {
    return json({ error: 'unauthorized' }, 401);
  }

  if (isPastDeadline()) {
    return json({ ok: true, skipped: 'past_deadline' });
  }

  const r6 = await processBatch('6h');
  const r48 = await processBatch('48h');

  return json({ ok: true, reminders_6h: r6, reminders_48h: r48 });
}

export const GET: APIRoute = ({ request }) => handler(request);
export const POST: APIRoute = ({ request }) => handler(request);
