import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import satori from 'satori';
import { html } from 'satori-html';
import { Resvg } from '@resvg/resvg-js';
import { PROJECT_ROOT } from './lib';

async function loadFont(rel: string): Promise<ArrayBuffer> {
  const buf = await readFile(path.join(PROJECT_ROOT, 'node_modules', '@fontsource', rel));
  return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength) as ArrayBuffer;
}

async function main() {
  const triangleBuf = await readFile(path.join(PROJECT_ROOT, 'public', 'images', 'aisc-logo-trim.png'));
  const triangleDataUrl = `data:image/png;base64,${triangleBuf.toString('base64')}`;

  const [inter800] = await Promise.all([
    loadFont('inter/files/inter-latin-800-normal.woff'),
  ]);

  const W = 1400;
  const H = 420;

  async function buildLockup(wordmarkColor: string, outFile: string) {
    const source = `
      <div style="display:flex;width:${W}px;height:${H}px;background:transparent;align-items:center;padding:0 60px">
        <div style="display:flex;align-items:center;width:240px;height:${H}px;justify-content:flex-start">
          <img src="${triangleDataUrl}" style="display:flex;height:240px;width:296px"/>
        </div>
        <div style="display:flex;width:60px;height:${H}px"></div>
        <div style="display:flex;flex-direction:column;font-family:Inter;font-weight:800;font-size:180px;line-height:0.94;letter-spacing:-5px;color:${wordmarkColor}">
          <div style="display:flex">AI Safety</div>
          <div style="display:flex">Colombia</div>
        </div>
      </div>
    `;

    const svg = await satori(html(source) as any, {
      width: W,
      height: H,
      fonts: [
        { name: 'Inter', data: inter800, weight: 800, style: 'normal' },
      ],
    });

    const png = new Resvg(svg, { fitTo: { mode: 'width', value: W } }).render().asPng();
    const outPath = path.join(PROJECT_ROOT, 'public', 'images', outFile);
    await writeFile(outPath, png);
    console.log(`wrote ${outPath} (${W}x${H})`);
  }

  await buildLockup('#1F4D32', 'aisc-lockup.png');
  await buildLockup('#0C0C0C', 'aisc-lockup-black.png');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
