import { render, html, BRAND, hostsRow, getHostsLogosHD, qrPngDataUrl } from './lib';
import type { FlyerFormat } from './_v3-apart';

export default async function (format: FlyerFormat = 'portrait') {
  const isPort = format === 'portrait';
  const W = 1080;
  const H = isPort ? 1350 : 1080;

  const padT = isPort ? 92 : 72;
  const padB = isPort ? 84 : 64;
  const padX = isPort ? 88 : 72;
  const eyebrowSz = isPort ? 18 : 16;
  const headSz = isPort ? 70 : 58;
  const rowGap = isPort ? 14 : 12;
  const rowPadV = isPort ? 24 : 20;
  const rowPadH = isPort ? 26 : 22;
  const rowNumSz = isPort ? 56 : 46;
  const rowTitleSz = isPort ? 38 : 32;
  const rowDescSz = isPort ? 18 : 16;
  const qrSize = isPort ? 130 : 110;
  const bandPadV = isPort ? 22 : 18;
  const bandPadH = isPort ? 26 : 22;
  const bandLabelSz = isPort ? 14 : 12;
  const bandLinkSz = isPort ? 26 : 22;
  const bandDatesSz = isPort ? 19 : 17;
  const hostsFs = 20;

  const hostsLogos = await getHostsLogosHD(hostsFs, { aiscBlack: true });
  const qrUrl = await qrPngDataUrl('https://aisafetycolombia.org/hackathon/', Math.round(qrSize * 2.2));
  const FOREST = BRAND.forest;
  const CORAL = BRAND.coral;
  const YELLOW = BRAND.yellow;

  const row = (num: string, title: string, desc: string, accent: string, bg: string, textColor: string, descColor: string) => `
    <div style="display:flex;align-items:center;gap:24px;padding:${rowPadV}px ${rowPadH}px;background:${bg}">
      <div style="display:flex;font-family:Bricolage Grotesque;font-weight:800;font-size:${rowNumSz}px;line-height:1;letter-spacing:-0.04em;color:${accent};min-width:80px">${num}</div>
      <div style="display:flex;flex-direction:column;flex:1;gap:4px">
        <div style="display:flex;font-family:Bricolage Grotesque;font-weight:800;font-size:${rowTitleSz}px;line-height:1.05;letter-spacing:-0.02em;color:${textColor}">${title}</div>
        <div style="display:flex;font-family:Inter;font-weight:500;font-size:${rowDescSz}px;line-height:1.4;color:${descColor}">${desc}</div>
      </div>
    </div>`;

  const source = `
    <div style="display:flex;width:${W}px;height:${H}px;background:${BRAND.cream};font-family:Inter;position:relative;overflow:hidden">
      <div style="display:flex;flex-direction:column;width:${W}px;height:${H}px;padding:${padT}px ${padX}px ${padB}px ${padX}px;justify-content:space-between">

        <div style="display:flex;flex-direction:column;gap:14px">
          <div style="display:flex;font-family:JetBrains Mono;font-weight:500;font-size:${eyebrowSz}px;letter-spacing:0.2em;color:${CORAL};text-transform:uppercase">Lo que ganas</div>
          <div style="display:flex;font-family:Bricolage Grotesque;font-weight:800;font-size:${headSz}px;line-height:0.95;letter-spacing:-0.03em;color:${FOREST};max-width:920px">Tres recompensas, no solo el premio.</div>
        </div>

        <div style="display:flex;flex-direction:column;gap:${rowGap}px">
          ${row('01', 'USD 3.000', 'Entre 3 equipos ganadores en América Latina.', CORAL, BRAND.cream, FOREST, BRAND.ink)}
          ${row('02', 'Apart Lab Fellowship', 'Invitación a los equipos ganadores; algunos fellows han publicado en ICLR, NeurIPS, ACL.', YELLOW, FOREST, BRAND.cream, BRAND.cream)}
          ${row('03', 'Vinculación al campo', 'Publicación en conferencias y roles en organizaciones de seguridad de IA.', CORAL, BRAND.cream, FOREST, BRAND.ink)}
        </div>

        <div style="display:flex;flex-direction:column;gap:16px">
          <div style="display:flex;background:${FOREST};padding:${bandPadV}px ${bandPadH}px;align-items:center;justify-content:space-between;gap:20px">
            <div style="display:flex;flex-direction:column;gap:4px;flex:1">
              <div style="display:flex;font-family:JetBrains Mono;font-weight:500;font-size:${bandLabelSz}px;letter-spacing:0.2em;color:${BRAND.cream};text-transform:uppercase">Postúlate antes</div>
              <div style="display:flex;font-family:Bricolage Grotesque;font-weight:800;font-size:${bandLinkSz}px;letter-spacing:-0.015em;color:${BRAND.cream}">12 jun 2026</div>
              <div style="display:flex;font-family:Bricolage Grotesque;font-weight:700;font-size:${bandDatesSz}px;line-height:1.2;letter-spacing:-0.01em;color:${YELLOW};margin-top:4px">Hackathon 19–21 jun · hub Bogotá presencial u online</div>
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
  return { filename: `_v6m-c-apilada-${format}.png`, png };
}
