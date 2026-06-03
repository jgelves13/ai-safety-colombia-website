import { writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { PROJECT_ROOT } from './lib';
import editorial from './_v3-editorial';
import brutalist from './_v3-brutalist';
import dark from './_v3-dark';
import apart from './_v3-apart';

async function main() {
  const distDir = path.join(PROJECT_ROOT, 'scripts', 'flyers', 'dist');
  await mkdir(distDir, { recursive: true });

  const variants = [editorial, brutalist, dark, apart];
  for (const v of variants) {
    const result = await v();
    const outPath = path.join(distDir, result.filename);
    await writeFile(outPath, result.png);
    console.log(`wrote ${outPath}`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
