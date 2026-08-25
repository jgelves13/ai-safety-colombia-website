# -*- coding: utf-8 -*-
u"""Congela la animacion del hero y la deja en tamano de flyer.

No dibuja nada nuevo: llama a `agente.capas()` con `animado=False` y un
instante `t`, que es exactamente el mismo codigo que genera
`components/hero-hackathon.tsx`. Lo unico que cambia es el encuadre: en el
sitio la escena vive en una banda de 1280x521 y la caja se sale por la
derecha; aca se mide la figura y se la agranda para que el gesto (la caja
rota, el cubo afuera) se lea de lejos.

Salida: la hoja de contacto en el scratchpad, para mirar antes de exportar.
"""
import io
import os
import re
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

import cairosvg
from PIL import Image

import heroes as H
import rotura as R
import agente as A

SALIDA = os.path.join(
    os.environ.get("TEMP", "."), "claude", "C--Users-joseg",
    "2c344f38-60d4-4a01-a4ea-dc0c8bbc1ff0", "scratchpad", "flyer")

# ------------------------------------------------------------- la paleta

CREMA = "#FBF6EC"
BOSQUE = "#1F4D32"
ARENA_SITIO = "#f3ead8"
VERDE_SITIO = (20, 54, 32)


def _rgb(hexa):
    hexa = hexa.lstrip("#")
    return tuple(int(hexa[i:i + 2], 16) for i in (0, 2, 4))


