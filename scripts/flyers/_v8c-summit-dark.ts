import { render, html, BRAND, squarePhotoDataUrl } from './lib';

export default async function () {
  const W = 1080;
  const H = 1080;

  const photo = await squarePhotoDataUrl('public/people/juan-felipe.jpg', 600);

  const source = `
    <div style="display:flex;width:${W}px;height:${H}px;background:#000000;font-family:Inter;position:relative;overflow:hidden">

      <div style="display:flex;position:absolute;top:70px;left:70px;font-family:JetBrains Mono;font-size:16px;font-weight:500;letter-spacing:0.2em;color:${BRAND.coral};text-transform:uppercase">HACKATHON™</div>

      <div style="display:flex;flex-direction:column;position:absolute;top:140px;left:70px;gap:24px;max-width:500px">
        <div style="display:flex;flex-direction:column;gap:4px;line-height:0.92">
          <div style="font-family:Bricolage Grotesque;font-weight:800;font-size:140px;letter-spacing:-0.02em;color:#FFFFFF">AI</div>
          <div style="font-family:Bricolage Grotesque;font-weight:800;font-size:140px;letter-spacing:-0.02em;color:#FFFFFF">SAFETY</div>
        </div>
        <div style="font-family:Inter;font-weight:500;font-size:26px;color:#FFFFFF">Bogotá – June 19 & 21</div>
      </div>

      <div style="display:flex;flex-direction:column;position:absolute;top:540px;left:70px;max-width:400px">
        <div style="display:flex;font-family:Bricolage Grotesque;font-weight:700;font-size:44px;line-height:1.05;letter-spacing:-0.02em;color:#FFFFFF">Juan Felipe</div>
        <div style="display:flex;font-family:Bricolage Grotesque;font-weight:700;font-size:44px;line-height:1.05;letter-spacing:-0.02em;color:#FFFFFF;margin-bottom:14px">Cerón Uribe</div>
        <div style="display:flex;font-family:Inter;font-weight:700;font-size:22px;color:${BRAND.yellow};margin-bottom:6px">Alignment Researcher</div>
        <div style="display:flex;font-family:Inter;font-weight:500;font-size:22px;color:#FFFFFF">OpenAI</div>
      </div>

      <div style="display:flex;position:absolute;top:430px;right:80px;width:360px;height:360px;border-radius:6px;border:1px solid ${BRAND.yellow};overflow:hidden">
        <img src="${photo}" style="display:flex;width:360px;height:360px;object-fit:cover"/>
      </div>
      <div style="display:flex;position:absolute;top:560px;right:445px;width:2px;height:80px;background:${BRAND.yellow}"></div>
      <div style="display:flex;position:absolute;top:540px;right:450px;width:14px;height:14px"><svg width="14" height="14" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M 2 2 L 10 8 L 2 14" stroke="${BRAND.yellow}" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
      <div style="display:flex;position:absolute;top:646px;right:450px;width:14px;height:14px"><svg width="14" height="14" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M 2 2 L 10 8 L 2 14" stroke="${BRAND.yellow}" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg></div>

      <div style="position:absolute;bottom:70px;left:70px;font-family:JetBrains Mono;font-weight:500;font-size:14px;letter-spacing:0.15em;color:rgba(255,255,255,0.55)">4°42'40" N · 78°04'20" W</div>

    </div>
  `;

  const png = await render(html(source), W, H);
  return { filename: 'v8c-summit-black.png', png };
}
