import { test } from 'node:test';
import assert from 'node:assert/strict';
import data from '../src/data/hackathon.json' with { type: 'json' };

test('hackathon has 5 tracks with the new shape', () => {
  assert.equal(data.tracks.length, 5);
  const accents = data.tracks.map((t) => t.accent);
  assert.deepEqual(accents, ['is-green', 'is-coral', 'is-blue', 'is-yellow', 'is-green']);
  for (const t of data.tracks) {
    assert.equal(typeof t.titleEs, 'string');
    assert.equal(typeof t.titleEn, 'string');
    assert.ok(Array.isArray(t.subareas) && t.subareas.length >= 1);
    for (const s of t.subareas) {
      assert.equal(typeof s.es, 'string');
      assert.equal(typeof s.en, 'string');
    }
  }
});

test('hackathon has 4 named judges with affiliation only', () => {
  assert.equal(data.judges.length, 4);
  const names = data.judges.map((j) => j.name);
  assert.deepEqual(names, [
    'Melissa Robles',
    'Catalina Bernal',
    'Juan Pablo Liévano',
    'Steve Hege',
  ]);
  for (const j of data.judges) {
    assert.equal(typeof j.affiliationEs, 'string');
    assert.equal(typeof j.affiliationEn, 'string');
    assert.equal(j.email, undefined);
    assert.equal(j.phone, undefined);
  }
});

test('no em-dash placeholder remains in schedule times', () => {
  for (const day of data.schedule) {
    for (const ev of day.events) {
      assert.notEqual(ev.time, '—');
      assert.equal(ev.time, '');
    }
  }
});