def paleta(fondo_rgb, tinta, realce=1.0):
    u"""Repinta las caras contra otro fondo.

    Cada color del dibujo es una mezcla del fondo con la tinta, calculada al
    importar. Cambiar el fondo obliga a rehacer todas, en los tres modulos,
    porque cada uno se quedo con su copia del nombre.
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
    # el coral tambien se aclara contra la crema: si se deja la mezcla del
    # sitio el cubo sale rosado. Se sube, pero guardando la diferencia entre
    # las dos caras, que es lo que le da volumen.
    p_izq = min(1.0, 0.72 * realce)
    H.CORAL_IZQ = H._mezcla(fondo_rgb, H.CORAL, p_izq)
    H.CORAL_DER = H._mezcla(fondo_rgb, H.CORAL, p_izq * 0.72)

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


# -------------------------------------------------------- los instantes
#
# T_NACE 1.62 nace en el boquete · +D_SALE sale al aire · +D_CAE toca el
# suelo. Lo que Jose llama "recien salido" cae entre esos dos.

T_AIRE = A.T_NACE + A.D_SALE                     # 1.96, colgado en el boquete
T_PISO = T_AIRE + A.D_CAE                        # 2.26, acaba de aterrizar
T_PASO = T_PISO + A.D_TANTEO                     # 2.52, primer paso afuera
T_DOS = T_PASO + A.D_TANTEO                      # 2.78, segundo paso

MOMENTOS = [
    ("aire", u"Saliendo del boquete", T_AIRE),
    ("piso", u"Recien puesto el pie afuera", T_PISO + 0.01),
    ("paso", u"Un paso afuera", T_PASO + 0.01),
    ("dos", u"Dos pasos afuera", T_DOS + 0.01),
]


def _salida_coral(t):
    u"""El rastro del tramo que el sitio no pinta: del boquete al suelo.

    En la animacion se ve salir al agente, y por eso nadie duda de que estaba
    adentro. Quieta, la escena pierde ese dato: un cubo al lado de una caja
    rota es un cubo al lado de una caja rota. Este trazo es el mismo rastro
    coral de siempre, aplicado a los dos primeros tramos del camino, que son
    justo los que van de adentro del boquete al piso.
    """
    seg, _h = A.linea_de_tiempo()
    salida, _t, _d = A.camino()
    tramos = [(seg[0][0], seg[0][1]), (seg[1][0], seg[1][1])]
    return A.rastro(list(salida), tramos, A.CORAL, 0.9, 6.5, False, t)


def motivo(t, salida=True, resto=0.0):
    u"""El dibujo en coordenadas del mundo (1697x1415), sin el mantel.

    `salida` pinta el rastro del boquete al piso. `resto` deja adentro un
    poco del coral que llenaba la caja, que es de donde salio el cubo.
    """
    original = A._lleno_quieto
    if resto > 0:
        def con_resto(lleno, t_):
            hecho = original(lleno, t_)
            if hecho or len(lleno) != 1:
                # len 1 es la tapa que se ve por el boquete; el bloque entero
                # dejado a medias ensucia todo el interior de rosa
                return hecho
            return '<g class="hk-lleno" opacity="%.3f">%s</g>' % (
                resto, "".join(lleno))
        A._lleno_quieto = con_resto
    try:
        caja, suelo, rastro, agente, _q, _h = A.capas(False, t)
    finally:
        A._lleno_quieto = original
    piezas = caja + (_salida_coral(t) if salida else "") + suelo + rastro + agente
    piezas = re.sub(r' id="ag[A-Za-z]+"', "", piezas)
    return piezas.replace(' class="ag-piel"', "")


# la malla del fondo, tal cual esta en el sitio, ocupa esto en el mundo
RET_X, RET_Y, RET_W, RET_H = -368.0, -118.0, 2065.0, 1533.0


def tapiz(vb, tinta, op=0.17):
    u"""La reticula del sitio, estirada para cubrir el encuadre.

    En la banda del sitio la malla cubre el ancho entero; al acercarse deja
    esquinas vacias. Se agranda en bloque en vez de repetirla: el triangulo
    crece con el zoom, que es lo que hace un acercamiento de verdad.
    """
    dentro = A.reticula(False)
    dentro = re.sub(r"<defs>.*?</defs>", "", dentro, flags=re.S)
    dentro = dentro.replace('stroke="#f3ead8"', 'stroke="%s"' % tinta)
    dentro = dentro.replace('stroke-opacity="0.17"', 'stroke-opacity="%.2f"' % op)
    s = max(vb[2] / RET_W, vb[3] / RET_H) * 1.02
    dx = (vb[0] + vb[2] / 2.0) - s * (RET_X + RET_W / 2.0)
    dy = (vb[1] + vb[3] / 2.0) - s * (RET_Y + RET_H / 2.0)
    return '<g transform="translate(%.2f,%.2f) scale(%.4f)">%s</g>' % (
        dx, dy, s, dentro)


def _svg(cuerpo, vb, ancho, alto, fondo=None):
    tapa = ""
    if fondo:
        tapa = '<rect x="%.1f" y="%.1f" width="%.1f" height="%.1f" fill="%s"/>' % (
            vb[0], vb[1], vb[2], vb[3], fondo)
    return (u'<svg xmlns="http://www.w3.org/2000/svg" width="%d" height="%d"'
            u' viewBox="%.1f %.1f %.1f %.1f">%s%s</svg>'
            % (ancho, alto, vb[0], vb[1], vb[2], vb[3], tapa, cuerpo))


def caja_de(cuerpo, ancho=1100):
    u"""El rectangulo que ocupa el dibujo, medido sobre un render suelto."""
    holgado = (-900.0, -500.0, 3400.0, 2300.0)
    alto = int(round(ancho * holgado[3] / holgado[2]))
    png = cairosvg.svg2png(
        bytestring=_svg(cuerpo, holgado, ancho, alto).encode("utf-8"),
        output_width=ancho)
    im = Image.open(io.BytesIO(png)).convert("RGBA")
    b = im.getchannel("A").getbbox()
    if not b:
        return holgado
    e = holgado[2] / float(im.size[0])
    return (holgado[0] + b[0] * e, holgado[1] + b[1] * e,
            (b[2] - b[0]) * e, (b[3] - b[1]) * e)


# ------------------------------------------------------------ encuadres

LIENZO_W, LIENZO_H = 1080, 1350


def encuadre_banda(t, fondo, tinta, op_tapiz=0.17, escala=3, **kw):
    u"""El recorte del sitio, 1280x521, con el mismo transform del hero."""
    dentro = A.reticula(False)
    dentro = dentro.replace('stroke="#f3ead8"', 'stroke="%s"' % tinta)
    dentro = dentro.replace('stroke-opacity="0.17"',
                            'stroke-opacity="%.2f"' % op_tapiz)
    cuerpo = (u'<g transform="translate(%.1f,0) scale(%.5f)">%s%s</g>'
              % (A.OX, A.K, dentro, motivo(t, **kw)))
    return (u'<svg xmlns="http://www.w3.org/2000/svg" width="%d" height="%d"'
            u' viewBox="0 0 1280 521">'
            u'<rect width="1280" height="521" fill="%s"/>%s</svg>'
            % (1280 * escala, 521 * escala, fondo, cuerpo))


def encuadre_flyer(t, fondo, tinta, ancho=0.86, cx_rel=0.5, cy_rel=0.62,
                   anc_x=0.5, anc_y=0.5, con_tapiz=True, op_tapiz=0.17,
                   salida=True, resto=1.0):
    u"""4:5, con el motivo puesto a mano sobre el lienzo.

    `ancho` es cuanto del lienzo ocupa la figura; pasado de 1.0 la caja se
    sale por el borde, como el globo del flyer de referencia. `cx_rel` y
    `cy_rel` dicen donde cae el punto de la figura marcado por `anc_x` y
    `anc_y`, y de eso depende que arriba quede sitio para el titular.
    """
    cuerpo = motivo(t, salida=salida, resto=resto)
    x, y, w, h = caja_de(cuerpo)

    s = ancho * LIENZO_W / w                 # px de lienzo por unidad de mundo
    vw = LIENZO_W / s
    vh = LIENZO_H / s
    vb = ((x + w * anc_x) - cx_rel * vw, (y + h * anc_y) - cy_rel * vh, vw, vh)
    fondos = tapiz(vb, tinta, op_tapiz) if con_tapiz else ""
    return _svg(fondos + cuerpo, vb, LIENZO_W, LIENZO_H, fondo=fondo)


# ---------------------------------------------------------------- salida

# de donde salio: lo que hace que el cubo de afuera se lea como el que
# estaba adentro, y no como un cubo cualquiera al lado de una caja rota
LECTURAS = [
    ("seca", u"Sin nada", dict(salida=False, resto=0.0)),
    ("hilo", u"Con el hilo del boquete al piso", dict(salida=True, resto=0.0)),
    ("adentro", u"Hilo + el coral que se ve por el boquete",
     dict(salida=True, resto=1.0)),
]
LECTURA = dict(salida=True, resto=1.0)

ENCUADRES = [
    ("entero", u"Entero", dict(ancho=0.88, cx_rel=0.50, cy_rel=0.63)),
    ("sangra", u"Sangrando a la derecha",
     dict(ancho=1.30, cx_rel=0.60, cy_rel=0.66)),
    ("detalle", u"De cerca, en el boquete",
     dict(ancho=2.05, cx_rel=0.50, cy_rel=0.56, anc_x=0.22, anc_y=0.68)),
    ("limpio", u"Entero, sin malla",
     dict(ancho=0.88, cx_rel=0.50, cy_rel=0.63, con_tapiz=False)),
]

VARIANTES = [
    ("verde", u"Verde del sitio", VERDE_SITIO, ARENA_SITIO, 1.0, 0.17),
    ("crema", u"Crema del flyer", _rgb(CREMA), BOSQUE, 2.4, 0.09),
]

PAGINA = u"""<!doctype html>
<meta charset="utf-8">
<title>Captura del agente</title>
<style>
 body{margin:0;background:#15170f;color:#e9e2d2;
      font:15px/1.5 ui-sans-serif,system-ui,sans-serif;padding:34px}
 h1{font-size:20px;margin:0 0 6px}
 p.pie{color:#9a9384;margin:0 0 26px;max-width:64ch}
 h2{font-size:15px;letter-spacing:.08em;text-transform:uppercase;
    color:#9a9384;margin:34px 0 12px;border-top:1px solid #2d2f26;padding-top:12px}
 .fila{display:flex;gap:18px;flex-wrap:wrap;align-items:flex-start}
 figure{margin:0}
 figcaption{color:#9a9384;font-size:12px;margin-top:6px}
 img.banda{width:740px;display:block;border-radius:4px}
 img.flyer{width:290px;display:block;border-radius:4px}
 img.lect{width:330px;display:block;border-radius:4px}
</style>
<h1>La animacion del hero, congelada</h1>
<p class="pie">Es el mismo dibujo del sitio: el script llama a
<code>agente.capas()</code> con el reloj detenido. Quieta, la escena perdia el
dato de que el cubo salio de adentro; abajo esta lo que se le devolvio.</p>
<h2>Que se note que estaba adentro</h2>
<div class="fila">%(lecturas)s</div>
%(cuerpo)s
"""


def main():
    if not os.path.isdir(SALIDA):
        os.makedirs(SALIDA)

    paleta(_rgb(CREMA), BOSQUE, 2.4)
    lecturas = []
    for lclave, ltitulo, kw in LECTURAS:
        nombre = "lectura-%s.svg" % lclave
        io.open(os.path.join(SALIDA, nombre), "w", encoding="utf-8").write(
            encuadre_flyer(T_PISO + 0.01, R._hex(_rgb(CREMA)), BOSQUE,
                           op_tapiz=0.09, **dict(ENCUADRES[2][2], **kw)))
        lecturas.append(u'<figure><img class="lect" src="%s">'
                        u'<figcaption>%s</figcaption></figure>'
                        % (nombre, ltitulo))

    partes = []
    for clave, titulo, fondo_rgb, tinta, realce, op in VARIANTES:
        paleta(fondo_rgb, tinta, realce)
        fondo = R._hex(fondo_rgb)

        tiras = []
        for mclave, mtitulo, t in MOMENTOS:
            nombre = "cap-%s-%s.svg" % (clave, mclave)
            io.open(os.path.join(SALIDA, nombre), "w", encoding="utf-8").write(
                encuadre_banda(t, fondo, tinta, op_tapiz=op, **LECTURA))
            tiras.append(u'<figure><img class="banda" src="%s">'
                         u'<figcaption>%s · t=%.2f s</figcaption></figure>'
                         % (nombre, mtitulo, t))

        flyers = []
        for eclave, etitulo, kw in ENCUADRES:
            for mclave, mtitulo, t in MOMENTOS:
                nombre = "flyer-%s-%s-%s.svg" % (clave, eclave, mclave)
                io.open(os.path.join(SALIDA, nombre), "w",
                        encoding="utf-8").write(
                    encuadre_flyer(t, fondo, tinta, op_tapiz=op,
                                   **dict(kw, **LECTURA)))
                flyers.append(u'<figure><img class="flyer" src="%s">'
                              u'<figcaption>%s · %s</figcaption></figure>'
                              % (nombre, etitulo, mtitulo))

        partes.append(
            u'<h2>%s · la banda del sitio (1280x521)</h2><div class="fila">%s</div>'
            u'<h2>%s · encuadre de flyer (1080x1350)</h2><div class="fila">%s</div>'
            % (titulo, u"".join(tiras), titulo, u"".join(flyers)))

    io.open(os.path.join(SALIDA, "captura.html"), "w", encoding="utf-8").write(
        PAGINA % dict(lecturas=u"".join(lecturas), cuerpo=u"".join(partes)))
    print(os.path.join(SALIDA, "captura.html"))


if __name__ == "__main__":
    main()
