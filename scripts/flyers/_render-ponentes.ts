import { writeFile } from 'node:fs/promises';
import path from 'node:path';
import { PROJECT_ROOT } from './lib';
import ponentes from './_v4-ponentes';

async function main() {
  const out = path.join(PROJECT_ROOT, 'scripts', 'flyers', 'dist', 'serie-hackathon', '04-ponentes.png');
  const result = await ponentes();
  await writeFile(out, result.png);
  console.log(`wrote ${out}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
