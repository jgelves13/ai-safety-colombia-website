import { render, html, BRAND, qrPngDataUrl, getHostsLogosHD, globeGlobalSouth } from './lib';

export type FlyerFormat = 'portrait' | 'square';

export default async function (format: FlyerFormat = 'portrait') {
  const isPort = format === 'portrait';
  const W = 1080;
  const H = isPort ? 1350 : 1080;

  const padT = isPort ? 104 : 84;
  const padX = isPort ? 92 : 80;
  const padB = isPort ? 96 : 78;

  const kickerSz = 22;
  const titleSz = isPort ? 88 : 74;
  const subSz = 26;
  const bodySz = 26;
  const labelSz = 19;
  const labelMin = 160;
  const itemBodySz = 25;
  const pillFs = 26;
  const pillH = 64;
  const pillPad = 30;
  const qrDisp = isPort ? 228 : 196;
  const qrSrc = 360;
  const scanSz = 16;
  const hostsFs = 22;

  const globeSize = 200;
  const globeTop = 200;
  const globeRight = 129;

  const qr = await qrPngDataUrl('https://aisafetycolombia.org/hackathon/', qrSrc);
  const hostsLogos = await getHostsLogosHD(hostsFs, { aiscBlack: true });
  const hostsMarkH = Math.round(hostsFs * 2.4);
  const hostsDividerH = Math.round(hostsFs * 1.6);
  const hostsGap = Math.round(hostsFs * 1.6);
  const hosts = `<div style="display:flex;align-items:center;gap:${hostsGap}px"><img src="${hostsLogos.apartLogo}" style="display:flex;height:${hostsMarkH}px;width:${Math.round(hostsMarkH * hostsLogos.apartRatio)}px"/><div style="display:flex;width:3px;height:${hostsDividerH}px;background:${BRAND.ink2}"></div><img src="${hostsLogos.aiscLogo}" style="display:flex;height:${hostsMarkH}px;width:${Math.round(hostsMarkH * hostsLogos.aiscRatio)}px"/></div>`;

  const globe = globeGlobalSouth({ size: globeSize, landFill: BRAND.forest });

  const item = (label: string, color: string, body: string) => `<div style="display:flex;align-items:flex-start;gap:18px;font-family:Inter;font-size:${itemBodySz}px;line-height:1.35"><div style="display:flex;font-family:JetBrains Mono;font-weight:500;font-size:${labelSz}px;letter-spacing:0.16em;color:${color};text-transform:uppercase;min-width:${labelMin}px;margin-top:6px">${label}</div><div style="display:flex;font-weight:500;color:${BRAND.ink}">${body}</div></div>`;

  const source = `
    <div style="display:flex;width:${W}px;height:${H}px;background:${BRAND.cream};font-family:Inter;position:relative;overflow:hidden">

      <div style="display:flex;position:absolute;top:${globeTop}px;right:${globeRight}px;width:${globeSize}px;height:${globeSize}px">${globe}</div>

      <div style="display:flex;flex-direction:column;width:${W}px;height:${H}px;padding:${padT}px ${padX}px ${padB}px ${padX}px;justify-content:space-between">

        <div style="display:flex;flex-direction:column">
          <div style="display:flex;font-family:JetBrains Mono;font-weight:500;font-size:${kickerSz}px;letter-spacing:0.2em;color:${BRAND.forest};text-transform:uppercase;margin-bottom:26px">Postulaciones hub Bogotá cierran 12 junio 2026</div>

          <div style="display:flex;flex-direction:column;font-family:Bricolage Grotesque;font-weight:700;font-size:${titleSz}px;line-height:0.95;letter-spacing:-0.02em;max-width:820px">
            <div style="display:flex;color:${BRAND.coral}">Global South</div>
            <div style="display:flex;color:${BRAND.ink}">AI Safety Hackathon</div>
          </div>

          <div style="display:flex;font-family:Inter;font-weight:700;font-size:${subSz}px;color:${BRAND.ink};margin-top:34px">19–21 junio 2026 · Hub Bogotá presencial u online</div>

          <div style="display:flex;font-family:Inter;font-weight:500;font-size:${bodySz}px;line-height:1.42;color:${BRAND.ink};margin-top:16px;max-width:820px">Un fin de semana para construir proyectos técnicos de seguridad y gobernanza de IA con relevancia para América Latina.</div>

          <div style="display:flex;flex-direction:column;gap:14px;margin-top:52px;max-width:840px">
            ${item('Inaugurales', BRAND.forest, 'Juan Felipe Cerón (OpenAI) y Alejandro Toro (Congreso de Colombia)')}
            ${item('Jurado', BRAND.coral, 'Expertos de OpenAI, UC Berkeley, BID Lab, Campaign to Stop Killer Robots, entre otros')}
            ${item('Fellowship', BRAND.yellow, 'Apart Lab Fellowship para ganadores; algunos fellows han publicado en ICLR, NeurIPS, ACL')}
          </div>
        </div>

        <div style="display:flex;flex-direction:column;gap:28px">
          <div style="display:flex;align-items:center;height:${pillH}px;padding:0 ${pillPad}px;background:${BRAND.forest};border-radius:9999px;font-family:Bricolage Grotesque;font-weight:700;font-size:${pillFs}px;color:${BRAND.cream};align-self:flex-start">USD 1.000 por equipo · 3 ganadores LATAM</div>

          <div style="display:flex;align-items:flex-end;justify-content:space-between">
            <div style="display:flex;flex-direction:column;gap:12px">
              <img src="${qr}" style="display:flex;width:${qrDisp}px;height:${qrDisp}px"/>
              <div style="display:flex;font-family:JetBrains Mono;font-weight:500;font-size:${scanSz}px;letter-spacing:0.2em;color:${BRAND.forest};text-transform:uppercase">Escanea e inscríbete</div>
            </div>
            <div style="display:flex;align-items:flex-end">${hosts}</div>
          </div>
        </div>

      </div>

    </div>
  `;

  const png = await render(html(source), W, H);
  return { filename: `_v5a-01-latam-pin-${format}.png`, png };
}
