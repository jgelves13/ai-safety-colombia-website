# -*- coding: utf-8 -*-
"""La caja del hero del sprint, perforada desde adentro.

El hueco no muerde el borde: esta en plena cara del muro del frente
izquierdo, que es el unico lado con lienzo libre. Lo que dice de donde vino
el golpe es el embudo: la boca de afuera es mas ancha que la de adentro, asi
que se ven las paredes del tunel abriendose hacia el espectador.

Cuatro laminas para comparar dos decisiones cruzadas:

  1  borde de arriba intacto, solo el hueco
  2  borde intacto, con los labios doblados hacia afuera y esquirlas
  3  el hueco se lleva un pedazo del borde, solo el hueco
  4  el hueco se lleva el borde, con labios y esquirlas

Por el hueco todavia no sale nada: adentro se ve sombra.

    py -X utf8 scripts/rotura.py
"""
import io
import math
import os
import re
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

import heroes as H
from heroes import ARENA, SEC, P, poli, volumen, _mezcla

BASE = H.BASE
FONDO = H.FONDO
CARA_SUP, CARA_IZQ, CARA_DER = H.CARA_SUP, H.CARA_IZQ, H.CARA_DER

SALIDA = (r"C:\Users\joseg\AppData\Local\Temp\claude\C--Users-joseg"
          r"\c6b40612-b2da-45c6-ac14-24b6236aa134\scratchpad\rotura")

# lo que se ve por el hueco: la caja esta llena de liquido, y va del mismo
# tono que el resto del liquido, sin sombra que lo separe.
ADENTRO = H.CORAL
# las paredes del tunel se sombrean como cualquier otra cara de la lamina: la
# que mira hacia arriba recibe luz, la que mira hacia abajo queda en sombra y
# las de los costados quedan a medio camino. Ese degradado es el embudo.
BISEL_ARRIBA = _mezcla(FONDO, ARENA, 0.21)
BISEL_LADO = _mezcla(FONDO, ARENA, 0.07)
BISEL_ABAJO = _mezcla(FONDO, "#000000", 0.18)
# los labios doblados, que son los que de verdad salen del plano
LABIO = _mezcla(FONDO, ARENA, 0.30)
ASTILLA = _mezcla(FONDO, ARENA, 0.17)

O = (1160.0, 540.0)
MURO = 1.02
PISO = 0.12                 # la tapa de la base
BORDE = PISO + MURO         # el canto de los muros, z = 1.14
YA, YB = 3.3, 4.0           # las dos caras del muro del frente izquierdo
# el tunel no atraviesa los 0.7 del muro: si lo hiciera, la perspectiva lo
# convertiria en un tobogan mas grande que el hueco. Se queda en un reborde.
YT = YB - 0.15
X0, X1 = 0.7, 3.3


# ------------------------------------------------------------ el hueco

# la boca de afuera, en coordenadas del muro: (x, z)
BOCA = [(1.18, 0.60), (1.40, 0.94), (1.78, 0.84), (2.08, 1.02),
        (2.48, 0.90), (2.88, 0.62), (2.60, 0.46), (2.82, 0.28),
        (2.32, 0.36), (1.98, 0.24), (1.58, 0.40), (1.28, 0.34)]
BOCA_C = (2.03, 0.63)

# la misma boca cuando se lleva un pedazo del canto: es una cadena abierta que
# arranca y termina arriba, en el borde
MORDIDA = [(1.18, BORDE), (1.34, 0.88), (1.16, 0.66), (1.52, 0.54),
           (1.82, 0.28), (2.16, 0.46), (2.44, 0.24), (2.60, 0.56),
           (2.94, 0.62), (2.66, 0.86), (2.92, BORDE)]
MORDIDA_C = (2.05, BORDE)


def adentro(boca, centro):
    """La boca de adentro: la misma forma, encogida hacia el centro y con el
    encogimiento variando de vertice en vertice para que no quede concentrica.
    Los dos labios tienen el mismo numero de puntos, que es lo que deja armar
    el tunel."""
    cx, cz = centro
    out = []
    for i, (x, z) in enumerate(boca):
        k = 0.86 + 0.07 * ((i * 7) % 5) / 4.0
        out.append((cx + (x - cx) * k, cz + (z - cz) * k))
    return out


