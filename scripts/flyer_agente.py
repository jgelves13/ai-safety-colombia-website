# -*- coding: utf-8 -*-
u"""El fondo del flyer del sprint: el agente ya afuera de la caja.

En la serie del hackathon anterior el motivo era un globo metido en un
medallon, recortado por el borde derecho de la lamina. Aca el globo se
reemplaza por la escena que ya cuenta el sitio: la caja rota y vacia, el
rastro de los pasos, y el agente andando lejos de ella.

No se dibuja una figura nueva. Se llama al mismo `agente.py` que anima el
hero de /sprint, congelado en un instante, para que el flyer y el sitio sean
literalmente el mismo dibujo. Lo unico que cambia es la paleta: la escena del
sitio esta resuelta contra el verde profundo del hero, y sobre crema hay que
invertirla —el trazo pasa a verde, las caras se mezclan contra el crema— o se
ve un dibujo en negativo.

    py -X utf8 scripts/flyer_agente.py            las piezas + la vista previa
    py -X utf8 scripts/flyer_agente.py --servir   ademas levanta el localhost
"""
import io
import os
import re
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

import heroes as H
import rotura as R
import agente as A

import cairosvg
from PIL import Image

SALIDA = (r"C:\Users\joseg\AppData\Local\Temp\claude\C--Users-joseg"
          r"\2c344f38-60d4-4a01-a4ea-dc0c8bbc1ff0\scratchpad\flyer")

# La paleta de los flyers, de scripts/flyers/lib.ts del repo viejo.
CREMA = "#FBF6EC"
BOSQUE = "#1F4D32"
CORAL = "#E5604D"
ARENA = "#f3ead8"
VERDE_HERO = (20, 54, 32)        # aisc-forest-deep, el fondo de la banda

# El lienzo de la referencia: 1080x1350, el 4:5 de Instagram.
LIENZO_W, LIENZO_H = 1080, 1350


def _rgb(hexa):
    return (int(hexa[1:3], 16), int(hexa[3:5], 16), int(hexa[5:7], 16))


def paleta(fondo_rgb, tinta, realce=1.0):
    u"""Reasienta la paleta de los tres modulos contra otro fondo.

    Las constantes de `heroes` y `rotura` se calculan al importar, asi que no
    basta con cambiar FONDO: hay que recalcular todo lo que salio de el. Y los
    tres modulos hicieron `from heroes import ARENA`, o sea que cada uno tiene
    su propia copia del nombre y las tres hay que tocarlas.

    `realce` sube todas las mezclas a la vez. Hace falta sobre crema: las
    proporciones del hero estan medidas contra un verde casi negro, donde un
    14 % de arena ya es una cara visible. Sobre crema ese mismo 14 % de verde
    es un blanco sucio, y la caja se deshace. No se retoca cara por cara para
    que la jerarquia entre las tres orientaciones siga siendo la del sitio.
    """
    def mez(hexa, p):
        return H._mezcla(fondo_rgb, hexa, min(1.0, p * realce))

    H.FONDO = fondo_rgb
    H.ARENA = tinta
    H.CARA_SUP = mez(tinta, 0.14)
    H.CARA_IZQ = mez(tinta, 0.075)
    H.CARA_DER = mez(tinta, 0.035)
    H.HOJAS = mez(tinta, 0.32)
    H.BANDA = mez(tinta, 0.28)
    H.CORAL_IZQ = H._mezcla(fondo_rgb, H.CORAL, 0.72)
    H.CORAL_DER = H._mezcla(fondo_rgb, H.CORAL, 0.52)

    R.FONDO = fondo_rgb
    R.ARENA = tinta
    R.CARA_SUP, R.CARA_IZQ, R.CARA_DER = H.CARA_SUP, H.CARA_IZQ, H.CARA_DER
    R.BISEL_ARRIBA = mez(tinta, 0.21)
    R.BISEL_LADO = mez(tinta, 0.07)
    R.BISEL_ABAJO = mez("#000000", 0.18)
    R.LABIO = mez(tinta, 0.30)
    R.ASTILLA = mez(tinta, 0.17)

    A.ARENA = tinta
    A.BALDOSA = mez(tinta, 0.085)


# ------------------------------------------------------------- el instante

