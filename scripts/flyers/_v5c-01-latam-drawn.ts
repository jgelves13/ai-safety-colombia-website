import { render, html, BRAND, qrPngDataUrl, getHostsLogosHD } from './lib';
import type { FlyerFormat } from './_v3-apart';

const LATAM_PATH = [
  'M 7 0',
  'L 121 23',
  'C 130 40, 140 70, 143 100',
  'L 143 114',
  'C 162 118, 180 122, 200 125',
  'L 221 119',
  'C 220 135, 217 150, 214 159',
  'C 209 170, 207 178, 207 182',
  'C 213 195, 218 210, 221 216',
  'L 250 216',
  'C 270 225, 280 245, 293 261',
  'C 305 255, 318 245, 321 239',
  'L 336 227',
  'C 360 233, 385 247, 400 250',
  'C 415 260, 430 275, 436 284',
  'C 455 295, 468 304, 471 307',
  'C 478 325, 484 345, 486 364',
  'C 520 380, 560 400, 593 420',
  'L 593 455',
  'C 585 480, 575 500, 571 511',
  'C 565 545, 555 590, 543 625',
  'L 536 625',
  'L 514 636',
  'C 500 665, 490 695, 486 705',
  'C 470 730, 450 750, 436 761',
  'C 420 780, 405 800, 400 807',
  'C 385 830, 375 860, 364 886',
  'L 364 988',
  'C 352 980, 340 974, 336 966',
  'C 325 940, 322 900, 321 830',
  'C 322 800, 325 770, 329 739',
  'C 333 700, 340 660, 343 625',
  'L 343 568',
  'C 320 540, 305 520, 293 500',
  'C 285 475, 281 460, 279 455',
  'L 271 420',
  'L 271 386',
  'C 274 370, 277 360, 279 352',
  'L 286 343',
  'L 293 318',
  'L 293 295',
  'L 293 273',
  'L 279 261',
  'C 260 256, 245 252, 236 250',
  'L 221 227',
  'L 207 216',
  'L 193 205',
  'L 164 182',
  'L 129 170',
  'L 100 148',
  'L 86 102',
  'L 50 45',
  'L 43 57',
  'L 57 91',
  'L 57 103',
  'C 50 95, 45 80, 40 60',
  'L 35 35',
  'L 7 0',
  'Z',
].join(' ');
const BOGOTA = { cx: 326, cy: 284 };

