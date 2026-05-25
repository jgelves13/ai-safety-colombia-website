import { render, html, BRAND, hostsRow, loadHackathon } from './lib';

interface Judge {
  name: string;
  affiliationEs: string;
}

export default async function () {
  const data = await loadHackathon();
  const judges: Judge[] = data.judges;
  const W = 1080;
  const H = 1080;

  const rows = judges
    .slice(0, 5)
    .map((j) => `
      <div style="display:flex;justify-content:space-between;align-items:baseline;gap:32px;padding-bottom:18px;border-bottom:1px solid ${BRAND.hairline}">
        <div style="display:flex;font-family:Bricolage Grotesque;font-weight:700;font-size:36px;line-height:1;color:${BRAND.forest}">${j.name}</div>
        <div style="display:flex;font-family:JetBrains Mono;font-size:18px;letter-spacing:0.10em;color:${BRAND.ink2};text-align:right">${j.affiliationEs}</div>
      </div>
    `)
    .join('');

  const source = `
    <div style="display:flex;flex-direction:column;width:${W}px;height:${H}px;background:${BRAND.cream};font-family:Inter;padding:96px 96px 88px 96px;justify-content:space-between">

      <div style="display:flex;flex-direction:column;gap:30px">
        <div style="display:flex;align-items:center;gap:14px">
          <div style="display:flex;width:14px;height:14px;border-radius:9999px;background:${BRAND.coral}"></div>
          <div style="display:flex;font-family:JetBrains Mono;font-size:24px;letter-spacing:0.20em;text-transform:uppercase;color:${BRAND.coral}">Jueces</div>
        </div>
        <div style="display:flex;font-family:Bricolage Grotesque;font-weight:700;font-size:74px;line-height:0.98;letter-spacing:-0.02em;color:${BRAND.forest}">Quiénes evalúan.</div>
      </div>

      <div style="display:flex;flex-direction:column;gap:18px">${rows}</div>

      <div style="display:flex;flex-direction:column;gap:14px">
        <div style="display:flex;font-family:Inter;font-weight:700;font-size:24px;color:${BRAND.forest}">19–21 jun 2026 · Hub Bogotá + remoto</div>
        ${hostsRow({ color: BRAND.ink2, fontSize: 18 })}
      </div>

    </div>
  `;

  const png = await render(html(source), W, H);
  return { filename: 'aisc-ig-feed-hackathon-2026-06-judges-es.png', png };
}
