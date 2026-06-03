import type { InterestPayload } from './schema';
import { areaLabel } from './schema';

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

export function renderInterestConfirmation(
  payload: InterestPayload,
  opts?: { contact?: string },
): { subject: string; html: string } {
  const contact = opts?.contact || env('HUB_CONTACT_EMAIL', 'contacto@aisafetycolombia.org');
  const es = payload.locale === 'es';
  const wa = 'https://chat.whatsapp.com/KwE8cciX48TAVhAOHnrLaZ';

  const areasList = payload.areas.map((a) => areaLabel(a, payload.locale));

  const t = es
    ? {
        subject: 'Recibimos tu interés en los grupos de discusión · AI Safety Colombia',
        preheader: 'Te avisamos en cuanto abramos un grupo del tema que elegiste.',
        eyebrow: 'AI Safety Colombia · Grupos de discusión',
        greeting: `Hola ${esc(payload.firstName)},`,
        intro: 'Gracias por registrar tu interés en los grupos de discusión de AI Safety Colombia.',
        areasTitle: 'Grupos de discusión para los que marcaste interés',
        nextTitle: 'Qué sigue',
        step1Title: 'Abrimos cuando hay grupo',
        step1: 'En cuanto reunimos suficientes personas interesadas en el mismo tema, anunciamos fechas, formato (virtual o presencial) y materiales.',
        step2Title: 'Mientras tanto',
        step2: 'Si quieres empezar ya, puedes tomar las lecturas directamente en <a href="https://bluedot.org/courses" style="color:#1F4D32;text-decoration:underline">BlueDot Impact</a>. Nuestra diferencia es que las facilitamos en español y, con demanda suficiente, en persona en Bogotá.',
        whatsappBlurb: 'En el grupo de WhatsApp de la comunidad publicamos anuncios sobre cuándo arrancan los grupos y otras actividades.',
        cta: 'Unirse al grupo en WhatsApp',
        closing: `Si tienes dudas, responde a este correo o escríbenos a <a href="mailto:${esc(contact)}" style="color:#1F4D32;text-decoration:underline">${esc(contact)}</a>.`,
        signOff: 'Equipo de AI Safety Colombia',
        footerOrg: 'AI Safety Colombia · Bogotá, Colombia',
        footerDisclaimer: 'Recibes este correo porque registraste tu interés en los grupos de discusión de AI Safety Colombia.',
      }
    : {
        subject: 'We received your interest in the discussion groups · AI Safety Colombia',
        preheader: 'We will let you know as soon as we open a group on the topic you picked.',
        eyebrow: 'AI Safety Colombia · Discussion groups',
        greeting: `Hi ${esc(payload.firstName)},`,
        intro: 'Thank you for registering your interest in the AI Safety Colombia discussion groups.',
        areasTitle: 'Discussion groups you registered interest in',
        nextTitle: 'What happens next',
        step1Title: 'We open the group when there is one',
        step1: 'Once enough people share interest in the same topic, we announce dates, format (online or in-person), and materials.',
        step2Title: 'In the meantime',
        step2: 'If you want to start right away, you can take the readings directly with <a href="https://bluedot.org/courses" style="color:#1F4D32;text-decoration:underline">BlueDot Impact</a>. The difference with us is that we facilitate them in Spanish and, with enough demand, in person in Bogotá.',
        whatsappBlurb: 'The community WhatsApp group is where we post when groups are starting and other announcements.',
        cta: 'Join the WhatsApp group',
        closing: `If you have questions, reply to this email or write to <a href="mailto:${esc(contact)}" style="color:#1F4D32;text-decoration:underline">${esc(contact)}</a>.`,
        signOff: 'AI Safety Colombia team',
        footerOrg: 'AI Safety Colombia · Bogotá, Colombia',
        footerDisclaimer: 'You are receiving this because you registered your interest in the AI Safety Colombia discussion groups.',
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

  const areasChips = areasList
    .map(
      (label) =>
        `<span style="display:inline-block;padding:6px 12px;margin:0 6px 6px 0;background:#F1E9D6;color:#143620;border-radius:999px;font-family:${body};font-size:13px;font-weight:600">${esc(label)}</span>`,
    )
    .join('');

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
                    <span style="font-family:${body};font-size:10px;letter-spacing:0.18em;text-transform:uppercase;font-weight:700;color:#9FB3A4">${es ? 'Grupos' : 'Groups'}</span>
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
              <p style="margin:0 0 26px;font-family:${body};font-size:15.5px;line-height:1.65;color:#211A12">${t.intro}</p>
            </td>
          </tr>

          <tr>
            <td style="padding:0 36px 24px">
              <div style="font-family:${body};font-size:10.5px;letter-spacing:0.18em;text-transform:uppercase;font-weight:700;color:#1F4D32;margin:0 0 12px">${t.areasTitle}</div>
              <div>${areasChips}</div>
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

export async function sendInterestConfirmation(payload: InterestPayload) {
  const from = env('APPLICANT_FROM_EMAIL', 'hackathon@aisafetycolombia.org');
  const contact = env('HUB_CONTACT_EMAIL', 'contacto@aisafetycolombia.org');
  const { subject, html } = renderInterestConfirmation(payload, { contact });
  return send({ from, to: payload.email, subject, html, replyTo: contact });
}

export async function sendInterestNotification(payload: InterestPayload) {
  const from = env('APPLICANT_FROM_EMAIL', 'hackathon@aisafetycolombia.org');
  const to = env('HUB_NOTIFY_EMAIL', 'josegelves12@gmail.com');

  const areasList = payload.areas.map((a) => areaLabel(a, 'es')).join(', ');
  const subject = `[Grupos] ${payload.firstName} ${payload.lastName} (${areasList})`;
  const html = `
<div style="font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif;max-width:640px;margin:0 auto;color:#101010">
  <h2 style="font-size:18px;margin:0 0 12px">Nuevo interés en grupos de discusión</h2>
  <p style="color:#555;margin:0 0 20px;font-size:14px">
    ${esc(payload.firstName)} ${esc(payload.lastName)} · <a href="mailto:${esc(payload.email)}">${esc(payload.email)}</a> · ${esc(payload.location)}
  </p>
  <table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:16px">
    <tbody>
      <tr><td style="padding:6px 0;color:#777;width:160px">Temas</td><td style="padding:6px 0">${esc(areasList)}</td></tr>
      <tr><td style="padding:6px 0;color:#777">Idioma del form</td><td style="padding:6px 0">${esc(payload.locale.toUpperCase())}</td></tr>
      <tr><td style="padding:6px 0;color:#777">LinkedIn</td><td style="padding:6px 0">${payload.linkedin ? `<a href="${esc(payload.linkedin)}">${esc(payload.linkedin)}</a>` : '—'}</td></tr>
    </tbody>
  </table>

  <h3 style="font-size:14px;margin:18px 0 6px;color:#101010">Sobre la persona</h3>
  ${nl2p(payload.about)}

  <h3 style="font-size:14px;margin:18px 0 6px;color:#101010">Algo más</h3>
  ${nl2p(payload.extra) || '<p style="margin:0;color:#999">—</p>'}

  <hr style="border:none;border-top:1px solid #eee;margin:24px 0">
  <p style="color:#999;font-size:12px;margin:0">aisafetycolombia.org/grupos · respondé a este correo para escribir directo a la persona</p>
</div>`.trim();

  return send({ from, to, subject, html, replyTo: payload.email });
}

export async function sendInterestFailureAlert(detail: { stage: string; error: string; payload: InterestPayload }) {
  const from = env('APPLICANT_FROM_EMAIL', 'hackathon@aisafetycolombia.org');
  const to = env('HUB_NOTIFY_EMAIL', 'josegelves12@gmail.com');

  const subject = `[ALERT] Group interest error — ${detail.stage}`;
  const html = `
<div style="font-family:monospace;max-width:680px;margin:0 auto;color:#101010">
  <h2 style="font-family:sans-serif;color:#c83e3e">Group interest failed at: ${esc(detail.stage)}</h2>
  <pre style="background:#f5f5f5;padding:14px;border-radius:8px;white-space:pre-wrap;font-size:13px">${esc(detail.error)}</pre>
  <h3 style="font-family:sans-serif">Payload</h3>
  <pre style="background:#f5f5f5;padding:14px;border-radius:8px;white-space:pre-wrap;font-size:12px">${esc(JSON.stringify(detail.payload, null, 2))}</pre>
</div>`.trim();

  return send({ from, to, subject, html });
}
