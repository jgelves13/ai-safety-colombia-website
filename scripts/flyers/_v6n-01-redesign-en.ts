import { Resvg } from '@resvg/resvg-js';
import { render, html, BRAND, hostsRow, getLogos } from './lib';

export default async function () {
  const W = 1080;
  const H = 1350;

  const logos = await getLogos();

  // Globe sits in upper right. We render it standalone via resvg and embed as <img>
  // because satori drops <circle> / <ellipse> inside multi-element <svg> blocks.
  const gw = 600;
  const gh = 600;
  const gCx = gw / 2;
  const gCy = gh / 2;
  const gR = 288;
  const globeFill = '#EBE0CE';
  const gridStroke = '#C9B98F';
  const gridSw = 1.4;

  const meridians: string[] = [];
  for (let i = -2; i <= 2; i++) {
    const t = i / 3;
    const rx = Math.abs(t) * gR;
    if (rx < 2) continue;
    meridians.push(
      `<ellipse cx="${gCx}" cy="${gCy}" rx="${rx}" ry="${gR}" fill="none" stroke="${gridStroke}" stroke-width="${gridSw}"/>`,
    );
  }
  meridians.push(
    `<line x1="${gCx}" y1="${gCy - gR}" x2="${gCx}" y2="${gCy + gR}" stroke="${gridStroke}" stroke-width="${gridSw}"/>`,
  );
  const parallels: string[] = [];
  for (let i = 1; i <= 2; i++) {
    const y = (i / 3) * gR;
    const rxN = Math.sqrt(gR * gR - y * y);
    parallels.push(
      `<ellipse cx="${gCx}" cy="${gCy - y}" rx="${rxN}" ry="${rxN * 0.18}" fill="none" stroke="${gridStroke}" stroke-width="${gridSw}"/>`,
    );
    parallels.push(
      `<ellipse cx="${gCx}" cy="${gCy + y}" rx="${rxN}" ry="${rxN * 0.18}" fill="none" stroke="${gridStroke}" stroke-width="${gridSw}"/>`,
    );
  }
  parallels.push(
    `<line x1="${gCx - gR}" y1="${gCy}" x2="${gCx + gR}" y2="${gCy}" stroke="${gridStroke}" stroke-width="${gridSw}"/>`,
  );

  const LATAM_PATH = [
    'M 7 0','L 121 23','C 130 40, 140 70, 143 100','L 143 114',
    'C 162 118, 180 122, 200 125','L 221 119','C 220 135, 217 150, 214 159',
    'C 209 170, 207 178, 207 182','C 213 195, 218 210, 221 216','L 250 216',
    'C 270 225, 280 245, 293 261','C 305 255, 318 245, 321 239','L 336 227',
    'C 360 233, 385 247, 400 250','C 415 260, 430 275, 436 284',
    'C 455 295, 468 304, 471 307','C 478 325, 484 345, 486 364',
    'C 520 380, 560 400, 593 420','L 593 455','C 585 480, 575 500, 571 511',
    'C 565 545, 555 590, 543 625','L 536 625','L 514 636',
    'C 500 665, 490 695, 486 705','C 470 730, 450 750, 436 761',
    'C 420 780, 405 800, 400 807','C 385 830, 375 860, 364 886',
    'L 364 988','C 352 980, 340 974, 336 966',
    'C 325 940, 322 900, 321 830','C 322 800, 325 770, 329 739',
    'C 333 700, 340 660, 343 625','L 343 568',
    'C 320 540, 305 520, 293 500','C 285 475, 281 460, 279 455',
    'L 271 420','L 271 386','C 274 370, 277 360, 279 352',
    'L 286 343','L 293 318','L 293 295','L 293 273','L 279 261',
    'C 260 256, 245 252, 236 250','L 221 227','L 207 216','L 193 205',
    'L 164 182','L 129 170','L 100 148','L 86 102','L 50 45','L 43 57',
    'L 57 91','L 57 103','C 50 95, 45 80, 40 60','L 35 35','L 7 0','Z',
  ].join(' ');

  const latamScale = 0.36;
  const latamH = 1000 * latamScale;
  const latamW = 600 * latamScale;
  const latamX = gCx - latamW / 2 - 20;
  const latamY = gCy - latamH / 2 - 20;

  const globeSvgStandalone = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${gw}" height="${gh}" viewBox="0 0 ${gw} ${gh}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <clipPath id="discClip"><circle cx="${gCx}" cy="${gCy}" r="${gR}"/></clipPath>
  </defs>
  <circle cx="${gCx}" cy="${gCy}" r="${gR}" fill="${globeFill}"/>
  <g clip-path="url(#discClip)">
    ${parallels.join('\n    ')}
    ${meridians.join('\n    ')}
    <g transform="translate(${latamX}, ${latamY}) scale(${latamScale})">
      <path d="${LATAM_PATH}" fill="${BRAND.forest}" stroke="${BRAND.forest}" stroke-width="2" stroke-linejoin="round"/>
    </g>
  </g>
  <circle cx="${gCx}" cy="${gCy}" r="${gR}" fill="none" stroke="${BRAND.forest}" stroke-width="2.5"/>
</svg>`;

  const globePng = new Resvg(globeSvgStandalone, { fitTo: { mode: 'width', value: gw } }).render().asPng();
  const globeDataUrl = `data:image/png;base64,${globePng.toString('base64')}`;

  const PILL_GREEN = BRAND.forest;
  const PILL_CORAL = BRAND.coral;
  const PILL_YELLOW = BRAND.yellow;

  const pillRow = (color: string, label: string, body: string, textColor = '#FFFFFF') => `
    <div style="display:flex;align-items:flex-start;gap:24px;width:100%">
      <div style="display:flex;align-items:center;justify-content:center;height:40px;padding:0 18px;background:${color};border-radius:8px;font-family:Inter;font-weight:700;font-size:15px;letter-spacing:0.08em;color:${textColor};text-transform:uppercase;flex-shrink:0;min-width:170px">${label}</div>
      <div style="display:flex;font-family:Inter;font-weight:500;font-size:26px;line-height:1.32;color:${BRAND.ink};max-width:680px">${body}</div>
    </div>
  `;

  const globeTop = 70;
  const globeRight = -150;

  const source = `
    <div style="display:flex;width:${W}px;height:${H}px;background:${BRAND.cream};font-family:Inter;position:relative;overflow:hidden">

      <div style="display:flex;position:absolute;top:${globeTop}px;right:${globeRight}px;width:${gw}px;height:${gh}px">
        <img src="${globeDataUrl}" style="display:flex;width:${gw}px;height:${gh}px"/>
      </div>

      <div style="display:flex;flex-direction:column;width:${W}px;height:${H}px;padding:90px 80px 80px 80px;justify-content:space-between;position:relative">

        <div style="display:flex;flex-direction:column">
          <div style="display:flex;font-family:JetBrains Mono;font-size:18px;letter-spacing:0.12em;color:${BRAND.forest};text-transform:uppercase;margin-bottom:24px">Bogotá hub applications close jun 12, 2026</div>

          <div style="display:flex;flex-direction:column;font-family:Bricolage Grotesque;font-weight:800;font-size:96px;line-height:1.0;letter-spacing:-0.02em;max-width:620px">
            <div style="display:flex;color:${BRAND.coral}">Global South</div>
            <div style="display:flex;color:${BRAND.ink};margin-top:-2px">AI Safety</div>
            <div style="display:flex;color:${BRAND.ink};margin-top:-2px">Hackathon</div>
          </div>

          <div style="display:flex;font-family:Inter;font-weight:600;font-size:30px;color:${BRAND.ink};margin-top:38px">Jun 19–21, 2026 · Bogotá in person or online</div>

          <div style="display:flex;font-family:Inter;font-weight:500;font-size:26px;line-height:1.32;color:${BRAND.ink};max-width:580px;margin-top:18px">A weekend to build technical AI safety and governance projects with relevance for Latin America.</div>
        </div>

        <div style="display:flex;flex-direction:column;gap:22px;margin-top:42px">
          ${pillRow(PILL_GREEN, 'Keynotes', 'Juan Felipe Cerón (OpenAI) and Alejandro Toro (Colombian Congress)')}
          ${pillRow(PILL_CORAL, 'Judges', 'Experts from OpenAI, Google, UC Berkeley, UNDP, BID Lab, among others')}
          ${pillRow(PILL_YELLOW, 'Fellowship', 'Apart Lab Fellowship invitation for winning teams; some fellows have published at ICLR, NeurIPS, ACL', BRAND.ink)}
        </div>

        <div style="display:flex;align-items:center;justify-content:space-between">
          <div style="display:flex;align-items:center;height:78px;padding:0 44px;background:${BRAND.forest};border-radius:9999px;font-family:Bricolage Grotesque;font-weight:700;font-size:30px;color:${BRAND.cream}">USD 3,000 in prizes</div>
          <div style="display:flex;align-items:center">
            ${hostsRow({ color: BRAND.ink2, fontSize: 22, ...logos })}
          </div>
        </div>

      </div>

    </div>
  `;

  const png = await render(html(source), W, H);
  return { filename: `01-en.png`, png };
}
