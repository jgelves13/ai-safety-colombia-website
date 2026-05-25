import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

type RenderResult = { filename: string; png: Buffer } | { filename: string; png: Buffer }[];

const moduleDir = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(moduleDir, 'dist');

function fmtBytes(n: number): string {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / 1024 / 1024).toFixed(2)} MB`;
}

async function renderVariant(motif: 'latam' | 'globalsouth') {
  process.env.MOTIF = motif;

  const variantDir = path.join(distDir, `_compare-${motif}`);
  await mkdir(variantDir, { recursive: true });

  const igFeedAnnounce = (await import(`./ig-feed-announce.ts?v=${motif}`)).default;
  const igStorySavedate = (await import(`./ig-story-savedate.ts?v=${motif}`)).default;
  const liSingleAnnounce = (await import(`./li-single-announce.ts?v=${motif}`)).default;
  const printA4Poster = (await import(`./print-a4-poster.ts?v=${motif}`)).default;

  const tasks: Promise<RenderResult>[] = [
    igFeedAnnounce(),
    igStorySavedate(),
    liSingleAnnounce(),
    printA4Poster(),
  ];

  console.log(`\n[${motif.toUpperCase()}] rendering...`);
  const results = await Promise.all(tasks);
  for (const r of results) {
    const list = Array.isArray(r) ? r : [r];
    for (const { filename, png } of list) {
      const dest = path.join(variantDir, filename);
      await writeFile(dest, png);
      console.log(`  ${filename}  ${fmtBytes(png.byteLength)}`);
    }
  }
}

async function main() {
  const t0 = Date.now();
  await renderVariant('latam');
  await renderVariant('globalsouth');
  console.log(`\ndone in ${((Date.now() - t0) / 1000).toFixed(1)}s`);
  console.log(`compare:`);
  console.log(`  ${path.join(distDir, '_compare-latam')}`);
  console.log(`  ${path.join(distDir, '_compare-globalsouth')}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
