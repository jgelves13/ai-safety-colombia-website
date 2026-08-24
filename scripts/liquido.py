# -*- coding: utf-8 -*-
"""El contenido de la caja saliendose por el boquete.

La rotura es la que Jose escogio: borde de arriba intacto, labios doblados
hacia afuera. Sobre ella se prueban dos caminos y dos cantidades.

  1  chorro que baja por el muro, cruza el reborde y hace un charco
  2  chorro a presion que sale en arco y cae mas lejos
  3  el mismo camino 1, pero el liquido no se acaba: inunda el header
  4  el mismo camino 2, pero el liquido no se acaba: inunda el header

El liquido es masa coral sin contorno y con curvas suaves. Rompe a proposito
el lenguaje de linea del resto de la lamina: es lo unico blando del cuadro.

Todo se dibuja en el mismo espacio isometrico de la caja, asi que el charco
es un ovalo aplastado por la perspectiva. Como la proyeccion es paralela,
agrandar el charco en pantalla desde el punto donde cae equivale exactamente
a agrandarlo en el mundo: por eso la inundacion es una sola escala.

    py -X utf8 scripts/liquido.py
"""
import io
import math
import os
import re
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

import heroes as H
import rotura as R
from heroes import P

O = R.O
FONDO = R.FONDO
SALIDA = os.path.join(os.path.dirname(R.SALIDA), "liquido")

CORAL = H.CORAL                      # la lamina de arriba, la que recibe luz
CORAL_IZQ = H.CORAL_IZQ              # lo que cae por el muro
CORAL_DER = H.CORAL_DER              # el canto del charco, en sombra
CORAL_POZO = H._mezcla(FONDO, CORAL, 0.9)   # la lamina de agua quieta

# --- la banda: el mismo encuadre del hero -------------------------------
# el hero pone la lamina abajo a la derecha, con la altura de la seccion. Se
# reproduce aca para que lo que se juzgue sea lo que se va a ver.
BW, BH = 1280.0, 521.0
K = BH / 1415.0
OX = BW - 1697.0 * K

BOCA_X, BOCA_Z = 2.03, 0.63          # el centro del hueco


# ------------------------------------------------------------ geometria

def suave(pts, cerrado=True):
    """Catmull-Rom pasado a cubicas: la curva pasa por todos los puntos."""
    n = len(pts)
    d = ["M%.1f,%.1f" % pts[0]]
    ultimo = n if cerrado else n - 1
    for i in range(ultimo):
        p0 = pts[(i - 1) % n] if cerrado else pts[max(i - 1, 0)]
        p1 = pts[i]
        p2 = pts[(i + 1) % n]
        p3 = pts[(i + 2) % n] if cerrado else pts[min(i + 2, n - 1)]
        c1 = (p1[0] + (p2[0] - p0[0]) / 6.0, p1[1] + (p2[1] - p0[1]) / 6.0)
        c2 = (p2[0] - (p3[0] - p1[0]) / 6.0, p2[1] - (p3[1] - p1[1]) / 6.0)
        d.append("C%.1f,%.1f %.1f,%.1f %.1f,%.1f"
                 % (c1[0], c1[1], c2[0], c2[1], p2[0], p2[1]))
    if cerrado:
        d.append("Z")
    return "".join(d)


def forma(d, color, clase=None):
    c = ' class="%s"' % clase if clase else ""
    return '<path%s d="%s" fill="%s" stroke="none"/>' % (c, d, color)


def cinta(eje, color, clase=None):
    """El chorro. El ancho corre siempre sobre el eje x del mundo, que es lo
    que lo mantiene dentro de la perspectiva."""
    izq = [P(O, x - w, y, z) for x, y, z, w in eje]
    der = [P(O, x + w, y, z) for x, y, z, w in eje]
    return forma(suave(izq + der[::-1]), color, clase)


def ovalo(cx, cy, rx, ry, semilla=0.0, n=20, onda=1.0):
    """Un charco: circulo en el suelo del mundo, aplastado por la proyeccion.
    El borde lleva una ondulacion chica para que no parezca una elipse."""
    pts = []
    for i in range(n):
        a = 2.0 * math.pi * i / n
        r = (1.0 + onda * (0.085 * math.sin(3.0 * a + semilla)
                           + 0.05 * math.sin(5.0 * a)))
        pts.append(P(O, cx + rx * r * math.cos(a), cy + ry * r * math.sin(a)))
    return pts


