import { render, html, BRAND, squarePhotoDataUrl } from './lib';

export default async function () {
  const W = 1080;
  const H = 1080;
  const FOREST_DEEP = '#143620';

  const photo = await squarePhotoDataUrl('public/people/juan-felipe.jpg', 700);

  const source = `
    <div style="display:flex;width:${W}px;height:${H}px;background:${FOREST_DEEP};font-family:Inter;position:relative;overflow:hidden">

      <!-- Right half full-bleed photo -->
      <div style="display:flex;position:absolute;top:0;right:0;width:520px;height:${H}px;overflow:hidden">
        <img src="${photo}" style="display:flex;width:520px;height:${H}px;object-fit:cover"/>
      </div>

      <!-- Coral kicker top-left -->
      <div style="display:flex;position:absolute;top:60px;left:60px;align-items:center;gap:12px">
        <div style="display:flex;width:14px;height:14px;border-radius:50%;background:${BRAND.coral}"></div>
        <div style="display:flex;font-family:Bricolage Grotesque;font-weight:800;font-size:24px;letter-spacing:-0.02em;color:${BRAND.cream}">AISC</div>
        <div style="display:flex;width:1px;height:18px;background:${BRAND.cream};opacity:0.4;margin:0 8px"></div>
        <div style="display:flex;font-family:JetBrains Mono;font-weight:500;font-size:12px;letter-spacing:0.28em;color:${BRAND.cream};text-transform:uppercase;opacity:0.7">Hackathon 2026</div>
      </div>

      <!-- PONENTE label left -->
      <div style="display:flex;position:absolute;top:170px;left:60px;font-family:JetBrains Mono;font-weight:500;font-size:14px;letter-spacing:0.32em;color:${BRAND.coral};text-transform:uppercase">Ponente · charla de apertura</div>

      <!-- Hairline under kicker -->
      <div style="display:flex;position:absolute;top:206px;left:60px;width:420px;height:1px;background:${BRAND.cream};opacity:0.25"></div>

      <!-- Huge stacked name -->
      <div style="display:flex;flex-direction:column;position:absolute;top:240px;left:60px;max-width:500px">
        <div style="display:flex;font-family:Bricolage Grotesque;font-weight:800;font-size:96px;line-height:0.92;letter-spacing:-0.04em;color:${BRAND.cream}">Juan</div>
        <div style="display:flex;font-family:Bricolage Grotesque;font-weight:800;font-size:96px;line-height:0.92;letter-spacing:-0.04em;color:${BRAND.cream}">Felipe</div>
        <div style="display:flex;font-family:Bricolage Grotesque;font-weight:800;font-size:96px;line-height:0.92;letter-spacing:-0.04em;color:${BRAND.coral}">Cerón</div>
      </div>

      <!-- Yellow underscore -->
      <div style="display:flex;position:absolute;top:580px;left:60px;width:80px;height:5px;background:${BRAND.yellow}"></div>

      <!-- Role -->
      <div style="display:flex;flex-direction:column;position:absolute;top:610px;left:60px;max-width:500px">
        <div style="display:flex;font-family:Inter;font-weight:700;font-size:22px;color:${BRAND.cream}">AI Alignment Research Engineer</div>
        <div style="display:flex;font-family:Inter;font-weight:500;font-size:20px;color:${BRAND.sage};margin-top:4px">OpenAI</div>
      </div>

      <!-- Talk title -->
      <div style="display:flex;flex-direction:column;position:absolute;top:730px;left:60px;max-width:500px">
        <div style="display:flex;font-family:JetBrains Mono;font-weight:500;font-size:11px;letter-spacing:0.32em;color:${BRAND.sage};text-transform:uppercase;margin-bottom:10px">Charla</div>
        <div style="display:flex;font-family:Bricolage Grotesque;font-weight:700;font-size:30px;line-height:1.1;letter-spacing:-0.02em;color:${BRAND.cream}">Defensas contra ataques a sistemas de IA</div>
      </div>

      <!-- Bottom hairline -->
      <div style="display:flex;position:absolute;bottom:98px;left:60px;width:480px;height:1px;background:${BRAND.cream};opacity:0.25"></div>

      <!-- Bottom event row -->
      <div style="display:flex;flex-direction:column;position:absolute;bottom:60px;left:60px;max-width:500px">
        <div style="display:flex;font-family:JetBrains Mono;font-weight:500;font-size:12px;letter-spacing:0.32em;color:${BRAND.cream};text-transform:uppercase;opacity:0.75">Viernes 19 jun · Bogotá · remoto</div>
        <div style="display:flex;font-family:JetBrains Mono;font-weight:500;font-size:11px;letter-spacing:0.32em;color:${BRAND.cream};text-transform:uppercase;opacity:0.5;margin-top:6px">aisafetycolombia.org/hackathon</div>
      </div>

    </div>
  `;

  const png = await render(html(source), W, H);
  return { filename: 'v10c-forest-asymmetric.png', png };
}
