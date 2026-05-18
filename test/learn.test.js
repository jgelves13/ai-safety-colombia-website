import { test } from 'node:test';
import assert from 'node:assert/strict';
import data from '../src/data/learn.json' with { type: 'json' };

test('learn items have complete bilingual fields and a https URL', () => {
  assert.ok(Array.isArray(data) && data.length >= 3);
  for (const i of data) {
    for (const k of [
      'titleEs',
      'titleEn',
      'sourceEs',
      'sourceEn',
      'descEs',
      'descEn',
      'metaEs',
      'metaEn',
      'url',
    ]) {
      assert.ok(i[k] && typeof i[k] === 'string', `${i.kind} has ${k}`);
    }
    assert.match(i.url, /^https:\/\//, `${i.kind} url is https`);
    assert.ok(['video', 'course', 'read'].includes(i.kind), `${i.kind} kind is valid`);
    assert.ok(['is-green', 'is-coral', 'is-blue', 'is-yellow'].includes(i.accent));
  }
});

test('learn covers one video, one course, and one read', () => {
  const kinds = data.map((i) => i.kind);
  assert.ok(kinds.includes('video'));
  assert.ok(kinds.includes('course'));
  assert.ok(kinds.includes('read'));
});

test('no em dash in learn prose (house style)', () => {
  for (const i of data) {
    for (const k of ['descEs', 'descEn', 'metaEs', 'metaEn']) {
      assert.ok(!i[k].includes('—'), `${i.kind}.${k} has no em dash`);
    }
  }
});
