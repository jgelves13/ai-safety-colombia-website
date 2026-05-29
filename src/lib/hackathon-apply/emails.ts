import type { ApplyPayload } from './schema';
import { trackLabel, travelLabel } from './schema';

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
      <tr><td style="padding:6px 0;color:#777">Travel / lodging</td><td style="padding:6px 0">${esc(travelLabel(translated.hubTravel, 'en'))}</td></tr>
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

export function renderApplicantConfirmation(
  original: ApplyPayload,
  opts?: { contact?: string }
): { subject: string; html: string } {
  const contact = opts?.contact || env('HUB_CONTACT_EMAIL', 'contacto@aisafetycolombia.org');
  const es = original.locale === 'es';
  const wa = 'https://chat.whatsapp.com/KwE8cciX48TAVhAOHnrLaZ';

  const t = es
    ? {
        subject: 'Recibimos tu postulación al hub Bogotá · Global South AI Safety Hackathon',
        preheader: 'Tu postulación al hub Bogotá entró a selección. Resultados el 15 de junio.',
        eyebrow: 'AI Safety Colombia · Hub Bogotá',
        greeting: `Hola ${esc(original.firstName)},`,
        intro: 'Gracias por postular al hub presencial de Bogotá del Global South AI Safety Hackathon. El evento se realizará del 19 al 21 de junio de 2026.',
        nextTitle: 'Qué sigue',
        step1Title: 'Revisión',
        step1: 'Tu postulación entra a la ronda de selección del hub. La única pregunta de selección es cómo describes el problema que quieres abordar y tu enfoque inicial: buscamos pensamiento concreto y propio, no credenciales.',
        step2Title: 'Resultados',
        step2: 'Anunciamos la selección el 15 de junio. Vas a recibir un correo a esta misma dirección con la decisión.',
        step3Title: 'Detalles del evento',
        step3: 'Si quedas seleccionado, te enviaremos venue, horario, logística y agenda en un segundo correo.',
        whatsappBlurb: 'Mientras tanto, en el grupo de WhatsApp de la comunidad publicamos anuncios sobre el hackathon y otras actividades de AI Safety Colombia.',
        cta: 'Unirse al grupo en WhatsApp',
        closing: `Si tienes dudas, responde a este correo o escríbenos a <a href="mailto:${esc(contact)}" style="color:#1F4D32;text-decoration:underline">${esc(contact)}</a>.`,
        signOff: 'Equipo de AI Safety Colombia',
        footerOrg: 'AI Safety Colombia · Bogotá, Colombia',
        footerDisclaimer: 'Recibes este correo porque postulaste al hub Bogotá del Global South AI Safety Hackathon.',
      }
    : {
        subject: 'We received your Bogotá hub application · Global South AI Safety Hackathon',
        preheader: 'Your Bogotá hub application is under review. Results on June 15.',
        eyebrow: 'AI Safety Colombia · Bogotá Hub',
        greeting: `Hi ${esc(original.firstName)},`,
        intro: 'Thank you for applying to the in-person Bogotá hub of the Global South AI Safety Hackathon. The event runs from June 19 to 21, 2026.',
        nextTitle: 'What happens next',
        step1Title: 'Review',
        step1: 'Your application enters the hub selection round. The only selection question is how you describe the problem you want to tackle and your initial approach: we look for concrete thinking in your own words, not credentials.',
        step2Title: 'Results',
        step2: 'We announce the selection on June 15. You will receive an email at this same address with the decision.',
        step3Title: 'Event details',
        step3: 'If your application is accepted, we will send venue, schedule, logistics and program details in a follow-up email.',
        whatsappBlurb: 'In the meantime, the community WhatsApp group is where we post hackathon updates and announcements from AI Safety Colombia.',
        cta: 'Join the WhatsApp group',
        closing: `If you have questions, reply to this email or write to <a href="mailto:${esc(contact)}" style="color:#1F4D32;text-decoration:underline">${esc(contact)}</a>.`,
        signOff: 'AI Safety Colombia team',
        footerOrg: 'AI Safety Colombia · Bogotá, Colombia',
        footerDisclaimer: 'You are receiving this because you applied to the Bogotá hub of the Global South AI Safety Hackathon.',
      };

  const display = `'Bricolage Grotesque','Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif`;
  const body = `'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif`;

  const step = (n: string, title: string, bodyText: string) => `
          <tr>
            <td style="padding:0 36px 20px">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td valign="top" width="44" style="width:44px;padding-right:16px">
                    <div style="width:32px;height:32px;line-height:32px;text-align:center;background:#E5604D;color:#FFFBF2;border-radius:50%;font-family:${display};font-size:15px;font-weight:700">${n}</div>
                  </td>
                  <td valign="top">
                    <p style="margin:0 0 4px;font-family:${display};font-size:15px;font-weight:700;letter-spacing:-0.01em;color:#143620">${title}</p>
                    <p style="margin:0;font-family:${body};font-size:14px;line-height:1.65;color:#211A12">${bodyText}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>`;

  const html = `<!DOCTYPE html>
<html lang="${es ? 'es' : 'en'}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light only">
<meta name="supported-color-schemes" content="light only">
<title>${esc(t.subject)}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@600;700;800&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
</head>
<body style="margin:0;padding:0;background:#FBF6EC;font-family:${body};color:#211A12">
  <div style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0">${esc(t.preheader)}</div>
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#FBF6EC">
    <tr>
      <td align="center" style="padding:32px 16px">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="580" style="max-width:580px;width:100%;background:#FFFBF2;border:1px solid #E4D9C4;border-radius:20px">

          <tr>
            <td style="padding:22px 36px 20px;background:#143620;color:#FBF6EC;border-radius:20px 20px 0 0">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td valign="middle">
                    <img src="https://aisafetycolombia.org/logo.png" alt="" width="26" height="26" style="display:inline-block;vertical-align:middle;height:26px;width:auto;margin-right:10px;border:0">
                    <span style="font-family:${display};font-size:14px;font-weight:700;letter-spacing:-0.01em;color:#FBF6EC;vertical-align:middle">AI Safety Colombia</span>
                  </td>
                  <td valign="middle" align="right">
                    <span style="font-family:${body};font-size:10px;letter-spacing:0.18em;text-transform:uppercase;font-weight:700;color:#9FB3A4">Hub Bogotá</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:0 36px">
              <div style="height:4px;background:#E5604D;border-radius:0 0 4px 4px;width:64px;margin:0 0 0"></div>
            </td>
          </tr>

          <tr>
            <td style="padding:32px 36px 4px">
              <p style="margin:0 0 18px;font-family:${display};font-size:26px;font-weight:700;letter-spacing:-0.03em;line-height:1.15;color:#143620">${t.greeting}</p>
              <p style="margin:0 0 30px;font-family:${body};font-size:15.5px;line-height:1.65;color:#211A12">${t.intro}</p>
            </td>
          </tr>

          <tr>
            <td style="padding:0 36px">
              <div style="border-top:1px solid #EDE3D0;margin:0 0 22px"></div>
              <div style="font-family:${body};font-size:10.5px;letter-spacing:0.18em;text-transform:uppercase;font-weight:700;color:#1F4D32;margin:0 0 18px">${t.nextTitle}</div>
            </td>
          </tr>

          ${step('1', t.step1Title, t.step1)}
          ${step('2', t.step2Title, t.step2)}
          ${step('3', t.step3Title, t.step3)}

          <tr>
            <td style="padding:4px 36px 0">
              <div style="border-top:1px solid #EDE3D0;margin:18px 0 24px"></div>
              <p style="margin:0 0 22px;font-family:${body};font-size:15px;line-height:1.65;color:#211A12">${t.whatsappBlurb}</p>
              <p style="margin:0 0 32px">
                <a href="${wa}" style="display:inline-block;background:#E5604D;color:#FFFBF2;text-decoration:none;padding:14px 26px;border-radius:999px;font-family:${display};font-size:14.5px;font-weight:700;letter-spacing:-0.005em">${t.cta}</a>
              </p>
              <p style="margin:0 0 24px;font-family:${body};font-size:14px;line-height:1.65;color:#5A5044">${t.closing}</p>
              <p style="margin:0;font-family:${display};font-size:15px;color:#143620;font-weight:700;letter-spacing:-0.01em">${t.signOff}</p>
            </td>
          </tr>

          <tr>
            <td style="padding:28px 36px 30px">
              <div style="border-top:1px solid #EDE3D0;margin:8px 0 16px"></div>
              <p style="margin:0 0 6px;font-family:${body};font-size:12px;color:#5A5044">${t.footerOrg} · <a href="https://aisafetycolombia.org" style="color:#1F4D32;text-decoration:none;font-weight:600">aisafetycolombia.org</a></p>
              <p style="margin:0;font-family:${body};font-size:11px;color:#8a8170;line-height:1.55">${t.footerDisclaimer}</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  return { subject: t.subject, html };
}

export async function sendApplicantConfirmation(original: ApplyPayload) {
  const from = env('APPLICANT_FROM_EMAIL', 'hackathon@aisafetycolombia.org');
  const contact = env('HUB_CONTACT_EMAIL', 'contacto@aisafetycolombia.org');
  const { subject, html } = renderApplicantConfirmation(original, { contact });
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
      <tr><td style="padding:6px 0;color:#777">Viaje / hospedaje</td><td style="padding:6px 0">${esc(travelLabel(translated.hubTravel, 'es'))}</td></tr>
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
