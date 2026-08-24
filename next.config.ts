import type { NextConfig } from "next";

/* Las direcciones que servía el sitio anterior y que este ya no tiene. Están
   repartidas por LinkedIn, por correos y por los flyers, así que no pueden
   contestar 404 el día que el dominio cambie de proyecto.

   Las que solo cambiaron de nombre van como permanentes. Las que apuntaban a
   algo que puede volver van como temporales: /confirmar era la confirmación de
   un evento concreto, /grupos/invitacion era la puerta al grupo de WhatsApp, y
   toda la sección /en es la versión en inglés, que este sitio todavía no
   tiene. Si alguna vuelve, un 308 ya cacheado en el navegador del visitante no
   habría manera de deshacerlo. */
const viejas: { from: string; to: string; permanent: boolean }[] = [
  { from: "/sobre", to: "/quienes-somos", permanent: true },
  { from: "/hackathon", to: "/sprint", permanent: false },
  { from: "/hackathon/aplicar", to: "/sprint/aplicar", permanent: false },
  { from: "/aplicar", to: "/sprint/aplicar", permanent: true },
  { from: "/contacto", to: "/unete", permanent: true },
  { from: "/grupos", to: "/unete", permanent: true },
  { from: "/grupos/invitacion", to: "/unete", permanent: false },
  { from: "/confirmar", to: "/eventos", permanent: false },
  { from: "/en", to: "/", permanent: false },
  { from: "/en/about", to: "/quienes-somos", permanent: false },
  { from: "/en/apply", to: "/sprint/aplicar", permanent: false },
  { from: "/en/contact", to: "/unete", permanent: false },
  { from: "/en/events", to: "/eventos", permanent: false },
  { from: "/en/groups", to: "/unete", permanent: false },
  { from: "/en/hackathon", to: "/sprint", permanent: false },
  { from: "/en/resources", to: "/recursos", permanent: false },
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
