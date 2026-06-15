import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { render, html } from './lib';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..', '..');

async function bwPhotoDataUrl(rel: string, size: number): Promise<string> {
  const buf = await readFile(path.join(projectRoot, rel));
  const out = await sharp(buf).resize(size, size, { fit: 'cover' }).grayscale().jpeg({ quality: 90 }).toBuffer();
  return `data:image/jpeg;base64,${out.toString('base64')}`;
}

export default async function () {
  const W = 1080;
  const H = 1080;

  const PURPLE = '#5B6BE5';
  const PURPLE_DEEP = '#3F4ECF';
  const LAVENDER = '#D5D4F0';
  const INK = '#0C124B';
  const WHITE = '#FFFFFF';

  const padX = 70;
  const padT = 70;
  const padB = 70;

  const photo = await bwPhotoDataUrl('public/people/juan-felipe.jpg', 600);

  const photoSize = 540;
  const photoBlock = `<div style="display:flex;position:absolute;top:295px;left:${(W - photoSize) / 2}px;width:${photoSize}px;height:${photoSize}px;border-radius:50%;overflow:hidden;background:#1a1a1a"><img src="${photo}" style="display:flex;width:${photoSize}px;height:${photoSize}px;object-fit:cover"/></div>`;

  const welcomePill = `
    <div style="display:flex;align-items:center;padding:18px 38px;background:${LAVENDER};border-radius:6px">
      <div style="display:flex;font-family:Inter;font-weight:800;font-size:78px;letter-spacing:-0.02em;color:${INK};line-height:1">Welcome!</div>
    </div>`;

  const aiscWordmark = `
    <div style="display:flex;flex-direction:column;font-family:Inter;font-weight:700;font-size:28px;line-height:0.95;color:${WHITE};text-align:left">
      <div style="display:flex">AI Safety</div>
      <div style="display:flex">Colombia</div>
      <div style="display:flex;margin-top:6px;font-family:Inter;font-weight:500;font-size:16px;color:${LAVENDER};letter-spacing:0.04em">Hackathon · 2026</div>
    </div>`;

  const source = `
    <div style="display:flex;width:${W}px;height:${H}px;background:linear-gradient(135deg, ${PURPLE} 0%, ${PURPLE_DEEP} 100%);font-family:Inter;position:relative;overflow:hidden">

      <div style="display:flex;position:absolute;top:${padT}px;left:${padX}px">
        ${welcomePill}
      </div>

      <div style="display:flex;position:absolute;top:${padT + 8}px;right:${padX}px">
        ${aiscWordmark}
      </div>

      ${photoBlock}

      <div style="display:flex;flex-direction:column;position:absolute;bottom:${padB}px;left:${padX}px;right:${padX}px;align-items:center;gap:14px">
        <div style="display:flex;font-family:Inter;font-weight:700;font-size:36px;letter-spacing:-0.01em;color:${WHITE}">Juan Felipe Cerón Uribe</div>
        <div style="display:flex;font-family:Inter;font-weight:500;font-size:26px;color:${LAVENDER}">Alignment Researcher, OpenAI</div>
      </div>
    </div>`;

  const png = await render(html(source), W, H);
  return { filename: 'v8b-welcome-purple.png', png };
}
