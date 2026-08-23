# -*- coding: utf-8 -*-
"""Las dos formas de romper la caja del hero del sprint, animadas.

Sale un SVG por variante, con el mismo lienzo y la misma retica que el resto de
los heroes, y con la animacion adentro en un <style>:

  A  la caja aguanta. Se parte el muro del frente izquierdo, que es el unico
     lado con lienzo libre, y el contenido se sale por ahi.
  B  la caja se parte. Se va el muro entero, la esquina cercana se suelta y
     el contenido se vacia de golpe.

La animacion corre sola al cargar y se queda quieta en el estado roto. Con
prefers-reduced-motion la lamina arranca ya rota, sin movimiento.

    py -X utf8 scripts/roturas.py            # escribe en scratchpad/roturas/
    py -X utf8 scripts/roturas.py --publicar # escribe el que quede elegido
"""
import io
import math
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

import heroes as H
from heroes import ARENA, CORAL, SEC, GUIA, P, poli, linea, volumen, _losa, _mezcla

RAIZ = H.RAIZ
BASE = H.BASE
SALIDA = (r"C:\Users\joseg\AppData\Local\Temp\claude\C--Users-joseg"
          r"\c6b40612-b2da-45c6-ac14-24b6236aa134\scratchpad\roturas")

CARA_SUP, CARA_IZQ, CARA_DER = H.CARA_SUP, H.CARA_IZQ, H.CARA_DER
CORAL_SUP, CORAL_IZQ, CORAL_DER = H.CORAL_SUP, H.CORAL_IZQ, H.CORAL_DER
FONDO = H.FONDO

# el interior en sombra, para que el hueco del muro roto tenga fondo
CARA_INT = _mezcla(FONDO, ARENA, 0.02)
# la cresta de la ola, mas clara que el resto del liquido
CORAL_LUZ = _mezcla((0xe5, 0x60, 0x4d), ARENA, 0.30)

LIQ = dict(sup=CORAL_SUP, izq=CORAL_IZQ, der=CORAL_DER, trazo=CORAL, w=SEC)
SOL = dict(sup=CARA_SUP, izq=CARA_IZQ, der=CARA_DER, trazo=ARENA, w=SEC)

O = (1160.0, 540.0)
MURO = 1.02          # alto de los muros, desde z=0.12
BORDE = 0.12 + MURO  # el labio de la caja, z=1.14
NIVEL = 0.12 + 0.62  # donde estaba el liquido en la caja cerrada


# ------------------------------------------------------------ piezas nuevas

def cara_quebrada(prof, y, z0, tono, op, trazo=ARENA):
    """La cara de un muro cuyo borde de arriba quedo astillado.

    prof es el perfil del borde: pares (x, z) de izquierda a derecha."""
    pts = ([P(O, prof[0][0], y, z0)]
           + [P(O, x, y, z) for x, z in prof]
           + [P(O, prof[-1][0], y, z0)])
    return poli(pts, w=SEC, color=trazo, relleno=tono, op=op)


def canto_quebrado(prof, ya, yb, tono=CARA_SUP, trazo=ARENA):
    """El canto de arriba del muro, que sigue el mismo perfil astillado."""
    pts = ([P(O, x, ya, z) for x, z in prof]
           + [P(O, x, yb, z) for x, z in reversed(prof)])
    return poli(pts, w=SEC, color=trazo, relleno=tono, op=1.0)


def muro_roto(prof, ya, yb, z0=0.12):
    """Muro visto de frente: el interior en sombra, el canto y la cara."""
    return [cara_quebrada(prof, ya, z0, CARA_INT, 0.9),
            canto_quebrado(prof, ya, yb),
            cara_quebrada(prof, yb, z0, CARA_IZQ, 0.75)]


def plano(pts, z, tono=CORAL_SUP, op=1.0, trazo=CORAL):
    """Una lengua de liquido acostada, sin espesor: pares (x, y)."""
    return poli([P(O, x, y, z) for x, y in pts], w=SEC, color=trazo,
                relleno=tono, op=op)


