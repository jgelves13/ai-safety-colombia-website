import { writeFile } from 'node:fs/promises';
import path from 'node:path';
import { render, html, BRAND, hostsRow, getLogos, qrPngDataUrl, latAmOutline, PROJECT_ROOT } from './lib';

async function build(cfg: { motifTop: number; motifRight: number; tag: string }) {
  const W = 1080;
  const H = 1350;
  const motifW = 500;
  const motifH = 833;
  const motifOpacity = 0.30;
  const motifStroke = 11;
  const { motifTop, motifRight, tag } = cfg;

  const logos = await getLogos();
  const qr = await qrPngDataUrl('https://aisafetycolombia.org/hackathon/', 380);
  const MINT = '#5BFFA8';
  const CORAL = '#E5604D';

  const mapMotif = latAmOutline({ stroke: BRAND.forest, strokeWidth: motifStroke, width: motifW, height: motifH, omitDot: true });
  const motifLeft = W - motifRight - motifW;
  const dotX = motifLeft + Math.round((314 / 600) * motifW);
  const dotY = motifTop + Math.round((311 / 1000) * motifH);
  const dotR = 18;
  const ringR = dotR + 14;
  const ring2R = dotR + 30;

  const source = `
    <div style="display:flex;width:${W}px;height:${H}px;background:${BRAND.cream};font-family:Inter;position:relative;overflow:hidden">

      <div style="display:flex;position:absolute;top:${motifTop}px;right:${motifRight}px;opacity:${motifOpacity}">${mapMotif}</div>

      <div style="display:flex;position:absolute;top:${dotY - ring2R}px;left:${dotX - ring2R}px;width:${ring2R * 2}px;height:${ring2R * 2}px;border-radius:9999px;border:2px solid ${CORAL};opacity:0.25"></div>
      <div style="display:flex;position:absolute;top:${dotY - ringR}px;left:${dotX - ringR}px;width:${ringR * 2}px;height:${ringR * 2}px;border-radius:9999px;border:3px solid ${CORAL};opacity:0.60"></div>
      <div style="display:flex;position:absolute;top:${dotY - dotR}px;left:${dotX - dotR}px;width:${dotR * 2}px;height:${dotR * 2}px;border-radius:9999px;background:${CORAL}"></div>

      <div style="display:flex;flex-direction:column;width:${W}px;height:${H}px;padding:140px 80px 96px 80px;justify-content:space-between">

        <div style="display:flex;flex-direction:column;max-width:820px">
          <div style="display:flex;font-family:JetBrains Mono;font-size:16px;letter-spacing:0.18em;color:${CORAL};text-transform:uppercase;margin-bottom:14px">Postulaciones hub Bogotá cierran 12 jun 2026</div>
          <div style="display:flex;font-family:Bricolage Grotesque;font-weight:700;font-size:104px;line-height:0.98;letter-spacing:-0.02em;color:${BRAND.forest}">Global South AI Safety Hackathon</div>
          <div style="display:flex;font-family:Inter;font-weight:500;font-size:28px;line-height:1.4;color:${BRAND.ink2};max-width:760px;margin-top:32px">Tres días para construir proyectos técnicos de seguridad y gobernanza de IA con relevancia para América Latina.</div>
        </div>

        <div style="display:flex;flex-direction:column;gap:8px">
          <div style="display:flex;font-family:Bricolage Grotesque;font-weight:800;font-size:96px;line-height:1;letter-spacing:-0.02em;color:${BRAND.forest}">19–21 jun 2026</div>
          <div style="display:flex;font-family:Inter;font-weight:600;font-size:24px;color:#0C0C0C">Hub Bogotá presencial · remoto desde todo el Sur Global</div>
        </div>

        <div style="display:flex;align-items:center;height:62px;padding:0 26px;background:${MINT};border-radius:9999px;font-family:Bricolage Grotesque;font-weight:700;font-size:26px;color:${BRAND.forest};align-self:flex-start">USD 1.000 por equipo · 3 ganadores LATAM</div>

        <div style="display:flex;align-items:flex-end;justify-content:space-between">
          <div style="display:flex;flex-direction:column;align-items:center;gap:12px">
            <div style="display:flex;padding:7px;border:7px solid ${MINT};border-radius:16px"><img src="${qr}" style="display:flex;width:224px;height:224px"/></div>
            <div style="display:flex;font-family:JetBrains Mono;font-size:14px;letter-spacing:0.2em;color:${BRAND.forest};text-transform:uppercase">Escanea e inscríbete</div>
          </div>
          <div style="display:flex;align-items:flex-end">${hostsRow({ color: BRAND.ink2, fontSize: 24, ...logos })}</div>
        </div>

      </div>

    </div>
  `;

  const t0 = Date.now();
  const png = await render(html(source), W, H);
  const out = path.join(PROJECT_ROOT, 'scripts', 'flyers', 'dist', 'serie-hackathon', `01-lanzamiento_${tag}.png`);
  await writeFile(out, png);
  console.log(`[${tag}] wrote 01-lanzamiento_${tag}.png (${(png.length / 1024).toFixed(0)}KB, ${Date.now() - t0}ms)`);
}

async function main() {
  const tAll = Date.now();
  await build({ motifTop: 360, motifRight: -30, tag: 'high' });
  console.log(`total ${Date.now() - tAll}ms`);
}

main().catch((e) => { console.error(e); process.exit(1); });