def instante(fraccion):
    u"""El momento del recorrido que se congela.

    0 es cuando se decide y arranca a la izquierda; 1 es cuando sale del
    cuadro. Lo que se busca es que se lea «ya salio»: lejos de la caja, con
    rastro suficiente detras para que se entienda de donde viene.
    """
    _seg, hitos = A.linea_de_tiempo()
    return hitos["decide"] + fraccion * (hitos["fin"] - hitos["decide"])


def escena(t):
    u"""Las capas quietas, sin la reticula del fondo.

    La reticula es la textura de la banda del hero y llena el ancho entero.
    En una pieza recortada no aporta: seria un cuadriculado suelto detras del
    dibujo. El suelo isometrico bajo los pies si se queda, que es lo que hace
    que el agente pise algo y no flote.
    """
    caja, suelo, rastro, agente, _q, _h = A.capas(False, t)
    piezas = re.sub(r' id="ag[A-Za-z]+"', "", suelo + rastro + agente)
    piezas = piezas.replace(' class="ag-piel"', "")
    return caja + piezas


def _envoltura(cuerpo, caja_vb, extra=""):
    x, y, w, h = caja_vb
    return (u'<svg viewBox="%.1f %.1f %.1f %.1f" xmlns="http://www.w3.org/2000/svg"'
            u' xmlns:xlink="http://www.w3.org/1999/xlink" role="presentation">'
            u'%s<g transform="scale(%.5f)">%s</g></svg>'
            % (x, y, w, h, extra, A.K, cuerpo))


def recortar(cuerpo, margen=18.0):
    u"""El viewBox justo, medido sobre el dibujo y no a ojo.

    Se pinta en un lienzo holgado, se busca donde empieza y termina lo opaco,
    y se traduce de pixeles a unidades del viewBox. Calcular el borde a mano
    sale mal: el rastro y las esquirlas se salen de la caja por sitios que no
    se adivinan.
    """
    ancho_prueba = 0.0 + 3400.0
    holgado = (-900.0, -500.0, ancho_prueba, 2300.0)
    prueba = _envoltura(cuerpo, holgado)
    png = cairosvg.svg2png(bytestring=prueba.encode("utf-8"), output_width=1200)
    im = Image.open(io.BytesIO(png)).convert("RGBA")
    caja = im.getbbox() if im.getchannel("A").getbbox() is None else im.getchannel("A").getbbox()
    if caja is None:
        raise RuntimeError("el dibujo salio vacio")
    k = holgado[2] / float(im.size[0])
    x0 = holgado[0] + caja[0] * k - margen
    y0 = holgado[1] + caja[1] * k - margen
    x1 = holgado[0] + caja[2] * k + margen
    y1 = holgado[1] + caja[3] * k + margen
    return (x0, y0, x1 - x0, y1 - y0)


# ------------------------------------------------------------- las piezas

def suelto(t, fondo_rgb, tinta, realce=1.0):
    u"""La escena sola, sin nada detras: el PNG que se mueve en Canva."""
    paleta(fondo_rgb, tinta, realce)
    cuerpo = escena(t)
    return _envoltura(cuerpo, recortar(cuerpo))


def medallon(t, fondo_rgb, tinta, relleno, aro, realce=1.0):
    u"""La misma escena dentro del circulo de la serie.

    El circulo no puede contener la escena entera. El globo de la serie
    anterior era redondo y llenaba su medallon; esto es una cinta horizontal
    —caja, rastro, agente— de mas de tres a uno, y un circulo que la cubra
    toda deja dos lunas vacias arriba y abajo. Asi que el circulo se dimensiona
    por el alto del dibujo y recorta los extremos: la caja se sale por la
    derecha, que es exactamente el gesto de la referencia, donde el globo se
    salia por el borde de la lamina.
    """
    paleta(fondo_rgb, tinta, realce)
    cuerpo = escena(t)
    x, y, w, h = recortar(cuerpo, margen=10.0)
    r = h * 0.86
    cx = x + w * 0.56
    cy = y + h / 2.0
    vb = (cx - r, cy - r, 2 * r, 2 * r)
    defs = ('<defs><clipPath id="med"><circle cx="%.1f" cy="%.1f" r="%.1f"/>'
            '</clipPath></defs>' % (cx, cy, r))
    piso = ('<circle cx="%.1f" cy="%.1f" r="%.1f" fill="%s"/>'
            % (cx, cy, r, relleno))
    dentro = ('<g clip-path="url(#med)"><g transform="scale(%.5f)">%s</g></g>'
              % (A.K, cuerpo))
    borde = ('<circle cx="%.1f" cy="%.1f" r="%.1f" fill="none" stroke="%s"'
             ' stroke-width="%.1f"/>' % (cx, cy, r - 1.6, aro, 3.2))
    return (u'<svg viewBox="%.1f %.1f %.1f %.1f" xmlns="http://www.w3.org/2000/svg"'
            u' xmlns:xlink="http://www.w3.org/1999/xlink" role="presentation">'
            u'%s%s%s%s</svg>' % (vb[0], vb[1], vb[2], vb[3], defs, piso, dentro, borde))


