# Whole-Site Improvement Pass Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Apply surgical, section-by-section improvements to every part of the live AI Safety Colombia site (de-numbering, DRY hero, CTA-arrow rule, content fill, visual refinements) while keeping the current design language, the 16-route IA, and the static Astro build completely intact.

**Architecture:** Astro 5.x static bilingual site (ES default, EN under `/en/`). Changes are markup/CSS/i18n/data only. New shared primitives: `PageHero.astro` (DRY interior hero), `contactMailto.js` (pure mailto builder, unit-tested), `metrics.json` (homepage metrics data). i18n strings flow through `src/i18n/ui.ts`. No new colors, typefaces, layout systems, pages, or routes.

**Tech Stack:** Astro, TypeScript, `node:test` + `node:assert/strict`, `astro check`. Commands: `npm run build`, `npm run check`, `node --test test/<file>.js`. No `npm test` script — run test files individually.

**Testing note:** This site has no component-render test harness. For markup/CSS/i18n/data changes the regression gate is `npm run build` (must stay **16 routes**, clean), `npm run check` (**0 errors**), `node --test test/events.test.js` (**4/4**), plus exact `grep`/`rg` assertions. The two genuinely unit-testable new pieces (`contactMailto.js`, the `hackathon.json` shape) get real failing-test-first cycles (Tasks 4–5). Every other task states its concrete build/check/grep gate as its test step.

---

## File Structure

| File | Responsibility | Task |
|---|---|---|
| `src/i18n/ui.ts` | All UI strings; add new keys, retitle tracks, retire `join.newsletter` | 1 |
| `src/styles/global.css` | Delete `.editorial-num` rules; keep bars + `.is-green h3 a` | 2 |
| `src/components/PageHero.astro` | **New** — DRY interior `<header>` hero | 3 |
| `src/utils/contactMailto.js` | **New** — pure `buildMailto()` | 4 |
| `test/contactMailto.test.js` | **New** — unit tests for `buildMailto` | 4 |
| `src/data/hackathon.json` | 5 tracks + 4 judges + empty schedule times | 5 |
| `test/hackathon.test.js` | **New** — data-shape assertions | 5 |
| `src/components/WhatWeDo.astro` | De-number (no kicker, see Deviation D1) | 6 |
| `src/components/HackathonContent.astro` | De-number why+agenda, render 5 tracks w/ subareas, auto-fit grid, blue/yellow bars | 7 |
| `src/components/Navbar.astro` | `<header>` landmark, nav `aria-label`, `--max-width`, drop nav-CTA arrow | 8 |
| `src/components/Footer.astro` | Remove dead newsletter block+CSS, add community CTA button | 9 |
| `src/components/Hero.astro` | Drop secondary-button arrow, add credibility line | 10 |
| `src/data/metrics.json` | **New** — homepage metric values + label keys | 11 |
| `src/pages/index.astro`, `src/pages/en/index.astro` | Pipeline dots, MetricsBar from data, Join community card | 11 |
| `src/pages/sobre.astro`, `src/pages/en/about.astro` | PageHero, memorial card, team list | 12 |
| `src/pages/programas.astro`, `src/pages/en/programs.astro` | PageHero, de-number | 13 |
| `src/pages/recursos.astro`, `src/pages/en/resources.astro` | PageHero, de-number, "coming soon" non-links | 14 |
| `src/pages/involucrate.astro`, `src/pages/en/get-involved.astro` | PageHero, de-number, drop 2 CTA arrows | 15 |
| `src/pages/contacto.astro`, `src/pages/en/contact.astro` | PageHero, drop Twitter/X, mailto form, drop submit arrow | 16 |
| `src/components/EventsPage.astro` | PageHero, section `aria-labelledby` | 17 |
| `src/components/EventCard.astro` | Drop in-card "View on Instagram" arrow | 17 |
| (verification) | Build/check/test/grep/Playwright + memory/vault | 18 |

Tasks 1–5 are foundations/new files. Tasks 6–17 are consumers (each file rewritten once, all of its concerns in one task). Task 18 verifies.

---

### Task 1: i18n keys (`src/i18n/ui.ts`)

**Files:**
- Modify: `src/i18n/ui.ts:55-56` (retire `join.newsletter`), `:31` & `:104` (`hackathon.tracksTitle`), add keys in both `es` (ends `:73`) and `en` (ends `:146`) blocks.

- [ ] **Step 1: Retire `join.newsletter` in both locales**

In the `es` block, delete line 56 `'join.newsletter': 'Newsletter',`. In the `en` block, delete line 129 `'join.newsletter': 'Newsletter',`. (Keep `join.whatsapp`.)

- [ ] **Step 2: Retitle the tracks heading**

`es` line 31: `'hackathon.tracksTitle': 'Dos tracks',` → `'hackathon.tracksTitle': 'Tracks',`
`en` line 104: `'hackathon.tracksTitle': 'Two tracks',` → `'hackathon.tracksTitle': 'Tracks',`

- [ ] **Step 3: Add new keys to the `es` block**

Insert immediately before `'footer.tagline':` in the `es` block:

```js
    'metrics.members': 'Miembros',
    'metrics.hackathon': 'Hackathon',
    'metrics.partnerships': 'Alianzas',
    'hero.credibility': 'En alianza con Apart Research · Comunidad de más de 30 personas',
    'join.subtitle': 'Conéctate con la comunidad de seguridad de IA en Colombia.',
    'nav.primary': 'Navegación principal',
    'resources.comingSoon': 'Próximamente',
    'about.memoriam.kicker': 'En memoria',
    'about.memoriam.name': 'Fernando Avalos-López',
    'about.memoriam.role': 'Cofundador',
    'about.memoriam.affiliation': 'Investigador en alineación de IA, Apart Research',
    'about.memoriam.tribute': 'Fernando, cofundador de AI Safety Colombia, ayudó a imaginar y construir esta comunidad desde el principio. Su memoria sigue presente en lo que hacemos.',
    'about.team.name': 'Jose Gelves',
    'about.team.role': 'Cofundador y organizador',
    'about.team.affiliation': 'Politólogo, Universidad de los Andes; investigador en política de IA y gobierno digital',
    'footer.communityCta': 'Únete al WhatsApp',
```

- [ ] **Step 4: Add the parallel keys to the `en` block**

Insert immediately before `'footer.tagline':` in the `en` block:

```js
    'metrics.members': 'Members',
    'metrics.hackathon': 'Hackathon',
    'metrics.partnerships': 'Partnerships',
    'hero.credibility': 'In partnership with Apart Research · A community of 30+',
    'join.subtitle': 'Connect with the AI safety community in Colombia.',
    'nav.primary': 'Primary navigation',
    'resources.comingSoon': 'Coming soon',
    'about.memoriam.kicker': 'In memoriam',
    'about.memoriam.name': 'Fernando Avalos-López',
    'about.memoriam.role': 'Cofounder',
    'about.memoriam.affiliation': 'AI alignment researcher, Apart Research',
    'about.memoriam.tribute': 'Fernando, a cofounder of AI Safety Colombia, helped imagine and build this community from the start. His memory remains present in everything we do.',
    'about.team.name': 'Jose Gelves',
    'about.team.role': 'Cofounder & organizer',
    'about.team.affiliation': 'Political scientist, Universidad de los Andes; AI & digital-government policy researcher',
    'footer.communityCta': 'Join our WhatsApp',
```

- [ ] **Step 5: Verify type-check passes**