def lamina(pts, y, tono=CORAL_IZQ, op=0.9, trazo=CORAL):
    """Una hoja de liquido pegada a una cara vertical: pares (x, z)."""
    return poli([P(O, x, y, z) for x, z in pts], w=SEC, color=trazo,
                relleno=tono, op=op)


def brillo(pts, z):
    """El reflejo encima de un charco, sin trazo."""
    d = " ".join("%s,%s" % (round(a, 1), round(b, 1))
                 for a, b in [P(O, x, y, z) for x, y in pts])
    return '<polygon points="%s" fill="%s" stroke="none" opacity="0.55"/>' % (
        d, CORAL_LUZ)


def grieta(desde, hasta, y, w=1.6, op=0.95):
    """Un trazo de la fractura sobre la cara del muro, con su largo medido
    para poder dibujarlo con la animacion."""
    a, b = P(O, desde[0], y, desde[1]), P(O, hasta[0], y, hasta[1])
    largo = math.hypot(b[0] - a[0], b[1] - a[1])
    return ('<line x1="%.1f" y1="%.1f" x2="%.1f" y2="%.1f" stroke="%s"'
            ' stroke-width="%s" stroke-opacity="%s" stroke-linecap="round"'
            ' stroke-dasharray="%.1f" stroke-dashoffset="%.1f"/>'
            % (a[0], a[1], b[0], b[1], ARENA, w, op, largo, largo))


def capa(clase, formas, oculto=False):
    if not formas:
        return ""
    est = ' opacity="0"' if oculto else ""
    return '<g class="%s"%s>\n%s\n</g>' % (clase, est, "\n".join(formas))


# ---------------------------------------------------------- lo que no cambia

def _cimientos():
    """La base y todo lo que queda de pie en las dos variantes."""
    formas = volumen(O, -0.3, -0.3, 4.6, 4.6, 0.0, 0.12, w=SEC)
    for x, y, dx, dy in [(0.0, 0.0, 0.7, 0.7), (0.7, 0.0, 2.6, 0.7),
                         (0.0, 0.7, 0.7, 2.6), (3.3, 0.0, 0.7, 0.7),
                         (0.0, 3.3, 0.7, 0.7)]:
        formas += volumen(O, x, y, dx, dy, 0.12, MURO, w=SEC)
    return formas


def _pozo(alto):
    """El contenido dentro de la caja, al nivel que se pida."""
    return volumen(O, 0.7, 0.7, 2.6, 2.6, 0.12, alto, coral=True)


def _frente_intacto():
    formas = []
    for x, y, dx, dy in [(0.7, 3.3, 2.6, 0.7), (3.3, 0.7, 0.7, 2.6),
                         (3.3, 3.3, 0.7, 0.7)]:
        formas += volumen(O, x, y, dx, dy, 0.12, MURO, w=SEC)
    return formas


# ------------------------------------------------------------- variante A

PERFIL_A = [(0.7, BORDE), (0.96, BORDE), (1.08, 0.88), (1.20, 1.08),
            (1.34, 0.76), (1.48, 1.00), (1.62, 0.68), (1.76, 0.86),
            (1.90, 0.52), (2.10, 0.44), (2.28, 0.60), (2.42, 0.48),
            (2.56, 0.84), (2.70, 0.64), (2.84, 0.98), (2.98, 0.80),
            (3.10, 1.10), (3.3, BORDE)]

GRIETAS_A = [((2.10, 0.46), (1.62, 1.14)), ((2.10, 0.46), (2.62, 1.14)),
             ((2.10, 0.46), (1.20, 1.10)), ((2.10, 0.46), (3.04, 1.12)),
             ((2.10, 0.46), (2.10, 1.14)), ((1.42, 0.80), (1.02, 1.14)),
             ((2.74, 0.70), (3.04, 1.14)), ((1.66, 0.72), (2.54, 0.86))]


