// 2026-06-12 23:59:59 America/Bogota (UTC-5) = 2026-06-13 04:59:59 UTC
export const HARD_DEADLINE_UTC_MS = Date.parse('2026-06-13T04:59:59Z');

export const HARD_DEADLINE_ISO = '2026-06-13T04:59:59Z';

export function isPastDeadline(now: number = Date.now()): boolean {
  return now > HARD_DEADLINE_UTC_MS;
}

// --- Private bypass links ----------------------------------------------------
// After the hard deadline the public form is closed for everyone. The ONLY way
// to still submit is a private link that carries a secret code, e.g.
//   /aplicar/?acceso=<token>
// The code is never shipped to the client: the page only forwards whatever code
// is in the URL to the server, and the server alone validates it against the
// configured tokens. A missing/empty token entry disables that bypass.
//
// There can be SEVERAL independent links, each with its own secret token and its
// own expiry. A link is only honored while its own grace window is still open,
// so we can hand out one link that dies tonight and another that lives a day
// longer, fully independently.

// Query-param name on the link AND the request header the form forwards it in.
// All links share the same param/header name; only the token value differs.
export const BYPASS_PARAM = 'acceso';
export const BYPASS_HEADER = 'x-apply-access';

interface BypassEntry {
  // env var holding the secret token for this link
  env: string;
  // expiry in UTC ms; the link dies after this instant
  deadlineMs: number;
}

// Each entry = one private link. Times are America/Bogota (UTC-5) midnight cutoffs.
const BYPASS_ENTRIES: BypassEntry[] = [
  // Link #1 — 2026-06-13 23:59:59 Bogotá = 2026-06-14 04:59:59 UTC
  { env: 'APPLY_BYPASS_TOKEN', deadlineMs: Date.parse('2026-06-14T04:59:59Z') },
  // Link #2 — 2026-06-14 23:59:59 Bogotá = 2026-06-15 04:59:59 UTC
  { env: 'APPLY_BYPASS_TOKEN_2', deadlineMs: Date.parse('2026-06-15T04:59:59Z') },
];

function configuredToken(envName: string): string {
  return (
    ((import.meta as any)?.env?.[envName] as string) ||
    process.env[envName] ||
    ''
  );
}

// Constant-time comparison of two strings; only ever runs server-side.
function constantTimeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

// True if `provided` matches ANY configured token, ignoring expiry.
export function isValidBypass(provided: unknown): boolean {
  if (typeof provided !== 'string' || provided.length === 0) return false;
  for (const entry of BYPASS_ENTRIES) {
    const secret = configuredToken(entry.env);
    if (secret && constantTimeEqual(provided, secret)) return true;
  }
  return false;
}

// Full grant check: a valid code whose OWN link is still within its grace
// window. This is what every gate should call — never isValidBypass() alone.
export function bypassGranted(provided: unknown, now: number = Date.now()): boolean {
  if (typeof provided !== 'string' || provided.length === 0) return false;
  for (const entry of BYPASS_ENTRIES) {
    if (now > entry.deadlineMs) continue;
    const secret = configuredToken(entry.env);
    if (secret && constantTimeEqual(provided, secret)) return true;
  }
  return false;
}
