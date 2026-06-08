import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import satori from 'satori';
import { html } from 'satori-html';
import { Resvg } from '@resvg/resvg-js';
import QRCode from 'qrcode';
import sharp from 'sharp';

const moduleDir = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(moduleDir, '..', '..');

async function loadFont(rel: string): Promise<ArrayBuffer> {
  const buf = await readFile(path.join(projectRoot, 'node_modules', '@fontsource', rel));
  return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength) as ArrayBuffer;
}

let cachedFonts: Awaited<ReturnType<typeof loadAllFonts>> | null = null;

async function loadAllFonts() {
  const [bricolage700, bricolage800, inter500, inter700, mono500] = await Promise.all([
    loadFont('bricolage-grotesque/files/bricolage-grotesque-latin-700-normal.woff'),
    loadFont('bricolage-grotesque/files/bricolage-grotesque-latin-800-normal.woff'),
    loadFont('inter/files/inter-latin-500-normal.woff'),
    loadFont('inter/files/inter-latin-700-normal.woff'),
    loadFont('jetbrains-mono/files/jetbrains-mono-latin-500-normal.woff'),
  ]);
  return [
    { name: 'Bricolage Grotesque', data: bricolage700, weight: 700 as const, style: 'normal' as const },
    { name: 'Bricolage Grotesque', data: bricolage800, weight: 800 as const, style: 'normal' as const },
    { name: 'Inter', data: inter500, weight: 500 as const, style: 'normal' as const },
    { name: 'Inter', data: inter700, weight: 700 as const, style: 'normal' as const },
    { name: 'JetBrains Mono', data: mono500, weight: 500 as const, style: 'normal' as const },
  ];
}

async function getFonts() {
  if (!cachedFonts) cachedFonts = await loadAllFonts();
  return cachedFonts;
}

export const BRAND = {
  cream: '#FBF6EC',
  forest: '#1F4D32',
  coral: '#E5604D',
  sage: '#4A8466',
  yellow: '#F2B705',
  ink: '#211A12',
  ink2: '#4A4030',
  hairline: '#E6DCC8',
  dark: '#0F1A14',
};

export const ACCENT: Record<string, string> = {
  'is-green': BRAND.forest,
  'is-coral': BRAND.coral,
  'is-blue': BRAND.sage,
  'is-yellow': BRAND.yellow,
};

export async function render(
  markup: ReturnType<typeof html>,
  width: number,
  height: number,
): Promise<Buffer> {
  const fonts = await getFonts();
  const svg = await satori(markup as any, { width, height, fonts });
  const png = new Resvg(svg, { fitTo: { mode: 'width', value: width } }).render().asPng();
  return png;
}

export async function loadHackathon(): Promise<any> {
  const buf = await readFile(path.join(projectRoot, 'src', 'data', 'hackathon.json'), 'utf-8');
  return JSON.parse(buf);
}

export async function qrPngDataUrl(url: string, size: number): Promise<string> {
  return QRCode.toDataURL(url, {
    type: 'image/png',
    width: size,
    margin: 1,
    color: { dark: BRAND.forest, light: BRAND.cream },
    errorCorrectionLevel: 'M',
  });
}

export async function squarePhotoDataUrl(relPath: string, size = 400): Promise<string> {
  const { default: sharp } = await import('sharp');
  const abs = path.join(projectRoot, relPath);
  const buf = await sharp(abs)
    .resize(size, size, { fit: 'cover', position: 'centre', kernel: 'lanczos3' })
    .jpeg({ quality: 92, mozjpeg: true })
    .toBuffer();
  return `data:image/jpeg;base64,${buf.toString('base64')}`;
}

let cachedLogosHD: { apartLogo: string; apartRatio: number; aiscLogo: string; aiscRatio: number } | null = null;

