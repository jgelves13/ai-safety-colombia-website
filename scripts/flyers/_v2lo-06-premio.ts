import { render, html, BRAND, hostsRow, getLogos } from './lib';
import type { FlyerFormat } from './_v3-apart';

export default async function (format: FlyerFormat = 'portrait') {
  const isPort = format === 'portrait';
  const W = 1080;
  const H = isPort ? 1350 : 1080;

  const FOREST = BRAND.forest;
  const CORAL = '#E5604D';
  const MINT = '#5BFFA8';
  const YELLOW = '#F2B705';
  const INK = '#0C0C0C';

  const padX = 80;

  const logos = await getLogos();

  const source = `
    <div style="display:flex;width:${W}px;height:${H}px;background:${CORAL};font-family:Inter;position:relative;overflow:hidden;flex-direction:column">

      <div style="display:flex;flex-direction:column;padding:${isPort ? 96 : 76}px ${padX}px ${isPort ? 40 : 30}px ${padX}px;gap:18px">
        <div style="display:flex;align-items:center;gap:14px">
          <div style="display:flex;font-family:JetBrains Mono;font-size:${isPort ? 16 : 14}px;letter-spacing:0.26em;color:${BRAND.cream};text-transform:uppercase;opacity:0.85">Premio LATAM</div>
          <div style="display:flex;flex:1;height:1px;background:${BRAND.cream};opacity:0.3"></div>
        </div>

        <div style="display:flex;flex-direction:column;gap:0">
          <div style="display:flex;font-family:Bricolage Grotesque;font-weight:800;font-size:${isPort ? 56 : 46}px;line-height:0.96;letter-spacing:-0.02em;color:${BRAND.cream};opacity:0.9">para los 3 equipos</div>
          <div style="display:flex;font-family:Bricolage Grotesque;font-weight:800;font-size:${isPort ? 56 : 46}px;line-height:0.96;letter-spacing:-0.02em;color:${BRAND.cream};opacity:0.9">ganadores de</div>
          <div style="display:flex;font-family:Bricolage Grotesque;font-weight:800;font-size:${isPort ? 56 : 46}px;line-height:0.96;letter-spacing:-0.02em;color:${MINT}">América Latina:</div>
        </div>

        <div style="display:flex;font-family:Bricolage Grotesque;font-weight:800;font-size:${isPort ? 280 : 230}px;line-height:0.88;letter-spacing:-0.055em;color:${BRAND.cream};margin-top:10px">USD 3K</div>

        <div style="display:flex;font-family:JetBrains Mono;font-size:${isPort ? 17 : 15}px;letter-spacing:0.04em;color:${BRAND.cream};opacity:0.88;max-width:880px">USD 1.000 por equipo · pool total USD 6.000 para 6 equipos del Sur Global</div>
      </div>

      <div style="display:flex;flex:1;background:${BRAND.cream};padding:${isPort ? 38 : 28}px ${padX}px ${isPort ? 40 : 30}px ${padX}px;flex-direction:column;gap:${isPort ? 22 : 14}px;justify-content:space-between">

        <div style="display:flex;flex-direction:column;gap:14px">
          <div style="display:flex;font-family:JetBrains Mono;font-size:${isPort ? 15 : 13}px;letter-spacing:0.24em;color:${CORAL};text-transform:uppercase">Pero el premio es solo la puerta</div>
          <div style="display:flex;font-family:Bricolage Grotesque;font-weight:700;font-size:${isPort ? 44 : 36}px;line-height:1.08;letter-spacing:-0.02em;color:${FOREST};max-width:920px">Hackathon → Apart Lab Fellowship → publicación y vinculación.</div>
        </div>

        <div style="display:flex;flex-direction:column;gap:8px">
          <div style="display:flex;font-family:Inter;font-weight:500;font-size:${isPort ? 19 : 16}px;line-height:1.45;color:${INK};max-width:920px">Programa remoto y asíncrono de 12 a 24 semanas, donde cada equipo convierte su prototipo en investigación publicable junto a Apart Research. 22 publicaciones del programa hasta la fecha, en conferencias como ICLR y ACL.</div>
        </div>

        <div style="display:flex;align-items:flex-end;justify-content:space-between;padding-top:10px;border-top:1px solid #E6DCC8">
          <div style="display:flex;flex-direction:column;gap:3px;padding-top:10px">
            <div style="display:flex;font-family:Bricolage Grotesque;font-weight:800;font-size:${isPort ? 26 : 22}px;letter-spacing:-0.01em;color:${FOREST}">19–21 jun 2026 · Hub Bogotá</div>
            <div style="display:flex;font-family:Inter;font-weight:500;font-size:14px;color:${BRAND.ink2}">aisafetycolombia.org/hackathon</div>
          </div>
          ${hostsRow({ color: BRAND.ink2, fontSize: 14, ...logos })}
        </div>

      </div>

    </div>
  `;

  const png = await render(html(source), W, H);
  return { filename: `_v2lo-06-premio-${format}.png`, png };
}
