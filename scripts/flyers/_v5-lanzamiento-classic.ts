import { render, html, BRAND, hostsRow, getLogos, qrPngDataUrl, latAmOutline } from './lib';
import type { FlyerFormat } from './_v3-apart';

export default async function (format: FlyerFormat = 'portrait') {
  const isPort = format === 'portrait';
  const W = 1080;
  const H = isPort ? 1350 : 1080;

  const padT = isPort ? 100 : 80;
  const padB = isPort ? 100 : 80;
  const padX = isPort ? 96 : 80;

  const kickerSz = isPort ? 17 : 15;
  const titleSz = isPort ? 92 : 80;
  const subSz = isPort ? 26 : 23;
  const dateSz = isPort ? 86 : 72;
  const dateSubSz = isPort ? 24 : 21;
  const pillSz = isPort ? 22 : 19;
  const qrSrc = isPort ? 360 : 320;
  const qrDisp = isPort ? 240 : 210;
  const qrBorder = isPort ? 7 : 6;
  const qrRadius = isPort ? 16 : 14;
  const qrLabelSz = isPort ? 14 : 12;

  const motifW = isPort ? 460 : 400;
  const motifH = isPort ? 920 : 800;
  const motifTop = isPort ? 320 : 240;
  const motifRight = isPort ? -40 : -30;
  const motifOpacity = isPort ? 0.36 : 0.42;
  const motifStroke = isPort ? 4 : 3.5;

  const MINT = '#5BFFA8';
  const CORAL = '#E5604D';
  const FOREST = BRAND.forest;

  const logos = await getLogos();
  const qr = await qrPngDataUrl('https://aisafetycolombia.org/hackathon/', qrSrc);

  const mapMotif = latAmOutline({ stroke: FOREST, strokeWidth: motifStroke, width: motifW, height: motifH, omitDot: true });
  const motifLeft = W - motifRight - motifW;
  const dotX = motifLeft + Math.round((314 / 600) * motifW);
  const dotY = motifTop + Math.round((311 / 1000) * motifH);
  const dotR = isPort ? 14 : 11;
  const ringR = dotR + (isPort ? 10 : 8);

  const source = `
    <div style="display:flex;width:${W}px;height:${H}px;background:${BRAND.cream};font-family:Inter;position:relative;overflow:hidden">

      <div style="display:flex;position:absolute;top:${motifTop}px;right:${motifRight}px;opacity:${motifOpacity}">${mapMotif}</div>

      <div style="display:flex;position:absolute;top:${dotY - ringR}px;left:${dotX - ringR}px;width:${ringR * 2}px;height:${ringR * 2}px;border-radius:9999px;border:3px solid ${CORAL};opacity:0.55"></div>
      <div style="display:flex;position:absolute;top:${dotY - dotR}px;left:${dotX - dotR}px;width:${dotR * 2}px;height:${dotR * 2}px;border-radius:9999px;background:${CORAL}"></div>

      <div style="display:flex;flex-direction:column;width:${W}px;height:${H}px;padding:${padT}px ${padX}px ${padB}px ${padX}px">

        <div style="display:flex;font-family:JetBrains Mono;font-weight:500;font-size:${kickerSz}px;letter-spacing:0.22em;color:${CORAL};text-transform:uppercase">Postulaciones hub Bogotá cierran 12 jun 2026</div>

        <div style="display:flex;font-family:Bricolage Grotesque;font-weight:700;font-size:${titleSz}px;line-height:0.96;letter-spacing:-0.028em;color:${FOREST};margin-top:32px;max-width:780px">Global South AI Safety Hackathon</div>

        <div style="display:flex;font-family:Inter;font-weight:500;font-size:${subSz}px;line-height:1.4;color:#0C0C0C;margin-top:30px;max-width:620px">Tres días para construir proyectos técnicos de seguridad y gobernanza de IA con relevancia para América Latina.</div>

        <div style="display:flex;flex-direction:column;gap:10px;margin-top:64px">
          <div style="display:flex;font-family:Bricolage Grotesque;font-weight:800;font-size:${dateSz}px;line-height:0.95;letter-spacing:-0.03em;color:${FOREST}">19–21 jun 2026</div>
          <div style="display:flex;font-family:Inter;font-weight:600;font-size:${dateSubSz}px;color:${BRAND.ink2}">Hub Bogotá presencial · remoto desde todo el Sur Global</div>
        </div>

        <div style="display:flex;align-items:center;height:60px;padding:0 28px;background:${MINT};border-radius:9999px;font-family:Inter;font-weight:600;font-size:${pillSz}px;color:${FOREST};align-self:flex-start;margin-top:30px">USD 1.000 por equipo · 3 ganadores LATAM</div>

        <div style="display:flex;align-items:flex-end;justify-content:space-between;margin-top:auto">
          <div style="display:flex;flex-direction:column;align-items:flex-start;gap:14px">
            <div style="display:flex;padding:8px;border:${qrBorder}px solid ${MINT};border-radius:${qrRadius}px">
              <img src="${qr}" style="display:flex;width:${qrDisp}px;height:${qrDisp}px"/>
            </div>
            <div style="display:flex;font-family:JetBrains Mono;font-size:${qrLabelSz}px;letter-spacing:0.22em;color:${FOREST};text-transform:uppercase">Escanea e inscríbete</div>
          </div>
          <div style="display:flex;align-items:flex-end;padding-bottom:8px">
            ${hostsRow({ color: BRAND.ink2, fontSize: 24, ...logos, aiscLogo: logos.aiscLogoBlack })}
          </div>
        </div>

      </div>

    </div>
  `;

  const png = await render(html(source), W, H);
  return { filename: `01-lanzamiento-classic.png`, png };
}