export async function getHostsLogosHD(fontSize?: number, _opts?: { aiscBlack?: boolean }) {
  if (cachedLogosHD) return cachedLogosHD;
  const targetHeight = Math.max(160, Math.round((fontSize ?? 22) * 2.4 * 3));
  const apartRatio = 1004 / 427;
  const aiscRatio = 1400 / 420;
  const [apartBuf, aiscBuf] = await Promise.all([
    readFile(path.join(projectRoot, 'public', 'images', 'apart-logo.png')),
    readFile(path.join(projectRoot, 'public', 'images', 'aisc-lockup-black.png')),
  ]);
  const [apartOut, aiscOut] = await Promise.all([
    sharp(apartBuf).resize({ height: targetHeight, kernel: 'lanczos3' }).png({ compressionLevel: 9 }).toBuffer(),
    sharp(aiscBuf).resize({ height: targetHeight, kernel: 'lanczos3' }).png({ compressionLevel: 9 }).toBuffer(),
  ]);
  cachedLogosHD = {
    apartLogo: `data:image/png;base64,${apartOut.toString('base64')}`,
    apartRatio,
    aiscLogo: `data:image/png;base64,${aiscOut.toString('base64')}`,
    aiscRatio,
  };
  return cachedLogosHD;
}

export function globeGlobalSouth(opts: { size: number; landFill: string; oceanFill?: string }): string {
  const s = opts.size;
  const ocean = opts.oceanFill ?? 'transparent';
  const land = opts.landFill;
  return `<svg width="${s}" height="${s}" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" style="display:flex">
    <circle cx="100" cy="100" r="98" fill="${ocean}" stroke="${land}" stroke-width="2"/>
    <g clip-path="inset(0 round 100px)">
      <g transform="translate(48, 70) scale(0.10)">
        <path d="${LATAM_PATH}" fill="${land}"/>
      </g>
    </g>
    <circle cx="100" cy="100" r="98" fill="none" stroke="${land}" stroke-width="2"/>
    <line x1="2" y1="100" x2="198" y2="100" stroke="${land}" stroke-width="1" stroke-opacity="0.25"/>
    <ellipse cx="100" cy="100" rx="98" ry="36" fill="none" stroke="${land}" stroke-width="1" stroke-opacity="0.25"/>
    <ellipse cx="100" cy="100" rx="36" ry="98" fill="none" stroke="${land}" stroke-width="1" stroke-opacity="0.25"/>
  </svg>`;
}

let cachedLogos: { apartLogo: string; apartRatio: number; aiscLogo: string; aiscRatio: number } | null = null;

export async function getLogos() {
  if (cachedLogos) return cachedLogos;
  const [apartBuf, aiscBuf] = await Promise.all([
    readFile(path.join(projectRoot, 'public', 'images', 'apart-logo.png')),
    readFile(path.join(projectRoot, 'public', 'images', 'aisc-lockup-black.png')),
  ]);
  cachedLogos = {
    apartLogo: `data:image/png;base64,${apartBuf.toString('base64')}`,
    apartRatio: 1004 / 427,
    aiscLogo: `data:image/png;base64,${aiscBuf.toString('base64')}`,
    aiscRatio: 1400 / 420,
  };
  return cachedLogos;
}

const recolorCache = new Map<string, string>();

async function recolorBlackPixels(absPath: string, hex: string, targetHeight?: number): Promise<string> {
  const key = absPath + '|' + hex + '|' + (targetHeight ?? 'src');
  const cached = recolorCache.get(key);
  if (cached) return cached;
  const { default: sharp } = await import('sharp');
  const { data, info } = await sharp(absPath).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const out = Buffer.from(data);
  for (let i = 0; i < out.length; i += 4) {
    const R = out[i], G = out[i + 1], B = out[i + 2], A = out[i + 3];
    if (A === 0) continue;
    const maxC = Math.max(R, G, B);
    const minC = Math.min(R, G, B);
    if (maxC - minC < 24) {
      const darkness = 1 - maxC / 255;
      out[i] = r;
      out[i + 1] = g;
      out[i + 2] = b;
      out[i + 3] = Math.round(A * darkness);
    }
  }
  let pipeline = sharp(out, { raw: { width: info.width, height: info.height, channels: 4 } });
  if (targetHeight && targetHeight < info.height) {
    pipeline = pipeline.resize({ height: targetHeight, kernel: 'lanczos3', fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } });
  }
  const png = await pipeline.png({ compressionLevel: 9 }).toBuffer();
  const url = `data:image/png;base64,${png.toString('base64')}`;
  recolorCache.set(key, url);
  return url;
}

