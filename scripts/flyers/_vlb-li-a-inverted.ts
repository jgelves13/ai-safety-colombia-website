import { render, html, BRAND, hostsRow, getLogos, qrPngDataUrl, latAmOutline } from './lib';

// Variant A — Inverted Prize Card
// Prize block flipped to a deep-forest dark band with mint accents.
// Breaks the cream-on-cream uniformity. Gives USD 3.000 its own visual zone.

export default async function () {
  const W = 1080;
  const H = 1350;

  const padT = 130;
  const padX = 80;
  const padB = 70;

  const motifW = 420;
  const motifH = 700;
  const motifTop = 220;
  const motifRight = -80;
  const motifOpacity = 0.18;
  const motifStroke = 9;

  const qrSrc = 380;
  const qrDisp = 184;
  const qrBorder = 7;
  const qrRadius = 16;

  const MINT = '#5BFFA8';
  const CORAL = '#E5604D';
  const DEEP = '#143620';
  const MUTED = '#9FB3A4';

  const logos = await getLogos();
  const qr = await qrPngDataUrl('https://aisafetycolombia.org/hackathon/', qrSrc);
  const mapMotif = latAmOutline({ stroke: BRAND.forest, strokeWidth: motifStroke, width: motifW, height: motifH });

  const bodyItem = (lead: string, body: string) => `
    <div style="display:flex;flex-direction:column">
      <div style="display:flex;font-family:Inter;font-weight:700;font-size:22px;line-height:1.35;letter-spacing:-0.005em;color:${BRAND.forest};margin-bottom:2px">${lead}</div>
      <div style="display:flex;font-family:Inter;font-weight:500;font-size:22px;line-height:1.35;color:${BRAND.ink}">${body}</div>
    </div>
  `;

  const source = `
    <div style="display:flex;width:${W}px;height:${H}px;background:${BRAND.cream};font-family:Inter;position:relative;overflow:hidden">

      <div style="display:flex;position:absolute;top:${motifTop}px;right:${motifRight}px;opacity:${motifOpacity}">${mapMotif}</div>

      <div style="display:flex;flex-direction:column;width:${W}px;height:${H}px;padding:${padT}px ${padX}px ${padB}px ${padX}px">

        <div style="display:flex;flex-direction:column;max-width:940px">
          <div style="display:flex;font-family:JetBrains Mono;font-size:16px;letter-spacing:0.18em;color:${CORAL};text-transform:uppercase;margin-bottom:14px">Hub Bogotá · 19–21 jun 2026 · postulaciones hasta 12 jun</div>
          <div style="display:flex;font-family:Bricolage Grotesque;font-weight:700;font-size:90px;line-height:0.97;letter-spacing:-0.02em;color:${BRAND.forest}">Global South AI Safety Hackathon</div>
          <div style="display:flex;font-family:Inter;font-weight:500;font-size:24px;line-height:1.4;color:${BRAND.ink2};max-width:820px;margin-top:18px">Tres días para construir proyectos técnicos de seguridad y gobernanza de IA con relevancia para América Latina.</div>
        </div>

        <div style="display:flex;flex-direction:column;gap:11px;max-width:940px;margin-top:34px">
          ${bodyItem('Charlas de apertura', 'Investigador colombiano en OpenAI y congresista autor del proyecto de ley sobre armas autónomas.')}
          ${bodyItem('Jueces', 'Con expertos de OpenAI, UC Berkeley, BID Lab, entre otros.')}
          ${bodyItem('Apart Lab Fellowship', 'Los ganadores acceden al fellowship para convertir su prototipo en investigación publicable.')}
        </div>

        <div style="display:flex;flex-direction:column;margin:30px -${padX}px 0 -${padX}px;padding:34px ${padX}px 36px ${padX}px;background:${DEEP};position:relative">
          <div style="display:flex;align-items:flex-end;gap:18px">
            <div style="display:flex;font-family:Bricolage Grotesque;font-weight:800;font-size:90px;line-height:0.92;letter-spacing:-0.03em;color:${MINT}">USD 3.000</div>
            <div style="display:flex;font-family:JetBrains Mono;font-size:13px;letter-spacing:0.2em;color:${MUTED};text-transform:uppercase;padding-bottom:14px">en premios</div>
          </div>
          <div style="display:flex;font-family:Inter;font-weight:600;font-size:22px;line-height:1.3;color:${BRAND.cream};margin-top:10px">USD 1.000 para cada uno de los 3 equipos ganadores de América Latina.</div>
          <div style="display:flex;font-family:Inter;font-weight:500;font-size:20px;line-height:1.3;color:${MUTED};margin-top:4px">Hub Bogotá presencial · remoto desde el Sur Global</div>
          <div style="display:flex;font-family:Inter;font-weight:700;font-size:21px;line-height:1.3;color:${CORAL};margin-top:8px">Postula antes del 12 de junio</div>
        </div>

        <div style="display:flex;align-items:flex-end;justify-content:space-between;margin-top:28px">
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
  `;

  const png = await render(html(source), W, H);
  return { filename: 'linkedin-v3a-inverted.png', png };
}
