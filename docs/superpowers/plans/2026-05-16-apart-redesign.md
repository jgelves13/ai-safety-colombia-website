# Apart-Style Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Re-skin aisafetycolombia.org into Apart Research's actual visual language (light canvas, vivid multi-color accents, Instrument Sans, playful-but-serious) while keeping green as the primary brand color and all existing content, pages, and information architecture.

**Architecture:** The site is a static Astro 5.x bilingual site (ES default + `/en/`). Every component and page styles itself through CSS custom properties in `src/styles/global.css :root`. Rewriting those tokens to the light Apart palette cascades the new theme to nearly all bespoke markup automatically. The per-component/per-page tasks then (a) decouple the three intentionally-dark blocks (MetricsBar, Footer, Navbar) from the now-light tokens, (b) restyle the signature components (Hero, HackathonBanner), (c) replace generic `.card`/`.grid-3` grids with editorial treatments per the "no generic cards" principle, and (d) regenerate the og-image in the light theme. There are no automated tests in this codebase; verification per task is `npm run build` success plus Playwright screenshots of affected routes served from `dist/` over local HTTP, checked against explicit visual criteria including WCAG AA contrast.

**Tech Stack:** Astro 5.x (static, `output: 'static'`, `build.format: 'directory'`), CSS custom properties, Instrument Sans (Google Fonts), Playwright MCP for headless screenshots, Python `http.server` for local serving, `sharp` (already in `node_modules`) only if og logo needs reprocessing.

**Spec:** `docs/superpowers/specs/2026-05-16-apart-redesign-design.md`

---

## Environment Constraints (read before starting)

- **Build only in this local Documents copy** (`C:\Users\joseg\Documents\ai-safety-colombia-website`). `npm install` fails on Google Drive — known constraint. We are already in the correct local copy.
- **Python is `py`** on this machine (not `python`/`python3`).
- **Shell:** PowerShell is default; the Bash tool is bash-on-Windows. Git commit messages with parentheses/newlines must use the PowerShell here-string form (see commit steps).
- **Commit after every task. Do NOT push.** Deployment is `master` → Vercel auto-deploy; the user decides when to merge/push (final task is gated on user approval).
- **Playwright cannot open `file://`** — always serve `dist/` over local HTTP first.

## Standard Build-and-Screenshot Verify Recipe

Several tasks reference "**Run the Verify Recipe** for routes R at widths W". That means exactly:

1. Build: `npm run build` — must exit 0 with no errors. (Astro outputs to `dist/` with directory format: `dist/index.html`, `dist/sobre/index.html`, `dist/en/index.html`, etc.)
2. Serve the build in the background: `py -m http.server 8799 --bind 127.0.0.1 -d dist`
3. Load Playwright MCP tools if not loaded: `ToolSearch` query `select:mcp__playwright__browser_navigate,mcp__playwright__browser_resize,mcp__playwright__browser_take_screenshot,mcp__playwright__browser_close`.
4. For each route R and each width W in the task:
   - `mcp__playwright__browser_resize` to width W, height 900. Widths used in this plan: **390** (mobile), **820** (tablet), **1280** (desktop).
   - `mcp__playwright__browser_navigate` to `http://127.0.0.1:8799<R>` (e.g. `/`, `/en/`, `/sobre/`, `/contacto/`).
   - `mcp__playwright__browser_take_screenshot` (full page) and visually check it against the task's "Expected" criteria.
5. Stop the background server when the task's verification is done.

The 14 routes are: `/`, `/sobre/`, `/hackathon/`, `/programas/`, `/recursos/`, `/involucrate/`, `/contacto/`, `/en/`, `/en/about/`, `/en/hackathon/`, `/en/programs/`, `/en/resources/`, `/en/get-involved/`, `/en/contact/`.

## Locked Palette (use these exact values everywhere)

| Token / role | Value |
|---|---|
| Background | `#FFFFFF` |
| Panel / alt band | `#F7F7F5` |
| Ink (text primary) | `#101010` |
| Text muted | `#5B5F5B` |
| Border / hairline | `#E6E6E1` |
| Nav bottom hairline | `#EFEFEA` |
| Green — PRIMARY fill | `#2BD576` (always paired with `#101010` ink text) |
| Green — accessible text/link | `#15803D` |
| Coral accent | `#FF5645` |
| Blue accent | `#00BBFF` |
| Yellow — fill only | `#FFE246` (with `#101010` ink) |
| Yellow — line/numeral | `#F5C400` |
| Dark block bg (MetricsBar/Footer) | `#101010` |
| Dark block muted text | `#9A9A9A` |

**Accessibility rule:** vivid green/yellow are never small text on white. Links and green text use `#15803D`. Color fills always pair with `#101010` ink. Target WCAG 2.1 AA.

---

## File Structure

**Modified:**
- `src/styles/global.css` — rewrite `:root` tokens + base elements/utilities (`.btn*`, `.card`, `.grid-3`, `.section*`, editorial helpers). Single source of the design system.
- `src/layouts/BaseLayout.astro` — swap font `<link>`, add `theme-color` meta.
- `src/components/Navbar.astro` — white bar, hairline, on-white logo, dark pill CTA.
- `src/components/Hero.astro` — light hero, light dot-grid, green accent word.
- `src/components/HackathonBanner.astro` — mint→blue gradient card.
- `src/components/MetricsBar.astro` — explicit dark block (decoupled from light tokens).
- `src/components/Footer.astro` — explicit dark block (decoupled from light tokens).
- `src/pages/index.astro`, `src/pages/en/index.astro` — use `<WhatWeDo>`, restyle Programas journey, remove dead `.card-icon` styles.
- `src/pages/sobre.astro`, `programas.astro`, `recursos.astro`, `involucrate.astro`, `contacto.astro`, `hackathon.astro` and their `/en/` counterparts (`about`, `programs`, `resources`, `get-involved`, `contact`, `hackathon`) — convert `.card`/`.grid-3` to editorial treatments; fix the contact form for light.
- `scripts/og/og-image.html`, `scripts/og/README.md` — light theme template.
- `public/og-image.png` — regenerated (1200×630, light).

**Created:**
- `src/components/WhatWeDo.astro` — Option B editorial numbered rows; replaces the inline "Qué hacemos" card grid.

**Not changed:** `src/i18n/ui.ts` (no copy/string changes — non-goal), `src/data/hackathon.json`, `astro.config.mjs`, `public/logo.png`, `public/logo-white.png`, `public/favicon.svg`.

---

### Task 1: Branch, install, capture baseline

**Files:** none modified (setup only)

- [ ] **Step 1: Create a feature branch off master**

```bash
git -C "C:/Users/joseg/Documents/ai-safety-colombia-website" checkout -b apart-redesign
```

- [ ] **Step 2: Install dependencies (idempotent, local copy only)**

Run in PowerShell:
```
npm --prefix "C:\Users\joseg\Documents\ai-safety-colombia-website" install
```
Expected: completes without error; `node_modules/astro` and `node_modules/sharp` present.

- [ ] **Step 3: Confirm a clean baseline build**

```
npm --prefix "C:\Users\joseg\Documents\ai-safety-colombia-website" run build
```
Expected: exit 0, `dist/` produced with 14 route folders.

- [ ] **Step 4: Capture before screenshots (for visual diffing later)**

Serve and screenshot the homepage at desktop width using the Standard Verify Recipe (route `/`, width 1280). Save the screenshot mentally as the "before" (dark theme) reference. No assertion — this is the baseline.

- [ ] **Step 5: Commit the branch point (no code yet — skip if nothing to commit)**

