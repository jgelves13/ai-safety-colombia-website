import type { APIRoute } from 'astro';
import { clientIp, rateLimit } from '../../lib/antiAbuse';
import { insertSectionMetrics, type SectionMetricRow } from '../../lib/section-metrics/insert';

export const prerender = false;

// First-party analytics sink for per-section dwell time (see
// src/scripts/sectionAnalytics.ts). Always returns 204: sendBeacon ignores the
// response body, and analytics must never surface an error to a visitor.
const noContent = () =>
  new Response(null, { status: 204, headers: { 'Cache-Control': 'no-store' } });

const MAX_SECTIONS = 60;
const MAX_MS = 30 * 60 * 1000; // cap a single section's reported time per flush

// Data-poisoning guard: only accept beacons that originate from our own site.
// sendBeacon/fetch always attach an Origin header on cross-origin and on most
// same-origin POSTs. If Origin is present we require it to match; if it's
// absent (some same-origin beacon cases) we allow it through, since forging
// "no Origin" gains an attacker nothing the rate-limit doesn't already cover.
const allowedOrigin = (origin: string | null): boolean => {
  if (!origin) return true; // header not sent → don't reject genuine beacons
  try {
    const h = new URL(origin).hostname;
    return (
      h === 'aisafetycolombia.org' ||
      h === 'www.aisafetycolombia.org' ||
      h === 'localhost' ||
      h === '127.0.0.1' ||
      h.endsWith('.vercel.app') // preview deployments
    );
  } catch {
    return false;
  }
};

// Reject obviously bogus paths (must be a site-relative path, no traversal).
const validPath = (p: string): boolean => p.startsWith('/') && !p.includes('..');

// Normalize so the same page is one bucket regardless of how it was reached.
// The site doesn't redirect trailing slashes (Astro default 'ignore'), so
// "/hackathon" and "/hackathon/" both serve the same page and would otherwise
// be counted separately. Astro builds directory-style URLs (the canonical form
// the site links to has a trailing slash), so we normalize toward that: collapse
// any repeated trailing slashes to exactly one (root "/" stays "/").
const normalizePath = (p: string): string => {
  const trimmed = p.replace(/\/+$/, '');
  return trimmed === '' ? '/' : trimmed + '/';
};

export const POST: APIRoute = async ({ request, clientAddress }) => {
  if (!allowedOrigin(request.headers.get('origin'))) return noContent();

  // Generous flood backstop. A real page flushes only a handful of beacons,
  // so 240 per 10 min per IP never affects a genuine visitor.
  const rl = rateLimit(clientIp(request, clientAddress), 240, 10 * 60 * 1000);
  if (!rl.ok) return noContent();

  let raw: any;
  try {
    raw = await request.json();
  } catch {
    return noContent();
  }
  if (!raw || typeof raw !== 'object' || !Array.isArray(raw.sections)) return noContent();

  const rawPath = typeof raw.path === 'string' ? raw.path.slice(0, 200) : '';
  if (!rawPath || !validPath(rawPath)) return noContent();
  const path = normalizePath(rawPath);
  const locale = typeof raw.locale === 'string' ? raw.locale.slice(0, 10) : null;
  const session_id = typeof raw.sid === 'string' ? raw.sid.slice(0, 40) : null;
  const viewport_w = Number.isFinite(raw.vw)
    ? Math.min(10000, Math.max(0, Math.round(raw.vw)))
    : null;

  // Coarse, non-identifying geo from Vercel's edge headers (country only).
  const country = request.headers.get('x-vercel-ip-country') || null;

  const rows: SectionMetricRow[] = raw.sections
    .slice(0, MAX_SECTIONS)
    .map((s: any): SectionMetricRow => ({
      path,
      locale,
      session_id,
      viewport_w,
      country,
      section: typeof s?.section === 'string' ? s.section.slice(0, 80) : '',
      ms: Number.isFinite(s?.ms) ? Math.min(MAX_MS, Math.max(0, Math.round(s.ms))) : 0,
    }))
    .filter((r: SectionMetricRow) => r.section.length > 0 && r.ms > 0);

  if (rows.length) {
    await insertSectionMetrics(rows).catch(() => {});
  }
  return noContent();
};
