import { writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { PROJECT_ROOT } from './lib';
import v2 from './_v2-ig-feed-announce';

async function main() {
  const distDir = path.join(PROJECT_ROOT, 'scripts', 'flyers', 'dist');
  await mkdir(distDir, { recursive: true });
  const result = await v2();
  const outPath = path.join(distDir, result.filename);
  await writeFile(outPath, result.png);
  console.log(`wrote ${outPath}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
