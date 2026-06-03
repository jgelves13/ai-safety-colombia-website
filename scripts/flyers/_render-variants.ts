import { writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import type { FlyerFormat } from './_v3-apart';

import v1Lanz from './_v1id-01-lanzamiento';
import v1QueEs from './_v1id-02-que-es';
import v1Tracks from './_v1id-03-tracks';
import v1Pon from './_v1id-04-ponentes';
import v1Jur from './_v1id-05-jurado';
import v1Pre from './_v1id-06-premio';
import v1Cie from './_v1id-07-cierre';

import v2Lanz from './_v2lo-01-lanzamiento';
import v2QueEs from './_v2lo-02-que-es';
import v2Tracks from './_v2lo-03-tracks';
import v2Pon from './_v2lo-04-ponentes';
import v2Jur from './_v2lo-05-jurado';
import v2Pre from './_v2lo-06-premio';
import v2Cie from './_v2lo-07-cierre';

const OUT_ROOT = 'G:\\Mon Drive\\AI Safety Colombia\\ai-safety-colombia-website';

type Mod = (format: FlyerFormat) => Promise<{ filename: string; png: Buffer }>;

const variants: Array<{ folder: string; series: Array<{ order: string; name: string; mod: Mod }> }> = [
  {
    folder: 'v1-identity',
    series: [
      { order: '01', name: 'lanzamiento', mod: v1Lanz },
      { order: '02', name: 'que-es', mod: v1QueEs },
      { order: '03', name: 'tracks', mod: v1Tracks },
      { order: '04', name: 'ponentes', mod: v1Pon },
      { order: '05', name: 'jurado', mod: v1Jur },
      { order: '06', name: 'premio', mod: v1Pre },
      { order: '07', name: 'cierre', mod: v1Cie },
    ],
  },
  {
    folder: 'v2-loose',
    series: [
      { order: '01', name: 'lanzamiento', mod: v2Lanz },
      { order: '02', name: 'que-es', mod: v2QueEs },
      { order: '03', name: 'tracks', mod: v2Tracks },
      { order: '04', name: 'ponentes', mod: v2Pon },
      { order: '05', name: 'jurado', mod: v2Jur },
      { order: '06', name: 'premio', mod: v2Pre },
      { order: '07', name: 'cierre', mod: v2Cie },
    ],
  },
];

async function main() {
  for (const { folder, series } of variants) {
    const dir = path.join(OUT_ROOT, 'scripts', 'flyers', 'dist', folder);
    await mkdir(dir, { recursive: true });
    for (const { order, name, mod } of series) {
      const result = await mod('portrait');
      const outPath = path.join(dir, `${order}-${name}.png`);
      await writeFile(outPath, result.png);
      console.log(`wrote ${outPath}`);
    }
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
