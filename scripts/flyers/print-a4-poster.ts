import { render, html, BRAND, ACCENT, loadHackathon, qrPngDataUrl } from './lib';

interface Track {
  titleEn: string;
  descEs: string;
  accent: string;
  subareas: { es: string }[];
}

function trackCard(t: Track): string {
  const color = ACCENT[t.accent];
  const subs = t.subareas
    .slice(0, 3)
    .map((s) => `<div style="display:flex;font-family:JetBrains Mono;font-size:24px;letter-spacing:0.08em;color:${BRAND.ink2}">· ${s.es}</div>`)
    .join('');
  return `
    <div style="display:flex;flex-direction:column;gap:22px;flex-basis:1080px;padding:54px;border:4px solid ${color};border-radius:28px;background:${BRAND.cream}">
      <div style="display:flex;align-items:center;gap:20px">
        <div style="display:flex;width:24px;height:24px;border-radius:9999px;background:${color}"></div>
        <div style="display:flex;font-family:Bricolage Grotesque;font-weight:700;font-size:48px;color:${BRAND.forest}">${t.titleEn}</div>
      </div>
      <div style="display:flex;font-family:Inter;font-weight:500;font-size:28px;line-height:1.35;color:${BRAND.ink2}">${t.descEs}</div>
      <div style="display:flex;flex-direction:column;gap:8px;margin-top:6px">${subs}</div>
    </div>
  `;
}

export default async function () {
  const data = await loadHackathon();
  const tracks: Track[] = data.tracks;
  const W = 2480;
  const H = 3508;

  const qr = await qrPngDataUrl(data.registrationUrl, 600);

  const row1 = tracks.slice(0, 2).map(trackCard).join('');
  const row2 = tracks.slice(2, 4).map(trackCard).join('');

  const source = `
    <div style="display:flex;flex-direction:column;width:${W}px;height:${H}px;background:${BRAND.cream};padding:140px 140px 140px 140px;font-family:Inter">

      <div style="display:flex;justify-content:space-between;align-items:center">
        <div style="display:flex;align-items:center;gap:22px">
          <div style="display:flex;width:22px;height:22px;border-radius:9999px;background:${BRAND.coral}"></div>
          <div style="display:flex;font-family:JetBrains Mono;font-size:34px;letter-spacing:0.20em;text-transform:uppercase;color:${BRAND.coral}">Apart × AI Safety Colombia</div>
        </div>
        <div style="display:flex;font-family:JetBrains Mono;font-size:28px;letter-spacing:0.18em;text-transform:uppercase;color:${BRAND.forest}">Hub Bogotá · 2026</div>
      </div>

      <div style="display:flex;flex-direction:column;gap:38px;margin-top:100px">
        <div style="display:flex;font-family:JetBrains Mono;font-size:36px;letter-spacing:0.16em;text-transform:uppercase;color:${BRAND.ink2}">Global South AI Safety Hackathon</div>
        <div style="display:flex;font-family:Bricolage Grotesque;font-weight:800;font-size:220px;line-height:0.95;letter-spacing:-0.025em;color:${BRAND.forest}">19–21 JUN</div>
        <div style="display:flex;font-family:Bricolage Grotesque;font-weight:700;font-size:140px;line-height:1;color:${BRAND.forest}">2026</div>
        <div style="display:flex;font-family:Inter;font-weight:500;font-size:42px;line-height:1.3;color:${BRAND.ink2};max-width:1860px">Sede presencial en Bogotá · participación virtual abierta al Sur Global. Tres días para construir evaluaciones, herramientas y análisis de política sobre seguridad y gobernanza de IA.</div>
      </div>

      <div style="display:flex;flex-direction:column;gap:36px;margin-top:100px">
        <div style="display:flex;font-family:JetBrains Mono;font-size:30px;letter-spacing:0.18em;text-transform:uppercase;color:${BRAND.coral}">Los cuatro tracks</div>
        <div style="display:flex;gap:40px">${row1}</div>
        <div style="display:flex;gap:40px">${row2}</div>
      </div>

      <div style="display:flex;flex-grow:1"></div>

      <div style="display:flex;align-items:flex-end;gap:60px;margin-top:80px">
        <img src="${qr}" style="display:flex;width:540px;height:540px;border-radius:18px" />
        <div style="display:flex;flex-direction:column;gap:18px;flex-grow:1">
          <div style="display:flex;font-family:JetBrains Mono;font-size:26px;letter-spacing:0.18em;text-transform:uppercase;color:${BRAND.coral}">Inscripciones</div>
          <div style="display:flex;font-family:Bricolage Grotesque;font-weight:700;font-size:60px;line-height:1.05;color:${BRAND.forest}">apartresearch.com/sprints</div>
          <div style="display:flex;font-family:Inter;font-weight:500;font-size:30px;color:${BRAND.ink2}">Información en aisafetycolombia.org/hackathon</div>
          <div style="display:flex;flex-direction:column;gap:6px;margin-top:18px">
            <div style="display:flex;font-family:JetBrains Mono;font-size:22px;letter-spacing:0.16em;text-transform:uppercase;color:${BRAND.ink2}">Organiza Apart Research · Hub coordinado por AI Safety Colombia</div>
            <div style="display:flex;font-family:JetBrains Mono;font-size:22px;letter-spacing:0.16em;text-transform:uppercase;color:${BRAND.ink2}">Apoyo: Schmidt Sciences · USD 3.000 entre 3 equipos LATAM</div>
          </div>
        </div>
      </div>

    </div>
  `;

  const png = await render(html(source), W, H);
  return { filename: 'aisc-print-a4-hackathon-2026-06-poster-es.png', png };
}
