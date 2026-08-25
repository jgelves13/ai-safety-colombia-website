"use client";

/* El agente, suelto por la pagina.
 *
 * En el encabezado el agente rompe la caja y se va. Eso pasa una sola vez por
 * carga y no vuelve. De ahi en adelante es esto: el mismo cubo, sobre una capa
 * fija del tamano de la ventana, que aparece unas pocas veces mientras alguien
 * lee y despues se acaba.
 *
 * Tres reglas lo gobiernan, y las tres salen de lo que se pidio:
 *
 *   - Se dispara al leer, no al reloj. Cada aparicion cuelga de una marca de
 *     profundidad de scroll, y cada marca se gasta una sola vez. Agotadas las
 *     marcas el agente se va del todo hasta que alguien recargue.
 *   - No repite. El repertorio son seis movidas; se barajan al montar y se
 *     consumen en orden, con el lado, el carril y el ritmo sorteados aparte.
 *     Quien vea la pagina dos veces no ve lo mismo.
 *   - Se aparta. Cruzar por encima del texto esta bien mientras vaya rapido y
 *     el trazo se borre; quedarse encima, no. Las movidas lentas miden el
 *     hueco libre antes de entrar y solo andan por ahi.
 *
 * La figura no se dibuja aca. Sale de components/agente-figura.ts, que escribe
 * scripts/agente.py: es el mismo cubo del encabezado, con el mismo andar y el
 * mismo rastro. Si se dibujara dos veces, las dos versiones se irian separando
 * con cada retoque.
 */

import { useEffect, useRef } from "react";

import {
  ANDA,
  BRINCO,
  CARAS,
  FIGURA_ALTO,
  FIGURA_ANCHO,
  PASO_LENTO,
  PASO_RAPIDO,
  PASO_X,
  PISO,
  PASO_Y,
  RASTRO,
  TRAZO,
} from "./agente-figura";

/* Lo que mide el agente en la pagina: exactamente lo que mide en la banda del
   encabezado, que lo encoge a 0,368. Achicarlo un poco mas parecia volverlo un
   visitante y no una pieza del diseno, pero lo que hacia era adelgazarle los
   trazos por debajo del pixel, y ahi el mismo dibujo se lee lavado. En
   pantallas angostas se encoge, o se come la columna entera. */
const ESCALA = 0.368;
const ESCALA_ANGOSTA = 0.28;
const ANGOSTA = 1024;

/* Los trazos del rastro que se reciclan. Un tramo vive poco mas de dos
   segundos y el cruce mas largo no llega a sesenta pasos, asi que la ranura
   se reusa mucho despues de que su tramo anterior murio. */
const TRAMOS = 72;

/* El largo de la cola, en pasos de reticula.
 *
 * En el encabezado el rastro no necesita limite: la fuga entera son diez
 * pasos, asi que lo que se ve detras del cubo es una cola y se acaba. Aca una
 * travesia deja sesenta tramos, y con el retardo del encabezado los sesenta
 * siguen encendidos a la vez: el zigzag deja de leerse como el paso de alguien
 * y se vuelve una cenefa que cruza la pagina de lado a lado. Medido contra la
 * banda real, el rastro del encabezado nunca pasa de 734 px dibujados, que a
 * su escala son trece pasos. Ese es el numero.
 *
 * Y casi todo va entero. Congelando la banda a lo largo de la fuga, los tramos
 * que se ven detras del cubo estan todos al 0,9: el apagado del encabezado
 * ocurre fuera del cuadro, porque el camino sigue mas alla del recorte, y solo
 * asoma al final de la carrera. Con seis enteros de trece, la mitad de la cola
 * de la pagina era un degradado que el encabezado no tiene, y por ahi se colaba
 * la diferencia de trazo. Nueve enteros dejan el remate corto, que es lo que se
 * ve alla. */
const COLA = 13;
const COLA_LLENO = 9;

/* El rastro del encabezado va al 0,9 sobre verde oscuro, y ahi el 10 % que
   falta lo pone el fondo: el coral sale mas hondo. Sobre crema ese mismo 10 %
   lo aclara, y el trazo se lee lavado justo al lado del cubo. La equivalencia
   es el coral entero, igual que con las caras. */
const OPACIDAD = 1;

