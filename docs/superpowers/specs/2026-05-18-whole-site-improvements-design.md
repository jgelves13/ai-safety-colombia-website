# Whole-Site Improvement Pass — Design Spec

**Date:** 2026-05-18
**Site:** https://aisafetycolombia.org (Astro 5.x static, bilingual ES default / EN under `/en/`, 16 routes)
**Type:** Surgical, section-by-section improvements. **NOT** a redesign.

---

## Goal

Improve every section of the live site while keeping its current design language
completely intact. No new pages, no new routes, no information-architecture
changes (stays 16 routes). The site keeps shipping as a static Astro build.

## Binding principles & constraints

- **Preserve the current visual language verbatim:** white `#FFFFFF` canvas,
  Instrument Sans, green `#2BD576` primary + `#15803D` accessible green text,
  coral `#FF5645` / blue `#00BBFF` / yellow-line `#B07A00` accents, the
  editorial-row motif, the deliberately dark (`#101010`) MetricsBar + Footer,
  soft pastel-gradient cards. No new colors, no new typeface, no new layout
  system.
- **House style:** no em dashes in body copy (use colon / comma / period);
  currency ES `USD X.XXX`, EN `US$X,XXX`, never a bare `$` in Spanish;
  full ES/EN parity for every string added or changed.
- **Accessibility:** keep the existing `:focus-visible` ring and site-wide
  `prefers-reduced-motion`; add semantic landmarks where missing; never
  regress contrast.
- **Privacy:** hackathon judges and team members are published with **name +
  role/affiliation only**. No personal emails, phones, GitHub, or social
  handles for any individual, ever.
- **No regressions:** still 16 routes; `npm run build` clean; `npm run check`
  (astro check) 0 errors; `node --test test/events.test.js` 4/4; JSON-LD still
  valid; full ES/EN parity.

This spec builds on the current code inventory (components, `global.css`
tokens/classes, `src/i18n/ui.ts`, `src/data/*.json`) exactly as it ships
today; it only changes what each cluster below names.

---

## Cluster 1 — Remove numbering site-wide

**Problem:** the `.editorial-num` oversized index numerals (e.g. 01/02/03)
appear on 7+ pages (homepage `WhatWeDo`, homepage Programs pipeline,
`HackathonContent` why-rows, About Theory-of-Change, Get Involved audiences,
Programs page stages, Resources paths). Jose dislikes numbering as a design
device (durable preference).

**Design:**

- In `src/styles/global.css`, the `.editorial-row` pattern keeps its colored
  `.editorial-bar` (and the `.is-green/.is-coral/.is-blue/.is-yellow` bar-color
  modifiers) and its `<h3>` heading + body. The `.editorial-num` element and
  its mobile width rule are removed from the markup everywhere it is used; its
  CSS rules are deleted.
- Replacement marker = the bar that already exists, kept, plus the section's
  existing heading. No numerals anywhere.
- Where a section currently relies on the numeral to read as a category list
  (homepage `WhatWeDo`, About Theory-of-Change), add a small uppercase
  **kicker** eyebrow above the `<h3>`, class `.editorial-kicker`
  (`font-size:.6875rem; font-weight:800; letter-spacing:.14em;
  text-transform:uppercase;` color = the row's accent text color:
  `--green-text` for green rows, `--accent-yellow-line` for yellow rows, and
  the existing coral/blue text-safe values for those). **Kicker text reuses
  existing i18n category words already in `ui.ts`** (e.g. the Theory-of-Change
  rows already have Talent / Research / Community labels; the WhatWeDo rows
  already have Research / Education / Community). No new marketing copy is
  invented.
- Where the row's heading already *is* the category (Programs page stages, Get
  Involved audiences, Resources paths, Hackathon why-rows), no kicker is
  added: the numeral is simply removed, bar + heading + body remain.
- Homepage **Programs pipeline**: the numbered circular step pills (1–4) lose
  their numbers. The circular pill becomes a small solid accent dot (same
  per-step color), step label + text unchanged. Connector arrows between
  steps unchanged (still hidden < 768px).

**Outcome:** identical layout, rhythm, and color; zero numerals; consistent
with the green-bar + uppercase-kicker marker already used elsewhere on the site.

---

## Cluster 2 — Cross-cutting cleanup + QA

**2.1 DRY the interior hero.** About / Programs / Resources / Get Involved /
Contact (ES + EN, 10 files) each redefine a near-identical "hero-mini +
page-desc" block locally. Create `src/components/PageHero.astro`:

- Props: `title` (string, required), `desc` (string, optional), `kicker`
  (string, optional).
