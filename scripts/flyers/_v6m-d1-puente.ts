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
  const heroSz = isPort ? 230 : 190;
  const heroSubSz = isPort ? 24 : 21;
  const bridgeSz = isPort ? 50 : 42;
  const bridgeSubSz = isPort ? 19 : 17;
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

  const source = `
    <div style="display:flex;width:${W}px;height:${H}px;background:${BRAND.cream};font-family:Inter;position:relative;overflow:hidden">
      <div style="display:flex;flex-direction:column;width:${W}px;height:${H}px;padding:${padT}px ${padX}px ${padB}px ${padX}px;justify-content:space-between">

        <div style="display:flex;flex-direction:column;gap:10px">
          <div style="display:flex;font-family:JetBrains Mono;font-weight:500;font-size:${labelSz}px;letter-spacing:0.2em;color:${CORAL};text-transform:uppercase">Premio</div>
          <div style="display:flex;font-family:Bricolage Grotesque;font-weight:800;font-size:${heroSz}px;line-height:0.88;letter-spacing:-0.045em;color:${FOREST}">USD 3.000</div>
          <div style="display:flex;font-family:Inter;font-weight:500;font-size:${heroSubSz}px;line-height:1.4;color:${BRAND.ink};max-width:720px;margin-top:8px">entre 3 equipos ganadores en América Latina</div>
        </div>

        <div style="display:flex;flex-direction:column;gap:18px;max-width:920px">
          <div style="display:flex;font-family:Bricolage Grotesque;font-weight:700;font-size:${bridgeSz}px;line-height:1.1;letter-spacing:-0.022em;color:${FOREST}">Pero el premio es solo la puerta a la siguiente etapa.</div>
          <div style="display:flex;font-family:Inter;font-weight:500;font-size:${bridgeSubSz}px;line-height:1.5;color:${BRAND.ink};max-width:780px">Los equipos ganadores reciben invitación a Apart Lab Fellowship. Algunos fellows han publicado en ICLR, NeurIPS y ACL, y se han vinculado a organizaciones de seguridad de IA.</div>
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
  return { filename: `_v6m-d1-puente-${format}.png`, png };
}
