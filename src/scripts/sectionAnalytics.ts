// First-party "time spent per section" analytics.
//
// Block-resistant BY DESIGN: measurements are sent to our OWN same-origin
// endpoint (/api/metrics) via navigator.sendBeacon. Privacy extensions and ad
// blockers kill third-party trackers (googletagmanager, etc.) but do not touch
// first-party requests to your own domain, so this keeps working where GA4 is
// blocked (including Jose's own Chrome). GA4 is mirrored best-effort only, for
// the convenience of its free dashboard — never relied upon.
//
// "Sections" are auto-discovered as the direct children of <main>, so every
// page is instrumented with zero per-page wiring. A section's name is resolved
// from, in order: data-section -> id -> first heading text -> first class name.
// Add data-section="nombre" to any block to give it a clean, stable label.
//
// Attention model: at any instant only ONE section is "active" — the one with
// the largest visible area. Time accrues to the active section, so per-section
// totals don't double-count overlapping blocks and roughly sum to page time.
// No personal data is collected (Ley 1581): only path, locale, section name,
// milliseconds, a random first-party visitor id (no PII, never shared), an
// ephemeral per-load id, and viewport width.

type Tracked = { el: Element; name: string; ratio: number; dwell: number };

(() => {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

  const main = document.querySelector('main');
  if (!main) return;

  const SKIP = new Set(['SCRIPT', 'STYLE', 'TEMPLATE', 'NOSCRIPT', 'LINK', 'META']);

  const slug = (s: string) =>
    s
      .trim()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 60);

  const nameFor = (el: Element, i: number): string => {
    const ds = el.getAttribute('data-section');
    if (ds) return slug(ds) || `seccion-${i + 1}`;
    if (el.id) return slug(el.id) || `seccion-${i + 1}`;
    const h = el.querySelector('h1, h2, h3');
    if (h && h.textContent) {
      const ht = slug(h.textContent);
      if (ht) return ht;
    }
    const cls = (el.getAttribute('class') || '').split(/\s+/).find(Boolean);
    if (cls) return slug(cls) || `seccion-${i + 1}`;
    return `seccion-${i + 1}`;
  };

  const els = Array.from(main.children).filter((el) => !SKIP.has(el.tagName));
  if (!els.length) return;

  const seen = new Map<string, number>();
  const tracked: Tracked[] = els.map((el, i) => {
    let name = nameFor(el, i);
    const dupes = seen.get(name) || 0;
    seen.set(name, dupes + 1);
    if (dupes > 0) name = `${name}-${dupes + 1}`;
    return { el, name, ratio: 0, dwell: 0 };
  });
  const byEl = new Map<Element, Tracked>(tracked.map((t) => [t.el, t]));

  let active: Tracked | null = null;
  let activeSince = performance.now();

  // Persistent per-browser visitor id (random, first-party, no PII) so the
  // dashboard can count unique visitors. Falls back to a per-load id when
  // localStorage is unavailable (private mode / blocked) — those loads then
  // count as one visitor each, never breaking the page.
  const VID_KEY = 'aisc_vid';
  const visitorId = (() => {
    try {
      let v = localStorage.getItem(VID_KEY);
      if (!v || !/^[a-z0-9]{8,16}$/.test(v)) {
        v = Math.random().toString(36).slice(2, 14).padEnd(8, '0');
        localStorage.setItem(VID_KEY, v);
      }
      return v;
    } catch {
      return 'x' + Math.random().toString(36).slice(2, 13);
    }
  })();
  // Composite id: "<visitor>.<page-load>". The server dedupes per-load by the
  // full string (unchanged behavior) and derives unique visitors from the part
  // before the dot.
  const sessionId =
    visitorId +
    '.' +
    Math.random().toString(36).slice(2) +
    Math.floor(performance.now()).toString(36);

  // Move accrued time onto the currently-active section and re-pick the active
  // one (largest visible area, page must be foregrounded).
  const settle = () => {
    const now = performance.now();
    if (active) active.dwell += now - activeSince;
    let best: Tracked | null = null;
    if (!document.hidden) {
      for (const t of tracked) {
        if (t.ratio > 0 && (!best || t.ratio > best.ratio)) best = t;
      }
    }
    active = best;
    activeSince = now;
  };

  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        const t = byEl.get(e.target);
        if (t) t.ratio = e.isIntersecting ? e.intersectionRatio : 0;
      }
      settle();
    },
    { threshold: [0, 0.25, 0.5, 0.75, 1] },
  );
  tracked.forEach((t) => io.observe(t.el));

  const MIN_MS = 250; // ignore drive-by glances under 0.25s

  // Each flush sends the CUMULATIVE dwell so far for this page-load (never
  // resets). All flushes for a load share the same sessionId, so the server
  // dedupes by taking MAX(ms) per (sessionId, section): the last/largest
  // snapshot wins. That makes periodic flushes idempotent (no double-count) yet
  // keeps crash-reliability, and lets the dashboard count real visits
  // (distinct sessionId) and true average dwell per visit. GA4 mirrors only the
  // final snapshot so its event values aren't inflated by interim flushes.
  const flush = (final: boolean) => {
    settle();
    const sections = tracked
      .filter((t) => t.dwell >= MIN_MS)
      .map((t) => ({ section: t.name, ms: Math.round(t.dwell) }));
    if (!sections.length) return;

    const payload = {
      path: location.pathname,
      locale: document.documentElement.lang || '',
      sid: sessionId,
      vw: window.innerWidth,
      sections,
    };

    // Primary, block-resistant sink: our own endpoint.
    try {
      const blob = new Blob([JSON.stringify(payload)], { type: 'application/json' });
      const sent = typeof navigator.sendBeacon === 'function' && navigator.sendBeacon('/api/metrics', blob);
      if (!sent) {
        fetch('/api/metrics', {
          method: 'POST',
          body: JSON.stringify(payload),
          headers: { 'Content-Type': 'application/json' },
          keepalive: true,
        }).catch(() => {});
      }
    } catch {
      /* analytics must never break the page */
    }

    // Secondary, best-effort sink: GA4 (silently skipped when blocked). Only on
    // the final snapshot, so interim cumulative flushes don't multi-count.
    if (!final) return;
    const g = (window as unknown as { gtag?: (...a: unknown[]) => void }).gtag;
    if (typeof g === 'function') {
      for (const s of sections) {
        g('event', 'section_dwell', {
          section: s.section,
          page_path: location.pathname,
          value: Math.round(s.ms / 1000),
        });
      }
    }
  };

  // visibilitychange->hidden is the one flush signal that fires reliably on
  // both mobile and desktop (pagehide/unload are unreliable on mobile).
  document.addEventListener('visibilitychange', () => {
    settle();
    if (document.hidden) flush(true);
  });
  window.addEventListener('pagehide', () => flush(true));
  // Safety net for very long sessions: a non-final cumulative snapshot, so a
  // closed tab that never fires the events above still has data on the server.
  window.setInterval(() => {
    if (!document.hidden) flush(false);
  }, 30000);
})();
