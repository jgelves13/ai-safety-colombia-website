import type { APIRoute } from 'astro';
import { renderOg, html, BRAND } from '../../lib/og';

export const GET: APIRoute = async () => {
  const markup = html`
    <div style="width:1200px;height:630px;display:flex;flex-direction:column;justify-content:space-between;background:${BRAND.cream};padding:72px 96px;font-family:Inter">
      <div style="display:flex;align-items:center;gap:14px">
        <div style="display:flex;width:14px;height:14px;border-radius:9999px;background:${BRAND.coral}"></div>
        <div style="display:flex;font-family:JetBrains Mono;font-size:22px;letter-spacing:0.18em;text-transform:uppercase;color:${BRAND.coral}">AI SAFETY COLOMBIA</div>
      </div>

      <div style="display:flex;flex-direction:column;gap:24px;max-width:1000px">
        <div style="display:flex;font-family:Bricolage Grotesque;font-weight:800;font-size:96px;line-height:1;color:${BRAND.forest};letter-spacing:-0.02em">Comunidad colombiana de seguridad de IA.</div>
        <div style="display:flex;font-family:Inter;font-weight:500;font-size:30px;line-height:1.35;color:${BRAND.ink2}">Investigación, formación y política pública sobre los riesgos de los sistemas de IA avanzados.</div>
      </div>

      <div style="display:flex;justify-content:space-between;align-items:flex-end">
        <div style="display:flex;font-family:Inter;font-weight:700;font-size:24px;color:${BRAND.forest}">aisafetycolombia.org</div>
        <div style="display:flex;font-family:JetBrains Mono;font-size:18px;color:${BRAND.ink2};letter-spacing:0.12em;text-transform:uppercase">Bogotá · 2026</div>
      </div>
    </div>
  `;
  return renderOg(markup);
};
