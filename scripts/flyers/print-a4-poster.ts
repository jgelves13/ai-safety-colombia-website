import { render, html, BRAND, ACCENT, latAmOutline, hostsRow, loadHackathon, qrPngDataUrl } from './lib';

interface Track { titleEn: string; accent: string; }
interface Judge { name: string; affiliationEs: string; }

export default async function () {
  const data = await loadHackathon();
  const tracks: Track[] = data.tracks;
  const judges: Judge[] = data.judges;
  const W = 2480;
  const H = 3508;

  const qr = await qrPngDataUrl(data.registrationUrl, 660);
  const outline = latAmOutline({ stroke: BRAND.forest, strokeWidth: 8, width: 720, height: 1100 });

  const manifesto = tracks
    .map((t) => {
      const color = ACCENT[t.accent];
      return `
        <div style="display:flex;align-items:center;gap:42px">
          <div style="display:flex;width:30px;height:30px;border-radius:9999px;background:${color}"></div>
          <div style="display:flex;font-family:Bricolage Grotesque;font-weight:700;font-size:96px;line-height:1;color:${BRAND.forest}">${t.titleEn}</div>
        </div>
      `;
    })
    .join('');

  const judgesRow = judges
    .slice(0, 5)
    .map((j) => `
      <div style="display:flex;flex-direction:column;gap:8px;flex-basis:420px">
        <div style="display:flex;font-family:Bricolage Grotesque;font-weight:700;font-size:42px;line-height:1.1;color:${BRAND.forest}">${j.name}</div>
        <div style="display:flex;font-family:JetBrains Mono;font-size:24px;letter-spacing:0.10em;color:${BRAND.ink2}">${j.affiliationEs}</div>
      </div>
    `)
    .join('');

  const source = `
    <div style="display:flex;width:${W}px;height:${H}px;background:${BRAND.cream};font-family:Inter;position:relative">

      <div style="display:flex;flex-direction:column;width:${W}px;height:${H}px;padding:160px 160px 160px 160px;justify-content:space-between">

        <div style="display:flex;justify-content:space-between;align-items:flex-start">
          <div style="display:flex;align-items:center;gap:24px">
            <div style="display:flex;width:24px;height:24px;border-radius:9999px;background:${BRAND.coral}"></div>
            <div style="display:flex;font-family:JetBrains Mono;font-size:36px;letter-spacing:0.22em;text-transform:uppercase;color:${BRAND.coral}">Hackathon</div>
          </div>
          <div style="display:flex;font-family:JetBrains Mono;font-size:30px;letter-spacing:0.18em;text-transform:uppercase;color:${BRAND.ink2}">2026</div>
        </div>

        <div style="display:flex;flex-direction:column;gap:60px">
          <div style="display:flex;font-family:Bricolage Grotesque;font-weight:700;font-size:184px;line-height:0.98;letter-spacing:-0.025em;color:${BRAND.forest};max-width:2000px">Global South AI Safety Hackathon</div>
          <div style="display:flex;flex-direction:column;gap:18px">
            <div style="display:flex;font-family:Bricolage Grotesque;font-weight:800;font-size:280px;line-height:0.92;letter-spacing:-0.03em;color:${BRAND.forest}">19–21 JUN</div>
            <div style="display:flex;font-family:Bricolage Grotesque;font-weight:700;font-size:140px;line-height:1;color:${BRAND.forest}">2026</div>
          </div>
          <div style="display:flex;font-family:Inter;font-weight:700;font-size:48px;color:${BRAND.forest}">Hub Bogotá + remoto</div>
        </div>

        <div style="display:flex;flex-direction:column;gap:40px;margin-top:40px">
          <div style="display:flex;font-family:JetBrains Mono;font-size:30px;letter-spacing:0.20em;text-transform:uppercase;color:${BRAND.coral}">Cuatro tracks</div>
          <div style="display:flex;flex-direction:column;gap:32px">${manifesto}</div>
        </div>

        <div style="display:flex;flex-direction:column;gap:32px;margin-top:40px">
          <div style="display:flex;font-family:JetBrains Mono;font-size:30px;letter-spacing:0.20em;text-transform:uppercase;color:${BRAND.coral}">Jueces</div>
          <div style="display:flex;flex-wrap:wrap;gap:48px 80px">${judgesRow}</div>
        </div>

        <div style="display:flex;justify-content:space-between;align-items:flex-end;margin-top:40px">
          <img src="${qr}" style="display:flex;width:600px;height:600px;border-radius:24px" />
          <div style="display:flex;flex-direction:column;gap:24px;align-items:flex-end">
            <div style="display:flex;font-family:JetBrains Mono;font-size:30px;letter-spacing:0.18em;text-transform:uppercase;color:${BRAND.coral}">Inscripciones</div>
            <div style="display:flex;font-family:Bricolage Grotesque;font-weight:700;font-size:64px;line-height:1.05;color:${BRAND.forest}">apartresearch.com/sprints</div>
            <div style="display:flex;font-family:Inter;font-weight:500;font-size:34px;color:${BRAND.ink2}">aisafetycolombia.org/hackathon</div>
            <div style="display:flex;margin-top:18px">${hostsRow({ color: BRAND.ink2, fontSize: 26 })}</div>
          </div>
        </div>

      </div>

      <div style="display:flex;position:absolute;top:420px;right:120px;opacity:0.10">${outline}</div>

    </div>
  `;

  const png = await render(html(source), W, H);
  return { filename: 'aisc-print-a4-hackathon-2026-06-poster-es.png', png };
}
