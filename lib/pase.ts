/* Pase extemporáneo al formulario del sprint.

   Cuando alguien llega tarde y vale la pena recibirlo, el enlace `?pase=<clave>`
   le vuelve a abrir el formulario a esa persona sin mover el cierre para nadie
   más. La clave vive en la variable de entorno SPRINT_PASE; si no está puesta,
   ningún pase sirve y el cierre del 6 de septiembre manda igual que siempre.

   Vive acá y no en `app/sprint/datos.ts` a propósito: ese módulo lo importa el
   formulario, que es componente de cliente, y la clave no puede terminar cerca
   de un paquete que se le manda al navegador. Nada de esto se importa desde el
   cliente: la página lee el pase en el servidor y el formulario solo lo devuelve
   tal como se lo pasaron. */
export function paseValido(pase?: string | null): boolean {
  const clave = process.env.SPRINT_PASE?.trim();
  return Boolean(clave) && typeof pase === "string" && pase.trim() === clave;
}
