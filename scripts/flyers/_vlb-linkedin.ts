import { render, html, BRAND, hostsRow, getLogos, qrPngDataUrl, latAmOutline } from './lib';

export default async function () {
  const W = 1080;
  const H = 1350;

  const padT = 120;
  const padX = 80;
  const padB = 90;

  const motifW = 500;
  const motifH = 833;
  const motifTop = 600;
  const motifRight = -30;
  const motifOpacity = 0.30;
  const motifStroke = 11;

  const qrSrc = 380;
  const qrDisp = 196;
  const qrBorder = 7;
  const qrRadius = 16;

  const MINT = '#5BFFA8';
  const CORAL = '#E5604D';

  const logos = await getLogos();
  const qr = await qrPngDataUrl('https://aisafetycolombia.org/hackathon/', qrSrc);

  const mapMotif = latAmOutline({ stroke: BRAND.forest, strokeWidth: motifStroke, width: motifW, height: motifH, omitDot: true });

  const motifLeft = W - motifRight - motifW;
  const dotX = motifLeft + Math.round((314 / 600) * motifW);
  const dotY = motifTop + Math.round((311 / 1000) * motifH);
  const dotR = 18;
  const ringR = dotR + 14;

  const bodyItem = (lead: string, body: string) => `
    <div style="display:flex;flex-direction:column">
      <div style="display:flex;font-family:Inter;font-weight:700;font-size:23px;line-height:1.4;letter-spacing:-0.005em;color:${BRAND.forest};margin-bottom:2px">${lead}</div>
      <div style="display:flex;font-family:Inter;font-weight:500;font-size:23px;line-height:1.4;color:${BRAND.ink}">${body}</div>
    </div>
  `;

  const source = `
    <div style="display:flex;width:${W}px;height:${H}px;background:${BRAND.cream};font-family:Inter;position:relative;overflow:hidden">

      <div style="display:flex;position:absolute;top:${motifTop}px;right:${motifRight}px;opacity:${motifOpacity}">${mapMotif}</div>

      <div style="display:flex;position:absolute;top:${dotY - ringR}px;left:${dotX - ringR}px;width:${ringR * 2}px;height:${ringR * 2}px;border-radius:9999px;border:3px solid ${CORAL};opacity:0.55"></div>
      <div style="display:flex;position:absolute;top:${dotY - dotR}px;left:${dotX - dotR}px;width:${dotR * 2}px;height:${dotR * 2}px;border-radius:9999px;background:${CORAL}"></div>

      <div style="display:flex;flex-direction:column;width:${W}px;height:${H}px;padding:${padT}px ${padX}px ${padB}px ${padX}px;justify-content:space-between">

        <div style="display:flex;flex-direction:column;max-width:940px">
          <div style="display:flex;font-family:JetBrains Mono;font-size:16px;letter-spacing:0.18em;color:${CORAL};text-transform:uppercase;margin-bottom:14px">Hub Bogotá · 19–21 jun 2026 · postulaciones hasta 12 jun</div>
          <div style="display:flex;font-family:Bricolage Grotesque;font-weight:700;font-size:96px;line-height:0.97;letter-spacing:-0.02em;color:${BRAND.forest}">Global South AI Safety Hackathon</div>
          <div style="display:flex;font-family:Inter;font-weight:500;font-size:26px;line-height:1.4;color:${BRAND.ink2};max-width:820px;margin-top:24px">Tres días para construir proyectos técnicos de seguridad y gobernanza de IA con relevancia para América Latina.</div>
        </div>

        <div style="display:flex;flex-direction:column;gap:14px;max-width:940px">
          ${bodyItem('Charlas de apertura', 'Investigador colombiano en OpenAI y congresista autor del proyecto de ley sobre armas autónomas.')}
          ${bodyItem('Jueces', 'Con expertos de OpenAI, UC Berkeley, BID Lab, entre otros.')}
          ${bodyItem('Apart Lab Fellowship', 'Los equipos ganadores acceden al fellowship para convertir su prototipo en investigación publicable, con mentoría continua. Apart Lab acumula 22 publicaciones en ICLR, NeurIPS y ACL.')}
        </div>

        <div style="display:flex;flex-direction:column;gap:10px">
          <div style="display:flex;font-family:Bricolage Grotesque;font-weight:800;font-size:80px;line-height:0.95;letter-spacing:-0.03em;color:${BRAND.forest}">USD 3.000</div>
          <div style="display:flex;font-family:Inter;font-weight:600;font-size:24px;line-height:1.3;color:${BRAND.ink};max-width:840px">USD 1.000 para cada uno de los 3 equipos ganadores de América Latina.</div>
          <div style="display:flex;font-family:Inter;font-weight:500;font-size:22px;line-height:1.3;color:${BRAND.ink2}">Hub Bogotá presencial · remoto desde el Sur Global</div>
          <div style="display:flex;font-family:Inter;font-weight:700;font-size:22px;line-height:1.3;color:${CORAL};margin-top:2px">Postula antes del 12 de junio</div>
        </div>

        <div style="display:flex;align-items:flex-end;justify-content:space-between">
          <div style="display:flex;flex-direction:column;align-items:center;gap:10px">
            <div style="display:flex;padding:7px;border:${qrBorder}px solid ${MINT};border-radius:${qrRadius}px;background:#fff">
              <img src="${qr}" style="display:flex;width:${qrDisp}px;height:${qrDisp}px"/>
            </div>
            <div style="display:flex;font-family:JetBrains Mono;font-size:14px;letter-spacing:0.2em;color:${BRAND.forest};text-transform:uppercase">Escanea e inscríbete</div>
          </div>
          <div style="display:flex;flex-direction:column;align-items:flex-end;gap:6px">
            <div style="display:flex;font-family:JetBrains Mono;font-size:12px;letter-spacing:0.18em;color:#999;text-transform:uppercase">Organizan</div>
            ${hostsRow({ color: BRAND.ink2, fontSize: 17, ...logos })}
          </div>
        </div>

      </div>

    </div>
  `;

  const png = await render(html(source), W, H);
  return { filename: 'linkedin-flyer.png', png };
}
