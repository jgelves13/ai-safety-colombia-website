# OG image generator (deprecated)

> **Superseded.** The site now generates per-route OG images at build time via
> Satori. See `src/pages/og/*.png.ts` and `src/lib/og.ts`.
>
> - Default fallback: `/og/default.png`
> - Hackathon: `/og/hackathon.png`
> - Per event: `/og/event/{slug}.png` (one per entry in `src/data/events.json`)
>
> Each Astro page passes its own `ogImage` prop to `BaseLayout.astro`; the
> layout writes the URL into `og:image` and `twitter:image`. To add a new
> contextual card, create an endpoint under `src/pages/og/` that returns
> `renderOg(html\`...\`)`.

## Legacy assets

The files in this directory (`og-image.html`, `logo-transparent.png`,
`_ais_full.jpeg`, `_apart_full.jpeg`) drove the previous manual screenshot
workflow that produced `public/og-image.png`. They are kept for reference only;
the runtime no longer reads `public/og-image.png`.
