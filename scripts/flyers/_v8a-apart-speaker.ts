import { render, html, BRAND, squarePhotoDataUrl } from './lib';

export default async function () {
  const W = 1080;
  const H = 1080;

  const juanPhoto = await squarePhotoDataUrl('public/people/juan-felipe.jpg', 600);

  // Dot pattern: 22x14 grid, ~40% density to suggest continents
  const dotR = 8;
  const dotSpacing = 22;
  const dotsGridW = 22;
  const dotsGridH = 14;
  const dotsContainerW = dotsGridW * dotSpacing;
  const dotsContainerH = dotsGridH * dotSpacing;
  const dotsLeft = 520;
  const dotsTop = 180;

  // Coarse dot mask (approx continents)
  const dotMask = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];

  let dotsSvg = `<svg width="${dotsContainerW}" height="${dotsContainerH}" viewBox="0 0 ${dotsContainerW} ${dotsContainerH}" xmlns="http://www.w3.org/2000/svg" style="display:flex">`;
  for (let row = 0; row < dotsGridH; row++) {
    for (let col = 0; col < dotsGridW; col++) {
      if (dotMask[row] && dotMask[row][col]) {
        const cx = col * dotSpacing + dotR;
        const cy = row * dotSpacing + dotR;
        dotsSvg += `<circle cx="${cx}" cy="${cy}" r="${dotR}" fill="${BRAND.sage}" opacity="0.55"/>`;
      }
    }
  }
  dotsSvg += '</svg>';

  const source = `
    <div style="display:flex;width:${W}px;height:${H}px;background:${BRAND.dark};font-family:Inter;position:relative;overflow:hidden">

      <!-- Dot pattern background -->
      <div style="display:flex;position:absolute;top:${dotsTop}px;left:${dotsLeft}px">${dotsSvg}</div>

      <!-- Top-left: Apart Research wordmark -->
      <div style="display:flex;position:absolute;top:60px;left:60px;align-items:center;gap:6px">
        <div style="display:flex;width:10px;height:10px;background:${BRAND.coral}"></div>
        <div style="display:flex;font-family:Inter;font-weight:700;font-size:13px;color:#FFFFFF;letter-spacing:0.08em">Apart Research</div>
      </div>

      <!-- Top-right: AI Safety Colombia label -->
      <div style="display:flex;position:absolute;top:60px;right:60px;flex-direction:column;align-items:flex-end;line-height:1.2">
        <div style="display:flex;font-family:Inter;font-weight:600;font-size:13px;color:${BRAND.cream}">AI Safety</div>
        <div style="display:flex;font-family:Inter;font-weight:600;font-size:13px;color:${BRAND.cream}">Colombia</div>
      </div>

      <!-- Main content container -->
      <div style="display:flex;flex-direction:column;width:${W}px;height:${H}px;padding:60px;justify-content:space-between;position:relative">

        <!-- Left text content -->
        <div style="display:flex;flex-direction:column;max-width:480px">
          <div style="display:flex;font-family:JetBrains Mono;font-size:22px;letter-spacing:0.18em;color:${BRAND.coral};text-transform:uppercase;margin-bottom:24px;font-weight:500">SPEAKER</div>
          <div style="display:flex;font-family:Bricolage Grotesque;font-weight:800;font-size:62px;line-height:0.95;letter-spacing:-0.02em;color:#FFFFFF;margin-bottom:12px">Juan Felipe Cerón Uribe</div>
          <div style="display:flex;font-family:Inter;font-weight:700;font-size:22px;color:${BRAND.coral};margin-bottom:12px">Alignment Researcher, OpenAI</div>
          <div style="display:flex;font-family:Inter;font-weight:500;font-size:20px;color:#FFFFFF">Opening talk on adversarial robustness</div>
        </div>

        <!-- OpenAI pill -->
        <div style="display:flex;align-items:center;height:44px;padding:0 18px;background:#FFFFFF;border-radius:9999px;font-family:Inter;font-weight:700;font-size:22px;color:${BRAND.dark};align-self:flex-start;gap:8px">
          <div style="display:flex;width:16px;height:16px;border-radius:50%;background:${BRAND.dark};align-items:center;justify-content:center;font-size:10px;color:#FFFFFF;font-weight:800">𝕆</div>
          <div>OpenAI</div>
        </div>

      </div>

      <!-- Portrait: right middle -->
      <div style="display:flex;position:absolute;top:280px;right:90px;width:280px;height:280px;border-radius:9999px;border:4px solid ${BRAND.coral};overflow:hidden;flex-shrink:0">
        <img src="${juanPhoto}" style="display:flex;width:100%;height:100%;object-fit:cover"/>
      </div>

      <!-- Bottom hairline divider -->
      <div style="display:flex;position:absolute;bottom:140px;left:60px;right:60px;height:1px;background:rgba(255,255,255,0.12)"></div>

      <!-- Bottom event details -->
      <div style="display:flex;position:absolute;bottom:60px;left:60px;flex-direction:column;gap:4px">
        <div style="display:flex;font-family:Inter;font-weight:700;font-size:18px;color:${BRAND.cream}">Global South AI Safety Hackathon</div>
        <div style="display:flex;font-family:Inter;font-weight:500;font-size:14px;color:${BRAND.cream}">Friday, June 19, 2026</div>
      </div>

    </div>
  `;

  const png = await render(html(source), W, H);
  return { filename: 'v8a-apart-announcement.png', png };
}
