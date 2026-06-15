import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { render, html, getHostsLogosHD } from './lib';
import { WORLD_DOTS_DATAURL } from './_world-dots-data';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..', '..');

async function photoDataUrl(rel: string, size: number): Promise<string> {
  const buf = await readFile(path.join(projectRoot, rel));
  const out = await sharp(buf).resize(size, size, { fit: 'cover' }).jpeg({ quality: 90 }).toBuffer();
  return `data:image/jpeg;base64,${out.toString('base64')}`;
}

function recolorDots(dataUrl: string, landFrom: string, landTo: string, glowFrom: string, glowTo: string): string {
  const b64 = dataUrl.split(',')[1];
  let svg = Buffer.from(b64, 'base64').toString('utf8');
  svg = svg.split(landFrom).join(landTo).split(glowFrom).join(glowTo);
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
}

export default async function () {
  const W = 1080;
  const H = 1080;

  const BG = '#0E1E14';
  const LAND_GREEN = '#2BC97A';
  const LATAM_GREEN = '#43E396';
  const WHITE = '#FFFFFF';
  const CORAL = '#E5604D';
  const INK_SOFT = '#D8E9DF';

  const padT = 56;
  const padB = 56;
  const padX = 64;

  const photo = await photoDataUrl('public/people/juan-felipe.jpg', 600);
  const hostsLogos = await getHostsLogosHD(20, { aiscBlack: false });

  const dotsUrl = recolorDots(WORLD_DOTS_DATAURL, '#1F4D32', LAND_GREEN, '#E5604D', LATAM_GREEN);
  const mapW = W + 60;
  const mapH = Math.round(mapW * (720 / 1200));
  const map = `<div style="display:flex;position:absolute;top:${Math.round(H * 0.22)}px;left:-30px;width:${mapW}px;height:${mapH}px;opacity:0.55"><img src="${dotsUrl}" style="display:flex;width:${mapW}px;height:${mapH}px"/></div>`;

  const photoSize = 240;
  const ringW = 5;
  const photoBlock = `<div style="display:flex;position:absolute;top:300px;right:${padX}px;width:${photoSize}px;height:${photoSize}px;border-radius:50%;border:${ringW}px solid ${LAND_GREEN};box-sizing:border-box;overflow:hidden"><img src="${photo}" style="display:flex;width:${photoSize - ringW * 2}px;height:${photoSize - ringW * 2}px;object-fit:cover;border-radius:50%"/></div>`;

  const headerLeft = `
    <div style="display:flex;align-items:baseline;font-family:Inter;font-weight:800;font-size:22px;letter-spacing:-0.02em;color:${WHITE}">
      <span style="display:flex;color:${CORAL};margin-right:4px">✱</span><span style="display:flex">Apart Research</span>
    </div>`;
  const headerRight = `
    <div style="display:flex;align-items:center;gap:16px">
      <img src="${hostsLogos.apartLogo}" style="display:flex;height:36px;width:${Math.round(36 * hostsLogos.apartRatio)}px;opacity:0"/>
      <div style="display:flex;flex-direction:column;font-family:Inter;font-weight:700;font-size:16px;line-height:1.1;color:${WHITE};text-align:right">
        <div style="display:flex;justify-content:flex-end">AI Safety</div>
        <div style="display:flex;justify-content:flex-end">Colombia</div>
      </div>
    </div>`;

  const source = `
    <div style="display:flex;width:${W}px;height:${H}px;background:${BG};font-family:Inter;position:relative;overflow:hidden">
      ${map}

      <div style="display:flex;position:absolute;top:${padT}px;left:${padX}px;right:${padX}px;align-items:center;justify-content:space-between">
        ${headerLeft}${headerRight}
      </div>

      ${photoBlock}

      <div style="display:flex;flex-direction:column;position:absolute;top:240px;left:${padX}px;width:${W - padX * 2 - photoSize - 40}px;gap:20px">
        <div style="display:flex;font-family:JetBrains Mono;font-weight:500;font-size:14px;letter-spacing:0.24em;color:${CORAL};text-transform:uppercase">Speaker</div>
        <div style="display:flex;flex-direction:column;font-family:Bricolage Grotesque;font-weight:700;font-size:60px;line-height:0.95;letter-spacing:-0.03em;color:${WHITE}">
          <div style="display:flex">Juan Felipe</div>
          <div style="display:flex">Cerón Uribe</div>
        </div>
        <div style="display:flex;flex-direction:column;gap:10px;margin-top:8px">
          <div style="display:flex;font-family:Inter;font-weight:600;font-size:18px;color:${CORAL}">Alignment Researcher, OpenAI</div>
          <div style="display:flex;font-family:Inter;font-weight:500;font-size:18px;color:${WHITE}">Opening talk on adversarial robustness</div>
        </div>
      </div>

      <div style="display:flex;align-items:center;gap:14px;position:absolute;top:640px;left:${padX}px">
        <div style="display:flex;width:46px;height:46px;border-radius:50%;background:${WHITE};align-items:center;justify-content:center;font-family:Inter;font-weight:800;font-size:18px;color:${BG}">⌬</div>
        <div style="display:flex;font-family:Inter;font-weight:700;font-size:22px;color:${WHITE};letter-spacing:-0.01em">OpenAI</div>
      </div>

      <div style="display:flex;flex-direction:column;position:absolute;bottom:${padB}px;left:${padX}px;right:${padX}px;gap:6px">
        <div style="display:flex;width:100%;height:1px;background:${LAND_GREEN};opacity:0.4;margin-bottom:14px"></div>
        <div style="display:flex;font-family:Inter;font-weight:600;font-size:16px;color:${WHITE}">Global South AI Safety Hackathon</div>
        <div style="display:flex;font-family:Inter;font-weight:500;font-size:14px;color:${INK_SOFT}">Friday, June 19, 2026</div>
      </div>
    </div>`;

  const png = await render(html(source), W, H);
  return { filename: 'v8a-apart-announcement.png', png };
}
