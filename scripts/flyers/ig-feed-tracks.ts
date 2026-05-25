import { render, html, BRAND, ACCENT, hostsRow, loadHackathon, getLogos } from './lib';

interface Track {
  titleEn: string;
  accent: string;
}

export default async function () {
  const data = await loadHackathon();
  const tracks: Track[] = data.tracks;
  const logos = await getLogos();
  const W = 1080;
  const H = 1080;

  const lines = tracks
    .map((t) => {
      const color = ACCENT[t.accent];
      return `
        <div style="display:flex;align-items:center;gap:24px">
          <div style="display:flex;width:18px;height:18px;border-radius:9999px;background:${color}"></div>
          <div style="display:flex;font-family:Bricolage Grotesque;font-weight:700;font-size:62px;line-height:1;color:${BRAND.forest}">${t.titleEn}</div>
        </div>
      `;
    })
    .join('');

  const source = `
    <div style="display:flex;flex-direction:column;width:${W}px;height:${H}px;background:${BRAND.cream};font-family:Inter;padding:96px 96px 88px 96px;justify-content:space-between">

      <div style="display:flex;align-items:center;gap:14px">
        <div style="display:flex;width:14px;height:14px;border-radius:9999px;background:${BRAND.coral}"></div>
        <div style="display:flex;font-family:JetBrains Mono;font-size:24px;letter-spacing:0.20em;text-transform:uppercase;color:${BRAND.coral}">Cuatro tracks</div>
      </div>

      <div style="display:flex;flex-direction:column;gap:36px">${lines}</div>

      <div style="display:flex;flex-direction:column;gap:14px">
        <div style="display:flex;font-family:Inter;font-weight:700;font-size:26px;color:${BRAND.forest}">19–21 jun 2026 · Hub Bogotá + remoto</div>
        ${hostsRow({ color: BRAND.ink2, fontSize: 18, ...logos })}
      </div>

    </div>
  `;

  const png = await render(html(source), W, H);
  return { filename: 'aisc-ig-feed-hackathon-2026-06-tracks-es.png', png };
}
