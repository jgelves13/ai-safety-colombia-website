import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { PROJECT_ROOT } from './lib';
import v8a from './_v8a-apart-speaker';
import v8b from './_v8b-welcome';
import v8c from './_v8c-summit-dark';
import v8d from './_v8d-stripes';

async function main() {
  const outDir = path.join(PROJECT_ROOT, 'scripts', 'flyers', 'dist', 'v8-juan-felipe');
  await mkdir(outDir, { recursive: true });

  const t0 = Date.now();
  const results = await Promise.all([v8a(), v8b(), v8c(), v8d()]);

  for (const { filename, png } of results) {
    const dest = path.join(outDir, filename);
    await writeFile(dest, png);
    const kb = (png.byteLength / 1024).toFixed(1);
    console.log(`  ${filename}  ${kb} KB`);
  }

  console.log(`done in ${((Date.now() - t0) / 1000).toFixed(1)}s`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
