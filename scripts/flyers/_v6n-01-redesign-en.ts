import { render, html, BRAND, hostsRow, getLogos } from './lib';

export default async function () {
  const W = 1080;
  const H = 1350;

  const logos = await getLogos(130);

  const PILL_GREEN = BRAND.forest;
  const PILL_CORAL = BRAND.coral;
  const PILL_YELLOW = BRAND.yellow;

  const pillRow = (color: string, label: string, body: string, textColor = '#FFFFFF') => `
    <div style="display:flex;align-items:flex-start;width:100%">
      <div style="display:flex;width:210px;flex-shrink:0">
        <div style="display:flex;align-items:center;height:46px;padding:0 22px;background:${color};border-radius:8px;font-family:Inter;font-weight:700;font-size:19px;letter-spacing:0.08em;color:${textColor};text-transform:uppercase">${label}</div>
      </div>
      <div style="display:flex;font-family:Inter;font-weight:500;font-size:28px;line-height:1.38;color:${BRAND.ink};max-width:686px">${body}</div>
    </div>
  `;

  const source = `
    <div style="display:flex;width:${W}px;height:${H}px;background:${BRAND.cream};font-family:Inter;position:relative;overflow:hidden">

      <div style="display:flex;flex-direction:column;width:${W}px;height:${H}px;padding:110px 92px 96px 92px;position:relative">

        <div style="display:flex;flex-direction:column">
          <div style="display:flex;font-family:JetBrains Mono;font-size:20px;letter-spacing:0.12em;color:${BRAND.forest};text-transform:uppercase;margin-bottom:34px">Bogotá hub applications close jun 12, 2026</div>

          <div style="display:flex;flex-direction:column;font-family:Bricolage Grotesque;font-weight:800;font-size:108px;line-height:1.0;letter-spacing:-0.02em;max-width:720px">
            <div style="display:flex;color:${BRAND.coral}">Global South</div>
            <div style="display:flex;color:${BRAND.ink};margin-top:-2px">AI Safety</div>
            <div style="display:flex;color:${BRAND.ink};margin-top:-2px">Hackathon</div>
          </div>

          <div style="display:flex;font-family:Inter;font-weight:600;font-size:34px;color:${BRAND.ink};margin-top:54px">Jun 19–21, 2026 · Bogotá in person or online</div>

          <div style="display:flex;font-family:Inter;font-weight:500;font-size:34px;line-height:1.45;color:${BRAND.ink};max-width:896px;margin-top:25px">A weekend to build technical AI safety and governance projects with relevance for Latin America.</div>
        </div>

        <div style="display:flex;flex-direction:column;gap:28px;margin-top:65px">
          ${pillRow(PILL_GREEN, 'Keynotes', 'Juan Felipe Cerón (OpenAI) and Alejandro Toro (Colombian Congress)')}
          ${pillRow(PILL_CORAL, 'Judges', 'Experts from OpenAI, Google, UC Berkeley, UNDP, BID Lab, among others')}
          ${pillRow(PILL_YELLOW, 'Fellowship', 'Apart Lab Fellowship invitation for winning teams; some fellows have published at ICLR, NeurIPS, ACL', BRAND.ink)}
        </div>

        <div style="display:flex;align-items:center;justify-content:space-between;margin-top:auto">
          <div style="display:flex;align-items:center;height:80px;padding:0 44px;background:${BRAND.forest};border-radius:9999px;font-family:Bricolage Grotesque;font-weight:700;font-size:30px;color:${BRAND.cream}">USD 3,000 in prizes</div>
          <div style="display:flex;align-items:center">
            ${hostsRow({ color: BRAND.ink2, fontSize: 27, ...logos })}
          </div>
        </div>

      </div>

    </div>
  `;

  const png = await render(html(source), W, H);
  return { filename: `01-en.png`, png };
}
