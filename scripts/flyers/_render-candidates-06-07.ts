import { writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import type { FlyerFormat } from './_v3-apart';
import a from './_v6m-a-narrativa';
import b from './_v6m-b-urgencia';
import c from './_v6m-c-apilada';
import d1 from './_v6m-d1-puente';
import d2 from './_v6m-d2-promesa';
import d3 from './_v6m-d3-cita';

const OUT_ROOT = 'G:\\Mon Drive\\AI Safety Colombia\\ai-safety-colombia-website';

type Mod = (format: FlyerFormat) => Promise<{ filename: string; png: Buffer }>;

const cands: Array<{ id: string; name: string; mod: Mod }> = [
  { id: 'a', name: 'narrativa', mod: a },
  { id: 'b', name: 'urgencia', mod: b },
  { id: 'c', name: 'apilada', mod: c },
  { id: 'd1', name: 'puente', mod: d1 },
  { id: 'd2', name: 'promesa', mod: d2 },
  { id: 'd3', name: 'cita', mod: d3 },
];

async function main() {
  const format: FlyerFormat = 'portrait';
  const dir = path.join(OUT_ROOT, 'scripts', 'flyers', 'dist', 'candidates-06-07');
  await mkdir(dir, { recursive: true });
  for (const { id, name, mod } of cands) {
    const result = await mod(format);
    const outPath = path.join(dir, `${id}-${name}.png`);
    await writeFile(outPath, result.png);
    console.log(`wrote ${outPath}`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