/* El suelo.
 *
 * Cada paso del encabezado enciende la baldosa que lo sostiene. Es lo unico
 * estructural que la banda le pone al trazo, y sin ella el mismo zigzag se lee
 * como una linea suelta en vez del paso de alguien por un piso.
 *
 * El relleno se queda, pero muy bajado. Alla la baldosa se rellena porque el
 * contorno solo se confunde con la reticula que la banda tiene de fondo; aca no
 * hay reticula, pero sin nada adentro el rombo se lee como alambre y no como
 * piso. Un 0,10 sobre el bosque basta, y a esa altura no le quita nada al
 * renglon por donde pasa.
 *
 * El tamano, el grosor y el retraso no se escriben aca: salen de PISO, que
 * agente.py escribe junto con la figura. Es la misma baldosa del encabezado, y
 * si se copiara a mano las dos se irian separando con cada retoque.
 *
 * La opacidad no salio de la cuenta. Igualar el contraste del encabezado
 * —arena al 0,55 sobre verde, 4,4 a 1— pedia el bosque al 0,70 sobre crema, y
 * puesto en la pagina eso partia los renglones: oscuro sobre claro se lee mucho
 * mas duro que claro sobre oscuro, aunque el numero diga lo mismo. Se miro a
 * 0,34, 0,50 y 0,70 sobre la misma pasada. A 0,34 la baldosa se pierde y a 0,70
 * le compite al rastro; el 0,50 es donde se lee el piso y el texto sigue
 * primero. */
const PISO_COLOR = "#1f4d32";
const PISO_OPACIDAD = 0.5;
const PISO_RELLENO = 0.1;
/* Se enciende justo antes de que el pie llegue, no cuando llega. */
const PISO_ANTES = 0.1;
const PISO_ENTRA = 0.3;

/* Las dos semidiagonales del rombo, sin escalar. Un paso en x y uno en y se
   cancelan en horizontal y se suman en vertical, o al reves, asi que la celda
   proyectada es un rombo de ejes rectos. */
const PISO_HX = PISO.lado * PASO_X.x;
const PISO_HY = PISO.lado * PASO_X.y;

/* La pastilla del menu flota arriba y va por encima de esta capa, pero un
   cubo asomando por debajo se lee como un error. El agente no sube de ahi. */
const TECHO = 150;
const SUELO = 70;

/* El claro minimo, en pixeles, para que una movida lenta se meta en el. Por
   debajo de esto no hay margen: hay renglon. */
const HUECO = 230;

/* Lo que se espera entre apariciones. Una aparicion cada tanto es compania;
   una cada rato es una mosca. */
const ESPERA = 11;
const ESPERA_ANGOSTA = 20;

/* Un paso de reticula, ya en pixeles de pantalla. */
type Paso = { x: number; y: number };

/* Los pies del agente en un instante. El camino entero es una lista de
   estos: entre dos nodos seguidos hay un paso, o una pausa si no se movio. */
type Nodo = { x: number; y: number; t: number };

/* Las cuatro direcciones rectas de la pantalla salen de combinar los dos
   pasos de la reticula. Sueltos, cada uno es una diagonal; en pareja se
   enderezan, y ese zigzag es justo el andar del encabezado. */
const DERECHA: Paso[] = [
  { x: 1, y: 0 },
  { x: 0, y: -1 },
];
const IZQUIERDA: Paso[] = [
  { x: -1, y: 0 },
  { x: 0, y: 1 },
];
const ABAJO: Paso[] = [
  { x: 1, y: 0 },
  { x: 0, y: 1 },
];
const ARRIBA: Paso[] = [
  { x: -1, y: 0 },
  { x: 0, y: -1 },
];

/* Lo que avanza una pareja de pasos, para poder pedir distancias en pixeles
   y traducirlas a pasos. Van sin escalar; quien las use multiplica. */
const PAR_ANCHO = 2 * PASO_X.x;
const PAR_ALTO = 2 * PASO_X.y;

function repite(par: Paso[], n: number): Paso[] {
  const out: Paso[] = [];
  for (let k = 0; k < n; k += 1) out.push(par[0], par[1]);
  return out;
}

/* Un paso de reticula, ya puesto en pixeles de pantalla. */
function proyecta(p: Paso, e: number): Paso {
  return {
    x: (p.x * PASO_X.x + p.y * PASO_Y.x) * e,
    y: (p.x * PASO_X.y + p.y * PASO_Y.y) * e,
  };
}

function anda(nodos: Nodo[], pasos: Paso[], dur: number, e: number) {
  const u = nodos[nodos.length - 1];
  let { x, y, t } = u;
  for (const p of pasos) {
    const d = proyecta(p, e);
    x += d.x;
    y += d.y;
    t += dur;
    nodos.push({ x, y, t });
  }
}

/* Cuando cada tramo empieza y termina de borrarse.
 *
 * En una movida corta manda el reloj del encabezado y no pasa nada: el tramo
 * espera su retardo y se borra en un segundo. En una travesia larga manda la
 * distancia, porque el cubo se aleja mas rapido de lo que el reloj borra. La
 * cola queda entera hasta COLA_LLENO pasos por detras, se apaga entre ahi y
 * COLA, y de COLA para atras no hay nada. Se calcula una vez por aparicion. */
