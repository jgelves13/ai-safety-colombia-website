import type { ApplyPayload } from './schema';

interface InsertRow {
  submitted_at: string;
  locale: string;
  first_name: string;
  last_name: string;
  email: string;
  location: string;
  linkedin: string | null;
  scholar: string | null;
  career_es: string;
  reason_es: string;
  hub_problem_es: string;
  hub_track: string;
  hub_travel: string;
  hub_access_es: string | null;
  hub_extra_es: string | null;
  career_en: string | null;
  reason_en: string | null;
  hub_problem_en: string | null;
  hub_access_en: string | null;
  hub_extra_en: string | null;
}

export async function insertApplication(original: ApplyPayload, translated: ApplyPayload): Promise<{ ok: true } | { ok: false; error: string }> {
  const url = import.meta.env.SUPABASE_URL || process.env.SUPABASE_URL;
  const key = import.meta.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    return { ok: false, error: 'Supabase env not configured' };
  }

  const row: InsertRow = {
    submitted_at: new Date().toISOString(),
    locale: original.locale,
    first_name: original.firstName,
    last_name: original.lastName,
    email: original.email,
    location: original.location,
    linkedin: original.linkedin || null,
    scholar: original.scholar || null,
    career_es: original.career,
    reason_es: original.reason,
    hub_problem_es: original.hubProblem,
    hub_track: original.hubTrack,
    hub_travel: original.hubTravel,
    hub_access_es: original.hubAccess || null,
    hub_extra_es: original.hubExtra || null,
    career_en: original.locale === 'es' && translated.career !== original.career ? translated.career : original.locale === 'en' ? original.career : null,
    reason_en: original.locale === 'es' && translated.reason !== original.reason ? translated.reason : original.locale === 'en' ? original.reason : null,
    hub_problem_en: original.locale === 'es' && translated.hubProblem !== original.hubProblem ? translated.hubProblem : original.locale === 'en' ? original.hubProblem : null,
    hub_access_en: original.locale === 'es' && translated.hubAccess && translated.hubAccess !== original.hubAccess ? translated.hubAccess : original.locale === 'en' ? original.hubAccess || null : null,
    hub_extra_en: original.locale === 'es' && translated.hubExtra && translated.hubExtra !== original.hubExtra ? translated.hubExtra : original.locale === 'en' ? original.hubExtra || null : null,
  };

  try {
    const res = await fetch(`${url}/rest/v1/hub_applications`, {
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
