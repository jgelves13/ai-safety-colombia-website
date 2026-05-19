# Apart-Inspired Whole-Site Refresh — Design Spec

**Date:** 2026-05-19
**Status:** Approved (Jose, "go ahead")
**Scope:** Whole site (all 14 routes) · Boldness: Moderate · Hand-drawn motif: site-wide

## Goal

Bring five Apart Research design signatures into aisafetycolombia.org so the
two organizations read as visually related (AISC runs the Bogotá hub of
Apart's Global South AI Safety Hackathon), while keeping AISC's own green and
its current heading font. AISC must not become an Apart clone.

## Context (verified current state)

From a full source audit of `C:\Users\joseg\Documents\ai-safety-colombia-website`:

- The site **already uses Instrument Sans** (Apart's exact typeface), loaded
  via Google Fonts in `src/layouts/BaseLayout.astro:41`. "Keep current font"
  therefore already aligns with Apart for headings/body.
- `--bg-secondary: #F7F7F5` (Apart's exact card off-white) **already exists**
  as a token in `src/styles/global.css`. `--bg-elevated: #F1F1EE` also exists.
- The **Apart Research logo already lives in the repo** at
  `src/assets/resources/apart.png` (used by `ResourcesContent.astro`). No new
  asset or download is needed for the partner strip.
- The current navbar (`src/components/Navbar.astro`) is a **full-width fixed
  bar** (`.navbar { position:fixed; background:#FFFFFF; border-bottom:1px
  solid var(--hairline) }`). A `.navbar-pill` flex container exists inside it
  but is not visually a floating pill. The desktop CTA is `btn-dark` → `/contacto/`.
- 14 routes (7 ES + 7 EN). Build target: 14 pages. Tests: 21 cases across
  `test/{hackathon,events,contactMailto,courses,learn}.test.js` (native
  `node:test`). `npm run check` (astro check) is the type gate.
- Tokens, `.btn*`, `.section(.alt)`, `.container`, `.section-title`,
  `.editorial*`, `.card`, `:focus-visible`, and a global
  `@media (prefers-reduced-motion: reduce)` block all exist in `global.css`.
- No `@fontsource` and no `sharp` dependency — web fonts are loaded via
  Google Fonts `<link>` in `BaseLayout.astro` (the convention to follow).

## The reconciled tension

"Moderate" boldness and "hand-drawn marker illustrations as a site motif"
pull opposite ways. **Reconciliation:** keep color and typography
conservative (AISC `--accent-green #2BD576`, Instrument Sans retained, **no**
Apart `#46FF99`/`#0000EE` blue, **no** Instrument Sans swap since it is
already the font); introduce the hand-drawn motif as the single bold element,
rendered in AISC's own palette. If the motif reads too loud after build, the
fallback is to scope it to the hackathon page only — a one-line component
usage change, not a redesign.

## Design — six workstreams

### A. Floating pill navbar (`src/components/Navbar.astro`, all 14 routes)

- `.navbar` becomes a transparent fixed wrapper (remove `background:#FFFFFF`
  and `border-bottom`). `.navbar-pill` becomes the visible floating element:
  white fill, `border-radius: 20px`, soft shadow
  (`0 4px 24px rgba(16,16,16,0.08)`), inset from the top
  (`margin: 0.875rem auto 0`) and horizontally constrained to
  `var(--max-width)` with side gutters so it visibly floats over content.
- Scrolled state: a small module `<script>` toggles `.is-scrolled` on the
  pill past ~8px scroll → slightly deeper shadow and tighter vertical padding.
  Motion respects the existing reduced-motion block (transitions only).
- CTA pill: the single right-side CTA becomes the AISC **green** primary pill
  (reuse `.btn .btn-primary`, not Apart's blue-on-green), labelled
  "Únete" / "Join" via new i18n keys `nav.cta`, target `localePath(locale,
  '/involucrate/')` (the natural "join the community" page; mirrors Apart's
  "Get Started" pill reinforcing the primary action). The language toggle and
  hamburger are preserved exactly. The mobile sheet (`.mobile-nav`) keeps the
  contact link, so contact remains reachable.
- Verify content clearance: `PageHero` uses `padding: 9rem 1.5rem 3rem` top
  and the homepage Hero has its own top offset; the floating pill's total
  occupied height (inset + pill) is ~the same as the old bar, but the build
  visual sweep at 390/820/1280 px must confirm no content is hidden under the
  pill on every route (adjust the top offset token if needed).

### B. Solid-color featured block (one per page, where a single hero CTA exists)

- Add a reusable utility `.featured-block` to `global.css`: solid
  `var(--accent-green)`, `color: #101010`, `border-radius: 20px`, generous
  padding, no border. The `#101010`-on-`#2BD576` pairing is already verified
  WCAG-AA on the existing Bogotá hub block — reuse it, do not re-derive.
- Apply to exactly **one** block per page (Apart's discipline: featured =
  solid, everything else off-white):
  - **Homepage** (`src/pages/index.astro` + `/en/`): the join-section CTA
    band (index lines ~34–50) becomes a `.featured-block`.
  - **Homepage** `HackathonBanner.astro`: replace the pale
    `linear-gradient(100deg,#eafff2,#e7f6ff)` `.banner-card` with the solid
    green featured treatment; countdown number colour `--green-text` →
    `#101010` for contrast on green.
  - **Hackathon page** (`HackathonContent.astro`): the final
    register/CTA band (`hackathon.ctaBand*`) becomes the page's one
    `.featured-block` (the hero stays as-is to avoid two solid blocks).
  - **Events page** (`EventsPage.astro`): the single featured/next upcoming
    event highlight becomes a `.featured-block`; past events stay off-white
    cards.
- Other pages (about, resources, get-involved, contact) keep their existing
  single prominent CTA; promote that one to `.featured-block` only where a
  natural hero CTA already exists, otherwise leave unchanged (no invented
  blocks).

### C. Off-white card surface refinement (card components, site-wide)

- Add a `--card-surface` token. On **white** sections set it to
  `var(--bg-secondary)` (#F7F7F5); the existing `1px var(--border)` outline
  keeps cards legible. Bump card radius to `20px` where currently 16/18px.
- **Critical caveat:** `.section.alt` already uses `--bg-secondary` as its
  background. Cards placed on an `.alt` section must NOT also be
  `--bg-secondary` (they would vanish). Rule for the plan: for each card
  component, audit its host section; cards on `.alt` sections use
  `var(--bg-elevated)` (#F1F1EE) or remain `#FFFFFF`. This is handled
  per-component, not via a single blind global swap.
- Components in scope: `.learn-card` (StartHere), `.res-card`
  (ResourcesContent), `.event-card` (EventCard), generic `.card`, and
  hackathon section cards. `.banner-card` is excluded (it becomes the
  featured solid block in B).

### D. Mono dates & labels (accent only, site-wide)

- Add `--font-mono` token = a **system monospace stack** (no web font, zero
  network cost): `ui-monospace, 'SF Mono', 'Cascadia Mono', 'Roboto Mono',
  'IBM Plex Mono', Menlo, Consolas, monospace`.
- Apply `font-family: var(--font-mono)` to: kicker/eyebrow labels
  (`.learn-kind`, `.event-tag`, hackathon kicker), event dates
  (`EventCard .event-meta time`), and the hackathon countdown number + label
  (`HackathonContent .hk-count-*`, `HackathonBanner .countdown-*`). Add
  `font-variant-numeric: tabular-nums` to countdown numbers so digits do not
  jitter. Body and headings keep Instrument Sans.

### E. Partner / collaborator strip (`src/components/PartnerStrip.astro`, new)

- New component, props `{ locale }`. Renders an i18n heading (`partners.title`
  = "En colaboración con" / "In collaboration with") and a row of
  desaturated logos via the existing `astro:assets` glob pattern on
  `../assets/resources/*`. Only **verified** partners: Apart Research
  (`apart.png`, AISC is a confirmed Apart hackathon hub). Logos render
  `filter: grayscale(1); opacity: 0.55` → full colour on hover/focus.
- Layout must look intentional with a single logo and scale to N logos
  (centered flex row, generous gap). Placed on the homepage (above the
  footer/join area) and the hackathon page. `aria-hidden` is NOT used (the
  partnership is meaningful content); logos get descriptive `alt`.

### F. Hand-drawn marker motif (`src/components/MarkerMotif.astro`, new)

- New decorative component (`aria-hidden="true"`, `role="presentation"`).
  Inline SVG: 3–4 overlapping irregular ("hand-drawn") circles filled with
  AISC palette tokens (`--accent-green/-yellow/-blue/-coral`) at low opacity,
  with hand-lettered ALL-CAPS labels.
- Hand-letter font: add **`Caveat`** (single weight 400) to the existing
  Google Fonts `<link>` in `BaseLayout.astro` (same mechanism as Instrument
  Sans, `display=swap`; one extra family only). Add `--font-hand` token.
- Prop-driven variants (e.g. `variant: 'hero' | 'divider'`) and i18n label
  text passed by the caller. Used on: homepage hero accent, one section
  divider, hackathon "Qué es" section, About page motif. No animation
  (consistent with Moderate + the reduced-motion block).

## i18n additions (`src/i18n/ui.ts`, both `es` and `en`)

- `nav.cta` → "Únete" / "Join"
- `partners.title` → "En colaboración con" / "In collaboration with"
- `motif.*` labels as needed for the marker graphics (ALL-CAPS source
  strings; component applies casing). Exact keys finalized in the plan.

## Explicitly out of scope (deferred)

- Scroll-reveal animations and the vertical scroll-progress bar (not
  selected; would push past "Moderate"). Trivial to add later.
- Apart's `#46FF99`/`#0000EE` blue-on-green CTA palette and any font swap
  (the site already runs Instrument Sans).
- New routes, new partners beyond verified Apart Research, any change to the
  Fernando memorial tribute (`about.memoriam.tribute`).

## Verification

1. `npm run build` → exactly **14 pages**, clean, no new/dropped routes.
2. `npm run check` (astro check) → **0 errors** (pre-existing benign
   `Navbar.astro` unused-import hint acceptable; do not regress beyond it).
3. `node --test test/*.test.js` → **21/21 pass** (no JS/data behaviour
   changed by visual work).
4. Visual sweep at 390 / 820 / 1280 px on all relevant routes (`/`, `/en/`,
   `/hackathon/`, `/en/hackathon/`, `/eventos/`, `/en/events/`, `/sobre/`,
   `/recursos/`, `/involucrate/`, `/contacto/` + EN equivalents):
   - Floating pill clearly floats; nothing hidden beneath it; scrolled state
     works; `Tab` shows the focus ring on pill links/CTA.
   - Exactly one solid green featured block per page; `#101010` text legible
     on `#2BD576`.
   - Cards are off-white and legible on both white and `.alt` sections (no
     vanishing).
   - Mono face on dates/labels; countdown digits do not jitter.
   - Partner strip looks intentional with the single Apart logo; colour on
     hover.
   - Marker motif renders in AISC palette with the hand-letter font; no
     layout shift; reduced-motion safe.
5. After all reviews pass: autonomous deploy to `master` → Vercel; verify
   live HTTP 200 on all 14 routes; update memory + Obsidian Vault per
   CLAUDE.md.

## Critical files

| File | Change |
|---|---|
| `src/components/Navbar.astro` | Floating pill restyle, scrolled-state script, green "Únete/Join" CTA pill |
| `src/styles/global.css` | `--card-surface`, `--font-mono`, `--font-hand` tokens; `.featured-block` utility; mono on label classes |
| `src/layouts/BaseLayout.astro` | Add `Caveat` to the Google Fonts link |
| `src/components/HackathonBanner.astro` | Pale gradient card → solid green featured block; mono countdown |
| `src/components/HackathonContent.astro` | CTA band → `.featured-block`; mono countdown/kicker |
| `src/components/EventsPage.astro` | Featured upcoming event → `.featured-block` |
| `src/components/EventCard.astro` | Off-white surface, mono `<time>`/tag |
| `src/components/StartHere.astro` | Off-white `.learn-card`, mono `.learn-kind` |
| `src/components/ResourcesContent.astro` | Off-white `.res-card` (alt-section caveat) |
| `src/components/PartnerStrip.astro` | **new** — verified partner logo strip |
| `src/components/MarkerMotif.astro` | **new** — hand-drawn marker SVG motif |
| `src/pages/index.astro` + `src/pages/en/index.astro` | Join band → featured block; add PartnerStrip + MarkerMotif |
| `src/pages/hackathon.astro` + `src/pages/en/hackathon.astro` | Add PartnerStrip; MarkerMotif via HackathonContent |
| `src/pages/sobre.astro` + `src/pages/en/about.astro` | Add MarkerMotif motif |
| `src/i18n/ui.ts` | `nav.cta`, `partners.title`, `motif.*` (es+en) |
