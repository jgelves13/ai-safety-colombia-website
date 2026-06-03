import { render, html, BRAND, hostsRow, getLogos, squarePhotoDataUrl } from './lib';
import type { FlyerFormat } from './_v3-apart';

export default async function (format: FlyerFormat = 'portrait') {
  const isPort = format === 'portrait';
  const W = 1080;
  const H = isPort ? 1350 : 1080;

  const FOREST = BRAND.forest;
  const CORAL = '#E5604D';
  const SAGE = '#4A8466';
  const YELLOW = '#F2B705';
  const INK = '#0C0C0C';

  const padX = 80;
  const padT = isPort ? 90 : 72;
  const padB = isPort ? 60 : 42;

  const logos = await getLogos();
  const [melissa, catalina, juanL, steve, wanda] = await Promise.all([
    squarePhotoDataUrl('public/people/melissa.jpg'),
    squarePhotoDataUrl('public/people/catalina.jpg'),
    squarePhotoDataUrl('public/people/juan-lievano.jpg'),
    squarePhotoDataUrl('public/people/steve.jpg'),
    squarePhotoDataUrl('public/people/wanda.jpg'),
  ]);

  const PHOTO = isPort ? 130 : 108;

  const judges = [
    { photo: melissa, accent: CORAL, name: 'Melissa Robles', aff: 'BID Lab · Quantil', topic: 'Audit. multilingüe · SESGO' },
    { photo: catalina, accent: CORAL, name: 'Catalina Bernal', aff: 'BIP Colombia', topic: 'Audit. multilingüe · SESGO' },
    { photo: juanL, accent: SAGE, name: 'Juan Liévano-Karim', aff: 'UC Berkeley', topic: 'AI control · Evals agénticos' },
    { photo: steve, accent: YELLOW, name: 'Steve Hege', aff: 'ILAPS', topic: 'Gobernanza LAWS' },
    { photo: wanda, accent: YELLOW, name: 'Wanda Muñoz', aff: 'SEHLAC · Stop Killer Robots', topic: 'Gobernanza LAWS' },
  ];

  const judgeRow = (j: typeof judges[number], i: number) => `
    <div style="display:flex;align-items:center;gap:24px;padding:14px 0 14px 0;border-top:1px solid #E6DCC8">
      <div style="display:flex;font-family:JetBrains Mono;font-size:${isPort ? 17 : 15}px;letter-spacing:0.04em;color:${j.accent};width:50px">0${i + 1}</div>
      <div style="display:flex;width:${PHOTO}px;height:${PHOTO}px;flex-shrink:0">
        <img src="${j.photo}" style="display:flex;width:${PHOTO}px;height:${PHOTO}px;object-fit:cover"/>
      </div>
      <div style="display:flex;flex-direction:column;flex:1;gap:3px">
        <div style="display:flex;font-family:Bricolage Grotesque;font-weight:700;font-size:${isPort ? 34 : 28}px;line-height:1.0;letter-spacing:-0.018em;color:${FOREST}">${j.name}</div>
        <div style="display:flex;font-family:Inter;font-weight:500;font-size:${isPort ? 17 : 14}px;color:${INK}">${j.aff}</div>
      </div>
      <div style="display:flex;flex-direction:column;align-items:flex-end;gap:4px">
        <div style="display:flex;width:30px;height:3px;background:${j.accent}"></div>
        <div style="display:flex;font-family:JetBrains Mono;font-size:${isPort ? 13 : 11}px;letter-spacing:0.06em;color:${j.accent};text-align:right;max-width:220px">${j.topic}</div>
      </div>
    </div>`;

  const source = `
    <div style="display:flex;width:${W}px;height:${H}px;background:${BRAND.cream};font-family:Inter;position:relative;overflow:hidden">

      <div style="display:flex;flex-direction:column;width:${W}px;height:${H}px;padding:${padT}px ${padX}px ${padB}px ${padX}px;gap:${isPort ? 26 : 18}px">

        <div style="display:flex;flex-direction:column;gap:8px">
          <div style="display:flex;font-family:JetBrains Mono;font-size:${isPort ? 16 : 14}px;letter-spacing:0.24em;color:${CORAL};text-transform:uppercase">Jurado · evaluación</div>
          <div style="display:flex;font-family:Bricolage Grotesque;font-weight:800;font-size:${isPort ? 88 : 72}px;line-height:0.95;letter-spacing:-0.034em;color:${FOREST}">¿Quién evalúa?</div>
        </div>

        <div style="display:flex;flex-direction:column">
          ${judges.map(judgeRow).join('')}
          <div style="display:flex;border-top:1px solid #E6DCC8;height:1px"></div>
        </div>

        <div style="display:flex;flex:1"></div>

        <div style="display:flex;align-items:flex-end;justify-content:space-between;padding-top:14px;border-top:1px solid #E6DCC8">
          <div style="display:flex;flex-direction:column;gap:3px;padding-top:12px">
            <div style="display:flex;font-family:Bricolage Grotesque;font-weight:800;font-size:${isPort ? 26 : 22}px;letter-spacing:-0.01em;color:${FOREST}">19–21 jun 2026 · Hub Bogotá</div>
            <div style="display:flex;font-family:Inter;font-weight:500;font-size:15px;color:${BRAND.ink2}">aisafetycolombia.org/hackathon</div>
          </div>
          ${hostsRow({ color: BRAND.ink2, fontSize: 14, ...logos })}
        </div>

      </div>

    </div>
  `;

  const png = await render(html(source), W, H);
  return { filename: `_v2lo-05-jurado-${format}.png`, png };
}
