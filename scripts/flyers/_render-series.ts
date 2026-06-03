import { writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { PROJECT_ROOT } from './lib';
import apart, { type FlyerFormat } from './_v3-apart';
import queEs from './_v4-que-es';
import tracks from './_v4-tracks';
import ponentes from './_v4-ponentes';
import jurado from './_v4-jurado';
import premio from './_v4-premio';
import cierre from './_v4-cierre';

type Mod = (format: FlyerFormat) => Promise<{ filename: string; png: Buffer }>;

const series: Array<{ order: string; name: string; mod: Mod }> = [
  { order: '01', name: 'lanzamiento', mod: apart },
  { order: '02', name: 'que-es', mod: queEs },
  { order: '03', name: 'tracks', mod: tracks },
  { order: '04', name: 'ponentes', mod: ponentes },
  { order: '05', name: 'jurado', mod: jurado },
  { order: '06', name: 'premio', mod: premio },
  { order: '07', name: 'cierre', mod: cierre },
];

const formats: Array<{ format: FlyerFormat; folder: string }> = [
  { format: 'portrait', folder: 'instagram' },
  { format: 'square', folder: 'linkedin' },
];

async function main() {
  for (const { format, folder } of formats) {
    const dir = path.join(PROJECT_ROOT, 'scripts', 'flyers', 'dist', folder);
    await mkdir(dir, { recursive: true });
    for (const { order, name, mod } of series) {
      const result = await mod(format);
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
