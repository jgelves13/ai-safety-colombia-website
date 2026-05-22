# AI Safety Colombia — Website Onboarding

Everything you need to work on the AI Safety Colombia website effectively. If you opened this as a Claude Code shared guide, this file is now context for your session: skim it, then start.

## What this is

The public website for **AI Safety Colombia**, a Bogotá-based community for safe and beneficial AI. Bilingual (Spanish default, English secondary). Live at **https://aisafetycolombia.org**.

Current focus areas in the codebase: the Global South AI Safety Hackathon (Jun 19-21 2026), events, discussion groups, and learning resources.

## Get it running

```bash
git clone https://github.com/jgelves13/ai-safety-colombia-website.git
cd ai-safety-colombia-website
npm install
npm run dev        # http://localhost:4321
```

Requires Node 22+ (developed on v22.14).

| Command | What it does |
|---|---|
| `npm run dev` | Local dev server with hot reload |
| `npm run build` | Static build to `dist/` |
| `npm run check` | Astro + TypeScript type check |
| `node --test` | Run the test suite (23 tests) |

## Stack

- **Astro 5**, static output (`output: 'static'`). No React/Vue: plain `.astro` components.
- **TypeScript**, vanilla CSS (no Tailwind). Design system lives in `src/styles/global.css`.
- **i18n**: `defaultLocale: 'es'` (no URL prefix), `en` served under `/en/`. Config in `astro.config.mjs`.
- **Hosting**: Vercel, auto-deploys on every push to `master`.

## Repo map

```
src/
  pages/          Routes. ES at root, EN mirrored under en/
    index.astro · sobre.astro · eventos.astro · hackathon.astro
    involucrate.astro · recursos.astro · contacto.astro
    en/index.astro · en/about.astro · en/events.astro · ...
    preview/      Local-only design experiments (gitignored, never deployed)
  components/     Astro components (Navbar, Hero, EventCard, HackathonContent, ...)
  data/           Content as JSON: events, courses, hackathon, getInvolved, learn
  i18n/ui.ts      ALL UI strings (es + en blocks) + route path mappings
  layouts/        BaseLayout.astro (shared shell)
  styles/global.css   Design system: CSS variables, shared classes
  utils/          Helpers: events, countdown, contactMailto, eventTypes
  assets/         Images processed by Astro (events, learn, resources)
public/           Static assets served as-is
docs/superpowers/ Past design specs + plans — read these for design intent
test/             node:test suites
```

## Where content lives

Edit data and translations, **not** hardcoded strings in components:

- **Page copy / UI labels** → `src/i18n/ui.ts` (every key must exist in both `es` and `en`).
- **Events** → `src/data/events.json` (fields: `slug, type, date, time, titleEs/En, descEs/En, venueEs/En, whyEs/En, flyer, instagramUrl, featured`).
- **Hackathon** → `src/data/hackathon.json` (tracks, prizes, judges, agenda, hubs).
- **Courses / learning** → `src/data/courses.json`, `src/data/learn.json`.
- **Get Involved** → `src/data/getInvolved.json`.

## Conventions that matter

**Bilingual parity is enforced.** Every route exists in both `es` and `en`. Every key in `ui.ts` must exist in both locale blocks: `test/i18n-keys.test.js` fails the build if not. When you add a new ES route, also add the EN file under `src/pages/en/` and register the path pair in `esEnPaths` in `src/i18n/ui.ts` (drives the language toggle).

**People are verified-only.** This site lists real judges, speakers, and partners. Only publish facts you can verify from a primary source. Never facial-scrape photos: use officially provided or properly licensed images.

**Voice.** Center participants from the region. Avoid savior framing ("brings AI safety to the Global South"). Spanish copy: no em dashes in paragraphs (use colons, commas, periods); currency as `USD 3.000`. English copy: currency as `US$3,000`.

**Design signatures** (Apart-inspired): floating pill navbar, solid-green featured block, off-white card surfaces, mono uppercase labels, `PartnerStrip`, hand-drawn marker motif. Match the existing look; check `docs/superpowers/specs/` for the design rationale.

**Content Security Policy.** `vercel.json` has a strict CSP. If you add an external script, font, iframe, or API call, you must add its origin to the matching directive (`script-src`, `frame-src`, `connect-src`, etc.) or it will silently break in production while working locally.

## Git & deploy workflow

You push **directly to `master`**. Each push triggers a production deploy on Vercel within ~1 minute.

Because there is no PR review gate, **always verify before pushing**:

```bash
npm run check && node --test && npm run build
```

All three must pass clean. Then:

```bash
git add -A && git commit -m "type(scope): summary" && git push
```

Commit style follows the existing history: `fix(layout): ...`, `content(about): ...`, `feat(events): ...`. After pushing, confirm the deploy at https://aisafetycolombia.org.

The `swiss-redesign` branch is an old design exploration: ignore it, work on `master`.

## Using Claude Code on this repo

- This repo has no `CLAUDE.md`. Point Claude at this file, or run `/init` to generate one.
- Good first prompts: "map the routing and i18n setup", "add a new event to events.json", "the hackathon countdown is wrong, debug it".
- Tell Claude to run `npm run check && node --test && npm run build` before declaring anything done.
- `src/pages/preview/` is gitignored design-scratch space: safe to experiment there.

## Access you need from Jose

- **GitHub**: collaborator invite on `jgelves13/ai-safety-colombia-website` (send Jose your GitHub username).
- **Vercel**: add you to the project so you see deploy logs and preview URLs.
- No API keys or `.env` are required: the site is fully static.

## Quick reference

| | |
|---|---|
| Live site | https://aisafetycolombia.org |
| GitHub | https://github.com/jgelves13/ai-safety-colombia-website |
| Working branch | `master` (direct push) |
| Local dev | `npm run dev` → localhost:4321 |
| Pre-push gate | `npm run check && node --test && npm run build` |
| Maintainer | Jose (josegelves12@gmail.com) |