# --- camino a: baja por el muro, cruza el reborde y se derrama -----------
# el muro del frente esta en y=4.0 y termina en z=0.12; de ahi la base sigue
# 0.3 hacia adelante y cae al suelo.
EJE_A = [(2.03, 4.00, 0.55, 0.24),
         (2.02, 4.00, 0.42, 0.27),
         (2.02, 4.00, 0.30, 0.25),
         (2.01, 4.00, 0.19, 0.21),
         (2.01, 4.01, 0.13, 0.19),
         (2.01, 4.06, 0.12, 0.18),
         (2.02, 4.16, 0.12, 0.18),
         (2.03, 4.27, 0.115, 0.18),
         (2.04, 4.32, 0.05, 0.17),
         (2.05, 4.35, 0.00, 0.20),
         (2.06, 4.50, 0.00, 0.30)]
CHARCO_A = (2.06, 4.90, 1.24, 0.66)
INUND_A = (1.4, 5.9, 12.5, 7.0)

# --- camino b: sale a presion y cae mas lejos ---------------------------
EJE_B = []
for _i in range(17):
    _t = _i / 16.0
    EJE_B.append((BOCA_X + 0.07 * _t,
                  4.0 + 2.95 * _t,
                  BOCA_Z + 0.72 * _t - 1.35 * _t * _t,
                  0.25 - 0.20 * _t + 0.09 * _t * _t))
CHARCO_B = (2.12, 7.05, 0.58, 0.86)
INUND_B = (1.6, 7.4, 12.0, 6.6)


def _dir(eje):
    """Punto de salida y vector de avance en pantalla."""
    a = P(O, eje[0][0], eje[0][1], eje[0][2])
    b = P(O, eje[-1][0], eje[-1][1], eje[-1][2])
    dx, dy = b[0] - a[0], b[1] - a[1]
    m = math.hypot(dx, dy)
    return a, (dx / m, dy / m), m


def cortina(eje, ident, adelante):
    """Media pantalla con el filo perpendicular al chorro. Al correrla se
    descubre el liquido de la boca hacia afuera, o se lo lleva."""
    p, u, _ = _dir(eje)
    v = (-u[1], u[0])
    L = 4000.0
    s = -1.0 if not adelante else 1.0
    a = (p[0] + v[0] * L, p[1] + v[1] * L)
    b = (p[0] - v[0] * L, p[1] - v[1] * L)
    pts = [a, b, (b[0] + s * u[0] * L, b[1] + s * u[1] * L),
           (a[0] + s * u[0] * L, a[1] + s * u[1] * L)]
    d = "M%.1f,%.1f L%.1f,%.1f L%.1f,%.1f L%.1f,%.1f Z" % (
        pts[0][0], pts[0][1], pts[1][0], pts[1][1],
        pts[2][0], pts[2][1], pts[3][0], pts[3][1])
    return ('<clipPath id="%s"><path class="lq-%s" d="%s"/></clipPath>'
            % (ident, "borra" if adelante else "corre", d))


def gota(cx, cy, r):
    return ("M%.1f,%.1f a%.1f,%.1f 0 1,0 %.1f,0 a%.1f,%.1f 0 1,0 %.1f,0Z"
            % (cx - r, cy, r, r * 0.74, 2 * r, r, r * 0.74, -2 * r))


def gotas(eje, n=3):
    """Gotas sueltas que siguen el mismo camino, un poco despues."""
    p, u, largo = _dir(eje)
    out = []
    for i in range(n):
        r = 5.0 + 2.2 * (i % 2)
        d = 0.10 + 0.06 * i
        ox, oy = p[0] + u[0] * largo * d, p[1] + u[1] * largo * d
        vx, vy = u[0] * largo * (1.0 - d), u[1] * largo * (1.0 - d)
        out.append('<g transform="translate(%.1f,%.1f)">'
                   '<path class="lq-gota lq-g%d" d="%s" fill="%s"'
                   ' stroke="none" style="--vx:%.1fpx;--vy:%.1fpx"/></g>'
                   % (ox, oy, i + 1, gota(0, 0, r), CORAL, vx, vy))
    return out


