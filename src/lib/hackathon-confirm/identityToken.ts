// Signed identity tokens for the /confirmar link.
//
// Each accepted participant gets a personalized link of the form
//   /confirmar/?t=<token>
// where <token> = base64url(payload) + "." + base64url(HMAC-SHA256(payload)).
// The payload carries who they are { e: email, n: firstName, l?: lastName };
// the HMAC is computed with CONFIRM_LINK_SECRET, known only to the server.
//
// The browser can read the payload to DISPLAY the name ("Confirmando como X"),
// but it cannot forge the signature. On submit the server re-verifies the token
// and uses ITS email/name as authoritative, ignoring anything the client sends.
// This is server-only (node:crypto); never import it into client code.
import { createHmac, timingSafeEqual } from 'node:crypto';

export interface Identity {
  email: string;
  firstName: string;
  lastName?: string;
  // Grants the "invite a friend" perk on /confirmar (only the hand-picked few).
  // Carried in the signed token as i:1 so the page/server can trust it.
  invite?: boolean;
}

function secret(): string {
  // Vite/Astro only statically replaces the exact literal form import.meta.env.X
  // (any dynamic/cast access throws in dev). In a plain tsx script import.meta.env
  // is undefined, so that access throws — caught here so the process.env fallback
  // still works. Either path lands on the configured secret.
  try {
    const v = import.meta.env.CONFIRM_LINK_SECRET;
    if (v) return v as string;
  } catch {
    /* import.meta.env unavailable (e.g. standalone tsx) — fall through */
  }
  return process.env.CONFIRM_LINK_SECRET || '';
}

function b64urlEncode(input: Buffer | string): string {
  return Buffer.from(input)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

function b64urlDecode(input: string): Buffer {
  let s = input.replace(/-/g, '+').replace(/_/g, '/');
  while (s.length % 4) s += '=';
  return Buffer.from(s, 'base64');
}

function sign(payloadB64: string, key: string): string {
  return b64urlEncode(createHmac('sha256', key).update(payloadB64).digest());
}

/**
 * Build a signed identity token. Returns '' if no secret is configured, so the
 * caller can fall back to a legacy ?email=&nombre= link instead of breaking.
 */
export function makeIdentityToken(id: Identity, key: string = secret()): string {
  if (!key) return '';
  const payload: Record<string, string | number> = { e: id.email, n: id.firstName };
  if (id.lastName) payload.l = id.lastName;
  if (id.invite) payload.i = 1;
  const payloadB64 = b64urlEncode(JSON.stringify(payload));
  return `${payloadB64}.${sign(payloadB64, key)}`;
}

/**
 * Verify a token and return the identity it carries, or null if the token is
 * missing, malformed, or its signature does not match the configured secret.
 */
export function verifyIdentityToken(token: unknown, key: string = secret()): Identity | null {
  if (typeof token !== 'string' || !key) return null;
  const dot = token.indexOf('.');
  if (dot <= 0 || dot === token.length - 1) return null;

  const payloadB64 = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  const expected = sign(payloadB64, key);

  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;

  try {
    const obj = JSON.parse(b64urlDecode(payloadB64).toString('utf8'));
    const email = typeof obj.e === 'string' ? obj.e.trim() : '';
    const firstName = typeof obj.n === 'string' ? obj.n.trim() : '';
    if (!email || !firstName) return null;
    const lastName = typeof obj.l === 'string' && obj.l.trim() ? obj.l.trim() : undefined;
    const invite = obj.i === 1 || obj.i === '1' || obj.i === true;
    return { email, firstName, lastName, invite };
  } catch {
    return null;
  }
}
