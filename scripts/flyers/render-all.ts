import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import igFeedAnnounce from './ig-feed-announce';
import igFeedTracks from './ig-feed-tracks';
import igStorySavedate from './ig-story-savedate';
import liSingleAnnounce from './li-single-announce';
import waStatusAnnounce from './wa-status-announce';
import printA4Poster from './print-a4-poster';

type RenderResult = { filename: string; png: Buffer } | { filename: string; png: Buffer }[];

const moduleDir = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(moduleDir, 'dist');

function fmtBytes(n: number): string {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / 1024 / 1024).toFixed(2)} MB`;
}

async function writeResult(result: RenderResult): Promise<void> {
  const list = Array.isArray(result) ? result : [result];
  for (const { filename, png } of list) {
    const dest = path.join(distDir, filename);
    await writeFile(dest, png);
    console.log(`  ${filename}  ${fmtBytes(png.byteLength)}`);
  }
}

async function main() {
  await mkdir(distDir, { recursive: true });
  console.log(`flyers → ${distDir}`);
  const t0 = Date.now();

  const tasks: Promise<RenderResult>[] = [
    igFeedAnnounce(),
    igFeedTracks(),
    igStorySavedate(),
    liSingleAnnounce(),
    waStatusAnnounce(),
    printA4Poster(),
  ];

  const results = await Promise.all(tasks);
  for (const r of results) await writeResult(r);

  console.log(`done in ${((Date.now() - t0) / 1000).toFixed(1)}s`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
