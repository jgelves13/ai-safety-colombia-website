import { render, html, BRAND, hostsRow, getLogos, qrPngDataUrl } from './lib';

export default async function () {
  const W = 1080;
  const H = 1080;

  const logos = await getLogos();
  const qr = await qrPngDataUrl('https://aisafetycolombia.org/hackathon/', 320);
  const MINT = '#5BFFA8';
  const INK = '#0C0C0C';

  const asteriskSvg = `<svg width="220" height="220" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style="display:flex"><g transform="translate(50,50) rotate(-12)"><rect x="-6" y="-44" width="12" height="88" rx="3" fill="${MINT}"/><rect x="-6" y="-44" width="12" height="88" rx="3" fill="${MINT}" transform="rotate(60)"/><rect x="-6" y="-44" width="12" height="88" rx="3" fill="${MINT}" transform="rotate(120)"/></g></svg>`;

  const source = `
    <div style="display:flex;width:${W}px;height:${H}px;background:${BRAND.cream};font-family:Inter;position:relative;overflow:hidden">

      <div style="display:flex;position:absolute;top:-40px;right:-40px">${asteriskSvg}</div>

      <div style="display:flex;flex-direction:column;width:${W}px;height:${H}px;padding:70px 80px 70px 80px;justify-content:space-between">

        <div style="display:flex;align-items:center;height:36px;padding:0 14px;background:${BRAND.forest};border-radius:4px;font-family:JetBrains Mono;font-size:18px;letter-spacing:0.20em;text-transform:uppercase;color:${BRAND.cream};align-self:flex-start">Hackathon</div>

        <div style="display:flex;flex-direction:column;gap:36px;margin-top:-20px">
          <div style="display:flex;font-family:Bricolage Grotesque;font-weight:800;font-size:136px;line-height:0.92;letter-spacing:-0.035em;color:${INK};width:1180px;margin-left:-40px">Global South AI Safety Hackathon</div>
          <div style="display:flex;font-family:Inter;font-weight:700;font-size:28px;line-height:1.3;color:${BRAND.coral};max-width:760px">Tres días para construir proyectos técnicos de seguridad y gobernanza de IA con relevancia para América Latina.</div>
        </div>

        <div style="display:flex;flex-direction:column;gap:14px">
          <div style="display:flex;align-items:center;justify-content:space-between;padding:18px 0;border-top:1.5px solid ${INK};border-bottom:1.5px solid ${INK}">
            <div style="display:flex;font-family:JetBrains Mono;font-size:38px;letter-spacing:0.18em;color:${INK}">19–21 JUN 2026</div>
            <div style="display:flex;font-family:Inter;font-weight:500;font-size:20px;color:${INK}">Hub Bogotá · remoto Sur Global</div>
          </div>
          <div style="display:flex;font-family:Bricolage Grotesque;font-weight:700;font-size:32px;color:${BRAND.forest};margin-top:6px">USD 1.000 por equipo · 3 ganadores LATAM</div>
        </div>

        <div style="display:flex;align-items:flex-end;justify-content:space-between">
          <img src="${qr}" style="display:flex;width:200px;height:200px;border:2px solid ${INK}"/>
          <div style="display:flex;flex-direction:column;align-items:flex-end;gap:14px">
            ${hostsRow({ color: BRAND.ink2, fontSize: 16, ...logos })}
          </div>
        </div>

      </div>

    </div>
  `;

  const png = await render(html(source), W, H);
  return { filename: '_v3b-brutalist.png', png };
}
