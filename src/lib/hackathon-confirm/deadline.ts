// Confirmation window for selected participants.
// The acceptance emails still tell people the window closes Monday 2026-06-15
// 18:00 America/Bogota (UTC-5), but per Jose (2026-06-15) we keep ACCEPTING late
// confirmations after that hour — the gate is lifted so nobody who replies a bit
// late is locked out. The displayed copy is unchanged; only the hard block is
// pushed far into the future so `isPastConfirmDeadline()` never fires.
export const CONFIRM_DEADLINE_UTC_MS = Date.parse('2027-12-31T23:00:00Z');

export const CONFIRM_DEADLINE_ISO = '2027-12-31T23:00:00Z';

export function isPastConfirmDeadline(now: number = Date.now()): boolean {
  return now > CONFIRM_DEADLINE_UTC_MS;
}
