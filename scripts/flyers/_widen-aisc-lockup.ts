import sharp from 'sharp';
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const TARGETS = [
  'G:/Mon Drive/AI Safety Colombia/ai-safety-colombia-website/public/images',
  'C:/Users/joseg/Documents/ai-safety-colombia-website/public/images',
];

const FILES = ['aisc-lockup.png', 'aisc-lockup-black.png'];

const EXTRA_GAP = 90;

async function widen(srcPath: string, dstPath: string) {
  const src = await readFile(srcPath);
  const meta = await sharp(src).metadata();
  const W = meta.width!;
  const H = meta.height!;

  let splitX = -1;
  const raw = await sharp(src).ensureAlpha().raw().toBuffer();
  const search = await sharp(src).extract({ left: Math.round(W * 0.18), top: 0, width: Math.round(W * 0.15), height: H }).ensureAlpha().raw().toBuffer();
  const colW = Math.round(W * 0.15);
  const baseLeft = Math.round(W * 0.18);
  for (let x = 0; x < colW; x++) {
    let empty = true;
    for (let y = 0; y < H; y++) {
      const idx = (y * colW + x) * 4 + 3;
      if (search[idx] > 8) { empty = false; break; }
    }
    if (empty) { splitX = baseLeft + x; break; }
  }
  if (splitX < 0) splitX = Math.round(W * 0.22);

  const markPart = await sharp(src).extract({ left: 0, top: 0, width: splitX, height: H }).png().toBuffer();
  const textPart = await sharp(src).extract({ left: splitX, top: 0, width: W - splitX, height: H }).png().toBuffer();

  const newW = W + EXTRA_GAP;
  const result = await sharp({
    create: { width: newW, height: H, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } },
  })
    .composite([
      { input: markPart, top: 0, left: 0 },
      { input: textPart, top: 0, left: splitX + EXTRA_GAP },
    ])
    .png({ compressionLevel: 9 })
    .toBuffer();

  await writeFile(dstPath, result);
  console.log(`[${path.basename(dstPath)}] split=${splitX}, gap=${EXTRA_GAP}, newW=${newW} → ${result.length} bytes`);
}

async function main() {
  const src = TARGETS[0];
  for (const file of FILES) {
    const srcPath = path.join(src, file.replace('.png', '.orig.png'));
    for (const dst of TARGETS) {
      const dstPath = path.join(dst, file);
      await widen(srcPath, dstPath);
    }
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
