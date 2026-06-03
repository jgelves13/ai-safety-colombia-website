import { render, html, BRAND, hostsRow, getLogos } from './lib';
import type { FlyerFormat } from './_v3-apart';

export default async function (format: FlyerFormat = 'portrait') {
  const isPort = format === 'portrait';
  const W = 1080;
  const H = isPort ? 1350 : 1080;

  const FOREST = BRAND.forest;
  const CORAL = '#E5604D';
  const MINT = '#5BFFA8';
  const INK = '#0C0C0C';

  const padX = 80;
  const padT = isPort ? 96 : 76;
  const padB = isPort ? 80 : 60;

  const logos = await getLogos();

  const source = `
    <div style="display:flex;width:${W}px;height:${H}px;background:${BRAND.cream};font-family:Inter;position:relative;overflow:hidden;flex-direction:column">

      <div style="display:flex;flex-direction:column;padding:${padT}px ${padX}px 60px ${padX}px;gap:30px">
        <div style="display:flex;align-items:center;gap:18px">
          <div style="display:flex;width:62px;height:62px;border-radius:9999px;background:${CORAL};font-family:Bricolage Grotesque;font-weight:800;font-size:32px;color:${BRAND.cream};align-items:center;justify-content:center">?</div>
          <div style="display:flex;font-family:JetBrains Mono;font-size:${isPort ? 17 : 15}px;letter-spacing:0.24em;color:${FOREST};text-transform:uppercase">Qué es el hackathon</div>
        </div>

        <div style="display:flex;flex-direction:column;gap:0">
          <div style="display:flex;font-family:Bricolage Grotesque;font-weight:700;font-size:${isPort ? 116 : 96}px;line-height:0.96;letter-spacing:-0.04em;color:${FOREST}">Tres días.</div>
          <div style="display:flex;font-family:Bricolage Grotesque;font-weight:700;font-size:${isPort ? 116 : 96}px;line-height:0.96;letter-spacing:-0.04em;color:${FOREST}">Una brecha.</div>
          <div style="display:flex;font-family:Bricolage Grotesque;font-weight:700;font-size:${isPort ? 116 : 96}px;line-height:0.96;letter-spacing:-0.04em;color:${CORAL}">Un sprint.</div>
        </div>
      </div>

      <div style="display:flex;flex:1;background:${FOREST};padding:${isPort ? 56 : 40}px ${padX}px ${padB}px ${padX}px;flex-direction:column;justify-content:space-between;gap:30px">

        <div style="display:flex;font-family:Inter;font-weight:500;font-size:${isPort ? 26 : 22}px;line-height:1.5;color:${BRAND.cream};max-width:880px">La investigación en seguridad de IA se concentra en un puñado de países, pero estos sistemas ya están en nuestra región. Sesgos sin auditar, vulnerabilidades sin documentar, decisiones automatizadas sin rendición de cuentas local.</div>

        <div style="display:flex;flex-direction:column;gap:14px">
          <div style="display:flex;font-family:Bricolage Grotesque;font-weight:700;font-size:${isPort ? 42 : 36}px;line-height:1.1;letter-spacing:-0.018em;color:${MINT};max-width:880px">El hackathon arma equipos pequeños, los pone frente a retos definidos por expertos y los acompaña con mentoría en vivo.</div>
        </div>

        <div style="display:flex;align-items:flex-end;justify-content:space-between;padding-top:14px;border-top:1px solid rgba(251,246,236,0.18)">
          <div style="display:flex;flex-direction:column;gap:3px">
            <div style="display:flex;font-family:Bricolage Grotesque;font-weight:800;font-size:${isPort ? 28 : 24}px;letter-spacing:-0.01em;color:${BRAND.cream}">19–21 jun 2026 · Hub Bogotá</div>
            <div style="display:flex;font-family:Inter;font-weight:500;font-size:${isPort ? 16 : 14}px;color:rgba(251,246,236,0.7)">aisafetycolombia.org/hackathon</div>
          </div>
          ${hostsRow({ color: BRAND.cream, fontSize: 15, ...logos })}
        </div>

      </div>

    </div>
  `;

  const png = await render(html(source), W, H);
  return { filename: `_v2lo-02-que-es-${format}.png`, png };
}
