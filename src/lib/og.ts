import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import satori from 'satori';
import { html } from 'satori-html';
import { Resvg } from '@resvg/resvg-js';

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

export async function renderOg(markup: ReturnType<typeof html>): Promise<Response> {
  const fonts = await getFonts();
  const svg = await satori(markup as any, { width: 1200, height: 630, fonts });
  const png = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng();
  const ab = png.buffer.slice(png.byteOffset, png.byteOffset + png.byteLength) as ArrayBuffer;
  return new Response(ab, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}

export { html };
