import { writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { PROJECT_ROOT } from './lib';
import globeFlyer from './_v6n-01-globe-en';
import { GLOBE_LABELS, GlobeVariant } from './_globes';

async function main() {
  const { default: sharp } = await import('sharp');
  const distDir = path.join(PROJECT_ROOT, 'scripts', 'flyers', 'dist', 'globe-compare');
  await mkdir(distDir, { recursive: true });

  const variants: GlobeVariant[] = ['A', 'B', 'C', 'D'];

  for (const v of variants) {
    const result = await globeFlyer(v);
    const pngPath = path.join(distDir, `01-en-globe-${v}.png`);
    await writeFile(pngPath, result.png);
    console.log(`wrote ${pngPath} (${result.png.length} bytes)`);

    const jpegBuf = await sharp(result.png)
      .jpeg({ quality: 90, progressive: true, chromaSubsampling: '4:4:4' })
      .toBuffer();
    const jpegPath = path.join(distDir, `01-en-globe-${v}.jpeg`);
    await writeFile(jpegPath, jpegBuf);
    console.log(`wrote ${jpegPath} (${jpegBuf.length} bytes)`);
  }

  const cards = variants.map(v => `
    <figure class="card">
      <figcaption><strong>${v}</strong> · ${GLOBE_LABELS[v]}</figcaption>
      <img src="01-en-globe-${v}.jpeg" alt="globe variant ${v}"/>
    </figure>
  `).join('');

  const indexHtml = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<title>Globe variants — AISC Hackathon EN flyer</title>
<style>
  :root { color-scheme: light; }
  html, body { margin:0; padding:0; background:#1F1812; color:#FBF6EC; font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Inter, sans-serif; }
  header { padding:28px 32px 8px; }
  header h1 { font-size:18px; font-weight:700; margin:0 0 4px 0; letter-spacing:0.02em; }
  header p { font-size:13px; opacity:0.7; margin:0; }
  main { display:grid; grid-template-columns:repeat(2, 1fr); gap:24px; padding:24px 32px 48px; }
  .card { margin:0; background:#2A2118; border-radius:12px; padding:14px 14px 18px; box-shadow:0 1px 0 rgba(255,255,255,0.04) inset; }
  .card figcaption { font-size:13px; opacity:0.85; margin:0 0 10px 4px; letter-spacing:0.04em; }
  .card img { width:100%; height:auto; display:block; border-radius:6px; }
  @media (max-width:1200px) { main { grid-template-columns:1fr; } }
</style>
</head>
<body>
<header>
  <h1>AISC Hackathon — globe variants (EN)</h1>
  <p>4 globe designs applied to the same 01-en flyer. Pick a winner.</p>
</header>
<main>
  ${cards}
</main>
</body>
</html>`;

  await writeFile(path.join(distDir, 'index.html'), indexHtml, 'utf8');
  console.log(`wrote ${path.join(distDir, 'index.html')}`);

  const serveMjs = `import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const PORT = 5192;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg':  'image/svg+xml',
  '.css':  'text/css; charset=utf-8',
};

const server = createServer(async (req, res) => {
  try {
    let urlPath = decodeURIComponent((req.url || '/').split('?')[0]);
    if (urlPath === '/') urlPath = '/index.html';
    const full = path.join(ROOT, urlPath);
    if (!full.startsWith(ROOT)) { res.writeHead(403).end(); return; }
    const s = await stat(full).catch(() => null);
    if (!s || !s.isFile()) { res.writeHead(404).end('not found'); return; }
    const buf = await readFile(full);
    const ext = path.extname(full).toLowerCase();
    res.writeHead(200, {
      'content-type': MIME[ext] || 'application/octet-stream',
      'cache-control': 'no-store',
      'content-length': buf.length,
    });
    res.end(buf);
  } catch (e) {
    res.writeHead(500).end('error');
  }
});

server.listen(PORT, () => console.log('globe-compare preview on http://localhost:' + PORT + '/'));
`;
  await writeFile(path.join(distDir, '_serve.mjs'), serveMjs, 'utf8');
  console.log(`wrote ${path.join(distDir, '_serve.mjs')}`);
}

main().catch((e) => { console.error(e); process.exit(1); });
