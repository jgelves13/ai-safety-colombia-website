# -*- coding: utf-8 -*-
"""Una ilustracion por encabezado de seccion.

La reticula del sitio es triangular equilatera: celda de 118 x 102.8, aristas a
0 y +-60 grados. Esa reticula admite dibujo isometrico exacto, porque sus ejes
isometricos tambien unen vertices del patron: X = (177, 102.8), Y = (-177,
102.8), Z = (0, -205.6). Lo que se dibuja aca cae sobre la reticula, no encima.

Cuatro decisiones sostienen el conjunto:
  - el trazo es del color de la reticula; el coral aparece una sola vez por
    lamina, como pieza solida, y por eso pesa;
  - las caras son opacas y se tapan entre si, que es lo que separa un volumen
    de una radiografia;
  - hay jerarquia de grosor: contorno 3.2, estructura 1.6, guia 0.9;
  - las composiciones se salen del borde en vez de flotar centradas.
"""
import io
import os

RAIZ = r"C:\Users\joseg\aisc-new-website\public\aisc\patterns"
BASE = os.path.join(RAIZ, "aisc-corner-lattice.svg")

ARENA = "#f3ead8"
CORAL = "#e5604d"
FONDO = (20, 54, 32)          # aisc-forest-deep, el fondo del hero

PRIM, SEC, GUIA = 3.4, 1.9, 1.7


def _mezcla(rgb, hexa, p):
    r = int(rgb[0] + (int(hexa[1:3], 16) - rgb[0]) * p)
    g = int(rgb[1] + (int(hexa[3:5], 16) - rgb[1]) * p)
    b = int(rgb[2] + (int(hexa[5:7], 16) - rgb[2]) * p)
    return "#%02x%02x%02x" % (r, g, b)


# las tres orientaciones de cara, ya resueltas contra el fondo del hero
CARA_SUP = _mezcla(FONDO, ARENA, 0.14)
CARA_IZQ = _mezcla(FONDO, ARENA, 0.075)
CARA_DER = _mezcla(FONDO, ARENA, 0.035)
CORAL_SUP = CORAL
CORAL_IZQ = _mezcla(FONDO, CORAL, 0.72)
CORAL_DER = _mezcla(FONDO, CORAL, 0.52)

_E = [177.0, 102.8, 205.6]


def escala(k):
    _E[0], _E[1], _E[2] = 177.0 * k, 102.8 * k, 205.6 * k


def P(o, x, y, z=0.0):
    return (o[0] + _E[0] * (x - y), o[1] + _E[1] * (x + y) - _E[2] * z)


def _n(v):
    return round(v, 1)


def _pts(pts):
    return " ".join("%s,%s" % (_n(x), _n(y)) for x, y in pts)


def poli(pts, w=SEC, color=ARENA, op=1.0, relleno=None, cerrado=True):
    tag = "polygon" if cerrado else "polyline"
    f = 'fill="%s"' % relleno if relleno else 'fill="none"'
    return ('<%s points="%s" %s stroke="%s" stroke-width="%s"'
            ' stroke-opacity="%s"/>' % (tag, _pts(pts), f, color, w, op))


def linea(a, b, w=SEC, color=ARENA, op=1.0):
    return ('<line x1="%s" y1="%s" x2="%s" y2="%s" stroke="%s" stroke-width="%s"'
            ' stroke-opacity="%s"/>' % (_n(a[0]), _n(a[1]), _n(b[0]), _n(b[1]),
                                        color, w, op))


def volumen(o, x, y, dx, dy, z, h, coral=False, reglones=0, w=PRIM, hueco=False):
    """La pieza con la que se arma casi todo: un prisma apoyado en z."""
    sup = [P(o, x, y, z + h), P(o, x + dx, y, z + h),
           P(o, x + dx, y + dy, z + h), P(o, x, y + dy, z + h)]
    if hueco:
        return [poli(sup, w=SEC, op=0.8)]
    izq = [P(o, x, y + dy, z + h), P(o, x + dx, y + dy, z + h),
           P(o, x + dx, y + dy, z), P(o, x, y + dy, z)]
    der = [P(o, x + dx, y, z + h), P(o, x + dx, y + dy, z + h),
           P(o, x + dx, y + dy, z), P(o, x + dx, y, z)]
    tonos = (CORAL_IZQ, CORAL_DER, CORAL_SUP) if coral else (CARA_IZQ, CARA_DER, CARA_SUP)
    trazo = CORAL if coral else ARENA
    out = [poli(izq, w=SEC, color=trazo, relleno=tonos[0], op=0.75),
           poli(der, w=SEC, color=trazo, relleno=tonos[1], op=0.55),
           poli(sup, w=w, color=trazo, relleno=tonos[2])]
    for k in range(reglones):
        t = y + dy * (k + 1.0) / (reglones + 1.0)
        out.append(linea(P(o, x + 0.18, t, z + h), P(o, x + dx - 0.18, t, z + h),
                         w=GUIA, op=0.5))
    return out


