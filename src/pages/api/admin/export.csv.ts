import type { APIRoute } from 'astro';

export const prerender = false;

const HUB_COLUMNS = [
  'submitted_at',
  'locale',
  'first_name',
  'last_name',
  'email',
  'location',
  'linkedin',
  'scholar',
  'career_es',
  'career_en',
  'reason_es',
  'reason_en',
  'hub_problem_es',
  'hub_problem_en',
  'hub_track',
  'hub_travel',
  'hub_access_es',
  'hub_access_en',
  'hub_extra_es',
  'hub_extra_en',
];

const INTEREST_COLUMNS = [
  'submitted_at',
  'locale',
  'first_name',
  'last_name',
  'email',
  'location',
  'linkedin',
  'about',
  'areas',
  'extra',
];

type DataSet = 'hub_applications' | 'group_interests';

const SETS: Record<
  DataSet,
  { columns: string[]; filenamePrefix: string }
> = {
  hub_applications: { columns: HUB_COLUMNS, filenamePrefix: 'hub-bogota-applications' },
  group_interests: { columns: INTEREST_COLUMNS, filenamePrefix: 'group-interests' },
};

function csvCell(v: unknown): string {
  if (v == null) return '';
  if (Array.isArray(v)) return csvCell(v.join('|'));
  const s = String(v);
  if (/[",\n\r]/.test(s)) {
    return '"' + s.replace(/"/g, '""') + '"';
  }
  return s;
}

export const GET: APIRoute = async ({ request, url }) => {
  const env = (k: string) => (import.meta.env as any)[k] || process.env[k];
  const adminToken = env('ADMIN_EXPORT_TOKEN');
  if (!adminToken) {
    return new Response('Export not configured', { status: 503 });
  }

  const headerToken = request.headers.get('x-admin-token');
  const queryToken = url.searchParams.get('token');
  if (headerToken !== adminToken && queryToken !== adminToken) {
    return new Response('Unauthorized', { status: 401 });
  }

  const requested = (url.searchParams.get('set') || 'hub_applications') as DataSet;
  const set = SETS[requested];
  if (!set) {
    return new Response(`Unknown set: ${requested}`, { status: 400 });
  }

  const supaUrl = env('SUPABASE_URL');
  const supaKey = env('SUPABASE_SERVICE_ROLE_KEY');
  if (!supaUrl || !supaKey) {
    return new Response('Supabase not configured', { status: 503 });
  }

  const select = set.columns.join(',');
  const res = await fetch(
    `${supaUrl}/rest/v1/${requested}?select=${select}&order=submitted_at.asc`,
    {
      headers: { apikey: supaKey, Authorization: `Bearer ${supaKey}` },
    },
  );
  if (!res.ok) {
    const txt = await res.text().catch(() => '');
    return new Response(`Supabase ${res.status}: ${txt.slice(0, 200)}`, { status: 502 });
  }
  const rows: Record<string, unknown>[] = await res.json();

  const lines: string[] = [set.columns.join(',')];
  for (const r of rows) {
    lines.push(set.columns.map((c) => csvCell(r[c])).join(','));
  }
  const body = lines.join('\n');

  const today = new Date().toISOString().slice(0, 10);
  return new Response(body, {
    status: 200,
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="${set.filenamePrefix}-${today}.csv"`,
      'Cache-Control': 'no-store',
    },
  });
};
