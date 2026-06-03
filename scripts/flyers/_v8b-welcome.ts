import { render, html, BRAND, squarePhotoDataUrl } from './lib';

export default async function () {
  const W = 1080;
  const H = 1080;

  const photo = await squarePhotoDataUrl('public/people/juan-felipe.jpg', 600);

  const source = `
    <div style="display:flex;width:${W}px;height:${H}px;background:${BRAND.forest};font-family:Inter;position:relative;overflow:hidden">

      <!-- Decorative sage circle (top-right, half off-canvas) -->
      <div style="display:flex;position:absolute;top:-80px;right:-80px;width:360px;height:360px;border-radius:9999px;background:${BRAND.sage};opacity:0.35"></div>

      <!-- Content container -->
      <div style="display:flex;flex-direction:column;width:${W}px;height:${H}px;padding:60px;justify-content:space-between;align-items:center;position:relative">

        <!-- Top section: Welcome tag + top-right text -->
        <div style="display:flex;width:100%;justify-content:space-between;align-items:flex-start">
          <!-- Welcome tag (top-left) -->
          <div style="display:flex;align-items:center;justify-content:center;padding:0 28px;height:100px;background:${BRAND.cream};border-radius:14px;font-family:Bricolage Grotesque;font-weight:700;font-size:58px;color:${BRAND.ink}">Welcome!</div>

          <!-- Top-right text (AI Safety Colombia / Hackathon 2026) -->
          <div style="display:flex;flex-direction:column;text-align:right;font-family:JetBrains Mono;font-size:13px;letter-spacing:0.15em;color:${BRAND.cream};line-height:1.6">
            <div>AI Safety Colombia</div>
            <div>Hackathon 2026</div>
          </div>
        </div>

        <!-- Center: Portrait photo with name and subtitle -->
        <div style="display:flex;flex-direction:column;align-items:center;gap:36px;flex:1;justify-content:center">
          <!-- Photo: 520x520, centered -->
          <div style="display:flex;position:relative">
            <img src="${photo}" style="display:flex;width:520px;height:520px;border-radius:18px;border:1px solid ${BRAND.cream};object-fit:cover"/>
          </div>

          <!-- Name and subtitle -->
          <div style="display:flex;flex-direction:column;align-items:center;gap:8px">
            <div style="display:flex;font-family:Bricolage Grotesque;font-weight:700;font-size:42px;line-height:1.2;letter-spacing:-0.01em;color:${BRAND.cream};text-align:center">Juan Felipe Cerón Uribe</div>
            <div style="display:flex;font-family:Inter;font-weight:500;font-size:24px;color:${BRAND.coral};text-align:center">Alignment Researcher, OpenAI</div>
          </div>
        </div>

      </div>

    </div>
  `;

  const png = await render(html(source), W, H);
  return { filename: 'v8b-welcome-purple.png', png };
}
