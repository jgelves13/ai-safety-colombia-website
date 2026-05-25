import { render, html, BRAND, ACCENT, loadHackathon } from './lib';

interface Track {
  titleEn: string;
  descEs: string;
  accent: string;
  subareas: { es: string }[];
}

function summarize(descEs: string): string {
  const idx = descEs.indexOf(':');
  return idx > 0 ? descEs.slice(0, idx) : descEs;
}

function trackCard(t: Track): string {
  const color = ACCENT[t.accent];
  const summary = summarize(t.descEs);
  const subs = t.subareas
    .slice(0, 3)
    .map((s) => `<div style="display:flex;font-family:JetBrains Mono;font-size:14px;letter-spacing:0.08em;color:${BRAND.ink2}">· ${s.es}</div>`)
    .join('');
  return `
    <div style="display:flex;flex-direction:column;gap:14px;flex-basis:445px;padding:32px;border:2px solid ${color};border-radius:18px;background:${BRAND.cream}">
      <div style="display:flex;align-items:center;gap:12px">
        <div style="display:flex;width:14px;height:14px;border-radius:9999px;background:${color}"></div>
        <div style="display:flex;font-family:Bricolage Grotesque;font-weight:700;font-size:28px;color:${BRAND.forest}">${t.titleEn}</div>
      </div>
      <div style="display:flex;font-family:Inter;font-weight:500;font-size:18px;line-height:1.35;color:${BRAND.ink2}">${summary}.</div>
      <div style="display:flex;flex-direction:column;gap:6px;margin-top:6px">${subs}</div>
    </div>
  `;
}

export default async function () {
  const data = await loadHackathon();
  const tracks: Track[] = data.tracks;
  const W = 1080;
  const H = 1080;

  const row1 = tracks.slice(0, 2).map(trackCard).join('');
  const row2 = tracks.slice(2, 4).map(trackCard).join('');

  const source = `
    <div style="display:flex;flex-direction:column;width:${W}px;height:${H}px;background:${BRAND.cream};padding:64px 80px;font-family:Inter;justify-content:space-between">

      <div style="display:flex;flex-direction:column;gap:18px">
        <div style="display:flex;align-items:center;gap:14px">
          <div style="display:flex;width:14px;height:14px;border-radius:9999px;background:${BRAND.coral}"></div>
          <div style="display:flex;font-family:JetBrains Mono;font-size:22px;letter-spacing:0.18em;text-transform:uppercase;color:${BRAND.coral}">Los cuatro tracks</div>
        </div>
        <div style="display:flex;font-family:Bricolage Grotesque;font-weight:800;font-size:64px;line-height:1;color:${BRAND.forest}">¿En qué se trabaja?</div>
      </div>

      <div style="display:flex;flex-direction:column;gap:30px">
        <div style="display:flex;gap:30px">${row1}</div>
        <div style="display:flex;gap:30px">${row2}</div>
      </div>

      <div style="display:flex;justify-content:space-between;align-items:center">
        <div style="display:flex;font-family:JetBrains Mono;font-size:18px;color:${BRAND.coral};letter-spacing:0.14em;text-transform:uppercase">Más en aisafetycolombia.org/hackathon</div>
        <div style="display:flex;font-family:JetBrains Mono;font-size:16px;color:${BRAND.ink2};letter-spacing:0.12em;text-transform:uppercase">19–21 jun 2026</div>
      </div>

    </div>
  `;

  const png = await render(html(source), W, H);
  return { filename: 'aisc-ig-feed-hackathon-2026-06-tracks-es.png', png };
}