def variante_a():
    """La caja aguanta y se parte un muro. El resto sigue en pie."""
    H.escala(0.78)
    fondo = _cimientos()

    lleno = _pozo(0.62)
    # el nivel baja hasta el diente mas hondo, que es por donde se sale
    pozo = _pozo(0.38)

    intacto = _frente_intacto()

    roto = muro_roto(PERFIL_A, 3.3, 4.0)
    for x, y, dx, dy in [(3.3, 0.7, 0.7, 2.6), (3.3, 3.3, 0.7, 0.7)]:
        roto += volumen(O, x, y, dx, dy, 0.12, MURO, w=SEC)

    fisura = [grieta(a, b, 4.0) for a, b in GRIETAS_A]

    # el liquido asoma por el diente y se acuesta sobre el canto
    labio = [plano([(1.86, 3.3), (2.44, 3.3), (2.48, 4.0), (1.82, 4.0)], 0.47)]
    # y de ahi baja pegado a la cara, sin despegarse
    cae = [lamina([(1.82, 0.47), (2.48, 0.47), (2.42, 0.31), (2.36, 0.12),
                   (2.00, 0.12), (1.94, 0.30)], 4.0),
           lamina([(2.02, 0.43), (2.32, 0.43), (2.27, 0.17), (2.11, 0.17)],
                  4.0, tono=CORAL_LUZ, op=0.45, trazo=CORAL_LUZ),
           plano([(2.00, 4.0), (2.36, 4.0), (2.44, 4.3), (1.92, 4.3)], 0.12),
           lamina([(1.92, 0.12), (2.44, 0.12), (2.52, 0.0), (1.84, 0.0)], 4.3)]

    charco = _losa(O, [(1.48, 4.40), (2.06, 4.32), (2.58, 4.44), (3.04, 4.58),
                       (3.34, 4.88), (3.22, 5.20), (2.78, 5.44), (2.20, 5.50),
                       (1.72, 5.30), (1.44, 4.96), (1.26, 4.66)],
                  0.0, 0.06, **LIQ)
    charco.append(brillo([(1.98, 4.60), (2.54, 4.62), (2.82, 4.86),
                          (2.34, 4.98), (1.86, 4.86)], 0.06))

    gotas = []
    for pts in ([(3.56, 4.84), (3.76, 4.96), (3.62, 5.14), (3.44, 5.02)],
                [(0.92, 5.02), (1.12, 4.96), (1.18, 5.16), (0.98, 5.22)],
                [(2.44, 5.72), (2.64, 5.80), (2.54, 5.96), (2.36, 5.88)]):
        gotas += _losa(O, pts, 0.0, 0.04, **LIQ)
    for x, y, dx, dy, h in [(3.32, 4.08, 0.30, 0.22, 0.13),
                            (1.06, 4.42, 0.22, 0.28, 0.11)]:
        gotas += volumen(O, x, y, dx, dy, 0.0, h, w=SEC)
    return fondo, lleno, pozo, intacto, roto, fisura, labio, cae, charco, gotas


# ------------------------------------------------------------- variante B

PERFIL_B = [(0.7, BORDE), (1.02, BORDE), (1.16, 0.74), (1.28, 0.40),
            (1.40, 0.22), (2.86, 0.22), (2.98, 0.52), (3.10, 0.34),
            (3.18, 0.90), (3.3, BORDE)]

GRIETAS_B = [((2.10, 0.24), (1.20, 1.14)), ((2.10, 0.24), (3.02, 1.14)),
             ((2.10, 0.24), (1.62, 1.14)), ((2.10, 0.24), (2.56, 1.14)),
             ((2.10, 0.24), (2.10, 1.14)), ((1.46, 0.60), (1.02, 1.14)),
             ((2.76, 0.60), (3.20, 1.14)), ((1.70, 0.42), (2.50, 0.42))]


