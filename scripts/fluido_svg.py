# -*- coding: utf-8 -*-
u"""Saca la simulacion a un SVG que el navegador pueda animar.

La fisica corre aqui, una sola vez, y de cada instante se guarda la linea de
nivel del campo. Esa linea es un solo trazo: el chorro y el charco son el
mismo contorno, asi que no hay costura que esconder ni forma que pegar.

En el navegador no queda fisica, queda un `d` que se interpola entre los
instantes guardados. Para que la interpolacion no retuerza la forma, todos
los cuadros llevan el mismo numero de trozos y el mismo numero de puntos, con
el punto cero siempre en el mismo sitio y siempre en el mismo sentido.

    py -X utf8 scripts/fluido_svg.py
"""
import hashlib
import io
import os
import re
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

import numpy as np

import heroes as H
import rotura as R
import liquido as L
import fluido as F

CORAL = H.CORAL if isinstance(H.CORAL, str) else R._hex(H.CORAL)
NPTS = 30                       # puntos por trozo, iguales en todos los cuadros
NSUB = 2                        # trozos por cuadro, iguales en todos los cuadros
ANCLA = F.PB(F.BOCA_X, F.MURO_Y, F.BOCA_Z)   # donde se colapsa lo que sobra


# Donde se congela, en reloj de pared. No es una eleccion libre: la escena
# tiene que haber terminado sola antes de llegar aqui. Termina cuando la caja
# se seca y ademas ha caido la ultima gota, asi que el corte va detras del
# cierre del chorro mas el tiempo de caida. Congelar antes deja el chorro
# colgado del muro, que es exactamente lo que Jose leia como un corte.
#
# El tamano del charco se gobierna con F.T_SECA, no con este numero: es la
# cantidad de liquido que sale de la caja lo que decide hasta donde llega el
# frente. Quien la mueva tiene que volver a correr scripts/fluido_medida.py y
# comprobar que el alcance sigue rondando los 218 px desde el punto de caida,
# que es el charco que Jose aprobo.
FIN = round(F.T_GOLPE + F.T_SECA + F.CIERRE + F.CAIDA, 2)


def instantes():
    u"""Cuando se guarda un cuadro: a paso fijo desde la rotura hasta el corte.

    Antes el final iba mas suelto que el resto, y ese tramo largo se notaba: el
    navegador interpola en linea recta entre cuadro y cuadro, asi que un hueco
    del triple de ancho es un tramo donde la forma deja de acompanar a la fisica
    y se desliza. El paso va parejo de punta a punta.

    Estos tiempos salen como las claves del SMIL, y tienen que quedar entre cero
    y uno: un solo cuadro pasado el corte da una clave mayor que uno, el
    navegador descarta la animacion entera y el trazo se queda en el primer
    cuadro, sin que se vea ni una gota."""
    t0 = F.T_GOLPE + 0.10
    n = max(2, int(round((FIN - t0) / 0.115)))
    ts = [0.0, F.T_GOLPE]
    ts += [round(t0 + (FIN - t0) * k / float(n), 3) for k in range(n + 1)]
    return ts


# --------------------------------------------------------- el trozo canonico

def _area(p):
    x, y = p[:, 0], p[:, 1]
    return 0.5 * float(np.sum(x * np.roll(y, -1) - np.roll(x, -1) * y))


def canoniza(p):
    u"""Mismo sentido de giro y mismo punto de arranque en todos los cuadros."""
    if _area(p) < 0.0:
        p = p[::-1]
    d = (p[:, 0] - ANCLA[0]) ** 2 + (p[:, 1] - ANCLA[1]) ** 2
    return np.roll(p, -int(np.argmin(d)), axis=0)


def cuadro(sil):
    u"""Rellena hasta NSUB trozos; lo que falta se colapsa en la boca."""
    tro = [canoniza(p) for p in sil[:NSUB]]
    while len(tro) < NSUB:
        tro.append(np.tile(np.array(ANCLA, dtype=float), (NPTS, 1)))
    return tro


# ------------------------------------------------------------------- el `d`

def _n(v):
    v = round(float(v), 1)
    s = "%.1f" % v
    return s[:-2] if s.endswith(".0") else s


def _sep(prev, s):
    return "" if (s.startswith("-") or (prev.endswith(".") is False and "." in prev
                                        and s.startswith("."))) else " "


