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
  hubTrack: 'technical' | 'security' | 'responsible' | 'governance' | 'either';
  hubTravel: 'bogota' | 'colombia_self' | 'colombia_help' | 'international';
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
  'hubTravel',
];

const TRACK_VALUES = new Set(['technical', 'security', 'responsible', 'governance', 'either']);
const TRAVEL_VALUES = new Set(['bogota', 'colombia_self', 'colombia_help', 'international']);

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
  if (!TRAVEL_VALUES.has(String(r.hubTravel))) return { ok: false, error: 'Invalid travel' };

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
      scholar: typeof r.scholar === 'string' && r.scholar.trim() ? r.scholar.trim().slice(0, 300) : undefined,
      career: String(r.career).trim().slice(0, 800),
      reason: String(r.reason).trim().slice(0, 1500),
      hubProblem: String(r.hubProblem).trim().slice(0, 1500),
      hubTrack: String(r.hubTrack) as ApplyPayload['hubTrack'],
      hubTravel: String(r.hubTravel) as ApplyPayload['hubTravel'],
      hubAccess: typeof r.hubAccess === 'string' && r.hubAccess.trim() ? r.hubAccess.trim().slice(0, 800) : undefined,
      hubExtra: typeof r.hubExtra === 'string' && r.hubExtra.trim() ? r.hubExtra.trim().slice(0, 800) : undefined,
    },
  };
}

export function trackLabel(t: ApplyPayload['hubTrack'], locale: 'es' | 'en'): string {
  const map = {
    technical: { es: 'Technical AI Safety', en: 'Technical AI Safety' },
    security: { es: 'AI Security', en: 'AI Security' },
    responsible: { es: 'IA Responsable', en: 'Responsible AI' },
    governance: { es: 'Gobernanza de IA', en: 'AI Governance' },
    either: { es: 'Sin preferencia', en: 'No preference' },
  };
  return map[t][locale];
}

export function travelLabel(t: ApplyPayload['hubTravel'], locale: 'es' | 'en'): string {
  const map = {
    bogota: { es: 'Vive en Bogotá o área metropolitana', en: 'Lives in Bogotá or the metropolitan area' },
    colombia_self: { es: 'Otra ciudad en Colombia — puede cubrir su viaje', en: 'Another Colombian city — can cover own travel' },
    colombia_help: { es: 'Otra ciudad en Colombia — necesita hospedaje o apoyo de viaje', en: 'Another Colombian city — needs lodging or travel support' },
    international: { es: 'Fuera de Colombia', en: 'Outside Colombia' },
  };
  return map[t][locale];
}