No file changes yet; nothing to commit. Proceed to Task 2.

---

### Task 2: Rewrite the design tokens and base system (`global.css`)

This is the cascade. After this task the whole site flips to light; later tasks fix the intentionally-dark blocks and editorial treatments.

**Files:**
- Modify: `src/styles/global.css` (full rewrite)

- [ ] **Step 1: Replace the entire contents of `src/styles/global.css`**

```css
:root {
  /* Core surfaces */
  --bg-primary: #FFFFFF;
  --bg-secondary: #F7F7F5;
  --bg-elevated: #F1F1EE;
  /* Brand + accents (Apart-matched) */
  --accent-green: #2BD576;       /* primary fill — pair with ink text */
  --green-text: #15803D;         /* accessible green for text/links */
  --accent-coral: #FF5645;
  --accent-blue: #00BBFF;
  --accent-yellow: #FFE246;      /* fill only — pair with ink text */
  --accent-yellow-line: #F5C400; /* borders / numerals on white */
  --accent-red: #FF5645;         /* legacy alias kept = coral */
  /* Text */
  --text-primary: #101010;
  --text-secondary: #5B5F5B;
  --text-accent: #15803D;        /* link color (AA on white) */
  /* Lines */
  --border: #E6E6E1;
  --hairline: #EFEFEA;
  /* Dark block (MetricsBar / Footer "one dark moment") */
  --dark-bg: #101010;
  --dark-muted: #9A9A9A;
  --dark-line: #262626;
  /* Type */
  --font-heading: 'Instrument Sans', system-ui, sans-serif;
  --font-body: 'Instrument Sans', system-ui, sans-serif;
  --section-padding: 5rem 1.5rem;
  --card-padding: 2rem;
  --max-width: 1200px;
}

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: var(--font-body);
  background: var(--bg-primary);
  color: var(--text-primary);
  font-size: 16px;
  line-height: 1.6;
  font-weight: 400;
  -webkit-font-smoothing: antialiased;
}

a {
  color: var(--text-accent);
  text-decoration: none;
  transition: opacity 0.2s;
}

a:hover {
  opacity: 0.75;
}

img {
  max-width: 100%;
  height: auto;
  display: block;
}

.container {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 1.5rem;
}

.section {
  padding: var(--section-padding);
}

.section.alt {
  background: var(--bg-secondary);
}

.section-title {
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: 600;
  letter-spacing: -0.04em;
  line-height: 1.05;
  margin-bottom: 1rem;
  color: var(--text-primary);
}

.section-subtitle {
  color: var(--text-secondary);
  font-size: 1.125rem;
  max-width: 600px;
}

/* Pill buttons */
.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 999px;
  font-family: var(--font-body);
  font-weight: 600;
  font-size: 0.9375rem;
  transition: transform 0.2s, box-shadow 0.2s, background 0.2s;
  cursor: pointer;
  border: none;
}

.btn:hover {
  transform: translateY(-1px);
  opacity: 1;
}

.btn-primary {
  background: var(--accent-green);
  color: #101010;
}

.btn-primary:hover {
  box-shadow: 0 6px 22px rgba(43, 213, 118, 0.35);
}

.btn-secondary {
  background: #FFFFFF;
  color: var(--text-primary);
  border: 1px solid #D8D8D2;
}

.btn-secondary:hover {
  border-color: #101010;
}

.btn-dark {
  background: #101010;
  color: #FFFFFF;
}

.btn-dark:hover {
  box-shadow: 0 6px 22px rgba(16, 16, 16, 0.25);
}

/* Refined light card (low-chrome — not a generic dark box).
   Used by interior pages that are not converted to full editorial. */
.card {
  background: #FFFFFF;
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: var(--card-padding);
  transition: none;
}

.grid-3 {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

/* Editorial helpers (Option B language, reused across pages) */
.editorial {
  display: flex;
  flex-direction: column;
}

.editorial-row {
  display: flex;
  align-items: flex-start;
  gap: 1.625rem;
  padding: 1.5rem 0;
  border-bottom: 1px solid var(--hairline);
}

.editorial-row:last-child {
  border-bottom: 0;
}

.editorial-num {
  font-size: clamp(2.25rem, 5vw, 3.375rem);
  font-weight: 700;
  line-height: 1;
  letter-spacing: -0.04em;
  width: 5.5rem;
  flex: none;
}

.editorial-bar {
  width: 5px;
  align-self: stretch;
  border-radius: 4px;
  flex: none;
}

.editorial-row h3 {
  font-size: 1.3125rem;
  font-weight: 600;
  letter-spacing: -0.02em;
  margin-bottom: 0.25rem;
  color: var(--text-primary);
}

.editorial-row p {
  font-size: 0.9375rem;
  color: var(--text-secondary);
  max-width: 560px;
  line-height: 1.55;
}

/* Accent color modifiers */
.is-green .editorial-num, .is-green h3 a { color: var(--accent-green); }
.is-coral .editorial-num { color: var(--accent-coral); }
.is-blue  .editorial-num { color: var(--accent-blue); }
.is-yellow .editorial-num { color: var(--accent-yellow-line); }
.is-green .editorial-bar  { background: var(--accent-green); }
.is-coral .editorial-bar  { background: var(--accent-coral); }
.is-blue  .editorial-bar  { background: var(--accent-blue); }
.is-yellow .editorial-bar { background: var(--accent-yellow-line); }

@media (max-width: 768px) {
  :root {
    --section-padding: 3rem 1rem;
  }
  .editorial-row {
    gap: 1rem;
  }
  .editorial-num {
    width: 3.5rem;
  }
}
```

- [ ] **Step 2: Run the Verify Recipe** for routes `/` and `/en/` at width 1280.

Expected: white background, Instrument Sans renders (will FOUT/fallback until Task 3 wires the font — that is OK here), green primary buttons with dark text, hairline borders. The page is now light; MetricsBar and Footer will look wrong (light) — that is expected and fixed in Tasks 9–10. No build errors.

- [ ] **Step 3: Commit**

```
git -C "C:/Users/joseg/Documents/ai-safety-colombia-website" add src/styles/global.css
git -C "C:/Users/joseg/Documents/ai-safety-colombia-website" commit -m "feat(redesign): light Apart palette + base system tokens"
```

---

### Task 3: Swap font to Instrument Sans + theme-color (`BaseLayout.astro`)

**Files:**
- Modify: `src/layouts/BaseLayout.astro:40` (font link) and `:28-29` area (add theme-color)

- [ ] **Step 1: Replace the Space Grotesk font link**

Find this line:
```html
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet">
```
Replace with:
```html
  <link href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
```

- [ ] **Step 2: Add a light theme-color meta**

Find this line:
```html
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
```
Add immediately after it:
```html
  <meta name="theme-color" content="#FFFFFF">
```
(The `preconnect` links to `fonts.googleapis.com` and `fonts.gstatic.com` are already present at lines 38–39 — leave them.)

- [ ] **Step 3: Run the Verify Recipe** for route `/` at width 1280.

Expected: headlines and body render in Instrument Sans (geometric, tight); no FOIT — text is visible during load (font uses `&display=swap`). Build exits 0.

- [ ] **Step 4: Commit**

```
git -C "C:/Users/joseg/Documents/ai-safety-colombia-website" add src/layouts/BaseLayout.astro
git -C "C:/Users/joseg/Documents/ai-safety-colombia-website" commit -m "feat(redesign): load Instrument Sans, light theme-color"
```

---

