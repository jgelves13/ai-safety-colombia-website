import { writeFile } from 'node:fs/promises';
import path from 'node:path';
import jurado from './_v4-jurado';
import type { FlyerFormat } from './_v3-apart';

const OUT = String.raw`G:\Mon Drive\AI Safety Colombia\ai-safety-colombia-website\scripts\flyers\dist`;

async function main() {
  const formats: Array<{ format: FlyerFormat; folder: string }> = [
    { format: 'portrait', folder: 'instagram' },
    { format: 'square', folder: 'linkedin' },
  ];
  for (const { format, folder } of formats) {
    const r = await jurado(format);
    const out = path.join(OUT, folder, '05-jurado.png');
    await writeFile(out, r.png);
    console.log(`✓ ${folder}/05-jurado.png (${(r.png.length / 1024).toFixed(0)} KB)`);
  }
  // Also update the serie-hackathon preview folder if it exists
  const serieDir = path.join(OUT, 'serie-hackathon');
  const r = await jurado('portrait');
  await writeFile(path.join(serieDir, '05-jurado.png'), r.png);
  console.log(`✓ serie-hackathon/05-jurado.png`);
}

main().catch((e) => { console.error(e); process.exit(1); });
