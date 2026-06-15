// Generates light-color variants of aisc-lockup-black.png and apart-logo.png.
// 2 colors (cream #FBF6EC, white #FFFFFF) × 2 accent treatments (preserve green / monochrome) × 2 logos = 8 files.
// Output: public/images/{aisc-lockup,apart-logo}-{cream,white}[-mono].png

import sharp from 'sharp';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const moduleDir = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(moduleDir, '..', '..');
const imagesDir = path.join(projectRoot, 'public', 'images');

const SOURCES = [
  { src: 'aisc-lockup-black.png', stem: 'aisc-lockup' },
  { src: 'apart-logo.png',        stem: 'apart-logo'  },
];

const COLORS = [
  { name: 'cream', hex: '#FBF6EC' },
  { name: 'white', hex: '#FFFFFF' },
];

function hexToRGB(hex) {
  return {
    r: parseInt(hex.slice(1, 3), 16),
    g: parseInt(hex.slice(3, 5), 16),
    b: parseInt(hex.slice(5, 7), 16),
  };
}

// Recolor near-black/grayscale pixels (channel spread < 24) — preserves colored accents.
// Alpha scaled by darkness so anti-aliased edges keep their feathering.
function recolorGrayscaleOnly(buf, { r, g, b }) {
  const out = Buffer.from(buf);
  for (let i = 0; i < out.length; i += 4) {
    const R = out[i], G = out[i + 1], B = out[i + 2], A = out[i + 3];
    if (A === 0) continue;
    const maxC = Math.max(R, G, B);
    const minC = Math.min(R, G, B);
    if (maxC - minC < 24) {
      const darkness = 1 - maxC / 255;
      out[i] = r; out[i + 1] = g; out[i + 2] = b;
      out[i + 3] = Math.round(A * darkness);
    }
  }
  return out;
}

// Recolor ALL non-transparent pixels — flattens the green accents too.
// Each pixel's perceptual luminance drives its alpha mask, so the silhouette stays the same.
function recolorMonochrome(buf, { r, g, b }) {
  const out = Buffer.from(buf);
  for (let i = 0; i < out.length; i += 4) {
    const R = out[i], G = out[i + 1], B = out[i + 2], A = out[i + 3];
    if (A === 0) continue;
    const lum = 0.2126 * R + 0.7152 * G + 0.0722 * B;
    const darkness = 1 - lum / 255;
    out[i] = r; out[i + 1] = g; out[i + 2] = b;
    out[i + 3] = Math.round(A * darkness);
  }
  return out;
}

async function processOne({ src, stem }, color, mode) {
  const absIn = path.join(imagesDir, src);
  const { data, info } = await sharp(absIn).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const rgb = hexToRGB(color.hex);
  const recolored = mode === 'mono' ? recolorMonochrome(data, rgb) : recolorGrayscaleOnly(data, rgb);
  const suffix = mode === 'mono' ? `-${color.name}-mono` : `-${color.name}`;
  const outName = `${stem}${suffix}.png`;
  const absOut = path.join(imagesDir, outName);
  await sharp(recolored, { raw: { width: info.width, height: info.height, channels: 4 } })
    .png({ compressionLevel: 9 })
    .toFile(absOut);
  return { outName, w: info.width, h: info.height };
}

const results = [];
for (const source of SOURCES) {
  for (const color of COLORS) {
    for (const mode of ['accent', 'mono']) {
      const r = await processOne(source, color, mode);
      results.push(r);
      console.log(`  ${r.outName.padEnd(34)} ${r.w}×${r.h}`);
    }
  }
}
console.log(`\nWrote ${results.length} files to public/images/`);
