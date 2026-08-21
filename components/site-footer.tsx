import Link from "next/link";

const SITIO = [
  { href: "/seguridad-de-la-ia", label: "Qué es la seguridad de la IA" },
  { href: "/programas", label: "Programas" },
  { href: "/eventos", label: "Eventos" },
  { href: "/actualidad", label: "Actualidad" },
  { href: "/quienes-somos", label: "Quiénes somos" },
];

const PARTICIPAR = [
  { href: "https://chat.whatsapp.com/", label: "Grupo de WhatsApp", external: true },
  { href: "https://cal.com/josegelves/meeting", label: "Agenda 20 minutos", external: true },
  { href: "mailto:jose@aisafetycolombia.org", label: "jose@aisafetycolombia.org", external: true },
];

function LinkColumn({
  title,
  links,
  label,
}: {
  title: string;
  links: { href: string; label: string; external?: boolean }[];
  label: string;
}) {
  return (
    <>
      <h2 className="text-display-4 md:text-display-4-lg text-aisc-sand">{title}</h2>
      <nav aria-label={label} className="mt-9">
        <ul className="flex flex-col">
          {links.map((link) =>
            link.external ? (
              <li key={link.href}>
                <a
                  className="text-body md:text-body-lg block py-2.5 transition-colors hover:text-aisc-sand/70"
                  href={link.href}
                  target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={link.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                >
                  {link.label}
                </a>
              </li>
            ) : (
              <li key={link.href}>
                <Link className="text-body md:text-body-lg block py-2.5 transition-colors hover:text-aisc-sand/70" href={link.href}>
                  {link.label}
                </Link>
              </li>
            ),
          )}
        </ul>
      </nav>
    </>
  );
}

export default function SiteFooter() {
  return (
    <footer className="relative bg-aisc-sage text-aisc-sand">
      {/* sangra la columna mas oscura hasta el borde izquierdo en pantallas anchas */}
      <div aria-hidden="true" className="absolute inset-y-0 left-0 hidden bg-aisc-forest-deep lg:block" style={{ right: "calc(50% + 700px)" }} />
      <div className="mx-auto w-full max-w-[1400px] relative grid min-h-[320px] grid-cols-1 lg:grid-cols-[32fr_36fr_32fr]">
        <section className="flex flex-col justify-center bg-aisc-forest-deep px-6 py-10 sm:px-12 sm:py-12 md:px-20 lg:px-10 xl:px-20">
          <div className="max-w-[320px]">
            <img
              src="/aisc/logo-lockup-crema.png"
              alt="AI Safety Colombia"
              width={1400}
              height={420}
              className="h-12 w-auto md:h-14"
            />
            <p className="text-body-sm mt-5 max-w-[260px] text-aisc-sand/85">
              Que la inteligencia artificial avance de forma segura, con gente de acá trabajando en ello.
            </p>
          </div>
          <div className="text-body-sm mt-8 flex flex-col gap-1 text-aisc-sand/80 sm:mt-10 md:mt-12">
            <p>© AI Safety Colombia, 2026</p>
            <p>Bogotá, Colombia</p>
          </div>
        </section>
        <section className="bg-aisc-forest flex flex-col justify-center px-6 py-10 sm:px-12 sm:py-12 md:px-20 lg:px-10 xl:px-20">
          <div className="w-full max-w-[380px]">
            <LinkColumn title="El sitio" links={SITIO} label="Secciones del sitio" />
          </div>
        </section>
        <section className="bg-aisc-sage flex flex-col justify-center px-6 py-10 sm:px-12 sm:py-12 md:px-20 lg:px-10 xl:px-20">
          <div className="w-full max-w-[380px]">
            <LinkColumn title="Participar" links={PARTICIPAR} label="Formas de participar" />
            <div className="mt-8 flex items-center gap-3">
              <a
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-aisc-sand hover:text-aisc-sand/70 focus-visible:ring-aisc-sand inline-flex size-8 items-center justify-center transition-colors outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-aisc-sage"
                href="https://www.linkedin.com/company/ai-safety-colombia/"
              >
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" aria-hidden="true" className="size-5">
                  <path d="M18.3362 18.339H15.6707V14.1622C15.6707 13.1662 15.6505 11.8845 14.2817 11.8845C12.892 11.8845 12.6797 12.9683 12.6797 14.0887V18.339H10.0142V9.75H12.5747V10.9207H12.6092C12.967 10.2457 13.837 9.53325 15.1367 9.53325C17.8375 9.53325 18.337 11.3108 18.337 13.6245V18.339H18.3362ZM7.00373 8.57475C6.14573 8.57475 5.45648 7.88025 5.45648 7.026C5.45648 6.1725 6.14648 5.47875 7.00373 5.47875C7.85873 5.47875 8.55173 6.1725 8.55173 7.026C8.55173 7.88025 7.85798 8.57475 7.00373 8.57475ZM8.34023 18.339H5.66723V9.75H8.34023V18.339ZM19.6697 3H4.32923C3.59498 3 3.00098 3.5805 3.00098 4.29675V19.7033C3.00098 20.4202 3.59498 21 4.32923 21H19.6675C20.401 21 21.001 20.4202 21.001 19.7033V4.29675C21.001 3.5805 20.401 3 19.6675 3H19.6697Z" />
                </svg>
              </a>
            </div>
          </div>
        </section>
      </div>
    </footer>
  );
}
