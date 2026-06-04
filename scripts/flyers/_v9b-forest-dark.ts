import { render, html, BRAND, squarePhotoDataUrl } from './lib';

export default async function () {
  const W = 1080;
  const H = 1080;
  const photo = await squarePhotoDataUrl('public/people/juan-felipe.jpg', 600);

  const FOREST_DEEP = '#143620';

  const source = `
    <div style="display:flex;width:${W}px;height:${H}px;background:${FOREST_DEEP};font-family:Inter;position:relative;overflow:hidden">

      <!-- Sage translucent circle bleed top-left (solid sage at low opacity, NOT a ::before) -->
      <div style="display:flex;position:absolute;top:-160px;left:-160px;width:520px;height:520px;border-radius:9999px;background:${BRAND.sage};opacity:0.22"></div>
      <div style="display:flex;position:absolute;bottom:-180px;right:-180px;width:460px;height:460px;border-radius:9999px;background:${BRAND.sage};opacity:0.14"></div>

      <!-- Top header: AISC dot lockup + speakers tag -->
      <div style="display:flex;position:absolute;top:60px;left:60px;align-items:center;gap:12px">
        <div style="display:flex;width:14px;height:14px;border-radius:50%;background:${BRAND.coral}"></div>
        <div style="display:flex;font-family:Bricolage Grotesque;font-weight:800;font-size:24px;letter-spacing:-0.02em;color:${BRAND.cream}">AISC</div>
        <div style="display:flex;width:1px;height:18px;background:${BRAND.cream};opacity:0.4;margin:0 8px"></div>
        <div style="display:flex;font-family:JetBrains Mono;font-weight:600;font-size:12px;letter-spacing:0.28em;color:${BRAND.cream};text-transform:uppercase;opacity:0.7">Hackathon 2026</div>
      </div>
      <div style="display:flex;position:absolute;top:60px;right:60px;font-family:JetBrains Mono;font-weight:600;font-size:13px;letter-spacing:0.28em;color:${BRAND.coral};text-transform:uppercase">Ponente</div>

      <!-- Top hairline -->
      <div style="display:flex;position:absolute;top:108px;left:60px;right:60px;height:1px;background:${BRAND.cream};opacity:0.18"></div>

      <!-- Circular portrait with cream ring, centered horizontally, upper area -->
      <div style="display:flex;position:absolute;top:170px;left:340px;width:400px;height:400px;border-radius:9999px;background:${BRAND.cream};align-items:center;justify-content:center">
        <div style="display:flex;width:388px;height:388px;border-radius:9999px;overflow:hidden">
          <img src="${photo}" style="display:flex;width:388px;height:388px;object-fit:cover"/>
        </div>
      </div>

      <!-- Name -->
      <div style="display:flex;flex-direction:column;position:absolute;top:620px;left:60px;right:60px;align-items:center">
        <div style="display:flex;font-family:JetBrains Mono;font-weight:600;font-size:12px;letter-spacing:0.28em;color:${BRAND.coral};text-transform:uppercase;margin-bottom:18px">Charla de apertura</div>
        <div style="display:flex;font-family:Bricolage Grotesque;font-weight:800;font-size:68px;line-height:0.96;letter-spacing:-0.03em;color:${BRAND.cream}">Juan Felipe Cerón Uribe</div>
        <!-- Yellow underscore accent -->
        <div style="display:flex;width:64px;height:4px;background:${BRAND.yellow};margin-top:18px;margin-bottom:18px"></div>
        <div style="display:flex;font-family:Inter;font-weight:600;font-size:22px;color:${BRAND.cream}">AI Alignment Research Engineer</div>
        <div style="display:flex;font-family:Inter;font-weight:500;font-size:22px;color:${BRAND.sage};margin-top:2px">OpenAI</div>
      </div>

      <!-- Bottom hairline -->
      <div style="display:flex;position:absolute;bottom:98px;left:60px;right:60px;height:1px;background:${BRAND.cream};opacity:0.18"></div>

      <!-- Bottom event line -->
      <div style="display:flex;position:absolute;bottom:60px;left:60px;right:60px;align-items:center;justify-content:space-between">
        <div style="display:flex;font-family:JetBrains Mono;font-weight:600;font-size:12px;letter-spacing:0.28em;color:${BRAND.cream};text-transform:uppercase;opacity:0.7">Viernes 19 · junio 2026</div>
        <div style="display:flex;font-family:JetBrains Mono;font-weight:600;font-size:12px;letter-spacing:0.28em;color:${BRAND.cream};text-transform:uppercase;opacity:0.7">Bogotá · remoto</div>
      </div>

    </div>
  `;

  const png = await render(html(source), W, H);
  return { filename: 'v9b-forest-dark.png', png };
}
