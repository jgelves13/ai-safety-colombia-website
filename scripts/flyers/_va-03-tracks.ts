import { render, html, BRAND, hostsRow, getLogos } from './lib';
import type { FlyerFormat } from './_v3-apart';

export default async function (format: FlyerFormat = 'portrait') {
  const isPort = format === 'portrait';
  const W = 1080;
  const H = isPort ? 1350 : 1080;

  const padT = isPort ? 112 : 90;
  const padB = isPort ? 80 : 60;
  const headingSz = isPort ? 70 : 58;
  const rowsGap = isPort ? 18 : 10;
  const rowPadV = isPort ? 28 : 20;
  const rowPadL = isPort ? 28 : 24;
  const rowPadR = isPort ? 30 : 26;
  const borderL = isPort ? 7 : 6;
  const titleSz = isPort ? 34 : 30;
  const descSz = isPort ? 17 : 15.5;
  const subSz = isPort ? 16.5 : 15;
  const subDot = isPort ? 8 : 7;

  const logos = await getLogos();
  const FOREST = BRAND.forest;
  const CORAL = '#E5604D';
  const BLUE = '#3563A8';
  const YELLOW = '#F2B705';

  const tracks = [
    { accent: FOREST, tint: '#1F4D3211', num: '01', title: 'Technical AI Safety',
      desc: 'Qué hacen los modelos por dentro. Cómo evaluar agentes que planean varios pasos. Qué aprenden realmente.',
      subs: ['Evaluaciones para sistemas agénticos', 'Interpretabilidad mecanicista'] },
    { accent: CORAL,  tint: '#E5604D14', num: '02', title: 'AI Security',
      desc: 'Cómo proteger los sistemas frente a abuso: pipelines de despliegue, jailbreaks e inyección de prompts, y control sobre modelos capaces.',
      subs: ['Seguridad de pipelines (API/Cloud)', 'Inyección de prompts y jailbreaks', 'Control de IA'] },
    { accent: BLUE,   tint: '#3563A814', num: '03', title: 'IA Responsable',
      desc: 'Cómo reducir el daño en el uso real: alucinaciones, sesgos lingüísticos y culturales, e impacto social verificable.',
      subs: ['Mitigación de alucinaciones', 'Auditoría de comportamiento (multilingüe, intercultural)', 'Evaluación de impacto social'] },
    { accent: YELLOW, tint: '#F2B7051F', num: '04', title: 'Gobernanza de IA',
      desc: 'Las reglas que rodean a estos sistemas: política y regulación, rendición de cuentas, monitoreo del ecosistema y armas autónomas letales.',
      subs: ['Análisis de política y regulación de IA', 'Auditoría y rendición de cuentas de sistemas', 'Monitoreo del ecosistema', 'Sistemas de armas autónomas letales'] },
  ];

  const row = (t: typeof tracks[number]) => `
    <div style="display:flex;background:${t.tint};padding:${rowPadV}px ${rowPadR}px ${rowPadV}px ${rowPadL}px;gap:32px;align-items:flex-start;border-left:${borderL}px solid ${t.accent}">
      <div style="display:flex;flex-direction:column;width:460px;gap:8px">
        <div style="display:flex;font-family:Bricolage Grotesque;font-weight:700;font-size:${titleSz}px;line-height:1.05;letter-spacing:-0.015em;color:${FOREST}">${t.title}</div>
        <div style="display:flex;font-family:Inter;font-weight:500;font-size:${descSz}px;line-height:1.4;color:#0C0C0C">${t.desc}</div>
      </div>
      <div style="display:flex;flex-direction:column;flex:1;gap:10px;padding-top:8px">
        ${t.subs.map(s => `<div style="display:flex;align-items:center;gap:12px"><div style="display:flex;width:${subDot}px;height:${subDot}px;border-radius:50%;background:${t.accent};flex-shrink:0"></div><div style="display:flex;font-family:Inter;font-weight:500;font-size:${subSz}px;line-height:1.3;color:#0C0C0C">${s}</div></div>`).join('')}
      </div>
    </div>`;

  const source = `
    <div style="display:flex;width:${W}px;height:${H}px;background:${BRAND.cream};font-family:Inter;position:relative;overflow:hidden">

      <div style="display:flex;flex-direction:column;width:${W}px;height:${H}px;padding:${padT}px 80px ${padB}px 80px;justify-content:space-between">

        <div style="display:flex;font-family:Bricolage Grotesque;font-weight:700;font-size:${headingSz}px;line-height:1.0;letter-spacing:-0.024em;color:${FOREST};max-width:920px">¿Sobre qué se trabaja?</div>

        <div style="display:flex;flex-direction:column;gap:${rowsGap}px">
          ${tracks.map(row).join('')}
        </div>

        <div style="display:flex;align-items:flex-end;justify-content:space-between">
          <div style="display:flex;flex-direction:column;gap:4px">
            <div style="display:flex;font-family:Bricolage Grotesque;font-weight:800;font-size:32px;line-height:1;letter-spacing:-0.015em;color:${FOREST}">19–21 jun 2026 · Hub Bogotá</div>
            <div style="display:flex;font-family:Inter;font-weight:500;font-size:18px;color:#0C0C0C">aisafetycolombia.org/hackathon</div>
          </div>
          ${hostsRow({ color: BRAND.ink2, fontSize: 18, ...logos })}
        </div>

      </div>

    </div>
  `;

  const png = await render(html(source), W, H);
  return { filename: `_va-03-tracks-${format}.png`, png };
}
