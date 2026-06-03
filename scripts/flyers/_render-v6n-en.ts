import { writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { PROJECT_ROOT } from './lib';
import enFlyer from './_v6n-01-redesign-en';

async function main() {
  const { default: sharp } = await import('sharp');
  const distDir = path.join(PROJECT_ROOT, 'scripts', 'flyers', 'dist', 'carrusel');
  await mkdir(distDir, { recursive: true });

  const carruselDir = process.env.CARRUSEL_DIR || path.join(PROJECT_ROOT, 'out-carrusel');
  await mkdir(carruselDir, { recursive: true });

  const result = await enFlyer();
  const pngPath = path.join(distDir, '01-en.png');
  await writeFile(pngPath, result.png);
  console.log(`wrote ${pngPath} (${result.png.length} bytes)`);

  const jpegBuf = await sharp(result.png).jpeg({ quality: 92, progressive: true, chromaSubsampling: '4:4:4' }).toBuffer();
  const jpegPathLocal = path.join(distDir, '01-en.jpeg');
  await writeFile(jpegPathLocal, jpegBuf);
  console.log(`wrote ${jpegPathLocal} (${jpegBuf.length} bytes)`);

  const jpegPathFinal = path.join(carruselDir, '01-en.jpeg');
  await writeFile(jpegPathFinal, jpegBuf);
  console.log(`wrote ${jpegPathFinal} (${jpegBuf.length} bytes)`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
