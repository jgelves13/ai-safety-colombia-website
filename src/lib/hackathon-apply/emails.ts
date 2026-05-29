import type { ApplyPayload } from './schema';
import { trackLabel, daysLabel } from './schema';

const RESEND_API = 'https://api.resend.com/emails';

interface SendArgs {
  from: string;
  to: string | string[];
  subject: string;
  html: string;
  replyTo?: string;
}

async function send(args: SendArgs): Promise<{ ok: true } | { ok: false; error: string }> {
  const key = import.meta.env.RESEND_API_KEY || process.env.RESEND_API_KEY;
  if (!key) return { ok: false, error: 'RESEND_API_KEY missing' };

  try {
    const res = await fetch(RESEND_API, {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: args.from,
        to: args.to,
        subject: args.subject,
        html: args.html,
        reply_to: args.replyTo,
      }),
    });
    if (!res.ok) {
      const txt = await res.text().catch(() => '');
      return { ok: false, error: `Resend ${res.status}: ${txt.slice(0, 200)}` };
    }
    return { ok: true };
  } catch (err: any) {
    return { ok: false, error: `Resend fetch failed: ${err?.message || 'unknown'}` };
  }
}

const env = (k: string, fallback = '') => (import.meta.env as any)[k] || process.env[k] || fallback;