- Renders a `<header>` landmark containing: optional `.editorial-kicker`
  eyebrow, the `h1` using the existing interior-page hero typography, and the
  optional description paragraph using the existing `.page-desc` styling.
- Centralized padding = the current value (`9rem 1.5rem 3rem`), centered,
  `max-width` consistent with the rest of the site.
- Each of the 10 pages replaces its local hero block + local hero styles with
  `<PageHero title={...} desc={...} />`, sourcing the same i18n strings they
  use today (no copy changes in this step).

**2.2 One max-width.** The navbar container is currently 1100px while pages
use the `--max-width: 1200px` token, so the nav edge does not line up with
page content. Set the navbar container to use `var(--max-width)` (1200px).
No other layout change.

**2.3 Consistent CTA arrows.** Rule: a trailing `→` (`&rarr;`) appears only on
**primary forward CTAs** (Hero primary, HackathonBanner register, Hackathon
hero/CTA-band register, interior CTA-band primary). Secondary buttons,
in-card utility links, and **external social links** (WhatsApp / LinkedIn /
Instagram, including the restructured Join card in 4.3) carry **no** arrow.
Audit every existing `&rarr;` usage and bring it to this rule: e.g. `Hero.astro`
currently puts `&rarr;` on both its primary *and* secondary button (lines
24/27) — the secondary loses it; `index.astro` Join currently arrows both
buttons — neither keeps it once Join becomes the 4.3 social card.

**2.4 Semantic landmarks.** `Navbar.astro` root becomes `<header>` wrapping a
`<nav aria-label>`; `Footer.astro` root becomes `<footer>`; `EventsPage` and
the page section wrappers use `<section aria-labelledby>` tied to their
heading id. `BaseLayout` already provides a single `<main>`; `PageHero`
renders a `<header>` inside it. No visual change.

**2.5 Content QA (ES + EN).**
- Remove every em dash in **body copy** (`src/i18n/ui.ts`, component prose,
  `src/data/*.json` descriptions); replace with colon / comma / period.
  Exception (not a punctuation swap): the `hackathon.json` `schedule[].events[].time`
  fields currently hold a literal `"—"` placeholder. Real agenda times are out
  of scope; instead set these `time` values to `""` and have the schedule
  component omit the time element when `time` is empty (no dangling dash, no
  invented time).
- Verify/normalize currency in hackathon prizes to house style: ES `USD 1.000`
  por equipo / `USD 3.000` total LATAM; EN `US$1,000` per team / `US$3,000`
  LATAM total; no bare `$` in Spanish. (`hackathon.json` `prizesDetail` and the
  duplicate `prizes` object already follow this format — this is a confirming
  sweep plus any prose stragglers, not a rewrite.)
- **Resources dead links:** any `href` that is `#` or a placeholder becomes an
  honest non-interactive "coming soon" item: rendered as a muted `<span>`
  (not an `<a>`), with a small uppercase tag `Próximamente` (ES) /
  `Coming soon` (EN). Links that already resolve to real URLs stay as links.
- **Contact socials:** drop Twitter/X. Contact channels socials = Instagram +
  WhatsApp + LinkedIn only, using the org URLs already used elsewhere on the
  site (real WhatsApp invite `https://chat.whatsapp.com/KwE8cciX48TAVhAOHnrLaZ`,
  LinkedIn `https://www.linkedin.com/company/ai-safety-colombia`, the existing
  Instagram URL). This matches the site-wide canonical social set.

---

## Cluster 3 — Content fill

**3.1 Hackathon tracks (replace the 2 placeholders).** In
`src/data/hackathon.json`, replace the current 2-entry `tracks` array (today
keyed `labelEs/labelEn/descEs/descEn/accent`) with a 5-entry array — 4 tracks +
1 Bogotá-led track. Each entry uses this exact shape, consistent with the
file's existing bilingual `{ "es", "en" }` convention (as already used by
`eligibility`):

```json
{ "titleEs": "...", "titleEn": "...", "accent": "is-green",
  "subareas": [ { "es": "...", "en": "..." } ] }
```

`accent` cycles the existing `is-green / is-coral / is-blue / is-yellow`
classes. The 5 tracks and their subareas:

- **Track 1 — Seguridad Técnica de IA / Technical AI Safety:**
  1.1 Evaluaciones para sistemas agénticos / Evaluations for agentic systems;
  1.2 Interpretabilidad mecanicista / Mechanistic interpretability.
