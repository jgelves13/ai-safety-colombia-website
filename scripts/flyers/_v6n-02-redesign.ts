import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { render, html, BRAND, getHostsLogosHD, hostsRow } from './lib';
import type { FlyerFormat } from './_v3-apart';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export type MotifVariant = 'lines' | 'clean' | 'globe' | 'motif';

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

function motifLines(opts: { width: number; height: number; forest: string; coral: string }): string {
  const { width: w, height: h, forest, coral } = opts;
  const tropics = [
    `<line x1="0" y1="160" x2="600" y2="160" stroke="${forest}" stroke-width="2.4" stroke-dasharray="6 10" opacity="0.85"/>`,
    `<line x1="0" y1="335" x2="600" y2="335" stroke="${coral}" stroke-width="2.8" stroke-dasharray="8 8" opacity="0.95"/>`,
    `<line x1="0" y1="580" x2="600" y2="580" stroke="${forest}" stroke-width="2.4" stroke-dasharray="6 10" opacity="0.85"/>`,
  ].join('');
  const meridian = `<line x1="326" y1="0" x2="326" y2="1000" stroke="${forest}" stroke-width="2" stroke-dasharray="4 12" opacity="0.80"/>`;
  return `<svg width="${w}" height="${h}" viewBox="0 0 600 1000" xmlns="http://www.w3.org/2000/svg" style="display:flex">${tropics}${meridian}</svg>`;
}

function motifSilhouette(opts: { width: number; height: number; forest: string; coral: string; ink: string }): string {
  const { width: w, height: h, forest, coral, ink } = opts;
  const land = `<path d="${LATAM_PATH}" fill="none" stroke="${coral}" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round" opacity="0.55"/>`;
  const tropics = [
    `<line x1="0" y1="160" x2="600" y2="160" stroke="${forest}" stroke-width="1.2" stroke-dasharray="4 8" opacity="0.30"/>`,
    `<line x1="0" y1="335" x2="600" y2="335" stroke="${coral}" stroke-width="1.4" stroke-dasharray="6 6" opacity="0.30"/>`,
  ].join('');
  return `<svg width="${w}" height="${h}" viewBox="0 0 600 1000" xmlns="http://www.w3.org/2000/svg" style="display:flex">${tropics}${land}</svg>`;
}

export default async function (format: FlyerFormat = 'portrait', variant: MotifVariant = 'lines') {
  const isPort = format === 'portrait';
  const W = 1080;
  const H = isPort ? 1350 : 1080;

  const padT = isPort ? 104 : 88;
  const padB = isPort ? 96 : 78;
  const padX = isPort ? 92 : 80;
  const leadSz = isPort ? 32 : 27;
  const headlineSz = isPort ? 84 : 70;
  const bodySz = isPort ? 27 : 24;
  const midSz = isPort ? 48 : 40;
  const urlSz = 18;
  const hostsFs = 22;

  const FOREST = BRAND.forest;
  const CORAL = BRAND.coral;

  const hostsLogos = await getHostsLogosHD(hostsFs, { aiscBlack: true });

  let motifBlock = '';
  if (variant === 'lines') {
    const motif = motifLines({ width: 380, height: 633, forest: FOREST, coral: CORAL });
    motifBlock = `<div style="display:flex;position:absolute;top:200px;right:-40px">${motif}</div>`;
  } else if (variant === 'motif') {
    const motif = motifSilhouette({ width: 360, height: 600, forest: FOREST, coral: CORAL, ink: BRAND.ink });
    motifBlock = `<div style="display:flex;position:absolute;top:230px;right:-60px">${motif}</div>`;
  } else if (variant === 'globe') {
    const globeBytes = await readFile(path.join(__dirname, '_v6n-globe-crop.png'));
    const globeDataUrl = `data:image/png;base64,${globeBytes.toString('base64')}`;
    const globeW = 260;
    const globeH = 249;
    motifBlock = `<div style="display:flex;position:absolute;top:80px;right:0px;width:${globeW}px;height:${globeH}px"><img src="${globeDataUrl}" style="display:flex;width:${globeW}px;height:${globeH}px;opacity:0.85"/></div>`;
  }

  const source = `
    <div style="display:flex;width:${W}px;height:${H}px;background:${BRAND.cream};font-family:Inter;position:relative;overflow:hidden">

      ${motifBlock}

      <div style="display:flex;flex-direction:column;width:${W}px;height:${H}px;padding:${padT}px ${padX}px ${padB}px ${padX}px;justify-content:space-between;position:relative">

        <div style="display:flex;flex-direction:column;gap:30px;max-width:880px">

          <div style="display:flex;font-family:Inter;font-weight:500;font-size:${leadSz}px;line-height:1.4;color:${BRAND.ink};max-width:880px">Hoy, la investigación en seguridad de IA se concentra en un número reducido de países.</div>

          <div style="display:flex;font-family:Bricolage Grotesque;font-weight:700;font-size:${headlineSz}px;line-height:0.98;letter-spacing:-0.03em;color:${FOREST};max-width:880px">Pero estos sistemas ya están desplegados en nuestra región.</div>

          <div style="display:flex;font-family:Inter;font-weight:500;font-size:${bodySz}px;line-height:1.5;color:${BRAND.ink};max-width:880px">Sesgos no auditados, vulnerabilidades sin documentar y decisiones automatizadas sin mecanismos claros de rendición de cuentas.</div>

        </div>

        <div style="display:flex;flex-direction:column;gap:24px;max-width:860px;position:relative">
          <div style="display:flex;width:80px;height:4px;background:${CORAL}"></div>
          <div style="display:flex;font-family:Bricolage Grotesque;font-weight:700;font-size:${midSz}px;line-height:1.08;letter-spacing:-0.022em;color:${CORAL};max-width:860px">Un fin de semana para construir herramientas, evaluaciones e investigación de política sobre los riesgos que más importan acá.</div>
          <div style="display:flex;font-family:Inter;font-weight:500;font-size:${bodySz}px;line-height:1.5;color:${BRAND.ink};max-width:860px">Equipos pequeños, retos definidos por expertos en seguridad y gobernanza de IA, mentoría en vivo.</div>
        </div>

        <div style="display:flex;align-items:center;justify-content:space-between">
          <div style="display:flex;font-family:JetBrains Mono;font-weight:500;font-size:${urlSz}px;letter-spacing:0.04em;color:${BRAND.ink2}">aisafetycolombia.org/hackathon</div>
          ${hostsRow({ color: BRAND.ink2, fontSize: hostsFs, ...hostsLogos })}
        </div>

      </div>

    </div>
  `;

  const png = await render(html(source), W, H);
  return { filename: `_v6n-02-redesign-${variant}-${format}.png`, png };
}
