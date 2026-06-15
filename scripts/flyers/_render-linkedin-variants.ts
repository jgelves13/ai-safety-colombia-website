import { writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { PROJECT_ROOT } from './lib';
import vA from './_vlb-li-a-inverted';
import vB from './_vlb-li-b-hero';
import vC from './_vlb-li-c-motif';
import vD from './_vlb-li-d-editorial';

async function main() {
  const dir = path.join(PROJECT_ROOT, 'scripts', 'flyers', 'dist', 'linkedin-variants');
  await mkdir(dir, { recursive: true });

  const variants = [
    { name: 'A · Inverted prize card', fn: vA },
    { name: 'B · Hero number gravity', fn: vB },
    { name: 'C · Motif-led', fn: vC },
    { name: 'D · Magazine editorial', fn: vD },
  ];

  const tAll = Date.now();
  await Promise.all(variants.map(async (v) => {
    const t0 = Date.now();
    const result = await v.fn();
    const outPath = path.join(dir, result.filename);
    await writeFile(outPath, result.png);
    console.log(`${v.name} → ${result.filename} (${(result.png.length / 1024).toFixed(0)} KB, ${Date.now() - t0}ms)`);
  }));
  console.log(`total: ${Date.now() - tAll}ms`);
}

main().catch((e) => { console.error(e); process.exit(1); });
