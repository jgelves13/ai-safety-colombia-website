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
  const kickerSz = isPort ? 17 : 15;
  const h1Sz = isPort ? 80 : 66;
  const bodySz = isPort ? 23 : 20;
  const numSz = isPort ? 70 : 58;
  const cardLabelSz = isPort ? 13 : 12;
  const cardBodySz = isPort ? 17 : 15;

  const logos = await getLogos();

  const editorialRow = (accent: string, num: string, label: string, body: string) => `
    <div style="display:flex;align-items:flex-start;gap:24px;padding:18px 0">
      <div style="display:flex;font-family:Bricolage Grotesque;font-weight:800;font-size:${numSz}px;line-height:1;letter-spacing:-0.04em;color:${accent};width:120px;justify-content:flex-start">${num}</div>
      <div style="display:flex;width:3px;background:${accent};align-self:stretch"></div>
      <div style="display:flex;flex-direction:column;flex:1;gap:8px;padding-top:6px">
        <div style="display:flex;font-family:JetBrains Mono;font-size:${cardLabelSz}px;letter-spacing:0.22em;color:${accent};text-transform:uppercase">${label}</div>
        <div style="display:flex;font-family:Inter;font-weight:500;font-size:${cardBodySz}px;line-height:1.5;color:${INK}">${body}</div>
      </div>
    </div>`;

  const source = `
    <div style="display:flex;width:${W}px;height:${H}px;background:${BRAND.cream};font-family:Inter;position:relative;overflow:hidden">

      <div style="display:flex;flex-direction:column;width:${W}px;height:${H}px;padding:${padT}px ${padX}px ${padB}px ${padX}px;justify-content:space-between">

        <div style="display:flex;flex-direction:column;gap:28px;max-width:940px">

          <div style="display:flex;font-family:JetBrains Mono;font-size:${kickerSz}px;letter-spacing:0.22em;color:${FOREST};text-transform:uppercase">Qué es el hackathon</div>

          <div style="display:flex;font-family:Bricolage Grotesque;font-weight:700;font-size:${h1Sz}px;line-height:0.98;letter-spacing:-0.028em;color:${FOREST};max-width:940px">Un sprint internacional de tres días para cerrar la <span style="color:${CORAL};margin-right:8px">brecha</span> en investigación.</div>

          <div style="display:flex;font-family:Inter;font-weight:500;font-size:${bodySz}px;line-height:1.5;color:${INK};max-width:880px">La investigación en seguridad de IA se concentra en un puñado de países, pero estos sistemas ya están en nuestra región: sesgos sin auditar, vulnerabilidades sin documentar, decisiones automatizadas sin rendición de cuentas local.</div>

        </div>

        <div style="display:flex;flex-direction:column;background:${CARD};border:1px solid ${HAIR};border-radius:22px;padding:18px 32px 18px 32px">
          ${editorialRow(FOREST, '3 días', 'Sprint', 'Equipos pequeños trabajan en retos definidos por expertos en seguridad y gobernanza de IA.')}
          <div style="display:flex;height:1px;background:${HAIR}"></div>
          ${editorialRow(SAGE, 'En vivo', 'Mentoría', 'Acompañamiento de investigadores durante todo el evento, con charlas técnicas y Q&A.')}
          <div style="display:flex;height:1px;background:${HAIR}"></div>
          ${editorialRow(CORAL, '4–8 pp', 'Entrega', 'Cada equipo entrega un reporte de investigación en PDF con enfoque, resultados e implicaciones.')}
          <div style="display:flex;height:1px;background:${HAIR}"></div>
          ${editorialRow(YELLOW, '12–24 sem', 'Después', 'Los equipos ganadores entran al Apart Lab Fellowship para convertir el prototipo en investigación publicable.')}
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
  return { filename: `_v1id-02-que-es-${format}.png`, png };
}
