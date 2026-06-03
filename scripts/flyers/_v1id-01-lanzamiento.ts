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
  const padT = isPort ? 96 : 78;
  const padB = isPort ? 84 : 64;
  const kickerSz = isPort ? 18 : 16;
  const h1Sz = isPort ? 112 : 92;
  const subSz = isPort ? 26 : 23;
  const noteLabelSz = isPort ? 15 : 13;
  const noteDateSz = isPort ? 44 : 38;
  const modeLabelSz = isPort ? 13 : 12;
  const modeTitleSz = isPort ? 30 : 26;
  const modeBodySz = isPort ? 17 : 15.5;
  const stripDaySz = isPort ? 88 : 72;
  const stripLabelSz = isPort ? 14 : 12;
  const footerSz = isPort ? 17 : 15;

  const logos = await getLogos();

  const modeCard = (accent: string, badgeLabel: string, title: string, body: string) => `
    <div style="display:flex;flex-direction:column;flex:1;background:${CARD};border:1px solid ${HAIR};border-top:4px solid ${accent};border-radius:22px;padding:24px 24px 22px 24px;gap:10px">
      <div style="display:flex;align-self:flex-start;font-family:Bricolage Grotesque;font-weight:700;font-size:${modeLabelSz}px;letter-spacing:0.2em;color:${accent};text-transform:uppercase;border:1px solid ${accent};border-radius:9999px;padding:5px 12px">${badgeLabel}</div>
      <div style="display:flex;font-family:Bricolage Grotesque;font-weight:700;font-size:${modeTitleSz}px;line-height:1.05;letter-spacing:-0.015em;color:${FOREST}">${title}</div>
      <div style="display:flex;font-family:Inter;font-weight:500;font-size:${modeBodySz}px;line-height:1.4;color:${INK}">${body}</div>
    </div>`;

  const dayBlock = (accent: string, day: string, label: string) => `
    <div style="display:flex;flex-direction:column;flex:1;gap:6px;border-top:3px solid ${accent};padding-top:14px">
      <div style="display:flex;font-family:Bricolage Grotesque;font-weight:800;font-size:${stripDaySz}px;line-height:0.95;letter-spacing:-0.04em;color:${FOREST}">${day}</div>
      <div style="display:flex;font-family:JetBrains Mono;font-size:${stripLabelSz}px;letter-spacing:0.2em;color:${accent};text-transform:uppercase">${label}</div>
    </div>`;

  const source = `
    <div style="display:flex;width:${W}px;height:${H}px;background:${BRAND.cream};font-family:Inter;position:relative;overflow:hidden">

      <div style="display:flex;flex-direction:column;width:${W}px;height:${H}px;padding:${padT}px ${padX}px ${padB}px ${padX}px;justify-content:space-between">

        <div style="display:flex;flex-direction:column;gap:26px;max-width:940px">

          <div style="display:flex;font-family:JetBrains Mono;font-size:${kickerSz}px;letter-spacing:0.22em;color:${FOREST};text-transform:uppercase">Hackathon de investigación · jun 2026</div>

          <div style="display:flex;flex-direction:column;gap:6px">
            <div style="display:flex;flex-wrap:wrap;font-family:Bricolage Grotesque;font-weight:700;font-size:${h1Sz}px;line-height:0.95;letter-spacing:-0.038em;color:${FOREST}">Global South AI <span style="color:${CORAL};margin:0 18px 0 0">Safety</span> Hackathon</div>
          </div>

          <div style="display:flex;font-family:Inter;font-weight:500;font-size:${subSz}px;line-height:1.42;color:${INK};max-width:840px">Tres días de investigación en seguridad y gobernanza de IA, con relevancia para América Latina. Sede presencial en Bogotá · participación remota desde todo el Sur Global.</div>

        </div>

        <div style="display:flex;align-items:stretch;background:${CARD};border:1px solid ${HAIR};border-left:3px solid ${CORAL};border-radius:0 14px 14px 0;padding:18px 24px;gap:24px;align-self:flex-start;max-width:780px">
          <div style="display:flex;flex-direction:column;gap:4px;justify-content:center">
            <div style="display:flex;font-family:JetBrains Mono;font-size:${noteLabelSz}px;letter-spacing:0.2em;color:${CORAL};text-transform:uppercase">Postulaciones hub Bogotá</div>
            <div style="display:flex;font-family:Inter;font-weight:500;font-size:16px;color:${BRAND.ink2}">cierre del formulario</div>
          </div>
          <div style="display:flex;font-family:Bricolage Grotesque;font-weight:700;font-size:${noteDateSz}px;line-height:1;letter-spacing:-0.02em;color:${FOREST};align-self:center">12 jun 2026</div>
        </div>

        <div style="display:flex;gap:18px">
          ${modeCard(FOREST, 'Presencial', 'Hub Bogotá', 'Workspace 24h, alimentación incluida, mentorías en vivo y apoyo limitado de viaje.')}
          ${modeCard(SAGE, 'En línea', 'Sur Global', 'Charlas y Q&A por Zoom, canales en Discord, acceso completo a retos y recursos.')}
        </div>

        <div style="display:flex;gap:24px;align-items:flex-start">
          ${dayBlock(FOREST, '19', 'viernes · apertura')}
          ${dayBlock(SAGE, '20', 'sábado · desarrollo')}
          ${dayBlock(YELLOW, '21', 'domingo · entrega')}
        </div>

        <div style="display:flex;align-items:flex-end;justify-content:space-between;padding-top:8px;border-top:1px solid ${HAIR}">
          <div style="display:flex;flex-direction:column;gap:3px;padding-top:14px">
            <div style="display:flex;font-family:Bricolage Grotesque;font-weight:700;font-size:20px;letter-spacing:-0.01em;color:${FOREST}">aisafetycolombia.org/hackathon</div>
            <div style="display:flex;font-family:Inter;font-weight:500;font-size:${footerSz}px;color:${BRAND.ink2}">Organizado por Apart Research · hub coordinado por AI Safety Colombia</div>
          </div>
          ${hostsRow({ color: BRAND.ink2, fontSize: 16, ...logos })}
        </div>

      </div>

    </div>
  `;

  const png = await render(html(source), W, H);
  return { filename: `_v1id-01-lanzamiento-${format}.png`, png };
}
