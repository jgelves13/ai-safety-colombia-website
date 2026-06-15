import assert from 'node:assert/strict';
import { existsSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import sharp from 'sharp';

const here = dirname(fileURLToPath(import.meta.url));
const renderPath = join(here, 'render.ts');
const pngPath = join(here, 'dist', 'formatting-v02-editorial-poster.png');

assert.ok(existsSync(renderPath), 'formatting-v02-editorial-poster/render.ts should exist');

const result = spawnSync('npx', ['tsx', renderPath], {
  cwd: join(here, '..', '..', '..'),
  encoding: 'utf-8',
  shell: process.platform === 'win32',
});

assert.equal(result.status, 0, result.stderr || result.stdout);
assert.ok(existsSync(pngPath), 'renderer should write dist/formatting-v02-editorial-poster.png');
assert.ok(statSync(pngPath).size > 100_000, 'PNG should be a nontrivial rendered poster');

const metadata = await sharp(pngPath).metadata();
assert.equal(metadata.format, 'png');
assert.equal(metadata.width, 1080);
assert.equal(metadata.height, 1350);

console.log(`Validated ${pngPath}`);
