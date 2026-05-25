# Flyers

Code-rendered marketing PNGs for AI Safety Colombia. Reuses the Satori + `@resvg/resvg-js` pipeline from `src/lib/og.ts` so flyers stay token-aligned with the rest of the site.

## Run

```
npm install
npm run flyers
```

Outputs land in `scripts/flyers/dist/` (gitignored, regenerable). Each render logs filename + byte size.

## Layout

| File | Role |
|---|---|
| `lib.ts` | Shared module: BRAND palette, font loader, `render()`, `loadHackathon()`, `qrPngDataUrl()`, `html` template helper. |
| `ig-feed-announce.ts` | IG feed, 1080×1080, ES — hackathon announce. |
| `ig-feed-tracks.ts` | IG feed, 1080×1080, ES — four tracks card. |
| `ig-story-savedate.ts` | IG story, 1080×1920, ES — save-the-date. |
| `li-single-announce.ts` | LinkedIn single, 1200×627 — renders ES + EN from one template. |
| `wa-status-announce.ts` | WhatsApp status, 1080×1920, ES — community-framed (per voice rules). |
| `print-a4-poster.ts` | A4 poster, 2480×3508 @ 300 dpi, ES — QR + full track grid. |
| `render-all.ts` | Runner. Awaits all templates in parallel, writes to `dist/`. |

## Add a new template

1. Create `scripts/flyers/<channel>-<campaign>-<variant>.ts`.
2. Export `default async function (): Promise<{ filename, png }>` (or an array of those for multi-locale).
3. Filename follows `brand/MARKETING.md` §8: `aisc-{channel}-{campaign}-{variant}-{locale}.png`.
4. Import `BRAND`, `ACCENT`, `render`, `html` from `./lib`.
5. Register the module in `render-all.ts`.

## Satori gotchas

These already live in the templates but matter when editing:

- **Every multi-child div needs `display:flex`.** Satori errors out otherwise. The `lib.ts` `html` helper does not patch this for you.
- **Don't `${arr.map(html\`...\`)}` inline.** `satori-html` coerces tagged fragments to `[object Object]` when interpolated. Repeating elements are written inline, or built as plain strings and passed to `html(source)` as a function call (see `ig-feed-tracks.ts`, `print-a4-poster.ts`).
- **Tagged template escapes interpolated values as text.** Use the function form `html(source)` when interpolating raw HTML, the tagged form ``html`...` `` only when interpolating safe text.
- **Fonts use the `latin-NNN-normal.woff` subset.** Not `latin-ext` (no ASCII). Spanish accents render correctly with the `latin` subset.

## Voice rules (enforced by hand for now)

From `brand/BRAND.md` §6 and `brand/MARKETING.md` §6.2 — re-check on every copy edit:

- No em dashes in body paragraphs: use colons / commas / periods.
- `USD 3.000` in ES, `US$3,000` in EN. Never bare `$` in Spanish.
- Track names stay in English in **both** locales: `Technical AI Safety`, `AI Security`, `Responsible AI`, `AI Governance`.
- WhatsApp framing is neutral: "Espacio abierto de la comunidad…". No "daily" / "diaria" cadence claims.
- No savior framing: don't write "X brings AI safety to the Global South." Center participants from the region.

## CMYK conversion for print

The A4 poster renders in sRGB. For Uniandes / UNAL print boards, convert locally to CMYK PDF before sending to the print shop. ImageMagick one-liner:

```
magick aisc-print-a4-hackathon-2026-06-poster-es.png -colorspace CMYK -density 300 aisc-print-a4-hackathon-2026-06-poster-es.pdf
```

No ImageMagick? Open the PNG in Adobe Acrobat → Print Production → Convert Colors → Output Intent: U.S. Web Coated (SWOP) v2 → save as PDF.

## Drive sync

Per `brand/MARKETING.md` §9, the frozen export for the hackathon campaign lives at:

```
G:\Mon Drive\AI Safety Colombia\marketing\hackathon-2026-06\source-renders\
```

Drag the seven PNGs from `dist/` after each render. The site builds and posts manually from there.