def variante_b():
    """La caja se parte. El muro del frente se va casi entero y la esquina
    cercana se suelta en pedazos."""
    H.escala(0.78)
    # la base se raja por la esquina de adelante
    plancha = [(-0.3, -0.3), (4.3, -0.3), (4.3, 3.02), (3.94, 3.34),
               (3.86, 3.86), (3.34, 3.94), (3.02, 4.3), (-0.3, 4.3)]
    fondo = _losa(O, plancha, 0.0, 0.12, w=SEC, **{k: v for k, v in SOL.items()
                                                   if k != "w"})
    for x, y, dx, dy in [(0.0, 0.0, 0.7, 0.7), (0.7, 0.0, 2.6, 0.7),
                         (0.0, 0.7, 0.7, 2.6), (3.3, 0.0, 0.7, 0.7),
                         (0.0, 3.3, 0.7, 0.7)]:
        fondo += volumen(O, x, y, dx, dy, 0.12, MURO, w=SEC)

    lleno = _pozo(0.62)
    # queda un resto en el fondo, corrido hacia la boca
    pozo = _losa(O, [(0.7, 0.9), (3.3, 0.9), (3.3, 3.3), (0.7, 3.3)],
                 0.12, 0.10, **LIQ)

    intacto = _frente_intacto()

    roto = muro_roto(PERFIL_B, 3.3, 4.0)
    # el muro de la derecha queda partido en dos munones
    roto += volumen(O, 3.3, 0.7, 0.7, 1.5, 0.12, MURO, w=SEC)
    roto += volumen(O, 3.3, 2.2, 0.7, 1.1, 0.12, 0.58, w=SEC)
    # y la esquina cercana se solto y quedo tirada por fuera
    for pts in ([(3.94, 3.34), (4.46, 3.20), (4.62, 3.66), (4.08, 3.82)],
                [(3.34, 3.94), (3.86, 3.86), (3.96, 4.34), (3.42, 4.46)]):
        roto += _losa(O, pts, 0.0, 0.16, **SOL)

    fisura = [grieta(a, b, 4.0) for a, b in GRIETAS_B]

    labio = [plano([(1.40, 3.3), (2.86, 3.3), (2.92, 4.0), (1.34, 4.0)], 0.24)]

    cae = [lamina([(1.34, 0.24), (2.92, 0.24), (2.98, 0.12), (1.28, 0.12)],
                  4.0),
           lamina([(1.66, 0.22), (2.60, 0.22), (2.54, 0.15), (1.72, 0.15)],
                  4.0, tono=CORAL_LUZ, op=0.45, trazo=CORAL_LUZ),
           plano([(1.28, 4.0), (2.98, 4.0), (3.04, 4.3), (1.22, 4.3)], 0.12),
           lamina([(1.22, 0.12), (3.04, 0.12), (3.12, 0.0), (1.14, 0.0)],
                  4.3)]

    charco = _losa(O, [(0.86, 4.44), (1.70, 4.34), (2.60, 4.36), (3.34, 4.56),
                       (3.86, 4.90), (3.90, 5.34), (3.40, 5.72), (2.60, 5.90),
                       (1.76, 5.76), (1.10, 5.40), (0.72, 4.92)],
                  0.0, 0.085, **LIQ)
    charco.append(brillo([(1.52, 4.66), (2.66, 4.60), (3.24, 4.98),
                          (2.44, 5.20), (1.44, 5.02)], 0.085))

    gotas = []
    for pts in ([(4.16, 4.42), (4.44, 4.52), (4.34, 4.80), (4.06, 4.68)],
                [(0.34, 5.28), (0.60, 5.20), (0.70, 5.46), (0.42, 5.54)],
                [(2.86, 6.16), (3.14, 6.24), (3.04, 6.46), (2.78, 6.38)],
                [(1.94, 6.30), (2.14, 6.36), (2.06, 6.54), (1.88, 6.48)]):
        gotas += _losa(O, pts, 0.0, 0.05, **LIQ)
    for x, y, dx, dy, h in [(4.34, 3.86, 0.42, 0.30, 0.14),
                            (0.42, 4.62, 0.30, 0.40, 0.12),
                            (3.62, 5.90, 0.26, 0.26, 0.10)]:
        gotas += volumen(O, x, y, dx, dy, 0.0, h, w=SEC)
    return fondo, lleno, pozo, intacto, roto, fisura, labio, cae, charco, gotas


