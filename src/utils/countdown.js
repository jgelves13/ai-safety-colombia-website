/**
 * Whole days from `now` until `isoDate` (YYYY-MM-DD), never negative.
 *
 * The target is anchored to 00:00 Colombia time (-05:00) so the result is
 * identical whether it runs on the UTC build server (SSR) or in the
 * visitor's browser. This removes the SSR/client drift and timezone
 * mismatch the old `new Date(date + 'T00:00:00')` parsing produced.
 *
 * @param {string} isoDate
 * @param {Date} [now]
 * @returns {number}
 */
export function daysUntil(isoDate, now = new Date()) {
  const target = new Date(isoDate + 'T00:00:00-05:00');
  return Math.max(0, Math.ceil((target.getTime() - now.getTime()) / 86400000));
}