### Task 4: Restyle Navbar (white bar, on-white logo, dark pill CTA)

The current navbar is a floating dark pill using `var(--bg-secondary)` (now light) and `logo-white.png` (invisible on white). Convert to a white full-width bar with a bottom hairline; switch to the on-white `logo.png`; make the Contacto CTA a dark pill.

**Files:**
- Modify: `src/components/Navbar.astro`

- [ ] **Step 1: Change the logo source**

Find:
```html
      <img src="/logo-white.png" alt="AI Safety Colombia" class="nav-logo-img">
```
Replace with:
```html
      <img src="/logo.png" alt="AI Safety Colombia" class="nav-logo-img">
```

- [ ] **Step 2: Change the CTA button class from primary to dark**

Find:
```html
      <a href={localePath(locale, '/contacto/')} class="btn btn-primary nav-cta">
```
Replace with:
```html
      <a href={localePath(locale, '/contacto/')} class="btn btn-dark nav-cta">
```

- [ ] **Step 3: Replace the entire `<style>` block in `Navbar.astro`** with:

```html
<style>
  .navbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    background: #FFFFFF;
    border-bottom: 1px solid var(--hairline);
  }

  .navbar-pill {
    max-width: 1100px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.875rem 1.5rem;
  }

  .nav-logo {
    display: flex;
    align-items: center;
    gap: 0.625rem;
    color: var(--text-primary);
    font-weight: 600;
    font-size: 0.9375rem;
    flex-shrink: 0;
  }

  .nav-logo:hover { opacity: 1; }

  .nav-logo-img {
    height: 26px;
    width: auto;
  }

  .nav-logo-text {
    white-space: nowrap;
  }

  .nav-links {
    display: flex;
    align-items: center;
    gap: 1.5rem;
  }

  .nav-links a {
    color: var(--text-secondary);
    font-size: 0.8125rem;
    font-weight: 500;
    transition: color 0.2s;
  }

  .nav-links a:hover,
  .nav-links a.active {
    color: var(--text-primary);
    opacity: 1;
  }

  .nav-right {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .lang-toggle {
    display: flex;
    gap: 0.125rem;
    border: 1px solid var(--border);
    border-radius: 999px;
    padding: 0.125rem;
  }

  .lang-toggle a {
    padding: 0.25rem 0.5rem;
    font-size: 0.6875rem;
    font-weight: 600;
    letter-spacing: 0.05em;
    color: var(--text-secondary);
    border-radius: 999px;
    transition: all 0.2s;
  }

  .lang-toggle a.active {
    background: var(--accent-green);
    color: #101010;
  }

  .lang-toggle a:hover { opacity: 1; }

  .nav-cta {
    padding: 0.5rem 1.25rem;
    font-size: 0.8125rem;
  }

  .hamburger {
    display: none;
    flex-direction: column;
    gap: 4px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
  }

  .hamburger span {
    display: block;
    width: 20px;
    height: 2px;
    background: var(--text-primary);
    transition: transform 0.3s, opacity 0.3s;
  }

  .mobile-nav {
    display: none;
    position: fixed;
    top: 60px;
    left: 1rem;
    right: 1rem;
    background: #FFFFFF;
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 1.25rem 1.5rem;
    z-index: 99;
    flex-direction: column;
    gap: 0.75rem;
  }

  .mobile-nav a {
    color: var(--text-secondary);
    font-size: 0.9375rem;
    font-weight: 500;
    padding: 0.5rem 0;
  }

  .mobile-nav a.active {
    color: var(--green-text);
  }

  @media (max-width: 900px) {
    .nav-links { display: none; }
    .nav-cta { display: none; }
    .hamburger { display: flex; }
    .mobile-nav.open { display: flex; }
  }
</style>
```

- [ ] **Step 4: Run the Verify Recipe** for routes `/` and `/en/about/` at widths 390 and 1280.