# ------------------------------------------------------------- el ensamble

ESTILO = """
<style>
.hk-caja{animation:hkGolpe .34s cubic-bezier(.36,.07,.19,.97) .72s both}
.hk-lleno{animation:hkSale .30s ease-in .70s both}
.hk-intacto{animation:hkSale .10s linear .74s both}
.hk-grieta line{animation:hkTraza .26s ease-out .46s both,hkSale .16s linear .76s both}
.hk-roto{animation:hkEntra .12s linear .76s both}
.hk-pozo{animation:hkEntra .34s ease-out .74s both}
.hk-labio{transform-box:fill-box;transform-origin:50% 0;
  animation:hkEntra .18s linear .80s both,hkBrota .30s ease-out .80s both}
.hk-cae{transform-box:fill-box;transform-origin:50% 0;
  animation:hkEntra .10s linear .94s both,hkBaja .42s cubic-bezier(.4,0,.7,1) .94s both}
.hk-charco{transform-box:fill-box;transform-origin:52% 8%;
  animation:hkEntra .16s linear 1.24s both,hkCrece .58s cubic-bezier(.2,.7,.3,1) 1.24s both}
.hk-gotas{animation:hkEntra .30s ease-out 1.62s both}
@keyframes hkEntra{from{opacity:0}to{opacity:1}}
@keyframes hkSale{from{opacity:1}to{opacity:0}}
@keyframes hkTraza{to{stroke-dashoffset:0}}
@keyframes hkGolpe{0%{transform:translate(0,0)}22%{transform:translate(-7px,3px)}
  48%{transform:translate(5px,-2px)}74%{transform:translate(-2px,1px)}
  100%{transform:translate(0,0)}}
@keyframes hkBrota{from{transform:scaleY(.15)}to{transform:scaleY(1)}}
@keyframes hkBaja{from{transform:scaleY(0)}to{transform:scaleY(1)}}
@keyframes hkCrece{from{transform:scale(.14)}to{transform:scale(1)}}
@media (prefers-reduced-motion:reduce){
  .hk-caja,.hk-roto,.hk-pozo,.hk-labio,.hk-cae,.hk-charco,.hk-gotas{
    animation:none;opacity:1;transform:none}
  .hk-lleno,.hk-intacto,.hk-grieta{display:none}
}
</style>
"""


def armar(hacer):
    (fondo, lleno, pozo, intacto, roto, fisura, labio, cae, charco,
     gotas) = hacer()
    partes = [
        capa("hk-fondo", fondo),
        capa("hk-lleno", lleno),
        capa("hk-pozo", pozo, oculto=True),
        capa("hk-intacto", intacto),
        capa("hk-roto", roto, oculto=True),
        capa("hk-grieta", fisura),
        capa("hk-labio", labio, oculto=True),
        capa("hk-cae", cae, oculto=True),
        capa("hk-charco", charco, oculto=True),
        capa("hk-gotas", gotas, oculto=True),
    ]
    cuerpo = "\n".join(p for p in partes if p)
    return ('<g class="hk-caja" fill="none" stroke-linecap="round"'
            ' stroke-linejoin="round">\n%s\n</g>\n' % cuerpo)