def tunel(cin, cout, centro, cerrado):
    """Las paredes de la perforacion, del labio de adentro al de afuera. Cada
    una se sombrea por la direccion en la que mira, que es hacia el eje del
    hueco."""
    cx, cz = centro
    n = len(cin)
    caras = []
    for i in range(n if cerrado else n - 1):
        j = (i + 1) % n
        quad = [P(O, cin[i][0], YT, cin[i][1]), P(O, cin[j][0], YT, cin[j][1]),
                P(O, cout[j][0], YB, cout[j][1]),
                P(O, cout[i][0], YB, cout[i][1])]
        mx = (cout[i][0] + cout[j][0]) / 2.0
        mz = (cout[i][1] + cout[j][1]) / 2.0
        dx, dz = cx - mx, cz - mz
        n2 = math.hypot(dx, dz) or 1.0
        v = dz / n2
        tono = (BISEL_ARRIBA if v > 0.34 else
                BISEL_ABAJO if v < -0.34 else BISEL_LADO)
        caras.append(poli(quad, w=SEC, color=ARENA, op=0.0, relleno=tono))
    return caras


def _d(pts, y):
    xy = [P(O, x, y, z) for x, z in pts]
    return "M " + " L ".join("%.1f %.1f" % p for p in xy) + " Z"


def cara(perfil, y, tono, boca=None):
    """La cara del muro, con su hueco recortado si lo tiene."""
    contorno = [(perfil[0][0], PISO)] + list(perfil) + [(perfil[-1][0], PISO)]
    d = _d(contorno, y)
    if boca:
        d += " " + _d(boca, y)
    return ('<path d="%s" fill-rule="evenodd" fill="%s" stroke="%s"'
            ' stroke-width="%s" stroke-opacity="0.75"'
            ' stroke-linejoin="round"/>' % (d, tono, ARENA, SEC))


def canto(perfil_in, perfil_out):
    """La tapa del muro. Cuando el hueco se lleva el borde, la muesca es mas
    ancha por fuera que por dentro, y eso tambien apunta hacia afuera."""
    pts = ([P(O, x, YA, z) for x, z in perfil_in]
           + [P(O, x, YB, z) for x, z in reversed(perfil_out)])
    return poli(pts, w=SEC, color=ARENA, relleno=CARA_SUP, op=0.9)


def remate():
    """El extremo derecho del muro, la unica otra cara suya que se ve."""
    pts = [P(O, X1, YA, BORDE), P(O, X1, YB, BORDE),
           P(O, X1, YB, PISO), P(O, X1, YA, PISO)]
    return poli(pts, w=SEC, color=ARENA, relleno=CARA_DER, op=0.55)


# ------------------------------------------------------------ las grietas

GRIETAS = [
    [(1.18, 0.60), (0.94, 0.68), (0.76, 0.58)],
    [(1.40, 0.94), (1.22, 1.10)],
    [(2.08, 1.02), (2.02, 1.14)],
    [(2.88, 0.62), (3.12, 0.70), (3.28, 0.60)],
    [(2.82, 0.28), (3.06, 0.18)],
    [(1.98, 0.24), (1.90, 0.12)],
    [(1.28, 0.34), (1.02, 0.26), (0.80, 0.34)],
]

GRIETAS_MORDIDA = [
    [(1.16, 0.66), (0.92, 0.58), (0.76, 0.66)],
    [(1.52, 0.54), (1.28, 0.36), (1.00, 0.32)],
    [(1.82, 0.28), (1.74, 0.14)],
    [(2.44, 0.24), (2.50, 0.12)],
    [(2.94, 0.62), (3.18, 0.70), (3.30, 0.60)],
    [(2.66, 0.86), (2.98, 0.94), (3.20, 0.86)],
]