def charco(centro, clase, semilla=0.0, fijo=None, onda=1.0, cae=None):
    """Charco quieto o inundacion. Crece desde el punto donde cae el chorro,
    que es tambien el origen de la escala: como la proyeccion es paralela,
    agrandarlo en pantalla es agrandarlo en el suelo del mundo."""
    cx, cy, rx, ry = centro
    tapa = ovalo(cx, cy, rx, ry, semilla=semilla, onda=onda)
    canto = [(x, y + 6.5) for x, y in tapa]     # el espesor, apenas un canto
    o = P(O, *(cae or (cx, cy)))
    dentro = forma(suave(canto), CORAL_DER) + forma(suave(tapa), CORAL_POZO)
    escala = ('<g transform="scale(%s)">' % fijo if fijo
              else '<g class="%s">' % clase)
    return ('<g transform="translate(%.1f,%.1f)">%s'
            '<g transform="translate(%.1f,%.1f)">%s</g></g></g>'
            % (o[0], o[1], escala, -o[0], -o[1], dentro))


# ------------------------------------------------------------ el ensamble

ESTILO = u"""
<style>
.hk-caja{animation:hkGolpe .34s cubic-bezier(.36,.07,.19,.97) .70s both}
.hk-intacto{animation:hkSale .10s linear .72s both}
.hk-roto{animation:hkEntra .12s linear .72s both}
.hk-grieta line{animation:hkTraza .28s ease-out .40s both}
.hk-esquirla{transform-box:fill-box;transform-origin:60%% 20%%;
  animation:hkEntra .16s linear .76s both,hkAbre .34s cubic-bezier(.2,.8,.3,1) .76s both}
@keyframes hkEntra{from{opacity:0}to{opacity:1}}
@keyframes hkSale{from{opacity:1}to{opacity:0}}
@keyframes hkTraza{to{stroke-dashoffset:0}}
@keyframes hkAbre{from{transform:scale(.55)}to{transform:scale(1)}}
@keyframes hkGolpe{0%%{transform:translate(0,0)}22%%{transform:translate(-7px,3px)}
  48%%{transform:translate(5px,-2px)}74%%{transform:translate(-2px,1px)}
  100%%{transform:translate(0,0)}}

.lq-corre,.lq-borra,.lq-chorro,.lq-charco,.lq-inunda,.lq-gota{
  transform-box:view-box;transform-origin:0 0}
.lq-corre{animation:lqCorre .8s cubic-bezier(.35,0,.5,1) %(t0)ss both}
.lq-borra{animation:lqCorre .95s cubic-bezier(.5,0,.6,1) %(tf)ss both}
@keyframes lqCorre{from{transform:translate(0,0)}
  to{transform:translate(%(ux)spx,%(uy)spx)}}

.lq-chorro{animation:lqOnda 1.5s ease-in-out %(t0)ss infinite}
@keyframes lqOnda{0%%,100%%{transform:translate(0,0)}
  50%%{transform:translate(2px,0)}}

.lq-charco{animation:lqCrece 1.6s cubic-bezier(.2,.7,.3,1) %(tp)ss both}
.lq-inunda{animation:lqCrece 4.6s cubic-bezier(.5,.02,.75,.4) %(tp)ss both}
@keyframes lqCrece{from{transform:scale(.05)}to{transform:scale(1)}}

.lq-gota{opacity:0}
.lq-g1{animation:lqGota .72s cubic-bezier(.45,0,.9,.6) %(g1)ss both}
.lq-g2{animation:lqGota .80s cubic-bezier(.45,0,.9,.6) %(g2)ss both}
.lq-g3{animation:lqGota .76s cubic-bezier(.45,0,.9,.6) %(g3)ss both}
@keyframes lqGota{0%%{opacity:0;transform:translate(0,0) scale(.5)}
  14%%{opacity:1}
  100%%{opacity:.9;transform:translate(var(--vx),var(--vy)) scale(.8)}}

@media (prefers-reduced-motion:reduce){
  .hk-caja,.hk-roto,.hk-esquirla{animation:none;opacity:1;transform:none}
  .hk-intacto,.hk-grieta{display:none}
  .lq-corre,.lq-borra,.lq-chorro,.lq-gota{animation:none}
  .lq-charco,.lq-inunda{animation:none;transform:scale(1)}
}
</style>
"""

