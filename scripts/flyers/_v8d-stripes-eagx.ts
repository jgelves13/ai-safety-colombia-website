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

  const BG = '#312D6A';
  const MINT = '#A8D5C8';
  const MINT_DEEP = '#7BC1B0';
  const STRIPE_PURPLE = '#4A4585';
  const STRIPE_LAVENDER = '#8C86C9';
  const WHITE = '#FFFFFF';
  const INK_SOFT = '#C9C5E5';

  const padX = 72;
  const padT = 72;
  const padB = 72;

  const photo = await photoDataUrl('public/people/juan-felipe.jpg', 700);

  const stripes = `
    <div style="display:flex;position:absolute;top:0;left:0;width:24px;height:${H}px;background:${MINT}"></div>
    <div style="display:flex;position:absolute;top:0;left:30px;width:18px;height:${H}px;background:${MINT_DEEP}"></div>
    <div style="display:flex;position:absolute;top:0;left:54px;width:22px;height:${H}px;background:${STRIPE_PURPLE}"></div>
    <div style="display:flex;position:absolute;top:0;left:82px;width:14px;height:${H}px;background:${STRIPE_LAVENDER}"></div>
    <div style="display:flex;position:absolute;top:0;left:102px;width:8px;height:${H}px;background:${STRIPE_PURPLE}"></div>`;

  const photoSize = 380;
  const photoBlock = `<div style="display:flex;position:absolute;bottom:0;left:130px;width:${photoSize}px;height:${photoSize + 20}px;overflow:hidden"><img src="${photo}" style="display:flex;width:${photoSize}px;height:${photoSize + 20}px;object-fit:cover;object-position:center top"/></div>`;

  const speakerPill = `
    <div style="display:flex;align-items:center;padding:10px 26px;background:${MINT};border-radius:4px">
      <div style="display:flex;font-family:Inter;font-weight:800;font-size:18px;letter-spacing:0.16em;color:${BG}">SPEAKER ANNOUNCEMENT</div>
    </div>`;

  const talkPill = `
    <div style="display:flex;align-items:center;padding:8px 30px;background:${MINT};border-radius:4px">
      <div style="display:flex;font-family:Inter;font-weight:800;font-size:16px;letter-spacing:0.18em;color:${BG}">TALK</div>
    </div>`;

  const source = `
    <div style="display:flex;width:${W}px;height:${H}px;background:${BG};font-family:Inter;position:relative;overflow:hidden">
      ${stripes}

      <div style="display:flex;flex-direction:column;position:absolute;top:${padT}px;left:170px;right:${padX}px;align-items:center;gap:18px">
        ${speakerPill}
        <div style="display:flex;font-family:Inter;font-weight:800;font-size:52px;line-height:1;letter-spacing:-0.02em;color:${WHITE};text-align:center">Juan Felipe Cerón Uribe</div>
        <div style="display:flex;font-family:Inter;font-weight:500;font-size:24px;color:${INK_SOFT}">Alignment Researcher · OpenAI</div>
      </div>

      <div style="display:flex;flex-direction:column;position:absolute;top:340px;right:${padX}px;width:540px;align-items:flex-end;gap:22px">
        ${talkPill}
        <div style="display:flex;font-family:Inter;font-weight:800;font-size:50px;line-height:1.05;letter-spacing:-0.02em;color:${MINT};text-align:right">Adversarial robustness: defensas contra ataques a sistemas de IA</div>
      </div>

      ${photoBlock}

      <div style="display:flex;flex-direction:column;position:absolute;bottom:${padB}px;right:${padX}px;font-family:Inter;font-weight:800;font-size:32px;line-height:1;color:${MINT};text-align:right;letter-spacing:-0.01em">
        <div style="display:flex;justify-content:flex-end">AISC</div>
        <div style="display:flex;justify-content:flex-end">HACKATHON</div>
        <div style="display:flex;justify-content:flex-end">2026</div>
      </div>
    </div>`;

  const png = await render(html(source), W, H);
  return { filename: 'v8d-stripes-eagx.png', png };
}
