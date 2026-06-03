import { render, html, BRAND, hostsRow, getLogos, qrPngDataUrl, latAmOutline } from './lib';

export type FlyerFormat = 'portrait' | 'square';

export default async function (format: FlyerFormat = 'portrait') {
  const isPort = format === 'portrait';
  const W = 1080;
  const H = isPort ? 1350 : 1080;

  const qrSrc = isPort ? 380 : 320;
  const qrDisp = isPort ? 224 : 188;
  const motifW = isPort ? 500 : 400;
  const motifH = isPort ? 833 : 667;
  const motifTop = isPort ? 600 : 470;
  const motifRight = isPort ? -30 : 20;
  const motifOpacity = isPort ? 0.30 : 0.36;
  const motifStroke = isPort ? 11 : 9;
  const padT = isPort ? 140 : 110;
  const padB = isPort ? 96 : 80;
  const bodyGap = isPort ? 32 : 28;
  const titleSz = isPort ? 104 : 88;
  const subSz = isPort ? 28 : 26;
  const datesHero = isPort ? 96 : 80;
  const chipH = isPort ? 62 : 54;
  const chipFs = isPort ? 26 : 24;
  const chipPad = isPort ? 26 : 22;
  const qrBorder = isPort ? 7 : 6;
  const qrRadius = isPort ? 16 : 14;
  const kickerSz = isPort ? 16 : 14;

  const logos = await getLogos();
  const qr = await qrPngDataUrl('https://aisafetycolombia.org/hackathon/', qrSrc);
  const MINT = '#5BFFA8';
  const CORAL = '#E5604D';

  const mapMotif = latAmOutline({ stroke: BRAND.forest, strokeWidth: motifStroke, width: motifW, height: motifH, omitDot: true });

  const motifLeft = W - motifRight - motifW;
  const dotX = motifLeft + Math.round((314 / 600) * motifW);
  const dotY = motifTop + Math.round((311 / 1000) * motifH);
  const dotR = isPort ? 18 : 14;
  const ringR = dotR + (isPort ? 14 : 11);

  const source = `
    <div style="display:flex;width:${W}px;height:${H}px;background:${BRAND.cream};font-family:Inter;position:relative;overflow:hidden">

      <div style="display:flex;position:absolute;top:${motifTop}px;right:${motifRight}px;opacity:${motifOpacity}">${mapMotif}</div>

      <div style="display:flex;position:absolute;top:${dotY - ringR}px;left:${dotX - ringR}px;width:${ringR * 2}px;height:${ringR * 2}px;border-radius:9999px;border:3px solid ${CORAL};opacity:0.55"></div>
      <div style="display:flex;position:absolute;top:${dotY - dotR}px;left:${dotX - dotR}px;width:${dotR * 2}px;height:${dotR * 2}px;border-radius:9999px;background:${CORAL}"></div>

      <div style="display:flex;flex-direction:column;width:${W}px;height:${H}px;padding:${padT}px 80px ${padB}px 80px;justify-content:space-between">

        <div style="display:flex;flex-direction:column;max-width:820px">
          <div style="display:flex;font-family:JetBrains Mono;font-size:${kickerSz}px;letter-spacing:0.18em;color:${CORAL};text-transform:uppercase;margin-bottom:14px">Postulaciones hub Bogotá cierran 12 jun 2026</div>
          <div style="display:flex;font-family:Bricolage Grotesque;font-weight:700;font-size:${titleSz}px;line-height:0.98;letter-spacing:-0.02em;color:${BRAND.forest}">Global South AI Safety Hackathon</div>
          <div style="display:flex;font-family:Inter;font-weight:500;font-size:${subSz}px;line-height:1.4;color:${BRAND.ink2};max-width:760px;margin-top:${bodyGap}px">Tres días para construir proyectos técnicos de seguridad y gobernanza de IA con relevancia para América Latina.</div>
        </div>

        <div style="display:flex;flex-direction:column;gap:8px">
          <div style="display:flex;font-family:Bricolage Grotesque;font-weight:800;font-size:${datesHero}px;line-height:1;letter-spacing:-0.02em;color:${BRAND.forest}">19–21 jun 2026</div>
          <div style="display:flex;font-family:Inter;font-weight:600;font-size:24px;color:#0C0C0C">Hub Bogotá presencial · remoto desde todo el Sur Global</div>
        </div>

        <div style="display:flex;align-items:center;height:${chipH}px;padding:0 ${chipPad}px;background:${MINT};border-radius:9999px;font-family:Bricolage Grotesque;font-weight:700;font-size:${chipFs}px;color:${BRAND.forest};align-self:flex-start">USD 1.000 por equipo · 3 ganadores LATAM</div>

        <div style="display:flex;align-items:flex-end;justify-content:space-between">
          <div style="display:flex;flex-direction:column;align-items:center;gap:12px">
            <div style="display:flex;padding:7px;border:${qrBorder}px solid ${MINT};border-radius:${qrRadius}px">
              <img src="${qr}" style="display:flex;width:${qrDisp}px;height:${qrDisp}px"/>
            </div>
            <div style="display:flex;font-family:JetBrains Mono;font-size:14px;letter-spacing:0.2em;color:${BRAND.forest};text-transform:uppercase">Escanea e inscríbete</div>
          </div>
          <div style="display:flex;align-items:flex-end">
            ${hostsRow({ color: BRAND.ink2, fontSize: 18, ...logos })}
          </div>
        </div>

      </div>

    </div>
  `;

  const png = await render(html(source), W, H);
  return { filename: `_v3d-apart-${format}.png`, png };
}
