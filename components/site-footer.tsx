import Link from "next/link";

const RESOURCES = [
  { href: "/about", label: "About" },
  { href: "/research", label: "Research" },
  { href: "/blog", label: "Blog" },
  { href: "/careers", label: "Careers" },
  { href: "/privacy", label: "Privacy policy" },
];

const COMMUNITY = [
  { href: "/events", label: "Events" },
  { href: "/programs", label: "Programs" },
  { href: "/contact", label: "Contact" },
];

const LOGO_MASK = {
  WebkitMask: "url('/sash/logo/sash-footer.svg') center / contain no-repeat",
  mask: "url('/sash/logo/sash-footer.svg') center / contain no-repeat",
};

function LinkColumn({ title, links, label }: { title: string; links: typeof RESOURCES; label: string }) {
  return (
    <>
      <h2 className="text-display-4 md:text-display-4-lg text-sash-frost">{title}</h2>
      <nav aria-label={label} className="mt-9">
        <ul className="flex flex-col">
          {links.map((link) => (
            <li key={link.href}>
              <Link className="text-body md:text-body-lg block py-2.5 transition-colors hover:text-sash-frost/70" href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}

export default function SiteFooter() {
  return (
    <footer className="relative bg-sash-bluebell text-sash-frost">
      {/* bleeds the midnight column out to the left edge on wide screens */}
      <div aria-hidden="true" className="absolute inset-y-0 left-0 hidden bg-sash-midnight lg:block" style={{ right: "calc(50% + 700px)" }} />
      <div className="mx-auto w-full max-w-[1400px] relative grid min-h-[320px] grid-cols-1 lg:grid-cols-[32fr_36fr_32fr]">
        <section className="flex flex-col justify-center bg-sash-midnight px-6 py-10 sm:px-12 sm:py-12 md:px-20 lg:px-10 xl:px-20">
          <div className="max-w-[320px]">
            <span role="img" aria-label="SASH" className="inline-block max-w-full shrink-0 h-[0.86em] w-[2.46em] bg-sash-frost text-[46px] sm:text-[52px] md:text-[58px] lg:text-[50px] xl:text-[58px]" style={LOGO_MASK} />
            <p className="mt-3 max-w-[255px] font-serif text-[20px] leading-[1.08] font-normal tracking-normal text-sash-frost">Building a global ecosystem for AI safety.</p>
          </div>
          <div className="text-body-sm mt-8 flex flex-col gap-1 text-sash-frost sm:mt-10 md:mt-12">
            <p>© SASH, 2026</p>
            <p>
              Designed by
              {" "}
              <a target="_blank" rel="noopener noreferrer" className="underline underline-offset-[3px] transition-colors hover:text-sash-bluebell" href="https://boyne.co">Boyne Creative</a>
            </p>
            <p>
              Built by
              {" "}
              <a target="_blank" rel="noopener noreferrer" className="underline underline-offset-[3px] transition-colors hover:text-sash-bluebell" href="https://galactus.dev">Galactus</a>
            </p>
          </div>
        </section>
        <section className="bg-sash-cobalt flex flex-col justify-center px-6 py-10 sm:px-12 sm:py-12 md:px-20 lg:px-10 xl:px-20">
          <div className="w-full max-w-[380px]">
            <LinkColumn title="Resources" links={RESOURCES} label="Resources" />
          </div>
        </section>
        <section className="bg-sash-bluebell flex flex-col justify-center px-6 py-10 sm:px-12 sm:py-12 md:px-20 lg:px-10 xl:px-20">
          <div className="w-full max-w-[380px]">
            <LinkColumn title="Community" links={COMMUNITY} label="Community" />
            <div className="mt-8 flex items-center gap-3">
              <a target="_blank" rel="noopener noreferrer" aria-label="X" className="text-sash-frost hover:text-sash-frost/70 focus-visible:ring-sash-frost inline-flex size-8 items-center justify-center transition-colors outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-sash-bluebell" href="https://x.com/aisafetysg">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" aria-hidden="true" className="remixicon size-5">
                  <path d="M17.6874 3.0625L12.6907 8.77425L8.37045 3.0625H2.11328L9.58961 12.8387L2.50378 20.9375H5.53795L11.0068 14.6886L15.7863 20.9375H21.8885L14.095 10.6342L20.7198 3.0625H17.6874ZM16.6232 19.1225L5.65436 4.78217H7.45745L18.3034 19.1225H16.6232Z" />
                </svg>
              </a>
              <a target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-sash-frost hover:text-sash-frost/70 focus-visible:ring-sash-frost inline-flex size-8 items-center justify-center transition-colors outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-sash-bluebell" href="https://www.linkedin.com/company/singapore-ai-safety-hub/">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" aria-hidden="true" className="remixicon size-5">
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
