import type { DraftRow } from './draftSupabase';

const RESEND_API = 'https://api.resend.com/emails';

const env = (k: string, fallback = '') =>
  ((import.meta as any).env as any)?.[k] || process.env[k] || fallback;

function esc(s: string | null | undefined): string {
  if (!s) return '';
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

async function sendResend(args: {
  from: string;
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}): Promise<{ ok: true } | { ok: false; error: string }> {
  const key = env('RESEND_API_KEY');
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

export function renderDraftReminder(draft: DraftRow, which: '6h' | '48h'): { subject: string; html: string } {
  const es = draft.locale === 'es';
  const contact = env('HUB_CONTACT_EMAIL', 'contacto@aisafetycolombia.org');
  const applyUrl = es ? 'https://aisafetycolombia.org/aplicar/' : 'https://aisafetycolombia.org/en/apply/';

  const firstName = (draft.first_name || '').trim().split(/\s+/)[0] || (es ? 'hola' : 'hi');

  const t = es
    ? {
        subject:
          which === '6h'
            ? `¿Terminamos tu postulación al hub Bogotá, ${firstName}?`
            : `Tu postulación al hub Bogotá sigue pendiente`,
        preheader:
          which === '6h'
            ? 'Te quedó a medias hoy. La selección se cierra el 12 de junio.'
            : 'La selección se cierra el 12 de junio. Te tomará unos minutos.',
        eyebrow: 'AI Safety Colombia · Hub Bogotá',
        greeting: `Hola ${esc(firstName)},`,
        intro:
          which === '6h'
            ? 'Empezaste tu postulación al hub presencial de Bogotá del Global South AI Safety Hackathon y no la enviaste. Tus datos básicos quedaron guardados, solo faltan las preguntas largas.'
            : 'Notamos que tu postulación al hub presencial de Bogotá del Global South AI Safety Hackathon sigue sin enviarse. La selección se anuncia el 15 de junio y la fecha límite para postular es el 12 de junio de 2026.',
        whyTitle: which === '6h' ? 'Qué falta' : 'Por qué te volvemos a escribir',
        whyBody:
          which === '6h'
            ? 'Las tres preguntas abiertas (ocupación, motivación y el problema que quieres trabajar) son las que más pesan en la selección. Toma entre 10 y 15 minutos completarlas.'
            : 'Quedan pocos días para el cierre. Si decidiste no postular, ignora este mensaje y no te volveremos a escribir sobre este tema. Si todavía te interesa, retomar el formulario es rápido.',
        cta: 'Continuar postulación',
        closing: `Si tienes dudas sobre el hackathon, responde a este correo o escribe a <a href="mailto:${esc(contact)}" style="color:#1F4D32;text-decoration:underline">${esc(contact)}</a>.`,
        signOff: 'Equipo de AI Safety Colombia',
        footerOrg: 'AI Safety Colombia · Bogotá, Colombia',
        footerDisclaimer:
          'Recibes este recordatorio porque comenzaste a postularte al hub Bogotá del Global South AI Safety Hackathon en aisafetycolombia.org.',
      }
    : {
        subject:
          which === '6h'
            ? `Want to finish your Bogotá hub application, ${firstName}?`
            : `Your Bogotá hub application is still open`,
        preheader:
          which === '6h'
            ? 'You started today and did not submit. Applications close on June 12.'
            : 'Applications close on June 12. The rest takes a few minutes.',
        eyebrow: 'AI Safety Colombia · Bogotá Hub',
        greeting: `Hi ${esc(firstName)},`,
        intro:
          which === '6h'
            ? 'You started your application to the in-person Bogotá hub of the Global South AI Safety Hackathon but did not submit it. Your basics are saved — only the longer questions are left.'
            : 'Your application to the in-person Bogotá hub of the Global South AI Safety Hackathon is still unsubmitted. Selection is announced on June 15 and the deadline is June 12, 2026.',
        whyTitle: which === '6h' ? 'What is left' : 'Why we are writing again',
        whyBody:
          which === '6h'
            ? 'The three open questions (current work, motivation, and the problem you want to tackle) are what we weigh most. They take 10 to 15 minutes.'
            : 'There are only a few days until the deadline. If you decided not to apply, please ignore this message — we will not write again about it. If you still want to, finishing the form is quick.',
        cta: 'Resume application',
        closing: `If you have questions about the hackathon, reply to this email or write to <a href="mailto:${esc(contact)}" style="color:#1F4D32;text-decoration:underline">${esc(contact)}</a>.`,
        signOff: 'AI Safety Colombia team',
        footerOrg: 'AI Safety Colombia · Bogotá, Colombia',
        footerDisclaimer:
          'You are receiving this reminder because you started applying to the Bogotá hub of the Global South AI Safety Hackathon at aisafetycolombia.org.',
      };

  const display = `'Bricolage Grotesque','Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif`;
  const body = `'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif`;

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
                    <span style="font-family:${body};font-size:10px;letter-spacing:0.18em;text-transform:uppercase;font-weight:700;color:#9FB3A4">${esc(t.eyebrow.split('·').pop()?.trim() || 'Hub')}</span>
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
              <p style="margin:0 0 22px;font-family:${body};font-size:15.5px;line-height:1.65;color:#211A12">${t.intro}</p>
            </td>
          </tr>

          <tr>
            <td style="padding:0 36px">
              <div style="border-top:1px solid #EDE3D0;margin:0 0 22px"></div>
              <div style="font-family:${body};font-size:10.5px;letter-spacing:0.18em;text-transform:uppercase;font-weight:700;color:#1F4D32;margin:0 0 14px">${esc(t.whyTitle)}</div>
              <p style="margin:0 0 28px;font-family:${body};font-size:14.5px;line-height:1.65;color:#211A12">${esc(t.whyBody)}</p>
            </td>
          </tr>

          <tr>
            <td style="padding:0 36px 4px">
              <p style="margin:0 0 32px">
                <a href="${esc(applyUrl)}" style="display:inline-block;background:#E5604D;color:#FFFBF2;text-decoration:none;padding:14px 26px;border-radius:999px;font-family:${display};font-size:14.5px;font-weight:700;letter-spacing:-0.005em">${esc(t.cta)}</a>
              </p>
              <p style="margin:0 0 24px;font-family:${body};font-size:14px;line-height:1.65;color:#5A5044">${t.closing}</p>
              <p style="margin:0;font-family:${display};font-size:15px;color:#143620;font-weight:700;letter-spacing:-0.01em">${esc(t.signOff)}</p>
            </td>
          </tr>

          <tr>
            <td style="padding:28px 36px 30px">
              <div style="border-top:1px solid #EDE3D0;margin:8px 0 16px"></div>
              <p style="margin:0 0 6px;font-family:${body};font-size:12px;color:#5A5044">${esc(t.footerOrg)} · <a href="https://aisafetycolombia.org" style="color:#1F4D32;text-decoration:none;font-weight:600">aisafetycolombia.org</a></p>
              <p style="margin:0;font-family:${body};font-size:11px;color:#8a8170;line-height:1.55">${esc(t.footerDisclaimer)}</p>
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

export async function sendDraftReminder(draft: DraftRow, which: '6h' | '48h') {
  const from = env('APPLICANT_FROM_EMAIL', 'hackathon@aisafetycolombia.org');
  const contact = env('HUB_CONTACT_EMAIL', 'contacto@aisafetycolombia.org');
  const { subject, html } = renderDraftReminder(draft, which);
  return sendResend({ from, to: draft.email, subject, html, replyTo: contact });
}
