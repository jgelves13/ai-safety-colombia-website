import type { InterestPayload } from './schema';

interface InsertRow {
  submitted_at: string;
  locale: string;
  first_name: string;
  last_name: string;
  email: string;
  location: string;
  linkedin: string | null;
  about: string;
  areas: string[];
  extra: string | null;
}

export async function insertInterest(
  payload: InterestPayload,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const url = import.meta.env.SUPABASE_URL || process.env.SUPABASE_URL;
  const key = import.meta.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    return { ok: false, error: 'Supabase env not configured' };
  }

  const row: InsertRow = {
    submitted_at: new Date().toISOString(),
    locale: payload.locale,
    first_name: payload.firstName,
    last_name: payload.lastName,
    email: payload.email,
    location: payload.location,
    linkedin: payload.linkedin || null,
    about: payload.about,
    areas: payload.areas,
    extra: payload.extra || null,
  };

  try {
    const res = await fetch(`${url}/rest/v1/group_interests`, {
      method: 'POST',
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal',
      },
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
