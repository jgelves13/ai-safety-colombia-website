import { writeFile } from 'node:fs/promises';
import path from 'node:path';
import flyer, { PEOPLE, type PersonVariant } from './_v7-person.ts';
import type { FlyerFormat } from './_v3-apart';

const OUT = String.raw`G:\Mon Drive\AI Safety Colombia\ai-safety-colombia-website\scripts\flyers\dist\jueces-ponentes`;
const VARIANTS: PersonVariant[] = ['AP'];
const FORMATS: FlyerFormat[] = ['square', 'portrait'];
const SLUGS = ['juan-felipe'];

async function main() {
  for (const slug of SLUGS) {
    const person = PEOPLE[slug];
    for (const v of VARIANTS) {
      for (const f of FORMATS) {
        const r = await flyer(person, f, v);
        const file = path.join(OUT, `${slug}-${v}-${f}.png`);
        await writeFile(file, r.png);
        console.log(`✓ ${slug} ${v} ${f} (${(r.png.length / 1024).toFixed(0)} KB)`);
      }
    }
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