def triangulo(cx, base_y, ancho, w=PRIM, color=ARENA, op=1.0, lleno=None):
    """Triangulo hacia arriba con las proporciones exactas de la reticula."""
    alto = ancho * 102.8 / 118.0
    pts = [(cx - ancho / 2, base_y), (cx + ancho / 2, base_y), (cx, base_y - alto)]
    if lleno:
        return ('<polygon points="%s" fill="%s" stroke="none"/>'
                % (_pts(pts), lleno))
    return poli(pts, w=w, color=color, op=op)


def _medio(p, q):
    return ((p[0] + q[0]) / 2.0, (p[1] + q[1]) / 2.0)


# --------------------------------------------------------------- los motivos

def portada():
    """La marca: el triangulo que se subdivide hasta confundirse con el patron."""
    cx, base_y, ancho = 1150.0, 1330.0, 1400.0
    alto = ancho * 102.8 / 118.0
    a = (cx - ancho / 2, base_y)
    b = (cx + ancho / 2, base_y)
    c = (cx, base_y - alto)
    formas = [poli([a, b, c], w=PRIM)]
    coral = []

    def parte(t, nivel):
        p, q, r = t
        m = [_medio(p, q), _medio(q, r), _medio(r, p)]
        yield poli(m, w=(SEC if nivel == 1 else GUIA),
                   op=(1.0 if nivel == 1 else 0.7))
        if nivel < 2:
            hijos = ((p, m[0], m[2]), (m[0], q, m[1]), (m[2], m[1], r))
            for k, sub in enumerate(hijos):
                if nivel == 1 and k == 1:      # el vertice de la derecha
                    coral.append([_medio(sub[0], sub[1]), _medio(sub[1], sub[2]),
                                  _medio(sub[2], sub[0])])
                for f in parte(sub, nivel + 1):
                    yield f

    formas += list(parte((a, b, c), 1))
    formas.append('<polygon points="%s" fill="%s" stroke="none"/>'
                  % (_pts(coral[0]), CORAL))
    return formas


def seguridad():
    """Que es AI safety: todo converge en un centro, y el centro es lo esperado."""
    cx, cy = 1210.0, 810.0

    def embudo(ancho, w, op, lleno=None):
        alto = ancho * 102.8 / 118.0
        arriba = cy - alto / 3.0
        pts = [(cx - ancho / 2, arriba), (cx + ancho / 2, arriba),
               (cx, arriba + alto)]
        if lleno:
            return '<polygon points="%s" fill="%s" stroke="none"/>' % (_pts(pts), lleno)
        return poli(pts, w=w, op=op)

    formas = [embudo(1780, 1.7, 0.45), embudo(1300, 2.1, 0.65),
              embudo(850, 2.7, 0.85), embudo(465, PRIM, 1.0),
              embudo(200, 0, 1.0, lleno=CORAL)]
    return formas


def investigacion():
    """Investigacion: lo publicado se acumula, y encima va lo que se firma aca."""
    escala(0.95)
    o = (1450.0, 300.0)
    formas = []
    capas = ((0.00, 0.00), (0.08, -0.05), (-0.06, 0.07), (0.10, 0.02))
    for k, (dx, dy) in enumerate(capas):
        formas += volumen(o, dx, dy, 3, 4, k * 0.30, 0.12,
                          reglones=(3 if k == len(capas) - 1 else 0))
    formas += volumen(o, 0.16, 0.22, 2.72, 3.6, 1.42, 0.14, coral=True)
    return formas


def unete():
    """Unete: el sitio esta armado, falta una pieza, y la pieza esta bajando."""
    escala(1.05)
    o = (1230.0, 330.0)
    formas = []
    for s in range(5):
        for x in range(3):
            y = s - x
            if not 0 <= y < 3:
                continue
            formas += volumen(o, x, y, 1, 1, 0, 0.16, w=SEC,
                              hueco=(x, y) == (2, 2))
    for dx, dy in ((0, 0), (1, 0), (1, 1), (0, 1)):
        formas.append(linea(P(o, 2 + dx, 2 + dy, 0.1),
                            P(o, 2 + dx, 2 + dy, 0.78), w=2.2, op=0.65))
    formas += volumen(o, 2, 2, 1, 1, 0.86, 0.16, coral=True)
    return formas


