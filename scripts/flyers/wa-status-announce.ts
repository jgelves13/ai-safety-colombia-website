import { render, html, BRAND } from './lib';

export default async function () {
  const W = 1080;
  const H = 1920;

  const markup = html`
    <div style="display:flex;flex-direction:column;width:${W}px;height:${H}px;background:${BRAND.cream};font-family:Inter">

      <div style="display:flex;height:240px;width:${W}px"></div>

      <div style="display:flex;flex-direction:column;align-items:center;padding:0 70px;gap:32px">
        <div style="display:flex;align-items:center;gap:14px">
          <div style="display:flex;width:14px;height:14px;border-radius:9999px;background:${BRAND.coral}"></div>
          <div style="display:flex;font-family:JetBrains Mono;font-size:22px;letter-spacing:0.18em;text-transform:uppercase;color:${BRAND.coral}">Apart × AI Safety Colombia</div>
        </div>

        <div style="display:flex;flex-direction:column;align-items:center;gap:6px">
          <div style="display:flex;font-family:Bricolage Grotesque;font-weight:800;font-size:240px;line-height:0.9;letter-spacing:-0.03em;color:${BRAND.forest}">19–21</div>
          <div style="display:flex;font-family:Bricolage Grotesque;font-weight:700;font-size:80px;line-height:1;color:${BRAND.forest}">JUN 2026</div>
        </div>

        <div style="display:flex;flex-direction:column;align-items:center;gap:18px;margin-top:10px">
          <div style="display:flex;font-family:Bricolage Grotesque;font-weight:700;font-size:48px;line-height:1.15;color:${BRAND.forest};text-align:center;max-width:880px">Global South AI Safety Hackathon</div>
          <div style="display:flex;font-family:Inter;font-weight:500;font-size:26px;color:${BRAND.ink2};text-align:center">Sede Bogotá · cupos limitados</div>
        </div>
      </div>

      <div style="display:flex;flex-direction:column;flex-grow:1;justify-content:flex-end;padding:0 70px 100px 70px;gap:24px">
        <div style="display:flex;flex-direction:column;gap:18px;padding:40px 44px;border-radius:28px;background:${BRAND.forest}">
          <div style="display:flex;align-items:center;gap:14px">
            <div style="display:flex;font-family:JetBrains Mono;font-size:18px;letter-spacing:0.18em;text-transform:uppercase;color:${BRAND.coral}">Comunidad AISC</div>
          </div>
          <div style="display:flex;font-family:Bricolage Grotesque;font-weight:700;font-size:44px;line-height:1.1;color:${BRAND.cream}">Espacio abierto de la comunidad</div>
          <div style="display:flex;font-family:Inter;font-weight:500;font-size:24px;line-height:1.4;color:${BRAND.cream};opacity:0.85">Para personas interesadas en seguridad y gobernanza de IA en Colombia y la región.</div>
          <div style="display:flex;flex-direction:column;gap:4px;margin-top:6px">
            <div style="display:flex;font-family:JetBrains Mono;font-size:18px;letter-spacing:0.14em;text-transform:uppercase;color:${BRAND.coral}">WhatsApp</div>
            <div style="display:flex;font-family:JetBrains Mono;font-size:22px;color:${BRAND.cream}">chat.whatsapp.com/KwE8cciX48TAVhAOHnrLaZ</div>
          </div>
        </div>
        <div style="display:flex;justify-content:center;font-family:JetBrains Mono;font-size:20px;letter-spacing:0.22em;text-transform:uppercase;color:${BRAND.ink2}">aisafetycolombia.org/hackathon</div>
      </div>

    </div>
  `;

  const png = await render(markup, W, H);
  return { filename: 'aisc-wa-status-hackathon-2026-06-announce-es.png', png };
}
