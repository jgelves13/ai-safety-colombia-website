import { writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import type { FlyerFormat } from './_v3-apart';
import redesign, { type GlobeVariant } from './_v6n-01-redesign';

const OUT_ROOT = 'G:\\Mon Drive\\AI Safety Colombia\\ai-safety-colombia-website';

const variants: Array<{ id: GlobeVariant; label: string }> = [
  { id: 'default', label: 'default' },
];

async function main() {
  const format: FlyerFormat = 'portrait';
  const dir = path.join(OUT_ROOT, 'scripts', 'flyers', 'dist', '01-redesign');
  await mkdir(dir, { recursive: true });
  for (const { id, label } of variants) {
    const result = await redesign(format, id);
    const outPath = path.join(dir, `01-${label}.png`);
    await writeFile(outPath, result.png);
    console.log(`wrote ${outPath}`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
