import type { APIRoute } from 'astro';
import { validate } from '../../lib/hackathon-confirm/schema';
import { upsertConfirmation } from '../../lib/hackathon-confirm/supabase';
import { isPastConfirmDeadline, CONFIRM_DEADLINE_ISO } from '../../lib/hackathon-confirm/deadline';
import { verifyIdentityToken } from '../../lib/hackathon-confirm/identityToken';
import { isInviteEmail } from '../../lib/hackathon-confirm/inviteAllowlist';
import { clientIp, rateLimit, isHoneypot } from '../../lib/antiAbuse';

export const prerender = false;

const json = (body: unknown, status = 200, headers: Record<string, string> = {}) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...headers },
  });

export const POST: APIRoute = async ({ request, clientAddress }) => {
  // Confirmation window closes Mon 15, 6 PM Colombia. Server is authoritative.
  if (isPastConfirmDeadline()) {
    return json({ error: 'deadline_passed', deadline: CONFIRM_DEADLINE_ISO }, 403);
  }

  // Flood backstop: a real participant submits once, maybe a couple retries.
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

  // Honeypot: bots fill the hidden `website` field. Fake success, do nothing.
  if (isHoneypot(raw)) {
    return json({ ok: true });
  }

  // Personalized links carry a signed identity token (?t=...). When present it
  // is authoritative: we override email/name from the token and ignore whatever
  // the client posted. A token that is present but does not verify is rejected
  // (tampered link); a request with no token at all falls back to the legacy
  // ?email=&nombre= fields the form still posts.
  const input = (raw && typeof raw === 'object' ? { ...(raw as Record<string, unknown>) } : raw) as
    | Record<string, unknown>
    | unknown;
  if (input && typeof input === 'object') {
    const r = input as Record<string, unknown>;
    // The friend-invite perk comes from the signed token's invite flag, never
    // from arbitrary client input. Default off; turn on only for a verified
    // invite token, OR for an email on the small hand-picked allowlist (people
    // whose link predates the flag / got a non-invite resend).
    let inviteGranted = false;
    if (typeof r.token === 'string' && r.token) {
      const id = verifyIdentityToken(r.token);
      if (!id) return json({ error: 'invalid_token' }, 400);
      r.email = id.email;
      r.firstName = id.firstName;
      if (id.lastName) r.lastName = id.lastName;
      inviteGranted = !!id.invite;
    }
    if (!inviteGranted && typeof r.email === 'string' && isInviteEmail(r.email)) {
      inviteGranted = true;
    }
    // If the perk isn't granted, drop any friend data the client may have posted.
    if (!inviteGranted) {
      r.friendInvite = false;
      delete r.friendName;
      delete r.friendEmail;
      delete r.friendWhatsapp;
      delete r.friendLinkedin;
    }
  }

  const parsed = validate(input);
  if (!parsed.ok) return json({ error: parsed.error }, 400);

  const dbResult = await upsertConfirmation(parsed.data);
  if (!dbResult.ok) {
    return json({ error: 'submission_failed' }, 502);
  }

  return json({ ok: true });
};
