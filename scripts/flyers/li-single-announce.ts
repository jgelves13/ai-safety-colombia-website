import { render, html, BRAND, regionMotif, hostsRow, getLogos } from './lib';

type Locale = 'es' | 'en';

const COPY = {
  es: {
    kicker: 'Hackathon',
    title: 'Global South AI Safety Hackathon',
    dates: '19–21 jun 2026',
    hub: 'Hub Bogotá + remoto',
  },
  en: {
    kicker: 'Hackathon',
    title: 'Global South AI Safety Hackathon',
    dates: 'June 19–21, 2026',
    hub: 'Bogotá hub + remote',
  },
} as const;

function build(locale: Locale, logos: Awaited<ReturnType<typeof getLogos>>): string {
  const c = COPY[locale];
  const W = 1200;
  const H = 627;

  const outline = regionMotif({ stroke: BRAND.forest, strokeWidth: 5, width: 320, height: 520 });

  return `
    <div style="display:flex;width:${W}px;height:${H}px;background:${BRAND.cream};font-family:Inter;position:relative">

      <div style="display:flex;flex-direction:column;width:${W}px;height:${H}px;padding:72px 80px;justify-content:space-between">

        <div style="display:flex;align-items:center;gap:12px">
          <div style="display:flex;width:12px;height:12px;border-radius:9999px;background:${BRAND.coral}"></div>
          <div style="display:flex;font-family:JetBrains Mono;font-size:18px;letter-spacing:0.20em;text-transform:uppercase;color:${BRAND.coral}">${c.kicker}</div>
        </div>

        <div style="display:flex;flex-direction:column;gap:18px">
          <div style="display:flex;font-family:Bricolage Grotesque;font-weight:700;font-size:64px;line-height:1.0;letter-spacing:-0.02em;color:${BRAND.forest};max-width:820px">${c.title}</div>
          <div style="display:flex;font-family:Bricolage Grotesque;font-weight:800;font-size:72px;line-height:1;letter-spacing:-0.02em;color:${BRAND.forest}">${c.dates}</div>
        </div>

        <div style="display:flex;justify-content:space-between;align-items:flex-end">
          <div style="display:flex;font-family:Inter;font-weight:700;font-size:24px;color:${BRAND.forest}">${c.hub}</div>
          ${hostsRow({ color: BRAND.ink2, fontSize: 15, ...logos })}
        </div>

      </div>

      <div style="display:flex;position:absolute;top:55px;right:40px;opacity:0.42">${outline}</div>

    </div>
  `;
}

export default async function () {
  const W = 1200;
  const H = 627;

  const logos = await getLogos();
  const esPng = await render(html(build('es', logos)), W, H);
  const enPng = await render(html(build('en', logos)), W, H);

  return [
    { filename: 'aisc-li-single-hackathon-2026-06-announce-es.png', png: esPng },
    { filename: 'aisc-li-single-hackathon-2026-06-announce-en.png', png: enPng },
  ];
}
