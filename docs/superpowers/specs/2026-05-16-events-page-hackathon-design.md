# Events Page + Hackathon Enrichment — Design Spec

**Date:** 2026-05-16
**Site:** aisafetycolombia.org (Astro 5.x, static, bilingual ES default / EN under `/en/`)
**Status:** Approved (design), pending implementation plan

---

## 1. Goal

Two deliverables on the existing post-redesign site:

1. **New Events page** (`/eventos/` + `/en/events/`) showcasing AI Safety Colombia's past (and any upcoming) events, sourced from the org's Instagram (@aisafetycolombia).
2. **Rebuilt Hackathon page** populated with the real Apart Research "Global South AI Safety Hackathon" sprint content, replacing the current thin placeholder data.

Both must match the shipped Apart-style light redesign (white canvas, Instrument Sans, green `#2BD576` primary, `#15803D` accessible green text, coral `#FF5645` / blue `#00BBFF` / yellow-line `#B07A00` accents, editorial visual language, single "one dark moment" device).

Route count goes from 7×2=14 to **8×2=16**.

---

## 2. Events Page

### 2.1 Routing, nav, i18n

- New pages: `src/pages/eventos.astro` (ES) and `src/pages/en/events.astro` (EN). Both thin wrappers that render a shared `Events` body from `events.json` so content stays in sync.
- `src/i18n/ui.ts`:
  - Add to `esEnPaths`: `'/eventos/': '/events/'` (gives `localePath`/`altHref` the slug mapping).
  - Add UI keys: `nav.events` → `Eventos` (es) / `Events` (en); plus section labels `events.upcoming` (`Próximos eventos` / `Upcoming`), `events.past` (`Eventos pasados` / `Past events`), `events.hero.title`, `events.hero.subtitle`, `events.viewInstagram` (`Ver en Instagram` / `View on Instagram`), `events.empty` fallback.
- `src/components/Navbar.astro`: add an `{ page:'events', href:localePath(locale,'/eventos/'), label:t(locale,'nav.events') }` entry to the `links` array, and add `'events'` handling to `isActive()`. Place it after `hackathon` (events relate to programming/hackathon).
- `BaseLayout` props used: `currentPage="events"`, localized `title`/`description`.

### 2.2 Data model — `src/data/events.json`

Array of event objects. Schema:

```json
{
  "slug": "riesgos-ia-said-saillant",
  "type": "charla",
  "date": "2024-08-16",
  "time": "18:00",
  "titleEs": "Riesgos de la Inteligencia Artificial",
  "titleEn": "Risks of Artificial Intelligence",
  "descEs": "Charla introductoria con Said Saillant (PhD). Organizada con Altruismo Eficaz Uniandes.",
  "descEn": "Introductory talk with Said Saillant (PhD). Co-hosted with Effective Altruism Uniandes.",
  "venueEs": "Universidad de los Andes",
  "venueEn": "Universidad de los Andes",
  "flyer": "riesgos-ia-said-saillant.jpg",
  "instagramUrl": "https://www.instagram.com/aisafetycolombia/p/C-nthmtxIrQ/",
  "featured": false
}
```

- `type` enum (drives the accent color of the type tag): `charla` (green), `panel` (coral), `conversatorio` (blue), `cena` (ink/dark), `taller` (green), `curso` (yellow-line). A `typeLabelEs/En` is derived from `type` via a small map in the component (not stored per row).
- `date` ISO `YYYY-MM-DD`. `time` optional (`HH:MM`, 24h). Upcoming vs past is computed at **build time**: `new Date(date) >= today` → upcoming.
- `flyer` is a filename in `public/events/`. Images are committed to the repo (Instagram CDN URLs expire and cannot be hot-linked).
- `instagramUrl` links to the source post.
- Order in the file is newest-first for editing convenience; the page sorts at build time regardless: **Próximos eventos** ascending (soonest first), **Eventos pasados** descending (most recent first).

### 2.3 Data capture (build-prep task, before wiring the page)

The Instagram profile is public and readable via the Chrome extension's accessibility tree (confirmed). Implementation includes a data-capture task:

- For each AI Safety Colombia **own event** post, open the post, read the full caption, extract exact title / date (resolve the year from post recency) / time / venue / 1–2 line description (ES + an EN translation), screenshot the flyer, save it to `public/events/<slug>.jpg`.
- **Exclude**: pure opinion/content posts (e.g. the 2025 national AI policy post) and external-only promos that are not AIS Colombia events (e.g. Global Challenges Project in Boston). When ambiguous, include as an event only if the post announces a dated AIS Colombia activity.
- Draft `events.json` is brought back to the user for a quick factual review before the page is wired.