- **Track 2 — Seguridad de IA / AI Security:**
  2.3 Seguridad de pipelines (API/Cloud) / Pipeline security (API/Cloud);
  2.5.1 Inyección de prompts y jailbreaks / Prompt injection & jailbreaks;
  2.7 Control de IA / AI control.
- **Track 3 — IA Responsable / Responsible AI:**
  3.1 Mitigación de alucinaciones / Hallucination mitigation;
  3.2 Auditoría de comportamiento (multilingüe, intercultural) / Behavioral
  audit (multilingual, cross-cultural);
  3.4 Evaluación de impacto social / Social impact evaluation.
- **Track 4 — Gobernanza de IA / AI Governance:**
  4.1 Análisis de política y regulación de IA / AI policy & regulation
  analysis; 4.2 Auditoría y rendición de cuentas de sistemas / System
  auditing & accountability; 4.3 Monitoreo del ecosistema / Ecosystem
  monitoring.
- **Track liderado desde Bogotá / Bogotá-led track — Gobernanza de LAWS /
  LAWS governance** (sistemas de armas autónomas letales / lethal autonomous
  weapons systems).

The Tracks section keeps the existing track-card style (white card, colored
side bar). The 2-column grid becomes a responsive `auto-fit` grid so 5 cards
flow cleanly (2 cols desktop, 1 col < 768px). Subáreas render as a compact
list inside each card.

**3.2 Hackathon judges (replace the TBA fallback).** Fill the
`hackathon.json` `judges` array with the four confirmed judges, **name +
affiliation only**:

- Melissa Robles — IDB Lab & Quantil
- Catalina Bernal — BIP Colombia
- Juan Pablo Liévano — UC Berkeley
- Steve Hege — ILAPS

The existing Judges section renders these as the existing judge pills instead
of the "Jurado por confirmar / Judges to be announced" note. No emails/phones.

**3.3 About page — team + memorial.**

- **"En memoria" tribute block** (rendered before / above the team list): its
  own card using the existing soft pastel-gradient card style. Contents:
  uppercase kicker `EN MEMORIA` (ES) / `IN MEMORIAM` (EN); name **Fernando
  Avalos-López**; role `Cofundador` / `Cofounder`; affiliation
  `Investigador en alineación de IA, Apart Research` / `AI alignment
  researcher, Apart Research`; then the **locked, approved tribute paragraph**
  (verbatim, do not alter):
  - ES: "Fernando, cofundador de AI Safety Colombia, ayudó a imaginar y
    construir esta comunidad desde el principio. Su memoria sigue presente en
    lo que hacemos."
  - EN: "Fernando, a cofounder of AI Safety Colombia, helped imagine and build
    this community from the start. His memory remains present in everything we
    do."
- **"Equipo" / "Team" list** (after the tribute block): one entry —
  **Jose Gelves**, `Cofundador y organizador` / `Cofounder & organizer`,
  affiliation `Politólogo, Universidad de los Andes; investigador en política
  de IA y gobierno digital` / `Political scientist, Universidad de los Andes;
  AI & digital-government policy researcher`. Simple card/list consistent with
  the site; no photos (none provided); name + role + affiliation only. The
  current empty "our founding team combines…" promise copy is removed.
- New i18n keys `about.memoriam.*` and `about.team.*` (both locales) carry the
  exact strings above.

**3.4 Contact form — mailto fallback.** The form UI is kept. The dead
`action="https://tally.so/r/placeholder"` (`contacto.astro:50` /
`en/contact.astro:50`) is removed. On submit, a small progressive-enhancement
script composes a `mailto:` to the organization's existing contact address —
**`aisafetycolombia@gmail.com`**, the same address already linked in the
Contact channels block (`contacto.astro:21` / `en/contact.astro:21`); not a
new address — with subject and body prefilled from the Name / Email / Message
fields. No-JS fallback: that `mailto:` channel link already present on the page
is the visible escape hatch, so the form is never a dead end. No backend.

---

## Cluster 4 — Section visual refinements

**4.1 Homepage hero credibility line.** `Hero.astro` currently ends at the two
CTA buttons (no stat tiles). Add one quiet line *beneath the buttons* (no
layout change, purely additive): ES `En alianza con Apart Research · Comunidad
de más de 30 personas`; EN `In partnership with Apart Research · A community of
30+`. Both facts are grounded (Apart Research is the hackathon organizer / AI
Safety Colombia runs the Bogotá hub; "30+" matches the live MetricsBar
`Miembros` value). Style: small muted secondary text (`--text-secondary`,
~0.8125rem), centered under `.hero-actions`. New i18n key `hero.credibility`
(both locales).

