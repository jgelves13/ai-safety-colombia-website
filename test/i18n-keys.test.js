import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const src = readFileSync(new URL('../src/i18n/ui.ts', import.meta.url), 'utf8');

function occurrences(needle) {
  return src.split(needle).length - 1;
}

const NEW_KEYS = [
  'nav.cta',
  'partners.title',
  'motif.research',
  'motif.community',
  'motif.education',
  'motif.governance',
];

for (const key of NEW_KEYS) {
  test(`i18n key "${key}" exists in both locales`, () => {
    assert.ok(
      occurrences(`'${key}'`) >= 2,
      `expected "${key}" in both es and en blocks of ui.ts`
    );
  });
}
