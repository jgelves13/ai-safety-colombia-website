# -*- coding: utf-8 -*-
"""Lamina de comparacion de los cuatro derrames, sin navegador.

El navegador no sirve para juzgar esto: la animacion pasa, el zoom de la
pagina se mueve y las capturas llegan tarde. Se rasteriza con cairosvg la
version quieta de cada banda y se pegan las cuatro.

    py -X utf8 scripts/liquido_png.py
"""
import io
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

import cairosvg
from PIL import Image, ImageDraw, ImageFont

import liquido as L

ANCHO = 840
MARGEN = 22
TITULO = 34


def _fuente(px):
    for ruta in (r"C:\Windows\Fonts\segoeuib.ttf", r"C:\Windows\Fonts\arialbd.ttf"):
        if os.path.exists(ruta):
            return ImageFont.truetype(ruta, px)
    return ImageFont.load_default()


def main():
    fila = []
    for ident, rot, eje, centro, sinfin, nota in L.CASOS:
        png = os.path.join(L.SALIDA, "fijo%s.png" % ident)
        cairosvg.svg2png(url=os.path.join(L.SALIDA, "fijo%s.svg" % ident),
                         write_to=png, output_width=int(L.BW))
        im = Image.open(png).convert("RGB")
        alto = int(im.height * ANCHO / float(im.width))
        fila.append((rot, nota, im.resize((ANCHO, alto), Image.LANCZOS)))

    alto = fila[0][2].height
    W = MARGEN * 3 + ANCHO * 2
    Hh = MARGEN + (TITULO + alto + MARGEN) * 2
    hoja = Image.new("RGB", (W, Hh), (13, 36, 23))
    d = ImageDraw.Draw(hoja)
    f1, f2 = _fuente(19), _fuente(15)
    for i, (rot, nota, im) in enumerate(fila):
        x = MARGEN + (MARGEN + ANCHO) * (i % 2)
        y = MARGEN + (TITULO + alto + MARGEN) * (i // 2)
        d.text((x, y), rot, font=f1, fill=(229, 96, 77))
        d.text((x + 190, y + 3), nota, font=f2, fill=(190, 200, 185))
        hoja.paste(im, (x, y + TITULO))
    ruta = os.path.join(L.SALIDA, "comparar.png")
    hoja.save(ruta)
    print(ruta, hoja.size)


if __name__ == "__main__":
    main()
