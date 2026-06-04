import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { PROJECT_ROOT } from './lib';
import v10a from './_v10a-forest-refined';
import v10b from './_v10b-carrusel-cream';
import v10c from './_v10c-forest-asymmetric';

async function main() {
  const outDir = path.join(PROJECT_ROOT, 'scripts', 'flyers', 'dist', 'v10-jf');
  await mkdir(outDir, { recursive: true });
  const t0 = Date.now();
  const results = await Promise.all([v10a(), v10b(), v10c()]);
  for (const { filename, png } of results) {
    const dest = path.join(outDir, filename);
    await writeFile(dest, png);
    const kb = (png.byteLength / 1024).toFixed(1);
    console.log(`  ${filename}  ${kb} KB`);
  }
  console.log(`done in ${((Date.now() - t0) / 1000).toFixed(1)}s`);
}
main().catch((e) => { console.error(e); process.exit(1); });
