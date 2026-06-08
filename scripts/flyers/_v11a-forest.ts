import { render, html, BRAND, squarePhotoDataUrl, getLogos, getLogosRecolored, getOpenAILogo, getOpenAILogoRecolored, OPENAI_LOGO_RATIO } from './lib';

export default async function () {
  return buildV11({
    bg: '#143620',
    text: BRAND.cream,
    ring: BRAND.cream,
    kicker: BRAND.coral,
    underscore: BRAND.yellow,
    secondary: BRAND.sage,
    hairlineOpacity: 0.18,
    bleedColor: BRAND.sage,
    logoColor: BRAND.cream,
    filename: 'v11a-forest.png',
  });
}

export async function buildV11(p: {
  bg: string; text: string; ring: string; kicker: string; underscore: string; secondary: string;
  hairlineOpacity: number; bleedColor: string; logoColor: string | null; filename: string;
}) {
  const W = 1080;
  const H = 1080;
  const photo = await squarePhotoDataUrl('public/people/juan-felipe.jpg', 800);
  const logos = p.logoColor ? await getLogosRecolored(p.logoColor) : await getLogos();
  const logoH = 60;
  const openaiLogoH = 48;
  const openaiLogoW = Math.round(openaiLogoH * OPENAI_LOGO_RATIO);
  const openaiLogo = p.logoColor ? await getOpenAILogoRecolored(p.secondary, openaiLogoH * 4) : await getOpenAILogo();

  const source = `
    <div style="display:flex;width:${W}px;height:${H}px;background:${p.bg};font-family:Inter;position:relative;overflow:hidden">

      <!-- Translucent circle bleeds -->
      <div style="display:flex;position:absolute;top:-160px;left:-160px;width:520px;height:520px;border-radius:9999px;background:${p.bleedColor};opacity:0.22"></div>
      <div style="display:flex;position:absolute;bottom:-180px;right:-180px;width:460px;height:460px;border-radius:9999px;background:${p.bleedColor};opacity:0.14"></div>

      <!-- Top header -->
      <div style="display:flex;position:absolute;top:50px;left:60px;align-items:center">
        <div style="display:flex;font-family:Bricolage Grotesque;font-weight:800;font-size:46px;letter-spacing:-0.03em;color:${p.text}">Global South AI Safety Hackathon</div>
      </div>
      <div style="display:flex;position:absolute;top:68px;right:60px;font-family:JetBrains Mono;font-weight:500;font-size:17px;letter-spacing:0.26em;color:${p.kicker};text-transform:uppercase">Ponente</div>

      <!-- Circular portrait with ring -->
      <div style="display:flex;position:absolute;top:185px;left:370px;width:340px;height:340px;border-radius:9999px;background:${p.ring};align-items:center;justify-content:center">
        <div style="display:flex;width:330px;height:330px;border-radius:9999px;overflow:hidden">
          <img src="${photo}" style="display:flex;width:330px;height:330px;object-fit:cover"/>
        </div>
      </div>

      <!-- Name block -->
      <div style="display:flex;flex-direction:column;position:absolute;top:555px;left:60px;right:60px;align-items:center">
        <div style="display:flex;font-family:JetBrains Mono;font-weight:500;font-size:24px;letter-spacing:0.24em;color:${p.kicker};text-transform:uppercase;margin-bottom:18px">Charla de cierre</div>
        <div style="display:flex;font-family:Bricolage Grotesque;font-weight:800;font-size:68px;line-height:0.96;letter-spacing:-0.03em;color:${p.text}">Juan Felipe Cerón Uribe</div>
        <div style="display:flex;width:96px;height:8px;background:${p.underscore};margin-top:18px;margin-bottom:18px"></div>
        <div style="display:flex;font-family:Inter;font-weight:700;font-size:26px;color:${p.text}">AI Alignment Research Engineer</div>
        <img src="${openaiLogo}" style="display:flex;height:${openaiLogoH}px;width:${openaiLogoW}px;margin-top:20px"/>
      </div>

      <!-- Bottom hairline -->
      <div style="display:flex;position:absolute;bottom:130px;left:60px;right:60px;height:1px;background:${p.text};opacity:${p.hairlineOpacity}"></div>

      <!-- Bottom event row: date left, logos right -->
      <div style="display:flex;position:absolute;bottom:36px;left:60px;right:60px;align-items:center;justify-content:space-between">
        <div style="display:flex;flex-direction:column">
          <div style="display:flex;font-family:JetBrains Mono;font-weight:500;font-size:16px;letter-spacing:0.22em;color:${p.text};text-transform:uppercase;opacity:0.95">Domingo 21 de junio 2026</div>
          <div style="display:flex;font-family:JetBrains Mono;font-weight:500;font-size:16px;letter-spacing:0.22em;color:${p.text};text-transform:uppercase;opacity:0.8;margin-top:6px">Bogotá · remoto</div>
        </div>
        <div style="display:flex;align-items:center;gap:24px">
          <img src="${logos.apartLogo}" style="display:flex;height:${logoH}px;width:${Math.round(logoH * logos.apartRatio)}px"/>
          <div style="display:flex;width:1px;height:54px;background:${p.text};opacity:0.35"></div>
          <img src="${logos.aiscLogo}" style="display:flex;height:${logoH}px;width:${Math.round(logoH * logos.aiscRatio)}px"/>
        </div>
      </div>

    </div>
  `;

  const png = await render(html(source), W, H);
  return { filename: p.filename, png };
}
