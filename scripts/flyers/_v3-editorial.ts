import { render, html, BRAND, latAmOutline, hostsRow, getLogos, qrPngDataUrl } from './lib';

export default async function () {
  const W = 1080;
  const H = 1080;

  const logos = await getLogos();
  const outline = latAmOutline({ stroke: BRAND.forest, strokeWidth: 5, width: 280, height: 460 });
  const qr = await qrPngDataUrl('https://aisafetycolombia.org/hackathon/', 320);

  const source = `
    <div style="display:flex;width:${W}px;height:${H}px;background:${BRAND.cream};font-family:Inter;position:relative">

      <div style="display:flex;position:absolute;top:240px;right:60px;opacity:0.08">${outline}</div>

      <div style="display:flex;flex-direction:column;width:${W}px;height:${H}px;padding:90px 90px 80px 90px;justify-content:space-between">

        <div style="display:flex;flex-direction:column;gap:48px">
          <div style="display:flex;align-items:center;gap:12px">
            <div style="display:flex;width:14px;height:14px;border-radius:9999px;background:${BRAND.coral}"></div>
            <div style="display:flex;font-family:JetBrains Mono;font-size:22px;letter-spacing:0.22em;text-transform:uppercase;color:${BRAND.forest}">Hackathon</div>
          </div>

          <div style="display:flex;flex-direction:column;gap:32px;max-width:760px">
            <div style="display:flex;font-family:Bricolage Grotesque;font-weight:700;font-size:96px;line-height:0.96;letter-spacing:-0.025em;color:${BRAND.forest}">Global South AI Safety Hackathon</div>
            <div style="display:flex;font-family:Inter;font-weight:500;font-size:26px;line-height:1.4;color:${BRAND.ink2};max-width:620px">Tres días para construir proyectos técnicos de seguridad y gobernanza de IA con relevancia para América Latina.</div>
          </div>
        </div>

        <div style="display:flex;justify-content:flex-end">
          <div style="display:flex;align-items:center;height:54px;padding:0 24px;border:1.5px solid ${BRAND.forest};border-radius:9999px;font-family:Inter;font-weight:600;font-size:22px;color:${BRAND.forest}">USD 1.000 por equipo · 3 ganadores LATAM</div>
        </div>

        <div style="display:flex;flex-direction:column;gap:18px">
          <div style="display:flex;flex-direction:column;gap:6px">
            <div style="display:flex;font-family:Bricolage Grotesque;font-weight:800;font-size:74px;line-height:1;letter-spacing:-0.02em;color:${BRAND.forest}">19–21 JUN</div>
            <div style="display:flex;font-family:Inter;font-weight:600;font-size:24px;color:${BRAND.ink2}">2026 · Hub Bogotá presencial · remoto Sur Global</div>
          </div>

          <div style="display:flex;width:100%;height:1px;background:${BRAND.forest};opacity:0.2"></div>

          <div style="display:flex;justify-content:space-between;align-items:flex-end">
            ${hostsRow({ color: BRAND.ink2, fontSize: 17, ...logos })}
            <div style="display:flex;flex-direction:column;align-items:flex-end;gap:8px">
              <div style="display:flex;font-family:JetBrains Mono;font-size:15px;letter-spacing:0.20em;text-transform:uppercase;color:${BRAND.coral}">Escanea</div>
              <img src="${qr}" style="display:flex;width:180px;height:180px;border-radius:10px"/>
            </div>
          </div>
        </div>

      </div>

    </div>
  `;

  const png = await render(html(source), W, H);
  return { filename: '_v3a-editorial.png', png };
}