**Known event posts identified (caption-start + URL; full data captured during build):**

| Post | Likely type | Signal |
|---|---|---|
| `/p/C-nthmtxIrQ/` | charla | "Riesgos de la IA", vie 16 ago, Said Saillant, Uniandes |
| `/p/DNOyrukPEnp/` | conversatorio | vie 15 ago 5:00 pm, beneficios/riesgos |
| `/p/DCAiVLnvGpN/` | panel | "Gobernanza de la IA", vie 8 nov 6:00 PM |
| `/p/DGysBZPvyUb/` | cena | invitado Juan David Gutiérrez |
| `/p/DAttjF_Ro76/` | cena | invitada María Paula Mújica |
| `/p/C_0sc3mOlfX/` | charla | 1ª charla "AE en Acción", 20 sep 6:00 PM |
| `/p/DKIQoQhvoQN/` | charla/networking | EN community/collaboration post (verify) |
| (scroll) | taller | "Taller intensivo 3 días, bio + IA", sáb 31 ago 1:30–3:30 PM |
| (scroll) | curso | "Curso en Seguridad de la IA" (AISF), cierre insc. 21 ago |
| (scroll) | curso | curso 8 semanas, política para orientar desarrollo de IA |
| `/p/C-1d1GOOERs/`, `/p/C-1YEhsOHLg/` | verify | event-promo wording, confirm on open |

`/p/DXNOo7DljSh/` (2025 national AI policy) and `/p/C_OS-1oRSbM/` (Global Challenges Project, Boston) are **excluded** as non-events.

### 2.4 Page layout & component

Chosen: **Approach A, card Style 2 (flyer + editorial text)**.

- New component `src/components/EventCard.astro` — props = one event object + `locale`. Renders:
  - Flyer thumbnail on the left (fixed width, ~`96px` desktop, rounded `12px`, `object-fit:cover`, lazy-loaded, descriptive `alt`).
  - Right column: type tag (uppercase, weight 700, colored per `type`), title (`h3`), date + time + venue meta line (localized date format), one-line description, `Ver en Instagram →` link (`target=_blank rel="noopener noreferrer"`).
  - Mobile (`max-width:768px`): flyer stacks on top, full-width.
- Page body (shared, rendered by both `eventos.astro` and `en/events.astro`):
  - `hero-mini` (reuse existing pattern from contact/about): `events.hero.title` + `events.hero.subtitle`.
  - **Próximos eventos** section — only rendered if ≥1 upcoming event; list of `EventCard`s sorted by date asc.
  - **Eventos pasados** section — `EventCard`s sorted by date desc. If zero events total, show `events.empty` fallback text + link to the Instagram profile.
- Styling tokens reuse `global.css` (`--accent-green`, `--green-text`, `--accent-coral`, `--accent-blue`, `--accent-yellow-line`, `--border`, `--text-secondary`, card radius 16px). No new global tokens. Type-tag color map lives in the component's scoped style or as `is-*` class reuse.
- Add the Instagram profile URL (`https://www.instagram.com/aisafetycolombia/`) to the Footer social list and the Contact page channels (currently missing site-wide).

---

## 3. Hackathon Page Rebuild

Full rebuild of `src/pages/hackathon.astro` + `src/pages/en/hackathon.astro`, data in `src/data/hackathon.json`. Chosen: **Direction A (bold light editorial) + Direction B's dark closing CTA band**. The single dark band at page end is consistent with the redesign's "one dark moment" rule (contained, like the Footer).

### 3.1 Real source data (Apart sprint page)

From `apartresearch.com/sprints/global-south-ais-hackathon-2026-06-19-to-2026-06-21`:

- Title: **Global South AI Safety Hackathon**; dates **Jun 19–21 2026**; format **online + in-person hubs**; LATAM hubs include São Paulo, Buenos Aires, **Bogotá**, Mérida (AI Safety Colombia runs the Bogotá hub). Global sprint with Africa + Asia hubs.
- Prizes: **Latin America = 3 winning teams, US$1,000 each (US$3,000 total)**; top teams invited to the **Apart Fellowship**. (Asia 2×US$1,000, Africa 1×US$1,000 — mention LATAM as primary; others as "regional tracks worldwide".)
- Tracks (LATAM): **Technical AI Safety** and **AI Governance & Policy**.
- Eligibility: AI safety researchers/engineers, ML researchers/engineers, policy/governance researchers, software engineers, security researchers/red teamers, students & early-career.
- Submission: a **research report (PDF)** documenting approach, results, implications.
- Support: **Schmidt Sciences**. Contact: **sprints@apartresearch.com**.
- Registration: the Apart sprint page sign-up (replaces the current placeholder `https://apartresearch.com`). Store the full sprint URL in `hackathon.json` as `registrationUrl`.

