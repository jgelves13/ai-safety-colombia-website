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
  const padT = isPort ? 100 : 78;
  const padB = isPort ? 76 : 56;
  const kickerSz = isPort ? 16 : 14;
  const h1Sz = isPort ? 70 : 58;
  const cardGap = isPort ? 16 : 12;
  const cardPadV = isPort ? 22 : 16;
  const cardPadH = isPort ? 26 : 22;
  const trackNumSz = isPort ? 28 : 24;
  const trackTitleSz = isPort ? 32 : 28;
  const trackDescSz = isPort ? 16 : 14.5;
  const pillSz = isPort ? 13 : 12;

  const logos = await getLogos();

  const tracks = [
    { accent: FOREST, num: '01', title: 'Technical AI Safety',
      desc: 'Entender y verificar cómo se comportan los modelos por dentro.',
      subs: ['Evaluaciones para sistemas agénticos', 'Interpretabilidad mecanicista'] },
    { accent: CORAL, num: '02', title: 'AI Security',
      desc: 'Proteger los sistemas de IA frente a abuso y ataques.',
      subs: ['Seguridad de pipelines (API/Cloud)', 'Inyección de prompts y jailbreaks', 'Control de IA'] },
    { accent: SAGE, num: '03', title: 'Responsible AI',
      desc: 'Reducir daños en el uso real: alucinaciones, sesgos, impacto social.',
      subs: ['Mitigación de alucinaciones', 'Auditoría multilingüe e intercultural', 'Evaluación de impacto social'] },
    { accent: YELLOW, num: '04', title: 'AI Governance',
      desc: 'Reglas e instituciones que guían la IA, incluyendo LAWS.',
      subs: ['Política y regulación', 'Auditoría y rendición de cuentas', 'Monitoreo del ecosistema', 'Armas autónomas letales'] },
  ];

  const trackCard = (t: typeof tracks[number]) => `
    <div style="display:flex;flex-direction:column;background:${CARD};border:1px solid ${HAIR};border-top:4px solid ${t.accent};border-radius:22px;padding:${cardPadV}px ${cardPadH}px;gap:10px">
      <div style="display:flex;align-items:baseline;gap:14px">
        <div style="display:flex;font-family:JetBrains Mono;font-size:${trackNumSz}px;letter-spacing:0.04em;color:${t.accent}">${t.num}</div>
        <div style="display:flex;font-family:Bricolage Grotesque;font-weight:700;font-size:${trackTitleSz}px;line-height:1.0;letter-spacing:-0.018em;color:${FOREST}">${t.title}</div>
      </div>
      <div style="display:flex;font-family:Inter;font-weight:500;font-size:${trackDescSz}px;line-height:1.4;color:${INK};max-width:880px">${t.desc}</div>
      <div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:6px">
        ${t.subs.map(s => `<div style="display:flex;font-family:JetBrains Mono;font-size:${pillSz}px;letter-spacing:0.04em;color:${FOREST};background:${BRAND.cream};border:1px solid ${HAIR};border-radius:9999px;padding:6px 14px">${s}</div>`).join('')}
      </div>
    </div>`;

  const source = `
    <div style="display:flex;width:${W}px;height:${H}px;background:${BRAND.cream};font-family:Inter;position:relative;overflow:hidden">

      <div style="display:flex;flex-direction:column;width:${W}px;height:${H}px;padding:${padT}px ${padX}px ${padB}px ${padX}px;justify-content:space-between">

        <div style="display:flex;flex-direction:column;gap:14px;max-width:880px">
          <div style="display:flex;font-family:JetBrains Mono;font-size:${kickerSz}px;letter-spacing:0.22em;color:${FOREST};text-transform:uppercase">Cuatro frentes</div>
          <div style="display:flex;font-family:Bricolage Grotesque;font-weight:700;font-size:${h1Sz}px;line-height:1.0;letter-spacing:-0.028em;color:${FOREST}">Tracks del hackathon</div>
        </div>

        <div style="display:flex;flex-direction:column;gap:${cardGap}px">
          ${tracks.map(trackCard).join('')}
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
  return { filename: `_v1id-03-tracks-${format}.png`, png };
}
