# AI Safety Colombia — Apart Research-style redesign

**Date:** 2026-05-16
**Status:** Approved (design), pending implementation plan
**Site:** https://aisafetycolombia.org (Astro 5.x, static, bilingual ES default + `/en/`)

## Problem

The live site is dark, single-green, and minimal. The intent was an
"Apart Research-inspired" look, but apartresearch.com's actual design is
**light, multi-color, and playful**. The current site keeps the dark theme,
which is the main reason it does not feel similar to Apart. The "Qué hacemos"
section in particular reads as a generic AI card grid.

## Goals

- Re-skin the site into Apart Research's actual visual language: light
  canvas, vivid multi-color accents, bold tight typography, playful but
  serious.
- Keep AI Safety Colombia's green as the **primary brand color** (the
  tetrahedron logo identity), with Apart's other accents as secondary.
- Replace generic card patterns with confident, distinctive treatments.
- Keep all existing content, sections, pages, and information architecture.

## Non-Goals (YAGNI)

- No information-architecture changes; no new pages or sections.
- No content/copy rewrites; no i18n string changes.
- No logo redesign.
- No backend/form-logic changes (site stays fully static).
- Not mirroring Apart's specific sections (pillar circles, persona "Get
  Started" grid, partner-logo strip) — user chose "restyle existing
  sections", not "mirror Apart's IA".

## Locked Decisions

