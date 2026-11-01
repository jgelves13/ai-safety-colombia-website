import type { NextConfig } from "next";

/* Las direcciones que servía el sitio anterior y que este ya no tiene. Están
   repartidas por LinkedIn, por correos y por los flyers, así que no pueden
   contestar 404 el día que el dominio cambie de proyecto.

   Las que solo cambiaron de nombre van como permanentes. Las que apuntaban a
   algo que puede volver van como temporales: /confirmar era la confirmación de
   un evento concreto y /grupos/invitacion era la puerta al grupo de WhatsApp.
   Si alguna vuelve, un 308 ya cacheado en el navegador del visitante no habría
   manera de deshacerlo.

   Las direcciones de /en que este sitio sí tiene (/en, /en/about, /en/resources)
   salieron de esta lista el día que se publicó el árbol en inglés: ahora son
   páginas, no redirecciones. Las que quedan son las que el sitio viejo servía y
   este no tiene, y apuntan dentro del mismo idioma. */
const viejas: { from: string; to: string; permanent: boolean }[] = [
  { from: "/sobre", to: "/quienes-somos", permanent: true },
  { from: "/hackathon", to: "/defacchackathon", permanent: false },
  { from: "/hackathon/aplicar", to: "/defacchackathon/aplicar", permanent: false },
  { from: "/defacc-hackathon", to: "/defacchackathon", permanent: false },
  { from: "/defacc-hackathon/aplicar", to: "/defacchackathon/aplicar", permanent: false },
  { from: "/def-acc-hackathon", to: "/defacchackathon", permanent: false },
  { from: "/def-acc-hackathon/aplicar", to: "/defacchackathon/aplicar", permanent: false },
  { from: "/def-acc", to: "/defacchackathon", permanent: false },
  { from: "/cyberbear", to: "/defacchackathon", permanent: false },
  { from: "/aplicar", to: "/defacchackathon/aplicar", permanent: false },
  { from: "/contacto", to: "/unete", permanent: true },
  { from: "/grupos", to: "/unete", permanent: true },
  { from: "/grupos/invitacion", to: "/unete", permanent: false },
  { from: "/confirmar", to: "/eventos", permanent: false },
  { from: "/en/apply", to: "/en/defacchackathon/apply", permanent: false },
  { from: "/en/contact", to: "/en/join", permanent: true },
  { from: "/en/groups", to: "/en/join", permanent: true },
  { from: "/en/hackathon", to: "/en/defacchackathon", permanent: false },
  { from: "/en/def-acc-hackathon", to: "/en/defacchackathon", permanent: false },
  { from: "/pt/hackathon", to: "/pt/defacchackathon", permanent: false },
  { from: "/pt/def-acc-hackathon", to: "/pt/defacchackathon", permanent: false },

  /* La via de recomendacion se llamo un dia "rapido", que describia el formato
     y no para quien era. Van temporales, no permanentes: la direccion es de
     ayer, y si vuelve a cambiar de nombre un 308 ya cacheado en el navegador
     del visitante no habria manera de deshacerlo. */
  { from: "/sprint/aplicar/rapido", to: "/sprint/aplicar/recomendacion", permanent: false },
  { from: "/en/sprint/apply/quick", to: "/en/sprint/apply/referral", permanent: false },
  { from: "/pt/sprint/inscricao/rapida", to: "/pt/sprint/inscricao/indicacao", permanent: false },

  /* Los seminarios de BlueDot vivieron un día en /cursos/<nombre de BlueDot>;
     ahora llevan el nombre con el que se anuncian. Temporales por lo mismo. */
  { from: "/cursos/agi-strategy", to: "/seminarios/futuro-y-riesgos", permanent: false },
  { from: "/cursos/technical-ai-safety", to: "/seminarios/tecnico", permanent: false },
  { from: "/cursos/aplicar", to: "/seminarios/aplicar", permanent: false },
  { from: "/en/courses/agi-strategy", to: "/en/seminars/future-and-risks", permanent: false },
  { from: "/en/courses/technical-ai-safety", to: "/en/seminars/technical", permanent: false },
  { from: "/en/courses/apply", to: "/en/seminars/apply", permanent: false },
  { from: "/pt/cursos/agi-strategy", to: "/pt/seminarios/futuro-e-riscos", permanent: false },
  { from: "/pt/cursos/technical-ai-safety", to: "/pt/seminarios/tecnico", permanent: false },
  { from: "/pt/cursos/inscricao", to: "/pt/seminarios/inscricao", permanent: false },

  /* Y un día más con el nombre largo; ahora el slug es corto. */
  { from: "/seminarios/futuro-y-riesgos-de-la-ia", to: "/seminarios/futuro-y-riesgos", permanent: false },
  { from: "/seminarios/tecnico-seguridad-de-la-ia", to: "/seminarios/tecnico", permanent: false },
  { from: "/en/seminars/future-and-risks-of-ai", to: "/en/seminars/future-and-risks", permanent: false },
  { from: "/en/seminars/technical-ai-safety", to: "/en/seminars/technical", permanent: false },
  { from: "/pt/seminarios/futuro-e-riscos-da-ia", to: "/pt/seminarios/futuro-e-riscos", permanent: false },
  { from: "/pt/seminarios/tecnico-seguranca-da-ia", to: "/pt/seminarios/tecnico", permanent: false },
];

const nextConfig: NextConfig = {
  /* Dev only. Next blocks cross-origin requests to dev assets, so opening the
     server on a LAN address serves the HTML but not the client chunks — the
     page renders and never hydrates. These are the local addresses we open it
     from; it has no effect on a production build. */
  allowedDevOrigins: ["192.168.56.1", "10.195.13.169"],

  async redirects() {
    return viejas.map((r) => ({
      source: r.from,
      destination: r.to,
      permanent: r.permanent,
    }));
  },
};

export default nextConfig;
