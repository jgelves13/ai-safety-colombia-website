import { mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { renderApplicantConfirmation } from '../src/lib/hackathon-apply/emails.ts';
import type { ApplyPayload } from '../src/lib/hackathon-apply/schema.ts';

const base: Omit<ApplyPayload, 'locale'> = {
  firstName: 'María',
  lastName: 'Rodríguez',
  email: 'maria.rodriguez@example.com',
  location: 'Bogotá, Colombia',
  linkedin: 'https://www.linkedin.com/in/maria-rodriguez',
  scholar: '',
  career: 'Investigadora junior en ML, Universidad de los Andes.',
  reason: 'Quiero entender mejor los riesgos de sistemas LLM en producción.',
  hubProblem: 'Jailbreaks en LLMs desplegados por entidades públicas en Colombia.',
  hubTrack: 'security',
  hubDays: 'all',
  hubAccess: '',
  hubExtra: '',
};

const outDir = path.join(process.cwd(), 'tmp', 'email-preview');
mkdirSync(outDir, { recursive: true });

for (const locale of ['es', 'en'] as const) {
  const payload: ApplyPayload = { ...base, locale };
  const { subject, html } = renderApplicantConfirmation(payload, {
    contact: 'contacto@aisafetycolombia.org',
  });
  const file = path.join(outDir, `applicant-confirmation.${locale}.html`);
  writeFileSync(file, html, 'utf8');
  console.log(`[${locale}] ${subject}\n  -> ${file}`);
}
