export const AREA_VALUES = [
  'alignment',
  'economics-of-tai',
  'technical-ai-safety',
  'ai-governance',
  'agi-strategy',
] as const;

export type AreaSlug = (typeof AREA_VALUES)[number];

export const AVAILABILITY_VALUES = [
  'Entre semana en la mañana',
  'Entre semana en la tarde',
  'Entre semana en la noche',
  'Sábado en la mañana',
  'Sábado en la tarde',
  'Sábado en la noche',
  'Domingo en la mañana',
  'Domingo en la tarde',
  'Domingo en la noche',
] as const;

export type AvailabilitySlot = (typeof AVAILABILITY_VALUES)[number];

export interface InterestPayload {
  locale: 'es' | 'en';
  firstName: string;
  lastName: string;
  email: string;
  location: string;
  preferredStart: string;
  availability: AvailabilitySlot[];
  linkedin?: string;
  about?: string;
  areas: AreaSlug[];
  extra?: string;
}

// `about` is intentionally NOT required: the public /grupos form asks for it
// (enforced client-side), but the invite-only link for people we already know
// (/grupos/invitacion) omits it. The server accepts a submission without it.
const REQUIRED_STRING_FIELDS: (keyof InterestPayload)[] = [
  'firstName',
  'lastName',
  'email',
  'location',
];

const AREA_SET = new Set<string>(AREA_VALUES);
const AVAILABILITY_SET = new Set<string>(AVAILABILITY_VALUES);

export function validate(
  raw: unknown,
): { ok: true; data: InterestPayload } | { ok: false; error: string } {
  if (!raw || typeof raw !== 'object') return { ok: false, error: 'Invalid payload' };
  const r = raw as Record<string, unknown>;

  for (const f of REQUIRED_STRING_FIELDS) {
    const v = r[f];
    if (typeof v !== 'string' || v.trim().length === 0) {
      return { ok: false, error: `Missing field: ${f}` };
    }
  }

  const email = String(r.email).trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: 'Invalid email' };
  }

  if (!Array.isArray(r.areas) || r.areas.length === 0) {
    return { ok: false, error: 'Pick at least one area' };
  }
  const areas: AreaSlug[] = [];
  for (const a of r.areas) {
    if (typeof a !== 'string' || !AREA_SET.has(a)) {
      return { ok: false, error: `Invalid area: ${String(a)}` };
    }
    if (!areas.includes(a as AreaSlug)) areas.push(a as AreaSlug);
  }

  // Preferred start: a calendar date (YYYY-MM-DD). Required.
  const preferredStart = typeof r.preferred_start === 'string' ? r.preferred_start.trim() : '';
  if (!/^\d{4}-\d{2}-\d{2}$/.test(preferredStart)) {
    return { ok: false, error: 'Invalid start date' };
  }

  if (!Array.isArray(r.availability) || r.availability.length === 0) {
    return { ok: false, error: 'Pick at least one time slot' };
  }
  const availability: AvailabilitySlot[] = [];
  for (const s of r.availability) {
    if (typeof s !== 'string' || !AVAILABILITY_SET.has(s)) {
      return { ok: false, error: `Invalid time slot: ${String(s)}` };
    }
    if (!availability.includes(s as AvailabilitySlot)) availability.push(s as AvailabilitySlot);
  }

  const locale = r.locale === 'en' ? 'en' : 'es';

  return {
    ok: true,
    data: {
      locale,
      firstName: String(r.firstName).trim().slice(0, 100),
      lastName: String(r.lastName).trim().slice(0, 100),
      email: email.slice(0, 200),
      location: String(r.location).trim().slice(0, 200),
      preferredStart,
      availability,
      linkedin: typeof r.linkedin === 'string' && r.linkedin.trim() ? r.linkedin.trim().slice(0, 300) : undefined,
      about: typeof r.about === 'string' && r.about.trim() ? String(r.about).trim().slice(0, 1500) : undefined,
      areas,
      extra: typeof r.extra === 'string' && r.extra.trim() ? r.extra.trim().slice(0, 1000) : undefined,
    },
  };
}

export function areaLabel(a: AreaSlug, locale: 'es' | 'en'): string {
  const map: Record<AreaSlug, { es: string; en: string }> = {
    alignment: { es: 'Alineación de IA', en: 'AI Alignment' },
    'economics-of-tai': { es: 'Economía de la IA transformadora', en: 'Economics of Transformative AI' },
    'technical-ai-safety': { es: 'Seguridad técnica de IA', en: 'Technical AI Safety' },
    'ai-governance': { es: 'Gobernanza de IA de frontera', en: 'Frontier AI Governance' },
    'agi-strategy': { es: 'Estrategia de AGI', en: 'AGI Strategy' },
  };
  return map[a][locale];
}