export async function getLogosRecolored(hex: string) {
  const [apartLogo, aiscLogo] = await Promise.all([
    recolorBlackPixels(path.join(projectRoot, 'public', 'images', 'apart-logo.png'), hex),
    recolorBlackPixels(path.join(projectRoot, 'public', 'images', 'aisc-lockup-black.png'), hex),
  ]);
  return { apartLogo, apartRatio: 1004 / 427, aiscLogo, aiscRatio: 1400 / 420 };
}

export const OPENAI_LOGO_RATIO = 1180 / 320;
let cachedOpenAILogo: string | null = null;
export async function getOpenAILogo(): Promise<string> {
  if (cachedOpenAILogo) return cachedOpenAILogo;
  const buf = await readFile(path.join(projectRoot, 'public', 'images', 'openai-logo.png'));
  cachedOpenAILogo = `data:image/png;base64,${buf.toString('base64')}`;
  return cachedOpenAILogo;
}

export async function getOpenAILogoRecolored(hex: string, targetHeight = 192): Promise<string> {
  return recolorBlackPixels(path.join(projectRoot, 'public', 'images', 'openai-logo.png'), hex, targetHeight);
}

export { html };
export const PROJECT_ROOT = projectRoot;

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
const BOGOTA_DOT = { cx: 314, cy: 311 };

export function latAmOutline(opts: { stroke: string; strokeWidth?: number; width?: number; height?: number; rotate?: number }): string {
  const w = opts.width ?? 280;
  const h = opts.height ?? 420;
  const sw = opts.strokeWidth ?? 3;
  const rot = opts.rotate ?? 0;
  return `<svg width="${w}" height="${h}" viewBox="0 0 600 1000" xmlns="http://www.w3.org/2000/svg" style="display:flex;transform:rotate(${rot}deg)"><path d="${LATAM_PATH}" fill="none" stroke="${opts.stroke}" stroke-width="${sw}" stroke-linejoin="round" stroke-linecap="round"/><circle cx="${BOGOTA_DOT.cx}" cy="${BOGOTA_DOT.cy}" r="${sw * 2.5}" fill="${opts.stroke}"/></svg>`;
}

const AFRICA_PATH = [
  'M 110 30',
  'L 220 28',
  'L 245 40',
  'L 250 65',
  'L 280 85',
  'L 308 110',
  'L 320 140',
  'L 290 158',
  'L 268 175',
  'L 252 198',
  'L 240 225',
  'L 230 260',
  'L 224 295',
  'L 220 330',
  'L 214 360',
  'L 200 385',
  'L 175 395',
  'L 145 388',
  'L 120 370',
  'L 105 345',
  'L 95 310',
  'L 92 275',
  'L 100 245',
  'L 110 218',
  'L 105 190',
  'L 90 165',
  'L 70 145',
  'L 55 120',
  'L 50 95',
  'L 60 70',
  'L 80 50',
  'L 110 30',
  'Z',
].join(' ');

const INDIA_PATH = [
  'M 30 10',
  'L 110 8',
  'L 145 28',
  'L 138 70',
  'L 120 115',
  'L 95 155',
  'L 70 185',
  'L 55 175',
  'L 50 145',
  'L 38 110',
  'L 25 75',
  'L 18 45',
  'L 30 10',
  'Z',
].join(' ');

const SEASIA_BORNEO = 'M 10 20 L 70 15 L 95 40 L 100 75 L 80 100 L 40 105 L 15 80 L 5 50 Z';
const SEASIA_SUMATRA = 'M 5 5 L 35 0 L 55 25 L 70 55 L 65 85 L 45 100 L 30 90 L 15 60 Z';
const SEASIA_JAVA = 'M 5 5 L 60 0 L 85 15 L 75 35 L 40 38 L 10 28 Z';
const SEASIA_PHILIPPINES = 'M 20 5 L 40 0 L 50 30 L 45 65 L 30 90 L 18 70 L 12 35 Z';

