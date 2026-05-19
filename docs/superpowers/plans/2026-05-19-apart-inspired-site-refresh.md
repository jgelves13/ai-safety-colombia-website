# Apart-Inspired Whole-Site Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Bring six Apart Research design signatures (floating pill navbar, solid-color featured block, off-white card surface, mono dates/labels, partner strip, hand-drawn marker motif) into all 14 routes of aisafetycolombia.org while keeping AISC's own green and Instrument Sans.

**Architecture:** Astro 5 static site, ES default + EN under `/en/`, 14 routes. Visual work via shared CSS tokens/utilities in `src/styles/global.css` plus scoped component `<style>` blocks. Two new presentational Astro components (`PartnerStrip`, `MarkerMotif`). i18n through `src/i18n/ui.ts` `t(locale, key)`. No new runtime deps; one extra Google Font (`Caveat`).

**Tech Stack:** Astro 5.8, TypeScript, native `node:test`, Google Fonts `<link>` (no `@fontsource`/`sharp`), `astro:assets` `import.meta.glob`.

**Working branch:** `master` (autonomous git per repo convention — commit each task, push/deploy only in Task 15).

**Global verification commands (used throughout):**
- Build: `rtk npm run build` — expect `14 page(s) built`.
- Types: `rtk npm run check` — expect `0 errors` (one pre-existing benign `Navbar.astro` unused-import hint is acceptable; do not regress beyond it).
- Tests: `node --test test/hackathon.test.js test/events.test.js test/contactMailto.test.js test/courses.test.js test/learn.test.js` — expect 21 pass (plus Task 3's new file once added).

---

## Task 1: CSS foundation — tokens + `.featured-block` utility

**Files:**
- Modify: `src/styles/global.css` (`:root` block lines 1–31; append utility after `.card` block ~line 166)

- [ ] **Step 1: Add three tokens to `:root`**

In `src/styles/global.css`, inside `:root`, immediately after the existing
`--font-body: 'Instrument Sans', system-ui, sans-serif;` line, add:

```css
  --card-surface: var(--bg-secondary);                          /* off-white card fill on white sections */
  --font-mono: ui-monospace, 'SF Mono', 'Cascadia Mono', 'Roboto Mono', 'IBM Plex Mono', Menlo, Consolas, monospace;
  --font-hand: 'Caveat', 'Comic Sans MS', cursive;
```

- [ ] **Step 2: Add the `.featured-block` utility**

In `src/styles/global.css`, immediately after the existing `.card { … }` rule (ends ~line 166), add:

```css
/* Apart-style single solid-color featured block. One per page max.
   #101010 on --accent-green is the verified-AA pairing from the Bogotá hub. */
.featured-block {
  background: var(--accent-green);
  color: #101010;
  border: none;
  border-radius: 20px;
  padding: 3rem 2.5rem;
}

.featured-block .section-title,
.featured-block h2,
.featured-block h3,
.featured-block p,
.featured-block a:not(.btn) {
  color: #101010;
}
```

- [ ] **Step 3: Verify build + types**

Run: `rtk npm run build && rtk npm run check`
Expected: `14 page(s) built`; `0 errors`.

- [ ] **Step 4: Commit**

```bash
rtk git add src/styles/global.css && rtk git commit -F - <<'EOF'
feat(css): add card-surface/mono/hand tokens + .featured-block utility

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
```

---

## Task 2: Load the `Caveat` hand-letter font

**Files:**
- Modify: `src/layouts/BaseLayout.astro:41`

- [ ] **Step 1: Extend the Google Fonts link**

In `src/layouts/BaseLayout.astro`, replace line 41:

```html
  <link href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
```

with:

```html
  <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@600&family=Instrument+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
```

- [ ] **Step 2: Verify build**

Run: `rtk npm run build`
Expected: `14 page(s) built`, no errors.

- [ ] **Step 3: Commit**

```bash
rtk git add src/layouts/BaseLayout.astro && rtk git commit -F - <<'EOF'
feat(fonts): load Caveat (weight 600) for the hand-drawn marker motif

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
```

---

## Task 3: i18n keys (`nav.cta`, `partners.title`, `motif.*`) + presence test

**Files:**
- Create: `test/i18n-keys.test.js`
- Modify: `src/i18n/ui.ts` (both `es` and `en` objects)

The existing tests cannot import `ui.ts` (TypeScript, no loader). Mirror the
file-text approach: assert each new key literal appears in both locale blocks
(i.e. ≥ 2 occurrences in the source).

- [ ] **Step 1: Write the failing test**

Create `test/i18n-keys.test.js`:

```js
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const src = readFileSync(new URL('../src/i18n/ui.ts', import.meta.url), 'utf8');

function occurrences(needle) {
  return src.split(needle).length - 1;
}

const NEW_KEYS = [
  'nav.cta',
  'partners.title',
  'motif.research',
  'motif.community',
  'motif.education',
  'motif.governance',
];

for (const key of NEW_KEYS) {
  test(`i18n key "${key}" exists in both locales`, () => {
    assert.ok(
      occurrences(`'${key}'`) >= 2,
      `expected "${key}" in both es and en blocks of ui.ts`
    );
  });
}
```

- [ ] **Step 2: Run it to verify it fails**

Run: `node --test test/i18n-keys.test.js`
Expected: FAIL — all 6 assertions fail (keys absent).

- [ ] **Step 3: Add the keys to the `es` block**

In `src/i18n/ui.ts`, inside the `es: { … }` object, add next to the other
`'nav.*'` keys:

```js
    'nav.cta': 'Únete',
```

next to the other top-level section keys add:

```js
    'partners.title': 'En colaboración con',
    'motif.research': 'INVESTIGACIÓN',
    'motif.community': 'COMUNIDAD',
    'motif.education': 'FORMACIÓN',
    'motif.governance': 'GOBERNANZA',
```

- [ ] **Step 4: Add the keys to the `en` block**

In `src/i18n/ui.ts`, inside the `en: { … }` object, add the parallel keys:

```js
    'nav.cta': 'Join',
    'partners.title': 'In collaboration with',
    'motif.research': 'RESEARCH',
    'motif.community': 'COMMUNITY',
    'motif.education': 'EDUCATION',
    'motif.governance': 'GOVERNANCE',
```

- [ ] **Step 5: Run the test to verify it passes**

Run: `node --test test/i18n-keys.test.js`
Expected: PASS — 6/6.

- [ ] **Step 6: Verify types + full suite**

Run: `rtk npm run check && node --test test/hackathon.test.js test/events.test.js test/contactMailto.test.js test/courses.test.js test/learn.test.js test/i18n-keys.test.js`
Expected: `0 errors`; 27 pass (21 + 6).

- [ ] **Step 7: Commit**

```bash
rtk git add src/i18n/ui.ts test/i18n-keys.test.js && rtk git commit -F - <<'EOF'
feat(i18n): add nav.cta, partners.title, motif.* keys (es+en) + test

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
```

---

## Task 4: Floating pill navbar

**Files:**
- Modify: `src/components/Navbar.astro` (markup ~lines 45–48; `<style>` lines 67–212; `<script>` lines 214–220)

- [ ] **Step 1: Swap the CTA to the green "Únete/Join" pill**

In `src/components/Navbar.astro`, replace the desktop CTA line:

```html
      <a href={localePath(locale, '/contacto/')} class="btn btn-dark nav-cta">
        {t(locale, 'nav.contact')}
      </a>
```

with:

```html
      <a href={localePath(locale, '/involucrate/')} class="btn btn-primary nav-cta">
        {t(locale, 'nav.cta')}
      </a>
```

(The mobile sheet keeps its existing `/contacto/` link, so contact stays reachable.)

- [ ] **Step 2: Restyle `.navbar` → transparent wrapper**

Replace the `.navbar` rule:

```css
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: #FFFFFF;
  border-bottom: 1px solid var(--hairline);
}
```

with:

```css
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: transparent;
  border-bottom: none;
  pointer-events: none;
}
```

- [ ] **Step 3: Restyle `.navbar-pill` → floating pill**

Replace the `.navbar-pill` rule:

```css
.navbar-pill {
  max-width: var(--max-width);
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.875rem 1.5rem;
}
```

with:

```css
.navbar-pill {
  pointer-events: auto;
  max-width: var(--max-width);
  width: calc(100% - 2rem);
  margin: 0.875rem auto 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1.5rem;
  background: #FFFFFF;
  border: 1px solid var(--hairline);
  border-radius: 20px;
  box-shadow: 0 4px 24px rgba(16, 16, 16, 0.08);
  transition: box-shadow 0.2s, padding 0.2s;
}

.navbar-pill.is-scrolled {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  box-shadow: 0 6px 28px rgba(16, 16, 16, 0.14);
}
```

- [ ] **Step 4: Add the scrolled-state script**

In `src/components/Navbar.astro`, replace the existing `<script>` block:

```javascript
<script>
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  hamburger?.addEventListener('click', () => {
    mobileNav?.classList.toggle('open');
  });
</script>
```

with:

```javascript
<script>
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  hamburger?.addEventListener('click', () => {
    mobileNav?.classList.toggle('open');
  });

  const pill = document.querySelector('.navbar-pill');
  const onScroll = () => pill?.classList.toggle('is-scrolled', window.scrollY > 8);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
</script>
```

- [ ] **Step 5: Verify content clearance**

Run: `rtk npm run build`
Then open `dist/index.html` and `dist/recursos/index.html` in the browser
(or visual sweep on `localhost:4321`). The floating pill must not cover the
first heading. `PageHero.astro` already uses `padding: 9rem 1.5rem 3rem`
(top) and clears the pill. If — and only if — the homepage hero or any
`.page-hero` content tucks under the pill, increase the offending top
padding by `0.5rem` (e.g. `PageHero.astro` `.page-hero { padding: 9.5rem
1.5rem 3rem; }`) and rebuild. Record whether an adjustment was needed.

- [ ] **Step 6: Verify build + types**

Run: `rtk npm run build && rtk npm run check`
Expected: `14 page(s) built`; `0 errors`.

- [ ] **Step 7: Commit**

```bash
rtk git add src/components/Navbar.astro && rtk git commit -F - <<'EOF'
feat(nav): floating pill navbar + scrolled state + green Únete/Join CTA

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
```

---

## Task 5: `PartnerStrip` component (verified partner logo strip)

**Files:**
- Create: `src/components/PartnerStrip.astro`

Mirror the `astro:assets` glob pattern used in `ResourcesContent.astro:12`.
Only verified partner: Apart Research (`src/assets/resources/apart.png`).

- [ ] **Step 1: Create the component**

Create `src/components/PartnerStrip.astro`:

```astro
---
import { Image } from 'astro:assets';
import type { ImageMetadata } from 'astro';
import { t, type Locale } from '../i18n/ui';

interface Props {
  locale: Locale;
}

const { locale } = Astro.props;

const logos = import.meta.glob<ImageMetadata>('../assets/resources/*', {
  eager: true,
  import: 'default',
});

const partners = [
  { name: 'Apart Research', img: 'apart.png', url: 'https://apartresearch.com/' },
];
---

<section class="partners" aria-label={t(locale, 'partners.title')}>
  <div class="container">
    <p class="partners-title">{t(locale, 'partners.title')}</p>
    <div class="partners-row">
      {partners.map((p) => (
        <a class="partner" href={p.url} target="_blank" rel="noopener noreferrer">
          <Image src={logos[`../assets/resources/${p.img}`]} alt={p.name} width={120} height={120} loading="lazy" />
        </a>
      ))}
    </div>
  </div>
</section>

<style>
  .partners {
    padding: 3rem 1.5rem;
    text-align: center;
  }

  .partners-title {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.14em;
    color: var(--text-secondary);
    margin-bottom: 1.25rem;
  }

  .partners-row {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 2.5rem;
  }

  .partner {
    display: inline-flex;
  }

  .partner :global(img) {
    height: 40px;
    width: auto;
    filter: grayscale(1);
    opacity: 0.55;
    transition: filter 0.2s, opacity 0.2s;
  }

  .partner:hover :global(img),
  .partner:focus-visible :global(img) {
    filter: grayscale(0);
    opacity: 1;
  }
</style>
```

- [ ] **Step 2: Verify build + types**

Run: `rtk npm run build && rtk npm run check`
Expected: `14 page(s) built`; `0 errors` (component compiles even though not yet placed on a page).

- [ ] **Step 3: Commit**

```bash
rtk git add src/components/PartnerStrip.astro && rtk git commit -F - <<'EOF'
feat(components): add PartnerStrip (verified Apart Research logo strip)

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
```

---

## Task 6: `MarkerMotif` component (hand-drawn marker SVG)

**Files:**
- Create: `src/components/MarkerMotif.astro`

Decorative only (`aria-hidden`). Overlapping irregular circles in AISC
palette tokens with `Caveat` ALL-CAPS labels.

- [ ] **Step 1: Create the component**

Create `src/components/MarkerMotif.astro`:

```astro
---
interface Props {
  /** Up to four ALL-CAPS labels, one per circle (already localized by caller). */
  labels: string[];
}

const { labels } = Astro.props;
const COLORS = ['var(--accent-green)', 'var(--accent-yellow)', 'var(--accent-blue)', 'var(--accent-coral)'];
// Slightly irregular circle centers/radii give the hand-drawn feel.
const CIRCLES = [
  { cx: 150, cy: 120, r: 92 },
  { cx: 280, cy: 110, r: 86 },
  { cx: 210, cy: 210, r: 96 },
  { cx: 340, cy: 205, r: 80 },
];
const items = labels.slice(0, 4).map((label, i) => ({
  label,
  color: COLORS[i],
  ...CIRCLES[i],
}));
---

<div class="marker-motif" aria-hidden="true" role="presentation">
  <svg viewBox="0 0 460 320" xmlns="http://www.w3.org/2000/svg">
    {items.map((c) => (
      <circle cx={c.cx} cy={c.cy} r={c.r} fill={c.color} fill-opacity="0.5" />
    ))}
    {items.map((c) => (
      <text x={c.cx} y={c.cy} class="marker-label">{c.label}</text>
    ))}
  </svg>
</div>

<style>
  .marker-motif {
    width: 100%;
    max-width: 460px;
    margin: 0 auto;
    mix-blend-mode: multiply;
  }

  .marker-motif svg {
    width: 100%;
    height: auto;
    display: block;
  }

  .marker-label {
    font-family: var(--font-hand);
    font-size: 26px;
    font-weight: 600;
    fill: #101010;
    text-anchor: middle;
    dominant-baseline: middle;
    letter-spacing: 0.02em;
  }
</style>
```

- [ ] **Step 2: Verify build + types**

Run: `rtk npm run build && rtk npm run check`
Expected: `14 page(s) built`; `0 errors`.

- [ ] **Step 3: Commit**

```bash
rtk git add src/components/MarkerMotif.astro && rtk git commit -F - <<'EOF'
feat(components): add MarkerMotif hand-drawn marker SVG (AISC palette)

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
```

---

## Task 7: HackathonBanner → solid green featured block + mono countdown

**Files:**
- Modify: `src/components/HackathonBanner.astro` (`<style>`: `.banner-card` lines 42–47, `.banner-badge` lines 53–64, `.countdown-number` + `.countdown-label` lines 88–103)

- [ ] **Step 1: Replace `.banner-card` with the solid green block**

Replace:

```css
.banner-card {
  background: linear-gradient(100deg, #eafff2, #e7f6ff);
  border: 1px solid #d5efe0;
  border-radius: 18px;
  padding: 2rem 2.5rem;
}
```

with:

```css
.banner-card {
  background: var(--accent-green);
  border: none;
  border-radius: 20px;
  padding: 2.5rem 2.75rem;
  color: #101010;
}

.banner-card :where(h2, h3, p, span, a:not(.btn)) {
  color: #101010;
}
```

- [ ] **Step 2: Recolor the badge for contrast on green**

Replace the `.banner-badge` `background`/`color` declarations:

```css
  background: var(--accent-green);
  color: #06210f;
```

with:

```css
  background: #101010;
  color: #FFFFFF;
```

(Keep the rest of `.banner-badge` unchanged.)

- [ ] **Step 3: Mono + ink the countdown**

Replace `.countdown-number`:

```css
.countdown-number {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--green-text);
}
```

with:

```css
.countdown-number {
  font-family: var(--font-mono);
  font-variant-numeric: tabular-nums;
  font-size: 1.75rem;
  font-weight: 700;
  color: #101010;
}
```

Replace `.countdown-label`:

```css
.countdown-label {
  color: var(--text-secondary);
  font-size: 0.8125rem;
}
```

with:

```css
.countdown-label {
  font-family: var(--font-mono);
  color: #101010;
  font-size: 0.8125rem;
}
```

- [ ] **Step 4: Verify build + types + hackathon test**

Run: `rtk npm run build && rtk npm run check && node --test test/hackathon.test.js`
Expected: `14 page(s) built`; `0 errors`; hackathon tests pass.

- [ ] **Step 5: Commit**

```bash
rtk git add src/components/HackathonBanner.astro && rtk git commit -F - <<'EOF'
feat(hackathon): banner becomes solid-green featured block + mono countdown

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
```

---

## Task 8: HackathonContent → CTA band featured block + mono + MarkerMotif

**Files:**
- Modify: `src/components/HackathonContent.astro` (countdown `.hk-count-*` ~lines 87–88; the kicker element rendering `t(locale,'hackathon.kicker')`; the final CTA band rendering `hackathon.ctaBandTitle`/`hackathon.ctaBandSub`; the "Qué es" section rendering `t(locale,'hackathon.whatTitle')`)

This file was not fully dumped in the audit. Locate targets by their i18n
anchors with: `rtk grep "hackathon.ctaBandTitle\|hackathon.whatTitle\|hackathon.kicker\|hk-count" src/components/HackathonContent.astro`

- [ ] **Step 1: Make the final CTA band the page's one featured block**

Find the section element that wraps `t(locale, 'hackathon.ctaBandTitle')`
and `t(locale, 'hackathon.ctaBandSub')` (the closing dark CTA band). Add
`featured-block` to that element's class list. If it currently uses the
dark treatment (`background: var(--dark-bg)` or a `.cta-band` scoped rule
with a dark background), remove that dark background declaration from the
component `<style>` so the global `.featured-block` (solid green, ink text)
takes effect. Keep its inner buttons as-is (`.btn-secondary`/`.btn-dark`
read fine on green).

- [ ] **Step 2: Mono the countdown + kicker**

In the component `<style>`, add `font-family: var(--font-mono);` to the
`.hk-count-num` and `.hk-count-label` rules, and add
`font-variant-numeric: tabular-nums;` to `.hk-count-num`. Find the kicker
class (the element rendering `t(locale, 'hackathon.kicker')`) and add
`font-family: var(--font-mono);` to its rule. If a rule does not exist for
the kicker, add one keyed to its existing class name.

- [ ] **Step 3: Add the MarkerMotif to the "Qué es" section**

At the top of the frontmatter add:

```astro
import MarkerMotif from './MarkerMotif.astro';
import { t } from '../i18n/ui';
```

(only add imports not already present — `t` and `locale` already exist in
this component; do not duplicate). Inside the section that renders
`t(locale, 'hackathon.whatTitle')`, immediately after that section's
heading, insert:

```astro
<MarkerMotif labels={[
  t(locale, 'motif.research'),
  t(locale, 'motif.community'),
  t(locale, 'motif.education'),
  t(locale, 'motif.governance'),
]} />
```

- [ ] **Step 4: Verify build + types + hackathon test**

Run: `rtk npm run build && rtk npm run check && node --test test/hackathon.test.js`
Expected: `14 page(s) built`; `0 errors`; hackathon tests pass.

- [ ] **Step 5: Visual check**

Sweep `localhost:4321/hackathon/` and `/en/hackathon/` at 390/820/1280 px:
exactly one solid-green featured block (the CTA band), mono countdown not
jittering, marker motif rendered in the "Qué es" section in AISC palette.

- [ ] **Step 6: Commit**

```bash
rtk git add src/components/HackathonContent.astro && rtk git commit -F - <<'EOF'
feat(hackathon): CTA band featured-block, mono countdown/kicker, marker motif

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
```

---

## Task 9: Events — featured upcoming block + EventCard off-white/mono

**Files:**
- Modify: `src/components/EventsPage.astro` (the `upcoming.length > 0` section, ~lines 30–38)
- Modify: `src/components/EventCard.astro` (`.event-card` lines 66–80; `.event-tag` lines 106–111; `.event-meta time` ~lines 54–56)

- [ ] **Step 1: Featured upcoming block**

In `src/components/EventsPage.astro`, find the conditional block guarded by
`upcoming.length > 0` that renders the upcoming-events heading
(`t(locale,'events.upcoming')`). Add `featured-block` to the class list of
the wrapper element that contains that heading and its upcoming
`EventCard`(s). Add a scoped rule so the cards inside read on green — in
the `EventsPage.astro` `<style>` add:

```css
.featured-block :global(.event-card) {
  background: #FFFFFF;
}
```

- [ ] **Step 2: EventCard off-white surface**

In `src/components/EventCard.astro`, in the `.event-card` rule, replace
`background: #FFFFFF;` with `background: var(--card-surface);`. Change
`border-radius: 16px;` to `border-radius: 20px;`. (The `:global(.event-card)`
override from Step 1 keeps featured upcoming cards white on green.)

- [ ] **Step 3: Mono the tag + date**

In `.event-tag` add `font-family: var(--font-mono);`. Add a rule:

```css
.event-meta time {
  font-family: var(--font-mono);
}
```

- [ ] **Step 4: Verify build + types + events test**

Run: `rtk npm run build && rtk npm run check && node --test test/events.test.js`
Expected: `14 page(s) built`; `0 errors`; events tests pass.

- [ ] **Step 5: Commit**

```bash
rtk git add src/components/EventsPage.astro src/components/EventCard.astro && rtk git commit -F - <<'EOF'
feat(events): featured upcoming block + off-white/mono EventCard

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
```

---

## Task 10: StartHere → off-white card + mono kicker

**Files:**
- Modify: `src/components/StartHere.astro` (`.learn-card` lines 100–107; `.learn-kind` lines 169–176)

`StartHere` is rendered on the homepage. Determine its host section
background: run `rtk grep "StartHere" src/pages/index.astro` and inspect
the wrapping `<section>` class. If the section uses `class="section alt"`
(background `--bg-secondary`), the card must use `var(--bg-elevated)` to
stay distinct; otherwise use `var(--card-surface)`.

- [ ] **Step 1: Off-white card surface (host-aware)**

In `src/components/StartHere.astro`, in `.learn-card`, replace
`background: #FFFFFF;` with:
- `background: var(--card-surface);` if the host section is NOT `.alt`, or
- `background: var(--bg-elevated);` if the host section IS `.alt`.

Change `border-radius: 16px;` to `border-radius: 20px;`.

- [ ] **Step 2: Mono the kicker**

In `.learn-kind`, add `font-family: var(--font-mono);` (keep the existing
uppercase/letter-spacing declarations).

- [ ] **Step 3: Verify build + types + learn test**

Run: `rtk npm run build && rtk npm run check && node --test test/learn.test.js`
Expected: `14 page(s) built`; `0 errors`; learn tests pass.

- [ ] **Step 4: Commit**

```bash
rtk git add src/components/StartHere.astro && rtk git commit -F - <<'EOF'
feat(home): off-white learn cards + mono kicker (host-aware surface)

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
```

---

## Task 11: ResourcesContent → off-white card (alt-section aware)

**Files:**
- Modify: `src/components/ResourcesContent.astro` (`.res-card` lines 192–206)

`ResourcesContent` renders on `/recursos/` + `/en/resources/`. Determine
the host section background: run `rtk grep -n "section" src/components/ResourcesContent.astro`
and read the `<section class=…>` that wraps the `.res-card` grid.

- [ ] **Step 1: Off-white card surface (host-aware)**

In `.res-card`, replace `background: #FFFFFF;` with:
- `background: var(--card-surface);` if the wrapping section is NOT `.alt`, or
- `background: var(--bg-elevated);` if it IS `.alt`.

(Leave the existing `border-radius: 18px;` and the `.res-card:hover` rule unchanged.)

- [ ] **Step 2: Verify build + types**

Run: `rtk npm run build && rtk npm run check`
Expected: `14 page(s) built`; `0 errors`.

- [ ] **Step 3: Visual check**

Sweep `localhost:4321/recursos/` and `/en/resources/`: cards must remain
clearly distinct from their section background (no vanishing).

- [ ] **Step 4: Commit**

```bash
rtk git add src/components/ResourcesContent.astro && rtk git commit -F - <<'EOF'
feat(resources): off-white resource cards (alt-section aware)

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
```

---

## Task 12: Homepage — join band featured block + PartnerStrip + MarkerMotif

**Files:**
- Modify: `src/pages/index.astro` (join section ~lines 34–50)
- Modify: `src/pages/en/index.astro` (parallel join section)

- [ ] **Step 1: Promote the join band to a featured block (both locales)**

In `src/pages/index.astro`, find the `<section class="section join-section">`
(renders the WhatsApp/LinkedIn/Instagram CTAs, ~lines 34–50). Add
`featured-block` to that section's class list so it becomes
`class="section join-section featured-block"`. Make the identical change in
`src/pages/en/index.astro`.

- [ ] **Step 2: Add PartnerStrip + MarkerMotif imports (both locales)**

In the frontmatter of `src/pages/index.astro`, add (if not already imported):

```astro
import PartnerStrip from '../components/PartnerStrip.astro';
import MarkerMotif from '../components/MarkerMotif.astro';
import { t } from '../i18n/ui';
```

Do the same in `src/pages/en/index.astro` (note: imports use `../components/…`
from `src/pages/en/` → use `../../components/…`). Verify the correct relative
depth per file before writing.

- [ ] **Step 3: Place PartnerStrip + a hero MarkerMotif (both locales)**

In `src/pages/index.astro`, immediately before the `join-section`
`featured-block`, add:

```astro
<PartnerStrip locale="es" />
```

In `src/pages/en/index.astro` use `<PartnerStrip locale="en" />`.

Add the marker motif as a homepage hero accent: immediately after the
existing `<Hero … />` (or the first hero section) component usage, add:

```astro
<div class="home-motif">
  <MarkerMotif labels={[
    t('es', 'motif.research'),
    t('es', 'motif.community'),
    t('es', 'motif.education'),
    t('es', 'motif.governance'),
  ]} />
</div>
```

(Use `t('en', …)` in the EN file.) Add to the page `<style>` (or a
`<style>` block if none exists):

```css
.home-motif {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 1.5rem 4rem;
}
```

- [ ] **Step 4: Verify build + types**

Run: `rtk npm run build && rtk npm run check`
Expected: `14 page(s) built`; `0 errors`.

- [ ] **Step 5: Visual check (both homepages)**

Sweep `localhost:4321/` and `/en/` at 390/820/1280 px: one solid-green
join `featured-block`, PartnerStrip with the single Apart logo looking
intentional (grayscale → colour on hover), marker motif under the hero in
AISC palette. ES page shows Spanish labels, EN shows English.

- [ ] **Step 6: Commit**

```bash
rtk git add src/pages/index.astro src/pages/en/index.astro && rtk git commit -F - <<'EOF'
feat(home): join band featured-block + PartnerStrip + hero MarkerMotif

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
```

---

## Task 13: Hackathon pages — add PartnerStrip

**Files:**
- Modify: `src/pages/hackathon.astro`
- Modify: `src/pages/en/hackathon.astro`

(The marker motif is already added to the hackathon body via Task 8.)

- [ ] **Step 1: Import + place PartnerStrip (both locales)**

In `src/pages/hackathon.astro` frontmatter add (if absent):

```astro
import PartnerStrip from '../components/PartnerStrip.astro';
```

Place `<PartnerStrip locale="es" />` immediately before the closing layout
tag / footer area (after `<HackathonContent … />`). In
`src/pages/en/hackathon.astro` use the correct relative import depth
(`../../components/PartnerStrip.astro` if the file is under `src/pages/en/`)
and `<PartnerStrip locale="en" />`.

- [ ] **Step 2: Verify build + types + hackathon test**

Run: `rtk npm run build && rtk npm run check && node --test test/hackathon.test.js`
Expected: `14 page(s) built`; `0 errors`; hackathon tests pass.

- [ ] **Step 3: Commit**

```bash
rtk git add src/pages/hackathon.astro src/pages/en/hackathon.astro && rtk git commit -F - <<'EOF'
feat(hackathon): add PartnerStrip to both hackathon pages

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
```

---

## Task 14: About pages — MarkerMotif motif

**Files:**
- Modify: `src/pages/sobre.astro`
- Modify: `src/pages/en/about.astro`

Do NOT touch the Fernando memorial tribute (`about.memoriam.tribute`) — the
motif goes elsewhere on the page (e.g. after the mission section).

- [ ] **Step 1: Import + place MarkerMotif (both locales)**

In `src/pages/sobre.astro` frontmatter add (if absent):

```astro
import MarkerMotif from '../components/MarkerMotif.astro';
import { t } from '../i18n/ui';
```

After the mission section (the element rendering `about.mission.body`) and
before the memorial / team sections, add:

```astro
<div class="about-motif">
  <MarkerMotif labels={[
    t('es', 'motif.research'),
    t('es', 'motif.community'),
    t('es', 'motif.education'),
    t('es', 'motif.governance'),
  ]} />
</div>
```

Add to the page `<style>`:

```css
.about-motif {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 2rem 1.5rem 4rem;
}
```

Mirror in `src/pages/en/about.astro` with the correct relative import depth
and `t('en', …)`. Confirm the memorial tribute markup is untouched.

- [ ] **Step 2: Verify build + types**

Run: `rtk npm run build && rtk npm run check`
Expected: `14 page(s) built`; `0 errors`.

- [ ] **Step 3: Visual check**

Sweep `localhost:4321/sobre/` and `/en/about/`: motif renders after the
mission section in AISC palette; the Fernando memorial tribute text is
byte-for-byte unchanged.

- [ ] **Step 4: Commit**

```bash
rtk git add src/pages/sobre.astro src/pages/en/about.astro && rtk git commit -F - <<'EOF'
feat(about): add MarkerMotif motif (memorial tribute untouched)

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
```

---

## Task 15: Full verification sweep + deploy + memory/Vault

**Files:** none (verification + deploy + docs)

- [ ] **Step 1: Full build + type + test gate**

Run:
```bash
rtk npm run build && rtk npm run check && node --test test/hackathon.test.js test/events.test.js test/contactMailto.test.js test/courses.test.js test/learn.test.js test/i18n-keys.test.js
```
Expected: `14 page(s) built`; `0 errors`; 27 tests pass (21 + 6).

- [ ] **Step 2: Visual sweep — all 14 routes at 3 breakpoints**

`rtk npm run dev`, then at 390 / 820 / 1280 px check `/`, `/en/`,
`/hackathon/`, `/en/hackathon/`, `/eventos/`, `/en/events/`, `/sobre/`,
`/en/about/`, `/recursos/`, `/en/resources/`, `/involucrate/`,
`/en/get-involved/`, `/contacto/`, `/en/contact/`:
- Floating pill floats, nothing hidden under it, scrolled state engages,
  `Tab` shows focus ring on pill links + green CTA.
- Exactly one solid-green `.featured-block` per page that has one; `#101010`
  text legible on green.
- Cards off-white and legible on both white and `.alt` sections.
- Mono on dates/labels; countdown digits do not jitter.
- PartnerStrip looks intentional with the single Apart logo.
- Marker motif renders with the `Caveat` hand font in AISC palette; no CLS.

- [ ] **Step 3: Push (autonomous deploy)**

```bash
rtk git push origin master
```

- [ ] **Step 4: Verify live**

Poll until Vercel propagates (edge lag ~16–24 s), then confirm HTTP 200 on
all 14 routes:
```bash
for p in "" "en/" "hackathon/" "en/hackathon/" "eventos/" "en/events/" "sobre/" "en/about/" "recursos/" "en/resources/" "involucrate/" "en/get-involved/" "contacto/" "en/contact/"; do echo -n "$p "; curl -s -o /dev/null -w "%{http_code}\n" "https://aisafetycolombia.org/$p"; done
```
Expected: all `200`.

- [ ] **Step 5: Update memory + Vault**

Per CLAUDE.md: append a dated entry to
`C:\Users\joseg\.claude\projects\C--Users-joseg\memory\project_ais_colombia_redesign.md`
(and the MEMORY.md index line if needed) and to
`C:\Users\joseg\Documents\Vault\Projects\AI_Safety_Colombia_Website.md`
recording the Apart-inspired refresh shipped (six workstreams, merge SHA,
live verification), and note the deferred items (scroll-reveal, scroll
progress bar) as future options.

---

## Self-Review

**1. Spec coverage:**
- A Floating pill navbar → Task 4 ✓ (+ clearance contingency Step 5)
- B Solid-color featured block → Task 1 (utility), 7 (banner), 8 (hackathon CTA band), 9 (events), 12 (homepage join) ✓
- C Off-white card surface → Task 9 (EventCard), 10 (StartHere), 11 (Resources), with the `.alt`-section caveat handled host-aware ✓
- D Mono dates & labels → Task 1 (token), 7/8 (countdowns), 9 (event tag/time), 10 (learn kicker), PartnerStrip title ✓
- E Partner strip → Task 5 (component), 12 + 13 (placement) ✓
- F Hand-drawn marker motif → Task 2 (font), 6 (component), 8/12/14 (placement) ✓
- i18n additions → Task 3 ✓
- Verification (14 pages / 0 errors / tests / sweep / deploy / memory) → Task 15 ✓
- Deferred (scroll-reveal, progress bar) → not implemented, recorded in Task 15 Step 5 ✓
No gaps.

**2. Placeholder scan:** No "TBD/TODO". The HackathonContent/EventsPage/host-section
items use deterministic search anchors (exact i18n keys / class names that
were verified verbatim in the audit) with both conditional branches fully
specified — these are locate-then-apply instructions, not placeholders.

**3. Type consistency:** `MarkerMotif` prop is `labels: string[]` defined in
Task 6 and called with a 4-string array in Tasks 8/12/14. `PartnerStrip`
prop is `{ locale }` defined in Task 5 and called with `locale="es|en"` in
Tasks 12/13. i18n keys added in Task 3 (`nav.cta`, `partners.title`,
`motif.research|community|education|governance`) are exactly the keys
consumed in Tasks 4/5/8/12/14. CSS tokens (`--card-surface`, `--font-mono`,
`--font-hand`) and `.featured-block` defined in Task 1 are consumed
consistently thereafter. Consistent.
