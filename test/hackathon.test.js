import { test } from 'node:test';
import assert from 'node:assert/strict';
import data from '../src/data/hackathon.json' with { type: 'json' };

test('hackathon has 4 tracks, each with hover descriptions', () => {
  assert.equal(data.tracks.length, 4);
  const accents = data.tracks.map((t) => t.accent);
  assert.deepEqual(accents, ['is-green', 'is-coral', 'is-blue', 'is-yellow']);
  for (const t of data.tracks) {
    assert.equal(typeof t.titleEs, 'string');
    assert.equal(typeof t.titleEn, 'string');
    assert.ok(t.descEs && typeof t.descEs === 'string');
    assert.ok(t.descEn && typeof t.descEn === 'string');
    assert.ok(Array.isArray(t.subareas) && t.subareas.length >= 1);
    for (const s of t.subareas) {
      assert.equal(typeof s.es, 'string');
      assert.equal(typeof s.en, 'string');
    }
  }
});

test('LAWS is folded into the AI Governance track as a Bogotá-led subarea', () => {
  const gov = data.tracks.find((t) => t.titleEn === 'AI Governance');
  assert.ok(gov, 'AI Governance track exists');
  const subEn = gov.subareas.map((s) => s.en);
  assert.ok(
    subEn.some((s) => /Lethal autonomous weapons systems \(Bogotá-led\)/.test(s)),
    'LAWS subarea present under AI Governance'
  );
  // No standalone LAWS track remains.
  assert.equal(
    data.tracks.filter((t) => /LAWS|armas autónomas letales/i.test(t.titleEn + t.titleEs)).length,
    0
  );
});

test('judges/speakers expose name + affiliation, optional bio/linkedin, no PII', () => {
  assert.equal(data.judges.length, 4);
  const names = data.judges.map((j) => j.name);
  assert.deepEqual(names, [
    'Melissa Robles',
    'Catalina Bernal',
    'Juan Pablo Liévano',
    'Steve Hege',
  ]);
  for (const p of [...data.judges, ...data.speakers]) {
    assert.equal(typeof p.affiliationEs, 'string');
    assert.equal(typeof p.affiliationEn, 'string');
    assert.equal(p.email, undefined);
    assert.equal(p.phone, undefined);
    if (p.linkedin !== undefined) {
      assert.match(p.linkedin, /^https:\/\/www\.linkedin\.com\//);
    }
    if (p.bioEs !== undefined) assert.equal(typeof p.bioEs, 'string');
    if (p.bioEn !== undefined) assert.equal(typeof p.bioEn, 'string');
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
