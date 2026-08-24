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
  { from: "/hackathon", to: "/sprint", permanent: false },
  { from: "/hackathon/aplicar", to: "/sprint/aplicar", permanent: false },
  { from: "/aplicar", to: "/sprint/aplicar", permanent: true },
  { from: "/contacto", to: "/unete", permanent: true },
  { from: "/grupos", to: "/unete", permanent: true },
  { from: "/grupos/invitacion", to: "/unete", permanent: false },
  { from: "/confirmar", to: "/eventos", permanent: false },
  { from: "/en/apply", to: "/en/sprint/apply", permanent: true },
  { from: "/en/contact", to: "/en/join", permanent: true },
  { from: "/en/events", to: "/eventos", permanent: false },
  { from: "/en/groups", to: "/en/join", permanent: true },
  { from: "/en/hackathon", to: "/en/sprint", permanent: false },
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
