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
