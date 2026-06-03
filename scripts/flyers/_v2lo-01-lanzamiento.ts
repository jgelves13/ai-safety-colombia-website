import { render, html, BRAND, hostsRow, getLogos, latAmOutline } from './lib';
import type { FlyerFormat } from './_v3-apart';

export default async function (format: FlyerFormat = 'portrait') {
  const isPort = format === 'portrait';
  const W = 1080;
  const H = isPort ? 1350 : 1080;

  const FOREST = BRAND.forest;
  const CORAL = '#E5604D';
  const MINT = '#5BFFA8';
  const INK = '#0C0C0C';
  const SAGE = '#4A8466';

  const padX = 80;

  const logos = await getLogos();
  const map = latAmOutline({ stroke: CORAL, strokeWidth: 6, width: 460, height: 766 });

  const source = `
    <div style="display:flex;width:${W}px;height:${H}px;background:${BRAND.cream};font-family:Inter;position:relative;overflow:hidden">

      <div style="display:flex;position:absolute;top:${isPort ? -40 : -20}px;right:${isPort ? -120 : -80}px;opacity:0.16">${map}</div>

      <div style="display:flex;flex-direction:column;width:${W}px;height:${H}px;padding:${isPort ? 100 : 78}px ${padX}px 0 ${padX}px;gap:${isPort ? 50 : 36}px">

        <div style="display:flex;flex-direction:column;gap:8px">
          <div style="display:flex;font-family:JetBrains Mono;font-size:${isPort ? 17 : 15}px;letter-spacing:0.28em;color:${CORAL};text-transform:uppercase">Bogotá · jun 2026 · cierre 12 jun</div>
          <div style="display:flex;width:120px;height:5px;background:${CORAL};margin-top:18px"></div>
        </div>

        <div style="display:flex;flex-direction:column;gap:0">
          <div style="display:flex;font-family:Bricolage Grotesque;font-weight:800;font-size:${isPort ? 156 : 130}px;line-height:0.88;letter-spacing:-0.05em;color:${FOREST}">Global</div>
          <div style="display:flex;font-family:Bricolage Grotesque;font-weight:800;font-size:${isPort ? 156 : 130}px;line-height:0.88;letter-spacing:-0.05em;color:${FOREST}">South AI</div>
          <div style="display:flex;font-family:Bricolage Grotesque;font-weight:800;font-size:${isPort ? 156 : 130}px;line-height:0.88;letter-spacing:-0.05em;color:${CORAL};font-style:italic">Safety</div>
          <div style="display:flex;font-family:Bricolage Grotesque;font-weight:800;font-size:${isPort ? 156 : 130}px;line-height:0.88;letter-spacing:-0.05em;color:${FOREST}">Hackathon</div>
        </div>

      </div>

      <div style="display:flex;flex-direction:column;position:absolute;left:0;right:0;bottom:0;background:${FOREST};padding:${isPort ? 40 : 30}px ${padX}px ${isPort ? 40 : 30}px ${padX}px;gap:${isPort ? 24 : 16}px">

        <div style="display:flex;align-items:flex-end;justify-content:space-between;gap:30px">
          <div style="display:flex;flex-direction:column;gap:8px">
            <div style="display:flex;font-family:JetBrains Mono;font-size:${isPort ? 14 : 12}px;letter-spacing:0.24em;color:${MINT};text-transform:uppercase">Sprint internacional de investigación</div>
            <div style="display:flex;font-family:Bricolage Grotesque;font-weight:800;font-size:${isPort ? 80 : 64}px;line-height:0.95;letter-spacing:-0.03em;color:${BRAND.cream}">19–21 jun 2026</div>
          </div>
          <div style="display:flex;flex-direction:column;gap:6px;align-items:flex-end;padding-bottom:8px">
            <div style="display:flex;font-family:JetBrains Mono;font-size:${isPort ? 13 : 11}px;letter-spacing:0.22em;color:${MINT};text-transform:uppercase">Hub presencial</div>
            <div style="display:flex;font-family:Bricolage Grotesque;font-weight:700;font-size:${isPort ? 32 : 28}px;letter-spacing:-0.01em;color:${BRAND.cream}">Bogotá</div>
            <div style="display:flex;font-family:JetBrains Mono;font-size:${isPort ? 13 : 11}px;letter-spacing:0.22em;color:${MINT};text-transform:uppercase;margin-top:6px">En línea</div>
            <div style="display:flex;font-family:Bricolage Grotesque;font-weight:700;font-size:${isPort ? 32 : 28}px;letter-spacing:-0.01em;color:${BRAND.cream}">Sur Global</div>
          </div>
        </div>

        <div style="display:flex;align-items:center;justify-content:space-between;padding-top:${isPort ? 18 : 12}px;border-top:1px solid rgba(251,246,236,0.18)">
          <div style="display:flex;font-family:Bricolage Grotesque;font-weight:700;font-size:${isPort ? 22 : 19}px;letter-spacing:-0.005em;color:${BRAND.cream}">aisafetycolombia.org/hackathon</div>
          ${hostsRow({ color: BRAND.cream, fontSize: 16, ...logos })}
        </div>

      </div>

    </div>
  `;

  const png = await render(html(source), W, H);
  return { filename: `_v2lo-01-lanzamiento-${format}.png`, png };
}