| Decision | Choice |
|---|---|
| Direction | A — Full Apart style (light, multi-color, playful) |
| Structure | Restyle existing sections; same content & page set |
| Approach | #2 — design tokens + signature-component polish |
| Color model | Green-primary; coral/blue/yellow as secondary accents |
| "Qué hacemos" | Option B — editorial numbered rows (no boxes) |
| Typeface | Instrument Sans (Apart's actual font), replacing Space Grotesk |
| og-image | Regenerate in the new light theme as part of this work |

## Design System

### Palette (extracted from apartresearch.com's live styles)

| Role | Hex | Notes |
|---|---|---|
| Background | `#FFFFFF` | Page canvas |
| Panel / section alt | `#F7F7F5` | Apart's exact off-white |
| Ink (text primary) | `#101010` | Headlines & body |
| Text muted | `#5B5F5B` | Secondary text (≈5:1 on white, AA OK) |
| Border | `#E6E6E1` | Hairlines, dividers |
| **Green — PRIMARY** | `#2BD576` | Brand. Used as fill (with ink text) |
| Green — text/link | `#15803D` | Accessible green for text/links on white (AA) |
| Coral | `#FF5645` | Secondary accent |
| Blue | `#00BBFF` | Secondary accent |
| Yellow — fill | `#FFE246` | Fills only, with ink text |
| Yellow — line/text | `#F5C400` | Borders/numerals where contrast on white matters |

**Accessibility rule:** vivid green/yellow are never used as small text on
white. Green text/links use `#15803D`; color fills always pair with `#101010`
ink. Target WCAG 2.1 AA for body text and interactive elements.

### Typography

- Family: **Instrument Sans** (Google Fonts, weights 400/500/600/700),
  headings and body. Loaded via `<link>` with `preconnect` in BaseLayout.
- Headings: weight 500–600, letter-spacing ≈ `-0.04em`, large scale
  (hero H1 `clamp(...)` up to ~60px), line-height ~1.04.
- Body: weight 400, ~15–16px, line-height ~1.6.

### Base components (global.css)

- Buttons: pill (`border-radius:999px`). Primary = green fill + ink text;
  secondary = white + 1px border; dark = `#101010` fill + white text.
- Sections: white default, `#F7F7F5` for alternating bands.
- Principle: **no generic card grids**. Where the current code uses
  `.grid-3`/`.card`, replace with editorial/list treatments consistent with
  the "Qué hacemos" Option B style.

## Homepage Section Design

All current sections kept; skin only.

1. **Navbar** — white, bottom hairline (`#EFEFEA`), muted links, `ES·EN`
   pill toggle, black pill "Contacto →".
2. **HackathonBanner** — rounded card, mint→blue gradient
   (`linear-gradient(100deg,#eafff2,#e7f6ff)`), green tag pill, title, meta
   line, green pill CTA + countdown number in `#15803D`.
3. **Hero** — light, subtle dot-grid texture (`#e2e2dc` dots on white), big
   tight headline with the accent word ("Safety") in green, muted subtitle,
   two pill CTAs (primary green / secondary outline).
4. **Qué hacemos → new `WhatWeDo.astro`** — Option B: section title, then
   three rows (Investigación / Educación / Comunidad). Each row: large
   colored numeral `01`/`02`/`03` (green/coral/blue), a thin vertical
   color bar, heading + paragraph. Hairline dividers between rows. No boxes.
5. **Programas (journey)** — step pills "Curioso → Aprendiendo →
   Participando → Contribuyendo", each with a colored numbered circle
   (blue/green/yellow/coral) and arrows between, on a `#F7F7F5` band.
6. **MetricsBar** — deliberate dark high-contrast block (`#101010`,
   rounded) on the light page; big green numerals, uppercase muted labels.
   (Apart uses this "one dark moment" device; also preserves a nod to the
   old look.)
7. **Únete a la comunidad** — centered; ghost pill buttons (WhatsApp,
   Telegram) + primary green pill (Newsletter).
8. **Footer** — dark `#101010` retained for grounding, restyled: white
   section headings, muted links, logo lockup.

## Architecture / Files Changed

Static Astro site; the design system is CSS-driven. No data flow or error
handling concerns (no runtime logic; forms unchanged).

- `src/styles/global.css` — rewrite `:root` tokens + base classes
  (palette, Instrument Sans, type scale, pill buttons, section utilities,
  remove dark defaults).
- `src/layouts/BaseLayout.astro` — swap font `<link>` Space Grotesk →
  Instrument Sans; update `theme-color` meta to light. og-image meta
  unchanged (file regenerated separately, same path).
- `src/components/Hero.astro` — restyle to light hero per §3.
- `src/components/Navbar.astro` — restyle per §1.
- `src/components/Footer.astro` — restyle per §8.
- `src/components/HackathonBanner.astro` — restyle per §2.
- `src/components/MetricsBar.astro` — restyle per §6.
- **New** `src/components/WhatWeDo.astro` — extract the "Qué hacemos" block
  out of `src/pages/index.astro` (currently inline `.grid-3`/`.card`,
  ~lines 20-40) and build as Option B. Bilingual via existing `t()`/locale
  props, consistent with other components. Cleaner boundary than inline.
- `src/pages/index.astro` (and `src/pages/en/index.astro` if separate) —
  use `<WhatWeDo>`; remove old inline card markup.
- **Audit + touch-up** the remaining routes so bespoke markup matches the
  new system: `sobre`, `hackathon`, `programas`, `recursos`, `involucrate`,
  `contacto` and their `/en/` counterparts (7 pages × 2 locales). Known
  hotspots: `contacto` form inputs (need light styling); any
  `.grid-3`/`.card` usage in `programas`/`recursos` → convert to editorial
  treatments per the no-generic-cards principle.
- `scripts/og/` — regenerate `public/og-image.png` (1200×630) in the new
  light theme: white bg, Instrument Sans, ink headline with green accent,
  the tetrahedron logo (original `logo.png` is already on white — usable
  directly), tagline, domain. Update `og-image.html` template + README.

## Verification

- `npm run build` succeeds. **Build in the local Documents copy**, not on
  Google Drive (npm install fails on Drive — known constraint).
- Visual QA of all 14 routes at mobile / tablet / desktop breakpoints.
- WCAG AA contrast check on text and interactive elements (especially
  green/yellow usage rules above).
- Confirm Instrument Sans loads (preconnect present; no FOIT regressions).
- Confirm `og-image.png` still served and now light: HTTP 200, 1200×630.
- Deploy: commit + push to `master` → Vercel auto-deploy → verify live at
  https://aisafetycolombia.org.

## Risks

- Cascade misses: a re-skin via shared tokens can leave bespoke per-page
  markup looking off. Mitigated by the explicit all-routes audit step.
- Contrast regressions from vivid colors. Mitigated by the green/yellow
  usage rules and an explicit AA check.
- Drive/npm constraint: build/test only in the local Documents copy.
