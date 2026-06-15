import { writeFile } from 'node:fs/promises';
import path from 'node:path';
import jurado from './_v4-jurado';

async function main() {
  console.log('start');
  try {
    const r = await jurado('portrait');
    console.log('rendered bytes:', r.png.length);
    const out = path.join('scripts', 'flyers', 'dist', 'serie-hackathon', '05-jurado.png');
    await writeFile(out, r.png);
    console.log('written to', out);
  } catch (e: any) {
    console.error('FAIL:', e?.message || e);
    if (e?.stack) console.error(e.stack);
    process.exit(1);
  }
}

main();
