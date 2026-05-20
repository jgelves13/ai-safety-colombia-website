import { test } from 'node:test';
import assert from 'node:assert/strict';
import data from '../src/data/hackathon.json' with { type: 'json' };

test('hackathon has 4 tracks; each has a clear description plus subareas', () => {
  assert.equal(data.tracks.length, 4);
  const accents = data.tracks.map((t) => t.accent);
  assert.deepEqual(accents, ['is-green', 'is-coral', 'is-blue', 'is-yellow']);
  for (const t of data.tracks) {
    assert.equal(typeof t.titleEs, 'string');
    assert.equal(typeof t.titleEn, 'string');
    // The card now shows a short, always-visible explanation of the
    // topic, with the subareas listed as readable chips below it.
    assert.ok(t.descEs && typeof t.descEs === 'string');
    assert.ok(t.descEn && typeof t.descEn === 'string');
    assert.ok(Array.isArray(t.subareas) && t.subareas.length >= 1);
    for (const s of t.subareas) {
      assert.ok(s.es && typeof s.es === 'string');
      assert.ok(s.en && typeof s.en === 'string');
    }
  }
});

test('regions drive the Global South map with Bogotá as our hub', () => {
  assert.ok(Array.isArray(data.regions) && data.regions.length === 3);
  for (const r of data.regions) {
    assert.ok(r.nameEs && r.nameEn);
    assert.match(r.accent, /^is-(green|coral|blue|yellow)$/);
    assert.ok(r.teamsEs && r.teamsEn && r.prizeEs && r.prizeEn);
    assert.ok(Array.isArray(r.cities) && r.cities.length >= 1);
    for (const c of r.cities) assert.ok(c.name && typeof c.name === 'string');
  }
  const allCities = data.regions.flatMap((r) => r.cities);
  const bogota = allCities.filter((c) => c.bogota === true);
  assert.equal(bogota.length, 1, 'exactly one Bogotá hub');
  assert.equal(bogota[0].name, 'Bogotá');
});

test('each judge declares the topic they will evaluate', () => {
  for (const j of data.judges) {
    assert.ok(j.evalTopicEs && typeof j.evalTopicEs === 'string');
    assert.ok(j.evalTopicEn && typeof j.evalTopicEn === 'string');
  }
});

test('prize block carries Apart success stories and a pathway label', () => {
  assert.ok(data.pathwayLabelEs && data.pathwayLabelEn);
  const p = data.prizesDetail;
  assert.ok(p.successTitleEs && p.successTitleEn);
  assert.ok(Array.isArray(p.successExamples) && p.successExamples.length >= 3);
  for (const ex of p.successExamples) {
    assert.ok(ex.es && typeof ex.es === 'string');
    assert.ok(ex.en && typeof ex.en === 'string');
    assert.match(ex.url, /^https:\/\/apartresearch\.com\//);
  }
});

test('LAWS is a subarea of AI Governance with no Bogotá reference', () => {
  const gov = data.tracks.find((t) => t.titleEn === 'AI Governance');
  assert.ok(gov, 'AI Governance track exists');
  const subEn = gov.subareas.map((s) => s.en);
  assert.ok(
    subEn.includes('Lethal autonomous weapons systems'),
    'LAWS subarea present under AI Governance'
  );
  // The Bogotá-led reference was removed everywhere in the tracks.
  for (const t of data.tracks) {
    for (const s of t.subareas) {
      assert.ok(!/bogot/i.test(s.es), `no Bogotá reference in "${s.es}"`);
      assert.ok(!/bogot/i.test(s.en), `no Bogotá reference in "${s.en}"`);
    }
  }
  // No standalone LAWS track remains.
  assert.equal(
    data.tracks.filter((t) => /LAWS|armas autónomas letales/i.test(t.titleEn + t.titleEs)).length,
    0
  );
});

test('judges/speakers expose name + affiliation, optional bio/linkedin, no PII', () => {
  assert.equal(data.judges.length, 5);
  const names = data.judges.map((j) => j.name);
  assert.deepEqual(names, [
    'Melissa Robles',
    'Catalina Bernal',
    'Juan Pablo Liévano',
    'Steve Hege',
    'Wanda Muñoz',
  ]);
  for (const p of [...data.judges, ...data.speakers]) {
    assert.equal(typeof p.affiliationEs, 'string');
    assert.equal(typeof p.affiliationEn, 'string');
    assert.equal(p.email, undefined);
    assert.equal(p.phone, undefined);
    assert.ok(
      ['inperson', 'remote', 'tbc'].includes(p.attendance),
      `${p.name} has a valid attendance`
    );
    if (p.linkedin !== undefined) {
      assert.match(p.linkedin, /^https:\/\/www\.linkedin\.com\//);
    }
    if (p.bioEs !== undefined) assert.equal(typeof p.bioEs, 'string');
    if (p.bioEn !== undefined) assert.equal(typeof p.bioEn, 'string');
  }
});

test('attendance mapping matches the confirmed roster', () => {
  const byName = Object.fromEntries(
    [...data.speakers, ...data.judges].map((p) => [p.name, p.attendance])
  );
  assert.equal(byName['Juan Felipe Cerón'], 'remote');
  assert.equal(byName['Alejandro Toro'], 'inperson');
  assert.equal(byName['Melissa Robles'], 'inperson');
  assert.equal(byName['Catalina Bernal'], 'tbc');
  assert.equal(byName['Juan Pablo Liévano'], 'tbc');
  assert.equal(byName['Steve Hege'], 'inperson');
  assert.equal(byName['Wanda Muñoz'], 'remote');
});

test('no em-dash placeholder remains in schedule times', () => {
  for (const day of data.schedule) {
    for (const ev of day.events) {
      assert.notEqual(ev.time, '—');
      assert.equal(ev.time, '');
    }
  }
});