def _trozo(p):
    u"""Catmull-Rom cerrada, escrita como una sola polibezier."""
    n = len(p)
    sal = ["M%s %s" % (_n(p[0][0]), _n(p[0][1])), "C"]
    nums = []
    for i in range(n):
        p0, p1 = p[i - 1], p[i]
        p2, p3 = p[(i + 1) % n], p[(i + 2) % n]
        c1 = p1 + (p2 - p0) / 6.0
        c2 = p2 - (p3 - p1) / 6.0
        nums += [c1[0], c1[1], c2[0], c2[1], p2[0], p2[1]]
    cad = ""
    for v in nums:
        s = _n(v)
        cad += (s if (s.startswith("-") or not cad) else " " + s)
    return sal[0] + "C" + cad + "Z"


def d_de(sil):
    return "".join(_trozo(p) for p in cuadro(sil))


# --------------------------------------------------------------- el ensamble

def clip_cerca():
    u"""Lo que esta mas cerca que la caja: el suelo de adelante y de la
    derecha, la cara del muro por donde baja el chorro, y el reborde."""
    C = F.PB(4.3, 4.3, 0.0)
    largo = 4200.0

    def rayo(nx, ny):
        k = largo / (nx * nx + ny * ny) ** 0.5
        return (C[0] + nx * k * F.K, C[1] + ny * k * F.K)

    A = rayo(-F.EX, -F.EY)
    B = rayo(F.EX, -F.EY)
    caras = [[C, A, (A[0], A[1] + 3000.0), (B[0], B[1] + 3000.0), B]]
    quads = [
        [(0.7, 4.0, 0.12), (3.3, 4.0, 0.12), (3.3, 4.0, 1.14), (0.7, 4.0, 1.14)],
        [(-0.3, 4.0, 0.12), (4.3, 4.0, 0.12), (4.3, 4.3, 0.12), (-0.3, 4.3, 0.12)],
        [(-0.3, 4.3, 0.0), (4.3, 4.3, 0.0), (4.3, 4.3, 0.12), (-0.3, 4.3, 0.12)],
        [(4.3, -0.3, 0.0), (4.3, 4.3, 0.0), (4.3, 4.3, 0.12), (4.3, -0.3, 0.12)],
    ]
    caras += [[F.PB(*p) for p in q] for q in quads]
    return '<clipPath id="lqCerca">%s</clipPath>' % "".join(
        '<polygon points="%s"/>' % " ".join(
            "%s,%s" % (_n(a), _n(b)) for a, b in c) for c in caras)


# Cuanto dura en pantalla un segundo simulado. Subir la viscosidad hace que el
# frente avance menos por segundo, pero la animacion entera seguia durando lo
# mismo y se veia igual de rapida. Esto separa las dos cosas: la fisica decide
# la forma, el reloj decide el ritmo. Con 1,9 el derrame tarda casi cinco
# segundos en cuajar, que es lo que se lee como espeso.
ESCALA_T = 1.9


def escala_css(css):
    u"""Corre los retrasos del CSS de la rotura, y solo los retrasos.

    Los tiempos estan escritos en segundos absolutos y cuadran con el instante
    del golpe, asi que si el liquido se ralentiza y ellos no, la pared se rompe
    antes de que salga nada: el retraso se estira con el mismo factor.

    Lo que dura cada gesto, en cambio, se queda como esta. Un golpe es un golpe
    por espeso que sea lo de dentro, y estirarlo con el liquido lo vuelve de
    goma. Peor todavia en el cambiazo de pared intacta a pared rota: el paso de
    una a otra dura la decima de segundo en que no se nota, y multiplicado por
    el factor se volvia una fundido de dos decimas en que el muro se queda
    traslucido y se ve el coral de dentro como una franja marron. Jose lo leyo
    como un corte, que es lo que es."""
    def trozos(txt):
        u"""Parte por comas, pero solo por las de fuera: cubic-bezier lleva las
        suyas dentro y partir por ellas descoloca la cuenta de tiempos."""
        fuera, hondo, actual = [], 0, []
        for c in txt:
            if c == "(":
                hondo += 1
            elif c == ")":
                hondo -= 1
            if c == "," and hondo == 0:
                fuera.append("".join(actual))
                actual = []
            else:
                actual.append(c)
        fuera.append("".join(actual))
        return fuera

    def una(m):
        salida = []
        for parte in trozos(m.group(1)):
            visto = [0]

            def tiempo(t):
                visto[0] += 1
                v = float(t.group(1))
                return "%.3fs" % (v * ESCALA_T if visto[0] == 2 else v)

            salida.append(re.sub(r"(\d*\.?\d+)s(?![a-z])", tiempo, parte))
        return "animation:" + ",".join(salida)

    return re.sub(r"animation:([^;}]*)", una, css)


