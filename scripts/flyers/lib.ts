import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import satori from 'satori';
import { html } from 'satori-html';
import { Resvg } from '@resvg/resvg-js';
import QRCode from 'qrcode';

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

export { html };
export const PROJECT_ROOT = projectRoot;

const LATAM_PATH = 'M 60 110 Q 100 80 180 90 Q 240 96 290 110 Q 340 122 380 110 Q 410 100 440 116 Q 472 130 460 168 Q 446 200 410 196 Q 380 192 360 210 Q 348 230 360 252 Q 372 268 386 268 Q 412 270 444 286 Q 480 308 488 354 Q 494 396 478 444 Q 460 494 432 530 Q 410 562 396 596 Q 384 632 376 668 Q 368 700 352 728 Q 332 754 308 766 Q 286 772 274 754 Q 266 736 270 712 Q 274 686 282 658 Q 286 632 278 612 Q 264 580 248 552 Q 230 520 218 484 Q 206 442 208 396 Q 212 348 230 308 Q 246 274 258 248 Q 268 226 268 200 Q 266 174 252 158 Q 230 138 192 138 Q 142 138 102 144 Q 76 146 60 134 Q 50 122 60 110 Z';
const COLOMBIA_DOT = { cx: 280, cy: 220 };

export function latAmOutline(opts: { stroke: string; strokeWidth?: number; width?: number; height?: number; rotate?: number }): string {
  const w = opts.width ?? 280;
  const h = opts.height ?? 420;
  const sw = opts.strokeWidth ?? 3;
  const rot = opts.rotate ?? 0;
  return `<svg width="${w}" height="${h}" viewBox="0 0 600 800" xmlns="http://www.w3.org/2000/svg" style="display:flex;transform:rotate(${rot}deg)"><path d="${LATAM_PATH}" fill="none" stroke="${opts.stroke}" stroke-width="${sw}" stroke-linejoin="round" stroke-linecap="round"/><circle cx="${COLOMBIA_DOT.cx}" cy="${COLOMBIA_DOT.cy}" r="${sw * 2.5}" fill="${opts.stroke}"/></svg>`;
}

export function hostsRow(opts: { color: string; fontSize?: number; gap?: number }): string {
  const fs = opts.fontSize ?? 18;
  const gap = opts.gap ?? 18;
  return `<div style="display:flex;align-items:center;gap:${gap}px;font-family:JetBrains Mono;font-size:${fs}px;letter-spacing:0.18em;text-transform:uppercase;color:${opts.color}"><div style="display:flex">Apart Research</div><div style="display:flex;width:${Math.round(fs * 0.6)}px;height:1px;background:${opts.color};opacity:0.5"></div><div style="display:flex">AI Safety Colombia</div></div>`;
}

export function orbitDot(opts: { color: string; size?: number }): string {
  const s = opts.size ?? 14;
  return `<div style="display:flex;width:${s}px;height:${s}px;border-radius:9999px;background:${opts.color}"></div>`;
}
