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
  const h1Sz = isPort ? 72 : 60;
  const avSize = isPort ? 168 : 140;
  const nameSz = isPort ? 40 : 34;
  const affSz = isPort ? 19 : 17;
  const badgeSz = isPort ? 13 : 12;
  const topicSz = isPort ? 22 : 20;
  const bioSz = isPort ? 17 : 15;

  const logos = await getLogos();
  const [ceronPhoto, toroPhoto] = await Promise.all([
    squarePhotoDataUrl('public/people/juan-felipe.jpg', 600),
    squarePhotoDataUrl('public/people/alejandro.jpg', 600),
  ]);

  const speakers = [
    { accent: SAGE, photo: ceronPhoto, name: 'Juan Felipe Cerón',
      aff: 'OpenAI', mode: 'Remoto', modeColor: SAGE,
      topic: 'Defensas contra ataques a sistemas de IA.',
      bio: 'Ingeniero de investigación en alineación de IA en OpenAI. Coautor de IH-Challenge (RL para resistir inyección de prompts) y LLM Critics.' },
    { accent: FOREST, photo: toroPhoto, name: 'Alejandro Toro',
      aff: 'Congreso de la República', mode: 'Presencial', modeColor: FOREST,
      topic: 'PL 368/2025: regulación de armas autónomas letales.',
      bio: 'Representante a la Cámara. Coautor y coordinador del proyecto que prohíbe sistemas de armas autónomas letales y regula los semiautónomos.' },
  ];

  const personCard = (s: typeof speakers[number]) => `
    <div style="display:flex;background:${CARD};border:1px solid ${HAIR};border-radius:22px;padding:26px 28px;gap:26px;align-items:flex-start">
      <div style="display:flex;width:${avSize}px;height:${avSize}px;border-radius:9999px;background:${s.accent};flex-shrink:0;overflow:hidden">
        <img src="${s.photo}" style="display:flex;width:${avSize}px;height:${avSize}px;object-fit:cover;border-radius:9999px"/>
      </div>
      <div style="display:flex;flex-direction:column;flex:1;gap:6px;padding-top:4px">
        <div style="display:flex;font-family:Bricolage Grotesque;font-weight:700;font-size:${nameSz}px;line-height:1.0;letter-spacing:-0.02em;color:${FOREST}">${s.name}</div>
        <div style="display:flex;font-family:JetBrains Mono;font-size:${affSz}px;letter-spacing:0.02em;color:${FOREST}">${s.aff}</div>
        <div style="display:flex;align-self:flex-start;font-family:Bricolage Grotesque;font-weight:700;font-size:${badgeSz}px;letter-spacing:0.22em;color:${s.modeColor};text-transform:uppercase;border:1px solid ${s.modeColor};border-radius:9999px;padding:5px 12px;margin-top:6px">${s.mode}</div>
        <div style="display:flex;font-family:Bricolage Grotesque;font-weight:700;font-size:${topicSz}px;line-height:1.2;letter-spacing:-0.012em;color:${FOREST};max-width:580px;margin-top:10px">${s.topic}</div>
        <div style="display:flex;font-family:Inter;font-weight:500;font-size:${bioSz}px;line-height:1.45;color:${INK};max-width:600px">${s.bio}</div>
      </div>
    </div>`;

  const source = `
    <div style="display:flex;width:${W}px;height:${H}px;background:${BRAND.cream};font-family:Inter;position:relative;overflow:hidden">

      <div style="display:flex;flex-direction:column;width:${W}px;height:${H}px;padding:${padT}px ${padX}px ${padB}px ${padX}px;justify-content:space-between">

        <div style="display:flex;flex-direction:column;gap:14px;max-width:880px">
          <div style="display:flex;font-family:JetBrains Mono;font-size:${kickerSz}px;letter-spacing:0.22em;color:${FOREST};text-transform:uppercase">Kickoff del hackathon</div>
          <div style="display:flex;font-family:Bricolage Grotesque;font-weight:700;font-size:${h1Sz}px;line-height:1.0;letter-spacing:-0.028em;color:${FOREST}">Dos ponencias para abrir el sprint.</div>
        </div>

        <div style="display:flex;flex-direction:column;gap:24px">
          ${personCard(speakers[0])}
          ${personCard(speakers[1])}
        </div>

        <div style="display:flex;align-items:flex-end;justify-content:space-between;padding-top:14px;border-top:1px solid ${HAIR}">
          <div style="display:flex;flex-direction:column;gap:3px;padding-top:14px">
            <div style="display:flex;font-family:Bricolage Grotesque;font-weight:800;font-size:28px;letter-spacing:-0.01em;color:${FOREST}">19–21 jun 2026 · Hub Bogotá</div>
            <div style="display:flex;font-family:Inter;font-weight:500;font-size:16px;color:${BRAND.ink2}">aisafetycolombia.org/hackathon</div>
          </div>
          ${hostsRow({ color: BRAND.ink2, fontSize: 16, ...logos })}
        </div>

      </div>

    </div>
  `;

  const png = await render(html(source), W, H);
  return { filename: `_v1id-04-ponentes-${format}.png`, png };
}
