# -*- coding: utf-8 -*-
"""Rasteriza las cuatro laminas ya rotas y arma una hoja de contacto.

El navegador no sirve para juzgarlas: la animacion las deja a medio camino y
el zoom del visor mueve las coordenadas. Aqui se congelan y se recortan
siempre por el mismo lado.

    py -X utf8 scripts/rotura_png.py
"""
import io
import os
import sys

import cairosvg
from PIL import Image, ImageDraw, ImageFont

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import rotura as R

SALIDA = R.SALIDA
RECORTE = (380, 400, 1560, 1300)     # en unidades del viewBox
ANCHO = 780
ROTULOS = [u"1 · borde intacto, solo el hueco",
           u"2 · borde intacto, con labios y esquirlas",
           u"3 · el borde mordido, solo el hueco",
           u"4 · el borde mordido, con labios y esquirlas"]


def tipo(px):
    for n in ("segoeui.ttf", "arial.ttf"):
        r = os.path.join(r"C:\Windows\Fonts", n)
        if os.path.exists(r):
            return ImageFont.truetype(r, px)
    return ImageFont.load_default()


def lamina(i, muerde, labio):
    svg = os.path.join(SALIDA, "fijo%d.svg" % (i + 1))
    R.fijo(svg, muerde, labio)
    png = os.path.join(SALIDA, "fijo%d.png" % (i + 1))
    cairosvg.svg2png(url=svg, write_to=png, output_width=1697)
    im = Image.open(png).convert("RGB").crop(RECORTE)
    alto = int(im.height * ANCHO / float(im.width))
    im = im.resize((ANCHO, alto), Image.LANCZOS)
    im.save(os.path.join(SALIDA, "lamina%d.png" % (i + 1)))
    return im


def main():
    ims = [lamina(i, m, l) for i, (m, l) in
           enumerate([(False, False), (False, True),
                      (True, False), (True, True)])]
    w, h = ims[0].size
    cab = 46
    hoja = Image.new("RGB", (w * 2 + 30, (h + cab) * 2 + 30), (13, 36, 23))
    dib = ImageDraw.Draw(hoja)
    f = tipo(21)
    for k, im in enumerate(ims):
        x = 10 + (k % 2) * (w + 10)
        y = 10 + (k // 2) * (h + cab + 10)
        dib.text((x + 2, y + 10), ROTULOS[k], font=f, fill=(229, 96, 77))
        hoja.paste(im, (x, y + cab))
    ruta = os.path.join(SALIDA, "comparar.png")
    hoja.save(ruta)
    print(ruta, hoja.size)


if __name__ == "__main__":
    main()
