import type { APIRoute } from 'astro';

export const prerender = false;

const CSV_COLUMNS = [
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

function csvCell(v: unknown): string {
  if (v == null) return '';
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

  const supaUrl = env('SUPABASE_URL');
  const supaKey = env('SUPABASE_SERVICE_ROLE_KEY');
  if (!supaUrl || !supaKey) {
    return new Response('Supabase not configured', { status: 503 });
  }

  const select = CSV_COLUMNS.join(',');
  const res = await fetch(`${supaUrl}/rest/v1/hub_applications?select=${select}&order=submitted_at.asc`, {
    headers: { apikey: supaKey, Authorization: `Bearer ${supaKey}` },
  });
  if (!res.ok) {
    const txt = await res.text().catch(() => '');
    return new Response(`Supabase ${res.status}: ${txt.slice(0, 200)}`, { status: 502 });
  }
  const rows: Record<string, unknown>[] = await res.json();

  const lines: string[] = [CSV_COLUMNS.join(',')];
  for (const r of rows) {
    lines.push(CSV_COLUMNS.map((c) => csvCell(r[c])).join(','));
  }
  const body = lines.join('\n');

  const today = new Date().toISOString().slice(0, 10);
  return new Response(body, {
    status: 200,
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="hub-bogota-applications-${today}.csv"`,
      'Cache-Control': 'no-store',
    },
  });
};