def escribir(ruta, hacer):
    base = io.open(BASE, encoding="utf-8").read()
    cabeza = base[: base.rindex("</svg>")]
    io.open(ruta, "w", encoding="utf-8", newline="\n").write(
        cabeza + ESTILO + armar(hacer) + "</svg>\n")
    print(os.path.basename(ruta), os.path.getsize(ruta))


PAGINA = u"""<!doctype html><meta charset="utf-8"><title>%(t)s</title>
<style>
 body{margin:0;background:#0d2417;color:#f3ead8;font:14px/1.6 system-ui}
 .rot{margin:0;padding:22px 26px 10px;font:600 13px/1 system-ui;
      letter-spacing:.14em;text-transform:uppercase;color:#e5604d}
 .rot small{display:block;margin-top:9px;letter-spacing:0;text-transform:none;
      font-weight:400;font-size:14px;color:#f3ead8;opacity:.72}
 .banda{position:relative;overflow:hidden;background:#143620;height:521px}
 .banda>svg{position:absolute;right:0;bottom:0;height:100%%;width:auto;
      max-width:60%%;pointer-events:none;z-index:0}
 .texto{position:absolute;left:80px;bottom:56px;max-width:660px;z-index:2}
 .texto b{display:block;font:800 54px/1.02 system-ui;letter-spacing:-.02em}
 .texto span{display:block;margin-top:14px;font-size:17px;opacity:.9}
 .otra{position:fixed;right:20px;bottom:18px;z-index:9;background:#e5604d;
      color:#143620;border:0;border-radius:999px;padding:11px 20px;
      font:600 14px system-ui;cursor:pointer}
</style>
%(cuerpo)s
<button class="otra" onclick="repetir()">volver a romperlas</button>
<script>
function repetir(){
  document.querySelectorAll(".banda>svg").forEach(function(s){
    var c=s.cloneNode(true); s.parentNode.replaceChild(c,s);
  });
}
</script>
"""

BANDA = u"""<p class="rot">%(rot)s<small>%(nota)s</small></p>
<div class="banda">
%(svg)s
  <div class="texto"><b>AI Incident Response Sprint</b>
  <span>Un fin de semana para convertir los primeros incidentes en los que un
  sistema de IA actuo por su cuenta contra un tercero.</span></div>
</div>
"""


def inyectar(ruta, sufijo):
    """El SVG, listo para ir dentro del HTML: los id no se pueden repetir
    entre las dos laminas, y el encaje lo hace preserveAspectRatio."""
    s = io.open(ruta, encoding="utf-8").read()
    for viejo in ("fade", "m"):
        s = s.replace('id="%s"' % viejo, 'id="%s%s"' % (viejo, sufijo))
        s = s.replace("url(#%s)" % viejo, "url(#%s%s)" % (viejo, sufijo))
    return s.replace(
        '<svg width="1697"',
        '<svg preserveAspectRatio="xMaxYMax meet" width="1697"', 1)


def main():
    if not os.path.isdir(SALIDA):
        os.makedirs(SALIDA)
    escribir(os.path.join(SALIDA, "a.svg"), variante_a)
    escribir(os.path.join(SALIDA, "b.svg"), variante_b)

    bandas = [
        BANDA % dict(svg=inyectar(os.path.join(SALIDA, "a.svg"), "A"),
                     rot="A &middot; la caja aguanta",
                     nota=u"Se parte el muro del frente izquierdo. La caja "
                          u"sigue siendo una caja y el derrame cabe en el "
                          u"lienzo."),
        BANDA % dict(svg=inyectar(os.path.join(SALIDA, "b.svg"), "B"),
                     rot="B &middot; la caja se parte",
                     nota=u"Se va el muro entero y la esquina cercana se "
                          u"suelta. El contenido se vacia."),
    ]
    io.open(os.path.join(SALIDA, "index.html"), "w", encoding="utf-8",
            newline=chr(10)).write(
        PAGINA % dict(t=u"Romper la caja",
                      cuerpo=chr(10).join(bandas)))
    print("index.html")


if __name__ == "__main__":
    main()
