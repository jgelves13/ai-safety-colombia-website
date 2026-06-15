// Hand-picked invitees granted the "invite a friend" perk (an extra spot to
// bring one guest). Normally the perk rides on the signed acceptance link's
// invite flag, but a few of these people got a follow-up acceptance email whose
// link dropped the flag (a resend built without the invite column). So we ALSO
// grant the perk by email here, regardless of the token, so their existing link
// still reveals the guest section. Exact-match, lowercased — same explicit
// allowlist approach as TRAVEL_AID_BY_EMAIL in acceptanceEmail.ts.
//
// This is the canonical list of the 5 who were offered the extra spot. Having
// the already-confirmed ones (Andres, Jairo) here is harmless: it only ever
// SHOWS the section, never hides it, and lets anyone who confirmed via a
// flag-less link come back and add a guest (the API upserts).
export const INVITE_EMAILS: string[] = [
  'eduardoherreraalba@gmail.com', // Eduardo
  'a.mosquerah2@uniandes.edu.co', // Andres
  'torregrosa.ja@gmail.com',      // Jairo
  'danidiaztech@gmail.com',       // Daniel
  'cd.contrerasq@gmail.com',      // Carlos
];

const SET = new Set(INVITE_EMAILS.map((e) => e.toLowerCase()));

export function isInviteEmail(email: string | undefined | null): boolean {
  if (!email) return false;
  return SET.has(String(email).trim().toLowerCase());
}
