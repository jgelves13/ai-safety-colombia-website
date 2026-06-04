import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { PROJECT_ROOT } from './lib';
import v9b from './_v9b-forest-dark';

async function main() {
  const outDir = path.join(PROJECT_ROOT, 'scripts', 'flyers', 'dist', 'v9-speakers');
  await mkdir(outDir, { recursive: true });
  const t0 = Date.now();
  const results = await Promise.all([v9b()]);
  for (const { filename, png } of results) {
    const dest = path.join(outDir, filename);
    await writeFile(dest, png);
    const kb = (png.byteLength / 1024).toFixed(1);
    console.log(`  ${filename}  ${kb} KB`);
  }
  console.log(`done in ${((Date.now() - t0) / 1000).toFixed(1)}s`);
}
main().catch((e) => { console.error(e); process.exit(1); });
