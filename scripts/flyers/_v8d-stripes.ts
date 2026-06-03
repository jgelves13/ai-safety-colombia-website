import { render, html, BRAND, squarePhotoDataUrl } from './lib';

export default async function () {
  const W = 1080;
  const H = 1080;

  const photo = await squarePhotoDataUrl('public/people/juan-felipe.jpg', 600);

  // Stripe colors (top to bottom): alternating forest/sage greens
  const stripes = [
    BRAND.forest,      // #1F4D32 (darkest)
    '#143620',         // forest-deep
    BRAND.forest,      // #1F4D32
    BRAND.sage,        // #4A8466
    '#3D6A52',         // intermediate
    '#143620',         // deep at bottom
  ];

  const stripeH = H / stripes.length; // 180px each

  // Build stripe divs
  let stripesHtml = '';
  for (let i = 0; i < stripes.length; i++) {
    stripesHtml += `<div style="display:flex;position:absolute;top:${i * stripeH}px;left:0;width:${W}px;height:${stripeH}px;background:${stripes[i]}"></div>`;
  }

  const source = `
    <div style="display:flex;width:${W}px;height:${H}px;background:${BRAND.cream};font-family:Inter;position:relative;overflow:hidden">

      ${stripesHtml}

      <!-- SPEAKER ANNOUNCEMENT tag -->
      <div style="display:flex;position:absolute;top:50px;left:390px;background:${BRAND.cream};padding:10px 28px;border-radius:4px">
        <div style="display:flex;font-family:JetBrains Mono;font-weight:500;font-size:12px;letter-spacing:0.22em;color:${BRAND.coral};text-transform:uppercase">SPEAKER ANNOUNCEMENT</div>
      </div>

      <!-- Headline plate -->
      <div style="display:flex;flex-direction:column;align-items:center;position:absolute;top:110px;left:180px;width:720px;background:${BRAND.cream};padding:28px;border-radius:4px">
        <div style="display:flex;font-family:Bricolage Grotesque;font-weight:700;font-size:36px;line-height:1.1;letter-spacing:-0.02em;color:${BRAND.ink}">Juan Felipe Cerón Uribe</div>
        <div style="display:flex;font-family:Inter;font-weight:500;font-size:18px;color:${BRAND.ink2};margin-top:8px">Alignment Researcher · OpenAI</div>
      </div>

      <!-- Right TALK plate -->
      <div style="display:flex;flex-direction:column;position:absolute;top:330px;right:60px;width:360px;background:${BRAND.cream};padding:32px;border-radius:4px">
        <div style="display:flex;font-family:JetBrains Mono;font-weight:500;font-size:13px;letter-spacing:0.22em;color:${BRAND.coral};text-transform:uppercase;margin-bottom:16px">TALK</div>
        <div style="display:flex;font-family:Bricolage Grotesque;font-weight:700;font-size:30px;line-height:1.1;letter-spacing:-0.01em;color:${BRAND.ink}">Adversarial robustness: defensas contra ataques a sistemas de IA</div>
      </div>

      <!-- Bottom-left portrait -->
      <img src="${photo}" style="position:absolute;bottom:60px;left:60px;width:360px;height:360px;object-fit:cover;border-radius:12px;border:2px solid ${BRAND.cream}"/>

      <!-- Bottom-right AISC block -->
      <div style="display:flex;flex-direction:column;align-items:center;position:absolute;bottom:60px;right:60px;width:240px;background:${BRAND.cream};padding:20px;border-radius:4px">
        <div style="display:flex;font-family:Bricolage Grotesque;font-weight:800;font-size:36px;line-height:1;color:${BRAND.forest}">AISC</div>
        <div style="display:flex;font-family:Inter;font-weight:700;font-size:16px;color:${BRAND.ink2}">HACKATHON</div>
        <div style="display:flex;font-family:Inter;font-weight:500;font-size:14px;color:${BRAND.ink2}">2026</div>
      </div>

    </div>
  `;

  const png = await render(html(source), W, H);
  return { filename: 'v8d-stripes-eagx.png', png };
}