CASOS = [
    ("1", u"1. por el muro", EJE_A, (CHARCO_A, INUND_A, (2.06, 4.66)), False,
     u"baja por la cara, cruza el reborde de la base y hace charco"),
    ("2", u"2. a presion", EJE_B, (CHARCO_B, INUND_B, (2.12, 6.85)), False,
     u"sale en arco y cae mas lejos"),
    ("3", u"3. por el muro, sin fin", EJE_A, (CHARCO_A, INUND_A, (2.06, 4.66)), True,
     u"el mismo camino, pero el liquido no se acaba"),
    ("4", u"4. a presion, sin fin", EJE_B, (CHARCO_B, INUND_B, (2.12, 6.85)), True,
     u"el arco no para hasta inundar el header"),
]

T0 = 0.92            # el chorro arranca despues del golpe
TP = 1.45            # el charco empieza a crecer
TF = 2.85            # el chorro se corta (solo en las finitas)


def _inner_base():
    base = io.open(R.BASE, encoding="utf-8").read()
    i = base.index(">", base.index("<svg")) + 1
    return base[i: base.rindex("</svg>")]


def _capas_caja(animado):
    """La caja con la rotura que escogio Jose: borde intacto y labios."""
    fondo, intacto, roto, fisura, frente, bordes = R.lamina(False, True)
    if animado:
        return [R.capa("hk-fondo", fondo), R.capa("hk-intacto", intacto),
                R.capa("hk-roto", roto, oculto=True),
                R.capa("hk-grieta", fisura), R.capa("hk-frente", frente),
                R.capa("hk-esquirla", bordes, oculto=True)]
    return [R.capa("hk-fondo", fondo), R.capa("hk-roto", roto),
            R.capa("hk-grieta", fisura), R.capa("hk-frente", frente),
            R.capa("hk-esquirla", bordes)]


def liquido(ident, eje, centro, sinfin, animado):
    """Devuelve (defs, detras, delante) del liquido de un caso."""
    charco_fino, inund, cae = centro
    if sinfin:
        args = dict(semilla=0.4, onda=0.55, cae=cae)
        forma_pool, clase = inund, "lq-inunda"
    else:
        args = dict(semilla=1.1, cae=cae)
        forma_pool, clase = charco_fino, "lq-charco"
    if not animado:
        # quieta: la inundacion se congela a media marcha, porque llena del
        # todo es un rectangulo coral y no hay nada que mirar
        pool = charco(forma_pool, "", fijo=0.62 if sinfin else 1.0, **args)
        chorro = cinta(eje, CORAL)
        return [], ([pool] if sinfin else []), ([] if sinfin else [pool]) + [chorro]

    pool = charco(forma_pool, clase, **args)
    defs = [cortina(eje, "lqc" + ident, False)]
    cuerpo = cinta(eje, CORAL, "lq-chorro")
    if sinfin:
        chorro = '<g clip-path="url(#lqc%s)">%s</g>' % (ident, cuerpo)
    else:
        defs.append(cortina(eje, "lqb" + ident, True))
        chorro = ('<g clip-path="url(#lqb%s)"><g clip-path="url(#lqc%s)">%s'
                  '</g></g>' % (ident, ident, cuerpo))
    detras = [pool] if sinfin else []
    delante = ([] if sinfin else [pool]) + [chorro] + gotas(eje)
    return defs, detras, delante


def estilo(eje, sinfin):
    p, u, largo = _dir(eje)
    largo *= 1.35
    return ESTILO % {"t0": T0, "tf": TF, "tp": TP,
                     "ux": round(u[0] * largo, 1),
                     "uy": round(u[1] * largo, 1),
                     "g1": round(T0 + 0.55, 2), "g2": round(T0 + 1.05, 2),
                     "g3": round(T0 + 1.6, 2)}


