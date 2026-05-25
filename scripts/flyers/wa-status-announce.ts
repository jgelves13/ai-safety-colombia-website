import { render, html, BRAND, hostsRow, getLogos } from './lib';

export default async function () {
  const W = 1080;
  const H = 1920;

  const logos = await getLogos();
  const source = `
    <div style="display:flex;flex-direction:column;width:${W}px;height:${H}px;background:${BRAND.cream};font-family:Inter;padding:240px 96px 200px 96px;justify-content:space-between;align-items:flex-start">

      <div style="display:flex;align-items:center;gap:14px">
        <div style="display:flex;width:16px;height:16px;border-radius:9999px;background:${BRAND.coral}"></div>
        <div style="display:flex;font-family:JetBrains Mono;font-size:26px;letter-spacing:0.22em;text-transform:uppercase;color:${BRAND.coral}">Hackathon</div>
      </div>

      <div style="display:flex;flex-direction:column;gap:40px">
        <div style="display:flex;font-family:Bricolage Grotesque;font-weight:700;font-size:88px;line-height:0.98;letter-spacing:-0.02em;color:${BRAND.forest};max-width:880px">Global South AI Safety Hackathon</div>
        <div style="display:flex;flex-direction:column;gap:10px">
          <div style="display:flex;font-family:Bricolage Grotesque;font-weight:800;font-size:200px;line-height:0.92;letter-spacing:-0.03em;color:${BRAND.forest}">19–21</div>
          <div style="display:flex;font-family:Bricolage Grotesque;font-weight:700;font-size:96px;line-height:1;color:${BRAND.forest}">JUN 2026</div>
        </div>
      </div>

      <div style="display:flex;flex-direction:column;gap:18px">
        <div style="display:flex;font-family:Inter;font-weight:700;font-size:32px;color:${BRAND.forest}">Hub Bogotá + remoto</div>
        ${hostsRow({ color: BRAND.ink2, fontSize: 22, ...logos })}
      </div>

    </div>
  `;

  const png = await render(html(source), W, H);
  return { filename: 'aisc-wa-status-hackathon-2026-06-announce-es.png', png };
}
