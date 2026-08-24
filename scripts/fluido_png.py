# -*- coding: utf-8 -*-
u"""Ve la simulacion sin navegador: hoja de instantes y GIF.

La caja se rasteriza una sola vez con cairosvg, en dos estados y con fondo
transparente. Cada cuadro se compone encima con PIL, que es lo unico que
cambia: el liquido se pinta dos veces, una detras de la caja y otra delante
recortada a lo que de verdad esta mas cerca que ella.

    py -X utf8 scripts/fluido_png.py
"""
import io
import os
import re
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

import cairosvg
import numpy as np
from PIL import Image, ImageDraw, ImageFont

import heroes as H
import rotura as R
import fluido as F

CORAL = (229, 96, 77)
FONDO = tuple(H.FONDO)
W, Hh = int(F.BW), int(F.BH)


def _envuelve(dentro, fondo):
    cuerpo = re.sub(r' stroke-dash(array|offset)="[^"]*"', "", dentro)
    cuerpo = cuerpo.replace('mask="url(#m)"', 'stroke-opacity="0.17"')
    rect = ('<rect width="%d" height="%d" fill="%s"/>' % (W, Hh, R._hex(H.FONDO))
            if fondo else "")
    return (u'<svg viewBox="0 0 %d %d" width="%d" height="%d"'
            u' xmlns="http://www.w3.org/2000/svg">%s'
            u'<g transform="translate(%.1f,0) scale(%.5f)">%s</g></svg>'
            % (W, Hh, W, Hh, rect, F.OX, F.K, cuerpo))


def _base():
    b = io.open(R.BASE, encoding="utf-8").read()
    i = b.index(">", b.index("<svg")) + 1
    return b[i: b.rindex("</svg>")]


def _png(svg):
    buf = io.BytesIO()
    cairosvg.svg2png(bytestring=svg.encode("utf-8"), write_to=buf,
                     output_width=W)
    return Image.open(buf).convert("RGBA")


def piezas():
    H.escala(0.78)
    fondo_svg = _envuelve(_base(), True)
    frag, intacto, roto, fisura, frente, bordes = R.lamina(False, True)
    def caja(grupos):
        capas = chr(10).join(f for g in grupos for f in g)
        return _envuelve('<g class="hk-caja" fill="none"'
                         ' stroke-linecap="round" stroke-linejoin="round">'
                         '%s</g>' % capas, False)

    entera = caja([frag, intacto, fisura, frente])
    rota = caja([frag, roto, fisura, frente, bordes])
    return _png(fondo_svg).convert("RGB"), _png(entera), _png(rota)


def mascara_cerca():
    u"""Lo que esta mas cerca que la caja: el suelo de adelante y de la
    derecha, la cara del muro por donde baja el chorro, y el reborde."""
    m = Image.new("L", (W, Hh), 0)
    d = ImageDraw.Draw(m)
    C = F.PB(4.3, 4.3, 0.0)
    L = 4200.0
    n1 = (-F.EX, -F.EY)
    n2 = (F.EX, -F.EY)
    def rayo(n):
        k = L / (n[0] ** 2 + n[1] ** 2) ** 0.5
        return (C[0] + n[0] * k * F.K, C[1] + n[1] * k * F.K)
    A, B = rayo(n1), rayo(n2)
    d.polygon([C, A, (A[0], A[1] + 3000), (B[0], B[1] + 3000), B], fill=255)
    quads = [
        [(0.7, 4.0, 0.12), (3.3, 4.0, 0.12), (3.3, 4.0, 1.14), (0.7, 4.0, 1.14)],
        [(-0.3, 4.0, 0.12), (4.3, 4.0, 0.12), (4.3, 4.3, 0.12), (-0.3, 4.3, 0.12)],
        [(-0.3, 4.3, 0.0), (4.3, 4.3, 0.0), (4.3, 4.3, 0.12), (-0.3, 4.3, 0.12)],
        [(4.3, -0.3, 0.0), (4.3, 4.3, 0.0), (4.3, 4.3, 0.12), (4.3, -0.3, 0.12)],
    ]
    for q in quads:
        d.polygon([F.PB(*p) for p in q], fill=255)
    return m


def cuadro(fondo, caja, cerca, siluetas):
    liq = Image.new("L", (W, Hh), 0)
    d = ImageDraw.Draw(liq)
    for pts in siluetas:
        d.polygon([tuple(p) for p in pts], fill=255)
    im = fondo.copy()
    tinta = Image.new("RGB", (W, Hh), CORAL)
    im.paste(tinta, (0, 0), liq)                       # detras de la caja
    im.paste(caja.convert("RGB"), (0, 0), caja.split()[3])
    frente = Image.fromarray(
        (np.asarray(liq).astype(np.uint16) *
         np.asarray(cerca).astype(np.uint16) // 255).astype(np.uint8))
    im.paste(tinta, (0, 0), frente)                    # delante
    return im


def _fuente(px):
    for r in (r"C:\Windows\Fonts\segoeuib.ttf", r"C:\Windows\Fonts\arialbd.ttf"):
        if os.path.exists(r):
            return ImageFont.truetype(r, px)
    return ImageFont.load_default()


def main():
    # La revision se corta donde se corta la animacion que se publica, asi que
    # el corte lo manda el emisor y no se copia a mano.
    import fluido_svg
    F.T_FIN = fluido_svg.FIN
    if not os.path.isdir(F.SALIDA):
        os.makedirs(F.SALIDA)
    fondo, entera, rota = piezas()
    cerca = mascara_cerca()
    cuadros = []

    def al_frame(k, t, corte, h):
        sil = F.siluetas(F.campo(corte, h))
        caja = entera if t < F.T_GOLPE else rota
        cuadros.append((t, cuadro(fondo, caja, cerca, sil)))

    n = F.corre(al_frame)
    print("cuadros:", n)

    gif = os.path.join(F.SALIDA, "derrame.gif")
    ims = [im for _, im in cuadros]
    ims[0].save(gif, save_all=True, append_images=ims[1:],
                duration=int(1000 / F.FPS), loop=0, optimize=True)
    print(gif)

    marcas = [0.58, 0.70, 0.82, 0.95, 1.15, 1.40, 1.65, F.T_FIN]
    elegidos = []
    for m in marcas:
        i = min(range(len(cuadros)), key=lambda j: abs(cuadros[j][0] - m))
        elegidos.append(cuadros[i])
    ANCHO = 616
    esc = [(t, im.resize((ANCHO, int(Hh * ANCHO / float(W))), Image.LANCZOS))
           for t, im in elegidos]
    aw, ah = esc[0][1].size
    M, T = 16, 26
    hoja = Image.new("RGB", (M + (aw + M) * 4, M + (T + ah + M) * 2), (13, 36, 23))
    dd = ImageDraw.Draw(hoja)
    f = _fuente(15)
    for i, (t, im) in enumerate(esc):
        x = M + (aw + M) * (i % 4)
        y = M + (T + ah + M) * (i // 4)
        dd.text((x, y), u"%.2f s" % t, font=f, fill=CORAL)
        hoja.paste(im, (x, y + T))
    ruta = os.path.join(F.SALIDA, "instantes.png")
    hoja.save(ruta)
    print(ruta, hoja.size)


if __name__ == "__main__":
    main()
