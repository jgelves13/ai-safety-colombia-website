import { render, html, BRAND, hostsRow, getLogos } from './lib';
import type { FlyerFormat } from './_v3-apart';

export default async function (format: FlyerFormat = 'portrait') {
  const isPort = format === 'portrait';
  const W = 1080;
  const H = isPort ? 1350 : 1080;

  const padT = isPort ? 125 : 100;
  const padB = isPort ? 80 : 60;
  const headingSz = isPort ? 86 : 72;
  const subSz = isPort ? 26 : 23;
  const rowPadV = isPort ? 28 : 20;
  const nameSz = isPort ? 42 : 36;
  const affSz = isPort ? 19 : 17;

  const logos = await getLogos();
  const FOREST = BRAND.forest;

  const judges = [
    { num: '01', name: 'Juan Felipe Cerón', aff: 'OpenAI', topic: 'Inyección de prompts · Evaluación de LLMs' },
    { num: '02', name: 'Melissa Robles', aff: 'BID Lab y Quantil', topic: 'Auditoría de comportamiento (multilingüe, intercultural)' },
    { num: '03', name: 'Catalina Bernal', aff: 'BIP Colombia', topic: 'Auditoría de comportamiento (multilingüe, intercultural)' },
    { num: '04', name: 'Juan Liévano-Karim', aff: 'UC Berkeley', topic: 'Control de IA · Evaluaciones para sistemas agénticos' },
    { num: '05', name: 'Steve Hege', aff: 'ILAPS', topic: 'Gobernanza de armas autónomas letales (LAWS)' },
    { num: '06', name: 'Wanda Muñoz', aff: 'SEHLAC · Campaña para Detener a los Robots Asesinos', topic: 'Gobernanza de armas autónomas letales (LAWS)' },
  ];

  const row = (j: typeof judges[number]) => `
    <div style="display:flex;align-items:flex-start;gap:28px;padding:${rowPadV}px 0;border-top:1px solid rgba(31,77,50,0.2)">
      <div style="display:flex;flex-direction:column;flex:1;gap:5px">
        <div style="display:flex;font-family:Bricolage Grotesque;font-weight:700;font-size:${nameSz}px;line-height:1.05;letter-spacing:-0.018em;color:${FOREST}">${j.name}</div>
        <div style="display:flex;font-family:Inter;font-weight:500;font-size:${affSz}px;line-height:1.4;color:#0C0C0C">${j.aff}</div>
      </div>
      <div style="display:flex;font-family:Inter;font-weight:500;font-size:${affSz}px;line-height:1.35;color:${BRAND.ink2};max-width:420px;text-align:right;padding-top:18px">${j.topic}</div>
    </div>`;

  const source = `
    <div style="display:flex;width:${W}px;height:${H}px;background:${BRAND.cream};font-family:Inter;position:relative;overflow:hidden">

      <div style="display:flex;flex-direction:column;width:${W}px;height:${H}px;padding:${padT}px 80px ${padB}px 80px;justify-content:space-between">

        <div style="display:flex;flex-direction:column;gap:14px;max-width:880px">
          <div style="display:flex;font-family:Bricolage Grotesque;font-weight:700;font-size:${headingSz}px;line-height:1.0;letter-spacing:-0.024em;color:${FOREST}">¿Quién evalúa?</div>
          <div style="display:flex;font-family:Inter;font-weight:500;font-size:${subSz}px;line-height:1.4;color:#0C0C0C;max-width:820px">Seis personas con trayectoria en seguridad técnica, auditoría de IA y gobernanza, en Colombia y la región.</div>
        </div>

        <div style="display:flex;flex-direction:column">
          ${judges.map(row).join('')}
          <div style="display:flex;border-top:1px solid rgba(31,77,50,0.2);height:1px"></div>
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
  return { filename: `_va-05-jurado-${format}.png`, png };
}
