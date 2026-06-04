import { render, html, BRAND, squarePhotoDataUrl, getLogos } from './lib';

export default async function () {
  const W = 1080;
  const H = 1080;

  const photo = await squarePhotoDataUrl('public/people/juan-felipe.jpg', 520);
  const { apartLogo, apartRatio, aiscLogo, aiscRatio } = await getLogos();

  const source = `
    <div style="display:flex;width:${W}px;height:${H}px;background:${BRAND.cream};font-family:Inter;position:relative;overflow:hidden">

      <!-- Top kicker -->
      <div style="display:flex;position:absolute;top:64px;left:72px;font-family:JetBrains Mono;font-weight:500;font-size:14px;letter-spacing:0.32em;color:${BRAND.forest};text-transform:uppercase">Postulaciones cierran 12 junio 2026</div>

      <!-- Headline: "Ponente" coral + name forest -->
      <div style="display:flex;flex-direction:column;position:absolute;top:118px;left:72px">
        <div style="display:flex;font-family:Bricolage Grotesque;font-weight:800;font-size:88px;line-height:0.96;letter-spacing:-0.035em;color:${BRAND.coral}">Ponente</div>
        <div style="display:flex;font-family:Bricolage Grotesque;font-weight:800;font-size:88px;line-height:0.96;letter-spacing:-0.035em;color:${BRAND.forest};margin-top:6px">inaugural</div>
      </div>

      <!-- Circular photo bottom-right of headline area -->
      <div style="display:flex;position:absolute;top:140px;right:72px;width:340px;height:340px;border-radius:9999px;background:${BRAND.forest};align-items:center;justify-content:center">
        <div style="display:flex;width:324px;height:324px;border-radius:9999px;overflow:hidden">
          <img src="${photo}" style="display:flex;width:324px;height:324px;object-fit:cover"/>
        </div>
      </div>

      <!-- REMOTO coral pill aligned under photo -->
      <div style="display:flex;position:absolute;top:500px;right:72px;width:340px;justify-content:center">
        <div style="display:flex;padding:8px 18px;border-radius:9999px;background:${BRAND.coral}">
          <div style="display:flex;font-family:JetBrains Mono;font-weight:500;font-size:13px;letter-spacing:0.28em;color:${BRAND.cream};text-transform:uppercase">Remoto</div>
        </div>
      </div>

      <!-- Name + role block (left) -->
      <div style="display:flex;flex-direction:column;position:absolute;top:498px;left:72px;max-width:560px">
        <div style="display:flex;font-family:Bricolage Grotesque;font-weight:800;font-size:62px;line-height:0.96;letter-spacing:-0.03em;color:${BRAND.forest}">Juan Felipe</div>
        <div style="display:flex;font-family:Bricolage Grotesque;font-weight:800;font-size:62px;line-height:0.96;letter-spacing:-0.03em;color:${BRAND.forest};margin-top:2px">Cerón</div>
        <div style="display:flex;font-family:Inter;font-weight:500;font-size:22px;color:${BRAND.ink2};margin-top:14px">AI Alignment Research Engineer, OpenAI</div>
      </div>

      <!-- Talk title block -->
      <div style="display:flex;flex-direction:column;position:absolute;top:720px;left:72px;right:72px">
        <div style="display:flex;font-family:Bricolage Grotesque;font-weight:700;font-size:36px;line-height:1.1;letter-spacing:-0.02em;color:${BRAND.ink}">Defensas contra ataques a sistemas de IA</div>
        <div style="display:flex;font-family:Inter;font-weight:500;font-size:20px;color:${BRAND.ink2};line-height:1.4;margin-top:14px;max-width:880px">Charla de apertura del Global South AI Safety Hackathon · viernes 19 de junio · Bogotá presencial u online.</div>
      </div>

      <!-- Bottom: URL left, hosts right -->
      <div style="display:flex;position:absolute;bottom:60px;left:72px;right:72px;align-items:center;justify-content:space-between">
        <div style="display:flex;padding:14px 26px;border-radius:9999px;background:${BRAND.forest};align-items:center">
          <div style="display:flex;font-family:Inter;font-weight:700;font-size:16px;color:${BRAND.cream}">aisafetycolombia.org/hackathon</div>
        </div>
        <div style="display:flex;align-items:center;gap:16px">
          <img src="${apartLogo}" style="display:flex;height:32px;width:${Math.round(32 * apartRatio)}px"/>
          <div style="display:flex;width:1px;height:24px;background:${BRAND.ink2};opacity:0.4"></div>
          <img src="${aiscLogo}" style="display:flex;height:32px;width:${Math.round(32 * aiscRatio)}px"/>
        </div>
      </div>

    </div>
  `;

  const png = await render(html(source), W, H);
  return { filename: 'v10b-carrusel-cream.png', png };
}
