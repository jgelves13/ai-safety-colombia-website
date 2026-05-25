import { render, html, BRAND } from './lib';

export default async function () {
  const W = 1080;
  const H = 1920;

  const markup = html`
    <div style="display:flex;flex-direction:column;width:${W}px;height:${H}px;background:${BRAND.cream};font-family:Inter">

      <div style="display:flex;height:480px;width:${W}px"></div>

      <div style="display:flex;flex-direction:column;align-items:center;padding:0 80px;gap:36px">
        <div style="display:flex;align-items:center;gap:14px">
          <div style="display:flex;width:14px;height:14px;border-radius:9999px;background:${BRAND.coral}"></div>
          <div style="display:flex;font-family:JetBrains Mono;font-size:24px;letter-spacing:0.18em;text-transform:uppercase;color:${BRAND.coral}">Save the date</div>
        </div>

        <div style="display:flex;flex-direction:column;align-items:center;gap:8px">
          <div style="display:flex;font-family:Bricolage Grotesque;font-weight:800;font-size:260px;line-height:0.9;letter-spacing:-0.03em;color:${BRAND.forest}">19–21</div>
          <div style="display:flex;font-family:Bricolage Grotesque;font-weight:700;font-size:88px;line-height:1;color:${BRAND.forest}">JUN 2026</div>
        </div>

        <div style="display:flex;flex-direction:column;align-items:center;gap:18px;margin-top:14px">
          <div style="display:flex;font-family:Bricolage Grotesque;font-weight:700;font-size:52px;line-height:1.15;color:${BRAND.forest};text-align:center;max-width:880px">Global South AI Safety Hackathon</div>
          <div style="display:flex;align-items:center;gap:10px;padding:10px 22px;border-radius:9999px;background:${BRAND.forest}">
            <div style="display:flex;width:10px;height:10px;border-radius:9999px;background:${BRAND.coral}"></div>
            <div style="display:flex;font-family:JetBrains Mono;font-size:22px;letter-spacing:0.18em;text-transform:uppercase;color:${BRAND.cream}">Hub Bogotá</div>
          </div>
        </div>
      </div>

      <div style="display:flex;flex-direction:column;flex-grow:1;justify-content:flex-end;padding:0 80px 100px 80px;gap:30px">
        <div style="display:flex;flex-direction:column;gap:12px;padding:36px 40px;border-radius:24px;background:${BRAND.forest}">
          <div style="display:flex;font-family:JetBrains Mono;font-size:20px;letter-spacing:0.18em;text-transform:uppercase;color:${BRAND.coral}">Inscríbete</div>
          <div style="display:flex;font-family:Bricolage Grotesque;font-weight:700;font-size:42px;color:${BRAND.cream}">apartresearch.com</div>
          <div style="display:flex;font-family:Inter;font-weight:500;font-size:22px;color:${BRAND.cream};opacity:0.85">Información y guía en aisafetycolombia.org/hackathon</div>
        </div>
        <div style="display:flex;justify-content:center;font-family:JetBrains Mono;font-size:20px;letter-spacing:0.22em;text-transform:uppercase;color:${BRAND.ink2}">AI Safety Colombia · 2026</div>
      </div>

    </div>
  `;

  const png = await render(markup, W, H);
  return { filename: 'aisc-ig-story-hackathon-2026-06-savedate-es.png', png };
}
