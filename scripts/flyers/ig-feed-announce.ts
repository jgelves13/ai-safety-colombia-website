import { render, html, BRAND, regionMotif, hostsRow, getLogos } from './lib';

export default async function () {
  const W = 1080;
  const H = 1080;

  const logos = await getLogos();
  const outline = regionMotif({ stroke: BRAND.forest, strokeWidth: 7, width: 420, height: 700 });

  const source = `
    <div style="display:flex;width:${W}px;height:${H}px;background:${BRAND.cream};font-family:Inter;position:relative">

      <div style="display:flex;flex-direction:column;width:${W}px;height:${H}px;padding:96px 96px 88px 96px;justify-content:space-between">

        <div style="display:flex;align-items:center;gap:14px">
          <div style="display:flex;width:14px;height:14px;border-radius:9999px;background:${BRAND.coral}"></div>
          <div style="display:flex;font-family:JetBrains Mono;font-size:24px;letter-spacing:0.20em;text-transform:uppercase;color:${BRAND.coral}">Hackathon</div>
        </div>

        <div style="display:flex;flex-direction:column;gap:36px">
          <div style="display:flex;font-family:Bricolage Grotesque;font-weight:700;font-size:88px;line-height:0.98;letter-spacing:-0.02em;color:${BRAND.forest};max-width:780px">Global South AI Safety Hackathon</div>
          <div style="display:flex;flex-direction:column;gap:6px">
            <div style="display:flex;font-family:Bricolage Grotesque;font-weight:800;font-size:132px;line-height:0.95;letter-spacing:-0.03em;color:${BRAND.forest}">19–21 JUN</div>
            <div style="display:flex;font-family:Bricolage Grotesque;font-weight:700;font-size:60px;line-height:1;color:${BRAND.forest}">2026</div>
          </div>
        </div>

        <div style="display:flex;flex-direction:column;gap:14px">
          <div style="display:flex;font-family:Inter;font-weight:700;font-size:28px;color:${BRAND.forest}">Hub Bogotá + remoto</div>
          ${hostsRow({ color: BRAND.ink2, fontSize: 18, ...logos })}
        </div>

      </div>

      <div style="display:flex;position:absolute;top:100px;right:60px;opacity:0.42">${outline}</div>

    </div>
  `;

  const png = await render(html(source), W, H);
  return { filename: 'aisc-ig-feed-hackathon-2026-06-announce-es.png', png };
}