# El reloj de la rotura. Vale uno cuando la lamina se mira sola, y el emisor
# del liquido lo sube para que la caja se rompa al mismo paso que el derrame.
RITMO = 1.0

# Cuando revienta el punto de quiebre, y cuanto tarda el frente en llegar a la
# punta mas lejana. La ventana termina justo antes del golpe, en 0,35, para que
# la grieta no se quede dibujada esperando: llega, y la caja cede.
#
# Los dos numeros estan en la escala del emisor del liquido, que los multiplica
# por RITMO. Cuando ese reloj se duplico, estos bajaron a la mitad para que la
# caja siguiera cediendo en el mismo segundo de la pagina: 0,40 por 1,9 y 0,20
# por 3,8 dan los mismos 0,76 s. Lo mismo vale para los retrasos del CSS de mas
# abajo y para F.T_GOLPE.
T_GRIETA = 0.20
VENTANA_GRIETA = 0.14


def grietas(chas, centro):
    """Las grietas salen todas del mismo sitio y se van hacia afuera.

    Antes cada tramo se dibujaba por su cuenta y con el mismo retraso, asi que
    la punta de afuera aparecia a la vez que el arranque y la grieta se leia al
    reves: nacida en los extremos y creciendo hacia el boquete. Aqui hay un solo
    punto de quiebre, el centro del hueco, y un frente que se aleja de el a
    velocidad constante. Lo que fija cuando le toca a cada tramo es la distancia
    recorrida desde ese punto, no a que cadena pertenece.

    El sentido de cada cadena tampoco se da por supuesto: se ordena por la punta
    que da al boquete, para que el orden en que estan escritas no pueda invertir
    la direccion.
    """
    cx, cy = P(O, centro[0], YB, centro[1])

    def lejos(pt):
        return math.hypot(pt[0] - cx, pt[1] - cy)

    tramos = []
    for cadena in chas:
        pts = [P(O, x, YB, z) for x, z in cadena]
        if lejos(pts[-1]) < lejos(pts[0]):
            pts.reverse()
        d = lejos(pts[0])
        for k in range(len(pts) - 1):
            a, b = pts[k], pts[k + 1]
            largo = math.hypot(b[0] - a[0], b[1] - a[1])
            tramos.append((a, b, largo, d))
            d += largo

    cerca = min(d for _a, _b, _l, d in tramos)
    lejano = max(d + l for _a, _b, l, d in tramos)
    v = (lejano - cerca) / VENTANA_GRIETA

    out = []
    for a, b, largo, d in tramos:
        out.append('<line x1="%.1f" y1="%.1f" x2="%.1f" y2="%.1f"'
                   ' stroke="%s" stroke-width="2.2" stroke-opacity="0.95"'
                   ' stroke-linecap="round" stroke-dasharray="%.1f"'
                   ' stroke-dashoffset="%.1f">'
                   '<animate attributeName="stroke-dashoffset" from="%.1f"'
                   ' to="0" begin="%.3fs" dur="%.3fs" calcMode="linear"'
                   ' fill="freeze"/></line>'
                   % (a[0], a[1], b[0], b[1], ARENA, largo, largo, largo,
                      RITMO * (T_GRIETA + (d - cerca) / v),
                      RITMO * (largo / v)))
    return out


def sin_trazo(txt):
    """La misma grieta, entera y quieta: sin dibujado que correr."""
    txt = re.sub(r'<animate attributeName="stroke-dashoffset"[^>]*/>', "", txt)
    return re.sub(r' stroke-dash(array|offset)="[^"]*"', "", txt)


# ------------------------------------------------------- labios y esquirlas

def labios(boca, centro, indices):
    """Pedazos que quedaron prendidos del borde y se doblaron hacia afuera.
    El vertice de adelante sale del plano del muro, a y mayor que 4."""
    cx, cz = centro
    out = []
    n = len(boca)
    for i in indices:
        a, b = boca[i % n], boca[(i + 1) % n]
        mx, mz = (a[0] + b[0]) / 2.0, (a[1] + b[1]) / 2.0
        px, pz = cx + (mx - cx) * 1.42, cz + (mz - cz) * 1.42
        pts = [P(O, a[0], YB, a[1]), P(O, b[0], YB, b[1]),
               P(O, px, YB + 0.26, pz)]
        out.append(poli(pts, w=SEC, color=ARENA, relleno=LABIO, op=0.95))
    return out