function borrados(nodos: Nodo[], e: number, extra = 0): Franja[] {
  const acum = [0];
  for (let k = 1; k < nodos.length; k += 1) {
    const a = nodos[k - 1];
    const b = nodos[k];
    acum.push(acum[k - 1] + Math.hypot(b.x - a.x, b.y - a.y));
  }

  /* En que instante el cubo llega a esta distancia del camino. El cubo anda
     su tramo en el primer 70 % de la duracion, asi que la interpolacion va
     ahi dentro y no sobre el tramo entero. */
  function llega(meta: number): number {
    let j = 1;
    while (j < nodos.length && acum[j] < meta) j += 1;
    if (j >= nodos.length) return Infinity;
    const d = acum[j] - acum[j - 1];
    const u = d > 0 ? Math.min(1, (meta - acum[j - 1]) / d) : 1;
    return nodos[j - 1].t + (nodos[j].t - nodos[j - 1].t) * ANDA * u;
  }

  const paso = LARGO_PASO * e;
  const out: Franja[] = [];
  for (let k = 0; k < nodos.length - 1; k += 1) {
    const fin = nodos[k + 1].t;
    const a = Math.min(fin + RASTRO.retardo + extra, llega(acum[k + 1] + paso * COLA_LLENO));
    const b = Math.min(
      fin + RASTRO.retardo + extra + RASTRO.borra,
      llega(acum[k + 1] + paso * COLA),
    );
    out.push([a, Math.max(b, a + 0.12)]);
  }
  return out;
}

function alto(nodos: Nodo[], dur: number) {
  const u = nodos[nodos.length - 1];
  nodos.push({ x: u.x, y: u.y, t: u.t + dur });
}

/* ------------------------------------------------------------ el terreno */

type Franja = [number, number];

function fusiona(tramos: Franja[]): Franja[] {
  if (!tramos.length) return [];
  const orden = tramos.slice().sort((a, b) => a[0] - b[0]);
  const out: Franja[] = [orden[0]];
  for (const [a, b] of orden.slice(1)) {
    const u = out[out.length - 1];
    if (a <= u[1]) u[1] = Math.max(u[1], b);
    else out.push([a, b]);
  }
  return out;
}

/* Lo que hay escrito o pulsable dentro de una franja horizontal de la
   ventana, medido de verdad contra el DOM. Se miran las hojas del arbol,
   que es donde vive el texto, y se descartan los envoltorios que ocupan
   casi todo el ancho: esos son secciones, no renglones. */
function ocupado(y0: number, y1: number, W: number): Franja[] {
  const raiz = document.querySelector("main");
  if (!raiz) return [[0, W]];
  const out: Franja[] = [];
  const nodos = raiz.querySelectorAll<HTMLElement>(
    "p,h1,h2,h3,h4,h5,li,a,button,img,svg,input,textarea,label,td,th,figure,blockquote,summary",
  );
  nodos.forEach((n) => {
    const r = n.getBoundingClientRect();
    if (r.width <= 0 || r.height <= 0) return;
    if (r.bottom < y0 || r.top > y1) return;
    if (r.width > W * 0.92) return;
    out.push([r.left - 14, r.right + 14]);
  });
  return fusiona(out);
}

/* El complemento: los claros de la franja que llegan al ancho pedido. */
function huecos(y0: number, y1: number, W: number, minimo: number): Franja[] {
  const out: Franja[] = [];
  let x = 0;
  for (const [a, b] of ocupado(y0, y1, W)) {
    if (a - x >= minimo) out.push([x, a]);
    x = Math.max(x, b);
  }
  if (W - x >= minimo) out.push([x, W]);
  return out;
}

/* ------------------------------------------------------------ el guion */

type Ctx = {
  W: number;
  H: number;
  e: number;
  azar: () => number;
};

function carril(c: Ctx): number {
  const a = TECHO + FIGURA_ALTO * c.e;
  const b = c.H - SUELO;
  return a + c.azar() * Math.max(0, b - a);
}

function ritmo(c: Ctx, base: number): number {
  return base * (0.88 + c.azar() * 0.3);
}

function pares(px: number, c: Ctx): number {
  return Math.max(1, Math.ceil(px / (PAR_ANCHO * c.e)));
}

/* Entra por fuera del cuadro y sale por fuera del cuadro. Nunca aparece ni
   desaparece a la vista: cuando no esta, no esta. */
function borde(c: Ctx, hacia: 1 | -1): number {
  const fuera = FIGURA_ANCHO * c.e + 20;
  return hacia === 1 ? -fuera : c.W + fuera;
}

/* ------------------------------------------------- el andar sin rumbo */

/* La ruleta de lo que hace entre dos tramos de avance. Los tramos rectos se
   quedan con el resto, que es la mayoria: si en cada esquina pasara algo, el
   andar dejaria de leerse como andar. */
