/**
 * @typedef {Object} AisEvent
 * @property {string} slug
 * @property {string} date  ISO date string, YYYY-MM-DD
 */

/**
 * Split events into upcoming (today or later, soonest first) and
 * past (before today, most recent first). Comparison is date-only.
 * @param {AisEvent[]} events
 * @param {Date} [now]
 * @returns {{ upcoming: AisEvent[], past: AisEvent[] }}
 */
export function splitEvents(events, now = new Date()) {
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const upcoming = [];
  const past = [];
  for (const ev of events) {
    const d = new Date(ev.date + 'T00:00:00');
    if (d >= today) upcoming.push(ev);
    else past.push(ev);
  }
  upcoming.sort((a, b) => a.date.localeCompare(b.date));
  past.sort((a, b) => b.date.localeCompare(a.date));
  return { upcoming, past };
}