Expected: a clean white top bar with a 1px bottom hairline; the green/black tetrahedron logo is visible on white; muted nav links darken on hover; `ES·EN` toggle is an outlined pill with the active locale on a green chip; "Contacto →" is a black pill; at 390px the hamburger shows and the white mobile menu opens. No content overlap below the bar (HackathonBanner's `margin-top: 5rem` clears the ~58px bar). Build exits 0.

- [ ] **Step 5: Commit**

```
git -C "C:/Users/joseg/Documents/ai-safety-colombia-website" add src/components/Navbar.astro
git -C "C:/Users/joseg/Documents/ai-safety-colombia-website" commit -m "feat(redesign): white navbar, on-white logo, dark CTA pill"
```

---

### Task 5: Restyle HackathonBanner (mint→blue gradient card)

**Files:**
- Modify: `src/components/HackathonBanner.astro`

- [ ] **Step 1: Replace the entire `<style>` block in `HackathonBanner.astro`** with:

```html
<style>
  .hackathon-banner {
    padding: 1.5rem 0 0;
    margin-top: 5rem;
  }

  .banner-card {
    background: linear-gradient(100deg, #eafff2, #e7f6ff);
    border: 1px solid #d5efe0;
    border-radius: 18px;
    padding: 2rem 2.5rem;
  }

  .banner-content {
    text-align: center;
  }

  .banner-badge {
    display: inline-block;
    background: var(--accent-green);
    color: #06210f;
    padding: 0.3125rem 0.875rem;
    border-radius: 999px;
    font-size: 0.6875rem;
    font-weight: 700;
    margin-bottom: 0.625rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }

  .banner-title {
    font-size: clamp(1.25rem, 3vw, 1.75rem);
    font-weight: 600;
    letter-spacing: -0.02em;
    color: var(--text-primary);
    margin-bottom: 0.375rem;
  }

  .banner-subtitle {
    color: var(--text-secondary);
    font-size: 0.9375rem;
    margin-bottom: 1.125rem;
  }

  .banner-actions {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1.5rem;
    flex-wrap: wrap;
  }

  .countdown {
    display: flex;
    align-items: baseline;
    gap: 0.375rem;
  }

  .countdown-number {
    font-size: 1.75rem;
    font-weight: 700;
    color: var(--green-text);
  }

  .countdown-label {
    color: var(--text-secondary);
    font-size: 0.8125rem;
  }
</style>
```

(The markup and the countdown `<script>` are unchanged; `.btn.btn-primary` on the CTA now resolves to the green pill from `global.css`.)

- [ ] **Step 2: Run the Verify Recipe** for routes `/` and `/en/` at widths 390 and 1280.

Expected: a rounded card with a soft mint→blue horizontal gradient and a faint green border; a green uppercase "APART RESEARCH" tag pill with dark text; title and meta line in ink/muted; a green pill CTA and the day-count number in accessible dark green (`#15803D`). Readable at 390px. Build exits 0.

- [ ] **Step 3: Commit**

```
git -C "C:/Users/joseg/Documents/ai-safety-colombia-website" add src/components/HackathonBanner.astro
git -C "C:/Users/joseg/Documents/ai-safety-colombia-website" commit -m "feat(redesign): mint-to-blue hackathon banner"
```

---

### Task 6: Restyle Hero (light, dot-grid, green accent word)

The hero title comes from i18n as the single string `"AI Safety Colombia"` (identical in ES and EN). Per the non-goal "no i18n string changes", do NOT edit `ui.ts`; instead split the string in the component and color the second word green.

**Files:**
- Modify: `src/components/Hero.astro`

- [ ] **Step 1: Replace the frontmatter block (lines 1–10) of `Hero.astro`** with:

```astro
---
import type { Locale } from '../i18n/ui';
import { t, localePath } from '../i18n/ui';

interface Props {
  locale: Locale;
}

const { locale } = Astro.props;
const titleWords = t(locale, 'hero.title').split(' ');
const firstWord = titleWords[0];
const accentWord = titleWords[1] ?? '';
const restWords = titleWords.slice(2).join(' ');
---
```

- [ ] **Step 2: Replace the `<h1>` line**

Find:
```astro
      <h1 class="hero-title">{t(locale, 'hero.title')}</h1>
```
Replace with:
```astro
      <h1 class="hero-title">{firstWord} <span class="hero-accent">{accentWord}</span>{restWords ? ` ${restWords}` : ''}</h1>
```

- [ ] **Step 3: Replace the entire `<style>` block in `Hero.astro`** with:

```html
<style>
  .hero {
    padding: 8.5rem 1.5rem 5rem;
    position: relative;
    overflow: hidden;
    text-align: center;
  }

  .hero-dots {
    position: absolute;
    inset: 0;
    background-image: radial-gradient(#e2e2dc 1.4px, transparent 1.4px);
    background-size: 26px 26px;
    opacity: 0.6;
    pointer-events: none;
  }

  .hero-content {
    position: relative;
    z-index: 1;
    max-width: 750px;
    margin: 0 auto;
  }

  .hero-title {
    font-size: clamp(2.75rem, 6vw, 3.75rem);
    font-weight: 600;
    letter-spacing: -0.045em;
    line-height: 1.04;
    margin-bottom: 1.25rem;
    color: var(--text-primary);
  }

  .hero-accent {
    color: var(--accent-green);
  }

  .hero-subtitle {
    font-size: clamp(1.125rem, 2.5vw, 1.375rem);
    color: var(--text-secondary);
    margin-bottom: 2.25rem;
    line-height: 1.5;
  }

  .hero-actions {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
  }

  @media (max-width: 768px) {
    .hero {
      padding: 6.5rem 1rem 3.5rem;
    }
  }
</style>
```

- [ ] **Step 4: Run the Verify Recipe** for routes `/` and `/en/` at widths 390, 820, 1280.

Expected: light hero with a subtle light-grey dot-grid texture on white; large tight headline with the word "Safety" in vivid green and the rest in ink; muted subtitle; a green primary pill and a white outlined secondary pill. The green word on white is decorative display type (large, not body) — acceptable per the accessibility rule. Build exits 0.

- [ ] **Step 5: Commit**

```
git -C "C:/Users/joseg/Documents/ai-safety-colombia-website" add src/components/Hero.astro
git -C "C:/Users/joseg/Documents/ai-safety-colombia-website" commit -m "feat(redesign): light hero with green accent word + dot-grid"
```

---

### Task 7: Create `WhatWeDo.astro` (Option B editorial rows) and wire it in

Extract the "Qué hacemos" block out of both index pages into a new bilingual component built as editorial numbered rows. Uses only existing i18n keys (`sections.what-we-do`, `what-we-do.research.title|desc`, `what-we-do.education.title|desc`, `what-we-do.community.title|desc`).

**Files:**
- Create: `src/components/WhatWeDo.astro`
- Modify: `src/pages/index.astro`, `src/pages/en/index.astro`

- [ ] **Step 1: Create `src/components/WhatWeDo.astro`** with this exact content:

```astro
---
import type { Locale } from '../i18n/ui';
import { t } from '../i18n/ui';

interface Props {
  locale: Locale;
}

const { locale } = Astro.props;

const rows = [
  { n: '01', cls: 'is-green', title: t(locale, 'what-we-do.research.title'),  desc: t(locale, 'what-we-do.research.desc') },
  { n: '02', cls: 'is-coral', title: t(locale, 'what-we-do.education.title'), desc: t(locale, 'what-we-do.education.desc') },
  { n: '03', cls: 'is-blue',  title: t(locale, 'what-we-do.community.title'), desc: t(locale, 'what-we-do.community.desc') },
];
---

<section class="section alt">
  <div class="container">
    <h2 class="section-title">{t(locale, 'sections.what-we-do')}</h2>
    <div class="editorial what-we-do">
      {rows.map(row => (
        <div class={`editorial-row ${row.cls}`}>
          <div class="editorial-num">{row.n}</div>
          <div class="editorial-bar"></div>
          <div class="editorial-tx">
            <h3>{row.title}</h3>
            <p>{row.desc}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

<style>
  .what-we-do {
    margin-top: 1.5rem;
  }
  .editorial-tx {
    padding-top: 0.125rem;
  }
</style>
```

- [ ] **Step 2: Wire it into `src/pages/index.astro`** — add the import and replace the inline block.

Add to the frontmatter import list (after the `MetricsBar` import line):
```astro
import WhatWeDo from '../components/WhatWeDo.astro';
```

Replace this entire block (the what-we-do `<section>`, currently lines ~20–41):
```astro
  <section class="section">
    <div class="container">
      <h2 class="section-title">{t(locale, 'sections.what-we-do')}</h2>
      <div class="grid-3">
        <div class="card">
          <div class="card-icon">&#x1F52C;</div>
          <h3>{t(locale, 'what-we-do.research.title')}</h3>
          <p>{t(locale, 'what-we-do.research.desc')}</p>
        </div>
        <div class="card">
          <div class="card-icon">&#x1F393;</div>
          <h3>{t(locale, 'what-we-do.education.title')}</h3>
          <p>{t(locale, 'what-we-do.education.desc')}</p>
        </div>
        <div class="card">
          <div class="card-icon">&#x1F91D;</div>
          <h3>{t(locale, 'what-we-do.community.title')}</h3>
          <p>{t(locale, 'what-we-do.community.desc')}</p>
        </div>
      </div>
    </div>
  </section>
```
with:
```astro
  <WhatWeDo locale={locale} />
```

- [ ] **Step 3: Remove the now-dead `.card-icon` and `.card h3/.card p` rules from `index.astro`'s `<style>` block**

Find and delete exactly these rules from the `<style>` block in `src/pages/index.astro`:
```css
  .card-icon {
    font-size: 2rem;
    margin-bottom: 0.75rem;
  }

  .card h3 {
    font-size: 1.125rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: var(--text-primary);
  }

  .card p {
    color: var(--text-secondary);
    font-size: 0.9375rem;
    line-height: 1.6;
  }
```
(Leave the `.pipeline*`, `.join-section`, `.join-links` rules — they are restyled in Task 8.)

- [ ] **Step 4: Repeat Steps 2–3 for `src/pages/en/index.astro`**

The `en/index.astro` what-we-do block and dead `.card*` rules are byte-identical to `index.astro` (verified). Apply the exact same import (note path is `../../components/WhatWeDo.astro`):
```astro
import WhatWeDo from '../../components/WhatWeDo.astro';
```
Replace the same what-we-do `<section>...</section>` block with `<WhatWeDo locale={locale} />` and delete the same three `.card-icon` / `.card h3` / `.card p` CSS rules.

- [ ] **Step 5: Run the Verify Recipe** for routes `/` and `/en/` at widths 390, 820, 1280.

Expected: on the `#F7F7F5` alt band, the "Qué hacemos / What We Do" title followed by three rows — large colored numerals `01` green / `02` coral / `03` blue, a thin matching vertical color bar, then heading + paragraph; hairline dividers between rows; no boxes/cards/emoji icons. Stacks cleanly at 390px. Build exits 0.

- [ ] **Step 6: Commit**

```
git -C "C:/Users/joseg/Documents/ai-safety-colombia-website" add src/components/WhatWeDo.astro src/pages/index.astro src/pages/en/index.astro
git -C "C:/Users/joseg/Documents/ai-safety-colombia-website" commit -m "feat(redesign): WhatWeDo editorial numbered rows (Option B)"
```

---

### Task 8: Restyle the Programas journey on the homepages

Replace the `.pipeline*` scoped styles in both index pages so the journey reads as colored numbered circles on a `#F7F7F5` band. The journey markup (4 steps + arrows) is unchanged; only the section wrapper class and the scoped CSS change.

**Files:**
- Modify: `src/pages/index.astro`, `src/pages/en/index.astro`

- [ ] **Step 1: In `src/pages/index.astro`, add the alt band + center the title for the Programas section**

Find:
```astro
  <section class="section">
    <div class="container">
      <h2 class="section-title">{t(locale, 'sections.programs')}</h2>
      <div class="pipeline">
```
Replace with:
```astro
  <section class="section alt programs-band">
    <div class="container">
      <h2 class="section-title" style="text-align:center">{t(locale, 'sections.programs')}</h2>
      <div class="pipeline">
```

- [ ] **Step 2: In `src/pages/index.astro`, replace the `.pipeline*` rules** (the `.pipeline`, `.pipeline-step`, `.pipeline-num`, `.pipeline-label`, `.pipeline-arrow`, `.pipeline-arrow::after`, and the `@media` `.pipeline*` rules) with:

```css
  .programs-band .section-title { margin-bottom: 0; }

  .pipeline {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    flex-wrap: wrap;
    margin-top: 2rem;
  }

  .pipeline-step {
    display: flex;
    align-items: center;
    gap: 0.625rem;
    background: #FFFFFF;
    border: 1px solid var(--border);
    border-radius: 999px;
    padding: 0.625rem 1.125rem;
    font-size: 0.875rem;
    font-weight: 600;
  }

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

  .pipeline-label {
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--text-primary);
  }

  .pipeline-arrow {
    width: 1.75rem;
    height: 2px;
    background: #cfcfc8;
    position: relative;
  }

  .pipeline-arrow::after {
    content: '';
    position: absolute;
    right: 0;
    top: -3px;
    border: solid #cfcfc8;
    border-width: 0 2px 2px 0;
    padding: 3px;
    transform: rotate(-45deg);
  }

  @media (max-width: 768px) {
    .pipeline-arrow { display: none; }
    .pipeline { gap: 0.75rem; }
  }
```

Note on the `nth-of-type` selectors: inside `.pipeline` the children are, in order, `pipeline-step` (1), `pipeline-arrow` (2), `pipeline-step` (3), `pipeline-arrow` (4), `pipeline-step` (5), `pipeline-arrow` (6), `pipeline-step` (7). So steps are positions 1/3/5/7 → blue, green, yellow, coral.

- [ ] **Step 3: Apply the identical changes to `src/pages/en/index.astro`**

The Programas section markup and `.pipeline*` CSS in `en/index.astro` are byte-identical to `index.astro` (verified). Apply Step 1's section-tag replacement and Step 2's CSS replacement verbatim.

- [ ] **Step 4: Run the Verify Recipe** for routes `/` and `/en/` at widths 390, 820, 1280.

Expected: a `#F7F7F5` band with a centered "Programas/Programs" title; four white outlined pills "Curioso → Aprendiendo → Participando → Contribuyendo" each with a colored numbered circle (1 blue, 2 green w/ dark numeral, 3 yellow w/ dark numeral, 4 coral) and grey arrow connectors; arrows hide at 390px and pills wrap. Build exits 0.

- [ ] **Step 5: Commit**

```
git -C "C:/Users/joseg/Documents/ai-safety-colombia-website" add src/pages/index.astro src/pages/en/index.astro
git -C "C:/Users/joseg/Documents/ai-safety-colombia-website" commit -m "feat(redesign): colored journey pills on alt band"
```

---

### Task 9: Restyle MetricsBar as the deliberate dark block

MetricsBar must stay dark (`#101010`) as Apart's "one dark moment" — decouple it from the now-light tokens with explicit colors.

**Files:**
- Modify: `src/components/MetricsBar.astro`

- [ ] **Step 1: Replace the entire `<style>` block in `MetricsBar.astro`** with:

```html
<style>
  .metrics-bar {
    padding: 2.5rem 1.5rem;
  }

  .metrics-card {
    background: #101010;
    border-radius: 22px;
    padding: 2.5rem 2rem;
  }

  .metrics-grid {
    display: flex;
    justify-content: center;
    gap: 4rem;
    flex-wrap: wrap;
  }

  .metric {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
  }

  .metric-value {
    font-size: 2.625rem;
    font-weight: 700;
    color: #2BD576;
    line-height: 1;
  }

  .metric-label {
    font-size: 0.6875rem;
    color: #9A9A9A;
    text-transform: uppercase;
    letter-spacing: 0.12em;
  }

  @media (max-width: 768px) {
    .metrics-grid { gap: 2rem; }
  }
</style>
```

- [ ] **Step 2: Run the Verify Recipe** for routes `/` and `/en/` at widths 390, 1280.

Expected: a single rounded near-black block sitting on the white page; large vivid-green numerals (`30+`, `1`, `3`) with uppercase grey labels beneath; high contrast, AA-passing. Build exits 0.

- [ ] **Step 3: Commit**

```
git -C "C:/Users/joseg/Documents/ai-safety-colombia-website" add src/components/MetricsBar.astro
git -C "C:/Users/joseg/Documents/ai-safety-colombia-website" commit -m "feat(redesign): dark high-contrast metrics block"
```

---

### Task 10: Restyle Footer as the dark grounding block

Footer stays dark (`#101010`). It uses `logo-white.png` (correct on dark — keep). Decouple from light tokens; restyle the newsletter input for dark.

**Files:**
- Modify: `src/components/Footer.astro`

- [ ] **Step 1: Replace the entire `<style>` block in `Footer.astro`** with:

```html
<style>
  .footer {
    background: #101010;
    border-top: 1px solid #262626;
    padding: 4rem 0 2rem;
    margin-top: 4rem;
  }

  .footer-grid {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    gap: 3rem;
  }

  .footer-brand p {
    color: #9A9A9A;
    margin-top: 1rem;
    max-width: 300px;
    font-size: 0.875rem;
    line-height: 1.6;
  }

  .footer-logo {
    height: 34px;
    width: auto;
  }

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
    border-color: #2BD576;
  }

  .newsletter-btn {
    padding: 0.625rem 1rem;
    font-size: 0.875rem;
    flex-shrink: 0;
  }

  .footer-links {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .footer-links h4 {
    font-size: 0.6875rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: #FFFFFF;
    margin-bottom: 0.5rem;
  }

  .footer-links a {
    color: #9A9A9A;
    font-size: 0.875rem;
    transition: color 0.2s;
  }

  .footer-links a:hover {
    color: #FFFFFF;
    opacity: 1;
  }

  .footer-bottom {
    margin-top: 3rem;
    padding-top: 1.5rem;
    border-top: 1px solid #262626;
  }

  .footer-bottom p {
    color: #9A9A9A;
    font-size: 0.8125rem;
  }

  @media (max-width: 768px) {
    .footer-grid {
      grid-template-columns: 1fr;
      gap: 2rem;
    }
  }
</style>
```

- [ ] **Step 2: Run the Verify Recipe** for routes `/` and `/en/contact/` at widths 390, 1280.

Expected: dark footer with the white logo lockup, white uppercase section headings, muted grey links that brighten to white on hover, and a dark-styled newsletter input with a green focus ring and a green arrow button. Build exits 0.

- [ ] **Step 3: Commit**

```
git -C "C:/Users/joseg/Documents/ai-safety-colombia-website" add src/components/Footer.astro
git -C "C:/Users/joseg/Documents/ai-safety-colombia-website" commit -m "feat(redesign): dark grounding footer"
```

---

### Task 11: Audit + restyle the ES interior pages

Convert generic `.card`/`.grid-3` grids to editorial treatments and fix the contact form for light. The token cascade already makes these pages light; this task removes the remaining "generic card grid" look and fixes one dark-specific input.

**Files:**
- Modify: `src/pages/sobre.astro`, `src/pages/programas.astro`, `src/pages/recursos.astro`, `src/pages/involucrate.astro`, `src/pages/hackathon.astro`, `src/pages/contacto.astro`

- [ ] **Step 1: `sobre.astro` — convert the Teoría de cambio grid to editorial rows**

Replace this block:
```astro
      <div class="toc-grid">
        <div class="card">
          <h3>Talento</h3>
          <p>Formamos investigadores y profesionales que puedan contribuir directamente a la seguridad de IA.</p>
        </div>
        <div class="card">
          <h3>Investigacion</h3>
          <p>Producimos trabajo tecnico y de gobernanza adaptado al contexto latinoamericano.</p>
        </div>
        <div class="card">
          <h3>Comunidad</h3>
          <p>Construimos una red de personas informadas que puedan influir en decisiones clave sobre IA.</p>
        </div>
      </div>
```
with:
```astro
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
```
Then delete the now-unused `.toc-grid`, `.toc-grid .card h3`, `.toc-grid .card p` rules from `sobre.astro`'s `<style>` block.

- [ ] **Step 2: `programas.astro` — convert the program cards to editorial numbered rows**

Replace the `.programs-list` block:
```astro
      <div class="programs-list">
        {programs.map((prog, i) => (
          <div class="program-card card">
            <div class="program-header">
              <span class="program-num">{i + 1}</span>
              <h3>{prog.stage}</h3>
            </div>
            <p class="program-desc">{prog.desc}</p>
            <ul class="program-items">
              {prog.items.map(item => <li>{item}</li>)}
            </ul>
          </div>
        ))}
      </div>
```
with:
```astro
      <div class="editorial">
        {programs.map((prog, i) => (
          <div class={`editorial-row ${['is-green','is-coral','is-blue','is-yellow'][i]}`}>
            <div class="editorial-num">{`0${i + 1}`}</div>
            <div class="editorial-bar"></div>
            <div class="editorial-tx">
              <h3>{prog.stage}</h3>
              <p class="program-desc">{prog.desc}</p>
              <ul class="program-items">
                {prog.items.map(item => <li>{item}</li>)}
              </ul>
            </div>
          </div>
        ))}
      </div>
```
Then in `programas.astro`'s `<style>` block, delete the `.programs-list`, `.program-header`, `.program-num`, `.program-header h3` rules, and replace the `.program-desc`, `.program-items`, `.program-items li`, `.program-items li::before` rules with:
```css
  .program-desc {
    color: var(--text-secondary);
    font-size: 0.9375rem;
    margin: 0.25rem 0 0.875rem;
    line-height: 1.6;
  }

  .program-items {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
  }

  .program-items li {
    color: var(--text-secondary);
    font-size: 0.875rem;
    padding-left: 1rem;
    position: relative;
  }

  .program-items li::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0.5em;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--accent-green);
  }
```

- [ ] **Step 3: `recursos.astro` — convert path cards to editorial rows**

Replace the `.paths-grid` block:
```astro
      <div class="paths-grid">
        {paths.map(path => (
          <div class="card path-card">
            <h3>{path.title}</h3>
            <ul>
              {path.items.map(item => (
                <li>
                  <a href={item.url} target="_blank" rel="noopener noreferrer">{item.name}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
```
with:
```astro
      <div class="editorial">
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
      </div>
```
Then in `recursos.astro`'s `<style>` block, delete the `.paths-grid`, `.path-card h3` rules and replace `.path-card ul`, `.path-card li a`, `.path-card li a:hover` with:
```css
  .path-tx ul {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-top: 0.5rem;
  }

  .path-tx li a {
    color: var(--green-text);
    font-size: 0.9375rem;
    transition: opacity 0.2s;
  }

  .path-tx li a:hover {
    opacity: 0.7;
  }
```

- [ ] **Step 4: `involucrate.astro` — convert audience cards to editorial numbered rows**

Replace the `.audience-grid` block:
```astro
      <div class="audience-grid">
        {audiences.map(aud => (
          <div class="card audience-card">
            <h3>{aud.title}</h3>
            <p class="aud-desc">{aud.desc}</p>
            <ul>
              {aud.actions.map(action => <li>{action}</li>)}
            </ul>
          </div>
        ))}
      </div>
```
with:
```astro
      <div class="editorial">
        {audiences.map((aud, i) => (
          <div class={`editorial-row ${['is-green','is-coral','is-blue','is-yellow'][i]}`}>
            <div class="editorial-num">{`0${i + 1}`}</div>
            <div class="editorial-bar"></div>
            <div class="editorial-tx audience-tx">
              <h3>{aud.title}</h3>
              <p class="aud-desc">{aud.desc}</p>
              <ul>
                {aud.actions.map(action => <li>{action}</li>)}
              </ul>
            </div>
          </div>
        ))}
      </div>
```
Then in `involucrate.astro`'s `<style>` block, delete `.audience-grid`, `.audience-card h3` and replace `.aud-desc`, `.audience-card ul`, `.audience-card li`, `.audience-card li::before` with:
```css
  .aud-desc {
    color: var(--text-secondary);
    font-size: 0.9375rem;
    margin: 0.25rem 0 0.875rem;
  }

  .audience-tx ul {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
  }

  .audience-tx li {
    color: var(--text-secondary);
    font-size: 0.875rem;
    padding-left: 1rem;
    position: relative;
  }

  .audience-tx li::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0.5em;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--accent-green);
  }
```

- [ ] **Step 5: `hackathon.astro` — convert the speakers `.grid-3` to editorial rows; keep prize/schedule (they already cascade light)**

Replace the speakers block:
```astro
      <div class="grid-3">
        {hackathonData.speakers.map(speaker => (
          <div class="card">
            <h3>{speaker.name}</h3>
            <p>{speaker.role} - {speaker.org}</p>
          </div>
        ))}
      </div>
```
with:
```astro
      <div class="editorial">
        {hackathonData.speakers.map((speaker, i) => (
          <div class={`editorial-row ${['is-green','is-coral','is-blue','is-yellow'][i % 4]}`}>
            <div class="editorial-num">{`0${i + 1}`}</div>
            <div class="editorial-bar"></div>
            <div class="editorial-tx">
              <h3>{speaker.name}</h3>
              <p>{speaker.role} - {speaker.org}</p>
            </div>
          </div>
        ))}
      </div>
```
Leave `.prize-card` (it uses `.card`, now the light refined card — acceptable) and `.schedule*` rules as-is; they cascade to light through the tokens. The `.event-time` color `var(--accent-red)` now resolves to coral `#FF5645` — acceptable.

- [ ] **Step 6: `contacto.astro` — light-proof the form input/textarea**

In `contacto.astro`'s `<style>` block, replace the `.form-group input, .form-group textarea` and `.form-group input:focus, .form-group textarea:focus` rules with:
```css
  .form-group input,
  .form-group textarea {
    width: 100%;
    padding: 0.75rem 0.875rem;
    background: #FFFFFF;
    border: 1px solid var(--border);
    border-radius: 12px;
    color: var(--text-primary);
    font-size: 0.9375rem;
    font-family: var(--font-body);
    transition: border-color 0.2s;
  }

  .form-group input:focus,
  .form-group textarea:focus {
    outline: none;
    border-color: #2BD576;
  }
```
The `.contact-form` keeps `.card` (light refined card) — acceptable. `.channel-item` colors cascade via tokens.

- [ ] **Step 7: Run the Verify Recipe** for routes `/sobre/`, `/programas/`, `/recursos/`, `/involucrate/`, `/hackathon/`, `/contacto/` at widths 390 and 1280.

Expected per page: no generic shadowed/dark card grids remain; sobre/programas/recursos/involucrate/hackathon-speakers render as editorial numbered (or bar-only for sobre) rows with hairline dividers and colored numerals/bars; the contact form inputs are white with a hairline border and a green focus ring, fully legible; all body text meets AA on white. Build exits 0.

- [ ] **Step 8: Commit**

```
git -C "C:/Users/joseg/Documents/ai-safety-colombia-website" add src/pages/sobre.astro src/pages/programas.astro src/pages/recursos.astro src/pages/involucrate.astro src/pages/hackathon.astro src/pages/contacto.astro
git -C "C:/Users/joseg/Documents/ai-safety-colombia-website" commit -m "feat(redesign): editorial treatments + light form on ES interior pages"
```

---

### Task 12: Audit + restyle the EN interior pages

The `/en/` pages mirror their ES counterparts in structure and class names (verified: `en/about.astro` is byte-identical to `sobre.astro` except copy). Apply the same conversions with English copy.

**Files:**
- Modify: `src/pages/en/about.astro`, `src/pages/en/programs.astro`, `src/pages/en/resources.astro`, `src/pages/en/get-involved.astro`, `src/pages/en/hackathon.astro`, `src/pages/en/contact.astro`

- [ ] **Step 1: Read each EN page** to confirm its current markup matches the ES sibling's pre-change structure. For each of `en/about.astro` (↔ `sobre.astro`), `en/programs.astro` (↔ `programas.astro`), `en/resources.astro` (↔ `recursos.astro`), `en/get-involved.astro` (↔ `involucrate.astro`), `en/hackathon.astro` (↔ `hackathon.astro`), `en/contact.astro` (↔ `contacto.astro`).

- [ ] **Step 2: `en/about.astro`** — apply the Task 11 Step 1 transformation, keeping the English headings/copy that already exist in the file (`Talent` / `Research` / `Community` and their English paragraphs). Same `editorial`/`editorial-row is-green|is-coral|is-blue`/`editorial-bar`/`editorial-tx` structure; delete the same `.toc-grid*` CSS rules.

- [ ] **Step 3: `en/programs.astro`** — apply the Task 11 Step 2 transformation verbatim (the `programs` array and `.program-*` classes are identical; only the data values differ and are read from the file's own `programs` array). Replace `.programs-list` markup with the `editorial` map block and apply the same `<style>` deletions/replacements.

- [ ] **Step 4: `en/resources.astro`** — apply the Task 11 Step 3 transformation verbatim (same `paths` map + `.path-card` classes). Replace markup with the `editorial` block and apply the same `<style>` deletions/replacements (`.path-tx` rules).

- [ ] **Step 5: `en/get-involved.astro`** — apply the Task 11 Step 4 transformation verbatim (same `audiences` map + `.audience-card` classes). Replace markup with the `editorial` block and apply the same `<style>` deletions/replacements (`.audience-tx` rules).

- [ ] **Step 6: `en/hackathon.astro`** — apply the Task 11 Step 5 transformation: replace the speakers `.grid-3` with the `editorial` speakers block; leave `.prize-card`/`.schedule*` as-is.

- [ ] **Step 7: `en/contact.astro`** — apply the Task 11 Step 6 transformation: replace the `.form-group input/textarea` and `:focus` rules with the light versions.

- [ ] **Step 8: Run the Verify Recipe** for routes `/en/about/`, `/en/programs/`, `/en/resources/`, `/en/get-involved/`, `/en/hackathon/`, `/en/contact/` at widths 390 and 1280.

Expected: identical visual treatment to the ES siblings, with English copy intact; no generic card grids; light legible contact form; AA contrast. Build exits 0.

- [ ] **Step 9: Commit**

```
git -C "C:/Users/joseg/Documents/ai-safety-colombia-website" add src/pages/en/about.astro src/pages/en/programs.astro src/pages/en/resources.astro src/pages/en/get-involved.astro src/pages/en/hackathon.astro src/pages/en/contact.astro
git -C "C:/Users/joseg/Documents/ai-safety-colombia-website" commit -m "feat(redesign): editorial treatments + light form on EN interior pages"
```

---

### Task 13: Regenerate og-image.png in the light theme

`public/og-image.png` (1200×630) is referenced by `BaseLayout.astro` as `${Astro.site}og-image.png` (path unchanged). Rewrite the `scripts/og/og-image.html` template to the light theme, keep the embedded base64 logo `<img class='logo'>` and text content, render at 1200×630, and overwrite `public/og-image.png`.

**Files:**
- Modify: `scripts/og/og-image.html` (the `<style>` block only — keep `<body>` markup and the embedded base64 logo image untouched)
- Modify: `scripts/og/README.md`
- Overwrite: `public/og-image.png`

- [ ] **Step 1: Replace the `<style>` block of `scripts/og/og-image.html`**

The `<style>` block is lines 5–21 (verified: `<style>` at line 5, `</style></head>` at line 21). The `<body>` contains `.grid`, `.glow`, `.wrap > .left` with `.kicker`, `<h1>AI <span class='g'>Safety</span><br>Colombia</h1>`, `<p>`, an `<img class='logo' src='data:image/png;base64,…'>` (long line — DO NOT modify it), and `<div class='url'>aisafetycolombia<span class='s'>.org</span></div>`.

Replace the full `<style> … </style>` block (open tag through `</style></head>`) with:
```html
<style>
@import url('https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;600;700&display=swap');
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:1200px;height:630px}
body{background:#FFFFFF;font-family:'Instrument Sans',system-ui,sans-serif;overflow:hidden;position:relative}
.grid{position:absolute;inset:0;background-image:radial-gradient(#e2e2dc 1.6px,transparent 1.6px);background-size:34px 34px;opacity:.7}
.glow{display:none}
.wrap{position:absolute;inset:0;display:flex;align-items:center;justify-content:space-between;padding:84px 96px}
.left{max-width:660px}
.kicker{display:inline-flex;align-items:center;gap:10px;font-size:21px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;color:#15803D;margin-bottom:30px}
.kicker .dot{width:9px;height:9px;border-radius:50%;background:#2BD576}
h1{font-size:88px;line-height:1.02;font-weight:600;color:#101010;letter-spacing:-.04em}
h1 .g{color:#2BD576}
p{margin-top:30px;font-size:32px;line-height:1.32;font-weight:400;color:#5B5F5B;max-width:600px}
.url{position:absolute;left:96px;bottom:64px;font-size:25px;font-weight:600;color:#101010}
.url .s{color:#15803D}
.logo{width:430px;height:auto}
</style></head>
```
(The embedded green tetrahedron logo is a transparent PNG and renders correctly on white; no logo reprocessing or `sharp` step is needed. `.glow` is hidden; `.grid` becomes a faint light dot-grid.)

- [ ] **Step 2: Render and capture at exactly 1200×630**

Serve the og folder: `py -m http.server 8799 --bind 127.0.0.1 -d scripts/og` (background).
Load Playwright tools if needed (`ToolSearch select:mcp__playwright__browser_navigate,mcp__playwright__browser_resize,mcp__playwright__browser_take_screenshot`).
- `mcp__playwright__browser_resize` → width 1200, height 630.
- `mcp__playwright__browser_navigate` → `http://127.0.0.1:8799/og-image.html`.
- `mcp__playwright__browser_take_screenshot` with a clipped/viewport (non-fullPage) capture so the output is exactly 1200×630, saving directly over `C:\Users\joseg\Documents\ai-safety-colombia-website\public\og-image.png`.
Stop the server.

- [ ] **Step 3: Verify the PNG dimensions are exactly 1200×630**

PowerShell:
```
Add-Type -AssemblyName System.Drawing
$img = [System.Drawing.Image]::FromFile("C:\Users\joseg\Documents\ai-safety-colombia-website\public\og-image.png")
"$($img.Width)x$($img.Height)"
$img.Dispose()
```
Expected output: `1200x630`. If not exactly 1200×630, redo Step 2 with a clip region of `{x:0,y:0,width:1200,height:630}`.

- [ ] **Step 4: Update `scripts/og/README.md`** — replace its body with:
```markdown
# OG image generator

`public/og-image.png` (1200×630) is the social-share card referenced by
`src/layouts/BaseLayout.astro` as `${Astro.site}og-image.png`.

## Source files
- `og-image.html` — self-contained card template (light theme: white bg,
  Instrument Sans, ink headline with a green accent word, faint light
  dot-grid, embedded base64 transparent logo).
- `logo-transparent.png` — the green tetrahedron logo with its white
  background made transparent (derived from `public/logo.png`).

## Regenerate
1. Serve this folder: `py -m http.server 8799 --bind 127.0.0.1 -d scripts/og`
2. Open `http://127.0.0.1:8799/og-image.html` at a 1200×630 viewport and
   capture it (headless tool), saving exactly 1200×630.
3. Save the result as `public/og-image.png`.

To rebuild `logo-transparent.png` from `public/logo.png`, knock out near-white
pixels (R,G,B all > 232 -> alpha 0) with `sharp`, then `.trim()`.
```

- [ ] **Step 5: Build and confirm the og image is served**

`npm --prefix "C:\Users\joseg\Documents\ai-safety-colombia-website" run build`, then confirm `dist/og-image.png` exists and is the new light image (spot-check by serving `dist/` and navigating to `http://127.0.0.1:8799/og-image.png`).
Expected: build exits 0; the served image is the light card.

- [ ] **Step 6: Commit**

```
git -C "C:/Users/joseg/Documents/ai-safety-colombia-website" add scripts/og/og-image.html scripts/og/README.md public/og-image.png
git -C "C:/Users/joseg/Documents/ai-safety-colombia-website" commit -m "feat(redesign): regenerate light-theme og-image"
```

---

### Task 14: Full-site verification, then user-gated deploy

**Files:** none modified (verification + release)

- [ ] **Step 1: Clean build**

`npm --prefix "C:\Users\joseg\Documents\ai-safety-colombia-website" run build` — exit 0, all 14 route folders present in `dist/`.

- [ ] **Step 2: Full visual QA across all 14 routes at three breakpoints**

Serve `dist/` (`py -m http.server 8799 --bind 127.0.0.1 -d dist`). For every one of the 14 routes, screenshot at widths 390, 820, 1280 and check against the spec's "Homepage Section Design" and the page-specific Expected criteria from Tasks 4–12. Confirm: light canvas everywhere; Instrument Sans loaded (no fallback flash on reload); navbar white; hero green accent word; WhatWeDo editorial rows; colored journey pills; MetricsBar + Footer the only dark blocks; no generic card grids anywhere; contact form light and legible.

- [ ] **Step 3: WCAG AA contrast spot-check**

Verify, using the rendered pages: body/muted text (`#5B5F5B` on `#FFFFFF`), links (`#15803D` on `#FFFFFF`), green text/numerals where used as text are `#15803D` not `#2BD576`, dark-block text (`#9A9A9A`/`#FFFFFF`/`#2BD576` on `#101010`), and that no small text uses vivid green/yellow on white. All interactive elements and body text must meet AA. Fix any violation in the owning component/page and re-run its task's Verify Recipe before continuing.

- [ ] **Step 4: og-image final check**

Serve `dist/`, navigate to `http://127.0.0.1:8799/og-image.png`: expect HTTP 200, a light 1200×630 card.

- [ ] **Step 5: Present results to the user and request deploy approval**

Summarize: build status, screenshots reviewed, any contrast fixes, og status. Then ask the user explicitly:

> "Redesign complete on branch `apart-redesign`, build green, 14 routes visually verified, og-image regenerated. Ready to merge to `master` and push (Vercel will auto-deploy to https://aisafetycolombia.org). Approve the deploy?"

Do **not** proceed to Step 6 without explicit user approval (the user controls when to push).

- [ ] **Step 6: On approval — merge and push**

```
git -C "C:/Users/joseg/Documents/ai-safety-colombia-website" checkout master
git -C "C:/Users/joseg/Documents/ai-safety-colombia-website" merge --no-ff apart-redesign -m "feat: Apart-style redesign"
git -C "C:/Users/joseg/Documents/ai-safety-colombia-website" push origin master
```

- [ ] **Step 7: Verify the live site**

After Vercel auto-deploys, load `https://aisafetycolombia.org` (and `/en/`) in Playwright at width 1280: confirm the live site is the new light Apart theme and `https://aisafetycolombia.org/og-image.png` returns the new light card (HTTP 200, 1200×630). Report the live result to the user.

---

## Self-Review (completed during authoring)

**Spec coverage:** Palette/tokens → Task 2. Instrument Sans + theme-color → Task 3. Navbar §1 → Task 4. HackathonBanner §2 → Task 5. Hero §3 → Task 6. WhatWeDo Option B §4 → Task 7. Programas journey §5 → Task 8. MetricsBar dark §6 → Task 9. Footer dark §8 → Task 10. Join section §7 → cascades via tokens + `.btn` (verified visually in Tasks 7/8/14; `index.astro` `.join-*` rules already token-driven, no change needed). All-routes audit + `contacto` form + programas/recursos `.grid-3`/`.card` → Tasks 11–12. og-image regeneration → Task 13. `npm run build`, 14-route QA, AA check, og 200/dimensions, deploy → Task 14. No spec requirement is unmapped.

**Placeholder scan:** No TBD/TODO. Every code step shows the full file content or an exact find/replace with literal code. Verification steps give exact commands and explicit Expected criteria.

**Type/name consistency:** Editorial classes (`editorial`, `editorial-row`, `editorial-num`, `editorial-bar`, `editorial-tx`, `is-green|is-coral|is-blue|is-yellow`) are defined once in `global.css` (Task 2) and reused consistently in Tasks 7, 11, 12. Token names (`--accent-green`, `--green-text`, `--accent-coral`, `--accent-blue`, `--accent-yellow-line`, `--hairline`, `--border`, `--text-*`) defined in Task 2 and referenced unchanged thereafter. `.btn-dark` defined in Task 2, first used in Task 4. The legacy `--accent-red` alias is preserved so `hackathon.astro`'s untouched `.event-time` keeps working.

**Scope:** Single coherent re-skin of one static site — appropriate for one plan.