function latamIllustrated(opts: { width: number; height: number; coral: string; forest: string; sand: string; ink: string }): string {
  const { width: w, height: h, coral, forest, sand, ink } = opts;
  const tropics = [
    `<line x1="0" y1="160" x2="600" y2="160" stroke="${forest}" stroke-width="1.5" stroke-dasharray="4 8" opacity="0.35"/>`,
    `<line x1="0" y1="335" x2="600" y2="335" stroke="${coral}" stroke-width="1.8" stroke-dasharray="6 6" opacity="0.45"/>`,
    `<line x1="0" y1="580" x2="600" y2="580" stroke="${forest}" stroke-width="1.5" stroke-dasharray="4 8" opacity="0.35"/>`,
  ].join('');
  const meridian = `<line x1="${BOGOTA.cx}" y1="0" x2="${BOGOTA.cx}" y2="1000" stroke="${forest}" stroke-width="1.2" stroke-dasharray="3 9" opacity="0.28"/>`;
  const land = `<path d="${LATAM_PATH}" fill="${sand}" stroke="${coral}" stroke-width="5" stroke-linejoin="round" stroke-linecap="round"/>`;
  const shadow = `<path d="${LATAM_PATH}" fill="${ink}" fill-opacity="0.08" transform="translate(6 8)"/>`;
  const bogota = [
    `<circle cx="${BOGOTA.cx}" cy="${BOGOTA.cy}" r="32" fill="${coral}" fill-opacity="0.18"/>`,
    `<circle cx="${BOGOTA.cx}" cy="${BOGOTA.cy}" r="18" fill="${coral}" fill-opacity="0.32"/>`,
    `<circle cx="${BOGOTA.cx}" cy="${BOGOTA.cy}" r="10" fill="${forest}"/>`,
    `<circle cx="${BOGOTA.cx}" cy="${BOGOTA.cy}" r="4" fill="${sand}"/>`,
  ].join('');
  return `<svg width="${w}" height="${h}" viewBox="0 0 600 1000" xmlns="http://www.w3.org/2000/svg" style="display:flex">${tropics}${meridian}${shadow}${land}${bogota}</svg>`;
}

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

  const motifW = isPort ? 420 : 340;
  const motifH = Math.round(motifW * 1000 / 600);
  const motifTop = isPort ? 80 : 70;
  const motifRight = isPort ? -60 : -50;

  const qr = await qrPngDataUrl('https://aisafetycolombia.org/hackathon/', qrSrc);
  const hostsLogos = await getHostsLogosHD(hostsFs, { aiscBlack: true });
  const hostsMarkH = Math.round(hostsFs * 2.4);
  const hostsDividerH = Math.round(hostsFs * 1.6);
  const hostsGap = Math.round(hostsFs * 1.6);
  const hosts = `<div style="display:flex;align-items:center;gap:${hostsGap}px"><img src="${hostsLogos.apartLogo}" style="display:flex;height:${hostsMarkH}px;width:${Math.round(hostsMarkH * hostsLogos.apartRatio)}px"/><div style="display:flex;width:3px;height:${hostsDividerH}px;background:${BRAND.ink2}"></div><img src="${hostsLogos.aiscLogo}" style="display:flex;height:${hostsMarkH}px;width:${Math.round(hostsMarkH * hostsLogos.aiscRatio)}px"/></div>`;

  const motif = latamIllustrated({
    width: motifW,
    height: motifH,
    coral: BRAND.coral,
    forest: BRAND.forest,
    sand: '#F3E8D0',
    ink: BRAND.ink,
  });

  const item = (label: string, color: string, body: string) => `<div style="display:flex;align-items:flex-start;gap:18px;font-family:Inter;font-size:${itemBodySz}px;line-height:1.35"><div style="display:flex;font-family:JetBrains Mono;font-weight:500;font-size:${labelSz}px;letter-spacing:0.16em;color:${color};text-transform:uppercase;min-width:${labelMin}px;margin-top:6px">${label}</div><div style="display:flex;font-weight:500;color:${BRAND.ink}">${body}</div></div>`;

  const source = `
    <div style="display:flex;width:${W}px;height:${H}px;background:${BRAND.cream};font-family:Inter;position:relative;overflow:hidden">

      <div style="display:flex;position:absolute;top:${motifTop}px;right:${motifRight}px;width:${motifW}px;height:${motifH}px">${motif}</div>

      <div style="display:flex;flex-direction:column;width:${W}px;height:${H}px;padding:${padT}px ${padX}px ${padB}px ${padX}px;justify-content:space-between;position:relative">

        <div style="display:flex;flex-direction:column">
          <div style="display:flex;font-family:JetBrains Mono;font-weight:500;font-size:${kickerSz}px;letter-spacing:0.2em;color:${BRAND.forest};text-transform:uppercase;margin-bottom:26px">Postulaciones hub Bogotá cierran 12 junio 2026</div>

          <div style="display:flex;flex-direction:column;font-family:Bricolage Grotesque;font-weight:700;font-size:${titleSz}px;line-height:0.95;letter-spacing:-0.02em;max-width:700px">
            <div style="display:flex;color:${BRAND.coral}">Global South</div>
            <div style="display:flex;color:${BRAND.ink}">AI Safety Hackathon</div>
          </div>

          <div style="display:flex;font-family:Inter;font-weight:700;font-size:${subSz}px;color:${BRAND.ink};margin-top:34px">19–21 junio 2026 · Hub Bogotá presencial u online</div>

          <div style="display:flex;font-family:Inter;font-weight:500;font-size:${bodySz}px;line-height:1.42;color:${BRAND.ink};margin-top:16px;max-width:680px">Un fin de semana para construir proyectos técnicos de seguridad y gobernanza de IA con relevancia para América Latina.</div>

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
  return { filename: `_v5c-01-latam-drawn-${format}.png`, png };
}
