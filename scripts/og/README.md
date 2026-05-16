# OG image generator

`public/og-image.png` (1200×630) is the social-share card referenced by
`src/layouts/BaseLayout.astro` as `${Astro.site}og-image.png`.

## Source files
- `og-image.html` — self-contained card template (dark theme, Space Grotesk,
  embedded base64 of the logo with the white background knocked out).
- `logo-transparent.png` — the green tetrahedron logo with its white
  background made transparent (derived from `public/logo.png`).

## Regenerate
1. Serve this folder: `py -m http.server 8799 --bind 127.0.0.1`
2. Open `http://127.0.0.1:8799/og-image.html` in a browser sized to a
   1200×630 viewport and screenshot it (or use a headless tool).
3. Save the result as `public/og-image.png` (exactly 1200×630).

To rebuild `logo-transparent.png` from `public/logo.png`, knock out near-white
pixels (R,G,B all > 232 → alpha 0) with `sharp`, then `.trim()`.