# El reloj de pantalla ya no lleva frenado. Lo llevo mientras la corrida se
# congelaba con el chorro abierto: el frente seguia abriendose a unos 62 px por
# segundo en el ultimo cuadro y habia que disimular el paron estirando el final.
# Ahora la escena termina sola. La caja se seca, cae la ultima gota y el frente
# llega al corte a unos 26 px por segundo, que en pantalla son catorce: se
# congela sobre algo que ya estaba practicamente quieto. Un estiron encima solo
# serviria para que la ultima gota cayera a camara lenta.


def animacion(ts, ds):
    dur = FIN * ESCALA_T
    kt = ";".join("%.4f" % (t / FIN) for t in ts)
    return ('<animate attributeName="d" dur="%.2fs" begin="0s"'
            ' repeatCount="1" fill="freeze" calcMode="linear"'
            ' keyTimes="%s" values="%s"/>' % (dur, kt, ";".join(ds)))


# El SMIL no atiende a prefers-reduced-motion, asi que para quien pidio no ver
# movimiento se dibuja el ultimo cuadro y se esconde el que corre. Cuesta un
# trazo de mas, unos 2 KB, y evita que la banda entera se llene sola durante
# trece segundos delante de alguien que pidio lo contrario.
QUIETO = u"""
<style>
.hk-quieto{display:none}
@media (prefers-reduced-motion:reduce){
  .hk-corre{display:none}
  .hk-quieto{display:block}
}
</style>
"""


def svg(ts, ds, animado=True, fondo=True, suf=""):
    H.escala(0.78)
    # La grieta lleva su reloj dentro del SVG, no en el CSS, asi que no pasa
    # por escala_css: se le estira aqui, para que el frente llegue a la punta
    # mas lejana en el mismo instante en que la caja cede.
    R.RITMO = ESCALA_T if animado else 1.0
    capas = L._capas_caja(animado)
    caja = ('<g class="hk-caja" fill="none" stroke-linecap="round"'
            ' stroke-linejoin="round">%s</g>' % "".join(capas))
    if animado:
        liq = ('<path id="lqCuerpo" class="hk-corre" fill="%s"'
               ' fill-rule="evenodd" d="%s">%s</path>'
               '<path id="lqQuieto" class="hk-quieto" fill="%s"'
               ' fill-rule="evenodd" d="%s"/>'
               % (CORAL, ds[0], animacion(ts, ds), CORAL, ds[-1]))
        frente = ('<g clip-path="url(#lqCerca)"><use href="#lqCuerpo"/>'
                  '<use href="#lqQuieto" class="hk-quieto"/></g>')
    else:
        liq = '<path id="lqCuerpo" fill="%s" fill-rule="evenodd" d="%s"/>' % (
            CORAL, ds[-1])
        frente = '<g clip-path="url(#lqCerca)"><use href="#lqCuerpo"/></g>'
    dentro = L._inner_base()
    if not animado:
        dentro = R.sin_trazo(dentro)
        dentro = dentro.replace('mask="url(#m)"', 'stroke-opacity="0.17"')
        caja = R.sin_trazo(caja)
    css = (escala_css(R.ESTILO) + QUIETO) if animado else ""
    tapa = ('<rect width="%d" height="%d" fill="%s"/>'
            % (int(F.BW), int(F.BH), R._hex(H.FONDO))) if fondo else ""
    cuerpo = (u'<svg viewBox="0 0 %d %d" xmlns="http://www.w3.org/2000/svg"'
              u' preserveAspectRatio="xMaxYMax slice" role="presentation">%s'
              u'<defs>%s</defs>%s'
              u'%s<g transform="translate(%.1f,0) scale(%.5f)">%s</g>%s</svg>'
              % (int(F.BW), int(F.BH), css, clip_cerca(), tapa,
                 liq, F.OX, F.K, dentro + caja, frente))
    if suf:
        for viejo in ("fade", "m", "lqCerca", "lqCuerpo", "lqQuieto"):
            cuerpo = cuerpo.replace('id="%s"' % viejo, 'id="%s%s"' % (viejo, suf))
            cuerpo = cuerpo.replace("url(#%s)" % viejo, "url(#%s%s)" % (viejo, suf))
            cuerpo = cuerpo.replace('href="#%s"' % viejo, 'href="#%s%s"' % (viejo, suf))
    return cuerpo


# ------------------------------------------------------------------ la salida

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SVG_PUB = os.path.join(RAIZ, "public", "aisc", "patterns",
                       "aisc-hero-hackathon.svg")
TSX = os.path.join(RAIZ, "components", "hero-hackathon.tsx")

