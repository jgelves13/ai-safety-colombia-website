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
  const CARD = '#FFFAEF';
  const HAIR = '#E6DCC8';
  const INK = '#0C0C0C';

  const padX = 80;
  const padT = isPort ? 100 : 78;
  const padB = isPort ? 76 : 56;
  const kickerSz = isPort ? 16 : 14;
  const h1Sz = isPort ? 64 : 54;
  const avSize = isPort ? 100 : 84;
  const nameSz = isPort ? 25 : 22;
  const affSz = isPort ? 15.5 : 13.5;
  const topicSz = isPort ? 13 : 12;
  const badgeSz = isPort ? 11 : 10;

  const logos = await getLogos();
  const [melissa, catalina, juanL, steve, wanda] = await Promise.all([
    squarePhotoDataUrl('public/people/melissa.jpg'),
    squarePhotoDataUrl('public/people/catalina.jpg'),
    squarePhotoDataUrl('public/people/juan-lievano.jpg'),
    squarePhotoDataUrl('public/people/steve.jpg'),
    squarePhotoDataUrl('public/people/wanda.jpg'),
  ]);

  const judges = [
    { accent: CORAL, photo: melissa, name: 'Melissa Robles', aff: 'BID Lab · Quantil', mode: 'Presencial',
      topic: 'Auditoría de comportamiento (multilingüe, intercultural)' },
    { accent: CORAL, photo: catalina, name: 'Catalina Bernal', aff: 'BIP Colombia', mode: 'Presencial',
      topic: 'Auditoría de comportamiento (multilingüe, intercultural)' },
    { accent: SAGE, photo: juanL, name: 'Juan Liévano-Karim', aff: 'UC Berkeley', mode: 'Remoto',
      topic: 'Control de IA · Evaluaciones para sistemas agénticos' },
    { accent: YELLOW, photo: steve, name: 'Steve Hege', aff: 'ILAPS', mode: 'Presencial',
      topic: 'Gobernanza de armas autónomas letales (LAWS)' },
    { accent: YELLOW, photo: wanda, name: 'Wanda Muñoz', aff: 'SEHLAC · Stop Killer Robots', mode: 'Remoto',
      topic: 'Gobernanza de armas autónomas letales (LAWS)' },
  ];

  const judgeCard = (j: typeof judges[number]) => `
    <div style="display:flex;background:${CARD};border:1px solid ${HAIR};border-left:4px solid ${j.accent};border-radius:0 18px 18px 0;padding:16px 18px;gap:18px;align-items:center">
      <div style="display:flex;width:${avSize}px;height:${avSize}px;border-radius:9999px;background:${j.accent};flex-shrink:0;overflow:hidden">
        <img src="${j.photo}" style="display:flex;width:${avSize}px;height:${avSize}px;object-fit:cover;border-radius:9999px"/>
      </div>
      <div style="display:flex;flex-direction:column;flex:1;gap:4px;min-width:0">
        <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">
          <div style="display:flex;font-family:Bricolage Grotesque;font-weight:700;font-size:${nameSz}px;line-height:1.05;letter-spacing:-0.015em;color:${FOREST}">${j.name}</div>
          <div style="display:flex;font-family:Bricolage Grotesque;font-weight:700;font-size:${badgeSz}px;letter-spacing:0.22em;color:${j.accent};text-transform:uppercase;border:1px solid ${j.accent};border-radius:9999px;padding:3px 8px">${j.mode}</div>
        </div>
        <div style="display:flex;font-family:JetBrains Mono;font-size:${affSz}px;letter-spacing:0.02em;color:${j.accent}">${j.aff}</div>
        <div style="display:flex;font-family:Inter;font-weight:500;font-size:${topicSz + 1}px;line-height:1.35;color:${INK}">${j.topic}</div>
      </div>
    </div>`;

  const source = `
    <div style="display:flex;width:${W}px;height:${H}px;background:${BRAND.cream};font-family:Inter;position:relative;overflow:hidden">

      <div style="display:flex;flex-direction:column;width:${W}px;height:${H}px;padding:${padT}px ${padX}px ${padB}px ${padX}px;justify-content:space-between">

        <div style="display:flex;flex-direction:column;gap:14px;max-width:880px">
          <div style="display:flex;font-family:JetBrains Mono;font-size:${kickerSz}px;letter-spacing:0.22em;color:${FOREST};text-transform:uppercase">Jurado · evaluación de proyectos</div>
          <div style="display:flex;font-family:Bricolage Grotesque;font-weight:700;font-size:${h1Sz}px;line-height:1.0;letter-spacing:-0.028em;color:${FOREST}">Especialistas en seguridad y gobernanza de IA.</div>
        </div>

        <div style="display:flex;flex-direction:column;gap:12px">
          ${judges.map(judgeCard).join('')}
        </div>

        <div style="display:flex;align-items:flex-end;justify-content:space-between;padding-top:14px;border-top:1px solid ${HAIR}">
          <div style="display:flex;flex-direction:column;gap:3px;padding-top:14px">
            <div style="display:flex;font-family:Bricolage Grotesque;font-weight:800;font-size:26px;letter-spacing:-0.01em;color:${FOREST}">19–21 jun 2026 · Hub Bogotá</div>
            <div style="display:flex;font-family:Inter;font-weight:500;font-size:15px;color:${BRAND.ink2}">aisafetycolombia.org/hackathon</div>
          </div>
          ${hostsRow({ color: BRAND.ink2, fontSize: 15, ...logos })}
        </div>

      </div>

    </div>
  `;

  const png = await render(html(source), W, H);
  return { filename: `_v1id-05-jurado-${format}.png`, png };
}
