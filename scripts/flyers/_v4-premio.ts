import { render, html, BRAND, hostsRow, getLogos } from './lib';
import type { FlyerFormat } from './_v3-apart';

export default async function (format: FlyerFormat = 'portrait') {
  const isPort = format === 'portrait';
  const W = 1080;
  const H = isPort ? 1350 : 1080;

  const padT = isPort ? 125 : 100;
  const padB = isPort ? 80 : 60;
  const blockGap = isPort ? 34 : 28;
  const labelSz = isPort ? 19 : 17;
  const heroSz = isPort ? 148 : 124;
  const heroSubSz = isPort ? 26 : 23;
  const dividerW = isPort ? 180 : 160;
  const dividerH = isPort ? 5 : 4;
  const midSz = isPort ? 50 : 42;
  const stepPadV = isPort ? 36 : 28;
  const stepPadH = isPort ? 28 : 24;
  const stepBorder = isPort ? 5 : 4;
  const stepTitleSz = isPort ? 34 : 30;
  const stepDescSz = isPort ? 19 : 17;

  const logos = await getLogos();
  const FOREST = BRAND.forest;
  const CORAL = '#E5604D';

  const step = (num: string, title: string, desc: string) => `
    <div style="display:flex;flex-direction:column;flex:1;gap:14px;padding:${stepPadV}px ${stepPadH}px;border-top:${stepBorder}px solid ${FOREST}">
      <div style="display:flex;font-family:JetBrains Mono;font-size:${labelSz}px;letter-spacing:0.18em;color:${CORAL}">${num}</div>
      <div style="display:flex;font-family:Bricolage Grotesque;font-weight:700;font-size:${stepTitleSz}px;line-height:1.1;letter-spacing:-0.015em;color:${FOREST}">${title}</div>
      <div style="display:flex;font-family:Inter;font-weight:500;font-size:${stepDescSz}px;line-height:1.4;color:#0C0C0C">${desc}</div>
    </div>`;

  const source = `
    <div style="display:flex;width:${W}px;height:${H}px;background:${BRAND.cream};font-family:Inter;position:relative;overflow:hidden">

      <div style="display:flex;flex-direction:column;width:${W}px;height:${H}px;padding:${padT}px 80px ${padB}px 80px;justify-content:space-between">

        <div style="display:flex;flex-direction:column;gap:${blockGap}px;max-width:940px">

          <div style="display:flex;flex-direction:column;gap:10px">
            <div style="display:flex;font-family:JetBrains Mono;font-size:${labelSz}px;letter-spacing:0.16em;color:${CORAL}">PREMIO</div>
            <div style="display:flex;font-family:Bricolage Grotesque;font-weight:800;font-size:${heroSz}px;line-height:0.95;letter-spacing:-0.035em;color:${FOREST}">USD 3.000</div>
            <div style="display:flex;font-family:Inter;font-weight:500;font-size:${heroSubSz}px;line-height:1.4;color:#0C0C0C;max-width:680px;margin-top:10px">entre 3 equipos ganadores en América Latina</div>
          </div>

          <div style="display:flex;width:${dividerW}px;height:${dividerH}px;background:${CORAL};margin-top:6px"></div>

          <div style="display:flex;font-family:Bricolage Grotesque;font-weight:700;font-size:${midSz}px;line-height:1.12;letter-spacing:-0.018em;color:${FOREST};max-width:920px">Pero el premio es solo la puerta a la siguiente etapa.</div>

        </div>

        <div style="display:flex;flex-direction:column;gap:20px">
          <div style="display:flex;align-items:stretch;gap:20px">
            ${step('01', 'Hackathon', 'Tres días de trabajo en equipo sobre un reto definido por expertos.')}
            ${step('02', 'Apart Lab Fellowship', 'Los equipos ganadores continúan el proyecto con el equipo de investigación de Apart.')}
            ${step('03', 'Vinculación', 'Publicación en conferencias y roles en organizaciones de seguridad de IA.')}
          </div>
        </div>

        <div style="display:flex;align-items:flex-end;justify-content:space-between">
          <div style="display:flex;flex-direction:column;gap:4px">
            <div style="display:flex;font-family:Bricolage Grotesque;font-weight:800;font-size:32px;line-height:1;letter-spacing:-0.015em;color:${FOREST}">19–21 jun 2026 · Hub Bogotá</div>
            <div style="display:flex;font-family:Inter;font-weight:500;font-size:18px;color:#0C0C0C">aisafetycolombia.org/hackathon</div>
          </div>
          ${hostsRow({ color: BRAND.ink2, fontSize: 18, ...logos })}
        </div>

      </div>

    </div>
  `;

  const png = await render(html(source), W, H);
  return { filename: `_v4-06-premio-${format}.png`, png };
}