Run: `npm run check`
Expected: **0 errors**. (`t()`'s `key: keyof typeof ui.es` now includes the new keys; `join.newsletter` removal compiles because Task 11/9 remove its last usages — at this point those usages still exist, so DO NOT delete `join.newsletter` consumers yet; this step only confirms the additions/retitle type-check. If `check` reports `join.newsletter` errors from `index.astro`/`en/index.astro`, that is expected and resolved in Task 11; proceed.)

- [ ] **Step 6: Commit**

```bash
git add src/i18n/ui.ts
git commit -m "i18n: add metrics/hero/join/about/footer keys, retitle tracks, retire join.newsletter"
```

---

### Task 2: De-number `src/styles/global.css`

**Files:**
- Modify: `src/styles/global.css:192-199` (delete `.editorial-num`), `:224-227` (delete num color rules, keep `.is-green h3 a`), `:240-242` (delete mobile num width).

- [ ] **Step 1: Delete the `.editorial-num` base rule**

Delete lines 192-199 in full:

```css
.editorial-num {
  font-size: clamp(2.25rem, 5vw, 3.375rem);
  font-weight: 700;
  line-height: 1;
  letter-spacing: -0.04em;
  width: 5.5rem;
  flex: none;
}
```

- [ ] **Step 2: Drop the numeral color modifiers, keep the bar + link colors**

Replace this block (lines 224-227):

```css
.is-green .editorial-num, .is-green h3 a { color: var(--accent-green); }
.is-coral .editorial-num { color: var(--accent-coral); }
.is-blue  .editorial-num { color: var(--accent-blue); }
.is-yellow .editorial-num { color: var(--accent-yellow-line); }
```

with (keep only the heading-link color, which is unrelated to numerals):

```css
.is-green h3 a { color: var(--accent-green); }
```

(Lines 228-231 `.is-green/.is-coral/.is-blue/.is-yellow .editorial-bar` rules are **kept** unchanged.)

- [ ] **Step 3: Delete the mobile numeral width rule**

Inside the `@media (max-width: 768px)` block, delete:

```css
  .editorial-num {
    width: 3.5rem;
  }
```

(Keep the surrounding `:root` padding override and `.editorial-row { gap: 1rem; }`.)

- [ ] **Step 4: Verify no `.editorial-num` CSS remains and build is clean**

Run: `rg -n "editorial-num" src/styles/global.css` → Expected: **no matches**.
Run: `npm run build` → Expected: clean, **16 page(s)** (component markup still references `.editorial-num` until Tasks 6/7/13/14/15; that is harmless dead class usage, build stays clean — full removal verified in Task 18).

- [ ] **Step 5: Commit**

```bash
git add src/styles/global.css
git commit -m "style: remove .editorial-num numeral rules (keep colored bars + h3 link color)"
```

---

### Task 3: Create `src/components/PageHero.astro`

**Files:**
- Create: `src/components/PageHero.astro`

- [ ] **Step 1: Write the component**

```astro
---
interface Props {
  title: string;
  desc?: string;
}

const { title, desc } = Astro.props;
---

<header class="page-hero">
  <div class="container">
    <h1 class="section-title">{title}</h1>
    {desc && <p class="page-desc">{desc}</p>}
  </div>
</header>

<style>
  .page-hero {
    padding: 9rem 1.5rem 3rem;
    text-align: center;
  }

  .page-hero .page-desc {
    color: var(--text-secondary);
    font-size: 1.125rem;
    max-width: 700px;
    margin: 0 auto;
    line-height: 1.7;
  }
</style>
```

- [ ] **Step 2: Verify build is clean**

Run: `npm run build`
Expected: clean, **16 page(s)** (component unused yet; adopted in Tasks 12–17).

- [ ] **Step 3: Commit**

```bash
git add src/components/PageHero.astro
git commit -m "feat: add shared PageHero component (DRY interior hero, header landmark)"
```

---

### Task 4: Create `src/utils/contactMailto.js` (TDD)

**Files:**
- Create: `src/utils/contactMailto.js`
- Test: `test/contactMailto.test.js`

- [ ] **Step 1: Write the failing test**

`test/contactMailto.test.js`:

```js
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildMailto } from '../src/utils/contactMailto.js';

test('buildMailto composes a Spanish subject and encoded body', () => {
  const url = buildMailto({
    to: 'aisafetycolombia@gmail.com',
    name: 'Ana',
    email: 'ana@x.com',
    message: 'Hola',
    locale: 'es',
  });
  assert.ok(url.startsWith('mailto:aisafetycolombia@gmail.com?'));
  assert.ok(
    url.includes(
      `subject=${encodeURIComponent('Mensaje de Ana (web AI Safety Colombia)')}`
    )
  );
  assert.ok(url.includes(encodeURIComponent('Nombre: Ana')));
  assert.ok(url.includes(encodeURIComponent('ana@x.com')));
});

test('buildMailto composes an English subject', () => {
  const url = buildMailto({
    to: 'aisafetycolombia@gmail.com',
    name: 'Bob',
    email: 'bob@x.com',
    message: 'Hi',
    locale: 'en',
  });
  assert.ok(
    url.includes(
      `subject=${encodeURIComponent('Message from Bob (AI Safety Colombia site)')}`
    )
  );
  assert.ok(url.includes(encodeURIComponent('Name: Bob')));
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `node --test test/contactMailto.test.js`
Expected: FAIL (`Cannot find module '../src/utils/contactMailto.js'`).

- [ ] **Step 3: Write the minimal implementation**

`src/utils/contactMailto.js`:

```js
/**
 * Build a mailto: URL from contact-form fields.
 * @param {{to: string, name: string, email: string, message: string, locale: 'es' | 'en'}} p
 * @returns {string}
 */
export function buildMailto({ to, name, email, message, locale }) {
  const subject =
    locale === 'es'
      ? `Mensaje de ${name} (web AI Safety Colombia)`
      : `Message from ${name} (AI Safety Colombia site)`;
  const body =
    locale === 'es'
      ? `Nombre: ${name}\nEmail: ${email}\n\n${message}`
      : `Name: ${name}\nEmail: ${email}\n\n${message}`;
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `node --test test/contactMailto.test.js`
Expected: PASS (2/2).

- [ ] **Step 5: Commit**

```bash
git add src/utils/contactMailto.js test/contactMailto.test.js
git commit -m "feat: add buildMailto util with tests (contact-form mailto fallback)"
```

---

### Task 5: Hackathon data — 5 tracks + 4 judges + empty schedule times (TDD)

**Files:**
- Modify: `src/data/hackathon.json:19-22` (`tracks`), `:51-58` (`schedule` `time`), `:64` (`judges`)
- Test: `test/hackathon.test.js`

- [ ] **Step 1: Write the failing test**

`test/hackathon.test.js`:

```js
import { test } from 'node:test';
import assert from 'node:assert/strict';
import data from '../src/data/hackathon.json' with { type: 'json' };

test('hackathon has 5 tracks with the new shape', () => {
  assert.equal(data.tracks.length, 5);
  const accents = data.tracks.map((t) => t.accent);
  assert.deepEqual(accents, ['is-green', 'is-coral', 'is-blue', 'is-yellow', 'is-green']);
  for (const t of data.tracks) {
    assert.equal(typeof t.titleEs, 'string');
    assert.equal(typeof t.titleEn, 'string');
    assert.ok(Array.isArray(t.subareas) && t.subareas.length >= 1);
    for (const s of t.subareas) {
      assert.equal(typeof s.es, 'string');
      assert.equal(typeof s.en, 'string');
    }
  }
});

test('hackathon has 4 named judges with affiliation only', () => {
  assert.equal(data.judges.length, 4);
  const names = data.judges.map((j) => j.name);
  assert.deepEqual(names, [
    'Melissa Robles',
    'Catalina Bernal',
    'Juan Pablo Liévano',
    'Steve Hege',
  ]);
  for (const j of data.judges) {
    assert.equal(typeof j.affiliationEs, 'string');
    assert.equal(typeof j.affiliationEn, 'string');
    assert.equal(j.email, undefined);
    assert.equal(j.phone, undefined);
  }
});

test('no em-dash placeholder remains in schedule times', () => {
  for (const day of data.schedule) {
    for (const ev of day.events) {
      assert.notEqual(ev.time, '—');
      assert.equal(ev.time, '');
    }
  }
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `node --test test/hackathon.test.js`
Expected: FAIL (current `tracks.length` is 2, `judges` empty, `time` is `"—"`).

- [ ] **Step 3: Replace the `tracks` array**

Replace lines 19-22 (the entire `"tracks": [ ... ],` block) with:

```json
  "tracks": [
    { "titleEs": "Seguridad Técnica de IA", "titleEn": "Technical AI Safety", "accent": "is-green", "subareas": [
      { "es": "Evaluaciones para sistemas agénticos", "en": "Evaluations for agentic systems" },
      { "es": "Interpretabilidad mecanicista", "en": "Mechanistic interpretability" }
    ]},
    { "titleEs": "Seguridad de IA", "titleEn": "AI Security", "accent": "is-coral", "subareas": [
      { "es": "Seguridad de pipelines (API/Cloud)", "en": "Pipeline security (API/Cloud)" },
      { "es": "Inyección de prompts y jailbreaks", "en": "Prompt injection and jailbreaks" },
      { "es": "Control de IA", "en": "AI control" }
    ]},
    { "titleEs": "IA Responsable", "titleEn": "Responsible AI", "accent": "is-blue", "subareas": [
      { "es": "Mitigación de alucinaciones", "en": "Hallucination mitigation" },
      { "es": "Auditoría de comportamiento (multilingüe, intercultural)", "en": "Behavioral audit (multilingual, cross-cultural)" },
      { "es": "Evaluación de impacto social", "en": "Social impact evaluation" }
    ]},
    { "titleEs": "Gobernanza de IA", "titleEn": "AI Governance", "accent": "is-yellow", "subareas": [
      { "es": "Análisis de política y regulación de IA", "en": "AI policy and regulation analysis" },
      { "es": "Auditoría y rendición de cuentas de sistemas", "en": "System auditing and accountability" },
      { "es": "Monitoreo del ecosistema", "en": "Ecosystem monitoring" }
    ]},
    { "titleEs": "Gobernanza de LAWS (liderado desde Bogotá)", "titleEn": "LAWS governance (Bogotá-led)", "accent": "is-green", "subareas": [
      { "es": "Sistemas de armas autónomas letales", "en": "Lethal autonomous weapons systems" }
    ]}
  ],
```

- [ ] **Step 4: Empty the schedule `time` placeholders**

Lines 51-58: change each `"time": "—"` to `"time": ""` (3 occurrences, inside the `schedule` array). Resulting events:

```json
    { "day": "Viernes 19", "dayEn": "Friday 19", "accent": "is-green", "events": [
      { "time": "", "title": "Apertura y formación de equipos", "titleEn": "Opening and team formation" }
    ]},
    { "day": "Sábado 20", "dayEn": "Saturday 20", "accent": "is-blue", "events": [
      { "time": "", "title": "Construcción con mentoría", "titleEn": "Building with mentoring" }
    ]},
    { "day": "Domingo 21", "dayEn": "Sunday 21", "accent": "is-yellow", "events": [
      { "time": "", "title": "Entrega del reporte (PDF) y revisión", "titleEn": "Report submission (PDF) and review" }
    ]}
```

(The schedule component never renders `time`, so emptying the data fully resolves the em-dash placeholder with no component change. Verified again in Task 7.)

- [ ] **Step 5: Fill the `judges` array**

Line 64: replace `"judges": [],` with:

```json
  "judges": [
    { "name": "Melissa Robles", "affiliationEs": "IDB Lab y Quantil", "affiliationEn": "IDB Lab & Quantil" },
    { "name": "Catalina Bernal", "affiliationEs": "BIP Colombia", "affiliationEn": "BIP Colombia" },
    { "name": "Juan Pablo Liévano", "affiliationEs": "UC Berkeley", "affiliationEn": "UC Berkeley" },
    { "name": "Steve Hege", "affiliationEs": "ILAPS", "affiliationEn": "ILAPS" }
  ],
```

- [ ] **Step 6: Run the test to verify it passes**

Run: `node --test test/hackathon.test.js`
Expected: PASS (3/3).

- [ ] **Step 7: Commit**

```bash
git add src/data/hackathon.json test/hackathon.test.js
git commit -m "data: fill 5 hackathon tracks + 4 named judges, empty schedule time placeholders"
```

---

### Task 6: De-number `src/components/WhatWeDo.astro`

**Note (Deviation D1 — see plan footer):** the spec asks for an `.editorial-kicker` eyebrow here, but the row `<h3>` text *is* the category word already in `ui.ts` (`Investigacion`/`Educacion`/`Comunidad`); a kicker would render the same word twice stacked. Per D1 this task removes the numeral only — bar + heading + body remain, which is exactly the marker the spec uses on Programs/Get-Involved/Resources. No kicker markup, no unused `.editorial-kicker` CSS.

**Files:**
- Modify: `src/components/WhatWeDo.astro:11-15` (drop `n`), `:24` (drop num div)

- [ ] **Step 1: Remove the `n` field from the rows array**

Replace lines 11-15:

```js
const rows = [
  { n: '01', cls: 'is-green', title: t(locale, 'what-we-do.research.title'),  desc: t(locale, 'what-we-do.research.desc') },
  { n: '02', cls: 'is-coral', title: t(locale, 'what-we-do.education.title'), desc: t(locale, 'what-we-do.education.desc') },
  { n: '03', cls: 'is-blue',  title: t(locale, 'what-we-do.community.title'), desc: t(locale, 'what-we-do.community.desc') },
];
```

with:

```js
const rows = [
  { cls: 'is-green', title: t(locale, 'what-we-do.research.title'),  desc: t(locale, 'what-we-do.research.desc') },
  { cls: 'is-coral', title: t(locale, 'what-we-do.education.title'), desc: t(locale, 'what-we-do.education.desc') },
  { cls: 'is-blue',  title: t(locale, 'what-we-do.community.title'), desc: t(locale, 'what-we-do.community.desc') },
];
```

- [ ] **Step 2: Remove the numeral div from the template**

Delete line 24:

```html
          <div class="editorial-num">{row.n}</div>
```

(Keep `<div class="editorial-bar"></div>` and the `.editorial-tx` block.)

- [ ] **Step 3: Verify build + no num usage**

Run: `npm run build` → Expected: clean, **16 page(s)**.
Run: `rg -n "editorial-num" src/components/WhatWeDo.astro` → Expected: **no matches**.

- [ ] **Step 4: Commit**

```bash
git add src/components/WhatWeDo.astro
git commit -m "feat(home): de-number What We Do rows (bar + heading marker)"
```

---

### Task 7: `src/components/HackathonContent.astro` — de-number + 5-track render

**Files:**
- Modify: `src/components/HackathonContent.astro:48-58` (why-rows), `:65-75` (tracks render), `:122-131` (agenda rows), `:237-241` (`.hk-tracks` grid), `:258-259` (bar colors), add `.hk-track-list` CSS.

- [ ] **Step 1: De-number the "why" editorial rows**

Replace lines 48-57:

```jsx
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
```

with:

```jsx
      {data.pipeline.map((step, i) => (
        <div class={`editorial-row ${['is-green','is-coral','is-blue'][i % 3]}`}>
          <div class="editorial-bar"></div>
          <div class="editorial-tx">
            <h3>{es ? step.stepEs : step.stepEn}</h3>
            <p>{es ? step.descEs : step.descEn}</p>
          </div>
        </div>
      ))}
```

- [ ] **Step 2: Render the 5 tracks with subareas**

Replace lines 65-75:

```jsx
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
```

with:

```jsx
    <div class="hk-tracks">
      {data.tracks.map(track => (
        <div class={`hk-track ${track.accent}`}>
          <div class="hk-track-bar"></div>
          <div>
            <h3>{es ? track.titleEs : track.titleEn}</h3>
            <ul class="hk-track-list">
              {track.subareas.map(s => <li>{es ? s.es : s.en}</li>)}
            </ul>
          </div>
        </div>
      ))}
    </div>
```

- [ ] **Step 3: De-number the agenda editorial rows**

Replace lines 122-131:

```jsx
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
```

with:

```jsx
      {data.schedule.map((day, i) => (
        <div class={`editorial-row ${day.accent ?? ['is-green','is-blue','is-yellow'][i % 3]}`}>
          <div class="editorial-bar"></div>
          <div class="editorial-tx">
            <h3>{es ? day.day : day.dayEn}</h3>
            <p>{es ? day.events[0].title : day.events[0].titleEn}</p>
          </div>
        </div>
      ))}
```

(`time` is still not rendered anywhere — Task 5 already emptied it; nothing else to do for the em-dash here.)

- [ ] **Step 4: Make the tracks grid responsive `auto-fit` for 5 cards**

Replace lines 237-241:

```css
  .hk-tracks {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.25rem;
  }
```

with:

```css
  .hk-tracks {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.25rem;
  }
```

(The existing `@media (max-width: 768px) { .hk-tracks { grid-template-columns: 1fr; } }` at lines 370-374 stays unchanged.)

- [ ] **Step 5: Add blue + yellow track-bar colors**

Replace lines 258-259:

```css
  .hk-track.is-green .hk-track-bar { background: var(--accent-green); }
  .hk-track.is-coral .hk-track-bar { background: var(--accent-coral); }
```

with:

```css
  .hk-track.is-green .hk-track-bar { background: var(--accent-green); }
  .hk-track.is-coral .hk-track-bar { background: var(--accent-coral); }
  .hk-track.is-blue .hk-track-bar { background: var(--accent-blue); }
  .hk-track.is-yellow .hk-track-bar { background: var(--accent-yellow-line); }
```

- [ ] **Step 6: Add the subarea list style**

Immediately after the `.hk-track p { ... }` rule (lines 268-272), add:

```css
  .hk-track-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .hk-track-list li {
    font-size: 0.9375rem;
    color: var(--text-secondary);
    line-height: 1.5;
    padding-left: 0.875rem;
    position: relative;
  }

  .hk-track-list li::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0.55em;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: var(--accent-green);
  }
```

- [ ] **Step 7: Verify build, check, hackathon test, no num usage**

Run: `npm run build` → clean, **16 page(s)**.
Run: `npm run check` → **0 errors** (the old `track.labelEs/descEs` references are gone; the new `titleEs/subareas` shape matches `hackathon.json`).
Run: `node --test test/hackathon.test.js` → **3/3**.
Run: `rg -n "editorial-num" src/components/HackathonContent.astro` → **no matches**.

- [ ] **Step 8: Commit**

```bash
git add src/components/HackathonContent.astro
git commit -m "feat(hackathon): de-number why/agenda, render 5 track cards with subareas"
```

---

### Task 8: `src/components/Navbar.astro` — landmark, aria-label, max-width, arrow

**Files:**
- Modify: `src/components/Navbar.astro:2-3` (import `Locale` typing already present; add nothing), `:27` & `:53-59` (wrap in `<header>`), `:27` (`aria-label`), `:43-45` (drop arrow), `:73` (`max-width`), `:61` (`<style>` add `.site-header`).

- [ ] **Step 1: Wrap the nav + mobile-nav in a `<header>` landmark and label the nav**

Replace line 27 `<nav class="navbar">` with:

```html
<header class="site-header">
<nav class="navbar" aria-label={t(locale, 'nav.primary')}>
```

Then replace lines 53-59 (the mobile-nav block, currently a sibling of `</nav>`):

```html
<div class="mobile-nav">
  <a href={localePath(locale, '/')} class={isActive('index') ? 'active' : ''}>{t(locale, 'nav.home')}</a>
  {links.map(link => (
    <a href={link.href} class={isActive(link.page) ? 'active' : ''}>{link.label}</a>
  ))}
  <a href={localePath(locale, '/contacto/')} class={isActive('contact') ? 'active' : ''}>{t(locale, 'nav.contact')}</a>
</div>
```

with (note the added closing `</header>`):

```html
<div class="mobile-nav">
  <a href={localePath(locale, '/')} class={isActive('index') ? 'active' : ''}>{t(locale, 'nav.home')}</a>
  {links.map(link => (
    <a href={link.href} class={isActive(link.page) ? 'active' : ''}>{link.label}</a>
  ))}
  <a href={localePath(locale, '/contacto/')} class={isActive('contact') ? 'active' : ''}>{t(locale, 'nav.contact')}</a>
</div>
</header>
```

- [ ] **Step 2: Drop the arrow from the nav CTA**

Replace lines 43-45:

```html
      <a href={localePath(locale, '/contacto/')} class="btn btn-dark nav-cta">
        {t(locale, 'nav.contact')} &rarr;
      </a>
```

with:

```html
      <a href={localePath(locale, '/contacto/')} class="btn btn-dark nav-cta">
        {t(locale, 'nav.contact')}
      </a>
```

- [ ] **Step 3: Align the navbar to the site max-width + add a layout-neutral header rule**

Line 73: change `max-width: 1100px;` to `max-width: var(--max-width);`.

At the top of the `<style>` block (immediately after line 61 `<style>`), add:

```css
  .site-header {
    display: contents;
  }
```

(`.navbar` and `.mobile-nav` are both `position: fixed`; `display: contents` makes the new `<header>` purely semantic with zero layout effect.)

- [ ] **Step 4: Verify build, check, no broken arrow/layout**

Run: `npm run build` → clean, **16 page(s)**.
Run: `npm run check` → **0 errors**.
Run: `rg -n "nav-cta" src/components/Navbar.astro` then visually confirm no `&rarr;` on that anchor.

- [ ] **Step 5: Commit**

```bash
git add src/components/Navbar.astro
git commit -m "a11y/ui(nav): header landmark + aria-label, 1200px max-width, drop nav-CTA arrow"
```

---

### Task 9: `src/components/Footer.astro` — remove dead newsletter, add community CTA

**Files:**
- Modify: `src/components/Footer.astro:18-23` (delete newsletter block), add CTA button, `:75-110` (delete newsletter CSS), add `.footer-cta` CSS.

- [ ] **Step 1: Replace the dead newsletter input with a community CTA button**

Replace lines 18-23:

```html
        <div class="newsletter" id="newsletter">
          <div class="newsletter-input">
            <input type="email" placeholder={locale === 'es' ? 'Tu email' : 'Your email'} aria-label="Email">
            <button class="btn btn-primary newsletter-btn">&rarr;</button>
          </div>
        </div>
```

with:

```html
        <a
          href="https://chat.whatsapp.com/KwE8cciX48TAVhAOHnrLaZ"
          target="_blank"
          rel="noopener noreferrer"
          class="btn btn-primary footer-cta"
        >{t(locale, 'footer.communityCta')}</a>
```

- [ ] **Step 2: Replace the newsletter CSS with a single `.footer-cta` rule**

Replace lines 75-110 (the `.newsletter`, `.newsletter-input`, `.newsletter-input input`, `::placeholder`, `:focus`, `.newsletter-btn` rules):

```css
  .newsletter {
    margin-top: 1.5rem;
  }

  .newsletter-input {
    display: flex;
    gap: 0.5rem;
    max-width: 300px;
  }

  .newsletter-input input {
    flex: 1;
    padding: 0.625rem 1rem;
    background: #1a1a1a;
    border: 1px solid #2f2f2f;
    border-radius: 999px;
    color: #f5f5f5;
    font-size: 0.875rem;
    font-family: var(--font-body);
    outline: none;
    transition: border-color 0.2s;
  }

  .newsletter-input input::placeholder {
    color: #7a7a7a;
  }

  .newsletter-input input:focus {
    border-color: var(--accent-green);
  }

  .newsletter-btn {
    padding: 0.625rem 1rem;
    font-size: 0.875rem;
    flex-shrink: 0;
  }
```

with:

```css
  .footer-cta {
    margin-top: 1.5rem;
  }
```

- [ ] **Step 3: Verify build + dead markup gone**

Run: `npm run build` → clean, **16 page(s)**.
Run: `rg -n "newsletter|id=\"newsletter\"" src/components/Footer.astro` → **no matches**.

- [ ] **Step 4: Commit**

```bash
git add src/components/Footer.astro
git commit -m "fix(footer): remove dead newsletter input, add WhatsApp community CTA"
```

---

### Task 10: `src/components/Hero.astro` — drop secondary arrow, add credibility line

**Files:**
- Modify: `src/components/Hero.astro:26-28` (drop arrow), `:29-30` (add credibility line), `:78-83` (add `.hero-credibility` CSS).

- [ ] **Step 1: Remove the arrow from the secondary CTA (keep the primary arrow)**

Replace lines 26-28:

```html
        <a href={localePath(locale, '/recursos/')} class="btn btn-secondary">
          {t(locale, 'hero.cta-secondary')} &rarr;
        </a>
```

with:

```html
        <a href={localePath(locale, '/recursos/')} class="btn btn-secondary">
          {t(locale, 'hero.cta-secondary')}
        </a>
```

- [ ] **Step 2: Add the credibility line beneath the actions**

Replace lines 22-30 (the `.hero-actions` block) — specifically, add the `<p>` right after the closing `</div>` of `.hero-actions`. The block becomes:

```html
      <div class="hero-actions">
        <a href={localePath(locale, '/involucrate/')} class="btn btn-primary">
          {t(locale, 'hero.cta-primary')} &rarr;
        </a>
        <a href={localePath(locale, '/recursos/')} class="btn btn-secondary">
          {t(locale, 'hero.cta-secondary')}
        </a>
      </div>
      <p class="hero-credibility">{t(locale, 'hero.credibility')}</p>
```

- [ ] **Step 3: Add `.hero-credibility` styling**

Immediately after the `.hero-actions { ... }` rule (ends line 83), add:

```css
  .hero-credibility {
    margin-top: 1.25rem;
    font-size: 0.8125rem;
    color: var(--text-secondary);
  }
```

- [ ] **Step 4: Verify build + check**

Run: `npm run build` → clean, **16 page(s)**.
Run: `npm run check` → **0 errors**.

- [ ] **Step 5: Commit**

```bash
git add src/components/Hero.astro
git commit -m "feat(home): add hero credibility line, drop secondary-button arrow"
```

---

### Task 11: Homepage — pipeline dots, MetricsBar from data, Join community card

**Files:**
- Create: `src/data/metrics.json`
- Modify: `src/pages/index.astro` and `src/pages/en/index.astro` (frontmatter metrics, pipeline `1-4`→dots, Join section, related CSS)

- [ ] **Step 1: Create the metrics data file**

`src/data/metrics.json`:

```json
[
  { "value": "30+", "labelKey": "metrics.members" },
  { "value": "1", "labelKey": "metrics.hackathon" },
  { "value": "3", "labelKey": "metrics.partnerships" }
]
```

- [ ] **Step 2: `src/pages/index.astro` — read metrics from data**

Replace frontmatter lines 9-14:

```js
const locale = 'es';
const metrics = [
  { value: '30+', label: 'Miembros' },
  { value: '1', label: 'Hackathon' },
  { value: '3', label: 'Alianzas' },
];
```

with:

```js
import metricsData from '../data/metrics.json';

const locale = 'es';
const metrics = metricsData.map((m) => ({
  value: m.value,
  label: t(locale, m.labelKey as Parameters<typeof t>[1]),
}));
```

- [ ] **Step 3: `src/pages/index.astro` — pipeline numerals → accent dots**

Replace the four pipeline steps (lines 27-45) so each `<span class="pipeline-num">N</span>` becomes a dot:

```html
      <div class="pipeline">
        <div class="pipeline-step">
          <span class="pipeline-dot" aria-hidden="true"></span>
          <span class="pipeline-label">{t(locale, 'programs.curious')}</span>
        </div>
        <div class="pipeline-arrow"></div>
        <div class="pipeline-step">
          <span class="pipeline-dot" aria-hidden="true"></span>
          <span class="pipeline-label">{t(locale, 'programs.learning')}</span>
        </div>
        <div class="pipeline-arrow"></div>
        <div class="pipeline-step">
          <span class="pipeline-dot" aria-hidden="true"></span>
          <span class="pipeline-label">{t(locale, 'programs.participating')}</span>
        </div>
        <div class="pipeline-arrow"></div>
        <div class="pipeline-step">
          <span class="pipeline-dot" aria-hidden="true"></span>
          <span class="pipeline-label">{t(locale, 'programs.contributing')}</span>
        </div>
      </div>
```

- [ ] **Step 4: `src/pages/index.astro` — Join becomes a community card**

Replace the Join section (lines 52-64):

```html
  <section class="section join-section">
    <div class="container">
      <h2 class="section-title">{t(locale, 'sections.join')}</h2>
      <div class="join-links">
        <a href="https://chat.whatsapp.com/KwE8cciX48TAVhAOHnrLaZ" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">
          {t(locale, 'join.whatsapp')} &rarr;
        </a>
        <a href="#newsletter" class="btn btn-primary">
          {t(locale, 'join.newsletter')} &rarr;
        </a>
      </div>
    </div>
  </section>
```

with:

```html
  <section class="section join-section" aria-labelledby="join-title">
    <div class="container">
      <div class="join-card">
        <div class="join-text">
          <h2 class="section-title" id="join-title">{t(locale, 'sections.join')}</h2>
          <p class="join-sub">{t(locale, 'join.subtitle')}</p>
        </div>
        <div class="join-links">
          <a href="https://chat.whatsapp.com/KwE8cciX48TAVhAOHnrLaZ" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
            {t(locale, 'join.whatsapp')}
          </a>
          <a href="https://www.linkedin.com/company/ai-safety-colombia" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">
            LinkedIn
          </a>
          <a href="https://www.instagram.com/aisafetycolombia/" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">
            Instagram
          </a>
        </div>
      </div>
    </div>
  </section>
```

- [ ] **Step 5: `src/pages/index.astro` — pipeline + Join CSS**

Replace the `.pipeline-num { ... }` rule (lines 91-101) and its color rules (lines 103-106):

```css
  .pipeline-num {
    width: 1.375rem;
    height: 1.375rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    color: #FFFFFF;
    font-size: 0.75rem;
    font-weight: 700;
  }

  .pipeline-step:nth-of-type(1) .pipeline-num { background: var(--accent-blue); }
  .pipeline-step:nth-of-type(3) .pipeline-num { background: var(--accent-green); color: #101010; }
  .pipeline-step:nth-of-type(5) .pipeline-num { background: var(--accent-yellow-line); color: #101010; }
  .pipeline-step:nth-of-type(7) .pipeline-num { background: var(--accent-coral); }
```

with:

```css
  .pipeline-dot {
    width: 0.625rem;
    height: 0.625rem;
    border-radius: 50%;
    flex: none;
  }

  .pipeline-step:nth-of-type(1) .pipeline-dot { background: var(--accent-blue); }
  .pipeline-step:nth-of-type(3) .pipeline-dot { background: var(--accent-green); }
  .pipeline-step:nth-of-type(5) .pipeline-dot { background: var(--accent-yellow-line); }
  .pipeline-step:nth-of-type(7) .pipeline-dot { background: var(--accent-coral); }
```

Then replace the `.join-section` + `.join-links` rules (lines 137-147):

```css
  .join-section {
    text-align: center;
  }

  .join-links {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
    margin-top: 1.5rem;
  }
```

with:

```css
  .join-card {
    background: linear-gradient(100deg, #eafff2, #e7f6ff);
    border: 1px solid #d5efe0;
    border-radius: 18px;
    padding: 2.25rem 2.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
    flex-wrap: wrap;
  }

  .join-card .section-title {
    margin-bottom: 0.375rem;
  }

  .join-sub {
    color: var(--text-secondary);
    font-size: 0.9375rem;
  }

  .join-links {
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
  }
```

- [ ] **Step 6: Apply Steps 2–5 to `src/pages/en/index.astro`**

Identical edits, with the EN import path and identical JSX (labels come from `t()`):

- Frontmatter lines 9-14 `const locale = 'en'; const metrics = [ {value:'30+',label:'Members'}, {value:'1',label:'Hackathon'}, {value:'3',label:'Partnerships'} ];` → replace with:

```js
import metricsData from '../../data/metrics.json';

const locale = 'en';
const metrics = metricsData.map((m) => ({
  value: m.value,
  label: t(locale, m.labelKey as Parameters<typeof t>[1]),
}));
```

- Pipeline steps (lines 27-45): same dot markup as Step 3 (identical — uses `t()`).
- Join section (lines 52-64): same markup as Step 4 (identical — uses `t()` + literal `LinkedIn`/`Instagram`).
- CSS (lines 91-106, 137-147): same replacements as Step 5.

- [ ] **Step 7: Verify build, check, both homepages render English/Spanish labels**

Run: `npm run build` → clean, **16 page(s)**.
Run: `npm run check` → **0 errors** (this also resolves the expected `join.newsletter` error from Task 1 Step 5, since the last two usages are now gone).
Run: `rg -n "pipeline-num|#newsletter|join\\.newsletter" src/pages/index.astro src/pages/en/index.astro` → **no matches**.
Inspect `dist/index.html` for `Miembros` and `dist/en/index.html` for `Members` (label now localized).

- [ ] **Step 8: Commit**

```bash
git add src/data/metrics.json src/pages/index.astro src/pages/en/index.astro
git commit -m "feat(home): pipeline dots, MetricsBar from data, Join community card"
```

---

### Task 12: About — PageHero + memorial card + team list

**Files:**
- Modify: `src/pages/sobre.astro` and `src/pages/en/about.astro` (full body rewrite of hero + Team section, drop local hero CSS)

- [ ] **Step 1: Rewrite `src/pages/sobre.astro`**

Full file:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import PageHero from '../components/PageHero.astro';
import { t } from '../i18n/ui';

const locale = 'es';
---

<BaseLayout locale={locale} currentPage="about" title="Sobre nosotros | AI Safety Colombia">
  <PageHero
    title="Sobre nosotros"
    desc="Somos un grupo de investigadores, ingenieros y profesionales comprometidos con construir un futuro seguro con inteligencia artificial en Colombia y America Latina."
  />

  <section class="section">
    <div class="container">
      <h2 class="section-title">Mision</h2>
      <p class="text-block">Reducir los riesgos existenciales y catastroficos de la inteligencia artificial, formando talento local, produciendo investigacion relevante y conectando a Colombia con la comunidad global de AI Safety.</p>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <h2 class="section-title">Teoria de cambio</h2>
      <div class="editorial">
        <div class="editorial-row is-green">
          <div class="editorial-bar"></div>
          <div class="editorial-tx">
            <h3>Talento</h3>
            <p>Formamos investigadores y profesionales que puedan contribuir directamente a la seguridad de IA.</p>
          </div>
        </div>
        <div class="editorial-row is-coral">
          <div class="editorial-bar"></div>
          <div class="editorial-tx">
            <h3>Investigacion</h3>
            <p>Producimos trabajo tecnico y de gobernanza adaptado al contexto latinoamericano.</p>
          </div>
        </div>
        <div class="editorial-row is-blue">
          <div class="editorial-bar"></div>
          <div class="editorial-tx">
            <h3>Comunidad</h3>
            <p>Construimos una red de personas informadas que puedan influir en decisiones clave sobre IA.</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="section" aria-labelledby="team-title">
    <div class="container">
      <h2 class="section-title" id="team-title">Equipo</h2>
      <div class="memoriam-card">
        <p class="memoriam-kicker">{t(locale, 'about.memoriam.kicker')}</p>
        <h3 class="memoriam-name">{t(locale, 'about.memoriam.name')}</h3>
        <p class="memoriam-role">{t(locale, 'about.memoriam.role')} · {t(locale, 'about.memoriam.affiliation')}</p>
        <p class="memoriam-tribute">{t(locale, 'about.memoriam.tribute')}</p>
      </div>
      <div class="team-list">
        <div class="team-member">
          <h3 class="team-name">{t(locale, 'about.team.name')}</h3>
          <p class="team-role">{t(locale, 'about.team.role')} · {t(locale, 'about.team.affiliation')}</p>
        </div>
      </div>
    </div>
  </section>
</BaseLayout>

<style>
  .text-block {
    color: var(--text-secondary);
    font-size: 1rem;
    max-width: 700px;
    line-height: 1.7;
  }

  .memoriam-card {
    background: linear-gradient(140deg, #F1F8F2, #FFF8E7);
    border: 1px solid var(--border);
    border-radius: 18px;
    padding: 2rem 2.25rem;
    max-width: 640px;
  }

  .memoriam-kicker {
    font-size: 0.6875rem;
    font-weight: 800;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--green-text);
  }

  .memoriam-name {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--text-primary);
    margin-top: 0.5rem;
  }

  .memoriam-role {
    font-size: 0.875rem;
    color: var(--text-secondary);
    margin-top: 0.25rem;
  }

  .memoriam-tribute {
    font-size: 0.9375rem;
    color: var(--text-primary);
    line-height: 1.65;
    margin-top: 1rem;
  }

  .team-list {
    margin-top: 2rem;
  }

  .team-name {
    font-size: 1.125rem;
    font-weight: 600;
    color: var(--text-primary);
  }

  .team-role {
    font-size: 0.875rem;
    color: var(--text-secondary);
    margin-top: 0.25rem;
  }
</style>
```

- [ ] **Step 2: Rewrite `src/pages/en/about.astro`**

Full file (EN import paths `../../`, English literals, same i18n keys for memorial/team):

```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import PageHero from '../../components/PageHero.astro';
import { t } from '../../i18n/ui';

const locale = 'en';
---

<BaseLayout locale={locale} currentPage="about" title="About | AI Safety Colombia">
  <PageHero
    title="About Us"
    desc="We are a group of researchers, engineers, and professionals committed to building a safe future with artificial intelligence in Colombia and Latin America."
  />

  <section class="section">
    <div class="container">
      <h2 class="section-title">Mission</h2>
      <p class="text-block">Reduce existential and catastrophic risks from artificial intelligence by developing local talent, producing relevant research, and connecting Colombia with the global AI Safety community.</p>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <h2 class="section-title">Theory of Change</h2>
      <div class="editorial">
        <div class="editorial-row is-green">
          <div class="editorial-bar"></div>
          <div class="editorial-tx">
            <h3>Talent</h3>
            <p>We train researchers and professionals who can directly contribute to AI safety.</p>
          </div>
        </div>
        <div class="editorial-row is-coral">
          <div class="editorial-bar"></div>
          <div class="editorial-tx">
            <h3>Research</h3>
            <p>We produce technical and governance work adapted to the Latin American context.</p>
          </div>
        </div>
        <div class="editorial-row is-blue">
          <div class="editorial-bar"></div>
          <div class="editorial-tx">
            <h3>Community</h3>
            <p>We build a network of informed people who can influence key decisions about AI.</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="section" aria-labelledby="team-title">
    <div class="container">
      <h2 class="section-title" id="team-title">Team</h2>
      <div class="memoriam-card">
        <p class="memoriam-kicker">{t(locale, 'about.memoriam.kicker')}</p>
        <h3 class="memoriam-name">{t(locale, 'about.memoriam.name')}</h3>
        <p class="memoriam-role">{t(locale, 'about.memoriam.role')} · {t(locale, 'about.memoriam.affiliation')}</p>
        <p class="memoriam-tribute">{t(locale, 'about.memoriam.tribute')}</p>
      </div>
      <div class="team-list">
        <div class="team-member">
          <h3 class="team-name">{t(locale, 'about.team.name')}</h3>
          <p class="team-role">{t(locale, 'about.team.role')} · {t(locale, 'about.team.affiliation')}</p>
        </div>
      </div>
    </div>
  </section>
</BaseLayout>

<style>
  .text-block {
    color: var(--text-secondary);
    font-size: 1rem;
    max-width: 700px;
    line-height: 1.7;
  }

  .memoriam-card {
    background: linear-gradient(140deg, #F1F8F2, #FFF8E7);
    border: 1px solid var(--border);
    border-radius: 18px;
    padding: 2rem 2.25rem;
    max-width: 640px;
  }

  .memoriam-kicker {
    font-size: 0.6875rem;
    font-weight: 800;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--green-text);
  }

  .memoriam-name {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--text-primary);
    margin-top: 0.5rem;
  }

  .memoriam-role {
    font-size: 0.875rem;
    color: var(--text-secondary);
    margin-top: 0.25rem;
  }

  .memoriam-tribute {
    font-size: 0.9375rem;
    color: var(--text-primary);
    line-height: 1.65;
    margin-top: 1rem;
  }

  .team-list {
    margin-top: 2rem;
  }

  .team-name {
    font-size: 1.125rem;
    font-weight: 600;
    color: var(--text-primary);
  }

  .team-role {
    font-size: 0.875rem;
    color: var(--text-secondary);
    margin-top: 0.25rem;
  }
</style>
```

- [ ] **Step 3: Verify build, check, verbatim tribute**

Run: `npm run build` → clean, **16 page(s)**.
Run: `npm run check` → **0 errors**.
Run: `rg -n "Su memoria sigue presente en lo que hacemos" dist/sobre/index.html` and `rg -n "His memory remains present in everything we do" dist/en/about/index.html` → **both match exactly** (verbatim locked tribute rendered).
Run: `rg -n "hero-mini|equipo fundador|founding team" src/pages/sobre.astro src/pages/en/about.astro` → **no matches** (placeholder copy + local hero removed).

- [ ] **Step 4: Commit**

```bash
git add src/pages/sobre.astro src/pages/en/about.astro
git commit -m "feat(about): PageHero, En memoria tribute card, real team entry"
```

---

### Task 13: Programs — PageHero + de-number

**Files:**
- Modify: `src/pages/programas.astro` and `src/pages/en/programs.astro`

- [ ] **Step 1: `src/pages/programas.astro` — import PageHero, swap hero, drop numeral**

Replace frontmatter line 2 `import BaseLayout from '../layouts/BaseLayout.astro';` with:

```js
import BaseLayout from '../layouts/BaseLayout.astro';
import PageHero from '../components/PageHero.astro';
```

Replace the hero section (lines 31-36):

```html
  <section class="hero-mini">
    <div class="container">
      <h1 class="section-title">Programas</h1>
      <p class="page-desc">Nuestra pipeline de desarrollo te lleva desde la curiosidad inicial hasta contribuciones significativas al campo de la seguridad de IA.</p>
    </div>
  </section>
```

with:

```html
  <PageHero
    title="Programas"
    desc="Nuestra pipeline de desarrollo te lleva desde la curiosidad inicial hasta contribuciones significativas al campo de la seguridad de IA."
  />
```

Delete the numeral div (line 43):

```html
            <div class="editorial-num">{`0${i + 1}`}</div>
```

Remove the now-unused local hero CSS (lines 60-71, the `.hero-mini` and `.page-desc` rules); keep `.program-desc`/`.program-items` rules.

- [ ] **Step 2: `src/pages/en/programs.astro` — same edits, EN paths/literals**

Frontmatter line 2 → add `import PageHero from '../../components/PageHero.astro';`.
Hero (lines 31-36) → `<PageHero title="Programs" desc="Our development pipeline takes you from initial curiosity to meaningful contributions to the AI safety field." />`.
Delete line 43 numeral div.
Remove local `.hero-mini`/`.page-desc` CSS (lines 60-71); keep `.program-*`.

- [ ] **Step 3: Verify**

Run: `npm run build` → clean, **16 page(s)**.
Run: `npm run check` → **0 errors**.
Run: `rg -n "editorial-num|hero-mini" src/pages/programas.astro src/pages/en/programs.astro` → **no matches**.

- [ ] **Step 4: Commit**

```bash
git add src/pages/programas.astro src/pages/en/programs.astro
git commit -m "feat(programs): adopt PageHero, de-number stage rows"
```

---

### Task 14: Resources — PageHero + de-number + "coming soon" non-links

**Files:**
- Modify: `src/pages/recursos.astro` and `src/pages/en/resources.astro`

- [ ] **Step 1: `src/pages/recursos.astro` — imports + hero + de-number + soon-rendering**

Replace frontmatter line 2:

```js
import BaseLayout from '../layouts/BaseLayout.astro';
```

with:

```js
import BaseLayout from '../layouts/BaseLayout.astro';
import PageHero from '../components/PageHero.astro';
import { t } from '../i18n/ui';
```

Replace the hero section (lines 35-40):

```html
  <section class="hero-mini">
    <div class="container">
      <h1 class="section-title">Recursos</h1>
      <p class="page-desc">Rutas de aprendizaje curadas para explorar la seguridad de IA desde distintos angulos.</p>
    </div>
  </section>
```

with:

```html
  <PageHero
    title="Recursos"
    desc="Rutas de aprendizaje curadas para explorar la seguridad de IA desde distintos angulos."
  />
```

Replace the editorial row body (lines 45-60):

```jsx
        {paths.map((path, i) => (
          <div class={`editorial-row ${['is-green','is-coral','is-blue'][i]}`}>
            <div class="editorial-num">{`0${i + 1}`}</div>
            <div class="editorial-bar"></div>
            <div class="editorial-tx path-tx">
              <h3>{path.title}</h3>
              <ul>
                {path.items.map(item => (
                  <li>
                    <a href={item.url} target="_blank" rel="noopener noreferrer">{item.name}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
```

with:

```jsx
        {paths.map((path, i) => (
          <div class={`editorial-row ${['is-green','is-coral','is-blue'][i]}`}>
            <div class="editorial-bar"></div>
            <div class="editorial-tx path-tx">
              <h3>{path.title}</h3>
              <ul>
                {path.items.map(item => (
                  <li>
                    {item.url === '#' ? (
                      <span class="path-soon">
                        {item.name}
                        <span class="soon-tag">{t(locale, 'resources.comingSoon')}</span>
                      </span>
                    ) : (
                      <a href={item.url} target="_blank" rel="noopener noreferrer">{item.name}</a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
```

Remove the local hero CSS (lines 67-78, `.hero-mini` + `.page-desc`). Then add, after the `.path-tx li a:hover { ... }` rule, the soon styles:

```css
  .path-tx .path-soon {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--text-secondary);
    font-size: 0.9375rem;
  }

  .path-tx .soon-tag {
    font-size: 0.625rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--accent-yellow-line);
    border: 1px solid var(--border);
    border-radius: 999px;
    padding: 0.125rem 0.5rem;
  }
```

- [ ] **Step 2: `src/pages/en/resources.astro` — same edits, EN paths/literals**

Frontmatter line 2 → add `import PageHero from '../../components/PageHero.astro';` and `import { t } from '../../i18n/ui';`.
Hero (lines 35-40) → `<PageHero title="Resources" desc="Curated learning paths to explore AI safety from different angles." />`.
Editorial body (lines 45-60): same `item.url === '#'` conditional as Step 1 (identical JSX — `t()` localizes the tag).
Remove local `.hero-mini`/`.page-desc` CSS (lines 67-78); add the same `.path-soon`/`.soon-tag` rules.

- [ ] **Step 3: Verify no dead `#` links remain, build/check pass**

Run: `npm run build` → clean, **16 page(s)**.
Run: `npm run check` → **0 errors**.
Run: `rg -n "editorial-num|hero-mini" src/pages/recursos.astro src/pages/en/resources.astro` → **no matches**.
Run: `rg -n 'href="#"' dist/recursos/index.html dist/en/resources/index.html` → **no matches** (dead links now render as `Próximamente`/`Coming soon` spans).

- [ ] **Step 4: Commit**

```bash
git add src/pages/recursos.astro src/pages/en/resources.astro
git commit -m "feat(resources): PageHero, de-number, honest coming-soon non-links"
```

---

### Task 15: Get Involved — PageHero + de-number + drop CTA arrows

**Files:**
- Modify: `src/pages/involucrate.astro` and `src/pages/en/get-involved.astro`

- [ ] **Step 1: `src/pages/involucrate.astro`**

Frontmatter line 2 → add `import PageHero from '../components/PageHero.astro';`.

Replace the hero section (lines 31-36):

```html
  <section class="hero-mini">
    <div class="container">
      <h1 class="section-title">Involucrate</h1>
      <p class="page-desc">Hay multiples formas de contribuir a la seguridad de IA en Colombia, sin importar tu perfil o experiencia.</p>
    </div>
  </section>
```

with:

```html
  <PageHero
    title="Involucrate"
    desc="Hay multiples formas de contribuir a la seguridad de IA en Colombia, sin importar tu perfil o experiencia."
  />
```

Delete the numeral div (line 43):

```html
            <div class="editorial-num">{`0${i + 1}`}</div>
```

Drop both CTA arrows (lines 62-63):

```html
        <a href="https://chat.whatsapp.com/KwE8cciX48TAVhAOHnrLaZ" target="_blank" rel="noopener noreferrer" class="btn btn-primary">Unete al WhatsApp &rarr;</a>
        <a href="/contacto/" class="btn btn-secondary">Contactanos &rarr;</a>
```

with:

```html
        <a href="https://chat.whatsapp.com/KwE8cciX48TAVhAOHnrLaZ" target="_blank" rel="noopener noreferrer" class="btn btn-primary">Unete al WhatsApp</a>
        <a href="/contacto/" class="btn btn-secondary">Contactanos</a>
```

Remove the local hero CSS (lines 70-81, `.hero-mini` + `.page-desc`); keep `.aud-desc`/`.audience-tx`/`.cta-section`/`.cta-buttons`.

- [ ] **Step 2: `src/pages/en/get-involved.astro` — same edits, EN paths/literals**

Frontmatter line 2 → add `import PageHero from '../../components/PageHero.astro';`.
Hero (lines 31-36) → `<PageHero title="Get Involved" desc="There are multiple ways to contribute to AI safety in Colombia, regardless of your background or experience." />`.
Delete line 43 numeral div.
CTA (lines 62-63) → drop ` &rarr;` from both: `...class="btn btn-primary">Join WhatsApp</a>` and `<a href="/en/contact/" class="btn btn-secondary">Contact Us</a>`.
Remove local `.hero-mini`/`.page-desc` CSS (lines 70-81).

- [ ] **Step 3: Verify**

Run: `npm run build` → clean, **16 page(s)**.
Run: `npm run check` → **0 errors**.
Run: `rg -n "editorial-num|hero-mini|&rarr;" src/pages/involucrate.astro src/pages/en/get-involved.astro` → **no matches**.

- [ ] **Step 4: Commit**

```bash
git add src/pages/involucrate.astro src/pages/en/get-involved.astro
git commit -m "feat(get-involved): PageHero, de-number, drop CTA arrows per arrow rule"
```

---

### Task 16: Contact — PageHero + drop Twitter/X + mailto form

**Files:**
- Modify: `src/pages/contacto.astro` and `src/pages/en/contact.astro`

- [ ] **Step 1: `src/pages/contacto.astro` — imports + hero**

Frontmatter line 2 → add `import PageHero from '../components/PageHero.astro';`.

Replace the hero section (lines 8-13):

```html
  <section class="hero-mini">
    <div class="container">
      <h1 class="section-title">Contacto</h1>
      <p class="page-desc">Escribenos para preguntas, alianzas o simplemente para conectar.</p>
    </div>
  </section>
```

with:

```html
  <PageHero
    title="Contacto"
    desc="Escribenos para preguntas, alianzas o simplemente para conectar."
  />
```

- [ ] **Step 2: `src/pages/contacto.astro` — drop the Twitter/X channel**

Delete lines 37-40:

```html
            <a href="https://twitter.com/AISafetyCO" target="_blank" rel="noopener noreferrer" class="channel-item">
              <span class="channel-icon">&#x1D54F;</span>
              <span>@AISafetyCO</span>
            </a>
```

(Instagram + LinkedIn remain; this matches the canonical Instagram + WhatsApp + LinkedIn set.)

- [ ] **Step 3: `src/pages/contacto.astro` — mailto form + script, drop submit arrow**

Replace the form (lines 50-64):

```html
          <form action="https://tally.so/r/placeholder" method="POST">
            <div class="form-group">
              <label for="name">Nombre</label>
              <input type="text" id="name" name="name" required>
            </div>
            <div class="form-group">
              <label for="email">Email</label>
              <input type="email" id="email" name="email" required>
            </div>
            <div class="form-group">
              <label for="message">Mensaje</label>
              <textarea id="message" name="message" rows="5" required></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Enviar &rarr;</button>
          </form>
```

with:

```html
          <form id="contact-form" novalidate>
            <div class="form-group">
              <label for="name">Nombre</label>
              <input type="text" id="name" name="name" required>
            </div>
            <div class="form-group">
              <label for="email">Email</label>
              <input type="email" id="email" name="email" required>
            </div>
            <div class="form-group">
              <label for="message">Mensaje</label>
              <textarea id="message" name="message" rows="5" required></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Enviar</button>
          </form>
```

At the very end of the file (after the closing `</style>`), append:

```html
<script>
  import { buildMailto } from '../utils/contactMailto.js';
  const form = document.getElementById('contact-form');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const fd = new FormData(form as HTMLFormElement);
    const locale = document.documentElement.lang === 'en' ? 'en' : 'es';
    window.location.href = buildMailto({
      to: 'aisafetycolombia@gmail.com',
      name: String(fd.get('name') || ''),
      email: String(fd.get('email') || ''),
      message: String(fd.get('message') || ''),
      locale,
    });
  });
</script>
```

Remove the local hero CSS (lines 72-83, `.hero-mini` + `.page-desc`); keep `.contact-grid` and the rest.

- [ ] **Step 4: `src/pages/en/contact.astro` — same edits, EN paths/literals**

Frontmatter line 2 → add `import PageHero from '../../components/PageHero.astro';`.
Hero (lines 8-13) → `<PageHero title="Contact" desc="Reach out for questions, partnerships, or just to connect." />`.
Delete the Twitter/X channel (lines 37-40, same markup).
Replace the form (lines 50-64) the same way, with English labels (`Name`/`Email`/`Message`) and `<button type="submit" class="btn btn-primary">Send</button>`.
Append the same `<script>` but with import path `../../utils/contactMailto.js`.
Remove local `.hero-mini`/`.page-desc` CSS (lines 72-83).

- [ ] **Step 5: Verify form wiring, no Twitter, build/check/tests**

Run: `npm run build` → clean, **16 page(s)**.
Run: `npm run check` → **0 errors**.
Run: `node --test test/contactMailto.test.js` → **2/2** (util unchanged; confirms the consumed contract).
Run: `rg -n "twitter|tally.so|hero-mini|Enviar &rarr;|Send &rarr;" src/pages/contacto.astro src/pages/en/contact.astro` → **no matches**.

- [ ] **Step 6: Commit**

```bash
git add src/pages/contacto.astro src/pages/en/contact.astro
git commit -m "feat(contact): PageHero, drop Twitter/X, mailto-fallback form"
```

---

### Task 17: EventsPage PageHero + section labels; EventCard arrow

**Files:**
- Modify: `src/components/EventsPage.astro:27-32` (hero → PageHero), `:34-43` & `:45-73` (`aria-labelledby`), drop local hero CSS; `src/components/EventCard.astro:69-71` (drop arrow)

- [ ] **Step 1: `EventsPage.astro` — import + PageHero**

Replace frontmatter line 4 `import EventCard from './EventCard.astro';` with:

```js
import EventCard from './EventCard.astro';
import PageHero from './PageHero.astro';
```

Replace the hero section (lines 27-32):

```html
<section class="hero-mini">
  <div class="container">
    <h1 class="section-title">{t(locale, 'events.hero.title')}</h1>
    <p class="page-desc">{t(locale, 'events.hero.subtitle')}</p>
  </div>
</section>
```

with:

```html
<PageHero title={t(locale, 'events.hero.title')} desc={t(locale, 'events.hero.subtitle')} />
```

- [ ] **Step 2: `EventsPage.astro` — label the two list sections**

Replace the upcoming section open (lines 34-37):

```jsx
{upcoming.length > 0 && (
  <section class="section">
    <div class="container">
      <h2 class="section-label">{t(locale, 'events.upcoming')}</h2>
```

with:

```jsx
{upcoming.length > 0 && (
  <section class="section" aria-labelledby="events-upcoming">
    <div class="container">
      <h2 class="section-label" id="events-upcoming">{t(locale, 'events.upcoming')}</h2>
```

Replace the past section open (lines 45-49):

```jsx
<section class="section">
  <div class="container">
    {hasAny ? (
      <>
        <h2 class="section-label">{t(locale, 'events.past')}</h2>
```

with:

```jsx
<section class="section" aria-labelledby="events-past">
  <div class="container">
    {hasAny ? (
      <>
        <h2 class="section-label" id="events-past">{t(locale, 'events.past')}</h2>
```

- [ ] **Step 3: `EventsPage.astro` — drop the now-unused local hero CSS**

Delete lines 76-87 (the `.hero-mini` and `.page-desc` rules). Keep `.section-label` and everything below.

- [ ] **Step 4: `EventCard.astro` — drop the in-card Instagram-link arrow**

Replace lines 69-71:

```jsx
    <a class="event-link" href={event.instagramUrl} target="_blank" rel="noopener noreferrer">
      {t(locale, 'events.viewInstagram')} &rarr;
    </a>
```

with:

```jsx
    <a class="event-link" href={event.instagramUrl} target="_blank" rel="noopener noreferrer">
      {t(locale, 'events.viewInstagram')}
    </a>
```

- [ ] **Step 5: Verify build, check, events test, JSON-LD intact**

Run: `npm run build` → clean, **16 page(s)**.
Run: `npm run check` → **0 errors**.
Run: `node --test test/events.test.js` → **4/4**.
Run: `rg -n "hero-mini|&rarr;" src/components/EventsPage.astro src/components/EventCard.astro` → **no matches**.

- [ ] **Step 6: Commit**

```bash
git add src/components/EventsPage.astro src/components/EventCard.astro
git commit -m "feat(events): adopt PageHero, label sections, drop in-card link arrow"
```

---

### Task 18: Full-site verification + memory/vault

**Files:** none modified (verification + records)

- [ ] **Step 1: Build, check, all tests**

Run: `npm run build` → Expected: clean, **exactly 16 page(s)**, no new/removed routes.
Run: `npm run check` → Expected: **0 errors**.
Run: `node --test test/events.test.js` → **4/4**.
Run: `node --test test/contactMailto.test.js` → **2/2**.
Run: `node --test test/hackathon.test.js` → **3/3**.

- [ ] **Step 2: De-numbering grep gate**

Run: `rg -n "editorial-num|pipeline-num" src/` → Expected: **no matches anywhere**.

- [ ] **Step 3: Dead-link / social / em-dash / currency gate**

Run: `rg -n 'href="#"|#newsletter|tally\.so|twitter\.com|@AISafetyCO|join\.newsletter' src/` → **no matches**.
Run: `rg -n "—" src/data/hackathon.json src/i18n/ui.ts` → **no matches** (no literal em dash in data/strings; en-dash numeric ranges like `19–21` in `hackathon.hook` are intentional date ranges, not prose em dashes, and are out of scope per spec 2.5).
Run: `rg -n "newsletter" src/components/Footer.astro` → **no matches**.
Run: `rg -n 'chat\.whatsapp\.com/KwE8cciX48TAVhAOHnrLaZ' src/` → every WhatsApp link is the real invite; confirm no bare `https://chat.whatsapp.com/"` remains: `rg -n 'chat\.whatsapp\.com/"' src/` → **no matches**.

- [ ] **Step 4: Structured data still valid**

Run: `npm run build`, then inspect `dist/eventos/index.html` and `dist/hackathon/index.html` `<head>`: each still contains its `application/ld+json` block (EventJsonLd / HackathonJsonLd untouched). Paste each JSON-LD payload into a JSON parser → parses with no error.

- [ ] **Step 5: Playwright responsive sweep**

For each changed route — `/`, `/en/`, `/sobre/`, `/en/about/`, `/programas/`, `/en/programs/`, `/recursos/`, `/en/resources/`, `/involucrate/`, `/en/get-involved/`, `/contacto/`, `/en/contact/`, `/hackathon/`, `/en/hackathon/`, `/eventos/`, `/en/events/` — at 390 / 820 / 1280 px, verify via the Playwright MCP tools: no horizontal overflow, no broken images, the `:focus-visible` ring appears on `Tab`, the `<header>`/`<main>`/`<footer>` landmarks are present, the 5 hackathon track cards + 4 judge pills render, the About memorial card shows the verbatim tribute, and the homepage Join card + footer CTA show the canonical social set (no Telegram, no Twitter, no newsletter input).

- [ ] **Step 6: Update memory + vault**

Update `C:\Users\joseg\.claude\projects\C--Users-joseg\memory\project_ais_colombia_redesign.md` and `C:\Users\joseg\Documents\Vault\Projects\AI_Safety_Colombia_Website.md`: record that the whole-site improvement pass (de-numbering, PageHero, CTA-arrow rule, 5 tracks + 4 named judges, About memorial, mailto contact form, Join/Footer community CTAs, metrics-from-data) was implemented; the **verbatim Fernando tribute text must not be altered without Jose**; deviations D1–D5 (below) as applied. Then update `MEMORY.md` index line if the hook text changed.

- [ ] **Step 7: Finish the branch**

Use **superpowers:finishing-a-development-branch** to present completion options to Jose (do not push/merge until Jose explicitly chooses).

---

## Deviations from the spec (surface to Jose before/at execution)

- **D1 — No `.editorial-kicker` on WhatWeDo / About Theory-of-Change.** Spec Cluster 1 asks for an uppercase kicker eyebrow on these two sections "reusing existing category words." But those rows' `<h3>` text *is* the category word (`Investigacion`/`Educacion`/`Comunidad`, `Talento`/`Investigacion`/`Comunidad`); a kicker would stack the same word twice. No new copy is allowed in this pass. The plan removes the numeral only — the colored bar + bold heading is exactly the marker the spec itself uses on Programs/Get-Involved/Resources. Net effect fully satisfies Jose's durable "no numbering" preference. (No unused `.editorial-kicker` CSS is added — YAGNI.)
- **D2 — PageHero has no `kicker` prop.** Spec 2.1 lists an optional `kicker`. Given D1, nothing would ever pass it; omitted per YAGNI. Trivial to add later.
- **D3 — Memorial eyebrow uses a local `.memoriam-kicker` class** (in About's scoped `<style>`), not a shared global class, since it is the only consumer.
- **D4 — About pages now import `t()`.** They were previously literal-only (zero i18n). Spec 3.3 explicitly mandates `about.memoriam.*` / `about.team.*` i18n keys, so `t()` is introduced for those blocks while the rest of the About copy stays literal (unchanged). `recursos.astro` likewise gains `t()` for the single `resources.comingSoon` tag.
- **D5 — Landmark scope.** `<header>` (Navbar + PageHero), `<main>` (BaseLayout, already present), `<footer>` (already present), and `aria-labelledby` on the new Join card + About Team section + the two EventsPage list sections. Blanket per-section `aria-labelledby` across all other pages is deferred (low marginal a11y value, high churn) — spec 2.4 says "where missing"; the core landmarks are the gap.

## Spec inaccuracies corrected in this plan

- Spec references `src/pages/nosotros.astro`; the actual file is **`src/pages/sobre.astro`** (EN `en/about.astro`). Plan uses the real paths.
- Spec 4.2 states the EN homepage "shows Spanish labels (bug)." It does **not** — `src/pages/en/index.astro` already passes English labels inline. `metrics.json` is therefore framed as a **DRY/de-hardcoding** change (single source of truth, i18n-keyed), not a bug fix. Metric values and count are unchanged (`30+` / `1` / `3`), per spec's "structural only."

## Notes carried for memory/vault (durable facts)

The four published judges (Melissa Robles — IDB Lab & Quantil; Catalina Bernal — BIP Colombia; Juan Pablo Liévano — UC Berkeley; Steve Hege — ILAPS, name+affiliation only), the contact `mailto:` fallback to `aisafetycolombia@gmail.com`, the footer/Join WhatsApp community CTA replacing the dead newsletter, the Resources "coming soon" non-link resolution, and the **verbatim approved Fernando tribute text** (ES/EN, must not be altered without Jose) are durable project facts to persist per CLAUDE.md (Task 18 Step 6).
