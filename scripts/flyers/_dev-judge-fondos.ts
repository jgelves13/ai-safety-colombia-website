import http from 'node:http';
import { writeFile, mkdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { PROJECT_ROOT, render, BRAND } from './lib';
import { html } from 'satori-html';

const PORT = 5194;
const FLYERS_DIR = path.join(PROJECT_ROOT, 'scripts', 'flyers');
const OUT_DIR = path.join(FLYERS_DIR, 'dist', 'judge-fondos-variants');

const W = 1080;
const H = 1350;

function c(left: number, top: number, size: number, color: string, opacity = 1): string {
  return `<div style="display:flex;position:absolute;left:${left}px;top:${top}px;width:${size}px;height:${size}px;border-radius:9999px;background:${color};opacity:${opacity}"></div>`;
}

function card(bg: string, elements: string[]): string {
  return `<div style="display:flex;width:${W}px;height:${H}px;background:${bg};position:relative;overflow:hidden">${elements.join('')}</div>`;
}

// ──────────────────────────────────────────────────────────────────────
// Pattern A (from 01a): subtle wash BR + small color accent TL
function patternA(bg: string, wash: string, accent: string, washOp = 0.10, accentOp = 0.22): string {
  return card(bg, [
    c(420, 920, 940, wash, washOp),
    c(-120, -120, 300, accent, accentOp),
  ]);
}
// Pattern B (from 02a): two same-hue half-discs in opposite corners
function patternB(bg: string, discA: string, discB: string, opA = 0.22, opB = 0.16): string {
  return card(bg, [
    c(700, -220, 650, discA, opA),
    c(-200, 1080, 550, discB, opB),
  ]);
}
// Pattern C (from 05a): two symmetric right-edge discs + small left accent
function patternC(bg: string, discRight: string, accentLeft: string, opRight = 0.65, opAccent = 0.50): string {
  return card(bg, [
    c(820, -200, 460, discRight, opRight),
    c(820, 1080, 460, discRight, opRight),
    c(-100, 540, 260, accentLeft, opAccent),
  ]);
}

type Variant = { key: string; slot: string; family: string; pattern: string; label: string; source: string };

const variants: Variant[] = [
  // ─── SLOT 01 · RED family · Pattern A · tonal discs ──────────────────
  { key: '01a', slot: '01', family: 'red', pattern: 'A',
    label: 'α · deep coral #4A1F18 + lighter coral wash + lighter coral accent',
    source: patternA('#4A1F18', '#6A3528', '#6A3528', 0.55, 0.90),
  },
  { key: '01b', slot: '01', family: 'red', pattern: 'A',
    label: 'β · deep burgundy #3D1818 + lighter burgundy discs',
    source: patternA('#3D1818', '#5A2A28', '#5A2A28', 0.55, 0.90),
  },
  { key: '01c', slot: '01', family: 'red', pattern: 'A',
    label: 'γ · deep terracotta #5A2A18 + lighter terracotta discs',
    source: patternA('#5A2A18', '#7A4530', '#7A4530', 0.55, 0.90),
  },

  // ─── SLOT 02 · TEAL family · Pattern B · tonal ───────────────────────
  { key: '02a', slot: '02', family: 'teal', pattern: 'B',
    label: 'α · deep teal #143A40 + lighter teal half-discs',
    source: patternB('#143A40', '#2A555F', '#2A555F', 0.55, 0.40),
  },
  { key: '02b', slot: '02', family: 'teal', pattern: 'B',
    label: 'β · deep navy #14213D + lighter navy half-discs',
    source: patternB('#14213D', '#2D3D5A', '#2D3D5A', 0.55, 0.40),
  },
  { key: '02c', slot: '02', family: 'teal', pattern: 'B',
    label: 'γ · deep petrol #14334D + lighter petrol half-discs',
    source: patternB('#14334D', '#2A4D6A', '#2A4D6A', 0.55, 0.40),
  },

  // ─── SLOT 03 · AMBER family · Pattern C · tonal ──────────────────────
  { key: '03a', slot: '03', family: 'amber', pattern: 'C',
    label: 'α · deep amber #3A2808 + darker amber discs',
    source: patternC('#3A2808', '#1F1605', '#1F1605', 0.65, 0.50),
  },
  { key: '03b', slot: '03', family: 'amber', pattern: 'C',
    label: 'β · deep mustard #4A3508 + darker mustard discs',
    source: patternC('#4A3508', '#2D2008', '#2D2008', 0.65, 0.50),
  },
  { key: '03c', slot: '03', family: 'amber', pattern: 'C',
    label: 'γ · deep olive-bronze #3A3310 + darker olive discs',
    source: patternC('#3A3310', '#1F1A05', '#1F1A05', 0.65, 0.50),
  },

  // ─── SLOT 04 · GREEN family (no forest) · Pattern A · tonal ──────────
  { key: '04a', slot: '04', family: 'green', pattern: 'A',
    label: 'α · deep moss #2A3818 + lighter moss discs',
    source: patternA('#2A3818', '#4A5828', '#4A5828', 0.55, 0.90),
  },
  { key: '04b', slot: '04', family: 'green', pattern: 'A',
    label: 'β · deep pine #1F3820 + lighter pine discs',
    source: patternA('#1F3820', '#3A5A35', '#3A5A35', 0.55, 0.90),
  },
  { key: '04c', slot: '04', family: 'green', pattern: 'A',
    label: 'γ · deep emerald #14382D + lighter emerald discs',
    source: patternA('#14382D', '#2A5A48', '#2A5A48', 0.55, 0.90),
  },

  // ─── SLOT 05 · PURPLE family · Pattern B · tonal ─────────────────────
  { key: '05a', slot: '05', family: 'purple', pattern: 'B',
    label: 'α · deep aubergine #2D1A2D + lighter aubergine half-discs',
    source: patternB('#2D1A2D', '#4F305F', '#4F305F', 0.55, 0.40),
  },
  { key: '05b', slot: '05', family: 'purple', pattern: 'B',
    label: 'β · deep plum #3D1A40 + lighter plum half-discs',
    source: patternB('#3D1A40', '#5F2D60', '#5F2D60', 0.55, 0.40),
  },
  { key: '05c', slot: '05', family: 'purple', pattern: 'B',
    label: 'γ · deep mauve #3D1A30 + lighter mauve half-discs',
    source: patternB('#3D1A30', '#5F2D48', '#5F2D48', 0.55, 0.40),
  },

  // ─── SLOT 06 · BROWN family · Pattern C · tonal ──────────────────────
  { key: '06a', slot: '06', family: 'brown', pattern: 'C',
    label: 'α · deep espresso #2A1A0F + lighter brown discs',
    source: patternC('#2A1A0F', '#4A3528', '#4A3528', 0.65, 0.50),
  },
  { key: '06b', slot: '06', family: 'brown', pattern: 'C',
    label: 'β · deep mahogany #3D1F0F + lighter mahogany discs',
    source: patternC('#3D1F0F', '#5A3520', '#5A3520', 0.65, 0.50),
  },
  { key: '06c', slot: '06', family: 'brown', pattern: 'C',
    label: 'γ · deep cocoa #2A1810 + lighter cocoa discs',
    source: patternC('#2A1810', '#4A2F1A', '#4A2F1A', 0.65, 0.50),
  },
];

type State = { version: number; rendering: boolean; pending: boolean; error: string | null; ms: number };
const state: Record<string, State> = Object.fromEntries(
  variants.map((v) => [v.key, { version: 0, rendering: false, pending: false, error: null, ms: 0 }]),
);

async function renderOne(v: Variant) {
  const s = state[v.key];
  if (s.rendering) { s.pending = true; return; }
  s.rendering = true;
  const t0 = Date.now();
  try {
    const png = await render(html(v.source), W, H);
    await mkdir(OUT_DIR, { recursive: true });
    await writeFile(path.join(OUT_DIR, `${v.key}.png`), png);
    s.version++;
    s.error = null;
    s.ms = Date.now() - t0;
    console.log(`[${v.key} v${s.version}] ${(png.length / 1024).toFixed(0)}KB in ${s.ms}ms`);
  } catch (e: any) {
    s.error = e?.message ?? String(e);
    console.error(`[${v.key} err] ${s.error}`);
  } finally {
    s.rendering = false;
    if (s.pending) { s.pending = false; renderOne(v); }
  }
}

const slots = [...new Set(variants.map(v => v.slot))];

const PAGE = `<!doctype html>
<html><head><meta charset="utf-8"><title>Judge fondos · 6 hue families × 3 candidates</title>
<style>
  html,body{margin:0;background:#1a1a1a;color:#eee;font-family:system-ui;min-height:100vh}
  .wrap{padding:20px;max-width:1480px;margin:0 auto}
  .slot{margin-bottom:28px}
  .slot-title{font-size:13px;letter-spacing:0.1em;text-transform:uppercase;opacity:.85;padding-bottom:6px;margin-bottom:10px;border-bottom:1px solid #333;display:flex;justify-content:space-between}
  .slot-title .hint{font-size:11px;opacity:.55;font-weight:400;text-transform:none;letter-spacing:.04em}
  .row{display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px}
  .card{display:flex;flex-direction:column;gap:6px;background:#222;border-radius:8px;padding:10px}
  .bar{display:flex;justify-content:space-between;align-items:center;font-size:10px;opacity:.85;gap:6px}
  .bar .label{font-weight:600;letter-spacing:0.02em;opacity:.9;flex:1;line-height:1.3}
  .bar .meta{display:flex;gap:6px;opacity:.55;white-space:nowrap}
  img{width:100%;display:block;border-radius:4px;background:#000;aspect-ratio:1080/1350;object-fit:cover}
  .err{color:#ff8c7a;background:#2a1414;padding:8px;border-radius:6px;font-family:monospace;font-size:10px;white-space:pre-wrap;max-height:120px;overflow:auto}
  .legend{position:sticky;top:0;background:#1a1a1aee;backdrop-filter:blur(6px);padding:10px 0;font-size:12px;letter-spacing:0.06em;text-transform:uppercase;opacity:.9;z-index:10;margin-bottom:14px}
</style></head>
<body><div class="wrap">
  <div class="legend">6 hue families × 3 candidates · forms borrowed from old 01a/02a/05a · pick 1 per slot</div>
${slots.map(slot => {
  const slotVariants = variants.filter(v => v.slot === slot);
  const family = slotVariants[0].family;
  const pattern = slotVariants[0].pattern;
  return `
  <div class="slot">
    <div class="slot-title"><span>Card ${slot} · ${family.toUpperCase()} family</span><span class="hint">Pattern ${pattern} · pick α / β / γ</span></div>
    <div class="row">
      ${slotVariants.map(v => `
        <div class="card" id="${v.key}">
          <div class="bar">
            <span class="label">${v.label}</span>
            <span class="meta"><span id="v-${v.key}">v—</span><span id="t-${v.key}">—</span></span>
          </div>
          <div id="err-${v.key}"></div>
          <img id="img-${v.key}" alt="${v.label}" />
        </div>`).join('')}
    </div>
  </div>`;
}).join('')}
</div>
<script>
const keys = ${JSON.stringify(variants.map((v) => v.key))};
const cur = Object.fromEntries(keys.map((k) => [k, -1]));
async function poll() {
  try {
    const r = await fetch('/state', { cache: 'no-store' });
    const all = await r.json();
    for (const k of keys) {
      const s = all[k] || {};
      const vEl = document.getElementById('v-' + k);
      const tEl = document.getElementById('t-' + k);
      const errEl = document.getElementById('err-' + k);
      if (vEl) vEl.textContent = 'v' + (s.version || 0);
      if (tEl) tEl.textContent = s.rendering ? 'rendering…' : (s.ms ? s.ms + 'ms' : 'idle');
      if (errEl) {
        errEl.className = s.error ? 'err' : '';
        errEl.textContent = s.error || '';
      }
      if ((s.version || 0) !== cur[k]) {
        cur[k] = s.version || 0;
        const img = document.getElementById('img-' + k);
        if (img) img.src = '/img/' + k + '?v=' + cur[k];
      }
    }
  } catch {}
}
setInterval(poll, 700);
poll();
</script></body></html>`;

const server = http.createServer(async (req, res) => {
  if (req.url === '/' || req.url === '/index.html') {
    res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
    res.end(PAGE);
    return;
  }
  if (req.url === '/state') {
    res.writeHead(200, { 'content-type': 'application/json', 'cache-control': 'no-store' });
    res.end(JSON.stringify(state));
    return;
  }
  const imgMatch = req.url?.match(/^\/img\/([a-z0-9]+)/);
  if (imgMatch) {
    try {
      const buf = await readFile(path.join(OUT_DIR, `${imgMatch[1]}.png`));
      res.writeHead(200, { 'content-type': 'image/png', 'cache-control': 'no-store' });
      res.end(buf);
    } catch {
      res.writeHead(404); res.end();
    }
    return;
  }
  res.writeHead(404); res.end();
});

server.listen(PORT, () => {
  console.log(`judge fondos preview at http://localhost:${PORT}/`);
  for (const v of variants) renderOne(v);
});
