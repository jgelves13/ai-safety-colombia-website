import type { ApplyPayload } from './schema';

const GEMINI_MODEL = 'gemini-2.5-flash';
const GEMINI_URL = (key: string) =>
  `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${encodeURIComponent(key)}`;

const FREE_TEXT_KEYS: (keyof ApplyPayload)[] = [
  'location',
  'career',
  'reason',
  'hubProblem',
  'hubAccess',
  'hubExtra',
];

export async function translateToEnglish(p: ApplyPayload): Promise<ApplyPayload> {
  if (p.locale === 'en') return p;

  const apiKey = import.meta.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY;
  if (!apiKey) return p;

  const inputs: Record<string, string> = {};
  for (const k of FREE_TEXT_KEYS) {
    const v = p[k];
    if (typeof v === 'string' && v.trim().length > 0) inputs[k] = v;
  }
  if (Object.keys(inputs).length === 0) return p;

  const prompt = [
    'Translate each value below from Spanish to natural English.',
    'Keep proper nouns, technical AI safety terms (alignment, evals, RLHF, red-teaming, oversight, interpretability, etc.), brand names, and URLs unchanged.',
    'Return ONLY a valid JSON object with the same keys and translated string values. No prose, no markdown.',
    '',
    JSON.stringify(inputs, null, 2),
  ].join('\n');

  try {
    const res = await fetch(GEMINI_URL(apiKey), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.1, responseMimeType: 'application/json' },
      }),
    });
    if (!res.ok) return p;
    const json: any = await res.json();
    const text = json?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) return p;
    const parsed = JSON.parse(text);
    const out: ApplyPayload = { ...p };
    for (const k of FREE_TEXT_KEYS) {
      if (typeof parsed[k] === 'string' && parsed[k].length > 0) {
        (out as any)[k] = parsed[k];
      }
    }
    return out;
  } catch {
    return p;
  }
}
