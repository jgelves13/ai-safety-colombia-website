# -*- coding: utf-8 -*-
"""Rasteriza un hero para poder juzgarlo sin navegador.

    py -X utf8 scripts/hero_png.py investigacion [mas nombres...]

Sale en scripts/variantes/hero-<nombre>.png. El recorte cae sobre la esquina
donde vive el dibujo, que es lo unico que interesa mirar.
"""
import io
import os
import re
import sys

import cairosvg

RAIZ = r"C:\Users\joseg\aisc-new-website\public\aisc\patterns"
SALIDA = os.path.join(os.path.dirname(os.path.abspath(__file__)), "variantes")
FONDO = "#143620"
RECORTE = (0, 0, 1697, 1415)       # en unidades del viewBox
ANCHO = 900


def raster(nombre, sufijo=""):
    ruta = os.path.join(RAIZ, "aisc-hero-%s.svg" % nombre)
    s = io.open(ruta, encoding="utf-8").read()
    # cairosvg no entiende el degradado en objectBoundingBox: la mascara se
    # cambia por una opacidad plana y el fondo se pinta a mano.
    s = s.replace('mask="url(#m)"', 'stroke-opacity="0.17"')
    x, y, w, h = RECORTE
    s = re.sub(r'viewBox="[^"]+"', 'viewBox="%d %d %d %d"' % (x, y, w, h), s, 1)
    s = re.sub(r'width="\d+" height="\d+"',
               'width="%d" height="%d"' % (w, h), s, 1)
    s = s.replace("<defs>", '<rect x="%d" y="%d" width="%d" height="%d" '
                  'fill="%s"/><defs>' % (x, y, w, h, FONDO), 1)
    if not os.path.isdir(SALIDA):
        os.makedirs(SALIDA)
    out = os.path.join(SALIDA, "hero-%s%s.png" % (nombre, sufijo))
    cairosvg.svg2png(bytestring=s.encode("utf-8"), write_to=out,
                     output_width=ANCHO)
    print(out)


if __name__ == "__main__":
    for n in (sys.argv[1:] or ["investigacion"]):
        raster(n)