def esquirlas():
    """Lascas planas, tiradas en el piso justo delante del hueco.

    Miden lo que mide un pedazo de muro que se desprendio: entre veinticinco y
    treinta y cinco pixeles de lado en la banda, y no los doce de antes, en que
    se leian como manchas del fondo.

    Van dentro de su propio grupo con nombre. El charco de adelante se pinta
    encima de la caja, asi que al inundarse el suelo las tapaba del todo; con
    el nombre puesto, el que arma la escena vuelve a dibujarlas por encima del
    liquido, apagadas, y se siguen viendo debajo del coral.
    """
    out = []
    for x, y, a, b in [(1.24, 4.44, 0.66, 0.27),
                       (2.10, 4.72, 0.52, 0.35),
                       (2.90, 4.42, 0.60, 0.25),
                       (1.70, 5.04, 0.45, 0.29)]:
        pts = [P(O, x, y), P(O, x + a, y + b * 0.4),
               P(O, x + a * 0.7, y + b), P(O, x - a * 0.15, y + b * 0.7)]
        out.append(poli(pts, w=SEC, color=ARENA, op=0.7, relleno=ASTILLA))
    return ['<g id="hkLascas" class="hk-lasca">%s</g>'
            % chr(10).join(out)]


# ------------------------------------------------------------- la caja

def _cimientos():
    formas = volumen(O, -0.3, -0.3, 4.6, 4.6, 0.0, PISO, w=SEC)
    for x, y, dx, dy in [(0.0, 0.0, 0.7, 0.7), (0.7, 0.0, 2.6, 0.7),
                         (0.0, 0.7, 0.7, 2.6), (3.3, 0.0, 0.7, 0.7),
                         (0.0, 3.3, 0.7, 0.7)]:
        formas += volumen(O, x, y, dx, dy, PISO, MURO, w=SEC)
    formas += volumen(O, 0.7, 0.7, 2.6, 2.6, PISO, 0.62, coral=True)
    return formas


def _frente():
    formas = []
    for x, y, dx, dy in [(3.3, 0.7, 0.7, 2.6), (3.3, 3.3, 0.7, 0.7)]:
        formas += volumen(O, x, y, dx, dy, PISO, MURO, w=SEC)
    return formas


PLANO = [(X0, BORDE), (X1, BORDE)]


def lamina(muerde, labio):
    """Devuelve las capas de una de las cuatro combinaciones."""
    H.escala(0.78)
    fondo = _cimientos()
    frente = _frente()
    intacto = volumen(O, X0, YA, X1 - X0, YB - YA, PISO, MURO, w=SEC)

    if muerde:
        cout = MORDIDA
        cin = adentro(MORDIDA, MORDIDA_C)
        perfil_out = [(X0, BORDE)] + cout + [(X1, BORDE)]
        perfil_in = [(X0, BORDE)] + cin + [(X1, BORDE)]
        tapa_oscura = poli([P(O, x, YT, z) for x, z in cin], w=SEC,
                           color=ARENA, relleno=ADENTRO, op=0.3)
        roto = ([tapa_oscura] + tunel(cin, cout, MORDIDA_C, False)
                + [canto(perfil_in, perfil_out), remate(),
                   cara(perfil_out, YB, CARA_IZQ)])
        fisura = grietas(GRIETAS_MORDIDA, MORDIDA_C)
        bordes = labios(cout, MORDIDA_C, [1, 4, 7]) if labio else []
    else:
        cout = BOCA
        cin = adentro(BOCA, BOCA_C)
        tapa_oscura = poli([P(O, x, YT, z) for x, z in cin], w=SEC,
                           color=ARENA, relleno=ADENTRO, op=0.3)
        roto = ([tapa_oscura] + tunel(cin, cout, BOCA_C, True)
                + [canto(PLANO, PLANO), remate(),
                   cara(PLANO, YB, CARA_IZQ, boca=cout)])
        fisura = grietas(GRIETAS, BOCA_C)
        bordes = labios(cout, BOCA_C, [1, 4, 7, 10]) if labio else []

    if labio:
        bordes = bordes + esquirlas()
    return fondo, intacto, roto, fisura, frente, bordes


