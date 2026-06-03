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
  const CARD = '#FFFAEF';
  const HAIR = '#E6DCC8';
  const INK = '#0C0C0C';

  const padX = 80;
  const padT = isPort ? 100 : 80;
  const padB = isPort ? 80 : 60;
  const kickerSz = isPort ? 16 : 14;
  const labelSz = isPort ? 16 : 14;
  const amountSz = isPort ? 168 : 140;
  const headlineSz = isPort ? 30 : 26;
  const totalSz = isPort ? 18 : 16;
  const stepLabelSz = isPort ? 13 : 12;
  const stepTitleSz = isPort ? 30 : 26;
  const stepBodySz = isPort ? 16 : 14.5;
  const perksSz = isPort ? 17 : 15;

  const logos = await getLogos();

  const step = (accent: string, num: string, title: string, body: string) => `
    <div style="display:flex;flex-direction:column;flex:1;background:${CARD};border:1px solid ${HAIR};border-top:4px solid ${accent};border-radius:22px;padding:22px 22px;gap:8px">
      <div style="display:flex;font-family:JetBrains Mono;font-size:${stepLabelSz}px;letter-spacing:0.22em;color:${accent};text-transform:uppercase">Etapa ${num}</div>
      <div style="display:flex;font-family:Bricolage Grotesque;font-weight:700;font-size:${stepTitleSz}px;line-height:1.05;letter-spacing:-0.015em;color:${FOREST}">${title}</div>
      <div style="display:flex;font-family:Inter;font-weight:500;font-size:${stepBodySz}px;line-height:1.4;color:${INK}">${body}</div>
    </div>`;

  const perk = (text: string) => `
    <div style="display:flex;align-items:flex-start;gap:12px">
      <div style="display:flex;width:8px;height:8px;border-radius:50%;background:${CORAL};flex-shrink:0;margin-top:9px"></div>
      <div style="display:flex;font-family:Inter;font-weight:500;font-size:${perksSz}px;line-height:1.45;color:${INK}">${text}</div>
    </div>`;

  const source = `
    <div style="display:flex;width:${W}px;height:${H}px;background:${BRAND.cream};font-family:Inter;position:relative;overflow:hidden">

      <div style="display:flex;flex-direction:column;width:${W}px;height:${H}px;padding:${padT}px ${padX}px ${padB}px ${padX}px;justify-content:space-between">

        <div style="display:flex;flex-direction:column;gap:8px;max-width:940px">
          <div style="display:flex;font-family:JetBrains Mono;font-size:${kickerSz}px;letter-spacing:0.22em;color:${CORAL};text-transform:uppercase">Premio LATAM</div>
          <div style="display:flex;font-family:Bricolage Grotesque;font-weight:800;font-size:${amountSz}px;line-height:0.95;letter-spacing:-0.045em;color:${CORAL}">USD 3.000</div>
          <div style="display:flex;font-family:Bricolage Grotesque;font-weight:700;font-size:${headlineSz}px;line-height:1.2;letter-spacing:-0.012em;color:${FOREST};max-width:780px;margin-top:6px">para los 3 equipos ganadores de América Latina.</div>
          <div style="display:flex;font-family:Inter;font-weight:500;font-size:${totalSz}px;line-height:1.4;color:${BRAND.ink2};max-width:760px;margin-top:6px">USD 1.000 por equipo, dentro de un pool de USD 6.000 para 6 equipos del Sur Global.</div>
        </div>

        <div style="display:flex;background:${CARD};border:1px solid ${HAIR};border-left:4px solid ${CORAL};border-radius:0 18px 18px 0;padding:20px 24px;flex-direction:column;gap:14px">
          <div style="display:flex;font-family:JetBrains Mono;font-size:${labelSz}px;letter-spacing:0.22em;color:${CORAL};text-transform:uppercase">Cada equipo ganador recibe</div>
          <div style="display:flex;flex-direction:column;gap:10px">
            ${perk('Invitación al Apart Lab Fellowship: programa remoto de 12 a 24 semanas para convertir el prototipo en investigación publicable.')}
            ${perk('Mentoría y revisión de expertos durante el sprint y a lo largo del fellowship.')}
            ${perk('Posibilidad de publicación en conferencias técnicas y vinculación a organizaciones de seguridad de IA.')}
          </div>
        </div>

        <div style="display:flex;flex-direction:column;gap:14px">
          <div style="display:flex;font-family:JetBrains Mono;font-size:${labelSz}px;letter-spacing:0.22em;color:${FOREST};text-transform:uppercase">Pipeline después del hackathon</div>
          <div style="display:flex;gap:14px">
            ${step(FOREST, '01', 'Hackathon', 'Tres días de sprint sobre retos definidos por expertos.')}
            ${step(CORAL, '02', 'Fellowship', 'Acompañamiento de Apart Research para publicar resultados.')}
            ${step(YELLOW, '03', 'Vinculación', 'Roles en organizaciones de seguridad de IA en la región y fuera.')}
          </div>
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
  return { filename: `_v1id-06-premio-${format}.png`, png };
}