const LADEO = 0.34;
const RECULA = 0.46;
const PARADA = 0.6;
const DUDA = 0.7;

/* Por donde puede salirse de la linea y hasta donde. `mas` empuja el eje
   hacia arriba en numero —abajo en pantalla, si el eje es y—. */
type Vagar = {
  mas: Paso[];
  menos: Paso[];
  eje: "x" | "y";
  salto: number;
  franja: Franja;
  tope: number;
};

function contrario(par: Paso[]): Paso[] {
  return par.map((p) => ({ x: -p.x, y: -p.y }));
}

/* El vagar de una travesia: se ladea entre el techo y el suelo. */
function vertical(c: Ctx, tope: number): Vagar {
  return {
    mas: ABAJO,
    menos: ARRIBA,
    eje: "y",
    salto: PAR_ALTO * c.e,
    franja: [TECHO + FIGURA_ALTO * c.e, c.H - SUELO],
    tope,
  };
}

/* Gasta n parejas de avance, pero no de un tiron.
 *
 * Un cruce de punta a punta son unas quince parejas, y andadas seguidas dan
 * una linea de regla. Aca las mismas quince salen en tramos de dos a cinco,
 * cada uno con su propio ritmo, y entre tramo y tramo el agente hace algo: se
 * ladea, recula un paso, se para, estira el pie al vacio y lo recoge.
 *
 * El avance neto no cambia. Las parejas perpendiculares no corren en el eje
 * del avance, y lo que recula se le devuelve al presupuesto, asi que la
 * entrada y la salida quedan donde el guion las puso; lo impredecible es el
 * camino de en medio.
 *
 * `v` es lo unico que lo sujeta. Sin franja una travesia se sube al
 * encabezado o se cae del cuadro, y una movida lenta se sale del claro que
 * midio antes de arrancar. Por eso las lentas lo pasan en null: cambian de
 * ritmo y se paran, pero no se mueven de su carril. */
function vaga(
  c: Ctx,
  nodos: Nodo[],
  avance: Paso[],
  n: number,
  base: number,
  v: Vagar | null,
) {
  const atras = contrario(avance);
  let quedan = n;
  /* Reculando se puede gastar el presupuesto y volverlo a llenar. El tope de
     vueltas es lo que impide que un mal dado lo deje andando para siempre. */
  for (let vuelta = 0; quedan > 0 && vuelta < 40; vuelta += 1) {
    const tramo = Math.min(quedan, 2 + Math.floor(c.azar() * 4));
    anda(nodos, repite(avance, tramo), ritmo(c, base), c.e);
    quedan -= tramo;
    if (quedan <= 0) return;

    const dado = c.azar();
    if (v && dado < LADEO) {
      const u = nodos[nodos.length - 1][v.eje];
      const crece = c.azar() < 0.5;
      const sitio = Math.floor(
        (crece ? v.franja[1] - u : u - v.franja[0]) / v.salto,
      );
      const cabe = Math.min(v.tope, sitio);
      if (cabe >= 1) {
        anda(
          nodos,
          repite(crece ? v.mas : v.menos, 1 + Math.floor(c.azar() * cabe)),
          ritmo(c, base),
          c.e,
        );
      }
    } else if (v && dado < RECULA) {
      anda(nodos, repite(atras, 1), ritmo(c, base), c.e);
      alto(nodos, 0.14 + c.azar() * 0.2);
      quedan += 1;
    } else if (dado < PARADA) {
      alto(nodos, 0.1 + c.azar() * 0.28);
    } else if (dado < DUDA) {
      /* Medio paso al vacio y de vuelta: la duda del encabezado. Ese medio
         paso es diagonal, asi que en una movida vertical se sale de lado; se
         mide contra la franja antes de darlo. */
      const medio: Paso = { x: avance[0].x * 0.45, y: avance[0].y * 0.45 };
      const fin = v
        ? nodos[nodos.length - 1][v.eje] + proyecta(medio, c.e)[v.eje]
        : 0;
      if (!v || (fin >= v.franja[0] && fin <= v.franja[1])) {
        anda(nodos, [medio], base * 2.4, c.e);
        anda(nodos, [{ x: -medio.x, y: -medio.y }], base * 2, c.e);
      }
    }
  }
  if (quedan > 0) anda(nodos, repite(avance, quedan), ritmo(c, base), c.e);
}

/* Lo devuelve al carril que la movida midio. Un claro se midio a una altura;
   si lo que sigue es lento y empieza a otra, se acuesta sobre un renglon. */
function endereza(c: Ctx, nodos: Nodo[], y: number, dur: number) {
  const u = nodos[nodos.length - 1];
  const k = Math.round((y - u.y) / (PAR_ALTO * c.e));
  if (k !== 0) {
    anda(nodos, repite(k > 0 ? ABAJO : ARRIBA, Math.abs(k)), dur, c.e);
  }
}