CABEZA = u"""// Generado por scripts/fluido_svg.py. No editar a mano.
//
// El liquido no es una forma dibujada: es la linea de nivel de una
// simulacion, guardada en %(n)d instantes. El chorro y el charco son el mismo
// contorno, por eso el charco nace del chorro y no del piso.

const MARCA = `%(svg)s`;

export function HeroHackathon({ className }: { className?: string }) {
  return (
    <div
      className={className}
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: MARCA }}
    />
  );
}
"""


CACHE = os.path.join(F.SALIDA, "instantes.npz")


def huella(quiero):
    u"""Con que se decide si la despensa sirve.

    Antes bastaba con la lista de instantes, y eso es justo lo que no cambia
    cuando se toca la fisica: se ajusto el vaciado de la caja, la firma siguio
    igual y el emisor volvio a sacar los cuadros viejos. El chorro se quedaba
    colgado del muro al final porque el cierre que se habia escrito nunca
    llego a correr. Aqui entra tambien el codigo del simulador, que es lo que
    decide como se mueve el liquido.
    """
    fuente = io.open(F.__file__.replace(".pyc", ".py"),
                     encoding="utf-8").read()
    return "%s %s" % (" ".join("%.4f" % q for q in quiero),
                      hashlib.sha1(fuente.encode("utf-8")).hexdigest())


def simula(quiero):
    guardo = {}

    def al_frame(k, t, corte, h):
        for q in quiero:
            if q in guardo:
                continue
            if abs(t - q) <= 1.0 / F.FPS:
                guardo[q] = F.siluetas(F.campo(corte, h), npts=NPTS,
                                       minlargo=34.0, maxsub=NSUB)

    guardo[0.0] = []
    F.T_FIN = FIN + 0.05   # no hay que simular mas alla del corte
    F.corre(al_frame)
    return guardo


def main():
    if not os.path.isdir(F.SALIDA):
        os.makedirs(F.SALIDA)
    quiero = instantes()
    firma = huella(quiero)
    guardo = None
    if os.path.exists(CACHE):
        z = np.load(CACHE)
        if "firma" in z.files and str(z["firma"]) == firma:
            guardo = {q: [z["s%d_%d" % (i, j)] for j in range(int(z["n%d" % i]))]
                      for i, q in enumerate(quiero)}
            print("de la despensa:", CACHE)
    if guardo is None:
        guardo = simula(quiero)
    ultimo = []
    for q in quiero:
        if q in guardo:
            ultimo = guardo[q]
        else:
            guardo[q] = ultimo
    ts = list(quiero)
    z = {"firma": firma}
    for i, q in enumerate(ts):
        z["n%d" % i] = len(guardo[q])
        for j, p in enumerate(guardo[q]):
            z["s%d_%d" % (i, j)] = p
    np.savez_compressed(CACHE, **z)
    ds = [d_de(guardo[t]) for t in ts]
    print("instantes:", len(ts), "peso del trazo:",
          sum(len(d) for d in ds) // 1024, "KB")

    web = svg(ts, ds, True, fondo=False, suf="Hk")
    cuerpo = web.replace("\\", "\\\\").replace("`", "\\`").replace("${", "\\${")
    io.open(TSX, "w", encoding="utf-8", newline=chr(10)).write(
        CABEZA % dict(n=len(ts), svg=cuerpo))
    print(TSX, os.path.getsize(TSX) // 1024, "KB")

    io.open(os.path.join(F.SALIDA, "index.html"), "w", encoding="utf-8",
            newline=chr(10)).write(PAGINA % dict(svg=svg(ts, ds, True)))
    print(os.path.join(F.SALIDA, "index.html"))


PAGINA = u"""<!doctype html><meta charset="utf-8"><title>El derrame</title>
<style>
 body{margin:0;background:#0d2417;color:#f3ead8;font:14px/1.6 system-ui}
 .banda{position:relative;width:1280px;height:521px;overflow:hidden}
 .banda>svg{position:absolute;inset:0;width:100%%;height:100%%}
 .texto{position:absolute;left:80px;bottom:64px;max-width:560px;z-index:2}
 .texto b{display:block;font:700 42px/1.05 system-ui;letter-spacing:-.02em}
 button{position:fixed;right:20px;top:18px;z-index:9;padding:9px 15px;border:0;
        border-radius:999px;background:#e5604d;color:#fff;font:600 13px system-ui;
        cursor:pointer}
</style>
<button onclick="otra()">volver a romperla</button>
<div class="banda" id="b"><div class="texto"><b>Sprint de investigacion</b></div>
%(svg)s</div>
<script>
function otra(){var b=document.getElementById('b'),s=b.querySelector('svg');
 s.parentNode.replaceChild(s.cloneNode(true),s);}
</script>
"""


if __name__ == "__main__":
    main()