# ------------------------------------------------------------ el ensamble

ESTILO = """
<style>
.hk-caja{animation:hkGolpe .34s cubic-bezier(.36,.07,.19,.97) .35s both}
.hk-intacto{animation:hkSale .10s steps(1,start) .36s both}
.hk-roto{animation:hkEntra .12s steps(1,start) .36s both}
.hk-esquirla{transform-box:fill-box;transform-origin:60% 20%;
  animation:hkEntra .16s linear .38s both,hkAbre .34s cubic-bezier(.2,.8,.3,1) .38s both}
.hk-lasca{animation:hkEntra .16s linear .38s both}
.hk-eco{animation:hkEntra .16s linear .38s both}
@keyframes hkEntra{from{opacity:0}to{opacity:1}}
@keyframes hkSale{from{opacity:1}to{opacity:0}}
@keyframes hkAbre{from{transform:scale(.55)}to{transform:scale(1)}}
@keyframes hkGolpe{0%{transform:translate(0,0)}22%{transform:translate(-7px,3px)}
  48%{transform:translate(5px,-2px)}74%{transform:translate(-2px,1px)}
  100%{transform:translate(0,0)}}
@media (prefers-reduced-motion:reduce){
  .hk-caja,.hk-roto,.hk-esquirla,.hk-lasca,.hk-eco{
    animation:none;opacity:1;transform:none}
  .hk-intacto,.hk-grieta{display:none}
}
</style>
"""


def capa(clase, formas, oculto=False):
    if not formas:
        return ""
    est = ' opacity="0"' if oculto else ""
    return '<g class="%s"%s>\n%s\n</g>' % (clase, est, "\n".join(formas))


def _hex(c):
    return "#%02x%02x%02x" % tuple(int(v) for v in c)


def fijo(ruta, muerde, labio):
    """La misma lamina, ya rota y quieta: sirve para mirarla con calma."""
    fondo, _intacto, roto, fisura, frente, bordes = lamina(muerde, labio)
    partes = [capa("hk-fondo", fondo), capa("hk-roto", roto),
              capa("hk-grieta", fisura), capa("hk-frente", frente),
              capa("hk-esquirla", bordes)]
    cuerpo = chr(10).join(p for p in partes if p)
    # sin animacion no hay trazo que correr: las grietas van completas
    cuerpo = sin_trazo(cuerpo)
    grupo = ('<g fill="none" stroke-linecap="round"'
             ' stroke-linejoin="round">%s</g>' % cuerpo)
    base = io.open(BASE, encoding="utf-8").read()
    # el rasterizador no entiende la mascara del degradado: se cambia por
    # una opacidad plana y se pinta el fondo a mano
    base = base.replace('mask="url(#m)"', 'stroke-opacity="0.17"')
    tapa = '<rect width="1697" height="1415" fill="%s"/>' % _hex(FONDO)
    i = base.index(">", base.index("<svg")) + 1
    io.open(ruta, "w", encoding="utf-8", newline=chr(10)).write(
        base[:i] + tapa + base[i: base.rindex("</svg>")] + grupo + "</svg>")


def escribir(ruta, muerde, labio):
    fondo, intacto, roto, fisura, frente, bordes = lamina(muerde, labio)
    partes = [capa("hk-fondo", fondo), capa("hk-intacto", intacto),
              capa("hk-roto", roto, oculto=True), capa("hk-grieta", fisura),
              capa("hk-frente", frente),
              capa("hk-esquirla", bordes, oculto=True)]
    cuerpo = "\n".join(p for p in partes if p)
    grupo = ('<g class="hk-caja" fill="none" stroke-linecap="round"'
             ' stroke-linejoin="round">\n%s\n</g>\n' % cuerpo)
    base = io.open(BASE, encoding="utf-8").read()
    io.open(ruta, "w", encoding="utf-8", newline=chr(10)).write(
        base[: base.rindex("</svg>")] + ESTILO + grupo + "</svg>\n")
    print(os.path.basename(ruta), os.path.getsize(ruta))


