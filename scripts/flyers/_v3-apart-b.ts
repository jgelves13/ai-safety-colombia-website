import { render, html, BRAND, hostsRow, qrPngDataUrl, latAmOutline, getHostsLogosHD } from './lib';

export type FlyerFormat = 'portrait' | 'square';

export default async function (format: FlyerFormat = 'portrait') {
  const isPort = format === 'portrait';
  const W = 1080;
  const H = isPort ? 1350 : 1080;

  const qrSrc = isPort ? 380 : 320;
  const qrDisp = isPort ? 224 : 188;
  const motifW = isPort ? 500 : 400;
  const motifH = isPort ? 833 : 667;
  const motifTop = isPort ? 520 : 560;         // CHANGE 1: shifted down from 400/470 to clear bullets
  const motifRight = isPort ? -30 : 20;
  const motifOpacity = isPort ? 0.30 : 0.36;
  const motifStroke = isPort ? 11 : 9;
  const padT = isPort ? 113 : 90;
  const padB = isPort ? 103 : 82;
  const padX = isPort ? 104 : 88;
  const bodyGap = isPort ? 22 : 20;            // CHANGE A: subtitle margin-top trimmed 32→22
  const titleSz = isPort ? 90 : 78;
  const titleSz2 = isPort ? 72 : 62;           // CHANGE 2: title line 2 demoted from 90→72
  const subSz = isPort ? 28 : 26;
  const datesHero = isPort ? 84 : 70;
  const chipH = isPort ? 62 : 54;
  const chipFs = isPort ? 26 : 24;
  const chipPad = isPort ? 26 : 22;
  const qrBorder = isPort ? 7 : 6;
  const qrRadius = isPort ? 16 : 14;
  const kickerSz = isPort ? 22 : 20;
  const scanSz = isPort ? 18 : 16;
  const bulletLabelSz = isPort ? 26 : 22;      // CHANGE 4: labels 22→26
  const bulletBodySz = isPort ? 20 : 18;       // CHANGE 4: bodies 22→20
  const bulletRowGap = isPort ? 10 : 8;        // CHANGE 4: row gap 14→10

  const hostsFs = 24;
  const hostsLogos = await getHostsLogosHD(hostsFs, { aiscBlack: true });
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

      <div style="display:flex;flex-direction:column;width:${W}px;height:${H}px;padding:${padT}px ${padX}px ${padB}px ${padX}px;justify-content:space-between">

        <div style="display:flex;flex-direction:column;max-width:872px">
          <div style="display:flex;font-family:Inter;font-weight:600;font-size:${kickerSz}px;letter-spacing:0.04em;color:${BRAND.forest};text-transform:uppercase;margin-bottom:14px">Postulaciones hub Bogotá cierran 12 jun 2026</div>
          <div style="display:flex;flex-direction:column;font-family:Bricolage Grotesque;font-weight:700;line-height:0.98;letter-spacing:-0.02em">
            <div style="display:flex;color:${CORAL};font-size:${titleSz}px">Global South</div>
            <div style="display:flex;color:${BRAND.forest};font-size:${titleSz2}px">AI Safety Hackathon</div>
          </div>
          <div style="display:flex;font-family:Inter;font-weight:500;font-size:${subSz}px;line-height:1.4;color:${BRAND.ink2};margin-top:${bodyGap}px">Un fin de semana para construir proyectos técnicos de seguridad y gobernanza de IA con relevancia para América Latina.</div>

          <div style="display:flex;flex-direction:column;gap:${bulletRowGap}px;margin-top:30px;max-width:540px">
            <div style="display:flex;align-items:flex-start;gap:14px;font-family:Inter;line-height:1.3">
              <div style="display:flex;font-weight:700;font-size:${bulletLabelSz}px;color:${BRAND.forest};flex-shrink:0">Charlas</div>
              <div style="display:flex;font-weight:500;font-size:${bulletBodySz}px;color:#0C0C0C;padding-top:4px">Juan Felipe Cerón (OpenAI), Alejandro Toro (Congreso de Colombia)</div>
            </div>
            <div style="display:flex;align-items:flex-start;gap:14px;font-family:Inter;line-height:1.3">
              <div style="display:flex;font-weight:700;font-size:${bulletLabelSz}px;color:${BRAND.forest};flex-shrink:0">Jurado</div>
              <div style="display:flex;font-weight:500;font-size:${bulletBodySz}px;color:#0C0C0C;padding-top:4px">OpenAI, UC Berkeley, BID Lab, Campaign to Stop Killer Robots, entre otros</div>
            </div>
            <div style="display:flex;align-items:flex-start;gap:14px;font-family:Inter;line-height:1.3">
              <div style="display:flex;font-weight:700;font-size:${bulletLabelSz}px;color:${BRAND.forest};flex-shrink:0">Premio</div>
              <div style="display:flex;font-weight:500;font-size:${bulletBodySz}px;color:#0C0C0C;padding-top:4px">Apart Lab Fellowship; algunos fellows han publicado en ICLR, NeurIPS, ACL</div>
            </div>
          </div>
        </div>

        <div style="display:flex;flex-direction:column;gap:28px">

        <div style="display:flex;flex-direction:column;gap:8px">
          <div style="display:flex;font-family:Bricolage Grotesque;font-weight:800;font-size:${datesHero}px;line-height:1;letter-spacing:-0.02em;color:${BRAND.forest}">19–21 junio 2026</div>
          <div style="display:flex;font-family:Inter;font-weight:600;font-size:24px;color:#0C0C0C">Hub Bogotá presencial · remoto desde todo el Sur Global</div>
        </div>

        <div style="display:flex;align-items:center;height:${chipH}px;padding:0 ${chipPad}px;background:${MINT};border-radius:9999px;font-family:Bricolage Grotesque;font-weight:700;font-size:${chipFs}px;color:${BRAND.forest};align-self:center">USD 1.000 por equipo · 3 ganadores LATAM</div>

        <div style="display:flex;align-items:flex-end;justify-content:space-between">
          <div style="display:flex;flex-direction:column;align-items:center;gap:12px">
            <div style="display:flex;padding:7px;border:${qrBorder}px solid ${MINT};border-radius:${qrRadius}px">
              <img src="${qr}" style="display:flex;width:${qrDisp}px;height:${qrDisp}px"/>
            </div>
            <div style="display:flex;font-family:Inter;font-weight:600;font-size:${scanSz}px;letter-spacing:0.04em;color:${BRAND.forest};text-transform:uppercase">Escanea e inscríbete</div>
          </div>
          <div style="display:flex;align-items:flex-end">
            ${hostsRow({ color: BRAND.ink2, fontSize: hostsFs, ...hostsLogos })}
          </div>
        </div>

        </div>

      </div>

    </div>
  `;

  const png = await render(html(source), W, H);
  return { filename: `_v3d-apart-b-${format}.png`, png };
}
