/**
 * Build a mailto: URL from contact-form fields.
 * @param {{to: string, name: string, email: string, message: string, locale: 'es' | 'en'}} p
 * @returns {string}
 */
export function buildMailto({ to, name, email, message, locale }) {
  const subject =
    locale === 'es'
      ? `Mensaje de ${name} (web AI Safety Colombia)`
      : `Message from ${name} (AI Safety Colombia site)`;
  const body =
    locale === 'es'
      ? `Nombre: ${name}\nEmail: ${email}\n\n${message}`
      : `Name: ${name}\nEmail: ${email}\n\n${message}`;
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
