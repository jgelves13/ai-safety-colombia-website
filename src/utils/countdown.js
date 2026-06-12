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

/**
 * State of an application deadline that closes at 23:59 Colombia time on
 * `isoDate`. Used by the hackathon banner so the countdown next to the
 * "Regístrate" CTA reflects the time left to APPLY, not the event start.
 *
 *  - `{ state: 'open',   days: N }` — N whole days before the deadline day
 *  - `{ state: 'today',  days: 0 }` — it is the deadline day (closes tonight)
 *  - `{ state: 'closed', days: 0 }` — the deadline has passed
 *
 * @param {string} isoDate  deadline day, YYYY-MM-DD
 * @param {Date} [now]
 * @returns {{ state: 'open' | 'today' | 'closed', days: number }}
 */
export function deadlineState(isoDate, now = new Date()) {
  const endOfDay = new Date(isoDate + 'T23:59:59-05:00');
  const startOfDay = new Date(isoDate + 'T00:00:00-05:00');
  if (endOfDay.getTime() - now.getTime() <= 0) return { state: 'closed', days: 0 };
  const days = Math.ceil((startOfDay.getTime() - now.getTime()) / 86400000);
  return days <= 0 ? { state: 'today', days: 0 } : { state: 'open', days };
}
