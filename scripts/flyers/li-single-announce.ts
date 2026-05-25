import { render, html, BRAND } from './lib';

type Locale = 'es' | 'en';

const COPY = {
  es: {
    kicker: 'APART × AI SAFETY COLOMBIA · HUB BOGOTÁ',
    title: 'Global South AI Safety Hackathon',
    dates: '19–21 jun 2026',
    sub: 'Sede presencial en Bogotá · participación virtual abierta al Sur Global.',
    cta: 'Inscríbete',
    url: 'apartresearch.com/sprints',
    org: 'ORGANIZA',
    hub: 'HUB',
    support: 'APOYO',
  },
  en: {
    kicker: 'APART × AI SAFETY COLOMBIA · BOGOTÁ HUB',
    title: 'Global South AI Safety Hackathon',
    dates: '19–21 Jun 2026',
    sub: 'In-person hub in Bogotá · virtual participation open to the Global South.',
    cta: 'Register',
    url: 'apartresearch.com/sprints',
    org: 'ORGANIZER',
    hub: 'HUB',
    support: 'SUPPORT',
  },
} as const;

export function build(locale: Locale) {
  const c = COPY[locale];
  const W = 1200;
  const H = 627;

  return html`
    <div style="display:flex;flex-direction:row;width:${W}px;height:${H}px;background:${BRAND.cream};font-family:Inter">

      <div style="display:flex;flex-direction:column;width:780px;padding:54px 48px;gap:22px;justify-content:space-between">
        <div style="display:flex;flex-direction:column;gap:18px">
          <div style="display:flex;align-items:center;gap:12px">
            <div style="display:flex;width:12px;height:12px;border-radius:9999px;background:${BRAND.coral}"></div>
            <div style="display:flex;font-family:JetBrains Mono;font-size:16px;letter-spacing:0.18em;text-transform:uppercase;color:${BRAND.coral}">${c.kicker}</div>
          </div>
          <div style="display:flex;font-family:Bricolage Grotesque;font-weight:700;font-size:56px;line-height:1.0;color:${BRAND.forest}">${c.title}</div>
          <div style="display:flex;font-family:Bricolage Grotesque;font-weight:700;font-size:30px;color:${BRAND.forest}">${c.dates}</div>
          <div style="display:flex;font-family:Inter;font-weight:500;font-size:20px;line-height:1.35;color:${BRAND.ink2};max-width:680px">${c.sub}</div>
        </div>

        <div style="display:flex;flex-direction:column;gap:16px">
          <div style="display:flex;flex-wrap:wrap;gap:8px">
            <div style="display:flex;align-items:center;gap:8px;padding:6px 14px;border-radius:9999px;border:2px solid ${BRAND.forest}">
              <div style="display:flex;width:8px;height:8px;border-radius:9999px;background:${BRAND.forest}"></div>
              <div style="display:flex;font-family:Inter;font-weight:700;font-size:15px;color:${BRAND.forest}">Technical AI Safety</div>
            </div>
            <div style="display:flex;align-items:center;gap:8px;padding:6px 14px;border-radius:9999px;border:2px solid ${BRAND.coral}">
              <div style="display:flex;width:8px;height:8px;border-radius:9999px;background:${BRAND.coral}"></div>
              <div style="display:flex;font-family:Inter;font-weight:700;font-size:15px;color:${BRAND.forest}">AI Security</div>
            </div>
            <div style="display:flex;align-items:center;gap:8px;padding:6px 14px;border-radius:9999px;border:2px solid ${BRAND.sage}">
              <div style="display:flex;width:8px;height:8px;border-radius:9999px;background:${BRAND.sage}"></div>
              <div style="display:flex;font-family:Inter;font-weight:700;font-size:15px;color:${BRAND.forest}">Responsible AI</div>
            </div>
            <div style="display:flex;align-items:center;gap:8px;padding:6px 14px;border-radius:9999px;border:2px solid ${BRAND.yellow}">
              <div style="display:flex;width:8px;height:8px;border-radius:9999px;background:${BRAND.yellow}"></div>
              <div style="display:flex;font-family:Inter;font-weight:700;font-size:15px;color:${BRAND.forest}">AI Governance</div>
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:14px">
            <div style="display:flex;font-family:JetBrains Mono;font-size:14px;letter-spacing:0.16em;text-transform:uppercase;color:${BRAND.coral}">${c.cta}</div>
            <div style="display:flex;font-family:JetBrains Mono;font-size:16px;color:${BRAND.forest}">${c.url}</div>
          </div>
        </div>
      </div>

      <div style="display:flex;flex-direction:column;width:420px;padding:54px 40px;background:${BRAND.forest};color:${BRAND.cream};justify-content:space-between">
        <div style="display:flex;flex-direction:column;gap:24px">
          <div style="display:flex;flex-direction:column;gap:4px">
            <div style="display:flex;font-family:JetBrains Mono;font-size:13px;letter-spacing:0.18em;text-transform:uppercase;color:${BRAND.coral}">${c.org}</div>
            <div style="display:flex;font-family:Bricolage Grotesque;font-weight:700;font-size:24px;color:${BRAND.cream}">Apart Research</div>
          </div>
          <div style="display:flex;flex-direction:column;gap:4px">
            <div style="display:flex;font-family:JetBrains Mono;font-size:13px;letter-spacing:0.18em;text-transform:uppercase;color:${BRAND.coral}">${c.hub}</div>
            <div style="display:flex;font-family:Bricolage Grotesque;font-weight:700;font-size:24px;color:${BRAND.cream}">AI Safety Colombia</div>
          </div>
          <div style="display:flex;flex-direction:column;gap:4px">
            <div style="display:flex;font-family:JetBrains Mono;font-size:13px;letter-spacing:0.18em;text-transform:uppercase;color:${BRAND.coral}">${c.support}</div>
            <div style="display:flex;font-family:Bricolage Grotesque;font-weight:700;font-size:24px;color:${BRAND.cream}">Schmidt Sciences</div>
          </div>
        </div>
        <div style="display:flex;font-family:JetBrains Mono;font-size:13px;letter-spacing:0.18em;text-transform:uppercase;color:${BRAND.cream};opacity:0.7">USD 3.000 · 3 equipos LATAM</div>
      </div>

    </div>
  `;
}

export default async function () {
  const W = 1200;
  const H = 627;

  const esPng = await render(build('es'), W, H);
  const enPng = await render(build('en'), W, H);

  return [
    { filename: 'aisc-li-single-hackathon-2026-06-announce-es.png', png: esPng },
    { filename: 'aisc-li-single-hackathon-2026-06-announce-en.png', png: enPng },
  ];
}
