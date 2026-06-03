import { writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { PROJECT_ROOT } from './lib';
import queEs from './_v4-que-es';

async function main() {
  const distDir = path.join(PROJECT_ROOT, 'scripts', 'flyers', 'dist');
  await mkdir(distDir, { recursive: true });

  const variants = [queEs];
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
