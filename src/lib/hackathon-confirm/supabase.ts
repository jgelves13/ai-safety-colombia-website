import type { ConfirmPayload } from './schema';

function env() {
  const url = (import.meta as any).env?.SUPABASE_URL || process.env.SUPABASE_URL;
  const key =
    (import.meta as any).env?.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return { url, key };
}

function headers(key: string, extra: Record<string, string> = {}): Record<string, string> {
  return {
    apikey: key,
    Authorization: `Bearer ${key}`,
    'Content-Type': 'application/json',
    ...extra,
  };
}

// Upsert keyed on email: a participant who re-opens the link and submits again
// just updates their existing row instead of creating a duplicate.
export async function upsertConfirmation(
  c: ConfirmPayload
): Promise<{ ok: true } | { ok: false; error: string }> {
  const e = env();
  if (!e) return { ok: false, error: 'Supabase env not configured' };

  const row = {
    confirmed_at: new Date().toISOString(),
    locale: c.locale,
    first_name: c.firstName,
    last_name: c.lastName ?? null,
    email: c.email.toLowerCase(),
    available: c.available,
    whatsapp_joined: c.whatsappJoined,
    notes: c.notes ?? null,
    friend_name: c.friendName ?? null,
    friend_email: c.friendEmail ? c.friendEmail.toLowerCase() : null,
    friend_whatsapp: c.friendWhatsapp ?? null,
    friend_linkedin: c.friendLinkedin ?? null,
  };

  try {
    const res = await fetch(`${e.url}/rest/v1/hub_confirmations?on_conflict=email`, {
      method: 'POST',
      headers: headers(e.key, {
        Prefer: 'return=minimal,resolution=merge-duplicates',
      }),
      body: JSON.stringify(row),
    });
    if (!res.ok) {
      const txt = await res.text().catch(() => '');
      return { ok: false, error: `Supabase ${res.status}: ${txt.slice(0, 200)}` };
    }
    return { ok: true };
  } catch (err: any) {
    return { ok: false, error: `Supabase fetch failed: ${err?.message || 'unknown'}` };
  }
}
