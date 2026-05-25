import type { APIRoute, GetStaticPaths } from 'astro';
import { renderOg, html, BRAND } from '../../../lib/og';
import events from '../../../data/events.json';

const TYPE_LABELS: Record<string, string> = {
  cena: 'CENA',
  charla: 'CHARLA',
  panel: 'PANEL',
  conversatorio: 'CONVERSATORIO',
};

const TYPE_COLORS: Record<string, string> = {
  cena: BRAND.coral,
  charla: BRAND.forest,
  panel: BRAND.sage,
  conversatorio: BRAND.yellow,
};

function formatDateEs(iso: string): string {
  const months = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'];
  const [y, m, d] = iso.split('-').map(Number);
  return `${String(d).padStart(2, '0')} ${months[m - 1]} ${y}`;
}

export const getStaticPaths: GetStaticPaths = () => {
  return events.map((e: any) => ({ params: { slug: e.slug } }));
};

export const GET: APIRoute = async ({ params }) => {
  const event = (events as any[]).find(e => e.slug === params.slug);
  if (!event) return new Response('Not found', { status: 404 });

  const typeLabel = TYPE_LABELS[event.type] || event.type.toUpperCase();
  const typeColor = TYPE_COLORS[event.type] || BRAND.forest;
  const dateText = formatDateEs(event.date);

  const markup = html`
    <div style="width:1200px;height:630px;display:flex;flex-direction:column;justify-content:space-between;background:${BRAND.cream};padding:72px 88px;font-family:Inter">
      <div style="display:flex;align-items:center;gap:14px">
        <div style="display:flex;width:14px;height:14px;border-radius:9999px;background:${BRAND.coral}"></div>
        <div style="display:flex;font-family:JetBrains Mono;font-size:22px;letter-spacing:0.18em;text-transform:uppercase;color:${BRAND.coral}">AI SAFETY COLOMBIA</div>
      </div>

      <div style="display:flex;flex-direction:column;gap:24px;max-width:1040px">
        <div style="display:flex;align-items:center;gap:14px">
          <div style="display:flex;padding:8px 18px;border-radius:9999px;background:${typeColor};font-family:Inter;font-weight:700;font-size:20px;color:${BRAND.cream};letter-spacing:0.08em">${typeLabel}</div>
          <div style="display:flex;font-family:JetBrains Mono;font-size:22px;color:${BRAND.ink2};letter-spacing:0.12em">${dateText}</div>
        </div>
        <div style="display:flex;font-family:Bricolage Grotesque;font-weight:800;font-size:64px;line-height:1.05;color:${BRAND.forest};letter-spacing:-0.015em">${event.titleEs}</div>
        <div style="display:flex;font-family:Inter;font-weight:500;font-size:26px;line-height:1.35;color:${BRAND.ink2}">${event.venueEs}</div>
      </div>

      <div style="display:flex;justify-content:space-between;align-items:flex-end">
        <div style="display:flex;font-family:Inter;font-weight:700;font-size:24px;color:${BRAND.forest}">aisafetycolombia.org/eventos</div>
        <div style="display:flex;font-family:JetBrains Mono;font-size:18px;color:${BRAND.ink2};letter-spacing:0.12em;text-transform:uppercase">Bogotá</div>
      </div>
    </div>
  `;
  return renderOg(markup);
};