PAGINA = u"""<!doctype html><meta charset="utf-8"><title>%(t)s</title>
<style>
 body{margin:0;background:#0d2417;color:#f3ead8;font:14px/1.6 system-ui}
 .rot{margin:0;padding:20px 26px 8px;font:600 13px/1 system-ui;
      letter-spacing:.14em;text-transform:uppercase;color:#e5604d}
 .rot small{display:block;margin-top:8px;letter-spacing:0;text-transform:none;
      font-weight:400;font-size:14px;color:#f3ead8;opacity:.72}
 .banda{position:relative;overflow:hidden;background:#143620;height:521px}
 .banda>svg{position:absolute;right:0;bottom:0;height:100%%;width:auto;
      max-width:60%%;pointer-events:none}
 .texto{position:absolute;left:80px;bottom:56px;max-width:620px;z-index:2}
 .texto b{display:block;font:800 52px/1.02 system-ui;letter-spacing:-.02em}
 .otra{position:fixed;right:20px;bottom:18px;z-index:9;background:#e5604d;
      color:#143620;border:0;border-radius:999px;padding:11px 20px;
      font:600 14px system-ui;cursor:pointer}
</style>
%(cuerpo)s
<button class="otra" onclick="repetir()">volver a romperlas</button>
<script>
function repetir(){document.querySelectorAll(".banda>svg").forEach(function(s){
  s.parentNode.replaceChild(s.cloneNode(true),s);});}
</script>
"""

BANDA = u"""<p class="rot">%(rot)s<small>%(nota)s</small></p>
<div class="banda">
%(svg)s
  <div class="texto"><b>AI Incident Response Sprint</b></div>
</div>
"""

CASOS = [
    ("1.svg", False, False, u"1 &middot; borde intacto, solo el hueco",
     u"El embudo es lo unico que dice de donde vino el golpe: la boca de "
     u"afuera es mas ancha que la de adentro."),
    ("2.svg", False, True, u"2 &middot; borde intacto, con labios y esquirlas",
     u"Lo mismo, mas cuatro pedazos doblados hacia afuera y lo que salio "
     u"despedido."),
    ("3.svg", True, False, u"3 &middot; el hueco se lleva el borde",
     u"La muesca llega al canto y ahi tambien queda mas ancha por fuera."),
    ("4.svg", True, True, u"4 &middot; el borde mordido, con labios",
     u"Las dos cosas a la vez."),
]


def inyectar(ruta, sufijo):
    s = io.open(ruta, encoding="utf-8").read()
    for viejo in ("fade", "m"):
        s = s.replace('id="%s"' % viejo, 'id="%s%s"' % (viejo, sufijo))
        s = s.replace("url(#%s)" % viejo, "url(#%s%s)" % (viejo, sufijo))
    return s.replace('<svg width="1697"',
                     '<svg preserveAspectRatio="xMaxYMax meet" width="1697"', 1)


def main():
    if not os.path.isdir(SALIDA):
        os.makedirs(SALIDA)
    bandas = []
    for nombre, muerde, labio, rot, nota in CASOS:
        ruta = os.path.join(SALIDA, nombre)
        escribir(ruta, muerde, labio)
        bandas.append(BANDA % dict(svg=inyectar(ruta, nombre[0]), rot=rot,
                                   nota=nota))
    io.open(os.path.join(SALIDA, "index.html"), "w", encoding="utf-8",
            newline=chr(10)).write(
        PAGINA % dict(t=u"Romper la caja", cuerpo=chr(10).join(bandas)))
    print("index.html")


if __name__ == "__main__":
    main()
