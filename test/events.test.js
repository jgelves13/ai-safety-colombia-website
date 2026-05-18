import { test } from 'node:test';
import assert from 'node:assert/strict';
import { splitEvents } from '../src/utils/events.js';

const now = new Date('2026-05-17T12:00:00');

const sample = [
  { slug: 'a', date: '2024-08-16' },
  { slug: 'b', date: '2026-11-08' },
  { slug: 'c', date: '2024-09-20' },
  { slug: 'd', date: '2026-06-19' },
];

test('past events are everything before today, newest first', () => {
  const { past } = splitEvents(sample, now);
  assert.deepEqual(past.map(e => e.slug), ['c', 'a']);
});

test('upcoming events are today-or-later, soonest first', () => {
  const { upcoming } = splitEvents(sample, now);
  assert.deepEqual(upcoming.map(e => e.slug), ['d', 'b']);
});

test('an event dated exactly today counts as upcoming', () => {
  const { upcoming } = splitEvents([{ slug: 'x', date: '2026-05-17' }], now);
  assert.deepEqual(upcoming.map(e => e.slug), ['x']);
});

test('empty input yields empty sections', () => {
  const { upcoming, past } = splitEvents([], now);
  assert.deepEqual(upcoming, []);
  assert.deepEqual(past, []);
});
