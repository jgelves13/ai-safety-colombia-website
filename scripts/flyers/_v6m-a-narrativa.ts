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
  const heroSz = isPort ? 132 : 110;
  const heroSubSz = isPort ? 24 : 21;
  const bridgeSz = isPort ? 38 : 32;
  const stepPadV = isPort ? 26 : 22;
  const stepPadH = isPort ? 22 : 20;
  const stepBorder = 4;
  const stepNumSz = isPort ? 17 : 15;
  const stepTitleSz = isPort ? 28 : 24;
  const stepDescSz = isPort ? 17 : 15;
  const qrSize = isPort ? 150 : 130;
  const bandPadV = isPort ? 26 : 22;
  const bandPadH = isPort ? 30 : 26;
  const bandLabelSz = isPort ? 15 : 13;
  const bandLinkSz = isPort ? 30 : 26;
  const bandDatesSz = isPort ? 22 : 19;
  const hostsFs = 20;

  const hostsLogos = await getHostsLogosHD(hostsFs, { aiscBlack: true });
  const qrUrl = await qrPngDataUrl('https://aisafetycolombia.org/hackathon/', Math.round(qrSize * 2.2));
  const FOREST = BRAND.forest;
  const CORAL = BRAND.coral;
  const YELLOW = BRAND.yellow;

  const step = (num: string, title: string, desc: string, numColor: string) => `
    <div style="display:flex;flex-direction:column;flex:1;gap:10px;padding:${stepPadV}px ${stepPadH}px;border-top:${stepBorder}px solid ${FOREST}">
      <div style="display:flex;font-family:JetBrains Mono;font-size:${stepNumSz}px;letter-spacing:0.18em;color:${numColor}">${num}</div>
      <div style="display:flex;font-family:Bricolage Grotesque;font-weight:700;font-size:${stepTitleSz}px;line-height:1.1;letter-spacing:-0.015em;color:${FOREST}">${title}</div>
      <div style="display:flex;font-family:Inter;font-weight:500;font-size:${stepDescSz}px;line-height:1.4;color:${BRAND.ink}">${desc}</div>
    </div>`;

  const source = `
    <div style="display:flex;width:${W}px;height:${H}px;background:${BRAND.cream};font-family:Inter;position:relative;overflow:hidden">
      <div style="display:flex;flex-direction:column;width:${W}px;height:${H}px;padding:${padT}px ${padX}px ${padB}px ${padX}px;justify-content:space-between">

        <div style="display:flex;flex-direction:column;gap:28px;max-width:920px">
          <div style="display:flex;flex-direction:column;gap:8px">
            <div style="display:flex;font-family:JetBrains Mono;font-weight:500;font-size:${labelSz}px;letter-spacing:0.2em;color:${CORAL};text-transform:uppercase">Premio</div>
            <div style="display:flex;font-family:Bricolage Grotesque;font-weight:800;font-size:${heroSz}px;line-height:0.95;letter-spacing:-0.035em;color:${FOREST}">USD 3.000</div>
            <div style="display:flex;font-family:Inter;font-weight:500;font-size:${heroSubSz}px;line-height:1.4;color:${BRAND.ink};max-width:680px;margin-top:6px">entre 3 equipos ganadores en América Latina</div>
          </div>

          <div style="display:flex;font-family:Bricolage Grotesque;font-weight:700;font-size:${bridgeSz}px;line-height:1.12;letter-spacing:-0.018em;color:${FOREST};max-width:920px">Pero el premio es solo la puerta a la siguiente etapa.</div>
        </div>

        <div style="display:flex;align-items:stretch;gap:16px">
          ${step('01', 'Hackathon', 'Tres días de trabajo en equipo sobre un reto definido por expertos.', CORAL)}
          ${step('02', 'Apart Lab Fellowship', 'Los equipos ganadores reciben invitación; algunos fellows han publicado en ICLR, NeurIPS, ACL.', YELLOW)}
          ${step('03', 'Vinculación', 'Publicación en conferencias y roles en organizaciones de seguridad de IA.', CORAL)}
        </div>

        <div style="display:flex;flex-direction:column;gap:18px">
          <div style="display:flex;background:${FOREST};padding:${bandPadV}px ${bandPadH}px;align-items:center;justify-content:space-between;gap:24px">
            <div style="display:flex;flex-direction:column;gap:4px;flex:1">
              <div style="display:flex;font-family:JetBrains Mono;font-weight:500;font-size:${bandLabelSz}px;letter-spacing:0.2em;color:${BRAND.cream};text-transform:uppercase">Postúlate antes</div>
              <div style="display:flex;font-family:Bricolage Grotesque;font-weight:800;font-size:${bandLinkSz}px;letter-spacing:-0.015em;color:${BRAND.cream}">12 jun 2026</div>
              <div style="display:flex;font-family:Bricolage Grotesque;font-weight:700;font-size:${bandDatesSz}px;line-height:1.2;letter-spacing:-0.01em;color:${YELLOW};margin-top:6px">Hackathon 19–21 jun · hub Bogotá presencial u online</div>
            </div>
            <img src="${qrUrl}" style="display:flex;width:${qrSize}px;height:${qrSize}px;background:${BRAND.cream};padding:6px;border-radius:8px"/>
          </div>

          <div style="display:flex;align-items:center;justify-content:space-between">
            <div style="display:flex;font-family:JetBrains Mono;font-weight:500;font-size:14px;letter-spacing:0.04em;color:${BRAND.ink2}">aisafetycolombia.org/hackathon</div>
            ${hostsRow({ color: BRAND.ink2, fontSize: hostsFs, ...hostsLogos })}
          </div>
        </div>

      </div>
    </div>
  `;

  const png = await render(html(source), W, H);
  return { filename: `_v6m-a-narrativa-${format}.png`, png };
}
