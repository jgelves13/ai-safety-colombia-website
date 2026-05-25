import type { APIRoute } from 'astro';
import { renderOg, html, BRAND } from '../../lib/og';

export const GET: APIRoute = async () => {
  const markup = html`
    <div style="width:1200px;height:630px;display:flex;flex-direction:column;justify-content:space-between;background:${BRAND.cream};padding:64px 80px;font-family:Inter">
      <div style="display:flex;align-items:center;justify-content:space-between">
        <div style="display:flex;align-items:center;gap:14px">
          <div style="display:flex;width:14px;height:14px;border-radius:9999px;background:${BRAND.coral}"></div>
          <div style="display:flex;font-family:JetBrains Mono;font-size:22px;letter-spacing:0.18em;text-transform:uppercase;color:${BRAND.coral}">APART × AI SAFETY COLOMBIA</div>
        </div>
        <div style="display:flex;font-family:Inter;font-weight:700;font-size:20px;color:${BRAND.forest}">Hub Bogotá</div>
      </div>

      <div style="display:flex;flex-direction:column;gap:18px">
        <div style="display:flex;font-family:JetBrains Mono;font-size:24px;color:${BRAND.ink2};letter-spacing:0.16em;text-transform:uppercase">GLOBAL SOUTH AI SAFETY HACKATHON</div>
        <div style="display:flex;font-family:Bricolage Grotesque;font-weight:800;font-size:124px;line-height:1;color:${BRAND.forest};letter-spacing:-0.025em">19–21 JUN 2026</div>
        <div style="display:flex;flex-wrap:wrap;gap:14px;margin-top:6px">
          <div style="display:flex;align-items:center;gap:10px;padding:10px 18px;border-radius:9999px;border:2px solid ${BRAND.forest}">
            <div style="display:flex;width:10px;height:10px;border-radius:9999px;background:${BRAND.forest}"></div>
            <div style="display:flex;font-family:Inter;font-weight:700;font-size:20px;color:${BRAND.forest}">Technical AI Safety</div>
          </div>
          <div style="display:flex;align-items:center;gap:10px;padding:10px 18px;border-radius:9999px;border:2px solid ${BRAND.coral}">
            <div style="display:flex;width:10px;height:10px;border-radius:9999px;background:${BRAND.coral}"></div>
            <div style="display:flex;font-family:Inter;font-weight:700;font-size:20px;color:${BRAND.forest}">AI Security</div>
          </div>
          <div style="display:flex;align-items:center;gap:10px;padding:10px 18px;border-radius:9999px;border:2px solid ${BRAND.sage}">
            <div style="display:flex;width:10px;height:10px;border-radius:9999px;background:${BRAND.sage}"></div>
            <div style="display:flex;font-family:Inter;font-weight:700;font-size:20px;color:${BRAND.forest}">Responsible AI</div>
          </div>
          <div style="display:flex;align-items:center;gap:10px;padding:10px 18px;border-radius:9999px;border:2px solid ${BRAND.yellow}">
            <div style="display:flex;width:10px;height:10px;border-radius:9999px;background:${BRAND.yellow}"></div>
            <div style="display:flex;font-family:Inter;font-weight:700;font-size:20px;color:${BRAND.forest}">AI Governance</div>
          </div>
        </div>
      </div>

      <div style="display:flex;justify-content:space-between;align-items:flex-end">
        <div style="display:flex;flex-direction:column;gap:6px">
          <div style="display:flex;font-family:Inter;font-weight:700;font-size:24px;color:${BRAND.forest}">aisafetycolombia.org/hackathon</div>
          <div style="display:flex;font-family:Inter;font-weight:500;font-size:20px;color:${BRAND.ink2}">Online + sede presencial en Bogotá</div>
        </div>
        <div style="display:flex;font-family:JetBrains Mono;font-size:18px;color:${BRAND.coral};letter-spacing:0.12em;text-transform:uppercase">USD 3.000 · LATAM</div>
      </div>
    </div>
  `;
  return renderOg(markup);
};