### 3.2 Section order (single page)

1. **Hero** (light, gradient-to-off-white): kicker "Apart Research · Sprint del Sur Global", large two-tone headline ("Global South / **AI Safety** Hackathon", green accent word), subhead, a prize+date hook line ("US$3,000 en premios · 3 equipos LATAM · 19–21 jun 2026"), the existing countdown (kept), primary CTA "Regístrate en Apart →" + secondary "Ver bases".
2. **Qué es / What it is** — Apart Global-South framing; AIS Colombia runs the Bogotá hub.
3. **Por qué participar** — 3-step pipeline: Hackathon → Apart Fellowship → Research/placement.
4. **Dos tracks** — two cards with accent bars (green = Technical, coral = Governance).
5. **Premios** — centerpiece: US$1,000 × 3 LATAM teams, + Fellowship invitation, mentoring/review, Schmidt Sciences support (as pills).
6. **Hubs de la región** — São Paulo · Buenos Aires · **Bogotá** (highlighted) · Mérida; note Africa/Asia hubs.
7. **Quién puede participar** — eligibility as chips/pills.
8. **Agenda · 3 días** — editorial rows (Vie 19 / Sáb 20 / Dom 21) with colored day tags; kept from current schedule data, relabeled to the real flow (teams → build → submit).
9. **Dark closing CTA band** (`#101010`, white text, green button): "Forma tu equipo este junio" + "Regístrate en Apart →" + `sprints@apartresearch.com`.

Existing components retained: countdown timer logic, editorial-row pattern. Speakers/judges: keep the existing `speakers` rows (Juan Pablo Toro Ramírez confirmed); `judges` stays data-driven and may remain empty/"por confirmar" rather than inventing names.

### 3.3 `hackathon.json` changes

- Fix `registrationUrl` → real Apart sprint URL.
- Add: `tracks` (array, ES/EN label + desc), `pipeline` (3 steps ES/EN), `eligibility` (array ES/EN), `hubs` (array, `bogota:true` flag), `prizesDetail` (LATAM teams/amount + fellowship + support ES/EN), `submissionEs/En`, `contactEmail`, `whatIsEs/En`.
- Keep `date`, `endDate`, `schedule`, `speakers`, `judges`; correct `organizer` and the hero hardcoded date to read from data (remove duplication).

---

## 4. Out of Scope (YAGNI)

- Per-event detail pages / routes (Style-2 cards link straight to Instagram).
- Live Instagram embed/feed, Luma calendar integration, any CMS or build-time IG scraping automation.
- RSVP/registration forms for past events.
- Reworking the redesign's global tokens or other pages.

---

## 5. Verification

- `npm run build` succeeds, now emitting **16** pages (run in the local `C:/Users/joseg/Documents/ai-safety-colombia-website` copy; npm fails on Google Drive).
- Playwright computed-style sweep of the 2 new + 2 rebuilt routes at 390 / 820 / 1280 px (consistent with redesign QA): fonts = Instrument Sans, palette tokens correct, dark CTA band `#101010`, no layout overflow, flyer images load.
- Link check: every `instagramUrl`, the registration URL, and `sprints@apartresearch.com` resolve / are well-formed; nav + language toggle reach `/eventos/` ↔ `/en/events/` correctly via `altHref`.
- Accessibility: type-tag and text colors use the AA-safe tokens (`--green-text` `#15803D` for green text/links, `--accent-yellow-line` `#B07A00` for yellow); dark band = white/`#9A9A9A` on `#101010` (matches Footer, already accepted); flyer `alt` text descriptive.
- All flyer files present in `public/events/` and referenced filenames match `events.json`.

---

## 6. File Structure Summary

**Create:**
- `src/pages/eventos.astro`, `src/pages/en/events.astro`
- `src/components/EventCard.astro`
- `src/data/events.json`
- `public/events/*.jpg` (flyer images)

**Modify:**
- `src/i18n/ui.ts` (esEnPaths + nav/events keys)
- `src/components/Navbar.astro` (links + isActive)
- `src/components/Footer.astro` (Instagram link)
- `src/pages/contacto.astro`, `src/pages/en/contact.astro` (Instagram channel)
- `src/pages/hackathon.astro`, `src/pages/en/hackathon.astro` (full rebuild)
- `src/data/hackathon.json` (real Apart data)
- `src/styles/global.css` only if a shared event-type color helper is cleaner than scoped styles (prefer scoped; avoid new global tokens)
