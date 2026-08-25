// Generado por scripts/agente.py. No editar a mano.
//
// El agente, quieto en el origen. Las tres caras del cubo en coordenadas
// locales, con el centro de su huella en (0,0): el componente que lo pasea
// solo tiene que trasladarlo y escalarlo.

export type Cara = { pts: string; relleno: string; ancho: number };

export const TRAZO = "#e5604d";

export const CARAS: Cara[] = [
  { pts: "-82.84,-96.22 0.00,-48.11 0.00,48.11 -82.84,0.00", relleno: "#aa4234", ancho: 1.9 },
  { pts: "82.84,-96.22 0.00,-48.11 0.00,48.11 82.84,0.00", relleno: "#8a3226", ancho: 1.9 },
  { pts: "0.00,-144.33 82.84,-96.22 0.00,-48.11 -82.84,-96.22", relleno: "#e5604d", ancho: 3.4 },
];

/* Un paso de la reticula isometrica, en unidades locales. Andar en +x
   mueve la figura por PASO_X y andar en +y por PASO_Y. Combinandolos
   salen las cuatro direcciones rectas de la pantalla: -x +y va a la
   izquierda, +x -y a la derecha, +x +y abajo y -x -y arriba. */
export const PASO_X = { x: 131.16, y: 76.17 };
export const PASO_Y = { x: -131.16, y: 76.17 };

/* Lo alto del brinco: el cubo no se desliza de celda en celda, se levanta
   un poco a mitad de paso. Sin eso anda como una ficha arrastrada. */
export const BRINCO = 19.24;

/* Lo que ocupa la figura, para poder pedirle un tamano en pixeles. */
export const FIGURA_ANCHO = 165.68;
export const FIGURA_ALTO = 192.44;

/* El andar, en segundos por paso. Son los mismos de la fuga: el agente de
   la pagina y el del encabezado tienen que moverse igual, o se leen como
   dos bichos distintos. */
export const PASO_RAPIDO = 0.062;
export const PASO_LENTO = 0.135;

/* De cada paso, la fraccion que se anda; el resto es descanso. */
export const ANDA = 0.70;

/* El rastro: ancho y opacidad del trazo, lo que aguanta un tramo antes de
   empezar a irse y lo que tarda en irse. */
export const RASTRO = {
  ancho: 6.5,
  opacidad: 0.90,
  retardo: 1.25,
  borra: 1.00,
};

/* La baldosa que cada paso enciende debajo. El lado va en celdas, y ese 5 %
   que le falta para la celda entera es el hueco que la separa de la
   siguiente. La baldosa se va un poco despues que la marca que le quedo
   encima. */
export const PISO = {
  lado: 0.95,
  ancho: 3.0,
  retardo: 0.35,
};
