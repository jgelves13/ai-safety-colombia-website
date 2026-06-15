import { writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { PROJECT_ROOT } from './lib';
import apart from './_v3-apart';
import queEs from './_v4-que-es';
import tracks from './_v4-tracks';
import ponentes from './_v4-ponentes';
import jurado from './_v4-jurado';
import premio from './_v4-premio';
import cierre from './_v4-cierre';

const pieces = [
  { order: '01', name: 'lanzamiento', mod: apart },
  { order: '02', name: 'que-es', mod: queEs },
  { order: '03', name: 'tracks', mod: tracks },
  { order: '04', name: 'ponentes', mod: ponentes },
  { order: '05', name: 'jurado', mod: jurado },
  { order: '06', name: 'premio', mod: premio },
  { order: '07', name: 'cierre', mod: cierre },
];

async function main() {
  const dir = path.join(PROJECT_ROOT, 'scripts', 'flyers', 'dist', 'serie-hackathon');
  await mkdir(dir, { recursive: true });
  const tAll = Date.now();
  await Promise.all(pieces.map(async (p) => {
    const t0 = Date.now();
    const result = await p.mod('portrait');
    const outPath = path.join(dir, `${p.order}-${p.name}.png`);
    await writeFile(outPath, result.png);
    console.log(`[${p.order}] ${p.name} (${(result.png.length / 1024).toFixed(0)}KB, ${Date.now() - t0}ms)`);
  }));
  console.log(`total ${Date.now() - tAll}ms`);
}

main().catch((e) => { console.error(e); process.exit(1); });