export function regionMotif(opts: { stroke: string; strokeWidth?: number; width?: number; height?: number }): string {
  const motif = process.env.MOTIF ?? 'latam';
  if (motif === 'globalsouth') {
    const w = opts.width ?? 360;
    const h = Math.round(w * 700 / 1200);
    return globalSouthOutline({ stroke: opts.stroke, strokeWidth: opts.strokeWidth, width: w, height: h });
  }
  return latAmOutline({ stroke: opts.stroke, strokeWidth: opts.strokeWidth, width: opts.width, height: opts.height });
}

export function globalSouthOutline(opts: { stroke: string; strokeWidth?: number; width?: number; height?: number }): string {
  const w = opts.width ?? 540;
  const h = opts.height ?? 360;
  const sw = opts.strokeWidth ?? 3;
  return `<svg width="${w}" height="${h}" viewBox="0 0 1200 700" xmlns="http://www.w3.org/2000/svg" style="display:flex">
    <g transform="translate(60, 80) scale(0.52)">
      <path d="${LATAM_PATH}" fill="none" stroke="${opts.stroke}" stroke-width="${sw / 0.52}" stroke-linejoin="round" stroke-linecap="round"/>
    </g>
    <g transform="translate(450, 110) scale(1.4)">
      <path d="${AFRICA_PATH}" fill="none" stroke="${opts.stroke}" stroke-width="${sw / 1.4}" stroke-linejoin="round" stroke-linecap="round"/>
    </g>
    <g transform="translate(900, 220) scale(0.85)">
      <path d="${INDIA_PATH}" fill="none" stroke="${opts.stroke}" stroke-width="${sw / 0.85}" stroke-linejoin="round" stroke-linecap="round"/>
    </g>
    <g transform="translate(1040, 380) scale(0.75)">
      <path d="${SEASIA_SUMATRA}" fill="none" stroke="${opts.stroke}" stroke-width="${sw / 0.75}" stroke-linejoin="round" stroke-linecap="round"/>
      <path d="${SEASIA_BORNEO}" transform="translate(80, 30)" fill="none" stroke="${opts.stroke}" stroke-width="${sw / 0.75}" stroke-linejoin="round" stroke-linecap="round"/>
      <path d="${SEASIA_JAVA}" transform="translate(40, 130)" fill="none" stroke="${opts.stroke}" stroke-width="${sw / 0.75}" stroke-linejoin="round" stroke-linecap="round"/>
      <path d="${SEASIA_PHILIPPINES}" transform="translate(160, -80)" fill="none" stroke="${opts.stroke}" stroke-width="${sw / 0.75}" stroke-linejoin="round" stroke-linecap="round"/>
    </g>
  </svg>`;
}

export function hostsRow(opts: {
  color: string;
  fontSize?: number;
  gap?: number;
  apartLogo?: string;
  apartRatio?: number;
  aiscLogo?: string;
  aiscRatio?: number;
}): string {
  const fs = opts.fontSize ?? 18;
  const gap = opts.gap ?? Math.round(fs * 1.6);
  const markH = Math.round(fs * 2.4);
  const dividerH = Math.round(fs * 1.6);

  const apartLockup = opts.apartLogo
    ? `<img src="${opts.apartLogo}" style="display:flex;height:${markH}px;width:${Math.round(markH * (opts.apartRatio ?? 2.35))}px"/>`
    : `<div style="display:flex;font-family:Inter;font-weight:700;font-size:${fs}px;color:${opts.color}">Apart Research</div>`;
  const aiscLockup = opts.aiscLogo
    ? `<img src="${opts.aiscLogo}" style="display:flex;height:${markH}px;width:${Math.round(markH * (opts.aiscRatio ?? 3.33))}px"/>`
    : `<div style="display:flex;font-family:Inter;font-weight:700;font-size:${fs}px;color:${opts.color}">AI Safety Colombia</div>`;

  return `<div style="display:flex;align-items:center;gap:${gap}px">${apartLockup}<div style="display:flex;width:1px;height:${dividerH}px;background:${opts.color};opacity:0.3"></div>${aiscLockup}</div>`;
}

export function orbitDot(opts: { color: string; size?: number }): string {
  const s = opts.size ?? 14;
  return `<div style="display:flex;width:${s}px;height:${s}px;border-radius:9999px;background:${opts.color}"></div>`;
}
