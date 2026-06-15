import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import judgeCards from './li-judge-cards';

const moduleDir = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(moduleDir, 'dist');

async function main() {
  await mkdir(distDir, { recursive: true });
  console.log(`judge cards → ${distDir}`);
  const t0 = Date.now();
  const results = await judgeCards();
  for (const { filename, png } of results) {
    await writeFile(path.join(distDir, filename), png);
    console.log(`  ${filename}  ${(png.byteLength / 1024).toFixed(1)} KB`);
  }
  console.log(`done in ${((Date.now() - t0) / 1000).toFixed(1)}s`);
}

main().catch(err => { console.error(err); process.exit(1); });
