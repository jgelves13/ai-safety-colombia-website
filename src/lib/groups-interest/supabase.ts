import type { InterestPayload } from './schema';

interface GeoInfo {
  city?: string | null;
  region?: string | null;
  country?: string | null;
}

interface InsertRow {
  submitted_at: string;
  locale: string;
  first_name: string;
  last_name: string;
  email: string;
  location: string;
  preferred_start: string;
  availability: string[];
  linkedin: string | null;
  about: string;
  areas: string[];
  extra: string | null;
  geo_city?: string | null;
  geo_country?: string | null;
}

// Columns that may not exist on the table yet (added via later migrations).
// If PostgREST rejects the insert because one is missing, we drop just that
// column and retry so the core submission is never lost.
const OPTIONAL_COLUMNS = ['geo_city', 'geo_country', 'preferred_start', 'availability'] as const;

export async function insertInterest(
  payload: InterestPayload,
  geo?: GeoInfo,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const url = import.meta.env.SUPABASE_URL || process.env.SUPABASE_URL;
  const key = import.meta.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    return { ok: false, error: 'Supabase env not configured' };
  }

  // geo_city merges city + region (e.g. "Bogotá, DC") so a single column holds
  // the human-readable place; geo_country keeps the ISO code for filtering.
  const geoCity = geo?.city
    ? [geo.city, geo.region].filter(Boolean).join(', ')
    : null;

  const row: InsertRow = {
    submitted_at: new Date().toISOString(),
    locale: payload.locale,
    first_name: payload.firstName,
    last_name: payload.lastName,
    email: payload.email,
    location: payload.location,
    preferred_start: payload.preferredStart,
    availability: payload.availability,
    linkedin: payload.linkedin || null,
    // `about` is optional (the invite form omits it) but the column is NOT NULL,
    // so store an empty string rather than null — no migration needed.
    about: payload.about || '',
    areas: payload.areas,
    extra: payload.extra || null,
    geo_city: geoCity,
    geo_country: geo?.country || null,
  };

  const post = (body: object) =>
    fetch(`${url}/rest/v1/group_interests`, {
      method: 'POST',
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal',
      },
      body: JSON.stringify(body),
    });

  try {
    let res = await post(row);

    // If an optional column hasn't been added to the table yet, PostgREST
    // rejects the insert with PGRST204 ("Could not find the '<col>' column").
    // Don't lose the submission over a not-yet-migrated column — strip the
    // columns the error names and retry once so the core interest still lands.
    if (!res.ok && res.status === 400) {
      const txt = await res.clone().text().catch(() => '');
      const missing = OPTIONAL_COLUMNS.filter((k) => txt.includes(k));
      if (missing.length > 0) {
        const core: Record<string, unknown> = { ...row };
        for (const k of missing) delete core[k];
        res = await post(core);
      }
    }

    if (!res.ok) {
      const txt = await res.text().catch(() => '');
      return { ok: false, error: `Supabase ${res.status}: ${txt.slice(0, 200)}` };
    }
    return { ok: true };
  } catch (err: any) {
    return { ok: false, error: `Supabase fetch failed: ${err?.message || 'unknown'}` };
  }
}
