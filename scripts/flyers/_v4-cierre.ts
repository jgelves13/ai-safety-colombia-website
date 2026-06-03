import { render, html, BRAND, hostsRow, getLogos, qrPngDataUrl } from './lib';
import type { FlyerFormat } from './_v3-apart';

export default async function (format: FlyerFormat = 'portrait') {
  const isPort = format === 'portrait';
  const W = 1080;
  const H = isPort ? 1350 : 1080;

  const qrSrc = isPort ? 420 : 360;
  const qrDisp = isPort ? 380 : 320;
  const padT = isPort ? 170 : 140;
  const padB = isPort ? 90 : 70;
  const leadSz = isPort ? 28 : 26;
  const heroSz = isPort ? 210 : 178;
  const yearSz = isPort ? 60 : 50;
  const dividerW = isPort ? 200 : 180;
  const dividerH = isPort ? 5 : 4;
  const bodySz = isPort ? 26 : 24;
  const bandPadV = isPort ? 32 : 24;
  const bandPadH = isPort ? 38 : 32;
  const bandLabelSz = isPort ? 17 : 15;
  const bandLinkSz = isPort ? 36 : 30;
  const bandDatesSz = isPort ? 26 : 22;
  const qrLabelSz = isPort ? 16 : 14;

  const logos = await getLogos();
  const qrUrl = await qrPngDataUrl('https://aisafetycolombia.org/hackathon/', qrSrc);
  const MINT = '#5BFFA8';
  const FOREST = BRAND.forest;
  const CORAL = '#E5604D';

  const source = `
    <div style="display:flex;width:${W}px;height:${H}px;background:${BRAND.cream};font-family:Inter;position:relative;overflow:hidden">

      <div style="display:flex;flex-direction:column;width:${W}px;height:${H}px;padding:${padT}px 80px ${padB}px 80px;justify-content:space-between">

        <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:48px">

          <div style="display:flex;flex-direction:column;gap:36px;flex:1">
            <div style="display:flex;font-family:Inter;font-weight:500;font-size:${leadSz}px;line-height:1.4;color:#0C0C0C;max-width:600px">Las postulaciones al hub presencial de Bogotá cierran el</div>

            <div style="display:flex;flex-direction:column;gap:12px">
              <div style="display:flex;font-family:Bricolage Grotesque;font-weight:800;font-size:${heroSz}px;line-height:0.88;letter-spacing:-0.045em;color:${FOREST}">12 jun</div>
              <div style="display:flex;font-family:Bricolage Grotesque;font-weight:700;font-size:${yearSz}px;line-height:1;letter-spacing:-0.02em;color:${CORAL}">2026</div>
            </div>

            <div style="display:flex;width:${dividerW}px;height:${dividerH}px;background:${FOREST};margin-top:10px"></div>

            <div style="display:flex;font-family:Inter;font-weight:500;font-size:${bodySz}px;line-height:1.5;color:#0C0C0C;max-width:600px">Cupos limitados. Participación sin costo. Espacio de trabajo abierto 24 horas, alimentación incluida, mentorías y charlas en vivo durante los tres días.</div>
          </div>

          <div style="display:flex;flex-direction:column;align-items:center;gap:16px;padding-top:40px">
            <img src="${qrUrl}" style="display:flex;width:${qrDisp}px;height:${qrDisp}px"/>
            <div style="display:flex;font-family:JetBrains Mono;font-size:${qrLabelSz}px;letter-spacing:0.18em;color:${FOREST};text-transform:uppercase">Escanea para postularte</div>
          </div>

        </div>

        <div style="display:flex;flex-direction:column;gap:24px">

          <div style="display:flex;background:${FOREST};padding:${bandPadV}px ${bandPadH}px;align-items:center;justify-content:space-between">
            <div style="display:flex;flex-direction:column;gap:5px">
              <div style="display:flex;font-family:JetBrains Mono;font-size:${bandLabelSz}px;letter-spacing:0.18em;color:${MINT}">POSTÚLATE</div>
              <div style="display:flex;font-family:Bricolage Grotesque;font-weight:700;font-size:${bandLinkSz}px;letter-spacing:-0.01em;color:${BRAND.cream}">aisafetycolombia.org/hackathon</div>
            </div>
            <div style="display:flex;font-family:Bricolage Grotesque;font-weight:800;font-size:${bandDatesSz}px;line-height:1;letter-spacing:-0.01em;color:${MINT}">19–21 jun 2026</div>
          </div>

          <div style="display:flex;align-items:flex-end;justify-content:flex-end">
            ${hostsRow({ color: BRAND.ink2, fontSize: 18, ...logos })}
          </div>
        </div>

      </div>

    </div>
  `;

  const png = await render(html(source), W, H);
  return { filename: `_v4-07-cierre-${format}.png`, png };
}
