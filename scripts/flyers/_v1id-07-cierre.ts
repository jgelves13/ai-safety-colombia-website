import { render, html, BRAND, hostsRow, getLogos, qrPngDataUrl } from './lib';
import type { FlyerFormat } from './_v3-apart';

export default async function (format: FlyerFormat = 'portrait') {
  const isPort = format === 'portrait';
  const W = 1080;
  const H = isPort ? 1350 : 1080;

  const FOREST = BRAND.forest;
  const CORAL = '#E5604D';
  const SAGE = '#4A8466';
  const CARD = '#FFFAEF';
  const HAIR = '#E6DCC8';
  const MINT = '#5BFFA8';
  const INK = '#0C0C0C';

  const padX = 80;
  const padT = isPort ? 110 : 88;
  const padB = isPort ? 60 : 42;
  const kickerSz = isPort ? 17 : 15;
  const h1Sz = isPort ? 124 : 100;
  const ribbonLabelSz = isPort ? 14 : 12;
  const ribbonDateSz = isPort ? 44 : 38;
  const checkSz = isPort ? 17 : 15;
  const qrSrc = isPort ? 380 : 320;
  const qrDisp = isPort ? 280 : 240;
  const qrLabelSz = isPort ? 14 : 12;
  const bandPadV = isPort ? 28 : 22;
  const bandLabelSz = isPort ? 14 : 12;
  const bandLinkSz = isPort ? 32 : 28;
  const bandDatesSz = isPort ? 22 : 18;

  const logos = await getLogos();
  const qr = await qrPngDataUrl('https://aisafetycolombia.org/hackathon/', qrSrc);

  const check = (label: string, body: string) => `
    <div style="display:flex;align-items:flex-start;gap:14px">
      <div style="display:flex;width:8px;height:8px;border-radius:50%;background:${CORAL};flex-shrink:0;margin-top:9px"></div>
      <div style="display:flex;flex-direction:column;gap:2px">
        <div style="display:flex;font-family:JetBrains Mono;font-size:${ribbonLabelSz - 1}px;letter-spacing:0.18em;color:${FOREST};text-transform:uppercase">${label}</div>
        <div style="display:flex;font-family:Inter;font-weight:500;font-size:${checkSz}px;line-height:1.4;color:${INK}">${body}</div>
      </div>
    </div>`;

  const source = `
    <div style="display:flex;width:${W}px;height:${H}px;background:${BRAND.cream};font-family:Inter;position:relative;overflow:hidden">

      <div style="display:flex;flex-direction:column;width:${W}px;height:${H}px;padding:${padT}px ${padX}px ${padB}px ${padX}px;justify-content:space-between">

        <div style="display:flex;flex-direction:column;gap:24px;max-width:940px">
          <div style="display:flex;font-family:JetBrains Mono;font-size:${kickerSz}px;letter-spacing:0.22em;color:${CORAL};text-transform:uppercase">Hub Bogotá · postulaciones abiertas</div>
          <div style="display:flex;font-family:Bricolage Grotesque;font-weight:700;font-size:${h1Sz}px;line-height:0.93;letter-spacing:-0.04em;color:${FOREST}">Postúlate <span style="color:${CORAL};margin-left:18px">ya</span></div>

          <div style="display:flex;background:${CARD};border:1px solid ${HAIR};border-left:3px solid ${CORAL};border-radius:0 14px 14px 0;padding:18px 26px;align-items:center;gap:30px;align-self:flex-start;max-width:760px">
            <div style="display:flex;flex-direction:column;gap:3px">
              <div style="display:flex;font-family:JetBrains Mono;font-size:${ribbonLabelSz}px;letter-spacing:0.2em;color:${CORAL};text-transform:uppercase">Cierre del formulario</div>
              <div style="display:flex;font-family:Inter;font-weight:500;font-size:15px;color:${BRAND.ink2}">23:59 hora Colombia</div>
            </div>
            <div style="display:flex;font-family:Bricolage Grotesque;font-weight:700;font-size:${ribbonDateSz}px;line-height:1;letter-spacing:-0.02em;color:${FOREST}">12 jun 2026</div>
          </div>
        </div>

        <div style="display:flex;gap:36px;align-items:flex-start">
          <div style="display:flex;flex-direction:column;flex:1;gap:14px">
            ${check('Sede', 'Workspace abierto 24h en Bogotá durante los tres días del evento.')}
            ${check('Alimentación', 'Comidas veganas incluidas durante todo el fin de semana.')}
            ${check('Mentoría', 'Charlas y Q&A en vivo con investigadores, jueces y expertos.')}
            ${check('Apoyo', 'Apoyo limitado de viaje y alojamiento para participantes de otras ciudades de Colombia.')}
          </div>
          <div style="display:flex;flex-direction:column;align-items:center;gap:10px">
            <div style="display:flex;padding:8px;border:6px solid ${CORAL};border-radius:18px;background:${CARD}">
              <img src="${qr}" style="display:flex;width:${qrDisp}px;height:${qrDisp}px"/>
            </div>
            <div style="display:flex;font-family:JetBrains Mono;font-size:${qrLabelSz}px;letter-spacing:0.22em;color:${FOREST};text-transform:uppercase">Escanea e inscríbete</div>
          </div>
        </div>

        <div style="display:flex;flex-direction:column;gap:18px">
          <div style="display:flex;background:${FOREST};border-radius:18px;padding:${bandPadV}px 32px;align-items:center;justify-content:space-between">
            <div style="display:flex;flex-direction:column;gap:4px">
              <div style="display:flex;font-family:JetBrains Mono;font-size:${bandLabelSz}px;letter-spacing:0.22em;color:${MINT};text-transform:uppercase">Postúlate</div>
              <div style="display:flex;font-family:Bricolage Grotesque;font-weight:700;font-size:${bandLinkSz}px;letter-spacing:-0.01em;color:${BRAND.cream}">aisafetycolombia.org/hackathon</div>
            </div>
            <div style="display:flex;font-family:Bricolage Grotesque;font-weight:800;font-size:${bandDatesSz}px;line-height:1;letter-spacing:-0.01em;color:${MINT}">19–21 jun 2026</div>
          </div>
          <div style="display:flex;align-items:flex-end;justify-content:flex-end">
            ${hostsRow({ color: BRAND.ink2, fontSize: 16, ...logos })}
          </div>
        </div>

      </div>

    </div>
  `;

  const png = await render(html(source), W, H);
  return { filename: `_v1id-07-cierre-${format}.png`, png };
}
