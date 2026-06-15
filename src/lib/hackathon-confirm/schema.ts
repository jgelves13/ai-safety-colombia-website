export interface ConfirmPayload {
  locale: 'es' | 'en';
  firstName: string;
  lastName?: string;
  email: string;
  // Single toggle confirming the whole schedule: Friday 19 (4–9 PM opening),
  // Saturday 20 and Sunday 21 all day. The hackathon is intensive and teams
  // work together start to finish, so it's all-or-nothing, not per-day.
  available: boolean;
  whatsappJoined: boolean; // mandatory: confirms they joined the WhatsApp group
  notes?: string;
  // "Invite a friend" perk — only the hand-picked few whose token grants it.
  // When they opt in, all four fields are required; the invited friend gets a
  // guaranteed spot and we reach out to them manually afterwards.
  friendName?: string;
  friendEmail?: string;
  friendWhatsapp?: string;
  friendLinkedin?: string;
}

// Form posts checkboxes; absent = unchecked. Treat 'on'/'true'/true as true.
function asBool(v: unknown): boolean {
  return v === true || v === 'true' || v === 'on' || v === '1';
}

export function validate(
  raw: unknown
): { ok: true; data: ConfirmPayload } | { ok: false; error: string } {
  if (!raw || typeof raw !== 'object') return { ok: false, error: 'Invalid payload' };
  const r = raw as Record<string, unknown>;

  const firstName = typeof r.firstName === 'string' ? r.firstName.trim() : '';
  if (!firstName) return { ok: false, error: 'Missing field: firstName' };

  const email = typeof r.email === 'string' ? r.email.trim() : '';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: 'Invalid email' };
  }

  const available = asBool(r.available);
  if (!available) return { ok: false, error: 'availability_required' };

  const whatsappJoined = asBool(r.whatsappJoined);
  if (!whatsappJoined) return { ok: false, error: 'whatsapp_required' };

  const locale = r.locale === 'en' ? 'en' : 'es';

  // Friend invite (optional). Only honored when they opt in; if so, all four
  // fields are mandatory. The route already strips this unless the token grants
  // the perk, so by the time we get here it's safe to trust friendInvite.
  let friendName: string | undefined;
  let friendEmail: string | undefined;
  let friendWhatsapp: string | undefined;
  let friendLinkedin: string | undefined;
  if (asBool(r.friendInvite)) {
    friendName = typeof r.friendName === 'string' ? r.friendName.trim() : '';
    if (!friendName) return { ok: false, error: 'friend_name_required' };
    friendEmail = typeof r.friendEmail === 'string' ? r.friendEmail.trim() : '';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(friendEmail)) return { ok: false, error: 'friend_email_invalid' };
    friendWhatsapp = typeof r.friendWhatsapp === 'string' ? r.friendWhatsapp.trim() : '';
    if (!friendWhatsapp) return { ok: false, error: 'friend_whatsapp_required' };
    friendLinkedin = typeof r.friendLinkedin === 'string' ? r.friendLinkedin.trim() : '';
    if (!friendLinkedin) return { ok: false, error: 'friend_linkedin_required' };
  }

  return {
    ok: true,
    data: {
      locale,
      firstName: firstName.slice(0, 100),
      lastName: typeof r.lastName === 'string' && r.lastName.trim() ? r.lastName.trim().slice(0, 100) : undefined,
      email: email.slice(0, 200),
      available,
      whatsappJoined,
      notes: typeof r.notes === 'string' && r.notes.trim() ? r.notes.trim().slice(0, 1000) : undefined,
      friendName: friendName ? friendName.slice(0, 100) : undefined,
      friendEmail: friendEmail ? friendEmail.slice(0, 200) : undefined,
      friendWhatsapp: friendWhatsapp ? friendWhatsapp.slice(0, 50) : undefined,
      friendLinkedin: friendLinkedin ? friendLinkedin.slice(0, 300) : undefined,
    },
  };
}
