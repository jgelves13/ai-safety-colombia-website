export interface DraftPayload {
  locale: 'es' | 'en';
  firstName: string;
  lastName: string;
  email: string;
  userAgent?: string | null;
  ipHash?: string | null;
}

export interface DraftRow {
  id: string;
  created_at: string;
  locale: 'es' | 'en';
  first_name: string;
  last_name: string;
  email: string;
  reminder_6h_sent_at: string | null;
  reminder_48h_sent_at: string | null;
}

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

export async function upsertDraft(
  d: DraftPayload
): Promise<{ ok: true } | { ok: false; error: string }> {
  const e = env();
  if (!e) return { ok: false, error: 'Supabase env not configured' };

  const row = {
    locale: d.locale,
    first_name: d.firstName,
    last_name: d.lastName,
    email: d.email.toLowerCase(),
    updated_at: new Date().toISOString(),
    user_agent: d.userAgent ?? null,
    ip_hash: d.ipHash ?? null,
  };

  try {
    const res = await fetch(`${e.url}/rest/v1/hub_application_drafts?on_conflict=email`, {
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

export async function markDraftComplete(
  email: string
): Promise<{ ok: true } | { ok: false; error: string }> {
  const e = env();
  if (!e) return { ok: false, error: 'Supabase env not configured' };

  const normalized = email.trim().toLowerCase();
  if (!normalized) return { ok: false, error: 'empty email' };

  try {
    const res = await fetch(
      `${e.url}/rest/v1/hub_application_drafts?email=eq.${encodeURIComponent(normalized)}`,
      {
        method: 'PATCH',
        headers: headers(e.key, { Prefer: 'return=minimal' }),
        body: JSON.stringify({ completed_at: new Date().toISOString() }),
      }
    );
    if (!res.ok) {
      const txt = await res.text().catch(() => '');
      return { ok: false, error: `Supabase ${res.status}: ${txt.slice(0, 200)}` };
    }
    return { ok: true };
  } catch (err: any) {
    return { ok: false, error: `Supabase fetch failed: ${err?.message || 'unknown'}` };
  }
}

async function queryDrafts(
  e: { url: string; key: string },
  qs: string
): Promise<DraftRow[]> {
  const res = await fetch(`${e.url}/rest/v1/hub_application_drafts?${qs}`, {
    method: 'GET',
    headers: headers(e.key),
  });
  if (!res.ok) return [];
  return (await res.json().catch(() => [])) as DraftRow[];
}

export async function getPending6hReminders(): Promise<DraftRow[]> {
  const e = env();
  if (!e) return [];
  const cutoff = new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString();
  const qs = [
    `select=id,created_at,locale,first_name,last_name,email,reminder_6h_sent_at,reminder_48h_sent_at`,
    `completed_at=is.null`,
    `reminder_6h_sent_at=is.null`,
    `created_at=lt.${encodeURIComponent(cutoff)}`,
    `order=created_at.asc`,
    `limit=50`,
  ].join('&');
  return queryDrafts(e, qs);
}

export async function getPending48hReminders(): Promise<DraftRow[]> {
  const e = env();
  if (!e) return [];
  const cutoff = new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString();
  const qs = [
    `select=id,created_at,locale,first_name,last_name,email,reminder_6h_sent_at,reminder_48h_sent_at`,
    `completed_at=is.null`,
    `reminder_6h_sent_at=not.is.null`,
    `reminder_48h_sent_at=is.null`,
    `created_at=lt.${encodeURIComponent(cutoff)}`,
    `order=created_at.asc`,
    `limit=50`,
  ].join('&');
  return queryDrafts(e, qs);
}

export async function markReminderSent(
  id: string,
  which: '6h' | '48h'
): Promise<{ ok: true } | { ok: false; error: string }> {
  const e = env();
  if (!e) return { ok: false, error: 'Supabase env not configured' };
  const col = which === '6h' ? 'reminder_6h_sent_at' : 'reminder_48h_sent_at';
  try {
    const res = await fetch(
      `${e.url}/rest/v1/hub_application_drafts?id=eq.${encodeURIComponent(id)}`,
      {
        method: 'PATCH',
        headers: headers(e.key, { Prefer: 'return=minimal' }),
        body: JSON.stringify({ [col]: new Date().toISOString() }),
      }
    );
    if (!res.ok) {
      const txt = await res.text().catch(() => '');
      return { ok: false, error: `Supabase ${res.status}: ${txt.slice(0, 200)}` };
    }
    return { ok: true };
  } catch (err: any) {
    return { ok: false, error: `Supabase fetch failed: ${err?.message || 'unknown'}` };
  }
}

export async function isEmailAlreadySubmitted(email: string): Promise<boolean> {
  const e = env();
  if (!e) return false;
  const normalized = email.trim().toLowerCase();
  if (!normalized) return false;
  try {
    const res = await fetch(
      `${e.url}/rest/v1/hub_applications?select=id&email=ilike.${encodeURIComponent(normalized)}&limit=1`,
      { method: 'GET', headers: headers(e.key) }
    );
    if (!res.ok) return false;
    const rows = (await res.json().catch(() => [])) as Array<{ id: string }>;
    return rows.length > 0;
  } catch {
    return false;
  }
}