def quienes_somos():
    """Quienes somos: piezas distintas apoyadas en el mismo suelo."""
    escala(0.95)
    o = (1230.0, 380.0)
    piezas = {(0, 0): 0.72, (1, 0): 1.18, (0, 1): 0.48, (2, 0): 0.88,
              (1, 1): 1.62, (2, 1): 0.64, (1, 2): 0.95}
    formas = []
    for s in range(6):
        for x in range(3):
            y = s - x
            if (x, y) in piezas:
                formas += volumen(o, x, y, 1, 1, 0, piezas[(x, y)],
                                  coral=(x, y) == (1, 1))
    return formas


def eventos():
    """Eventos: una via con sus hitos, y el proximo levantado."""
    escala(0.9)
    o = (1660.0, 300.0)
    formas = volumen(o, 0, 0, 1, 6, 0, 0.12)
    for k, y in enumerate((0.45, 1.95, 3.45, 4.95)):
        formas += volumen(o, 0.28, y, 0.44, 0.44, 0.12,
                          1.25 if k == 2 else 0.5, coral=(k == 2))
    return formas


def programas():
    """Programas: lo mismo a tres escalas, de una charla a un hackathon."""
    escala(0.58)
    o = (1420.0, 300.0)
    formas = []
    formas += volumen(o, 0.0, 0.0, 1.0, 1.0, 0, 0.55)
    formas += volumen(o, 0.0, 2.2, 1.7, 1.7, 0, 1.0)
    formas += volumen(o, 0.0, 4.9, 2.6, 2.6, 0, 1.55, coral=True)
    return formas


def actualidad():
    """Actualidad: lo ultimo adelante, lo anterior atras."""
    escala(0.82)
    o = (1200.0, 340.0)
    formas = []
    for k in range(2):
        formas += volumen(o, 0.55 * (2 - k), 1.7 * k, 2.3, 2.3, 0, 0.13,
                          reglones=2)
    formas += volumen(o, 0.0, 3.4, 2.3, 2.3, 0, 0.15, coral=True)
    return formas


def recursos():
    """Recursos: los volumenes parados en su estante, listos para sacar uno."""
    escala(0.95)
    o = (1290.0, 400.0)
    formas = volumen(o, 0.0, 0.0, 1.3, 5.0, 0, 0.12)
    alturas = (1.05, 0.78, 1.38, 0.92, 1.18, 0.68)
    for k, alto in enumerate(alturas):
        formas += volumen(o, 0.16, 0.2 + 0.77 * k, 0.98, 0.55, 0.12, alto,
                          coral=(k == 2), w=SEC)
    return formas


def _losa(o, pts, z, h, sup=CARA_SUP, izq=CARA_IZQ, der=CARA_DER,
          trazo=ARENA, w=PRIM):
    """Extruye un poligono cualquiera de la reticula, no solo un rectangulo:
    dibuja las caras que dan hacia el frente y encima la tapa."""
    area = 0.0
    for i in range(len(pts)):
        x1, y1 = pts[i]
        x2, y2 = pts[(i + 1) % len(pts)]
        area += x1 * y2 - x2 * y1
    giro = 1.0 if area > 0 else -1.0
    caras = []
    for i in range(len(pts)):
        a, b = pts[i], pts[(i + 1) % len(pts)]
        nx, ny = (b[1] - a[1]) * giro, (a[0] - b[0]) * giro
        if nx + ny <= 0.01:                    # cara de espaldas al ojo
            continue
        cara = [P(o, a[0], a[1], z + h), P(o, b[0], b[1], z + h),
                P(o, b[0], b[1], z), P(o, a[0], a[1], z)]
        tono, opac = (izq, 0.75) if ny > nx else (der, 0.55)
        caras.append(((a[0] + b[0] + a[1] + b[1]) / 2.0,
                      poli(cara, w=SEC, color=trazo, relleno=tono, op=opac)))
    caras.sort(key=lambda c: c[0])
    tapa = poli([P(o, x, y, z + h) for x, y in pts], w=w, color=trazo,
                relleno=sup)
    return [f for _, f in caras] + [tapa]


