import { writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import type { FlyerFormat } from './_v3-apart';

import va01 from './_va-01-lanzamiento';
import va02 from './_va-02-que-es';
import va03 from './_va-03-tracks';
import va04 from './_va-04-ponentes';
import va05 from './_va-05-jurado';
import va06 from './_va-06-premio';
import va07 from './_va-07-cierre';

const OUT_ROOT = 'G:\\Mon Drive\\AI Safety Colombia\\ai-safety-colombia-website';

type Mod = (format: FlyerFormat) => Promise<{ filename: string; png: Buffer }>;

const pieces: Array<{ order: string; name: string; mod: Mod }> = [
  { order: '01', name: 'lanzamiento', mod: va01 },
  { order: '02', name: 'que-es', mod: va02 },
  { order: '03', name: 'tracks', mod: va03 },
  { order: '04', name: 'ponentes', mod: va04 },
  { order: '05', name: 'jurado', mod: va05 },
  { order: '06', name: 'premio', mod: va06 },
  { order: '07', name: 'cierre', mod: va07 },
];

async function main() {
  const dir = path.join(OUT_ROOT, 'scripts', 'flyers', 'dist', 'serie-hackathon-alt');
  await mkdir(dir, { recursive: true });
  for (const { order, name, mod } of pieces) {
    const result = await mod('portrait');
    const outPath = path.join(dir, `${order}-${name}.png`);
    await writeFile(outPath, result.png);
    console.log(`wrote ${outPath}`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
