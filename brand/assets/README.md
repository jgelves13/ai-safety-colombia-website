# brand/assets — canonical visual sources

Standalone SVG sources extracted from production components. Use these in Figma, print exports, and partner press kits. The site itself does **not** reference these files — it inlines the same paths from [`src/components/HomeWaysToHelp.astro`](../../src/components/HomeWaysToHelp.astro). If the component changes, sync the file here in the same commit.

## Contents

### `glyphs/` — the six canonical line-art icons
All 48×48 viewBox, 2px stroke, rounded caps and joins, default stroke `#1F4D32` (`--accent-forest`). Recolor as needed per surface; never alter the geometry.

| File | Meaning | Used on |
|---|---|---|
| `community.svg` | Speech bubble with three dots | "Únete al WhatsApp" |
| `hackathon.svg` | Lightning bolt | "Participa en el hackathon" |
| `resources.svg` | Two books side by side | "Revisa los recursos" |
| `events.svg` | Calendar | "Asiste a un evento" |
| `discussion.svg` | Three nodes around a hub | "Únete a un grupo de discusión" |
| `contact.svg` | Envelope | "Escríbenos" |

### `motifs/orbit-glow.svg`
Static export of the orbit + glow decorative system that frames action cards, hub spotlights, and the hackathon banner. The web version animates (28s spin + 5s pulse); this static export is for print and Figma.

## How to add a new glyph

A glyph belongs in this library only if it:

1. Fits a recurring use case (not a one-off illustration).
2. Reads at 48×48 with 2px strokes, rounded caps and joins.
3. Uses the same vocabulary: simple geometric primitives (circles, rects, lines, simple paths), filled dots for "active" indicators only, no gradients, no multi-color treatments.

If the concept can't be drawn at that fidelity, draw something else. Don't break the vocabulary.

## Logo files

The logo PNG variants live in [`public/`](../../public/) at the repo root (used directly by the site):

- `logo.png` — colored lock-up on cream surfaces
- `logo-white.png` — white lock-up for dark backgrounds
- `logo-footer.png` — horizontal variant for the footer
- `favicon.png`, `favicon.svg`, `apple-touch-icon.png` — favicons

A clean vector master (`logo.svg`) does not yet exist; add to `brand/assets/logo/` when available.
