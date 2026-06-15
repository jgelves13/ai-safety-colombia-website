import { render, html, BRAND, hostsRow, getHostsLogosHD, qrPngDataUrl } from './lib';
import type { FlyerFormat } from './_v3-apart';

export default async function (format: FlyerFormat = 'portrait') {
  const isPort = format === 'portrait';
  const W = 1080;
  const H = isPort ? 1350 : 1080;

  const padT = isPort ? 92 : 72;
  const padB = isPort ? 84 : 64;
  const padX = isPort ? 88 : 72;
  const labelSz = isPort ? 18 : 16;
  const leadSz = isPort ? 26 : 22;
  const heroSz = isPort ? 230 : 190;
  const yearSz = isPort ? 60 : 50;
  const noteSz = isPort ? 22 : 19;
  const pillPadV = isPort ? 22 : 18;
  const pillPadH = isPort ? 22 : 18;
  const pillLabelSz = isPort ? 13 : 12;
  const pillTitleSz = isPort ? 26 : 22;
  const pillDescSz = isPort ? 15 : 13;
  const qrSize = isPort ? 140 : 120;
  const bandPadV = isPort ? 22 : 18;
  const bandPadH = isPort ? 26 : 22;
  const bandLabelSz = isPort ? 14 : 12;
  const bandLinkSz = isPort ? 24 : 21;
  const hostsFs = 20;

  const hostsLogos = await getHostsLogosHD(hostsFs, { aiscBlack: true });
  const qrUrl = await qrPngDataUrl('https://aisafetycolombia.org/hackathon/', Math.round(qrSize * 2.2));
  const FOREST = BRAND.forest;
  const CORAL = BRAND.coral;
  const YELLOW = BRAND.yellow;

  const pill = (label: string, title: string, desc: string, accent: string) => `
    <div style="display:flex;flex-direction:column;flex:1;gap:8px;padding:${pillPadV}px ${pillPadH}px;background:${BRAND.cream};border:2px solid ${FOREST}">
      <div style="display:flex;font-family:JetBrains Mono;font-size:${pillLabelSz}px;letter-spacing:0.18em;color:${accent};text-transform:uppercase">${label}</div>
      <div style="display:flex;font-family:Bricolage Grotesque;font-weight:800;font-size:${pillTitleSz}px;line-height:1.05;letter-spacing:-0.02em;color:${FOREST}">${title}</div>
      <div style="display:flex;font-family:Inter;font-weight:500;font-size:${pillDescSz}px;line-height:1.35;color:${BRAND.ink}">${desc}</div>
    </div>`;

  const source = `
    <div style="display:flex;width:${W}px;height:${H}px;background:${BRAND.cream};font-family:Inter;position:relative;overflow:hidden">
      <div style="display:flex;flex-direction:column;width:${W}px;height:${H}px;padding:${padT}px ${padX}px ${padB}px ${padX}px;justify-content:space-between">

        <div style="display:flex;flex-direction:column;gap:18px">
          <div style="display:flex;font-family:JetBrains Mono;font-weight:500;font-size:${labelSz}px;letter-spacing:0.2em;color:${CORAL};text-transform:uppercase">Cierre de postulaciones</div>
          <div style="display:flex;font-family:Inter;font-weight:500;font-size:${leadSz}px;line-height:1.35;color:${BRAND.ink};max-width:680px">Las postulaciones al Global South AI Safety Hackathon cierran el</div>
          <div style="display:flex;flex-direction:column;gap:6px">
            <div style="display:flex;font-family:Bricolage Grotesque;font-weight:800;font-size:${heroSz}px;line-height:0.88;letter-spacing:-0.045em;color:${FOREST}">12 jun</div>
            <div style="display:flex;font-family:Bricolage Grotesque;font-weight:700;font-size:${yearSz}px;line-height:1;letter-spacing:-0.02em;color:${CORAL}">2026</div>
          </div>
          <div style="display:flex;font-family:Inter;font-weight:500;font-size:${noteSz}px;line-height:1.4;color:${BRAND.ink};max-width:720px;margin-top:4px">Hackathon 19–21 jun · hub Bogotá presencial u online</div>
        </div>

        <div style="display:flex;align-items:stretch;gap:14px">
          ${pill('Premio', 'USD 3.000', 'Entre 3 equipos ganadores en América Latina.', CORAL)}
          ${pill('Siguiente etapa', 'Apart Lab Fellowship', 'Invitación a los equipos ganadores; algunos fellows han publicado en ICLR, NeurIPS, ACL.', YELLOW)}
          ${pill('Vinculación', 'Conferencias y roles', 'Publicación y roles en organizaciones de seguridad de IA.', CORAL)}
        </div>

        <div style="display:flex;flex-direction:column;gap:16px">
          <div style="display:flex;background:${FOREST};padding:${bandPadV}px ${bandPadH}px;align-items:center;justify-content:space-between;gap:20px">
            <div style="display:flex;flex-direction:column;gap:4px;flex:1">
              <div style="display:flex;font-family:JetBrains Mono;font-weight:500;font-size:${bandLabelSz}px;letter-spacing:0.2em;color:${BRAND.cream};text-transform:uppercase">Postúlate</div>
              <div style="display:flex;font-family:Bricolage Grotesque;font-weight:700;font-size:${bandLinkSz}px;letter-spacing:-0.01em;color:${BRAND.cream}">aisafetycolombia.org/hackathon</div>
            </div>
            <img src="${qrUrl}" style="display:flex;width:${qrSize}px;height:${qrSize}px;background:${BRAND.cream};padding:6px;border-radius:8px"/>
          </div>

          <div style="display:flex;align-items:flex-end;justify-content:flex-end">
            ${hostsRow({ color: BRAND.ink2, fontSize: hostsFs, ...hostsLogos })}
          </div>
        </div>

      </div>
    </div>
  `;

  const png = await render(html(source), W, H);
  return { filename: `_v6m-b-urgencia-${format}.png`, png };
}
