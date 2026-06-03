import { render, html, BRAND, hostsRow, getLogos, squarePhotoDataUrl } from './lib';
import type { FlyerFormat } from './_v3-apart';

export default async function (format: FlyerFormat = 'portrait') {
  const isPort = format === 'portrait';
  const W = 1080;
  const H = isPort ? 1350 : 1080;

  const FOREST = BRAND.forest;
  const CORAL = '#E5604D';
  const YELLOW = '#F2B705';
  const SAGE = '#4A8466';
  const INK = '#0C0C0C';

  const padX = 80;
  const padT = isPort ? 86 : 70;
  const padB = isPort ? 56 : 40;

  const logos = await getLogos();
  const [ceronPhoto, toroPhoto] = await Promise.all([
    squarePhotoDataUrl('public/people/juan-felipe.jpg'),
    squarePhotoDataUrl('public/people/alejandro.jpg'),
  ]);

  const PHOTO = isPort ? 380 : 320;

  const speakerBlock = (photo: string, accent: string, name: string, aff: string, mode: string, topic: string, mirrored: boolean) => `
    <div style="display:flex;flex-direction:${mirrored ? 'row-reverse' : 'row'};gap:30px;align-items:center">
      <div style="display:flex;width:${PHOTO}px;height:${PHOTO}px;flex-shrink:0;position:relative">
        <div style="display:flex;position:absolute;top:18px;left:18px;width:${PHOTO}px;height:${PHOTO}px;background:${accent}"></div>
        <img src="${photo}" style="display:flex;position:absolute;top:0;left:0;width:${PHOTO}px;height:${PHOTO}px;object-fit:cover"/>
      </div>
      <div style="display:flex;flex-direction:column;flex:1;gap:8px;padding:6px ${mirrored ? '0' : '0'}px">
        <div style="display:flex;font-family:JetBrains Mono;font-size:${isPort ? 14 : 12}px;letter-spacing:0.24em;color:${accent};text-transform:uppercase">${mode}</div>
        <div style="display:flex;font-family:Bricolage Grotesque;font-weight:800;font-size:${isPort ? 62 : 52}px;line-height:0.96;letter-spacing:-0.03em;color:${FOREST};max-width:500px">${name}</div>
        <div style="display:flex;font-family:Inter;font-weight:600;font-size:${isPort ? 22 : 19}px;line-height:1.3;color:${accent}">${aff}</div>
        <div style="display:flex;width:60px;height:4px;background:${accent};margin-top:6px"></div>
        <div style="display:flex;font-family:Bricolage Grotesque;font-weight:700;font-size:${isPort ? 24 : 21}px;line-height:1.2;letter-spacing:-0.012em;color:${FOREST};max-width:540px;margin-top:6px">${topic}</div>
      </div>
    </div>`;

  const source = `
    <div style="display:flex;width:${W}px;height:${H}px;background:${BRAND.cream};font-family:Inter;position:relative;overflow:hidden">

      <div style="display:flex;flex-direction:column;width:${W}px;height:${H}px;padding:${padT}px ${padX}px ${padB}px ${padX}px;gap:${isPort ? 40 : 28}px">

        <div style="display:flex;flex-direction:column;gap:6px">
          <div style="display:flex;font-family:JetBrains Mono;font-size:${isPort ? 16 : 14}px;letter-spacing:0.24em;color:${CORAL};text-transform:uppercase">Kickoff</div>
          <div style="display:flex;font-family:Bricolage Grotesque;font-weight:800;font-size:${isPort ? 96 : 80}px;line-height:0.95;letter-spacing:-0.034em;color:${FOREST}">Dos voces<br/>abren el sprint.</div>
        </div>

        <div style="display:flex;flex-direction:column;gap:${isPort ? 40 : 28}px;flex:1;justify-content:center">
          ${speakerBlock(ceronPhoto, SAGE, 'Juan Felipe Cerón', 'OpenAI', 'Remoto', 'Defensas contra ataques a sistemas de IA.', false)}
          ${speakerBlock(toroPhoto, YELLOW, 'Alejandro Toro', 'Congreso de Colombia', 'Presencial', 'PL 368/2025: armas autónomas letales.', true)}
        </div>

        <div style="display:flex;align-items:flex-end;justify-content:space-between;padding-top:12px;border-top:1px solid #E6DCC8">
          <div style="display:flex;flex-direction:column;gap:3px;padding-top:12px">
            <div style="display:flex;font-family:Bricolage Grotesque;font-weight:800;font-size:${isPort ? 24 : 20}px;letter-spacing:-0.01em;color:${FOREST}">19–21 jun 2026 · Hub Bogotá</div>
            <div style="display:flex;font-family:Inter;font-weight:500;font-size:14px;color:${BRAND.ink2}">aisafetycolombia.org/hackathon</div>
          </div>
          ${hostsRow({ color: BRAND.ink2, fontSize: 14, ...logos })}
        </div>

      </div>

    </div>
  `;

  const png = await render(html(source), W, H);
  return { filename: `_v2lo-04-ponentes-${format}.png`, png };
}
