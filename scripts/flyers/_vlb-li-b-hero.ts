import { render, html, BRAND, hostsRow, getLogos, qrPngDataUrl, latAmOutline } from './lib';

// Variant B — Hero-Number Gravity
// USD 3.000 becomes THE hero, set massive. Title demotes to second tier.
// Performance-driven, scroll-stopping for LinkedIn feed.

export default async function () {
  const W = 1080;
  const H = 1350;

  const padT = 110;
  const padX = 80;
  const padB = 70;

  const motifW = 360;
  const motifH = 600;
  const motifTop = 700;
  const motifRight = -60;
  const motifOpacity = 0.14;
  const motifStroke = 8;

  const qrSrc = 380;
  const qrDisp = 174;
  const qrBorder = 7;
  const qrRadius = 16;

  const MINT = '#5BFFA8';
  const CORAL = '#E5604D';

  const logos = await getLogos();
  const qr = await qrPngDataUrl('https://aisafetycolombia.org/hackathon/', qrSrc);
  const mapMotif = latAmOutline({ stroke: BRAND.forest, strokeWidth: motifStroke, width: motifW, height: motifH });

  const bodyRow = (lead: string, body: string) => `
    <div style="display:flex;align-items:flex-start;gap:10px">
      <div style="display:flex;font-family:Inter;font-weight:700;font-size:21px;line-height:1.4;color:${BRAND.forest};flex-shrink:0">${lead} ·</div>
      <div style="display:flex;font-family:Inter;font-weight:500;font-size:21px;line-height:1.4;color:${BRAND.ink};flex:1">${body}</div>
    </div>
  `;

  const source = `
    <div style="display:flex;width:${W}px;height:${H}px;background:${BRAND.cream};font-family:Inter;position:relative;overflow:hidden">

      <div style="display:flex;position:absolute;top:${motifTop}px;right:${motifRight}px;opacity:${motifOpacity}">${mapMotif}</div>

      <div style="display:flex;flex-direction:column;width:${W}px;height:${H}px;padding:${padT}px ${padX}px ${padB}px ${padX}px">

        <div style="display:flex;flex-direction:column">
          <div style="display:flex;font-family:JetBrains Mono;font-size:15px;letter-spacing:0.2em;color:${CORAL};text-transform:uppercase;margin-bottom:18px">Hub Bogotá · 19–21 jun 2026</div>

          <div style="display:flex;font-family:JetBrains Mono;font-weight:500;font-size:18px;letter-spacing:0.16em;color:${BRAND.ink2};text-transform:uppercase;margin-bottom:-4px">En premios</div>
          <div style="display:flex;font-family:Bricolage Grotesque;font-weight:800;font-size:184px;line-height:0.9;letter-spacing:-0.04em;color:${BRAND.forest}">USD 3.000</div>

          <div style="display:flex;align-items:center;gap:14px;margin-top:10px">
            <div style="display:flex;width:54px;height:4px;background:${CORAL}"></div>
            <div style="display:flex;font-family:Inter;font-weight:600;font-size:23px;color:${BRAND.ink}">3 equipos ganadores · USD 1.000 c/u · LATAM</div>
          </div>
        </div>

        <div style="display:flex;flex-direction:column;margin-top:40px;max-width:880px">
          <div style="display:flex;font-family:Bricolage Grotesque;font-weight:700;font-size:60px;line-height:0.98;letter-spacing:-0.02em;color:${BRAND.forest}">Global South AI Safety Hackathon</div>
          <div style="display:flex;font-family:Inter;font-weight:500;font-size:22px;line-height:1.4;color:${BRAND.ink2};max-width:820px;margin-top:14px">Tres días para construir proyectos técnicos de seguridad y gobernanza de IA con relevancia para América Latina.</div>
        </div>

        <div style="display:flex;flex-direction:column;gap:10px;max-width:880px;margin-top:22px">
          ${bodyRow('Charlas', 'Investigador colombiano en OpenAI y congresista autor del proyecto de ley sobre armas autónomas.')}
          ${bodyRow('Jueces', 'Expertos de OpenAI, UC Berkeley, BID Lab, entre otros.')}
          ${bodyRow('Apart Lab', 'Los ganadores acceden al fellowship para convertir su prototipo en investigación publicable.')}
        </div>

        <div style="display:flex;flex-direction:column;margin-top:auto">
          <div style="display:flex;font-family:Inter;font-weight:700;font-size:22px;color:${CORAL};margin-bottom:18px">Postula antes del 12 de junio</div>

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
  return { filename: 'linkedin-v3b-hero.png', png };
}