**4.2 MetricsBar from data (structural only).** Today the metric array is
hardcoded in `index.astro:10-14` (`30+` Miembros · `1` Hackathon · `3`
Alianzas) and the label strings are inline Spanish (not i18n), so the EN
homepage shows Spanish labels. Fix: create `src/data/metrics.json` holding the
3 metric **values** + i18n label **keys**; move the label strings into
`ui.ts` (`metrics.*`, both locales); render the dark MetricsBar from the data
file on both homepages. **Values and the metric count are unchanged** (still
the live `30+` / `1` / `3`, 3 items) — this task only removes the hardcoding
and the ES-label-on-EN-page bug. Dark `#101010` card styling unchanged. Note
for Jose's spec review: whether the metric *values/labels* themselves should
change (e.g. the thin "1 Hackathon" tile) is a content decision, intentionally
**not** invented here — flag it, don't fabricate numbers.

**4.3 Join → community card.** Today (`index.astro:52-64`) Join is a bare
heading + two buttons: a real-invite WhatsApp link and a **dead
`href="#newsletter"`** button (`join.newsletter`). Wrap the section into a soft
pastel-gradient card (the same gradient-card style used by the Hackathon banner
/ interior CTA bands): left = heading + one short community subtitle line
(existing `join.*` copy; add one subtitle key if missing); right = button row
= WhatsApp (real invite), LinkedIn, Instagram — the canonical social set, real
URLs already used site-wide. The dead `#newsletter` button is **removed** and
the now-unused `join.newsletter` key retired from both locales. These are
external social links, so per 2.3 they carry **no** arrow. No new colors;
reuse existing button classes.

**4.4 Footer newsletter → community CTA.** Remove the dead, label-less
newsletter input + submit button (this also removes the unlabeled-input a11y
defect). Replace with a single WhatsApp/community button using the real invite
`https://chat.whatsapp.com/KwE8cciX48TAVhAOHnrLaZ`, styled like the existing
footer button. Remove the now-unused newsletter i18n keys; add
`footer.communityCta` (both locales).

---

## Explicitly out of scope (deferred)

- Any ground-up redesign, new visual system, new pages/routes, or IA changes.
- A real newsletter mailing-list backend.
- Team member photos / additional team members (only Jose + the Fernando
  tribute now; structure makes adding more later trivial).
- Real Resources URLs (kept as honest "coming soon" until Jose supplies them).
- A real Tally / form backend (mailto fallback is the agreed solution).
- Real hackathon agenda times (schedule `time` left empty/omitted, not invented).
- Changing the MetricsBar metric values/labels themselves (4.2 is structural
  only; any value change is a separate content decision for Jose).

## Verification (acceptance)

1. `npm run build` → still **16 routes**, clean, no new/removed routes.
2. `npm run check` → **0 errors**.
3. `node --test test/events.test.js` → **4/4**.
4. Grep: **no `.editorial-num`** usage remains anywhere; the homepage
   `.pipeline-num` numerals are gone (solid accent dots instead); no numeral
   markup in any de-numbered section.
5. ES/EN parity for every changed/added string; **no em dashes** in body copy
   (incl. no literal `"—"` in `hackathon.json` schedule `time`); currency per
   house style; no bare `$` in Spanish.
6. No dead `#`/placeholder links remain: Resources show "Próximamente / Coming
   soon" non-links, the homepage Join `#newsletter` button is gone, the footer
   newsletter input is gone. Contact has no Twitter/X; socials = Instagram +
   WhatsApp + LinkedIn; footer + Join show the canonical social set; every
   WhatsApp link is the real invite.
6b. MetricsBar renders from `src/data/metrics.json` on **both** homepages with
   i18n labels (EN homepage no longer shows Spanish labels); still 3 metrics,
   values unchanged.
7. Hackathon page renders the real 5 track cards + 4 named judges (no TBA);
   prizes currency formatted per house style.
8. About page renders the "En memoria" tribute card with the **verbatim**
   approved text + the Jose entry; no personal contact info anywhere.
9. JSON-LD on Events + Hackathon still valid.
10. Playwright sweep of every changed page × 390 / 820 / 1280 px: no overflow,
    no broken images, focus ring intact, landmarks present.

## Memory / Vault

The locked decisions, the de-numbering preference, the four published judges,
the contact mailto + footer-CTA + Resources-coming-soon resolutions, and the
**verbatim approved Fernando tribute text** are recorded in memory
(`project_ais_colombia_redesign.md`) and the Obsidian vault
(`Projects/AI_Safety_Colombia_Website.md`). The tribute text must not be
altered without Jose.
