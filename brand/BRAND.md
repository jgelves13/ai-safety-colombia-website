# AI Safety Colombia — Brand Book

The canonical visual identity of AI Safety Colombia. Every marketing asset (web, IG, LinkedIn, WhatsApp, print) lives downstream of this document. When this file and a tool or template disagree, this file wins.

The site itself is the live reference — every rule below is already in production at [aisafetycolombia.org](https://aisafetycolombia.org). Code source-of-truth: [`src/styles/global.css`](../src/styles/global.css). Machine-readable export: [`design-tokens.json`](./design-tokens.json).

---

## 1. Identity

AI Safety Colombia is the Colombian chapter of the global AI safety field. We build community, formación, and events for researchers, students, and professionals working on the risks of advanced AI systems — from Colombia, anchored in Colombia, not as recipients of imported expertise.

The visuals must communicate three things at once:

- **Intellectual seriousness.** This is a research field, not a tech meetup. Display type is generous; body copy is precise; mono labels frame everything as ordered, considered work.
- **Warmth and locality.** Cream paper instead of clinical white. Forest green instead of corporate blue. Hand-feel motifs (orbits, glows, line-art glyphs) instead of polished gradients.
- **Equal footing.** We collaborate with Apart Research, BlueDot Impact, OpenAI alumni, and the IDB — but we never visually frame ourselves as their junior partner. Layouts give Colombian voices the same weight as international ones.

What we **never** communicate visually: rescue narratives, generic AI imagery (glowing brains, robot hands), corporate optimism, or anything that would look at home on a SaaS landing page.

---

## 2. Color System

Source of truth: [`src/styles/global.css`](../src/styles/global.css) lines 1–34.

### 2.1 Tokens

#### Primary
| Token | Value | Role |
|---|---|---|
| `--accent-forest` | `#1F4D32` | Primary brand. Buttons, links, kickers' rule, logo green. |
| `--bg-primary` | `#FBF6EC` | Page background. Warm off-white, the "paper" of AISC. |
| `--text-primary` | `#211A12` | Body ink. Warm black, never `#000`. |

#### Supporting accents
| Token | Value | Role |
|---|---|---|
| `--accent-vermillion` | `#E5604D` | Coral. Kicker labels, urgency, urgency-CTA pills. |
| `--accent-vermillion-dark` | `#CF4A39` | Coral hover. |
| `--accent-sage` | `#4A8466` | Light green. Hover, translucent decorative shapes, soft callouts. |
| `--accent-yellow` | `#F2B705` | Sun yellow. Highlight pills inside featured blocks; color-block cards; hub callouts. |
| `--accent-forest-deep` | `#143620` | Deep green hover state for forest buttons. |

#### Surfaces
| Token | Value | Role |
|---|---|---|
| `--bg-secondary` | `#F1E8D6` | Deeper warm tint. Used on `.section.alt` band breaks. |
| `--bg-elevated` | `#FFFBF2` | Paper / card surface. Slightly brighter than `--bg-primary`. |
| `--dark-bg` | `#143620` | Footer and one-dark-moment panels. |

#### Structural
| Token | Value | Role |
|---|---|---|
| `--border` | `#E4D9C4` | Card / divider borders. |
| `--hairline` | `#EDE3D0` | Subtle in-section dividers (editorial rows). |
| `--text-secondary` | `#5A5044` | Body muted / metadata. |
| `--text-accent` | `#1F4D32` | Link color = `--accent-forest`. |
| `--dark-muted` | `#9FB3A4` | Muted text on dark panels. |
| `--dark-line` | `#2E6344` | Dividers on dark panels. |

### 2.2 Color usage matrix — what message each color carries

| Color | Carries | Forbidden uses |
|---|---|---|
| **Forest** `#1F4D32` | Primary CTA. Authority / institutional voice. Quoting research. Wordmark. Editorial-row "01" numerals. | Body text. Long-form paragraphs. |
| **Coral / vermillion** `#E5604D` | Kicker labels. Urgency. "Last call" / countdown messaging. Inline links on dark-green backgrounds (→ yellow). | Headlines. Large surfaces (overwhelms; reserved for accent areas). |
| **Yellow** `#F2B705` | Highlight pills inside `featured-block`. Hub callouts. Sun / hopeful tonal moments. | Body text on cream (insufficient contrast). |
| **Sage** `#4A8466` | Hover states. Decorative translucent circles inside featured blocks. Soft secondary buttons. | Headlines. Primary CTA. |
| **Dark green** `#143620` / `--dark-bg` | Footer. Single "dark moment" panel per page when present. CTA bands. | Body sections. Never set a whole section to dark green. |

### 2.3 Pairing rules

- **Cream + Forest + Coral** is the default trio. Most pages use only these three.
- **Add Yellow** when a single moment needs to pop (`featured-block` kicker, hub indicator, countdown numeral).
- **Add Sage** for hover / secondary CTAs only. Never as a primary fill.
- **Never** stack forest + sage + yellow + coral at the same hierarchy on the same surface — pick three.
- **Never** use coral on yellow or yellow on coral. Both on cream is fine.

---

## 3. Typography

Source of truth: [`src/styles/global.css`](../src/styles/global.css) lines 25–28 + heading/body rules.

### 3.1 Families

| Token | Family | Weights loaded | Role |
|---|---|---|---|
| `--font-display` | **Bricolage Grotesque** | 600 / 700 / 800 | All headings (H1–H6), hero titles, section titles, editorial-row H3s. |
| `--font-body` | **Inter** | 400 / 500 / 600 / 700 | All body text, buttons, navigation, captions. |
| `--font-mono` | **JetBrains Mono** | 400 / 500 | Kickers, metadata, editorial-row numerals (01/02/03), dates and codes. |

Loaded via Google Fonts in [`src/layouts/BaseLayout.astro`](../src/layouts/BaseLayout.astro) line 41.

### 3.2 Type scale (already shipped on the site)

| Use | Family / weight | Size |
|---|---|---|
| Hero title | Display / 800 | `clamp(3rem, 9vw, 7rem)` |
| Page title (`PageHero`) | Display / 800 | `clamp(2.5rem, 7vw, 5.5rem)` |
| Section title | Display / 800 | `clamp(2rem, 5vw, 3.5rem)` |
| Editorial H3 | Display / 700 | `1.3125rem` |
| Body | Inter / 400 | `1rem` (16px), line-height 1.6 |
| Section subtitle | Inter / 400 | `1.0625rem` |
| Editorial body | Inter / 400 | `0.9375rem`, line-height 1.6 |
| Section label (kicker) | Inter / 600, uppercase | `0.75rem`, tracking `0.16em` |
| Editorial numeral / metadata | Mono / 500, uppercase | `0.75rem`, tracking `0.08em` |
| Buttons | Inter / 600 | `0.9375rem`, line-height 1 |

### 3.3 Non-obvious rules

- **Headings always carry `letter-spacing: -0.03em`** (tighter than default — codified in `global.css:75`). Display type at large sizes needs this; never set heading kerning to 0.
- **Mono is reserved for uppercase kickers and metadata.** Never run body in mono. Never use mono for headings.
- **Section titles use weight 800 with `letter-spacing: -0.035em`.** This is tighter than the default heading rule and intentional — it lets large display sizes lock together visually.
- **Bricolage is variable-axis-friendly.** When weights aren't loaded (offline / system fallback), `system-ui` is the fallback. Print exports must embed the font file; do not assume web font loading.

---

## 4. Logo

Assets live in [`public/`](../public/). All exports are static PNG; SVG sources should be added to [`brand/assets/logo/`](./assets/logo/) (TODO when a clean vector master is available).

| File | Use |
|---|---|
| `logo.png` | Default lock-up on cream / light surfaces. Wordmark + tetrahedron mark. |
| `logo-white.png` | White lock-up for dark-green / coral / colored backgrounds. |
| `logo-footer.png` | Horizontal variant for footer placement. |
| `favicon.png` (256×256), `favicon.svg`, `apple-touch-icon.png` (180×180) | Favicon set. |
| `og-image.png` (1200×630) | Static Open Graph fallback. Being replaced by dynamic `/og/*.png` (see [§7](#7-share-images)). |

### 4.1 Clear space and minimum sizes

- **Clear space:** at minimum equal to the cap-height of the "AI" in the wordmark, on all four sides.
- **Minimum size:** wordmark legibility breaks below ~120px wide on screen, ~25 mm on print. Below that, use the tetrahedron mark alone (icon-only).
- **Lock-up integrity:** never resize mark and wordmark independently. Never re-typeset the wordmark.

### 4.2 Forbidden treatments

- No drop shadows.
- No tinting the logo to non-brand colors (no purple, no blue, no orange variants).
- No outline-only versions.
- No placing the colored `logo.png` on coral, dark-green, or any non-cream background — use `logo-white.png`.
- No placing the white logo on yellow — insufficient contrast; use the colored version.

---

## 5. Motif Library

The site builds a recognizable visual language out of a small set of repeated motifs. Marketing assets should lift these motifs rather than invent new ones — that's what makes a flyer feel like AISC rather than generic.

### 5.1 Kicker mono label

Coral, uppercase, 0.16em tracking, opens almost every section.

```html
<div class="section-label">What we do</div>
```

Defined in `global.css:134–147`. Always coral on cream. Becomes a yellow pill when inside a `.featured-block`. **Use when:** opening a section, framing a list of pillars, anchoring a card type. **Don't:** stack two kickers; combine with a separate "eyebrow"; use as body emphasis.

### 5.2 Editorial numbered rows (01 / 02 / 03)

Defined in `global.css:293–361`. Four-pixel colored bar on the left, mono numeral (forest), display H3, muted body. Variants: `.is-forest`, `.is-vermillion`, `.is-deep`, `.is-sage` (plus legacy aliases `.is-green`, `.is-coral`, `.is-blue`, `.is-yellow`).

**Use when:** sequences of up to four items where the order matters (steps, pillars, timeline). **Don't:** use for unordered lists; use for >5 items (it stops reading as editorial and starts reading as a table).

### 5.3 Featured block

Forest panel + sage translucent circle bleeding off the corner + yellow pill kicker. Defined in `global.css:229–286`. Body text becomes cream; inline links underlined cream → hover yellow.

**Use when:** the single "loudest" moment of a page — typically the closing CTA, occasionally a hero secondary. **Limit: one per page.** Two competing featured blocks cancel each other.

### 5.4 Orbit + glow

Rotating circle (2px border, 28s spin animation) + pulsing soft blob (5s pulse). Defined in `src/components/HomeWaysToHelp.astro:147–192` and reused in `CoursesPage.astro` and `HackathonContent.astro`.

**Use when:** the hero of an action card, hub spotlight, hackathon banner — anywhere a small decorative system should imply "in motion / open / inviting." **Don't:** layer multiple orbits in one composition; animate orbit + glow on a static print export.

### 5.5 Line-art SVG glyphs

48×48 viewBox, stroke-only, `currentColor`. Six canonical icons exist (community / hackathon / resources / events / discussion / contact) in [`src/components/HomeWaysToHelp.astro:34–49`](../src/components/HomeWaysToHelp.astro) and extracted to [`brand/assets/glyphs/`](./assets/glyphs/).

**Use when:** small visual labels for action cards, hub callouts, channel indicators. **New glyphs must:** use the same 48×48 viewBox, stroke-only path with `stroke="currentColor"`, ~2px stroke weight, rounded line caps and joins. If a new concept can't be drawn at this fidelity, draw something else.

### 5.6 Risograph grain

A subtle SVG turbulence overlay sits above all content at `opacity: 0.5` with `mix-blend-mode: multiply`. Defined in `global.css:60–70`. **Use when:** any digital surface (web, IG, LinkedIn, WhatsApp). **Don't:** apply at print — the grain doesn't reproduce well on paper and adds dot-gain. Print assets use clean flat colors.

---

## 6. Voice & Copy Rules

These are not opinions; they are rules. Every memory of a past correction is folded in here.

### 6.1 Register

Formal-but-warm. The reader is an adult researcher or curious professional, not a "fam." Examples:

| Avoid | Use |
|---|---|
| "te postulas / igual puedes" | "se asigna por postulación / pueden participar" |
| "ponemos comidas" | "los participantes en sede reciben comidas" |
| "con un tope" | "hasta un monto definido" |

### 6.2 Mechanics

- **No em dashes (`—`) in body copy.** Use colons, commas, or periods. Em dashes are fine in this brand book and in dev docs; they are not fine in user-facing marketing copy. (En dashes for date ranges — `19–21 jun` — are fine.)
- **Currency.** Spanish: `USD 3.000`. English: `US$3,000`. Never bare `$3,000` in Spanish; never `USD 3.000` in English.
- **Dates.** ES: `19 al 21 de junio de 2026`. EN: `June 19–21, 2026`.

### 6.3 Translation policy

When a technical AI-safety term doesn't have a non-misleading Spanish translation, **keep the English term in both locales.** The site already does this for the four hackathon tracks: "Technical AI Safety" and "AI Security" appear in both `es` and `en`. Don't invent translations like "seguridad técnica de IA" if they would lose the field's actual meaning.

### 6.4 Substantive headlines

Hero subtitles and section subtitles must be **concrete**: name formats, audiences, subfields, or dates. They must not be vague community-filler ("the community behind AI safety in Colombia"). The May 2026 hero refresh on Sobre / Eventos / Recursos is the worked example — each says what's actually inside the page.

### 6.5 Honesty about scale and cadence

- WhatsApp group is near-inactive. Never claim "daily / diaria" cadence. Use neutral framing: "Espacio abierto de la comunidad."
- Events happen "every few months," not "regularly / con regularidad / monthly."
- Prize structures: name them honestly — "USD 3.000 LATAM total across 3 teams," not "$3.000 per team."
- Membership count: do not cite specific numbers unless sourced.

### 6.6 No savior framing

Never write "X trae la seguridad de IA al sur global" or "X brings AI safety to the Global South." We are the south. Center participants from the region; do not frame imported expertise as the protagonist.

### 6.7 People

Show only verified individuals with sourced bios. Don't generate AI portraits of researchers. Don't scrape faces. Use photos those individuals have already published on professional channels (LinkedIn profile, institutional pages).

---

## 7. Share Images

Default fallback: `public/og-image.png` (1200×630). Being replaced by dynamic per-route generation under `/og/*.png` (Satori). See [`MARKETING.md`](./MARKETING.md) for the migration plan and [`src/pages/og/`](../src/pages/og/) for the endpoints.

**Rule:** every shareable page should have a unique og:image. The static fallback exists for legacy URLs and 404s only.

---

## 8. Don'ts Gallery

If you find yourself reaching for any of these, stop:

- Purple gradients (or any gradient — Trópico is flat).
- Drop-shadow stacks. The site uses sharp shapes; "soft UI" is a different aesthetic entirely.
- Emoji in headlines or section titles. Emoji can appear sparingly in body copy (e.g., a checklist) but never in display type.
- Stock photos of robots, glowing brains, neural networks, anonymous humans with binary code projected on faces.
- AI-generated portraits of named individuals.
- Centered everything. The site is left-aligned editorial; centered layouts are reserved for the closing `featured-block` CTA only.
- Multiple competing CTAs in the same section. One primary action per section; one primary action per featured block.
- "Click here" / "Lee más" as link labels. Use the verb of the action: "Únete al WhatsApp," "Ver los recursos," "Postular al hackathon."
- Mixing the cream Trópico palette with anything outside the tokens above. If a partner logo needs to appear in its own brand color, isolate it on white inside a bordered chip — don't let foreign brand colors bleed into the layout.

---

## 9. Maintenance

- This file is the source of truth. When `global.css` tokens change, update [`design-tokens.json`](./design-tokens.json) and the relevant table in §2 **in the same commit**.
- The Figma "AISC — Visual Master" file re-syncs from `design-tokens.json` via the Tokens Studio plugin. Link to the file lives in [`MARKETING.md`](./MARKETING.md) §1.
- This brand book is for AISC only. EA Bogotá has its own assets and rules; don't cross-pollinate.