/* 1. El cruce. Entra por un lado, atraviesa la ventana y sale por el otro.
      Rapido, porque pasa por encima de lo que haya, y sin rumbo fijo: la
      altura de salida no es la de entrada. */
function cruce(c: Ctx): Nodo[] {
  const hacia: 1 | -1 = c.azar() < 0.5 ? 1 : -1;
  const nodos: Nodo[] = [{ x: borde(c, hacia), y: carril(c), t: 0 }];
  const n = pares(c.W + FIGURA_ANCHO * c.e * 3, c);
  vaga(c, nodos, hacia === 1 ? DERECHA : IZQUIERDA, n, PASO_RAPIDO, vertical(c, 2));
  return nodos;
}

/* 2. El escalon. Cruza, pero a mitad de camino cambia de carril. El cambio
      es de una vez y de un carril entero: para que se lea como decision no
      puede venir de un ladeo, asi que este es el unico que no se ladea. */
function escalon(c: Ctx): Nodo[] {
  const hacia: 1 | -1 = c.azar() < 0.5 ? 1 : -1;
  const y = carril(c);
  const nodos: Nodo[] = [{ x: borde(c, hacia), y, t: 0 }];
  const d = ritmo(c, PASO_RAPIDO);
  const total = pares(c.W + FIGURA_ANCHO * c.e * 3, c);
  const primero = Math.max(2, Math.round(total * (0.3 + c.azar() * 0.3)));
  const lateral = hacia === 1 ? DERECHA : IZQUIERDA;

  const arriba = y > c.H * 0.55;
  const salto = Math.max(
    1,
    Math.round((c.H * (0.12 + c.azar() * 0.14)) / (PAR_ALTO * c.e)),
  );

  vaga(c, nodos, lateral, primero, PASO_RAPIDO, null);
  anda(nodos, repite(arriba ? ARRIBA : ABAJO, salto), d, c.e);
  vaga(c, nodos, lateral, total - primero + 2, PASO_RAPIDO, null);
  return nodos;
}

/* 3. El rebote. Entra, se mete hasta bien adentro, se lo piensa y se
      devuelve por donde vino. */
function rebote(c: Ctx): Nodo[] {
  const hacia: 1 | -1 = c.azar() < 0.5 ? 1 : -1;
  const nodos: Nodo[] = [{ x: borde(c, hacia), y: carril(c), t: 0 }];
  const n = pares(c.W * (0.55 + c.azar() * 0.3), c);
  const ida = hacia === 1 ? DERECHA : IZQUIERDA;
  const vuelta = hacia === 1 ? IZQUIERDA : DERECHA;

  vaga(c, nodos, ida, n, PASO_RAPIDO, vertical(c, 2));
  alto(nodos, 0.28 + c.azar() * 0.3);
  vaga(c, nodos, vuelta, n + 1, PASO_RAPIDO, vertical(c, 2));
  return nodos;
}

/* 4. El asomo. Se mete por el margen, se para a mirar y se devuelve. Lento,
      asi que necesita un margen de verdad: un claro pegado a un borde. */
function asomo(c: Ctx): Nodo[] | null {
  const y = carril(c);
  const libres = huecos(y - FIGURA_ALTO * c.e, y + 30, c.W, HUECO);
  const izq = libres.find((h) => h[0] <= 2);
  const der = libres.find((h) => h[1] >= c.W - 2);
  const lado = izq && der ? (c.azar() < 0.5 ? izq : der) : izq || der;
  if (!lado) return null;

  const hacia: 1 | -1 = lado[0] <= 2 ? 1 : -1;
  const nodos: Nodo[] = [{ x: borde(c, hacia), y, t: 0 }];
  const fondo = Math.max(1, Math.floor((lado[1] - lado[0]) * 0.75));
  const n = pares(fondo, c);
  const ida = hacia === 1 ? DERECHA : IZQUIERDA;
  const vuelta = hacia === 1 ? IZQUIERDA : DERECHA;

  /* Sin ladeo: el claro se midio a esta altura y la movida es lenta. Lo que
     le queda de suelto es el ritmo y las paradas. */
  vaga(c, nodos, ida, n, PASO_LENTO, null);
  alto(nodos, 0.9 + c.azar() * 0.7);
  vaga(c, nodos, vuelta, n + 1, PASO_LENTO, null);
  return nodos;
}

/* 5. El tanteo. Llega rapido hasta un claro cualquiera, ahi baja el ritmo,
      estira medio paso hacia donde no hay nada y lo recoge. Es la duda del
      encabezado, otra vez: una pausa no se ve; lo que se ve es el pie que se
      asoma al vacio y vuelve. */
