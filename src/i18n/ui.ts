export const ui = {
  es: {
    'site.title': 'AI Safety Colombia',
    'site.description': 'Construyendo un futuro seguro con inteligencia artificial. Investigacion, educacion y comunidad en seguridad de IA en Colombia.',
    'nav.home': 'Inicio',
    'nav.about': 'Sobre nosotros',
    'nav.hackathon': 'Hackathon',
    'nav.events': 'Eventos',
    'nav.programs': 'Programas',
    'nav.resources': 'Recursos',
    'nav.get-involved': 'Involucrate',
    'nav.contact': 'Contacto',
    'hero.title': 'AI Safety Colombia',
    'hero.subtitle': 'Construyendo un futuro seguro con inteligencia artificial',
    'hero.cta-primary': 'Involucrate',
    'hero.cta-secondary': 'Aprende mas',
    'hackathon.banner.title': 'Global South AI Safety Hackathon',
    'hackathon.banner.subtitle': 'Jun 19-21 | Apart Research | Bogota',
    'hackathon.banner.cta': 'Registrate',
    'hackathon.banner.countdown': 'dias restantes',
    'sections.what-we-do': 'Que hacemos',
    'sections.programs': 'Programas',
    'sections.metrics': 'Nuestro impacto',
    'sections.join': 'Unete a la comunidad',
    'what-we-do.research.title': 'Investigacion',
    'what-we-do.research.desc': 'Producimos investigacion sobre riesgos y alineacion de IA adaptada al contexto colombiano y latinoamericano.',
    'what-we-do.education.title': 'Educacion',
    'what-we-do.education.desc': 'Formamos la proxima generacion de investigadores y profesionales en seguridad de IA.',
    'what-we-do.community.title': 'Comunidad',
    'what-we-do.community.desc': 'Conectamos personas interesadas en construir IA segura y benefica para todos.',
    'programs.curious': 'Curioso',
    'programs.learning': 'Aprendiendo',
    'programs.participating': 'Participando',
    'programs.contributing': 'Contribuyendo',
    'join.whatsapp': 'WhatsApp',
    'join.telegram': 'Telegram',
    'join.newsletter': 'Newsletter',
    'events.hero.title': 'Eventos',
    'events.hero.subtitle': 'Charlas, paneles y talleres de seguridad de IA en Colombia.',
    'events.upcoming': 'Próximos eventos',
    'events.past': 'Eventos pasados',
    'events.viewInstagram': 'Ver en Instagram',
    'events.empty': 'Aún no hay eventos publicados. Síguenos en Instagram para enterarte de los próximos.',
    'footer.tagline': 'Construyendo un futuro seguro con inteligencia artificial en Colombia.',
    'footer.nav': 'Navegacion',
    'footer.community': 'Comunidad',
    'footer.legal': 'Todos los derechos reservados.',
  },
  en: {
    'site.title': 'AI Safety Colombia',
    'site.description': 'Building a safe future with artificial intelligence. Research, education, and community in AI safety in Colombia.',
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.hackathon': 'Hackathon',
    'nav.events': 'Events',
    'nav.programs': 'Programs',
    'nav.resources': 'Resources',
    'nav.get-involved': 'Get Involved',
    'nav.contact': 'Contact',
    'hero.title': 'AI Safety Colombia',
    'hero.subtitle': 'Building a safe future with artificial intelligence',
    'hero.cta-primary': 'Get Involved',
    'hero.cta-secondary': 'Learn More',
    'hackathon.banner.title': 'Global South AI Safety Hackathon',
    'hackathon.banner.subtitle': 'Jun 19-21 | Apart Research | Bogota',
    'hackathon.banner.cta': 'Register',
    'hackathon.banner.countdown': 'days left',
    'sections.what-we-do': 'What We Do',
    'sections.programs': 'Programs',
    'sections.metrics': 'Our Impact',
    'sections.join': 'Join the Community',
    'what-we-do.research.title': 'Research',
    'what-we-do.research.desc': 'We produce research on AI risks and alignment adapted to the Colombian and Latin American context.',
    'what-we-do.education.title': 'Education',
    'what-we-do.education.desc': 'We train the next generation of AI safety researchers and professionals.',
    'what-we-do.community.title': 'Community',
    'what-we-do.community.desc': 'We connect people interested in building safe and beneficial AI for everyone.',
    'programs.curious': 'Curious',
    'programs.learning': 'Learning',
    'programs.participating': 'Participating',
    'programs.contributing': 'Contributing',
    'join.whatsapp': 'WhatsApp',
    'join.telegram': 'Telegram',
    'join.newsletter': 'Newsletter',
    'events.hero.title': 'Events',
    'events.hero.subtitle': 'AI safety talks, panels, and workshops in Colombia.',
    'events.upcoming': 'Upcoming',
    'events.past': 'Past events',
    'events.viewInstagram': 'View on Instagram',
    'events.empty': 'No events published yet. Follow us on Instagram for upcoming ones.',
    'footer.tagline': 'Building a safe future with artificial intelligence in Colombia.',
    'footer.nav': 'Navigation',
    'footer.community': 'Community',
    'footer.legal': 'All rights reserved.',
  },
} as const;

export type Locale = keyof typeof ui;

export function t(locale: Locale, key: keyof typeof ui.es): string {
  return ui[locale][key] || ui.es[key];
}

const esEnPaths: Record<string, string> = {
  '/sobre/': '/about/',
  '/programas/': '/programs/',
  '/recursos/': '/resources/',
  '/involucrate/': '/get-involved/',
  '/contacto/': '/contact/',
  '/eventos/': '/events/',
};

const enEsPaths: Record<string, string> = Object.fromEntries(
  Object.entries(esEnPaths).map(([es, en]) => [en, es])
);

export function localePath(locale: Locale, path: string): string {
  if (locale === 'es') return path;
  const enPath = esEnPaths[path] || path;
  return `/en${enPath.startsWith('/') ? enPath : '/' + enPath}`;
}

export function altHref(locale: Locale, currentPath: string): string {
  if (locale === 'es') {
    const enPath = esEnPaths[currentPath] || currentPath;
    return `/en${enPath.startsWith('/') ? enPath : '/' + enPath}`;
  }
  const stripped = currentPath.replace(/^\/en/, '') || '/';
  return enEsPaths[stripped] || stripped;
}

export function altLocale(locale: Locale): Locale {
  return locale === 'es' ? 'en' : 'es';
}
