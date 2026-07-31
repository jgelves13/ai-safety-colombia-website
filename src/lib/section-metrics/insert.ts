// Server-side writer for section dwell-time rows. Uses the Supabase service
// role key (server-only) over PostgREST, same pattern as hub_confirmations.
// Never throws into the caller — analytics is fire-and-forget.

export interface SectionMetricRow {
  path: string;
  locale: string | null;
  section: string;
  ms: number;
  viewport_w: number | null;
  country: string | null;
  session_id: string | null;
}

function env() {
  const url = (import.meta as any).env?.SUPABASE_URL || process.env.SUPABASE_URL;
  const key =
    (import.meta as any).env?.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return { url, key };
}

export async function insertSectionMetrics(rows: SectionMetricRow[]): Promise<void> {
  const e = env();
  if (!e || !rows.length) return;
  await fetch(`${e.url}/rest/v1/section_metrics`, {
    method: 'POST',
    headers: {
      apikey: e.key,
      Authorization: `Bearer ${e.key}`,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    },
    body: JSON.stringify(rows),
  });
}
