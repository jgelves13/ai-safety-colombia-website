import { render, html, BRAND, hostsRow, getLogos } from './lib';
import type { FlyerFormat } from './_v3-apart';

export default async function (format: FlyerFormat = 'portrait') {
  const isPort = format === 'portrait';
  const W = 1080;
  const H = isPort ? 1350 : 1080;

  const padT = isPort ? 130 : 100;
  const padB = isPort ? 90 : 70;
  const gap = isPort ? 38 : 30;
  const lead = isPort ? 28 : 26;
  const headlineSz = isPort ? 88 : 74;
  const body1 = isPort ? 27 : 25;
  const dividerW = isPort ? 180 : 160;
  const dividerH = isPort ? 5 : 4;
  const midSz = isPort ? 54 : 46;
  const body23 = isPort ? 26 : 24;
  const footerDates = isPort ? 36 : 32;

  const logos = await getLogos();

  const source = `
    <div style="display:flex;width:${W}px;height:${H}px;background:${BRAND.cream};font-family:Inter;position:relative;overflow:hidden">

      <div style="display:flex;flex-direction:column;width:${W}px;height:${H}px;padding:${padT}px 80px ${padB}px 80px;justify-content:space-between">

        <div style="display:flex;flex-direction:column;gap:${gap}px;max-width:940px">

          <div style="display:flex;font-family:Inter;font-weight:500;font-size:${lead}px;line-height:1.4;color:#0C0C0C;max-width:880px">La investigación en seguridad de IA se concentra en un puñado de países.</div>

          <div style="display:flex;font-family:Bricolage Grotesque;font-weight:700;font-size:${headlineSz}px;line-height:0.98;letter-spacing:-0.028em;color:${BRAND.forest}">Pero estos sistemas ya están en nuestra región.</div>

          <div style="display:flex;font-family:Inter;font-weight:500;font-size:${body1}px;line-height:1.45;color:#0C0C0C;max-width:920px">Sesgos sin auditar, vulnerabilidades sin documentar, decisiones automatizadas sin rendición de cuentas local.</div>

          <div style="display:flex;width:${dividerW}px;height:${dividerH}px;background:${BRAND.coral};margin-top:10px;margin-bottom:10px"></div>

          <div style="display:flex;font-family:Bricolage Grotesque;font-weight:700;font-size:${midSz}px;line-height:1.1;letter-spacing:-0.018em;color:${BRAND.forest};max-width:920px">Un sprint internacional de tres días para cerrar esa brecha.</div>

          <div style="display:flex;font-family:Inter;font-weight:500;font-size:${body23}px;line-height:1.5;color:#0C0C0C;max-width:920px">Equipos pequeños, retos definidos por expertos, mentoría en vivo, y un reporte de investigación al cierre.</div>

          <div style="display:flex;font-family:Inter;font-weight:500;font-size:${body23}px;line-height:1.5;color:#0C0C0C;max-width:920px">Los equipos ganadores continúan en el Apart Lab Fellowship, con apoyo en publicación y vinculación al campo.</div>

        </div>

        <div style="display:flex;flex-direction:column;gap:26px">
          <div style="display:flex;align-items:flex-end;justify-content:space-between">
            <div style="display:flex;flex-direction:column;gap:4px">
              <div style="display:flex;font-family:Bricolage Grotesque;font-weight:800;font-size:${footerDates}px;line-height:1;letter-spacing:-0.02em;color:${BRAND.forest}">19–21 jun 2026 · Hub Bogotá</div>
              <div style="display:flex;font-family:Inter;font-weight:500;font-size:18px;color:#0C0C0C">aisafetycolombia.org/hackathon</div>
            </div>
            ${hostsRow({ color: BRAND.ink2, fontSize: 18, ...logos })}
          </div>
        </div>

      </div>

    </div>
  `;

  const png = await render(html(source), W, H);
  return { filename: `_va-02-que-es-${format}.png`, png };
}