function tanteo(c: Ctx): Nodo[] | null {
  const y = carril(c);
  const libres = huecos(y - FIGURA_ALTO * c.e, y + 30, c.W, HUECO);
  if (!libres.length) return null;
  const claro = libres[Math.floor(c.azar() * libres.length)];
  const medio = (claro[0] + claro[1]) / 2;

  const hacia: 1 | -1 = medio < c.W / 2 ? 1 : -1;
  const nodos: Nodo[] = [{ x: borde(c, hacia), y, t: 0 }];
  const rapido = ritmo(c, PASO_RAPIDO);
  const lento = ritmo(c, PASO_LENTO);
  const ida = hacia === 1 ? DERECHA : IZQUIERDA;

  const llegada = Math.abs(medio - nodos[0].x) - PAR_ANCHO * c.e * 2;
  vaga(c, nodos, ida, pares(Math.max(0, llegada), c), PASO_RAPIDO, vertical(c, 2));
  endereza(c, nodos, y, rapido);
  anda(nodos, repite(ida, 2), lento, c.e);
  alto(nodos, 0.35);
  const asoma: Paso = { x: 0.45 * (hacia === 1 ? 1 : -1), y: 0 };
  anda(nodos, [asoma], 0.24, c.e);
  anda(nodos, [{ x: -asoma.x, y: 0 }], 0.2, c.e);
  alto(nodos, 0.6 + c.azar() * 0.5);
  const salida =
    hacia === 1
      ? c.W - nodos[nodos.length - 1].x
      : nodos[nodos.length - 1].x;
  vaga(
    c,
    nodos,
    ida,
    pares(salida + FIGURA_ANCHO * c.e * 2, c),
    PASO_RAPIDO,
    vertical(c, 2),
  );
  return nodos;
}

/* 6. El paseo. Un corredor libre de arriba abajo, andado despacio. Es la
      unica movida que se toma la ventana entera de alto, asi que mide toda
      la franja y no un carril. */
function paseo(c: Ctx): Nodo[] | null {
  const libres = huecos(TECHO, c.H - SUELO, c.W, HUECO);
  if (!libres.length) return null;
  const claro = libres[Math.floor(c.azar() * libres.length)];
  const x = claro[0] + (0.3 + c.azar() * 0.4) * (claro[1] - claro[0]);

  const baja = c.azar() < 0.5;
  const fuera = FIGURA_ALTO * c.e + 40;
  const nodos: Nodo[] = [
    { x, y: baja ? TECHO - fuera : c.H + fuera, t: 0 },
  ];
  const n = Math.ceil((c.H + fuera * 2) / (PAR_ALTO * c.e));

  /* Aca el ladeo es lateral, y lo encierra el corredor mismo: la franja se
     mete un 15 % por cada lado del claro para que el bulto no lo desborde. */
  const ancho = claro[1] - claro[0];
  const lado: Vagar = {
    mas: DERECHA,
    menos: IZQUIERDA,
    eje: "x",
    salto: PAR_ANCHO * c.e,
    franja: [claro[0] + ancho * 0.15, claro[1] - ancho * 0.15],
    tope: 1,
  };
  vaga(c, nodos, baja ? ABAJO : ARRIBA, n, PASO_LENTO, lado);
  return nodos;
}

type Movida = (c: Ctx) => Nodo[] | null;

const REPERTORIO: Movida[] = [cruce, escalon, rebote, asomo, tanteo, paseo];
const REPERTORIO_ANGOSTO: Movida[] = [cruce, escalon, rebote];

/* ------------------------------------------------------------ el motor */

/* Lo que mide un paso entero de reticula, para medir contra el los pasos
   cortos: medio paso tiene que levantar medio brinco, o la duda se lee como
   un salto. */
const LARGO_PASO = Math.hypot(PASO_X.x, PASO_X.y);

/* Donde estan los pies en el instante t. De cada paso, ANDA se anda y el
   resto se descansa; el brinco es lo que lo separa de una ficha arrastrada. */
function posicion(nodos: Nodo[], t: number, e: number) {
  if (t <= nodos[0].t) return { x: nodos[0].x, y: nodos[0].y };
  for (let k = 0; k < nodos.length - 1; k += 1) {
    const a = nodos[k];
    const b = nodos[k + 1];
    if (t > b.t) continue;
    const u = Math.min(1, Math.max(0, (t - a.t) / (b.t - a.t)));
    const v = Math.min(1, u / ANDA);
    const largo = Math.hypot(b.x - a.x, b.y - a.y);
    const salto = BRINCO * e * Math.min(1, largo / (LARGO_PASO * e));
    return {
      x: a.x + (b.x - a.x) * v,
      y: a.y + (b.y - a.y) * v - salto * Math.sin(Math.PI * v),
    };
  }
  const u = nodos[nodos.length - 1];
  return { x: u.x, y: u.y };
}

