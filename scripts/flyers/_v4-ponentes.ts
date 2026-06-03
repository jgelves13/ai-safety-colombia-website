import { render, html, BRAND, hostsRow, getLogos, squarePhotoDataUrl } from './lib';
import type { FlyerFormat } from './_v3-apart';

export default async function (format: FlyerFormat = 'portrait') {
  const isPort = format === 'portrait';
  const W = 1080;
  const H = isPort ? 1350 : 1080;

  const PHOTO = isPort ? 340 : 290;
  const BLOCK_OFFSET = isPort ? 26 : 22;
  const padT = isPort ? 90 : 72;
  const padB = isPort ? 76 : 56;
  const headerGap = isPort ? 42 : 32;
  const kickerSz = isPort ? 15.5 : 14;
  const headingSz = isPort ? 72 : 60;
  const rowsGap = isPort ? 48 : 28;
  const rowGap = isPort ? 54 : 44;
  const contentGap = isPort ? 18 : 14;
  const modeSz = isPort ? 17 : 14.5;
  const nameSz = isPort ? 58 : 48;
  const affSz = isPort ? 23 : 19;
  const dividerW = isPort ? 60 : 50;
  const dividerH = isPort ? 5 : 4;
  const topicSz = isPort ? 31 : 25;
  const bioSz = isPort ? 21 : 17;
  const footerDates = isPort ? 30 : 28;

  const logos = await getLogos();
  const FOREST = BRAND.forest;
  const YELLOW = '#F2B705';

  const [ceronPhoto, toroPhoto] = await Promise.all([
    squarePhotoDataUrl('public/people/juan-felipe.jpg', 600),
    squarePhotoDataUrl('public/people/alejandro.jpg', 600),
  ]);

  const speakers = [
    {
      accent: FOREST,
      photo: ceronPhoto,
      name: 'Juan Felipe Cerón',
      aff: 'OpenAI',
      mode: 'Remoto',
      topic: 'Adversarial robustness: defensas contra ataques a sistemas de IA.',
      bio: 'Ingeniero de investigación en alineación de IA en OpenAI. Coautor de IH-Challenge (RL para resistir inyección de prompts) y LLM Critics (modelos de crítica para evaluar salidas de LLMs).',
    },
    {
      accent: YELLOW,
      photo: toroPhoto,
      name: 'Alejandro Toro',
      aff: 'Congreso de la República',
      mode: 'Presencial',
      topic: 'Proyecto de Ley 368/2025: regulación de armas autónomas letales.',
      bio: 'Representante a la Cámara. Coautor y coordinador para primer debate del proyecto que prohíbe los sistemas de armas autónomas letales y regula los semiautónomos.',
    },
  ];

  const photoBlock = (s: typeof speakers[number]) => `
    <div style="display:flex;position:relative;width:${PHOTO}px;height:${PHOTO}px;flex-shrink:0">
      <div style="display:flex;position:absolute;top:${BLOCK_OFFSET}px;left:${BLOCK_OFFSET}px;width:${PHOTO}px;height:${PHOTO}px;background:${s.accent}"></div>
      <img src="${s.photo}" style="display:flex;position:absolute;top:0;left:0;width:${PHOTO}px;height:${PHOTO}px;object-fit:cover"/>
    </div>`;

  const content = (s: typeof speakers[number], mirrored: boolean) => `
    <div style="display:flex;flex-direction:column;flex:1;gap:${contentGap}px;padding:6px ${mirrored ? '0' : '24px'} 6px ${mirrored ? '24px' : '0'}">
      <div style="display:flex;align-items:center;gap:12px">
        <div style="display:flex;width:10px;height:10px;border-radius:50%;background:${s.accent}"></div>
        <div style="display:flex;font-family:JetBrains Mono;font-size:${modeSz}px;letter-spacing:0.22em;color:${FOREST};text-transform:uppercase">${s.mode}</div>
      </div>
      <div style="display:flex;flex-direction:column;gap:4px">
        <div style="display:flex;font-family:Bricolage Grotesque;font-weight:800;font-size:${nameSz}px;line-height:0.98;letter-spacing:-0.026em;color:${FOREST}">${s.name}</div>
        <div style="display:flex;font-family:Inter;font-weight:600;font-size:${affSz}px;line-height:1.3;color:${s.accent}">${s.aff}</div>
      </div>
      <div style="display:flex;width:${dividerW}px;height:${dividerH}px;background:${s.accent}"></div>
      <div style="display:flex;font-family:Bricolage Grotesque;font-weight:700;font-size:${topicSz}px;line-height:1.2;letter-spacing:-0.012em;color:${FOREST}">${s.topic}</div>
      <div style="display:flex;font-family:Inter;font-weight:500;font-size:${bioSz}px;line-height:1.45;color:#0C0C0C">${s.bio}</div>
    </div>`;

  const row = (s: typeof speakers[number], mirrored: boolean) => `
    <div style="display:flex;flex-direction:${mirrored ? 'row-reverse' : 'row'};gap:${rowGap}px;align-items:center">
      ${photoBlock(s)}${content(s, mirrored)}
    </div>`;

  const source = `
    <div style="display:flex;width:${W}px;height:${H}px;background:${BRAND.cream};font-family:Inter;position:relative;overflow:hidden">

      <div style="display:flex;flex-direction:column;width:${W}px;height:${H}px;padding:${padT}px 80px ${padB}px 80px;gap:${headerGap}px">

        <div style="display:flex;flex-direction:column;gap:12px;max-width:820px">
          <div style="display:flex;font-family:JetBrains Mono;font-size:${kickerSz}px;letter-spacing:0.22em;color:${FOREST};text-transform:uppercase">Kickoff del hackathon</div>
          <div style="display:flex;font-family:Bricolage Grotesque;font-weight:700;font-size:${headingSz}px;line-height:1.0;letter-spacing:-0.024em;color:${FOREST}">Dos ponencias para abrir el sprint.</div>
        </div>

        <div style="display:flex;flex-direction:column;gap:${rowsGap}px;flex:1;justify-content:center">
          ${row(speakers[0], false)}
          ${row(speakers[1], true)}
        </div>

        <div style="display:flex;align-items:flex-end;justify-content:space-between">
          <div style="display:flex;flex-direction:column;gap:4px">
            <div style="display:flex;font-family:Bricolage Grotesque;font-weight:800;font-size:${footerDates}px;line-height:1;letter-spacing:-0.015em;color:${FOREST}">19–21 jun 2026 · Hub Bogotá</div>
            <div style="display:flex;font-family:Inter;font-weight:500;font-size:17px;color:#0C0C0C">aisafetycolombia.org/hackathon</div>
          </div>
          ${hostsRow({ color: BRAND.ink2, fontSize: 17, ...logos })}
        </div>

      </div>

    </div>
  `;

  const png = await render(html(source), W, H);
  return { filename: `_v4-04-ponentes-${format}.png`, png };
}