# ------------------------------------------------------------ la salida

# Sobre crema el dibujo pide mas cuerpo; sobre el verde del hero la paleta ya
# esta afinada y tocarla seria alejarlo del sitio.
CREMA_FONDO, VERDE_FONDO = _rgb(CREMA), VERDE_HERO
REALCE_CREMA, REALCE_VERDE = 2.4, 1.0

# El medallon recorta, asi que se le da un recorrido mas corto: con la carrera
# entera adentro, el circulo se come al agente o a la caja.
VARIANTES = [
    ("crema-suelto", u"Crema · suelto", CREMA, "suelto", CREMA_FONDO,
     BOSQUE, REALCE_CREMA, 0.72),
    ("crema-medallon", u"Crema · medallón", CREMA, "medallon", CREMA_FONDO,
     BOSQUE, REALCE_CREMA, 0.46),
    ("verde-suelto", u"Verde · suelto", "#143620", "suelto", VERDE_FONDO,
     ARENA, REALCE_VERDE, 0.72),
    ("verde-medallon", u"Verde · medallón", "#143620", "medallon", VERDE_FONDO,
     ARENA, REALCE_VERDE, 0.46),
]

# Tres distancias del agente a la caja, para escoger cuanto pesa la fuga.
MOMENTOS = [(u"Cerca", 0.34), (u"Medio", 0.55), (u"Lejos", 0.80)]


def pieza(forma, fraccion, fondo_rgb, tinta, realce):
    t = instante(fraccion)
    if forma == "suelto":
        return suelto(t, fondo_rgb, tinta, realce)
    relleno = ARENA if tinta == BOSQUE else H._mezcla(fondo_rgb, tinta, 0.06)
    aro = BOSQUE if tinta == BOSQUE else H._mezcla(fondo_rgb, tinta, 0.45)
    return medallon(t, fondo_rgb, tinta, relleno, aro, realce)


def construir():
    if not os.path.isdir(SALIDA):
        os.makedirs(SALIDA)
    hechas = []
    for slug, rotulo, fondo_pagina, forma, fondo_rgb, tinta, realce, frac in VARIANTES:
        svg = pieza(forma, frac, fondo_rgb, tinta, realce)
        ruta = os.path.join(SALIDA, "motivo-%s.svg" % slug)
        io.open(ruta, "w", encoding="utf-8", newline="\n").write(svg)
        hechas.append((slug, rotulo, fondo_pagina, forma, svg))
        print(ruta)

    momentos = []
    for rotulo, frac in MOMENTOS:
        svg = pieza("suelto", frac, CREMA_FONDO, BOSQUE, REALCE_CREMA)
        ruta = os.path.join(SALIDA, "momento-%.2f.svg" % frac)
        io.open(ruta, "w", encoding="utf-8", newline="\n").write(svg)
        momentos.append((rotulo, frac, svg))

    io.open(os.path.join(SALIDA, "index.html"), "w", encoding="utf-8",
            newline="\n").write(pagina(hechas, momentos))
    return hechas


def pagina(hechas, momentos):
    tarjetas = []
    for slug, rotulo, fondo_pagina, forma, svg in hechas:
        claro = fondo_pagina == CREMA
        texto = "#211A12" if claro else ARENA
        tenue = "#4A4030" if claro else H._mezcla(VERDE_HERO, ARENA, 0.62)
        ancho = "760px" if forma == "suelto" else "560px"
        derecha = "-150px" if forma == "suelto" else "-120px"
        arriba = "640px" if forma == "suelto" else "560px"
        tarjetas.append(TARJETA % dict(
            rotulo=rotulo, slug=slug, fondo=fondo_pagina, texto=texto,
            tenue=tenue, svg=svg, w=LIENZO_W, h=LIENZO_H,
            ancho=ancho, derecha=derecha, arriba=arriba))
    filas = []
    for rotulo, frac, svg in momentos:
        filas.append(MOMENTO % dict(rotulo=rotulo, frac=frac, svg=svg,
                                    fondo=CREMA))
    return PAGINA % dict(tarjetas="\n".join(tarjetas),
                         momentos="\n".join(filas), w=LIENZO_W, h=LIENZO_H)