def hackathon():
    """Hackathon: la caja que no aguanto. El muro se rompio por la esquina que
    da al frente, la esquina de la base se solto y lo que estaba contenido
    se sale por ahi."""
    escala(0.78)
    o = (1160.0, 540.0)
    muro = 1.02

    # por donde se parte la base: una grieta quebrada de borde a borde
    grieta = [(4.3, 2.95), (4.02, 3.28), (3.86, 3.86), (3.28, 4.02),
              (2.95, 4.3)]
    plancha = [(-0.3, -0.3), (4.3, -0.3)] + grieta + [(-0.3, 4.3)]
    # la esquina no se solto entera: se partio en dos y cada mitad corrio
    # para su lado
    pedazos = [
        ([(4.3, 2.95), (4.02, 3.28), (3.86, 3.86), (4.3, 4.3)], 0.54, 0.24),
        ([(3.86, 3.86), (3.28, 4.02), (2.95, 4.3), (4.3, 4.3)], 0.24, 0.54),
    ]

    formas = _losa(o, plancha, 0.0, 0.12, w=SEC)

    # las tres esquinas y los dos muros del fondo siguen en pie
    for x, y, dx, dy in [(0.0, 0.0, 0.7, 0.7), (0.7, 0.0, 2.6, 0.7),
                         (0.0, 0.7, 0.7, 2.6), (3.3, 0.0, 0.7, 0.7),
                         (0.0, 3.3, 0.7, 0.7)]:
        formas += volumen(o, x, y, dx, dy, 0.12, muro, w=SEC)

    # lo contenido: sube hasta el borde y se derrama por el boquete
    formas += volumen(o, 0.7, 0.7, 2.6, 2.6, 0.12, 0.58, coral=True)
    formas += volumen(o, 2.72, 2.72, 0.72, 0.72, 0.12, 0.30, coral=True, w=SEC)

    # los dos muros del frente quedan como munones, cada vez mas bajos hacia
    # la esquina rota
    t = 0.7
    for largo, alto in [(1.0, muro), (0.6, 0.74), (0.55, 0.42), (0.45, 0.18)]:
        formas += volumen(o, 3.3, t, 0.7, largo, 0.12, alto, w=SEC)
        formas += volumen(o, t, 3.3, largo, 0.7, 0.12, alto, w=SEC)
        t += largo

    # por el boquete se sale, ya al ras del piso
    formas += volumen(o, 3.3, 3.3, 0.48, 0.48, 0.12, 0.14, coral=True, w=SEC)

    # la grieta que queda a la vista donde estaba la esquina del muro
    for hilo in ([(3.84, 3.32), (3.93, 3.5), (3.84, 3.68)],
                 [(3.32, 3.84), (3.5, 3.93), (3.68, 3.84)]):
        formas.append(poli([P(o, x, y, 0.12) for x, y in hilo], w=GUIA,
                           op=0.55, cerrado=False))

    # los pedazos de base que se soltaron, ya fuera de sitio
    for pts, sx, sy in pedazos:
        formas += _losa(o, [(x + sx, y + sy) for x, y in pts], 0.0, 0.11,
                        w=SEC)
    formas += volumen(o, 3.16, 4.44, 0.62, 0.46, 0.0, 0.1, coral=True, w=SEC)

    # y las esquirlas que salieron disparadas
    for x, y, dx, dy, h in [(4.55, 3.05, 0.4, 0.34, 0.16),
                            (3.05, 4.6, 0.34, 0.4, 0.14),
                            (4.95, 4.3, 0.28, 0.28, 0.11)]:
        formas += volumen(o, x, y, dx, dy, 0.0, h, w=SEC)
    return formas


SECCIONES = [
    ("portada", portada),
    ("seguridad", seguridad),
    ("investigacion", investigacion),
    ("unete", unete),
    ("quienes-somos", quienes_somos),
    ("eventos", eventos),
    ("programas", programas),
    ("actualidad", actualidad),
    ("recursos", recursos),
    ("hackathon", hackathon),
]


def main():
    base = io.open(BASE, encoding="utf-8").read()
    cabeza = base[: base.rindex("</svg>")]
    for nombre, hacer in SECCIONES:
        capa = '<g fill="none" stroke-linecap="round" stroke-linejoin="round">\n'
        capa += "\n".join(hacer()) + "\n</g>\n"
        ruta = os.path.join(RAIZ, "aisc-hero-%s.svg" % nombre)
        io.open(ruta, "w", encoding="utf-8", newline="\n").write(
            cabeza + capa + "</svg>\n")
        print(nombre, os.path.getsize(ruta))


main()
