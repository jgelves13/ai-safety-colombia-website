import { writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import type { FlyerFormat } from './_v3-apart';
import redesign, { type MotifVariant } from './_v6n-02-redesign';

const OUT_ROOT = 'G:\\Mon Drive\\AI Safety Colombia\\ai-safety-colombia-website';

const variants: Array<{ id: MotifVariant; label: string }> = [
  { id: 'lines', label: 'lines' },
  { id: 'clean', label: 'clean' },
  { id: 'globe', label: 'globe' },
  { id: 'motif', label: 'motif' },
];

async function main() {
  const format: FlyerFormat = 'portrait';
  const dir = path.join(OUT_ROOT, 'scripts', 'flyers', 'dist', '02-redesign');
  await mkdir(dir, { recursive: true });
  for (const { id, label } of variants) {
    const result = await redesign(format, id);
    const outPath = path.join(dir, `02-${label}.png`);
    await writeFile(outPath, result.png);
    console.log(`wrote ${outPath}`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