TARJETA = u"""
<figure class="pieza">
  <figcaption>%(rotulo)s</figcaption>
  <div class="marco">
  <div class="lienzo" style="background:%(fondo)s">
    <div class="texto">
      <p class="kicker" style="color:%(tenue)s">POSTULACIONES HUB BOGOTÁ CIERRAN 6 SEPTIEMBRE</p>
      <h2 style="color:%(texto)s">AI Incident<br>Response<br>Sprint</h2>
      <p class="fecha" style="color:%(texto)s">11–13 septiembre 2026 · Bogotá</p>
      <p class="cuerpo" style="color:%(tenue)s">Un fin de semana para responder a un
      incidente de IA: contenerlo, analizarlo, regularlo y contarlo.</p>
    </div>
    <div class="motivo" style="width:%(ancho)s;right:%(derecha)s;top:%(arriba)s">%(svg)s</div>
  </div>
  </div>
</figure>
"""

MOMENTO = u"""
<figure class="momento">
  <figcaption>%(rotulo)s · %(frac).2f del recorrido</figcaption>
  <div style="background:%(fondo)s;padding:22px 26px;border-radius:4px">%(svg)s</div>
</figure>
"""

PAGINA = u"""<!doctype html>
<html lang="es"><head><meta charset="utf-8">
<title>Fondo del flyer del sprint</title>
<style>
  :root { color-scheme: light }
  body { margin:0; padding:34px; background:#20221f; color:#e9e4d8;
         font:15px/1.55 -apple-system,Segoe UI,Roboto,sans-serif }
  h1 { font-size:20px; margin:0 0 6px }
  .nota { max-width:70ch; color:#a9a396; margin:0 0 26px }
  .rejilla { display:flex; flex-wrap:wrap; gap:30px }
  .pieza { margin:0 }
  figcaption { font-size:13px; letter-spacing:.06em; text-transform:uppercase;
               color:#a9a396; margin-bottom:8px }
  .marco { width:497px; height:621px; overflow:hidden }
  .lienzo { position:relative; width:%(w)spx; height:%(h)spx;
            transform:scale(.46); transform-origin:top left;
            overflow:hidden }
  .texto { position:absolute; left:80px; top:96px; width:600px; z-index:2 }
  .kicker { font:600 21px/1.4 -apple-system,Segoe UI,sans-serif;
            letter-spacing:.14em; margin:0 0 26px }
  h2 { font:800 92px/0.98 -apple-system,Segoe UI,sans-serif;
       letter-spacing:-.02em; margin:0 0 30px }
  .fecha { font:700 34px/1.3 -apple-system,Segoe UI,sans-serif; margin:0 0 22px }
  .cuerpo { font:500 30px/1.42 -apple-system,Segoe UI,sans-serif; margin:0 }
  .motivo { position:absolute; z-index:1 }
  .motivo svg { width:100%%; height:auto; display:block }
  h3 { font-size:16px; margin:40px 0 4px }
  .momentos { display:flex; flex-direction:column; gap:16px; max-width:900px }
  .momento { margin:0 }
  .momento svg { width:100%%; height:auto; display:block }
</style></head><body>
<h1>El fondo del flyer del sprint</h1>
<p class="nota">El mismo dibujo del hero de /sprint, congelado. El texto de las
láminas es de relleno, solo para ver cómo queda el aire a la izquierda: el que
va de verdad lo pones tú. El motivo no lleva rectángulo propio, así que en
Canva se mueve sin arrastrar nada detrás.</p>
<div class="rejilla">%(tarjetas)s</div>
<h3>¿Qué tan lejos queda el agente?</h3>
<p class="nota">La misma escena a tres distancias. Cuanto más lejos, más pesa la
fuga y más se alarga la cinta; cuanto más cerca, más compacto el motivo.</p>
<div class="momentos">%(momentos)s</div>
</body></html>
"""


def main():
    construir()
    print(os.path.join(SALIDA, "index.html"))


if __name__ == "__main__":
    main()