function esc(s: string | null | undefined): string {
  if (!s) return '';
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function nl2p(s: string | null | undefined): string {
  if (!s) return '';
  return esc(s)
    .split(/\n\n+/)
    .map((p) => `<p style="margin:0 0 12px;line-height:1.55">${p.replace(/\n/g, '<br>')}</p>`)
    .join('');
}

export async function sendApartEmail(translated: ApplyPayload, original: ApplyPayload) {
  const from = env('APPLICANT_FROM_EMAIL', 'hackathon@aisafetycolombia.org');
  const to = env('APART_INBOX_EMAIL', 'sprints@apartresearch.com');

  const subject = `Bogotá hub application — ${translated.firstName} ${translated.lastName}`;
  const html = `
<div style="font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif;max-width:640px;margin:0 auto;color:#101010">
  <h2 style="font-size:20px;margin:0 0 16px">Bogotá hub application — Global South AI Safety Hackathon</h2>
  <p style="color:#555;margin:0 0 20px">
    Forwarded from the Bogotá hub application form on
    <a href="https://aisafetycolombia.org/aplicar/" style="color:#101010">aisafetycolombia.org/aplicar</a>.
    Original language: ${esc(original.locale.toUpperCase())} (translated below where applicable).
  </p>

  <table style="width:100%;border-collapse:collapse;font-size:14px">
    <tbody>
      <tr><td style="padding:8px 0;color:#777;width:160px">First name</td><td style="padding:8px 0">${esc(translated.firstName)}</td></tr>
      <tr><td style="padding:8px 0;color:#777">Last name</td><td style="padding:8px 0">${esc(translated.lastName)}</td></tr>
      <tr><td style="padding:8px 0;color:#777">Email</td><td style="padding:8px 0"><a href="mailto:${esc(translated.email)}">${esc(translated.email)}</a></td></tr>
      <tr><td style="padding:8px 0;color:#777">Location</td><td style="padding:8px 0">${esc(translated.location)}</td></tr>
      <tr><td style="padding:8px 0;color:#777">LinkedIn</td><td style="padding:8px 0">${translated.linkedin ? `<a href="${esc(translated.linkedin)}">${esc(translated.linkedin)}</a>` : '—'}</td></tr>
      <tr><td style="padding:8px 0;color:#777">Google Scholar</td><td style="padding:8px 0">${translated.scholar ? `<a href="${esc(translated.scholar)}">${esc(translated.scholar)}</a>` : '—'}</td></tr>
    </tbody>
  </table>

  <h3 style="font-size:15px;margin:24px 0 8px;color:#101010">Current occupation</h3>
  ${nl2p(translated.career)}

  <h3 style="font-size:15px;margin:24px 0 8px;color:#101010">Reason for joining</h3>
  ${nl2p(translated.reason)}

  <h3 style="font-size:15px;margin:24px 0 8px;color:#101010">Problem they want to tackle and initial approach</h3>
  ${nl2p(translated.hubProblem)}

  <h3 style="font-size:15px;margin:24px 0 8px;color:#101010">Hub logistics</h3>
  <table style="width:100%;border-collapse:collapse;font-size:14px">
    <tbody>
      <tr><td style="padding:6px 0;color:#777;width:160px">Preferred track</td><td style="padding:6px 0">${esc(trackLabel(translated.hubTrack, 'en'))}</td></tr>
      <tr><td style="padding:6px 0;color:#777">In-person attendance</td><td style="padding:6px 0">${esc(daysLabel(translated.hubDays, 'en'))}</td></tr>
      <tr><td style="padding:6px 0;color:#777;vertical-align:top">Dietary / access</td><td style="padding:6px 0">${esc(translated.hubAccess || '—')}</td></tr>
      <tr><td style="padding:6px 0;color:#777;vertical-align:top">Anything else</td><td style="padding:6px 0">${esc(translated.hubExtra || '—')}</td></tr>
    </tbody>
  </table>

  <hr style="border:none;border-top:1px solid #eee;margin:32px 0">
  <p style="color:#999;font-size:12px;margin:0">
    Sent automatically by aisafetycolombia.org · Reply to ${esc(translated.email)} to reach the applicant directly.
  </p>
</div>`.trim();

  return send({ from, to, subject, html, replyTo: translated.email });
}

export async function sendApplicantConfirmation(original: ApplyPayload) {
  const from = env('APPLICANT_FROM_EMAIL', 'hackathon@aisafetycolombia.org');
  const contact = env('HUB_CONTACT_EMAIL', 'aisafetycolombia@gmail.com');
  const es = original.locale === 'es';

  const subject = es
    ? '¡Recibimos tu aplicación al hub Bogotá!'
    : 'We received your Bogotá hub application';

  const intro = es
    ? `Hola ${esc(original.firstName)}, recibimos tu aplicación al hub presencial de Bogotá del Global South AI Safety Hackathon (19-21 de junio de 2026).`
    : `Hi ${esc(original.firstName)}, we received your application to the in-person Bogotá hub of the Global South AI Safety Hackathon (June 19-21, 2026).`;

  const next = es
    ? 'La selección del hub se anuncia antes del 15 de junio. Si tu aplicación es seleccionada, te enviaremos los detalles de venue y logística por este mismo correo.'
    : 'Hub selection is announced before June 15. If your application is accepted, we will send you venue and logistics details to this same email.';

  const meanwhile = es
    ? `Mientras tanto, te invitamos al grupo de WhatsApp de la comunidad para seguir el ritmo de los anuncios. Si tienes cualquier pregunta, respondé a este correo o escríbenos a <a href="mailto:${esc(contact)}">${esc(contact)}</a>.`
    : `In the meantime, we invite you to the community WhatsApp group to keep up with announcements. Any questions, reply to this email or write to <a href="mailto:${esc(contact)}">${esc(contact)}</a>.`;

  const wa = 'https://chat.whatsapp.com/KwE8cciX48TAVhAOHnrLaZ';
  const cta = es ? 'Unirme al WhatsApp' : 'Join the WhatsApp';
  const sig = es ? 'Equipo de AI Safety Colombia' : 'AI Safety Colombia team';

  const html = `
<div style="font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif;max-width:560px;margin:0 auto;color:#101010">
  <p style="font-size:16px;line-height:1.55;margin:0 0 16px">${intro}</p>
  <p style="font-size:15px;line-height:1.55;color:#444;margin:0 0 16px">${next}</p>
  <p style="font-size:15px;line-height:1.55;color:#444;margin:0 0 24px">${meanwhile}</p>
  <p style="margin:0 0 28px">
    <a href="${wa}" style="display:inline-block;background:#101010;color:#fff;text-decoration:none;padding:12px 22px;border-radius:999px;font-weight:600">${cta}</a>
  </p>
  <p style="font-size:14px;color:#777;margin:0">${sig}</p>
</div>`.trim();

  return send({ from, to: original.email, subject, html, replyTo: contact });
}

export async function sendHubNotification(translated: ApplyPayload, original: ApplyPayload) {
  const from = env('APPLICANT_FROM_EMAIL', 'hackathon@aisafetycolombia.org');
  const to = env('HUB_NOTIFY_EMAIL', 'josegelves12@gmail.com');

  const subject = `[Hub Bogotá] ${original.firstName} ${original.lastName} (${trackLabel(translated.hubTrack, 'es')})`;
  const html = `
<div style="font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif;max-width:640px;margin:0 auto;color:#101010">
  <h2 style="font-size:18px;margin:0 0 12px">Nueva aplicación al hub Bogotá</h2>
  <p style="color:#555;margin:0 0 20px;font-size:14px">
    ${esc(original.firstName)} ${esc(original.lastName)} · <a href="mailto:${esc(original.email)}">${esc(original.email)}</a> · ${esc(original.location)}
  </p>
  <table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:16px">
    <tbody>
      <tr><td style="padding:6px 0;color:#777;width:160px">Track</td><td style="padding:6px 0">${esc(trackLabel(translated.hubTrack, 'es'))}</td></tr>
      <tr><td style="padding:6px 0;color:#777">3 días</td><td style="padding:6px 0">${esc(daysLabel(translated.hubDays, 'es'))}</td></tr>
      <tr><td style="padding:6px 0;color:#777">LinkedIn</td><td style="padding:6px 0">${original.linkedin ? `<a href="${esc(original.linkedin)}">${esc(original.linkedin)}</a>` : '—'}</td></tr>
      <tr><td style="padding:6px 0;color:#777">Scholar</td><td style="padding:6px 0">${original.scholar ? `<a href="${esc(original.scholar)}">${esc(original.scholar)}</a>` : '—'}</td></tr>
    </tbody>
  </table>

  <h3 style="font-size:14px;margin:18px 0 6px;color:#101010">Problema + enfoque (original ${esc(original.locale.toUpperCase())})</h3>
  ${nl2p(original.hubProblem)}

  <h3 style="font-size:14px;margin:18px 0 6px;color:#101010">Por qué quiere participar</h3>
  ${nl2p(original.reason)}

  <h3 style="font-size:14px;margin:18px 0 6px;color:#101010">Ocupación</h3>
  ${nl2p(original.career)}

  <h3 style="font-size:14px;margin:18px 0 6px;color:#101010">Dieta / accesibilidad</h3>
  ${nl2p(original.hubAccess) || '<p style="margin:0;color:#999">—</p>'}

  <h3 style="font-size:14px;margin:18px 0 6px;color:#101010">Algo más</h3>
  ${nl2p(original.hubExtra) || '<p style="margin:0;color:#999">—</p>'}

  <hr style="border:none;border-top:1px solid #eee;margin:24px 0">
  <p style="color:#999;font-size:12px;margin:0">aisafetycolombia.org/aplicar · respondé a este correo para escribir directo al postulante</p>
</div>`.trim();

  return send({ from, to, subject, html, replyTo: original.email });
}

export async function sendFailureAlert(detail: { stage: string; error: string; payload: ApplyPayload }) {
  const from = env('APPLICANT_FROM_EMAIL', 'hackathon@aisafetycolombia.org');
  const to = env('HUB_NOTIFY_EMAIL', 'josegelves12@gmail.com');

  const subject = `[ALERT] Hub Bogotá apply error — ${detail.stage}`;
  const html = `
<div style="font-family:monospace;max-width:680px;margin:0 auto;color:#101010">
  <h2 style="font-family:sans-serif;color:#c83e3e">Hub apply failed at: ${esc(detail.stage)}</h2>
  <pre style="background:#f5f5f5;padding:14px;border-radius:8px;white-space:pre-wrap;font-size:13px">${esc(detail.error)}</pre>
  <h3 style="font-family:sans-serif">Payload (PII — handle accordingly)</h3>
  <pre style="background:#f5f5f5;padding:14px;border-radius:8px;white-space:pre-wrap;font-size:12px">${esc(JSON.stringify(detail.payload, null, 2))}</pre>
</div>`.trim();

  return send({ from, to, subject, html });
}