function baraja<T>(xs: T[], azar: () => number): T[] {
  const out = xs.slice();
  for (let k = out.length - 1; k > 0; k -= 1) {
    const j = Math.floor(azar() * (k + 1));
    [out[k], out[j]] = [out[j], out[k]];
  }
  return out;
}

export function AgenteSuelto() {
  const svg = useRef<SVGSVGElement>(null);
  const cubo = useRef<SVGGElement>(null);
  const piel = useRef<SVGGElement>(null);
  const rastro = useRef<SVGGElement>(null);
  const suelo = useRef<SVGGElement>(null);

  useEffect(() => {
    if (!cubo.current || !piel.current || !rastro.current || !suelo.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const gCubo: SVGGElement = cubo.current;
    const gPiel: SVGGElement = piel.current;
    const gRastro: SVGGElement = rastro.current;
    const gSuelo: SVGGElement = suelo.current;

    const azar = Math.random;
    const trazos = Array.from(gRastro.children) as SVGPathElement[];
    const baldosas = Array.from(gSuelo.children) as SVGPolygonElement[];

    const angosta = () => window.innerWidth < ANGOSTA;
    const marcas = (
      angosta() ? [0.25, 0.55, 0.85] : [0.18, 0.32, 0.47, 0.61, 0.75, 0.9]
    ).map((f) => f + (azar() - 0.5) * 0.06);
    const gastadas = marcas.map(() => false);
    const repertorio = baraja(angosta() ? REPERTORIO_ANGOSTO : REPERTORIO, azar);
    let siguiente = 0;

    let nodos: Nodo[] | null = null;
    let borra: Franja[] = [];
    let borraPiso: Franja[] = [];
    let arranque = 0;
    let escala = ESCALA;
    let raf = 0;
    let ultima = -Infinity;
    let espera: number | undefined;

    /* El enfriamiento se cuenta desde que la aparicion termina, no desde que
       arranca: si no, un paseo de seis segundos se come casi toda la espera y
       la siguiente sale pisandole los talones. */
    function limpia() {
      nodos = null;
      ultima = performance.now();
      gCubo.style.opacity = "0";
      for (const p of trazos) p.style.opacity = "0";
      for (const b of baldosas) b.style.opacity = "0";
    }

    function marco(ahora: number) {
      if (!nodos) return;
      const t = (ahora - arranque) / 1000;
      const fin = nodos[nodos.length - 1].t;

      const p = posicion(nodos, t, escala);
      gCubo.setAttribute("transform", `translate(${p.x.toFixed(1)},${p.y.toFixed(1)})`);

      for (let k = 0; k < nodos.length - 1; k += 1) {
        const a = nodos[k];
        const b = nodos[k + 1];
        const trazo = trazos[k % TRAMOS];
        const losa = baldosas[k % TRAMOS];
        const dibuja = a.t + ANDA * (b.t - a.t);
        const [empieza, muere] = borra[k];

        /* La baldosa se enciende justo antes de que el pie llegue y se va un
           poco despues que la marca. En una pausa no hay baldosa nueva: el
           cubo se queda en la celda que ya esta encendida. */
        const quieto = a.x === b.x && a.y === b.y;
        const [pEmpieza, pMuere] = borraPiso[k];
        if (quieto || t < a.t - PISO_ANTES || t > pMuere) {
          if (losa.style.opacity !== "0") losa.style.opacity = "0";
        } else {
          const entra = Math.min(1, (t - (a.t - PISO_ANTES)) / PISO_ENTRA);
          const va = Math.max(0, (t - pEmpieza) / (pMuere - pEmpieza));
          losa.setAttribute(
            "points",
            `${b.x.toFixed(1)},${(b.y - PISO_HY * escala).toFixed(1)} ` +
              `${(b.x + PISO_HX * escala).toFixed(1)},${b.y.toFixed(1)} ` +
              `${b.x.toFixed(1)},${(b.y + PISO_HY * escala).toFixed(1)} ` +
              `${(b.x - PISO_HX * escala).toFixed(1)},${b.y.toFixed(1)}`,
          );
          losa.style.opacity = String(
            PISO_OPACIDAD * entra * (1 - Math.min(1, va)),
          );
        }

        if (t < a.t || t > muere || quieto) {
          if (trazo.style.opacity !== "0") trazo.style.opacity = "0";
          continue;
        }
        const largo = Math.hypot(b.x - a.x, b.y - a.y);
        const v = Math.min(1, (t - a.t) / Math.max(0.001, dibuja - a.t));
        const ido = Math.max(0, (t - empieza) / (muere - empieza));
        trazo.setAttribute("d", `M${a.x.toFixed(1)} ${a.y.toFixed(1)}L${b.x.toFixed(1)} ${b.y.toFixed(1)}`);
        /* el hueco va mas largo que el trazo, o el remate redondo deja un
           punto suelto al final de lo que todavia no se anda. Los cuatro son
           los del encabezado, y alla estan en unidades de la reticula. */
        trazo.setAttribute("stroke-dasharray", `${largo.toFixed(1)} ${(largo + 4 * escala).toFixed(1)}`);
        trazo.setAttribute("stroke-dashoffset", (largo * (1 - v)).toFixed(1));
        trazo.style.opacity = String(OPACIDAD * (1 - Math.min(1, ido)));
      }

      if (t > fin + RASTRO.retardo + RASTRO.borra) {
        limpia();
        return;
      }
      if (t > fin) gCubo.style.opacity = "0";
      raf = requestAnimationFrame(marco);
    }

    function suelta() {
      if (nodos) return;
      const c: Ctx = {
        W: window.innerWidth,
        H: window.innerHeight,
        e: angosta() ? ESCALA_ANGOSTA : ESCALA,
        azar,
      };
      /* Se prueban las movidas en orden desde la que toca. Las lentas
         devuelven null cuando no encuentran claro, y entonces le pasan el
         turno a la siguiente en vez de meterse encima de un renglon. */
      let guion: Nodo[] | null = null;
      for (let k = 0; k < repertorio.length && !guion; k += 1) {
        const i = (siguiente + k) % repertorio.length;
        guion = repertorio[i](c);
        if (guion) siguiente = i + 1;
      }
      if (!guion) return;

      escala = c.e;
      gPiel.setAttribute("transform", `scale(${c.e})`);
      for (const p of trazos) {
        p.setAttribute("stroke-width", String(RASTRO.ancho * c.e));
        p.style.opacity = "0";
      }
      for (const b of baldosas) {
        b.setAttribute("stroke-width", String(PISO.ancho * c.e));
        b.style.opacity = "0";
      }
      nodos = guion;
      borra = borrados(guion, c.e);
      borraPiso = borrados(guion, c.e, PISO.retardo);
      arranque = performance.now();
      gCubo.style.opacity = "1";
      raf = requestAnimationFrame(marco);
    }

    /* El disparo cuelga del scroll, pero espera a que el scroll pare: la
       medida del hueco libre solo vale contra una pagina quieta, y quien
       acaba de frenar es quien esta leyendo. */
    function mira() {
      if (nodos) return;
      const altoDoc = document.documentElement.scrollHeight - window.innerHeight;
      if (altoDoc <= 0) return;
      /* Armado solo cuando el encabezado ya se fue de la pantalla: mientras
         se ve la fuga, el agente esta ahi y no puede estar en dos partes. */
      if (window.scrollY < window.innerHeight * 0.9) return;
      const d = window.scrollY / altoDoc;
      const k = marcas.findIndex((m, i) => !gastadas[i] && d >= m);
      if (k < 0) return;
      const hueco = angosta() ? ESPERA_ANGOSTA : ESPERA;
      if (performance.now() - ultima < hueco * 1000) return;
      gastadas[k] = true;
      suelta();
      /* Gastadas todas las marcas se acabo la visita. Nada de rondar hasta
         que alguien recargue. */
      if (gastadas.every(Boolean)) window.removeEventListener("scroll", alScroll);
    }

    function alScroll() {
      window.clearTimeout(espera);
      espera = window.setTimeout(mira, 180);
    }

    function alOcultar() {
      if (document.hidden && nodos) {
        cancelAnimationFrame(raf);
        limpia();
      }
    }

    window.addEventListener("scroll", alScroll, { passive: true });
    document.addEventListener("visibilitychange", alOcultar);
    return () => {
      window.removeEventListener("scroll", alScroll);
      document.removeEventListener("visibilitychange", alOcultar);
      window.clearTimeout(espera);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <svg
      ref={svg}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-40 h-full w-full select-none motion-reduce:hidden"
    >
      <g ref={suelo} fill={PISO_COLOR} fillOpacity={PISO_RELLENO} stroke={PISO_COLOR}>
        {Array.from({ length: TRAMOS }, (_, k) => (
          <polygon key={k} style={{ opacity: 0 }} />
        ))}
      </g>
      <g ref={rastro} fill="none" stroke={TRAZO} strokeLinecap="round">
        {Array.from({ length: TRAMOS }, (_, k) => (
          <path key={k} style={{ opacity: 0 }} />
        ))}
      </g>
      <g ref={cubo} strokeLinejoin="round" strokeLinecap="round" style={{ opacity: 0 }}>
        <g ref={piel} transform={`scale(${ESCALA})`}>
          {CARAS.map((cara, k) => (
            <polygon
              key={k}
              points={cara.pts}
              fill={cara.relleno}
              stroke={TRAZO}
              strokeWidth={cara.ancho}
            />
          ))}
        </g>
      </g>
    </svg>
  );
}
