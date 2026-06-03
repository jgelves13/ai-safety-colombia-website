import { render, html, BRAND, hostsRow, getLogos } from './lib';
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

  const padX = 60;
  const padT = isPort ? 90 : 70;
  const padB = isPort ? 64 : 48;

  const logos = await getLogos();

  const tracks = [
    { bg: FOREST, fg: BRAND.cream, num: '01', title: 'Technical', sub: 'AI Safety',
      subs: ['Evals agénticos', 'Interpretabilidad'] },
    { bg: CORAL, fg: BRAND.cream, num: '02', title: 'AI', sub: 'Security',
      subs: ['Pipelines (API/Cloud)', 'Prompt injection', 'AI control'] },
    { bg: SAGE, fg: BRAND.cream, num: '03', title: 'Responsible', sub: 'AI',
      subs: ['Alucinaciones', 'Audit. multilingüe', 'Impacto social'] },
    { bg: YELLOW, fg: FOREST, num: '04', title: 'AI', sub: 'Governance',
      subs: ['Política', 'Auditoría', 'Ecosistema', 'LAWS'] },
  ];

  const tile = (t: typeof tracks[number]) => `
    <div style="display:flex;flex-direction:column;flex:1;background:${t.bg};color:${t.fg};padding:${isPort ? 30 : 22}px ${isPort ? 26 : 20}px;justify-content:space-between;min-height:${isPort ? 380 : 300}px">
      <div style="display:flex;font-family:JetBrains Mono;font-size:${isPort ? 16 : 13}px;letter-spacing:0.22em;color:${t.fg};opacity:0.78">${t.num}</div>
      <div style="display:flex;flex-direction:column;gap:-4px">
        <div style="display:flex;font-family:Bricolage Grotesque;font-weight:800;font-size:${isPort ? 64 : 52}px;line-height:0.92;letter-spacing:-0.034em;color:${t.fg}">${t.title}</div>
        <div style="display:flex;font-family:Bricolage Grotesque;font-weight:800;font-size:${isPort ? 64 : 52}px;line-height:0.92;letter-spacing:-0.034em;color:${t.fg};opacity:0.7">${t.sub}</div>
      </div>
      <div style="display:flex;flex-direction:column;gap:6px;font-family:JetBrains Mono;font-size:${isPort ? 13 : 11}px;letter-spacing:0.04em;color:${t.fg};opacity:0.88">
        ${t.subs.map(s => `<div style="display:flex">— ${s}</div>`).join('')}
      </div>
    </div>`;

  const source = `
    <div style="display:flex;width:${W}px;height:${H}px;background:${BRAND.cream};font-family:Inter;position:relative;overflow:hidden;flex-direction:column">

      <div style="display:flex;flex-direction:column;padding:${padT}px ${padX}px 30px ${padX}px;gap:14px">
        <div style="display:flex;font-family:JetBrains Mono;font-size:${isPort ? 16 : 13}px;letter-spacing:0.24em;color:${CORAL};text-transform:uppercase">Tracks · cuatro frentes</div>
        <div style="display:flex;font-family:Bricolage Grotesque;font-weight:800;font-size:${isPort ? 84 : 68}px;line-height:0.95;letter-spacing:-0.034em;color:${FOREST}">Donde se trabaja.</div>
      </div>

      <div style="display:flex;flex:1;gap:2px;padding:0 ${padX}px">
        ${tile(tracks[0])}${tile(tracks[1])}
      </div>
      <div style="display:flex;height:2px"></div>
      <div style="display:flex;flex:1;gap:2px;padding:0 ${padX}px">
        ${tile(tracks[2])}${tile(tracks[3])}
      </div>

      <div style="display:flex;padding:${isPort ? 30 : 22}px ${padX}px ${padB}px ${padX}px;align-items:flex-end;justify-content:space-between">
        <div style="display:flex;flex-direction:column;gap:3px">
          <div style="display:flex;font-family:Bricolage Grotesque;font-weight:800;font-size:${isPort ? 28 : 24}px;letter-spacing:-0.01em;color:${FOREST}">19–21 jun 2026 · Hub Bogotá</div>
          <div style="display:flex;font-family:Inter;font-weight:500;font-size:${isPort ? 16 : 14}px;color:${BRAND.ink2}">aisafetycolombia.org/hackathon</div>
        </div>
        ${hostsRow({ color: BRAND.ink2, fontSize: 16, ...logos })}
      </div>

    </div>
  `;

  const png = await render(html(source), W, H);
  return { filename: `_v2lo-03-tracks-${format}.png`, png };
}
