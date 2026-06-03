import { writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { PROJECT_ROOT } from './lib';
import linkedin from './_vlb-linkedin';

async function main() {
  const dir = path.join(PROJECT_ROOT, 'scripts', 'flyers', 'dist', 'single-linkedin');
  await mkdir(dir, { recursive: true });
  const result = await linkedin();
  const outPath = path.join(dir, result.filename);
  await writeFile(outPath, result.png);
  console.log(`wrote ${outPath}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
