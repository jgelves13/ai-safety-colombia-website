import { render, html, BRAND, latAmOutline, hostsRow } from './lib';

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

function build(locale: Locale): string {
  const c = COPY[locale];
  const W = 1200;
  const H = 627;

  const outline = latAmOutline({ stroke: BRAND.forest, strokeWidth: 3.5, width: 260, height: 400 });

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
          ${hostsRow({ color: BRAND.ink2, fontSize: 15 })}
        </div>

      </div>

      <div style="display:flex;position:absolute;top:60px;right:50px;opacity:0.16">${outline}</div>

    </div>
  `;
}

export default async function () {
  const W = 1200;
  const H = 627;

  const esPng = await render(html(build('es')), W, H);
  const enPng = await render(html(build('en')), W, H);

  return [
    { filename: 'aisc-li-single-hackathon-2026-06-announce-es.png', png: esPng },
    { filename: 'aisc-li-single-hackathon-2026-06-announce-en.png', png: enPng },
  ];
}
