import { render, html, BRAND, regionMotif, hostsRow, getLogos, qrPngDataUrl } from './lib';

export default async function () {
  const W = 1080;
  const H = 1080;

  const logos = await getLogos();
  const outline = regionMotif({ stroke: BRAND.forest, strokeWidth: 6, width: 300, height: 500 });
  const qr = await qrPngDataUrl('https://aisafetycolombia.org/hackathon/', 320);

  const source = `
    <div style="display:flex;width:${W}px;height:${H}px;background:${BRAND.cream};font-family:Inter;position:relative">

      <div style="display:flex;flex-direction:column;width:${W}px;height:${H}px;padding:80px 80px 80px 80px;justify-content:space-between">

        <div style="display:flex;align-items:center;gap:12px">
          <div style="display:flex;width:14px;height:14px;border-radius:9999px;background:${BRAND.coral}"></div>
          <div style="display:flex;font-family:JetBrains Mono;font-size:22px;letter-spacing:0.20em;text-transform:uppercase;color:${BRAND.coral}">Hackathon</div>
        </div>

        <div style="display:flex;flex-direction:column;gap:24px;max-width:780px">
          <div style="display:flex;font-family:Bricolage Grotesque;font-weight:700;font-size:84px;line-height:0.98;letter-spacing:-0.02em;color:${BRAND.forest}">Global South AI Safety Hackathon</div>
          <div style="display:flex;font-family:Inter;font-weight:500;font-size:26px;line-height:1.4;color:${BRAND.ink2};max-width:720px">Tres días para construir proyectos de seguridad de IA con relevancia para América Latina.</div>
        </div>

        <div style="display:flex;flex-direction:column;gap:10px">
          <div style="display:flex;font-family:Bricolage Grotesque;font-weight:800;font-size:72px;line-height:1;letter-spacing:-0.02em;color:${BRAND.forest}">19–21 jun 2026</div>
          <div style="display:flex;font-family:Inter;font-weight:600;font-size:24px;color:${BRAND.ink2}">Hub Bogotá presencial · remoto desde todo el Sur Global</div>
        </div>

        <div style="display:flex;align-items:center;height:54px;padding:0 22px;border:1.5px solid ${BRAND.forest};border-radius:9999px;font-family:Inter;font-weight:600;font-size:22px;color:${BRAND.forest};align-self:flex-start">USD 1.000 por equipo · 3 ganadores LATAM</div>

        <div style="display:flex;align-items:center;gap:28px">
          <img src="${qr}" style="display:flex;width:200px;height:200px;border-radius:12px"/>
          <div style="display:flex;flex-direction:column;gap:8px">
            <div style="display:flex;font-family:JetBrains Mono;font-size:18px;letter-spacing:0.18em;text-transform:uppercase;color:${BRAND.coral}">Escanea e inscríbete</div>
            <div style="display:flex;font-family:Bricolage Grotesque;font-weight:700;font-size:30px;line-height:1.1;letter-spacing:-0.01em;color:${BRAND.forest};white-space:nowrap">aisafetycolombia.org/hackathon</div>
            ${hostsRow({ color: BRAND.ink2, fontSize: 16, ...logos })}
          </div>
        </div>

      </div>

      <div style="display:flex;position:absolute;top:50px;right:30px;opacity:0.20">${outline}</div>

    </div>
  `;

  const png = await render(html(source), W, H);
  return { filename: '_v2-aisc-ig-feed-hackathon-2026-06-announce-es.png', png };
}
