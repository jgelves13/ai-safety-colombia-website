export interface ApplyPayload {
  locale: 'es' | 'en';
  firstName: string;
  lastName: string;
  email: string;
  location: string;
  linkedin?: string;
  scholar?: string;
  career: string;
  reason: string;
  hubProblem: string;
  hubTrack: 'technical' | 'security' | 'either';
  hubDays: 'all' | 'some' | 'unsure';
  hubAccess?: string;
  hubExtra?: string;
}

const REQUIRED_FIELDS: (keyof ApplyPayload)[] = [
  'firstName',
  'lastName',
  'email',
  'location',
  'career',
  'reason',
  'hubProblem',
  'hubTrack',
  'hubDays',
];

const TRACK_VALUES = new Set(['technical', 'security', 'either']);
const DAYS_VALUES = new Set(['all', 'some', 'unsure']);

export function validate(raw: unknown): { ok: true; data: ApplyPayload } | { ok: false; error: string } {
  if (!raw || typeof raw !== 'object') return { ok: false, error: 'Invalid payload' };
  const r = raw as Record<string, unknown>;

  for (const f of REQUIRED_FIELDS) {
    const v = r[f];
    if (typeof v !== 'string' || v.trim().length === 0) {
      return { ok: false, error: `Missing field: ${f}` };
    }
  }

  const email = String(r.email).trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: 'Invalid email' };
  }

  if (!TRACK_VALUES.has(String(r.hubTrack))) return { ok: false, error: 'Invalid track' };
  if (!DAYS_VALUES.has(String(r.hubDays))) return { ok: false, error: 'Invalid days' };

  const locale = r.locale === 'en' ? 'en' : 'es';

  return {
    ok: true,
    data: {
      locale,
      firstName: String(r.firstName).trim().slice(0, 100),
      lastName: String(r.lastName).trim().slice(0, 100),
      email: email.slice(0, 200),
      location: String(r.location).trim().slice(0, 200),
      linkedin: typeof r.linkedin === 'string' ? r.linkedin.trim().slice(0, 300) : undefined,
      scholar: typeof r.scholar === 'string' ? r.scholar.trim().slice(0, 300) : undefined,
      career: String(r.career).trim().slice(0, 800),
      reason: String(r.reason).trim().slice(0, 1500),
      hubProblem: String(r.hubProblem).trim().slice(0, 2500),
      hubTrack: String(r.hubTrack) as ApplyPayload['hubTrack'],
      hubDays: String(r.hubDays) as ApplyPayload['hubDays'],
      hubAccess: typeof r.hubAccess === 'string' ? r.hubAccess.trim().slice(0, 800) : undefined,
      hubExtra: typeof r.hubExtra === 'string' ? r.hubExtra.trim().slice(0, 800) : undefined,
    },
  };
}

export function trackLabel(t: ApplyPayload['hubTrack'], locale: 'es' | 'en'): string {
  const map = {
    technical: { es: 'Technical AI Safety', en: 'Technical AI Safety' },
    security: { es: 'AI Security', en: 'AI Security' },
    either: { es: 'Sin preferencia', en: 'No preference' },
  };
  return map[t][locale];
}

export function daysLabel(d: ApplyPayload['hubDays'], locale: 'es' | 'en'): string {
  const map = {
    all: { es: 'Los 3 días completos', en: 'All 3 full days' },
    some: { es: 'Solo algunos bloques', en: 'Only some blocks' },
    unsure: { es: 'No está seguro/a aún', en: 'Not sure yet' },
  };
  return map[d][locale];
}
