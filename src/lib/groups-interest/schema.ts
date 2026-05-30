export const AREA_VALUES = [
  'alignment',
  'economics-of-tai',
  'technical-ai-safety',
  'ai-governance',
  'agi-strategy',
] as const;

export type AreaSlug = (typeof AREA_VALUES)[number];

export interface InterestPayload {
  locale: 'es' | 'en';
  firstName: string;
  lastName: string;
  email: string;
  location: string;
  linkedin?: string;
  about: string;
  areas: AreaSlug[];
  extra?: string;
}

const REQUIRED_STRING_FIELDS: (keyof InterestPayload)[] = [
  'firstName',
  'lastName',
  'email',
  'location',
  'about',
];

const AREA_SET = new Set<string>(AREA_VALUES);

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

  const locale = r.locale === 'en' ? 'en' : 'es';

  return {
    ok: true,
    data: {
      locale,
      firstName: String(r.firstName).trim().slice(0, 100),
      lastName: String(r.lastName).trim().slice(0, 100),
      email: email.slice(0, 200),
      location: String(r.location).trim().slice(0, 200),
      linkedin: typeof r.linkedin === 'string' && r.linkedin.trim() ? r.linkedin.trim().slice(0, 300) : undefined,
      about: String(r.about).trim().slice(0, 1500),
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
