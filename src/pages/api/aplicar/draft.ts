import type { APIRoute } from 'astro';
import { upsertDraft } from '../../../lib/hackathon-apply/draftSupabase';
import { clientIp, rateLimit, isHoneypot } from '../../../lib/antiAbuse';

export const prerender = false;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function hashIp(ip: string | null | undefined): Promise<string | null> {
  if (!ip) return null;
  try {
    const enc = new TextEncoder();
    const buf = await crypto.subtle.digest('SHA-256', enc.encode(`aisc:${ip}`));
    return Array.from(new Uint8Array(buf))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('')
      .slice(0, 32);
  } catch {
    return null;
  }
}

const noContent = () => new Response(null, { status: 204 });

export const POST: APIRoute = async ({ request, clientAddress }) => {
  // Drafts fire on blur/submit/pagehide but are deduped client-side per email,
  // so a generous cap still never trips for a real user.
  if (!rateLimit(clientIp(request, clientAddress), 30, 10 * 60 * 1000).ok) {
    return noContent();
  }

  let raw: any;
  try {
    raw = await request.json();
  } catch {
    return noContent();
  }
  if (!raw || typeof raw !== 'object') return noContent();
  if (isHoneypot(raw)) return noContent();

  const locale = raw.locale === 'en' ? 'en' : 'es';
  const firstName = typeof raw.firstName === 'string' ? raw.firstName.trim().slice(0, 100) : '';
  const lastName = typeof raw.lastName === 'string' ? raw.lastName.trim().slice(0, 100) : '';
  const email = typeof raw.email === 'string' ? raw.email.trim().slice(0, 200) : '';

  if (!firstName || !lastName || !email) return noContent();
  if (!EMAIL_RE.test(email)) return noContent();

  const userAgent = (request.headers.get('user-agent') || '').slice(0, 300) || null;
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    clientAddress ||
    null;
  const ipHash = await hashIp(ip || undefined);

  upsertDraft({ locale, firstName, lastName, email, userAgent, ipHash }).catch(() => undefined);

  return noContent();
};
