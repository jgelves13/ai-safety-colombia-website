/**
 * Lightweight, dependency-free abuse guards for the public form endpoints.
 *
 * Goals (per Jose, 2026-06-12): protect the free-tier quotas (Resend 100
 * mails/day, Supabase, Vercel functions) from bot floods WITHOUT adding any
 * friction for real users — no CAPTCHA, no visible challenge.
 *
 *  - `clientIp`     — best-effort client IP from proxy headers
 *  - `rateLimit`    — in-memory token bucket keyed by IP (generous threshold)
 *  - `isHoneypot`   — true when the hidden honeypot field was filled (a bot)
 *
 * The rate limiter is in-memory and therefore per-warm-instance, not global.
 * That is intentional: it is a flood backstop, not an accounting system. The
 * real per-user protection is the honeypot; Cloudflare in front handles the
 * volumetric/DDoS layer.
 */

export function clientIp(request: Request, clientAddress?: string | null): string {
  const xff = request.headers.get('x-forwarded-for');
  if (xff) {
    const first = xff.split(',')[0]?.trim();
    if (first) return first;
  }
  return request.headers.get('x-real-ip') || clientAddress || 'unknown';
}

interface Bucket {
  count: number;
  reset: number;
}

// Module-level map persists across invocations on a warm serverless instance.
const buckets = new Map<string, Bucket>();

export interface RateLimitResult {
  ok: boolean;
  retryAfter: number; // seconds
}

/**
 * Returns `{ ok: false }` once `limit` requests from the same IP have been
 * seen within `windowMs`. Thresholds are deliberately generous so a real
 * person (who submits once, maybe retries) never trips them.
 */
export function rateLimit(
  ip: string,
  limit: number,
  windowMs: number,
  now: number = Date.now(),
): RateLimitResult {
  // Opportunistic prune so the map can't grow without bound under attack.
  if (buckets.size > 5000) {
    for (const [k, b] of buckets) {
      if (now > b.reset) buckets.delete(k);
    }
  }

  const existing = buckets.get(ip);
  if (!existing || now > existing.reset) {
    buckets.set(ip, { count: 1, reset: now + windowMs });
    return { ok: true, retryAfter: 0 };
  }

  existing.count += 1;
  if (existing.count > limit) {
    return { ok: false, retryAfter: Math.max(1, Math.ceil((existing.reset - now) / 1000)) };
  }
  return { ok: true, retryAfter: 0 };
}

/**
 * The forms render a hidden field named `website` that humans never see or
 * fill. If it arrives non-empty, the sender is almost certainly a bot.
 */
export function isHoneypot(raw: unknown): boolean {
  if (!raw || typeof raw !== 'object') return false;
  const v = (raw as Record<string, unknown>).website;
  return typeof v === 'string' && v.trim().length > 0;
}
