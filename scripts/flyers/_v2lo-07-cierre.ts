import { render, html, BRAND, hostsRow, getLogos, qrPngDataUrl } from './lib';
import type { FlyerFormat } from './_v3-apart';

export default async function (format: FlyerFormat = 'portrait') {
  const isPort = format === 'portrait';
  const W = 1080;
  const H = isPort ? 1350 : 1080;

  const FOREST = BRAND.forest;
  const CORAL = '#E5604D';
  const MINT = '#5BFFA8';
  const INK = '#0C0C0C';

  const padX = 80;
  const padT = isPort ? 100 : 80;
  const padB = isPort ? 50 : 36;

  const qrSrc = isPort ? 380 : 320;
  const qrDisp = isPort ? 240 : 200;

  const logos = await getLogos();
  const qr = await qrPngDataUrl('https://aisafetycolombia.org/hackathon/', qrSrc);

  const source = `
    <div style="display:flex;width:${W}px;height:${H}px;background:${FOREST};font-family:Inter;position:relative;overflow:hidden;flex-direction:column">

      <div style="display:flex;flex-direction:column;padding:${padT}px ${padX}px 0 ${padX}px;gap:${isPort ? 26 : 18}px">
        <div style="display:flex;align-items:center;gap:14px">
          <div style="display:flex;width:14px;height:14px;border-radius:50%;background:${MINT}"></div>
          <div style="display:flex;font-family:JetBrains Mono;font-size:${isPort ? 16 : 14}px;letter-spacing:0.26em;color:${MINT};text-transform:uppercase">Hub Bogotá · cupos limitados</div>
        </div>

        <div style="display:flex;flex-direction:column;gap:-4px">
          <div style="display:flex;font-family:Bricolage Grotesque;font-weight:800;font-size:${isPort ? 180 : 152}px;line-height:0.88;letter-spacing:-0.05em;color:${BRAND.cream}">Postúlate</div>
          <div style="display:flex;font-family:Bricolage Grotesque;font-weight:800;font-size:${isPort ? 180 : 152}px;line-height:0.88;letter-spacing:-0.05em;color:${CORAL}">antes del</div>
          <div style="display:flex;font-family:Bricolage Grotesque;font-weight:800;font-size:${isPort ? 180 : 152}px;line-height:0.88;letter-spacing:-0.05em;color:${MINT}">12 jun.</div>
        </div>
      </div>

      <div style="display:flex;flex:1"></div>

      <div style="display:flex;padding:${isPort ? 30 : 22}px ${padX}px ${isPort ? 30 : 20}px ${padX}px;align-items:center;justify-content:space-between;gap:36px">

        <div style="display:flex;flex-direction:column;gap:10px;max-width:560px">
          <div style="display:flex;font-family:JetBrains Mono;font-size:${isPort ? 14 : 12}px;letter-spacing:0.24em;color:${MINT};text-transform:uppercase">Cierre formulario · 23:59 hora Colombia</div>
          <div style="display:flex;font-family:Bricolage Grotesque;font-weight:700;font-size:${isPort ? 32 : 26}px;line-height:1.18;letter-spacing:-0.012em;color:${BRAND.cream}">Workspace 24h. Alimentación incluida. Mentorías en vivo.</div>
          <div style="display:flex;font-family:Inter;font-weight:500;font-size:${isPort ? 18 : 15}px;line-height:1.45;color:rgba(251,246,236,0.78);max-width:520px">Apoyo limitado de viaje y alojamiento para participantes seleccionados de otras ciudades del país.</div>
        </div>

        <div style="display:flex;flex-direction:column;align-items:center;gap:10px">
          <div style="display:flex;padding:8px;background:${BRAND.cream};border-radius:14px">
            <img src="${qr}" style="display:flex;width:${qrDisp}px;height:${qrDisp}px"/>
          </div>
          <div style="display:flex;font-family:JetBrains Mono;font-size:${isPort ? 12 : 10}px;letter-spacing:0.22em;color:${MINT};text-transform:uppercase">Escanea</div>
        </div>

      </div>

      <div style="display:flex;padding:18px ${padX}px ${padB}px ${padX}px;align-items:center;justify-content:space-between;border-top:1px solid rgba(251,246,236,0.16)">
        <div style="display:flex;flex-direction:column;gap:2px">
          <div style="display:flex;font-family:Bricolage Grotesque;font-weight:800;font-size:${isPort ? 24 : 20}px;letter-spacing:-0.01em;color:${BRAND.cream}">aisafetycolombia.org/hackathon</div>
          <div style="display:flex;font-family:Inter;font-weight:500;font-size:14px;color:rgba(251,246,236,0.7)">19–21 jun 2026 · Hub Bogotá presencial · remoto desde el Sur Global</div>
        </div>
        ${hostsRow({ color: BRAND.cream, fontSize: 14, ...logos })}
      </div>

    </div>
  `;

  const png = await render(html(source), W, H);
  return { filename: `_v2lo-07-cierre-${format}.png`, png };
}
