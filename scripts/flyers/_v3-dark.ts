import { render, html, BRAND, hostsRow, getLogos, qrPngDataUrl } from './lib';

export default async function () {
  const W = 1080;
  const H = 1080;

  const logos = await getLogos();
  const qr = await qrPngDataUrl('https://aisafetycolombia.org/hackathon/', 320);
  const DEEP = '#143620';
  const MINT = '#5BFFA8';
  const MUTED = '#9FB3A4';

  const asteriskSvg = `<svg width="110" height="110" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style="display:flex"><g transform="translate(50,50)"><rect x="-5" y="-44" width="10" height="88" rx="3" fill="${MINT}"/><rect x="-5" y="-44" width="10" height="88" rx="3" fill="${MINT}" transform="rotate(60)"/><rect x="-5" y="-44" width="10" height="88" rx="3" fill="${MINT}" transform="rotate(120)"/></g></svg>`;

  const source = `
    <div style="display:flex;width:${W}px;height:${H}px;background:${DEEP};font-family:Inter;position:relative;overflow:hidden">

      <div style="display:flex;position:absolute;top:-140px;right:-140px;width:520px;height:520px;border-radius:9999px;background:${MINT};opacity:0.18;filter:blur(80px)"></div>

      <div style="display:flex;position:absolute;top:80px;right:80px">${asteriskSvg}</div>

      <div style="display:flex;position:absolute;bottom:-180px;left:-180px;width:480px;height:480px;border-radius:9999px;background:${BRAND.coral};opacity:0.10;filter:blur(90px)"></div>

      <div style="display:flex;flex-direction:column;width:${W}px;height:${H}px;padding:90px 80px 70px 80px;justify-content:space-between;align-items:center">

        <div style="display:flex;align-items:center;gap:12px;align-self:flex-start">
          <div style="display:flex;width:14px;height:14px;border-radius:9999px;background:${BRAND.coral}"></div>
          <div style="display:flex;font-family:JetBrains Mono;font-size:22px;letter-spacing:0.22em;text-transform:uppercase;color:${BRAND.coral}">Hackathon</div>
        </div>

        <div style="display:flex;flex-direction:column;gap:28px;align-items:center;text-align:center;margin-top:40px">
          <div style="display:flex;font-family:Bricolage Grotesque;font-weight:700;font-size:94px;line-height:0.95;letter-spacing:-0.02em;color:${BRAND.cream};max-width:880px;text-align:center">Global South AI Safety Hackathon</div>
          <div style="display:flex;font-family:Inter;font-weight:500;font-size:26px;line-height:1.4;color:${MUTED};max-width:720px;text-align:center">Tres días para construir proyectos técnicos de seguridad y gobernanza de IA con relevancia para América Latina.</div>
        </div>

        <div style="display:flex;flex-direction:column;align-items:center;gap:10px">
          <div style="display:flex;font-family:Bricolage Grotesque;font-weight:800;font-size:76px;line-height:1;letter-spacing:-0.02em;color:${BRAND.cream}">19–21 jun 2026</div>
          <div style="display:flex;font-family:Inter;font-weight:600;font-size:22px;color:${MUTED}">Hub Bogotá presencial · remoto desde todo el Sur Global</div>
          <div style="display:flex;align-items:center;height:50px;padding:0 22px;border:1.5px solid ${BRAND.cream};border-radius:9999px;font-family:Inter;font-weight:600;font-size:21px;color:${BRAND.cream};margin-top:14px">USD 1.000 por equipo · 3 ganadores LATAM</div>
        </div>

        <div style="display:flex;flex-direction:column;align-items:center;gap:22px">
          <div style="display:flex;padding:14px;background:${BRAND.cream};border-radius:14px">
            <img src="${qr}" style="display:flex;width:180px;height:180px"/>
          </div>
          <div style="display:flex;padding:14px 26px;background:${BRAND.cream};border-radius:12px">
            ${hostsRow({ color: BRAND.ink2, fontSize: 15, ...logos })}
          </div>
        </div>

      </div>

    </div>
  `;

  const png = await render(html(source), W, H);
  return { filename: '_v3c-dark.png', png };
}
