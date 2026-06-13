// 2026-06-12 23:59:59 America/Bogota (UTC-5) = 2026-06-13 04:59:59 UTC
export const HARD_DEADLINE_UTC_MS = Date.parse('2026-06-13T04:59:59Z');

export const HARD_DEADLINE_ISO = '2026-06-13T04:59:59Z';

export function isPastDeadline(now: number = Date.now()): boolean {
  return now > HARD_DEADLINE_UTC_MS;
}
