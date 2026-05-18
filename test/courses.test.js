import { test } from 'node:test';
import assert from 'node:assert/strict';
import data from '../src/data/courses.json' with { type: 'json' };

test('every course has complete bilingual fields and a BlueDot URL', () => {
  assert.ok(Array.isArray(data.courses) && data.courses.length >= 1);
  for (const c of data.courses) {
    for (const k of [
      'slug',
      'titleEs',
      'titleEn',
      'metaEs',
      'metaEn',
      'audienceEs',
      'audienceEn',
      'descEs',
      'descEn',
    ]) {
      assert.ok(c[k] && typeof c[k] === 'string', `${c.slug} has ${k}`);
    }
    assert.match(c.url, /^https:\/\/bluedot\.org\/courses\//);
    assert.match(c.url, new RegExp(`/${c.slug}$`));
    assert.ok(['is-green', 'is-coral', 'is-blue', 'is-yellow'].includes(c.accent));
  }
});

test('course slugs are unique', () => {
  const slugs = data.courses.map((c) => c.slug);
  assert.equal(new Set(slugs).size, slugs.length);
});

test('no deadline or date language in course copy', () => {
  // Jose asked for course detail but explicitly no deadlines/dates.
  const datey =
    /\b(deadline|fecha l[ií]mite|apply by|aplica antes|cierr[ae]|enrol(?:lment)? closes|inscripci[oó]n cierra|\d{4}-\d{2}-\d{2})\b/i;
  for (const c of data.courses) {
    for (const k of ['metaEs', 'metaEn', 'audienceEs', 'audienceEn', 'descEs', 'descEn']) {
      assert.ok(!datey.test(c[k]), `${c.slug}.${k} has no deadline/date language`);
    }
  }
});

test('no em dash in course prose (house style)', () => {
  for (const c of data.courses) {
    for (const k of ['audienceEs', 'audienceEn', 'descEs', 'descEn']) {
      assert.ok(!c[k].includes('—'), `${c.slug}.${k} has no em dash`);
    }
  }
});
