import { render, html, BRAND, hostsRow, getLogos, qrPngDataUrl, latAmOutline } from './lib';

// Variant C — Motif-Led / Map-Forward
// LATAM outline promoted to confident right-side hero; bleeds off canvas edge.
// Bogotá pin reads as the anchor. Content lives in the left column.

export default async function () {
  const W = 1080;
  const H = 1350;

  const padT = 110;
  const padX = 80;
  const padB = 70;

  // Map promoted to right-side hero, bleeds off the right edge
  const motifW = 540;
  const motifH = 900;
  const motifTop = 180;
  const motifLeft = 620;  // bleed: 620+540 = 1160 > 1080
  const motifStroke = 9;
  const motifOpacity = 1.0;

  const qrSrc = 380;
  const qrDisp = 168;
  const qrBorder = 7;
  const qrRadius = 16;

  const MINT = '#5BFFA8';
  const CORAL = '#E5604D';

  const logos = await getLogos();
  const qr = await qrPngDataUrl('https://aisafetycolombia.org/hackathon/', qrSrc);
  const mapMotif = latAmOutline({ stroke: BRAND.forest, strokeWidth: motifStroke, width: motifW, height: motifH });

  // Recompute Bogotá pin position from motif viewBox 600x1000, dot at 314,311
  const dotX = motifLeft + Math.round((314 / 600) * motifW);
  const dotY = motifTop + Math.round((311 / 1000) * motifH);
  const dotR = 22;
  const ringR = dotR + 16;
  const ring2R = dotR + 32;

  const bodyRow = (lead: string, body: string) => `
    <div style="display:flex;align-items:flex-start;gap:10px">
      <div style="display:flex;font-family:Inter;font-weight:700;font-size:19px;line-height:1.4;color:${BRAND.forest};flex-shrink:0">${lead} ·</div>
      <div style="display:flex;font-family:Inter;font-weight:500;font-size:19px;line-height:1.4;color:${BRAND.ink};flex:1">${body}</div>
    </div>
  `;

  const source = `
    <div style="display:flex;width:${W}px;height:${H}px;background:${BRAND.cream};font-family:Inter;position:relative;overflow:hidden">

      <div style="display:flex;position:absolute;top:${motifTop}px;left:${motifLeft}px;opacity:${motifOpacity}">${mapMotif}</div>

      <div style="display:flex;position:absolute;top:${dotY - ring2R}px;left:${dotX - ring2R}px;width:${ring2R * 2}px;height:${ring2R * 2}px;border-radius:9999px;border:2px solid ${CORAL};opacity:0.30"></div>
      <div style="display:flex;position:absolute;top:${dotY - ringR}px;left:${dotX - ringR}px;width:${ringR * 2}px;height:${ringR * 2}px;border-radius:9999px;border:3px solid ${CORAL};opacity:0.65"></div>
      <div style="display:flex;position:absolute;top:${dotY - dotR}px;left:${dotX - dotR}px;width:${dotR * 2}px;height:${dotR * 2}px;border-radius:9999px;background:${CORAL}"></div>

      <div style="display:flex;position:absolute;top:${dotY - 38}px;left:${dotX - 140}px;font-family:JetBrains Mono;font-size:15px;font-weight:500;letter-spacing:0.2em;color:${BRAND.forest};text-transform:uppercase">Bogotá</div>
      <div style="display:flex;position:absolute;top:${dotY - 14}px;left:${dotX - 140}px;font-family:Inter;font-size:13px;font-weight:500;color:${BRAND.ink2}">Hub presencial</div>

      <div style="display:flex;flex-direction:column;width:${W}px;height:${H}px;padding:${padT}px ${padX}px ${padB}px ${padX}px">

        <div style="display:flex;flex-direction:column;max-width:560px">
          <div style="display:flex;font-family:JetBrains Mono;font-size:15px;letter-spacing:0.18em;color:${CORAL};text-transform:uppercase;margin-bottom:14px">Hub Bogotá · 19–21 jun 2026</div>
          <div style="display:flex;font-family:Bricolage Grotesque;font-weight:700;font-size:64px;line-height:0.97;letter-spacing:-0.02em;color:${BRAND.forest}">Global South</div>
          <div style="display:flex;font-family:Bricolage Grotesque;font-weight:700;font-size:64px;line-height:0.97;letter-spacing:-0.02em;color:${BRAND.forest}">AI Safety</div>
          <div style="display:flex;font-family:Bricolage Grotesque;font-weight:700;font-size:64px;line-height:0.97;letter-spacing:-0.02em;color:${BRAND.forest}">Hackathon</div>
          <div style="display:flex;font-family:Inter;font-weight:500;font-size:21px;line-height:1.4;color:${BRAND.ink2};max-width:520px;margin-top:18px">Tres días para construir proyectos técnicos de seguridad y gobernanza de IA con relevancia para América Latina.</div>
        </div>

        <div style="display:flex;flex-direction:column;margin-top:auto">

          <div style="display:flex;flex-direction:column;gap:7px;max-width:560px;margin-bottom:24px">
            ${bodyRow('Charlas', 'Investigador colombiano en OpenAI y congresista autor del proyecto de ley sobre armas autónomas.')}
            ${bodyRow('Jueces', 'Expertos de OpenAI, UC Berkeley, BID Lab.')}
            ${bodyRow('Apart Lab', 'Los ganadores acceden al fellowship para convertir su prototipo en investigación publicable.')}
          </div>

          <div style="display:flex;align-items:center;gap:18px;margin-bottom:20px">
            <div style="display:flex;font-family:Bricolage Grotesque;font-weight:800;font-size:54px;line-height:0.95;letter-spacing:-0.03em;color:${BRAND.forest}">USD 3.000</div>
            <div style="display:flex;flex-direction:column">
              <div style="display:flex;font-family:Inter;font-weight:600;font-size:18px;line-height:1.3;color:${BRAND.ink}">3 equipos × USD 1.000 c/u</div>
              <div style="display:flex;font-family:Inter;font-weight:700;font-size:18px;line-height:1.3;color:${CORAL}">Postula antes del 12 de junio</div>
            </div>
          </div>

          <div style="display:flex;align-items:flex-end;justify-content:space-between">
            <div style="display:flex;flex-direction:column;align-items:center;gap:10px">
              <div style="display:flex;padding:7px;border:${qrBorder}px solid ${MINT};border-radius:${qrRadius}px;background:#fff">
                <img src="${qr}" style="display:flex;width:${qrDisp}px;height:${qrDisp}px"/>
              </div>
              <div style="display:flex;font-family:JetBrains Mono;font-size:13px;letter-spacing:0.2em;color:${BRAND.forest};text-transform:uppercase">Escanea e inscríbete</div>
            </div>
            <div style="display:flex;flex-direction:column;align-items:flex-end;gap:6px">
              <div style="display:flex;font-family:JetBrains Mono;font-size:12px;letter-spacing:0.18em;color:#999;text-transform:uppercase">Organizan</div>
              ${hostsRow({ color: BRAND.ink2, fontSize: 16, ...logos })}
            </div>
          </div>

        </div>

      </div>

    </div>
  `;

  const png = await render(html(source), W, H);
  return { filename: 'linkedin-v3c-motif.png', png };
}
