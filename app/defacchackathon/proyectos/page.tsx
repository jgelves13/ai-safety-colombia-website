import { redirect } from "next/navigation";

/* Los proyectos viven ahora en la primera pestaña de la página del hackatón,
   como Entries en Apart. Esta ruta queda solo para no romper enlaces viejos. */
export default function ProyectosPage() {
  redirect("/defacchackathon#proyectos");
}
