import { render, html, BRAND, loadHackathon } from './lib';

export default async function () {
  await loadHackathon();
  const W = 1080;
  const H = 1080;

  const markup = html`
    <div style="display:flex;flex-direction:column;width:${W}px;height:${H}px;background:${BRAND.cream};padding:80px;font-family:Inter;position:relative;justify-content:space-between">

      <div style="display:flex;flex-direction:column;gap:20px">
        <div style="display:flex;align-items:center;gap:14px">
          <div style="display:flex;width:14px;height:14px;border-radius:9999px;background:${BRAND.coral}"></div>
          <div style="display:flex;font-family:JetBrains Mono;font-size:22px;letter-spacing:0.18em;text-transform:uppercase;color:${BRAND.coral}">Apart × AI Safety Colombia · Hub Bogotá</div>
        </div>
        <div style="display:flex;font-family:JetBrains Mono;font-size:18px;letter-spacing:0.16em;text-transform:uppercase;color:${BRAND.ink2}">Global South AI Safety Hackathon</div>
      </div>

      <div style="display:flex;flex-direction:column;gap:24px">
        <div style="display:flex;font-family:Bricolage Grotesque;font-weight:800;font-size:148px;line-height:0.95;letter-spacing:-0.025em;color:${BRAND.forest}">19–21 JUN</div>
        <div style="display:flex;font-family:Bricolage Grotesque;font-weight:700;font-size:60px;line-height:1;color:${BRAND.forest}">2026 · participación híbrida</div>
        <div style="display:flex;font-family:Inter;font-weight:500;font-size:28px;color:${BRAND.ink2};margin-top:6px">Sede presencial en Bogotá · participación virtual abierta al Sur Global.</div>
      </div>

      <div style="display:flex;flex-direction:column;gap:24px">
        <div style="display:flex;flex-wrap:wrap;gap:12px">
          <div style="display:flex;align-items:center;gap:10px;padding:10px 18px;border-radius:9999px;border:2px solid ${BRAND.forest}">
            <div style="display:flex;width:10px;height:10px;border-radius:9999px;background:${BRAND.forest}"></div>
            <div style="display:flex;font-family:Inter;font-weight:700;font-size:20px;color:${BRAND.forest}">Technical AI Safety</div>
          </div>
          <div style="display:flex;align-items:center;gap:10px;padding:10px 18px;border-radius:9999px;border:2px solid ${BRAND.coral}">
            <div style="display:flex;width:10px;height:10px;border-radius:9999px;background:${BRAND.coral}"></div>
            <div style="display:flex;font-family:Inter;font-weight:700;font-size:20px;color:${BRAND.forest}">AI Security</div>
          </div>
          <div style="display:flex;align-items:center;gap:10px;padding:10px 18px;border-radius:9999px;border:2px solid ${BRAND.sage}">
            <div style="display:flex;width:10px;height:10px;border-radius:9999px;background:${BRAND.sage}"></div>
            <div style="display:flex;font-family:Inter;font-weight:700;font-size:20px;color:${BRAND.forest}">Responsible AI</div>
          </div>
          <div style="display:flex;align-items:center;gap:10px;padding:10px 18px;border-radius:9999px;border:2px solid ${BRAND.yellow}">
            <div style="display:flex;width:10px;height:10px;border-radius:9999px;background:${BRAND.yellow}"></div>
            <div style="display:flex;font-family:Inter;font-weight:700;font-size:20px;color:${BRAND.forest}">AI Governance</div>
          </div>
        </div>

        <div style="display:flex;justify-content:space-between;align-items:flex-end">
          <div style="display:flex;flex-direction:column;gap:6px">
            <div style="display:flex;font-family:JetBrains Mono;font-size:20px;color:${BRAND.coral};letter-spacing:0.12em;text-transform:uppercase">Inscríbete</div>
            <div style="display:flex;font-family:Inter;font-weight:700;font-size:24px;color:${BRAND.forest}">aisafetycolombia.org/hackathon</div>
          </div>
          <div style="display:flex;font-family:JetBrains Mono;font-size:18px;color:${BRAND.ink2};letter-spacing:0.14em;text-transform:uppercase">USD 3.000 · LATAM</div>
        </div>
      </div>

    </div>
  `;

  const png = await render(markup, W, H);
  return { filename: 'aisc-ig-feed-hackathon-2026-06-announce-es.png', png };
}
