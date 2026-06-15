import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { render, html } from './lib';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..', '..');

async function photoDataUrl(rel: string, size: number): Promise<string> {
  const buf = await readFile(path.join(projectRoot, rel));
  const out = await sharp(buf).resize(size, size, { fit: 'cover' }).jpeg({ quality: 90 }).toBuffer();
  return `data:image/jpeg;base64,${out.toString('base64')}`;
}

export default async function () {
  const W = 1080;
  const H = 1080;

  const BG = '#040608';
  const CYAN = '#33E0E5';
  const CYAN_SOFT = '#7CECEF';
  const WHITE = '#FFFFFF';
  const CORAL = '#E5604D';
  const INK_SOFT = '#A8B0B5';

  const padX = 64;
  const padT = 64;
  const padB = 64;

  const photo = await photoDataUrl('public/people/juan-felipe.jpg', 700);

  const streaks = `
    <div style="display:flex;position:absolute;top:240px;left:0;width:${W}px;height:280px;background:radial-gradient(ellipse 60% 50% at 70% 50%, rgba(51,224,229,0.55) 0%, rgba(51,224,229,0.18) 35%, rgba(51,224,229,0) 70%)"></div>
    <div style="display:flex;position:absolute;top:330px;left:200px;width:${W}px;height:6px;background:linear-gradient(90deg, rgba(124,236,239,0) 0%, rgba(124,236,239,0.9) 50%, rgba(124,236,239,0) 100%)"></div>
    <div style="display:flex;position:absolute;top:380px;left:100px;width:${W}px;height:3px;background:linear-gradient(90deg, rgba(124,236,239,0) 0%, rgba(124,236,239,0.7) 50%, rgba(124,236,239,0) 100%)"></div>
    <div style="display:flex;position:absolute;top:430px;left:300px;width:${W}px;height:4px;background:linear-gradient(90deg, rgba(124,236,239,0) 0%, rgba(124,236,239,0.8) 50%, rgba(124,236,239,0) 100%)"></div>`;

  const photoSize = 540;
  const photoBlock = `<div style="display:flex;position:absolute;top:340px;right:-40px;width:${photoSize}px;height:${photoSize}px;overflow:hidden"><img src="${photo}" style="display:flex;width:${photoSize}px;height:${photoSize}px;object-fit:cover"/></div>
    <div style="display:flex;position:absolute;top:340px;right:-40px;width:${photoSize}px;height:${photoSize}px;background:linear-gradient(270deg, rgba(4,6,8,0) 50%, rgba(4,6,8,0.85) 100%)"></div>`;

  const source = `
    <div style="display:flex;width:${W}px;height:${H}px;background:${BG};font-family:Inter;position:relative;overflow:hidden">
      ${streaks}
      ${photoBlock}

      <div style="display:flex;flex-direction:column;position:absolute;top:${padT}px;left:${padX}px">
        <div style="display:flex;font-family:Inter;font-weight:800;font-size:28px;letter-spacing:-0.02em;color:${WHITE}">HACKATHON<sup style="display:flex;font-size:14px;margin-left:2px">26</sup></div>
        <div style="display:flex;font-family:Inter;font-weight:800;font-size:78px;line-height:0.95;letter-spacing:-0.04em;color:${WHITE};margin-top:6px">AI SAFETY</div>
        <div style="display:flex;font-family:Inter;font-weight:500;font-size:22px;color:${WHITE};margin-top:10px">Bogotá – June 19 & 21</div>
      </div>

      <div style="display:flex;flex-direction:column;position:absolute;top:530px;left:${padX}px;gap:24px">
        <div style="display:flex;flex-direction:column;font-family:Inter;font-weight:800;font-size:74px;line-height:0.95;letter-spacing:-0.03em;color:${WHITE}">
          <div style="display:flex">Juan Felipe</div>
          <div style="display:flex">Cerón Uribe</div>
        </div>
        <div style="display:flex;flex-direction:column;gap:4px">
          <div style="display:flex;font-family:Inter;font-weight:700;font-size:22px;color:${CORAL}">Alignment Researcher</div>
          <div style="display:flex;font-family:Inter;font-weight:500;font-size:22px;color:${WHITE}">OpenAI</div>
        </div>
      </div>

      <div style="display:flex;position:absolute;bottom:${padB}px;left:${padX}px;font-family:Inter;font-weight:500;font-size:18px;color:${INK_SOFT};letter-spacing:0.04em">4°42′40″ N · 74°04′20″ W</div>
    </div>`;

  const png = await render(html(source), W, H);
  return { filename: 'v8c-summit-black.png', png };
}
