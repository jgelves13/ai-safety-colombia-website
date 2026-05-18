# Events Page + Hackathon Enrichment Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a bilingual Events page sourced from the org's Instagram and fully rebuild the Hackathon page with real Apart Research sprint data, both matching the shipped Apart-style light redesign.

**Architecture:** Astro 5 static bilingual site (ES default, EN under `/en/`). To keep ES/EN content in sync, both new surfaces use a shared body component rendered by thin locale wrappers (mirrors the spec's "thin wrappers render a shared body" intent and the DRY principle). One piece of real logic — splitting events into upcoming/past and sorting — is extracted into a pure, dependency-free ESM helper (`src/utils/events.js`) and unit-tested with Node's built-in `node:test` runner (no new dependency; the codebase has no test framework and adding one would be scope creep). Everything else is static markup verified by `astro build` succeeding plus a Playwright computed-style/visual sweep, matching how the prior redesign was QA'd.

**Tech Stack:** Astro 5.8, TypeScript/JS (ESM), `node:test`, Playwright (via MCP browser tools), Chrome extension MCP tools (Instagram capture), no CSS framework (hand-rolled tokens in `src/styles/global.css`).

**Approved spec:** `docs/superpowers/specs/2026-05-16-events-page-hackathon-design.md`

---

## Standing Constraints (read before executing any task)

- **Commits are LOCAL only.** Every task ends with a local `git commit`. Do **NOT** `git push` or trigger a Vercel deploy at any point. Deployment is explicitly out of this plan and only happens when Jose explicitly asks.
- Project root (buildable copy, also a git repo on `master`): `C:/Users/joseg/Documents/ai-safety-colombia-website`. Run all `npm`/`git`/`node` commands there.
- No em dashes in body/UI copy: use colons, commas, or periods.
- Currency format: Spanish `USD X.XXX` (e.g. `USD 1.000`), English `US$X,XXX` (e.g. `US$1,000`). Never a bare `$` in Spanish copy.
- Python on this machine is `py` (not needed here, noted for completeness).
- The codebase uses 2-space indentation, `var(--token)` CSS custom properties, scoped `<style>` in `.astro` files. Match it.

---

## File Structure

**Create:**
- `src/utils/events.js` — pure `splitEvents()` helper (upcoming/past split + sort). One responsibility: event partitioning.
- `test/events.test.js` — `node:test` unit tests for `splitEvents()`.
- `src/components/EventCard.astro` — one event row (Style 2: flyer thumb left, editorial text right). One responsibility: render a single event.
- `src/components/EventsPage.astro` — Events page body (hero + Próximos + Pasados). Rendered by both locale wrappers.
- `src/components/HackathonContent.astro` — rebuilt Hackathon page body (9 sections, Direction A + dark CTA band). Rendered by both locale wrappers.
- `src/pages/eventos.astro` — ES Events route (thin wrapper).
- `src/pages/en/events.astro` — EN Events route (thin wrapper).
- `src/data/events.json` — captured event data.
- `public/events/*.jpg` — flyer images (committed; Instagram CDN URLs expire).

**Modify:**
- `src/i18n/ui.ts` — add `esEnPaths` mapping + nav/events UI keys.
- `src/components/Navbar.astro` — add Events link to `links` array.
- `src/components/Footer.astro` — add Instagram link.
- `src/pages/contacto.astro`, `src/pages/en/contact.astro` — add Instagram channel.
- `src/pages/hackathon.astro`, `src/pages/en/hackathon.astro` — replace body with `<HackathonContent>` wrapper.
- `src/data/hackathon.json` — real Apart sprint data.

Note: `Navbar.isActive(page)` is already generic (`currentPage === page`); the spec's "add isActive handling" is unnecessary. Passing `currentPage="events"` from the page is sufficient. No `isActive` change is made.

---

## Task 1: i18n foundation (paths + UI keys)

**Files:**
- Modify: `src/i18n/ui.ts`

- [ ] **Step 1: Add the Events route mapping to `esEnPaths`**

In `src/i18n/ui.ts`, replace the `esEnPaths` object (currently lines ~90-96):

```ts
const esEnPaths: Record<string, string> = {
  '/sobre/': '/about/',
  '/programas/': '/programs/',
  '/recursos/': '/resources/',
  '/involucrate/': '/get-involved/',
  '/contacto/': '/contact/',
  '/eventos/': '/events/',
};
```

- [ ] **Step 2: Add Events UI keys to the `es` table**

In the `es: { ... }` block, after the line `'nav.hackathon': 'Hackathon',` add:

```ts
    'nav.events': 'Eventos',
```

And just before the line `'footer.tagline':` add this block of Events page keys:

```ts
    'events.hero.title': 'Eventos',
    'events.hero.subtitle': 'Charlas, paneles y talleres de seguridad de IA en Colombia.',
    'events.upcoming': 'Próximos eventos',
    'events.past': 'Eventos pasados',
    'events.viewInstagram': 'Ver en Instagram',
    'events.empty': 'Aún no hay eventos publicados. Síguenos en Instagram para enterarte de los próximos.',
```

- [ ] **Step 3: Add the same keys to the `en` table**

In the `en: { ... }` block, after `'nav.hackathon': 'Hackathon',` add:

```ts
    'nav.events': 'Events',
```

And just before `'footer.tagline':` in the `en` block add:

```ts
    'events.hero.title': 'Events',
    'events.hero.subtitle': 'AI safety talks, panels, and workshops in Colombia.',
    'events.upcoming': 'Upcoming',
    'events.past': 'Past events',
    'events.viewInstagram': 'View on Instagram',
    'events.empty': 'No events published yet. Follow us on Instagram for upcoming ones.',
```

- [ ] **Step 4: Type-check the i18n module**

Run: `cd "C:/Users/joseg/Documents/ai-safety-colombia-website" && npx astro check --minimumSeverity error 2>&1 | tail -5`
Expected: no errors referencing `src/i18n/ui.ts` (it is fine if `astro check` reports 0 errors, or only pre-existing unrelated warnings; there must be no new errors about `ui.ts` or missing keys).

- [ ] **Step 5: Commit**

```bash
cd "C:/Users/joseg/Documents/ai-safety-colombia-website" && git add src/i18n/ui.ts && git commit -m "feat(i18n): add Events route mapping and UI keys"
```

---

## Task 2: Site-wide Events nav link + Instagram links

**Files:**
- Modify: `src/components/Navbar.astro:17-23`
- Modify: `src/components/Footer.astro:32-38`
- Modify: `src/pages/contacto.astro:35-45`
- Modify: `src/pages/en/contact.astro:35-45`

- [ ] **Step 1: Add the Events link to the Navbar `links` array**

In `src/components/Navbar.astro`, replace the `links` array (currently lines 17-23) with:

```astro
const links = [
  { page: 'about', href: localePath(locale, '/sobre/'), label: t(locale, 'nav.about') },
  { page: 'hackathon', href: localePath(locale, '/hackathon/'), label: t(locale, 'nav.hackathon') },
  { page: 'events', href: localePath(locale, '/eventos/'), label: t(locale, 'nav.events') },
  { page: 'programs', href: localePath(locale, '/programas/'), label: t(locale, 'nav.programs') },
  { page: 'resources', href: localePath(locale, '/recursos/'), label: t(locale, 'nav.resources') },
  { page: 'get-involved', href: localePath(locale, '/involucrate/'), label: t(locale, 'nav.get-involved') },
];
```

(The desktop `nav-links` and `mobile-nav` both iterate `links`, so this single change covers both. `isActive('events')` already works because it is generic.)

- [ ] **Step 2: Add Instagram to the Footer community list**

In `src/components/Footer.astro`, replace the second `footer-links` block (currently lines 32-38) with:

```astro
      <div class="footer-links">
        <h4>{t(locale, 'footer.community')}</h4>
        <a href={localePath(locale, '/involucrate/')}>{t(locale, 'nav.get-involved')}</a>
        <a href={localePath(locale, '/contacto/')}>{t(locale, 'nav.contact')}</a>
        <a href="https://www.instagram.com/aisafetycolombia/" target="_blank" rel="noopener noreferrer">Instagram</a>
        <a href="https://chat.whatsapp.com/" target="_blank" rel="noopener noreferrer">WhatsApp</a>
        <a href="https://t.me/" target="_blank" rel="noopener noreferrer">Telegram</a>
      </div>
```

- [ ] **Step 3: Add Instagram to the ES Contact "Redes sociales" list**

In `src/pages/contacto.astro`, replace the social media `channel-list` block (currently lines 36-45) with:

```astro
          <div class="channel-list">
            <a href="https://www.instagram.com/aisafetycolombia/" target="_blank" rel="noopener noreferrer" class="channel-item">
              <span class="channel-icon">&#x1F4F7;</span>
              <span>Instagram</span>
            </a>
            <a href="https://twitter.com/AISafetyCO" target="_blank" rel="noopener noreferrer" class="channel-item">
              <span class="channel-icon">&#x1D54F;</span>
              <span>@AISafetyCO</span>
            </a>
            <a href="https://www.linkedin.com/company/ai-safety-colombia" target="_blank" rel="noopener noreferrer" class="channel-item">
              <span class="channel-icon">&#x1F517;</span>
              <span>LinkedIn</span>
            </a>
          </div>
```

- [ ] **Step 4: Add Instagram to the EN Contact "Social Media" list**

In `src/pages/en/contact.astro`, replace the social media `channel-list` block (currently lines 36-45) with the identical block from Step 3 (same markup; the list has no localized strings):

```astro
          <div class="channel-list">
            <a href="https://www.instagram.com/aisafetycolombia/" target="_blank" rel="noopener noreferrer" class="channel-item">
              <span class="channel-icon">&#x1F4F7;</span>
              <span>Instagram</span>
            </a>
            <a href="https://twitter.com/AISafetyCO" target="_blank" rel="noopener noreferrer" class="channel-item">
              <span class="channel-icon">&#x1D54F;</span>
              <span>@AISafetyCO</span>
            </a>
            <a href="https://www.linkedin.com/company/ai-safety-colombia" target="_blank" rel="noopener noreferrer" class="channel-item">
              <span class="channel-icon">&#x1F517;</span>
              <span>LinkedIn</span>
            </a>
          </div>
```

- [ ] **Step 5: Build to verify nav/footer/contact still compile**

Run: `cd "C:/Users/joseg/Documents/ai-safety-colombia-website" && npm run build 2>&1 | tail -8`
Expected: build completes with `Complete!` / no errors. (The `/eventos/` href will 404 until Task 7 creates the route; that is expected at this stage and does not fail the build.)

- [ ] **Step 6: Commit**

```bash
cd "C:/Users/joseg/Documents/ai-safety-colombia-website" && git add src/components/Navbar.astro src/components/Footer.astro src/pages/contacto.astro src/pages/en/contact.astro && git commit -m "feat(nav): add Events nav link and site-wide Instagram links"
```

---

## Task 3: Instagram data capture → `events.json` + flyers (build-prep, USER REVIEW GATE)

This task is interactive: it uses the Chrome extension MCP tools to read the public Instagram profile and save flyer images. It produces `src/data/events.json` and `public/events/*.jpg`, then **stops for Jose to fact-check before any page is wired**.

**Files:**
- Create: `src/data/events.json`
- Create: `public/events/<slug>.jpg` (one per event)

- [ ] **Step 1: Load the Chrome extension tools and open the profile**

Load via ToolSearch: `select:mcp__claude-in-chrome__tabs_context_mcp,mcp__claude-in-chrome__tabs_create_mcp,mcp__claude-in-chrome__navigate,mcp__claude-in-chrome__read_page,mcp__claude-in-chrome__find,mcp__claude-in-chrome__computer`
Call `mcp__claude-in-chrome__tabs_context_mcp` first. Create a new tab and navigate to `https://www.instagram.com/aisafetycolombia/`.
Expected: profile loads; `read_page` (accessibility tree) returns post links and caption-start text (confirmed working in brainstorming; `get_page_text` does NOT work on Instagram — use `read_page`).

- [ ] **Step 2: Capture each AIS Colombia own-event post**

For each post in the table below, open the post URL, use `read_page` to read the full caption, and extract: exact title, date (resolve the year from post recency / caption), optional time, venue, and a 1-2 line description. Write an ES description and an EN translation. Screenshot the flyer image and save it to `public/events/<slug>.jpg` (use `computer` screenshot of the post image region, or save the displayed image; the file must be a committed local image because Instagram CDN URLs expire).

Known posts (caption-start signals gathered in brainstorming; confirm exact data on open):

| Post URL | type | Signal |
|---|---|---|
| `https://www.instagram.com/aisafetycolombia/p/C-nthmtxIrQ/` | charla | "Riesgos de la IA", vie 16 ago, Said Saillant, Uniandes |
| `https://www.instagram.com/aisafetycolombia/p/DNOyrukPEnp/` | conversatorio | vie 15 ago 5:00 pm, beneficios/riesgos |
| `https://www.instagram.com/aisafetycolombia/p/DCAiVLnvGpN/` | panel | "Gobernanza de la IA", vie 8 nov 6:00 PM |
| `https://www.instagram.com/aisafetycolombia/p/DGysBZPvyUb/` | cena | invitado Juan David Gutiérrez |
| `https://www.instagram.com/aisafetycolombia/p/DAttjF_Ro76/` | cena | invitada María Paula Mújica |
| `https://www.instagram.com/aisafetycolombia/p/C_0sc3mOlfX/` | charla | 1ª charla "AE en Acción", 20 sep 6:00 PM |
| `https://www.instagram.com/aisafetycolombia/p/DKIQoQhvoQN/` | charla | EN community/collaboration post (verify on open) |
| `https://www.instagram.com/aisafetycolombia/p/C-1d1GOOERs/` | verify | event-promo wording, confirm on open |
| `https://www.instagram.com/aisafetycolombia/p/C-1YEhsOHLg/` | verify | event-promo wording, confirm on open |

Also scroll the profile grid to capture these three posts (no URL recorded yet; find them by caption while scrolling with `read_page`):
- taller: "Taller intensivo 3 días, bio + IA", sáb 31 ago 1:30-3:30 PM
- curso: "Curso en Seguridad de la IA" (AISF), cierre inscripciones 21 ago
- curso: curso 8 semanas, política para orientar el desarrollo de IA

**Exclude (not events):** `https://www.instagram.com/aisafetycolombia/p/DXNOo7DljSh/` (2025 national AI policy opinion post) and `https://www.instagram.com/aisafetycolombia/p/C_OS-1oRSbM/` (Global Challenges Project, Boston — external, not an AIS Colombia event). For any `verify` post, include it only if its caption announces a dated AIS Colombia activity; otherwise drop it.

If the extension disconnects and does not recover after 2-3 attempts, STOP and tell Jose (do not loop), per browser-automation guidelines.

- [ ] **Step 3: Write `src/data/events.json`**

Create `src/data/events.json` as a JSON array, newest-first, each object exactly this shape (this is the worked example for the Said Saillant superintelligence talk; produce one object per captured event with real captured values):

```json
[
  {
    "slug": "valor-humanidad-superinteligencia",
    "type": "charla",
    "date": "2024-09-20",
    "time": "18:00",
    "titleEs": "El valor de la humanidad ante la superinteligencia artificial",
    "titleEn": "The value of humanity in the face of artificial superintelligence",
    "descEs": "Charla con Said Saillant, PhD en Filosofía del MIT e investigador postdoctoral en Harvard, sobre los dilemas éticos del desarrollo de superinteligencias.",
    "descEn": "A talk with Said Saillant, MIT Philosophy PhD and Harvard postdoctoral researcher, on the ethical dilemmas of developing superintelligence.",
    "venueEs": "Universidad de los Andes",
    "venueEn": "Universidad de los Andes",
    "whyEs": "Primera charla de la organización, introduciendo los dilemas éticos de la superinteligencia con un investigador del MIT y Harvard.",
    "whyEn": "The organization's first talk, introducing the ethical dilemmas of superintelligence with an MIT and Harvard researcher.",
    "flyer": "valor-humanidad-superinteligencia.jpg",
    "instagramUrl": "https://www.instagram.com/aisafetycolombia/p/C_0sc3mOlfX/",
    "featured": false
  }
]
```

Rules: `slug` is kebab-case, unique, and equals the flyer filename without `.jpg`. `type` is one of `charla | panel | conversatorio | cena | taller | curso`. `date` is ISO `YYYY-MM-DD`. `time` is optional `"HH:MM"` 24h (omit the key if unknown). `descEs`/`descEn` are 1-2 lines, no em dashes. `whyEs`/`whyEn` are a single short sentence justifying why the event was meaningful (required on every event, per Jose's Task 3 review). Every `flyer` file must exist in `public/events/`.

**Task 3 review outcomes applied (Jose, 2026-05-17):** `DXNOo7DljSh` IS a real event (an April 2026 policy dinner) and is included; the post `C_OS-1oRSbM` (Global Challenges Project, Boston) remains excluded as external. The two `curso` posts (`C-1YEhsOHLg`, `C-1d1GOOERs`) and the Fernando Ávalos intro talk (`C-nthmtxIrQ`) are dropped. The Said Saillant talk is `C_0sc3mOlfX` (superintelligence, 2024-09-20), not the intro talk. Every event carries a `whyEs`/`whyEn` justification. Jose supplies the flyer JPEGs into `public/events/` using the exact slug filenames (image-file persistence is blocked in the automation environment). Final set is 7 events.

- [ ] **Step 4: STOP — User review gate**

Present the drafted `events.json` (titles, dates, types, descriptions) and the list of saved flyer filenames to Jose for a quick factual check. Do **not** proceed to Task 4 until Jose confirms the data is correct. Apply any corrections he gives, then continue.

- [ ] **Step 5: Commit**

```bash
cd "C:/Users/joseg/Documents/ai-safety-colombia-website" && git add src/data/events.json public/events && git commit -m "feat(events): capture AIS Colombia event data and flyers from Instagram"
```

---

## Task 4: `splitEvents` helper + unit tests

**Files:**
- Create: `src/utils/events.js`
- Test: `test/events.test.js`

- [ ] **Step 1: Write the failing test**

Create `test/events.test.js`:

```js
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { splitEvents } from '../src/utils/events.js';

const now = new Date('2026-05-17T12:00:00');

const sample = [
  { slug: 'a', date: '2024-08-16' },
  { slug: 'b', date: '2026-11-08' },
  { slug: 'c', date: '2024-09-20' },
  { slug: 'd', date: '2026-06-19' },
];

test('past events are everything before today, newest first', () => {
  const { past } = splitEvents(sample, now);
  assert.deepEqual(past.map(e => e.slug), ['c', 'a']);
});

test('upcoming events are today-or-later, soonest first', () => {
  const { upcoming } = splitEvents(sample, now);
  assert.deepEqual(upcoming.map(e => e.slug), ['d', 'b']);
});

test('an event dated exactly today counts as upcoming', () => {
  const { upcoming } = splitEvents([{ slug: 'x', date: '2026-05-17' }], now);
  assert.deepEqual(upcoming.map(e => e.slug), ['x']);
});

test('empty input yields empty sections', () => {
  const { upcoming, past } = splitEvents([], now);
  assert.deepEqual(upcoming, []);
  assert.deepEqual(past, []);
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `cd "C:/Users/joseg/Documents/ai-safety-colombia-website" && node --test test/events.test.js 2>&1 | tail -10`
Expected: FAIL — cannot resolve `../src/utils/events.js` (module does not exist yet).

- [ ] **Step 3: Write the minimal implementation**

Create `src/utils/events.js`:

```js
/**
 * @typedef {Object} AisEvent
 * @property {string} slug
 * @property {string} date  ISO date string, YYYY-MM-DD
 */

/**
 * Split events into upcoming (today or later, soonest first) and
 * past (before today, most recent first). Comparison is date-only.
 * @param {AisEvent[]} events
 * @param {Date} [now]
 * @returns {{ upcoming: AisEvent[], past: AisEvent[] }}
 */
export function splitEvents(events, now = new Date()) {
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const upcoming = [];
  const past = [];
  for (const ev of events) {
    const d = new Date(ev.date + 'T00:00:00');
    if (d >= today) upcoming.push(ev);
    else past.push(ev);
  }
  upcoming.sort((a, b) => a.date.localeCompare(b.date));
  past.sort((a, b) => b.date.localeCompare(a.date));
  return { upcoming, past };
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `cd "C:/Users/joseg/Documents/ai-safety-colombia-website" && node --test test/events.test.js 2>&1 | tail -10`
Expected: PASS — `# pass 4`, `# fail 0`.

- [ ] **Step 5: Commit**

```bash
cd "C:/Users/joseg/Documents/ai-safety-colombia-website" && git add src/utils/events.js test/events.test.js && git commit -m "feat(events): add splitEvents helper with unit tests"
```

---

## Task 5: `EventCard.astro` component

**Files:**
- Create: `src/components/EventCard.astro`

- [ ] **Step 1: Create the component**

Create `src/components/EventCard.astro` with this exact content:

```astro
---
import type { Locale } from '../i18n/ui';
import { t } from '../i18n/ui';

interface EventItem {
  slug: string;
  type: string;
  date: string;
  time?: string;
  titleEs: string;
  titleEn: string;
  descEs: string;
  descEn: string;
  venueEs: string;
  venueEn: string;
  whyEs: string;
  whyEn: string;
  flyer: string;
  instagramUrl: string;
  featured?: boolean;
}

interface Props {
  event: EventItem;
  locale: Locale;
}

const { event, locale } = Astro.props;

// AA-safe tag colors, mirroring the approved Style 2 mockup (green #15803D,
// coral #FF5645, darkened blue #0090c4, ink #101010, yellow-line #B07A00).
const TYPE_MAP: Record<string, { es: string; en: string; color: string }> = {
  charla:        { es: 'Charla',        en: 'Talk',         color: '#15803D' },
  panel:         { es: 'Panel',         en: 'Panel',        color: '#FF5645' },
  conversatorio: { es: 'Conversatorio', en: 'Conversation', color: '#0090c4' },
  cena:          { es: 'Cena',          en: 'Dinner',       color: '#101010' },
  taller:        { es: 'Taller',        en: 'Workshop',     color: '#15803D' },
  curso:         { es: 'Curso',         en: 'Course',       color: '#B07A00' },
};

const meta = TYPE_MAP[event.type] ?? { es: event.type, en: event.type, color: '#101010' };
const tagLabel = locale === 'es' ? meta.es : meta.en;
const title = locale === 'es' ? event.titleEs : event.titleEn;
const desc = locale === 'es' ? event.descEs : event.descEn;
const venue = locale === 'es' ? event.venueEs : event.venueEn;
const why = locale === 'es' ? event.whyEs : event.whyEn;

const dateFmt = new Intl.DateTimeFormat(locale === 'es' ? 'es-CO' : 'en-US', {
  day: 'numeric', month: 'short', year: 'numeric',
});
const dateLabel = dateFmt.format(new Date(event.date + 'T00:00:00'));
const metaParts = [dateLabel, event.time, venue].filter(Boolean);
---

<article class="event-card">
  <a class="event-flyer" href={event.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label={title}>
    <img src={`/events/${event.flyer}`} alt={`${title} — flyer`} loading="lazy" />
  </a>
  <div class="event-body">
    <span class="event-tag" style={`color:${meta.color}`}>{tagLabel}</span>
    <h3 class="event-title">{title}</h3>
    <p class="event-meta">{metaParts.join(' · ')}</p>
    <p class="event-desc">{desc}</p>
    <p class="event-why">{why}</p>
    <a class="event-link" href={event.instagramUrl} target="_blank" rel="noopener noreferrer">
      {t(locale, 'events.viewInstagram')} &rarr;
    </a>
  </div>
</article>

<style>
  .event-card {
    display: flex;
    gap: 1.25rem;
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 1.25rem;
    background: #FFFFFF;
  }

  .event-flyer {
    width: 96px;
    flex: none;
    aspect-ratio: 3 / 4;
    border-radius: 12px;
    overflow: hidden;
    display: block;
  }

  .event-flyer img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .event-body {
    display: flex;
    flex-direction: column;
    min-width: 0;
  }

  .event-tag {
    font-size: 0.6875rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }

  .event-title {
    font-size: 1.0625rem;
    font-weight: 600;
    letter-spacing: -0.01em;
    color: var(--text-primary);
    margin: 0.25rem 0;
  }

  .event-meta {
    font-size: 0.8125rem;
    color: var(--text-secondary);
  }

  .event-desc {
    font-size: 0.8125rem;
    color: var(--text-secondary);
    line-height: 1.5;
    margin-top: 0.375rem;
  }

  .event-why {
    font-size: 0.8125rem;
    color: var(--text-primary);
    line-height: 1.5;
    margin-top: 0.5rem;
    padding-left: 0.625rem;
    border-left: 2px solid var(--accent-green);
  }

  .event-link {
    font-size: 0.8125rem;
    font-weight: 600;
    color: var(--green-text);
    margin-top: 0.625rem;
  }

  @media (max-width: 768px) {
    .event-card {
      flex-direction: column;
    }
    .event-flyer {
      width: 100%;
      aspect-ratio: 16 / 9;
    }
  }
</style>
```

- [ ] **Step 2: Build to verify the component compiles**

Run: `cd "C:/Users/joseg/Documents/ai-safety-colombia-website" && npm run build 2>&1 | tail -6`
Expected: build completes with no errors (component is not yet imported anywhere, so it only needs to type-check via the build).

- [ ] **Step 3: Commit**

```bash
cd "C:/Users/joseg/Documents/ai-safety-colombia-website" && git add src/components/EventCard.astro && git commit -m "feat(events): add EventCard component (Style 2)"
```

---

## Task 6: `EventsPage.astro` body component

**Files:**
- Create: `src/components/EventsPage.astro`

- [ ] **Step 1: Create the shared body component**

Create `src/components/EventsPage.astro` with this exact content:

```astro
---
import type { Locale } from '../i18n/ui';
import { t } from '../i18n/ui';
import EventCard from './EventCard.astro';
import { splitEvents } from '../utils/events.js';
import eventsData from '../data/events.json';

interface Props {
  locale: Locale;
}

const { locale } = Astro.props;
const { upcoming, past } = splitEvents(eventsData);
const hasAny = upcoming.length + past.length > 0;
---

<section class="hero-mini">
  <div class="container">
    <h1 class="section-title">{t(locale, 'events.hero.title')}</h1>
    <p class="page-desc">{t(locale, 'events.hero.subtitle')}</p>
  </div>
</section>

{upcoming.length > 0 && (
  <section class="section">
    <div class="container">
      <h2 class="section-label">{t(locale, 'events.upcoming')}</h2>
      <div class="events-list">
        {upcoming.map(ev => <EventCard event={ev} locale={locale} />)}
      </div>
    </div>
  </section>
)}

<section class="section">
  <div class="container">
    {hasAny ? (
      <>
        <h2 class="section-label">{t(locale, 'events.past')}</h2>
        <div class="events-grid">
          {past.map(ev => <EventCard event={ev} locale={locale} />)}
        </div>
      </>
    ) : (
      <p class="events-empty">
        {t(locale, 'events.empty')}{' '}
        <a href="https://www.instagram.com/aisafetycolombia/" target="_blank" rel="noopener noreferrer">@aisafetycolombia</a>
      </p>
    )}
  </div>
</section>

<style>
  .hero-mini {
    padding: 9rem 1.5rem 3rem;
    text-align: center;
  }

  .page-desc {
    color: var(--text-secondary);
    font-size: 1.125rem;
    max-width: 700px;
    margin: 0 auto;
    line-height: 1.7;
  }

  .section-label {
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--green-text);
    margin-bottom: 1.25rem;
  }

  .events-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .events-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  .events-empty {
    color: var(--text-secondary);
    font-size: 1rem;
  }

  @media (max-width: 768px) {
    .events-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
```

- [ ] **Step 2: Build to verify it compiles**

Run: `cd "C:/Users/joseg/Documents/ai-safety-colombia-website" && npm run build 2>&1 | tail -6`
Expected: build completes with no errors.

- [ ] **Step 3: Commit**

```bash
cd "C:/Users/joseg/Documents/ai-safety-colombia-website" && git add src/components/EventsPage.astro && git commit -m "feat(events): add EventsPage body component"
```

---

## Task 7: Events routes (`/eventos/` + `/en/events/`) + build verification

**Files:**
- Create: `src/pages/eventos.astro`
- Create: `src/pages/en/events.astro`

- [ ] **Step 1: Create the ES route wrapper**

Create `src/pages/eventos.astro`:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import EventsPage from '../components/EventsPage.astro';

const locale = 'es';
---

<BaseLayout locale={locale} currentPage="events" title="Eventos | AI Safety Colombia" description="Charlas, paneles y talleres de seguridad de IA organizados por AI Safety Colombia.">
  <EventsPage locale={locale} />
</BaseLayout>
```

- [ ] **Step 2: Create the EN route wrapper**

Create `src/pages/en/events.astro`:

```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import EventsPage from '../../components/EventsPage.astro';

const locale = 'en';
---

<BaseLayout locale={locale} currentPage="events" title="Events | AI Safety Colombia" description="AI safety talks, panels, and workshops hosted by AI Safety Colombia.">
  <EventsPage locale={locale} />
</BaseLayout>
```

- [ ] **Step 3: Build and verify both routes emit**

Run: `cd "C:/Users/joseg/Documents/ai-safety-colombia-website" && npm run build 2>&1 | tail -6 && ls dist/eventos/index.html dist/en/events/index.html`
Expected: build completes with no errors; both `dist/eventos/index.html` and `dist/en/events/index.html` are listed (exist).

- [ ] **Step 4: Verify the language toggle and nav wiring**

Run: `cd "C:/Users/joseg/Documents/ai-safety-colombia-website" && grep -o '/en/events/' dist/eventos/index.html | head -1 && grep -o 'href="/eventos/"' dist/en/events/index.html | head -1`
Expected: first command prints `/en/events/` (ES page links to EN alternate via `altHref`); second prints `href="/eventos/"` (EN page's nav links back to ES route). Both non-empty.

- [ ] **Step 5: Commit**

```bash
cd "C:/Users/joseg/Documents/ai-safety-colombia-website" && git add src/pages/eventos.astro src/pages/en/events.astro && git commit -m "feat(events): add /eventos/ and /en/events/ routes"
```

---

## Task 8: Real Apart data in `hackathon.json`

**Files:**
- Modify: `src/data/hackathon.json` (full replace)

- [ ] **Step 1: Replace `src/data/hackathon.json` with the real Apart sprint data**

Overwrite `src/data/hackathon.json` with exactly:

```json
{
  "date": "2026-06-19",
  "endDate": "2026-06-21",
  "location": "Online + hub Bogotá",
  "organizer": "Apart Research",
  "hubOrganizer": "AI Safety Colombia",
  "registrationUrl": "https://apartresearch.com/sprints/global-south-ais-hackathon-2026-06-19-to-2026-06-21",
  "contactEmail": "sprints@apartresearch.com",
  "support": "Schmidt Sciences",
  "whatIsEs": "Apart Research lleva la seguridad de IA al Sur Global. Investigadores, ingenieros y profesionales de política de América Latina, África y Asia abordan riesgos de IA relevantes para sus regiones durante un fin de semana. AI Safety Colombia organiza el hub de Bogotá.",
  "whatIsEn": "Apart Research brings AI safety to the Global South. Researchers, engineers, and policy professionals from Latin America, Africa, and Asia tackle AI risks relevant to their regions over a weekend. AI Safety Colombia runs the Bogotá hub.",
  "submissionEs": "Cada equipo entrega un reporte de investigación en PDF que documenta enfoque, resultados e implicaciones.",
  "submissionEn": "Each team submits a research report (PDF) documenting approach, results, and implications.",
  "pipeline": [
    { "stepEs": "Hackathon", "stepEn": "Hackathon", "descEs": "Un fin de semana construyendo evaluaciones, herramientas o investigación de política.", "descEn": "A weekend building evaluations, tools, or policy research." },
    { "stepEs": "Apart Fellowship", "stepEn": "Apart Fellowship", "descEs": "Los mejores equipos son invitados al Apart Fellowship para profundizar su trabajo.", "descEn": "Top teams are invited to the Apart Fellowship to deepen their work." },
    { "stepEs": "Investigación y colocación", "stepEn": "Research & placement", "descEs": "Mentoría y revisión de expertos hacia investigación publicable y oportunidades.", "descEn": "Expert mentoring and review toward publishable research and opportunities." }
  ],
  "tracks": [
    { "labelEs": "Technical AI Safety", "labelEn": "Technical AI Safety", "descEs": "Evaluaciones, interpretabilidad, robustez y herramientas de seguridad aplicadas a modelos.", "descEn": "Evaluations, interpretability, robustness, and safety tooling applied to models.", "accent": "is-green" },
    { "labelEs": "AI Governance & Policy", "labelEn": "AI Governance & Policy", "descEs": "Mecanismos de gobernanza, evaluación de riesgos regionales y herramientas de política.", "descEn": "Governance mechanisms, regional risk assessment, and policy tooling.", "accent": "is-coral" }
  ],
  "eligibility": [
    { "es": "Investigadores e ingenieros de IA", "en": "AI researchers and engineers" },
    { "es": "Investigadores de ML", "en": "ML researchers" },
    { "es": "Investigadores de política y gobernanza", "en": "Policy and governance researchers" },
    { "es": "Ingenieros de software", "en": "Software engineers" },
    { "es": "Red teamers y seguridad", "en": "Red teamers and security researchers" },
    { "es": "Estudiantes y early-career", "en": "Students and early-career" }
  ],
  "hubs": [
    { "city": "São Paulo", "bogota": false },
    { "city": "Buenos Aires", "bogota": false },
    { "city": "Bogotá", "bogota": true },
    { "city": "Mérida", "bogota": false }
  ],
  "prizesDetail": {
    "amountEs": "USD 1.000 por equipo",
    "amountEn": "US$1,000 per team",
    "headlineEs": "3 equipos ganadores en América Latina",
    "headlineEn": "3 winning teams in Latin America",
    "totalEs": "USD 3.000 en premios para LATAM",
    "totalEn": "US$3,000 in prizes for LATAM",
    "perks": [
      { "es": "Invitación al Apart Fellowship", "en": "Apart Fellowship invitation" },
      { "es": "Mentoría y revisión de expertos", "en": "Expert mentoring and review" },
      { "es": "Apoyo: Schmidt Sciences", "en": "Supported by Schmidt Sciences" }
    ]
  },
  "schedule": [
    { "day": "Viernes 19", "dayEn": "Friday 19", "accent": "is-green", "events": [
      { "time": "—", "title": "Apertura y formación de equipos", "titleEn": "Opening and team formation" }
    ]},
    { "day": "Sábado 20", "dayEn": "Saturday 20", "accent": "is-blue", "events": [
      { "time": "—", "title": "Construcción con mentoría", "titleEn": "Building with mentoring" }
    ]},
    { "day": "Domingo 21", "dayEn": "Sunday 21", "accent": "is-yellow", "events": [
      { "time": "—", "title": "Entrega del reporte (PDF) y revisión", "titleEn": "Report submission (PDF) and review" }
    ]}
  ],
  "speakers": [
    { "name": "Juan Pablo Toro Ramírez", "role": "Speaker", "org": "Colombia" }
  ],
  "judges": [],
  "prizes": {
    "regional": "US$1,000 per team (3 LATAM winners)",
    "regionalEs": "USD 1.000 por equipo (3 ganadores LATAM)"
  }
}
```

(`prizes` is kept for backward compatibility but the rebuilt page uses `prizesDetail`. `schedule[].events[].time` uses `"—"` as a placeholder dash because the Apart sprint runs as a continuous weekend with no fixed hourly agenda; the rebuilt page renders days as editorial rows, not a timed grid.)

- [ ] **Step 2: Validate the JSON parses**

Run: `cd "C:/Users/joseg/Documents/ai-safety-colombia-website" && node -e "JSON.parse(require('fs').readFileSync('src/data/hackathon.json','utf8')); console.log('ok')"`
Expected: prints `ok`.

- [ ] **Step 3: Commit**

```bash
cd "C:/Users/joseg/Documents/ai-safety-colombia-website" && git add src/data/hackathon.json && git commit -m "feat(hackathon): replace placeholder with real Apart sprint data"
```

---

## Task 9: `HackathonContent.astro` rebuilt body (Direction A + dark CTA band)

**Files:**
- Create: `src/components/HackathonContent.astro`

- [ ] **Step 1: Create the rebuilt body component**

Create `src/components/HackathonContent.astro` with this exact content (9 sections: hero with kept countdown → Qué es → pipeline → 2 tracks → premios → hubs → eligibility → 3-day agenda → dark closing CTA band):

```astro
---
import type { Locale } from '../i18n/ui';
import data from '../data/hackathon.json';

interface Props {
  locale: Locale;
}

const { locale } = Astro.props;
const es = locale === 'es';

const heroDate = new Date(data.date + 'T00:00:00');
const now = new Date();
const daysLeft = Math.max(0, Math.ceil((heroDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));

const tx = {
  kicker: es ? 'Apart Research · Sprint del Sur Global' : 'Apart Research · Global South Sprint',
  h1a: 'Global South',
  h1b: 'AI Safety Hackathon',
  sub: es
    ? 'Un fin de semana para construir herramientas, evaluaciones e investigación de política sobre los riesgos de IA que más importan en la región.'
    : 'A weekend building tools, evaluations, and policy research on the AI risks that matter most in the region.',
  hook: es
    ? 'USD 3.000 en premios · 3 equipos LATAM · 19–21 jun 2026'
    : 'US$3,000 in prizes · 3 LATAM teams · Jun 19–21 2026',
  ctaPrimary: es ? 'Regístrate en Apart' : 'Register on Apart',
  ctaSecondary: es ? 'Ver bases' : 'View details',
  countdownLabel: es ? 'días restantes' : 'days left',
  whatTitle: es ? 'Qué es' : 'What it is',
  whatBody: es ? data.whatIsEs : data.whatIsEn,
  whyTitle: es ? 'Por qué participar' : 'Why take part',
  tracksTitle: es ? 'Dos tracks' : 'Two tracks',
  prizesTitle: es ? 'Premios' : 'Prizes',
  hubsTitle: es ? 'Hubs de la región' : 'Regional hubs',
  hubsNote: es ? 'Más hubs en África y Asia.' : 'Additional hubs in Africa and Asia.',
  whoTitle: es ? 'Quién puede participar' : 'Who can take part',
  agendaTitle: es ? 'Agenda · 3 días' : 'Agenda · 3 days',
  submission: es ? data.submissionEs : data.submissionEn,
  ctaBandTitle: es ? 'Forma tu equipo este junio' : 'Form your team this June',
  ctaBandSub: es
    ? 'Inscríbete en la página del sprint de Apart Research.'
    : 'Sign up on the Apart Research sprint page.',
};
---

<section class="hk-hero">
  <div class="container">
    <p class="hk-kicker">{tx.kicker}</p>
    <h1 class="hk-h1">{tx.h1a} <span class="hk-accent">{tx.h1b}</span></h1>
    <p class="hk-sub">{tx.sub}</p>
    <p class="hk-hook">{tx.hook}</p>
    <div class="hk-cta">
      <a href={data.registrationUrl} target="_blank" rel="noopener noreferrer" class="btn btn-primary">{tx.ctaPrimary} &rarr;</a>
      <a href={data.registrationUrl} target="_blank" rel="noopener noreferrer" class="btn btn-secondary">{tx.ctaSecondary}</a>
      <div class="hk-count">
        <span class="hk-count-num" data-hackathon-date={data.date}>{daysLeft}</span>
        <span class="hk-count-label">{tx.countdownLabel}</span>
      </div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container hk-narrow">
    <h2 class="section-title">{tx.whatTitle}</h2>
    <p class="hk-lead">{tx.whatBody}</p>
  </div>
</section>

<section class="section alt">
  <div class="container">
    <h2 class="section-title">{tx.whyTitle}</h2>
    <div class="editorial">
      {data.pipeline.map((step, i) => (
        <div class={`editorial-row ${['is-green','is-coral','is-blue'][i % 3]}`}>
          <div class="editorial-num">{`0${i + 1}`}</div>
          <div class="editorial-bar"></div>
          <div class="editorial-tx">
            <h3>{es ? step.stepEs : step.stepEn}</h3>
            <p>{es ? step.descEs : step.descEn}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <h2 class="section-title">{tx.tracksTitle}</h2>
    <div class="hk-tracks">
      {data.tracks.map(track => (
        <div class={`hk-track ${track.accent}`}>
          <div class="hk-track-bar"></div>
          <div>
            <h3>{es ? track.labelEs : track.labelEn}</h3>
            <p>{es ? track.descEs : track.descEn}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

<section class="section alt">
  <div class="container">
    <h2 class="section-title">{tx.prizesTitle}</h2>
    <div class="hk-prize">
      <p class="hk-prize-amount">{es ? data.prizesDetail.amountEs : data.prizesDetail.amountEn}</p>
      <p class="hk-prize-head">{es ? data.prizesDetail.headlineEs : data.prizesDetail.headlineEn}</p>
      <p class="hk-prize-total">{es ? data.prizesDetail.totalEs : data.prizesDetail.totalEn}</p>
      <div class="hk-pills">
        {data.prizesDetail.perks.map(perk => (
          <span class="hk-pill">{es ? perk.es : perk.en}</span>
        ))}
      </div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <h2 class="section-title">{tx.hubsTitle}</h2>
    <div class="hk-hubs">
      {data.hubs.map(hub => (
        <span class={hub.bogota ? 'hk-hub is-bogota' : 'hk-hub'}>{hub.city}</span>
      ))}
    </div>
    <p class="hk-note">{tx.hubsNote}</p>
  </div>
</section>

<section class="section alt">
  <div class="container">
    <h2 class="section-title">{tx.whoTitle}</h2>
    <div class="hk-pills">
      {data.eligibility.map(e => (
        <span class="hk-pill">{es ? e.es : e.en}</span>
      ))}
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <h2 class="section-title">{tx.agendaTitle}</h2>
    <div class="editorial">
      {data.schedule.map((day, i) => (
        <div class={`editorial-row ${day.accent ?? ['is-green','is-blue','is-yellow'][i % 3]}`}>
          <div class="editorial-num">{`0${i + 1}`}</div>
          <div class="editorial-bar"></div>
          <div class="editorial-tx">
            <h3>{es ? day.day : day.dayEn}</h3>
            <p>{es ? day.events[0].title : day.events[0].titleEn}</p>
          </div>
        </div>
      ))}
    </div>
    <p class="hk-note">{tx.submission}</p>
  </div>
</section>

<section class="hk-band">
  <div class="container">
    <h2 class="hk-band-title">{tx.ctaBandTitle}</h2>
    <p class="hk-band-sub">{tx.ctaBandSub}</p>
    <a href={data.registrationUrl} target="_blank" rel="noopener noreferrer" class="btn btn-primary">{tx.ctaPrimary} &rarr;</a>
    <p class="hk-band-mail">{data.contactEmail}</p>
  </div>
</section>

<style>
  .hk-hero {
    padding: 9rem 1.5rem 4rem;
    background: linear-gradient(180deg, #F1F8F2, #FFFFFF);
  }

  .hk-kicker {
    font-size: 0.6875rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.09em;
    color: var(--green-text);
  }

  .hk-h1 {
    font-size: clamp(2.25rem, 6vw, 3.75rem);
    font-weight: 700;
    letter-spacing: -0.04em;
    line-height: 1.03;
    margin: 0.5rem 0;
    color: var(--text-primary);
  }

  .hk-accent {
    color: var(--accent-green);
  }

  .hk-sub {
    font-size: 1.0625rem;
    color: var(--text-secondary);
    max-width: 600px;
    line-height: 1.55;
  }

  .hk-hook {
    margin-top: 1rem;
    font-size: 0.9375rem;
    font-weight: 700;
    color: var(--text-primary);
  }

  .hk-cta {
    margin-top: 1.5rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .hk-count {
    display: flex;
    align-items: baseline;
    gap: 0.375rem;
  }

  .hk-count-num {
    font-size: 1.75rem;
    font-weight: 700;
    color: var(--green-text);
  }

  .hk-count-label {
    color: var(--text-secondary);
    font-size: 0.8125rem;
  }

  .hk-narrow {
    max-width: 760px;
  }

  .hk-lead {
    font-size: 1.0625rem;
    color: var(--text-secondary);
    line-height: 1.65;
  }

  .hk-tracks {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.25rem;
  }

  .hk-track {
    display: flex;
    gap: 1rem;
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 1.5rem;
    background: #FFFFFF;
  }

  .hk-track-bar {
    width: 5px;
    flex: none;
    border-radius: 4px;
  }

  .hk-track.is-green .hk-track-bar { background: var(--accent-green); }
  .hk-track.is-coral .hk-track-bar { background: var(--accent-coral); }

  .hk-track h3 {
    font-size: 1.125rem;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 0.375rem;
  }

  .hk-track p {
    font-size: 0.9375rem;
    color: var(--text-secondary);
    line-height: 1.55;
  }

  .hk-prize {
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 2rem;
    background: #FFFFFF;
  }

  .hk-prize-amount {
    font-size: clamp(1.75rem, 4vw, 2.5rem);
    font-weight: 700;
    letter-spacing: -0.02em;
    color: var(--green-text);
  }

  .hk-prize-head {
    font-size: 1.0625rem;
    font-weight: 600;
    color: var(--text-primary);
    margin-top: 0.25rem;
  }

  .hk-prize-total {
    font-size: 0.9375rem;
    color: var(--text-secondary);
    margin-top: 0.25rem;
  }

  .hk-pills {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 1rem;
  }

  .hk-pill {
    font-size: 0.8125rem;
    font-weight: 600;
    background: #FFFFFF;
    border: 1px solid var(--border);
    border-radius: 999px;
    padding: 0.375rem 0.875rem;
    color: var(--text-primary);
  }

  .hk-hubs {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .hk-hub {
    font-size: 0.875rem;
    font-weight: 600;
    border: 1px solid var(--border);
    border-radius: 999px;
    padding: 0.5rem 1rem;
    color: var(--text-secondary);
  }

  .hk-hub.is-bogota {
    background: var(--accent-green);
    color: #101010;
    border-color: var(--accent-green);
  }

  .hk-note {
    margin-top: 1.25rem;
    font-size: 0.875rem;
    color: var(--text-secondary);
  }

  .hk-band {
    background: var(--dark-bg);
    padding: 4rem 1.5rem;
    text-align: center;
  }

  .hk-band-title {
    font-size: clamp(1.5rem, 4vw, 2.25rem);
    font-weight: 700;
    letter-spacing: -0.03em;
    color: #FFFFFF;
  }

  .hk-band-sub {
    color: var(--dark-muted);
    font-size: 0.9375rem;
    margin: 0.5rem 0 1.5rem;
  }

  .hk-band-mail {
    color: var(--dark-muted);
    font-size: 0.8125rem;
    margin-top: 1.25rem;
  }

  @media (max-width: 768px) {
    .hk-tracks {
      grid-template-columns: 1fr;
    }
  }
</style>

<script>
  function updateHkCountdown() {
    const el = document.querySelector('[data-hackathon-date]');
    if (!el) return;
    const target = new Date(el.getAttribute('data-hackathon-date') + 'T00:00:00');
    const now = new Date();
    const days = Math.max(0, Math.ceil((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));
    el.textContent = String(days);
  }
  updateHkCountdown();
</script>
```

- [ ] **Step 2: Build to verify it compiles**

Run: `cd "C:/Users/joseg/Documents/ai-safety-colombia-website" && npm run build 2>&1 | tail -6`
Expected: build completes with no errors (component compiles; not yet wired into the routes).

- [ ] **Step 3: Commit**

```bash
cd "C:/Users/joseg/Documents/ai-safety-colombia-website" && git add src/components/HackathonContent.astro && git commit -m "feat(hackathon): add rebuilt HackathonContent body (Direction A + dark CTA)"
```

---

## Task 10: Wire the rebuilt body into both Hackathon routes

**Files:**
- Modify: `src/pages/hackathon.astro` (full replace)
- Modify: `src/pages/en/hackathon.astro` (full replace)

- [ ] **Step 1: Replace `src/pages/hackathon.astro` with the thin wrapper**

Overwrite `src/pages/hackathon.astro` with exactly:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import HackathonContent from '../components/HackathonContent.astro';

const locale = 'es';
---

<BaseLayout locale={locale} currentPage="hackathon" title="Hackathon | AI Safety Colombia" description="Global South AI Safety Hackathon: 19-21 de junio de 2026, online y hub Bogotá. Organiza Apart Research; hub local AI Safety Colombia.">
  <HackathonContent locale={locale} />
</BaseLayout>
```

- [ ] **Step 2: Replace `src/pages/en/hackathon.astro` with the thin wrapper**

Overwrite `src/pages/en/hackathon.astro` with exactly:

```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import HackathonContent from '../../components/HackathonContent.astro';

const locale = 'en';
---

<BaseLayout locale={locale} currentPage="hackathon" title="Hackathon | AI Safety Colombia" description="Global South AI Safety Hackathon: June 19-21 2026, online and Bogotá hub. Hosted by Apart Research; local hub by AI Safety Colombia.">
  <HackathonContent locale={locale} />
</BaseLayout>
```

- [ ] **Step 3: Build and verify the rebuilt content is present**

Run: `cd "C:/Users/joseg/Documents/ai-safety-colombia-website" && npm run build 2>&1 | tail -6 && grep -c "hk-band" dist/hackathon/index.html dist/en/hackathon/index.html`
Expected: build completes with no errors; both files report a count `>= 1` for `hk-band` (the dark CTA band rendered).

- [ ] **Step 4: Verify the real registration URL replaced the placeholder**

Run: `cd "C:/Users/joseg/Documents/ai-safety-colombia-website" && grep -o 'sprints/global-south-ais-hackathon' dist/hackathon/index.html | head -1`
Expected: prints `sprints/global-south-ais-hackathon` (real Apart URL is live in the built page; the old `https://apartresearch.com` placeholder is gone).

- [ ] **Step 5: Confirm the old unused HackathonBanner import is gone from the page**

Run: `cd "C:/Users/joseg/Documents/ai-safety-colombia-website" && grep -c "HackathonBanner" src/pages/hackathon.astro || echo "0 (good — banner no longer imported by hackathon page)"`
Expected: prints `0 (good ...)`. (`HackathonBanner.astro` itself is left untouched; it is still used by the homepage and is out of scope.)

- [ ] **Step 6: Commit**

```bash
cd "C:/Users/joseg/Documents/ai-safety-colombia-website" && git add src/pages/hackathon.astro src/pages/en/hackathon.astro && git commit -m "feat(hackathon): wire rebuilt HackathonContent into both routes"
```

---

## Task 11: Full QA sweep (build count, links, accessibility, visual)

**Files:**
- No source changes unless a defect is found (then fix in the relevant file and re-run).

- [ ] **Step 1: Full clean build and route inventory**

Run: `cd "C:/Users/joseg/Documents/ai-safety-colombia-website" && rm -rf dist && npm run build 2>&1 | tail -6 && find dist -name index.html | sort`
Expected: build completes with no errors. The `find` output includes all 16 page routes, specifically containing: `dist/index.html`, `dist/en/index.html`, `dist/sobre/index.html`, `dist/en/about/index.html`, `dist/hackathon/index.html`, `dist/en/hackathon/index.html`, `dist/eventos/index.html`, `dist/en/events/index.html`, `dist/programas/index.html`, `dist/en/programs/index.html`, `dist/recursos/index.html`, `dist/en/resources/index.html`, `dist/involucrate/index.html`, `dist/en/get-involved/index.html`, `dist/contacto/index.html`, `dist/en/contact/index.html`.

- [ ] **Step 2: Run the unit tests once more (regression check)**

Run: `cd "C:/Users/joseg/Documents/ai-safety-colombia-website" && node --test test/events.test.js 2>&1 | tail -5`
Expected: `# pass 4`, `# fail 0`.

- [ ] **Step 3: Static link/asset checks on built HTML**

Run:
```bash
cd "C:/Users/joseg/Documents/ai-safety-colombia-website" && \
node -e "
const fs=require('fs');
const ev=JSON.parse(fs.readFileSync('src/data/events.json','utf8'));
let bad=0;
for(const e of ev){ if(!fs.existsSync('public/events/'+e.flyer)){ console.log('MISSING FLYER',e.flyer); bad++; } if(!/^https:\/\/www\.instagram\.com\//.test(e.instagramUrl)){ console.log('BAD IG URL',e.slug); bad++; } }
console.log(bad===0?'events assets OK':'events assets FAIL');
"
```
Expected: prints `events assets OK` (every `flyer` exists in `public/events/`, every `instagramUrl` is a well-formed Instagram URL).

- [ ] **Step 4: Accessibility token check on built pages**

Run: `cd "C:/Users/joseg/Documents/ai-safety-colombia-website" && grep -o 'color:#00BBFF' dist/eventos/index.html dist/en/events/index.html | head -1; echo "exit=$?"`
Expected: no `color:#00BBFF` matches (the non-AA raw blue must NOT be used for event tag text; the blue tag uses the darkened `#0090c4`). The `grep` finding nothing is the pass condition.

- [ ] **Step 5: Playwright computed-style + visual sweep of the 4 new/rebuilt routes**

Start a local preview: `cd "C:/Users/joseg/Documents/ai-safety-colombia-website" && npm run preview` (run in background). Using the Playwright MCP tools, for each of `/eventos/`, `/en/events/`, `/hackathon/`, `/en/hackathon/` at viewport widths 390, 820, and 1280 px:
- Take a screenshot and visually confirm: Instrument Sans font, white canvas, no horizontal overflow, flyer images load on the events pages, the hackathon dark CTA band renders with `background-color: rgb(16, 16, 16)` (`#101010`) and white heading text.
- `browser_evaluate` `getComputedStyle(document.querySelector('.hk-band')).backgroundColor` on the hackathon pages → expect `rgb(16, 16, 16)`.
- `browser_evaluate` `getComputedStyle(document.querySelector('.event-card')).borderColor` on the events pages → expect the `--border` color `rgb(230, 230, 225)`.
- Confirm the nav shows the Events item and the language toggle swaps `/eventos/` ↔ `/en/events/` correctly.
Expected: all checks pass at all three widths. If any fails, fix the responsible component/style and re-run this step.

- [ ] **Step 6: Stop the preview server and commit any fixes**

Stop the background preview process. If Step 5 required fixes, commit them:

```bash
cd "C:/Users/joseg/Documents/ai-safety-colombia-website" && git add -A && git commit -m "fix(qa): address issues found in computed-style/visual sweep"
```

If no fixes were needed, skip the commit (nothing to commit) and proceed.

---

## Task 12: Update memory + Obsidian vault (standing CLAUDE.md rule)

**Files:**
- Modify: `C:/Users/joseg/.claude/projects/C--Users-joseg/memory/project_ais_colombia_redesign.md`
- Modify: `C:/Users/joseg/.claude/projects/C--Users-joseg/memory/MEMORY.md` (only if a new pointer line is needed)
- Modify/Create: `C:/Users/joseg/Documents/Vault/Projects/` AI Safety Colombia project note

- [ ] **Step 1: Update the project memory file**

Append to `C:/Users/joseg/.claude/projects/C--Users-joseg/memory/project_ais_colombia_redesign.md` a dated entry recording: the Events page was added (`/eventos/` + `/en/events/`, Style 2 cards, data from Instagram in `src/data/events.json` + `public/events/` flyers, shared `EventsPage.astro`/`EventCard.astro`, `splitEvents` helper), and the Hackathon page was fully rebuilt with real Apart data (Direction A + dark CTA band, shared `HackathonContent.astro`, real registration URL `apartresearch.com/sprints/global-south-ais-hackathon-2026-06-19-to-2026-06-21`, judges still "por confirmar"). Note that nothing was pushed/deployed (awaiting Jose's explicit deploy approval). Keep it to a few lines; do not duplicate what git records.

- [ ] **Step 2: Update the Obsidian vault project note**

In `C:/Users/joseg/Documents/Vault/Projects/`, update the AI Safety Colombia website note (create it if absent) with the same summary: new Events page, rebuilt Hackathon page, key files, and the open item that deploy is pending Jose's explicit go-ahead.

- [ ] **Step 3: Confirm completion to the user**

State plainly what shipped locally (Events page + rebuilt Hackathon, 16 routes building, tests green) and that **nothing has been pushed or deployed** — ask Jose whether to push to `origin/master` (which triggers the Vercel deploy to aisafetycolombia.org). Do not push until he says yes.

(No git commit step here — memory and Vault live outside the website repo.)

---

## Self-Review (completed by plan author)

**1. Spec coverage:**
- Spec §2.1 routing/nav/i18n → Tasks 1, 2, 7. ✅ (Note: spec said "add isActive handling"; code shows `isActive` is already generic, so the plan correctly omits that no-op and documents why.)
- Spec §2.2 data model → Task 3 Step 3 (exact schema + worked example). ✅
- Spec §2.3 data capture + user fact-check → Task 3 (with hard STOP gate). ✅
- Spec §2.4 layout & component (Approach A, Style 2; EventCard; Próximos/Pasados; empty fallback; Instagram in Footer + Contact) → Tasks 5, 6, 7, 2. ✅
- Spec §3.1 real Apart data → Task 8. ✅
- Spec §3.2 9-section order + kept countdown + Direction A + dark CTA band + judges stay "por confirmar" → Task 9. ✅
- Spec §3.3 hackathon.json field changes (registrationUrl fix, tracks/pipeline/eligibility/hubs/prizesDetail/submission/contactEmail/whatIs; keep date/endDate/schedule/speakers/judges) → Task 8. ✅
- Spec §4 out of scope → respected (no detail pages, no live embed, no RSVP, no global token rework; deploy explicitly excluded). ✅
- Spec §5 verification (build 16 pages, Playwright sweep @390/820/1280, link checks, AA tokens, flyers present) → Task 11. ✅
- Spec §6 file structure → matches the File Structure section, with the documented additions of shared body components (`EventsPage.astro`, `HackathonContent.astro`) for DRY ES/EN sync and the `splitEvents` helper + test.

**2. Placeholder scan:** No "TBD/TODO/handle edge cases/similar to Task N". The only literal dash strings (`"—"` in `hackathon.json` schedule `time`) are intentional real data (Apart has no hourly agenda) and explained inline, not placeholders. Task 3 is interactive by nature but fully specifies the procedure, the post list, slug/type rules, the exact JSON schema with a worked example, and a hard user-review gate — no decisions are left unspecified.

**3. Type consistency:** `splitEvents(events, now?)` signature is identical in Task 4 definition and Task 6 usage. `events.json` object keys (Task 3) match the `EventItem` interface in `EventCard.astro` (Task 5) and the consumption in `EventsPage.astro` (Task 6). `hackathon.json` keys defined in Task 8 (`whatIsEs/En`, `pipeline[].stepEs/En/descEs/En`, `tracks[].labelEs/En/descEs/En/accent`, `eligibility[].es/en`, `hubs[].city/bogota`, `prizesDetail.amountEs/En/headlineEs/En/totalEs/En/perks[].es/en`, `schedule[].day/dayEn/accent/events[].title/titleEn`, `submissionEs/En`, `contactEmail`, `registrationUrl`, `date`) all match exactly how `HackathonContent.astro` (Task 9) reads them. CSS class names (`.hk-band`, `.event-card`, `.is-bogota`, etc.) are consistent between the components that define them and the QA greps in Task 11.

No gaps found.
