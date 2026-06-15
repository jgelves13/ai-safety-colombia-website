import { render, html, BRAND, hostsRow, getLogos, qrPngDataUrl, latAmOutline } from './lib';

// Variant D — Magazine Cover / Editorial
// Dateline strip, rule lines, drop cap, section markers, marginalia.
// Feels publication-grade; typographic furniture breaks the column.

export default async function () {
  const W = 1080;
  const H = 1350;

  const padT = 90;
  const padX = 80;
  const padB = 70;

  const motifW = 360;
  const motifH = 600;
  const motifTop = 640;
  const motifRight = -50;
  const motifOpacity = 0.14;
  const motifStroke = 8;

  const qrSrc = 380;
  const qrDisp = 174;
  const qrBorder = 7;
  const qrRadius = 16;

  const MINT = '#5BFFA8';
  const CORAL = '#E5604D';
  const HAIRLINE = '#D9CFB7';

  const logos = await getLogos();
  const qr = await qrPngDataUrl('https://aisafetycolombia.org/hackathon/', qrSrc);
  const mapMotif = latAmOutline({ stroke: BRAND.forest, strokeWidth: motifStroke, width: motifW, height: motifH });

  const sectionItem = (lead: string, body: string) => `
    <div style="display:flex;align-items:flex-start;gap:14px">
      <div style="display:flex;font-family:Bricolage Grotesque;font-weight:700;font-size:24px;line-height:1.3;color:${CORAL};width:22px">§</div>
      <div style="display:flex;flex-direction:column;flex:1">
        <div style="display:flex;font-family:Inter;font-weight:700;font-size:20px;line-height:1.35;letter-spacing:-0.005em;color:${BRAND.forest}">${lead}</div>
        <div style="display:flex;font-family:Inter;font-weight:500;font-size:20px;line-height:1.4;color:${BRAND.ink}">${body}</div>
      </div>
    </div>
  `;

  const source = `
    <div style="display:flex;width:${W}px;height:${H}px;background:${BRAND.cream};font-family:Inter;position:relative;overflow:hidden">

      <div style="display:flex;position:absolute;top:${motifTop}px;right:${motifRight}px;opacity:${motifOpacity}">${mapMotif}</div>

      <div style="display:flex;flex-direction:column;width:${W}px;height:${H}px;padding:${padT}px ${padX}px ${padB}px ${padX}px">

        <div style="display:flex;flex-direction:column">
          <div style="display:flex;align-items:center;gap:12px;margin-bottom:6px">
            <div style="display:flex;height:1px;width:36px;background:${BRAND.forest}"></div>
            <div style="display:flex;font-family:JetBrains Mono;font-size:14px;letter-spacing:0.22em;color:${BRAND.forest};text-transform:uppercase">N° 01 · Bogotá Edition</div>
            <div style="display:flex;height:1px;flex:1;background:${HAIRLINE}"></div>
          </div>
          <div style="display:flex;justify-content:space-between;align-items:baseline">
            <div style="display:flex;font-family:JetBrains Mono;font-size:13px;letter-spacing:0.18em;color:${BRAND.ink2};text-transform:uppercase">19–21 Jun 2026</div>
            <div style="display:flex;font-family:JetBrains Mono;font-size:13px;letter-spacing:0.18em;color:${CORAL};text-transform:uppercase">Postulaciones hasta 12 jun</div>
          </div>
        </div>

        <div style="display:flex;flex-direction:column;margin-top:48px">
          <div style="display:flex;font-family:Bricolage Grotesque;font-weight:700;font-size:96px;line-height:0.93;letter-spacing:-0.025em;color:${BRAND.forest}">Global South</div>
          <div style="display:flex;font-family:Bricolage Grotesque;font-weight:700;font-size:96px;line-height:0.93;letter-spacing:-0.025em;color:${BRAND.forest}">AI Safety</div>
          <div style="display:flex;font-family:Bricolage Grotesque;font-weight:700;font-size:96px;line-height:0.93;letter-spacing:-0.025em;color:${BRAND.forest}">Hackathon</div>
        </div>

        <div style="display:flex;align-items:center;gap:12px;margin-top:24px">
          <div style="display:flex;height:1px;flex:1;background:${BRAND.forest}"></div>
        </div>

        <div style="display:flex;align-items:flex-start;gap:18px;margin-top:18px">
          <div style="display:flex;font-family:Bricolage Grotesque;font-weight:800;font-size:84px;line-height:0.85;letter-spacing:-0.04em;color:${CORAL};margin-top:-6px">T</div>
          <div style="display:flex;font-family:Inter;font-weight:500;font-size:22px;line-height:1.42;color:${BRAND.ink2};max-width:780px;padding-top:6px">res días para construir proyectos técnicos de seguridad y gobernanza de IA con relevancia para América Latina.</div>
        </div>

        <div style="display:flex;flex-direction:column;gap:12px;margin-top:28px">
          ${sectionItem('Charlas de apertura', 'Investigador colombiano en OpenAI y congresista autor del proyecto de ley sobre armas autónomas.')}
          ${sectionItem('Jueces', 'Con expertos de OpenAI, UC Berkeley, BID Lab, entre otros.')}
          ${sectionItem('Apart Lab Fellowship', 'Los ganadores acceden al fellowship para convertir su prototipo en investigación publicable.')}
        </div>

        <div style="display:flex;height:1px;background:${BRAND.forest};margin-top:24px"></div>

        <div style="display:flex;align-items:center;gap:18px;margin-top:18px">
          <div style="display:flex;font-family:Bricolage Grotesque;font-weight:800;font-size:54px;line-height:0.9;letter-spacing:-0.03em;color:${BRAND.forest}">USD 3.000</div>
          <div style="display:flex;font-family:Inter;font-weight:700;font-size:22px;color:${CORAL}">/</div>
          <div style="display:flex;font-family:Inter;font-weight:600;font-size:20px;line-height:1.3;color:${BRAND.ink}">3 equipos LATAM · USD 1.000 c/u</div>
        </div>

        <div style="display:flex;align-items:flex-end;justify-content:space-between;margin-top:auto;padding-top:20px">
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
  return { filename: 'linkedin-v3d-editorial.png', png };
}
