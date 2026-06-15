import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { render, html, BRAND, getHostsLogosHD } from './lib';
import type { FlyerFormat } from './_v3-apart';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export type GlobeVariant = 'default' | 'big' | 'none' | 'bg';

export default async function (format: FlyerFormat = 'portrait', variant: GlobeVariant = 'default') {
  const isPort = format === 'portrait';
  const W = 1080;
  const H = isPort ? 1350 : 1080;

  const padT = isPort ? 104 : 84;
  const padX = isPort ? 92 : 80;
  const padB = isPort ? 96 : 78;

  const kickerSz = 24;
  const titleSz = isPort ? 100 : 80;
  const subSz = 32;
  const bodySz = 32;
  const labelSz = 22;
  const labelMin = 195;
  const itemBodySz = 28;
  const pillFs = 30;
  const pillH = 80;
  const pillPad = 36;
  const hostsFs = 26;

  const FOREST = BRAND.forest;
  const CORAL = BRAND.coral;
  const YELLOW = BRAND.yellow;

  const hostsLogos = await getHostsLogosHD(hostsFs, { aiscBlack: true });
  const hostsMarkH = Math.round(hostsFs * 2.4);
  const hostsDividerH = Math.round(hostsFs * 1.6);
  const hostsGap = Math.round(hostsFs * 1.6);
  const hosts = `<div style="display:flex;align-items:center;gap:${hostsGap}px"><img src="${hostsLogos.apartLogo}" style="display:flex;height:${hostsMarkH}px;width:${Math.round(hostsMarkH * hostsLogos.apartRatio)}px"/><div style="display:flex;width:3px;height:${hostsDividerH}px;background:${BRAND.ink2}"></div><img src="${hostsLogos.aiscLogo}" style="display:flex;height:${hostsMarkH}px;width:${Math.round(hostsMarkH * hostsLogos.aiscRatio)}px"/></div>`;

  const globeBytes = await readFile(path.join(__dirname, '_v6n-globe-crop.png'));
  const globeDataUrl = `data:image/png;base64,${globeBytes.toString('base64')}`;
  const globeW = 360;
  const globeH = 345;
  const globeBlock = `<div style="display:flex;position:absolute;top:157px;right:0px;width:${globeW}px;height:${globeH}px"><img src="${globeDataUrl}" style="display:flex;width:${globeW}px;height:${globeH}px"/></div>`;

  const item = (label: string, color: string, body: string) => `<div style="display:flex;align-items:flex-start;gap:18px;font-family:Inter;font-size:${itemBodySz}px;line-height:1.4"><div style="display:flex;min-width:${labelMin}px;margin-top:4px"><div style="display:flex;align-items:center;padding:6px 14px;background:${color};border-radius:6px;font-family:Inter;font-weight:700;font-size:${labelSz - 4}px;letter-spacing:0.08em;color:${BRAND.cream};text-transform:uppercase">${label}</div></div><div style="display:flex;font-weight:500;color:${BRAND.ink}">${body}</div></div>`;

  const source = `
    <div style="display:flex;width:${W}px;height:${H}px;background:${BRAND.cream};font-family:Inter;position:relative;overflow:hidden">

      ${globeBlock}

      <div style="display:flex;flex-direction:column;width:${W}px;height:${H}px;padding:${padT}px ${padX}px ${padB}px ${padX}px;justify-content:space-between;position:relative">

        <div style="display:flex;flex-direction:column">
          <div style="display:flex;font-family:JetBrains Mono;font-weight:500;font-size:${kickerSz}px;letter-spacing:0.2em;color:${FOREST};text-transform:uppercase;margin-bottom:30px">Postulaciones hub Bogotá cierran 12 junio 2026</div>

          <div style="display:flex;flex-direction:column;font-family:Bricolage Grotesque;font-weight:700;font-size:${titleSz}px;line-height:0.95;letter-spacing:-0.02em;max-width:660px">
            <div style="display:flex;color:${CORAL}">Global South</div>
            <div style="display:flex;color:${BRAND.ink}">AI Safety</div>
            <div style="display:flex;color:${BRAND.ink}">Hackathon</div>
          </div>

          <div style="display:flex;font-family:Inter;font-weight:700;font-size:${subSz}px;color:${BRAND.ink};margin-top:48px">19–21 junio 2026 · Bogotá presencial u online</div>

          <div style="display:flex;font-family:Inter;font-weight:500;font-size:${bodySz}px;line-height:1.45;color:${BRAND.ink};margin-top:22px;max-width:880px">Un fin de semana para construir proyectos técnicos de seguridad y gobernanza de IA con relevancia para América Latina.</div>

          <div style="display:flex;flex-direction:column;gap:22px;margin-top:64px;max-width:920px">
            ${item('Inaugurales', FOREST, 'Juan Felipe Cerón (OpenAI) y Alejandro Toro (Congreso de Colombia)')}
            ${item('Jurado', CORAL, 'Expertos de OpenAI, Google, UC Berkeley, PNUD, BID Lab, entre otros')}
            ${item('Fellowship', YELLOW, 'Invitación Apart Lab Fellowship para ganadores; algunos fellows han publicado en ICLR, NeurIPS, ACL')}
          </div>
        </div>

        <div style="display:flex;align-items:center;justify-content:space-between;gap:32px">
          <div style="display:flex;align-items:center;height:${pillH}px;padding:0 ${pillPad}px;background:${FOREST};border-radius:9999px;font-family:Bricolage Grotesque;font-weight:700;font-size:${pillFs}px;color:${BRAND.cream};white-space:nowrap">USD 3.000 en premios</div>
          ${hosts}
        </div>

      </div>

    </div>
  `;

  const png = await render(html(source), W, H);
  return { filename: `_v6n-01-redesign-${variant}-${format}.png`, png };
}