def banda(ident, eje, centro, sinfin, animado=True):
    """Una lamina completa, con el encuadre del hero."""
    H.escala(0.78)
    capas = _capas_caja(animado)
    defs, detras, delante = liquido(ident, eje, centro, sinfin, animado)
    caja = ('<g class="hk-caja" fill="none" stroke-linecap="round"'
            ' stroke-linejoin="round">\n%s\n</g>' % "\n".join(capas))
    dentro = "\n".join([_inner_base()] + detras + [caja] + delante)
    if not animado:
        # el rasterizador no entiende la mascara del degradado, y sin
        # animacion no hay trazo que correr
        dentro = re.sub(r' stroke-dash(array|offset)="[^"]*"', "", dentro)
        dentro = dentro.replace('mask="url(#m)"', 'stroke-opacity="0.17"')
    css = estilo(eje, sinfin) if animado else ""
    return (u'<svg viewBox="0 0 %d %d" width="%d" height="%d"'
            u' xmlns="http://www.w3.org/2000/svg">%s<defs>%s</defs>'
            u'<rect width="%d" height="%d" fill="%s"/>'
            u'<g transform="translate(%.1f,0) scale(%.5f)">%s</g></svg>'
            % (BW, BH, BW, BH, css, "".join(defs), BW, BH, R._hex(FONDO),
               OX, K, dentro))


# ------------------------------------------------------------- la pagina

PAGINA = u"""<!doctype html><meta charset="utf-8"><title>%(t)s</title>
<style>
 body{margin:0;background:#0d2417;color:#f3ead8;font:14px/1.6 system-ui}
 h1{font:600 20px/1.3 system-ui;margin:26px 24px 4px}
 p.pie{margin:6px 24px 26px;opacity:.72;max-width:900px}
 .rot{margin:26px 24px 8px;font:600 15px/1.3 system-ui}
 .rot small{display:block;font-weight:400;opacity:.66;margin-top:2px}
 .banda{position:relative;width:1280px;height:521px;overflow:hidden;
        background:#143620}
 .banda>svg{position:absolute;inset:0}
 .texto{position:absolute;left:80px;bottom:64px;max-width:560px;z-index:2}
 .texto b{display:block;font:700 42px/1.05 system-ui;letter-spacing:-.02em}
 .texto span{display:block;margin-top:14px;opacity:.8;font-size:16px}
 button{position:fixed;right:20px;top:18px;z-index:9;padding:9px 15px;
        border:0;border-radius:999px;background:#e5604d;color:#fff;
        font:600 13px system-ui;cursor:pointer}
</style>
<h1>%(t)s</h1><p class="pie">%(p)s</p>
<button onclick="repetir()">volver a romperlas</button>
%(b)s
<script>
function repetir(){document.querySelectorAll('.banda>svg').forEach(function(s){
  var c=s.cloneNode(true);s.parentNode.replaceChild(c,s);});}
</script>
"""

BANDA = u"""<p class="rot">%(rot)s<small>%(nota)s</small></p>
<div class="banda"><div class="texto"><b>Sprint de investigacion</b>
<span>Tres dias para llevar una pregunta hasta un resultado.</span></div>
%(svg)s</div>
"""


def main():
    if not os.path.isdir(SALIDA):
        os.makedirs(SALIDA)
    bandas = []
    for ident, rot, eje, centro, sinfin, nota in CASOS:
        svg = banda(ident, eje, centro, sinfin, animado=True)
        io.open(os.path.join(SALIDA, "liq%s.svg" % ident), "w",
                encoding="utf-8", newline="\n").write(svg)
        quieto = banda(ident, eje, centro, sinfin, animado=False)
        io.open(os.path.join(SALIDA, "fijo%s.svg" % ident), "w",
                encoding="utf-8", newline="\n").write(quieto)
        bandas.append(BANDA % {"rot": rot, "nota": nota, "svg": svg})
        print("liq%s.svg" % ident)
    pag = PAGINA % {
        "t": u"El contenido saliendose por el boquete",
        "p": u"Cuatro pruebas sobre la misma rotura. Las dos primeras se "
             u"acaban en un charco quieto. Las dos ultimas no se acaban: el "
             u"liquido sigue saliendo hasta inundar el header.",
        "b": "\n".join(bandas)}
    io.open(os.path.join(SALIDA, "index.html"), "w",
            encoding="utf-8", newline="\n").write(pag)
    print(SALIDA)


if __name__ == "__main__":
    main()
