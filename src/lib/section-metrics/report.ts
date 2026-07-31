// Server-side reader for the section dwell-time dashboard (/metrics).
// Calls the section_metrics_report(days) Postgres function via PostgREST with
// the service-role key (server-only). Aggregation happens in the database, so
// this stays fast no matter how many raw rows accumulate.

export interface SectionReportRow {
  path: string;
  section: string;
  samples: number;
  avg_seconds: number;
  total_minutes: number;
  last_seen: string;
}

export interface SectionOverview {
  d1: number;
  d7: number;
  d30: number;
  d90: number;
  data_since: string | null;
}

export interface SectionSegmentRow {
  dimension: string; // 'idioma' | 'dispositivo' | 'pais'
  bucket: string;
  visits: number;
  avg_seconds: number;
  total_minutes: number;
}

function env() {
  const url = (import.meta as any).env?.SUPABASE_URL || process.env.SUPABASE_URL;
  const key =
    (import.meta as any).env?.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return { url, key };
}

// Generic RPC caller: returns the parsed JSON, or `fallback` on any failure
// (missing env, timeout, non-2xx, bad JSON). Never throws — the dashboard must
// always render even if Supabase is unreachable.
async function rpc<T>(fn: string, params: Record<string, unknown>, fallback: T): Promise<T> {
  const e = env();
  if (!e) return fallback;
  const ac = new AbortController();
  const timer = setTimeout(() => ac.abort(), 5000); // never hang the page render
  try {
    const res = await fetch(`${e.url}/rest/v1/rpc/${fn}`, {
      method: 'POST',
      headers: {
        apikey: e.key,
        Authorization: `Bearer ${e.key}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
      signal: ac.signal,
    });
    if (!res.ok) return fallback;
    return (await res.json()) as T;
  } catch {
    return fallback;
  } finally {
    clearTimeout(timer);
  }
}

export async function fetchSectionReport(days = 30): Promise<SectionReportRow[]> {
  const data = await rpc<SectionReportRow[]>('section_metrics_report', { days }, []);
  return Array.isArray(data) ? data : [];
}

// Distinct page-load counts per time window + the timestamp of the very first
// recorded row ("data started gathering"). Used for the range-button counts and
// the "Datos desde" stamp on the dashboard.
export async function fetchSectionOverview(): Promise<SectionOverview> {
  const empty: SectionOverview = { d1: 0, d7: 0, d30: 0, d90: 0, data_since: null };
  const data = await rpc<SectionOverview[]>('section_metrics_overview', {}, []);
  const row = Array.isArray(data) ? data[0] : null;
  return row ? { ...empty, ...row } : empty;
}

// Per-visit breakdown by language / device / country for the given window.
export async function fetchSectionSegments(days = 30): Promise<SectionSegmentRow[]> {
  const data = await rpc<SectionSegmentRow[]>('section_metrics_segments', { days }, []);
  return Array.isArray(data) ? data : [];
}

export interface VisitorStats {
  v1: number;
  v7: number;
  v30: number;
  v90: number;
}

// Unique visitors per time window. The client stores a random first-party id
// in localStorage and sends session_id = "<visitor>.<page-load>", so distinct
// visitors = distinct prefixes before the dot. Computed here from a raw
// (2-column, paginated) read of the last 90 days instead of a Postgres
// function, so no schema/RPC change was needed. Rows older than the composite
// format (no dot) are ignored — visitor counting starts at its deploy date.
export async function fetchVisitorStats(): Promise<VisitorStats> {
  const empty: VisitorStats = { v1: 0, v7: 0, v30: 0, v90: 0 };
  const e = env();
  if (!e) return empty;
  const now = Date.now();
  const since = new Date(now - 90 * 86400 * 1000).toISOString();
  const sets = { v1: new Set(), v7: new Set(), v30: new Set(), v90: new Set() };
  const PAGE = 10000;
  const MAX_ROWS = 200000; // hard cap; far above current volume
  try {
    for (let offset = 0; offset < MAX_ROWS; offset += PAGE) {
      const ac = new AbortController();
      const timer = setTimeout(() => ac.abort(), 5000);
      let batch: { session_id: string | null; created_at: string }[];
      try {
        const res = await fetch(
          `${e.url}/rest/v1/section_metrics?select=session_id,created_at&created_at=gte.${since}&order=created_at.desc`,
          {
            headers: {
              apikey: e.key,
              Authorization: `Bearer ${e.key}`,
              Range: `${offset}-${offset + PAGE - 1}`,
            },
            signal: ac.signal,
          },
        );
        if (!res.ok) break;
        batch = await res.json();
      } finally {
        clearTimeout(timer);
      }
      if (!Array.isArray(batch)) break;
      for (const r of batch) {
        const sid = r.session_id || '';
        const dot = sid.indexOf('.');
        if (dot < 1) continue; // pre-visitor-id rows: can't attribute
        const vid = sid.slice(0, dot);
        const age = now - Date.parse(r.created_at);
        if (!Number.isFinite(age)) continue;
        sets.v90.add(vid);
        if (age <= 30 * 86400 * 1000) sets.v30.add(vid);
        if (age <= 7 * 86400 * 1000) sets.v7.add(vid);
        if (age <= 86400 * 1000) sets.v1.add(vid);
      }
      if (batch.length < PAGE) break;
    }
  } catch {
    /* dashboard must render even if this fails */
  }
  return { v1: sets.v1.size, v7: sets.v7.size, v30: sets.v30.size, v90: sets.v90.size };
}
