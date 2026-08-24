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
import re

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
TINTA = "#16261c"                # el reglon sobre la hoja
PAPEL_SUP = ARENA
PAPEL_IZQ = "#cdc2ab"
PAPEL_DER = "#b6ab94"
HOJAS = _mezcla(FONDO, ARENA, 0.32)   # el canto de las paginas
BANDA = _mezcla(FONDO, ARENA, 0.28)   # el rotulo del lomo
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


def hoja(o, x, y, z, coral=False, dx=3.0, dy=4.0, gruesa=0.05, reglones=12):
    """Una hoja de papel, no una losa: el grosor es un filo y lo que la
    identifica son los reglones."""
    sup = [P(o, x, y, z + gruesa), P(o, x + dx, y, z + gruesa),
           P(o, x + dx, y + dy, z + gruesa), P(o, x, y + dy, z + gruesa)]
    izq = [P(o, x, y + dy, z + gruesa), P(o, x + dx, y + dy, z + gruesa),
           P(o, x + dx, y + dy, z), P(o, x, y + dy, z)]
    der = [P(o, x + dx, y, z + gruesa), P(o, x + dx, y + dy, z + gruesa),
           P(o, x + dx, y + dy, z), P(o, x + dx, y, z)]
    if coral:
        tonos, trazo = (CORAL_IZQ, CORAL_DER, CORAL_SUP), CORAL
    else:
        tonos, trazo = (PAPEL_IZQ, PAPEL_DER, PAPEL_SUP), "#a89d86"
    out = [poli(izq, w=1.1, color=trazo, relleno=tonos[0]),
           poli(der, w=1.1, color=trazo, relleno=tonos[1]),
           poli(sup, w=1.4, color=trazo, relleno=tonos[2])]
    largos = (0.9, 0.96, 0.82, 0.94, 0.74, 0.92, 0.86, 0.98,
              0.7, 0.9, 0.55, 0.88)
    for k in range(reglones):
        t = y + dy * (k + 1.0) / (reglones + 1.6)
        largo = largos[k % len(largos)]
        out.append(linea(P(o, x + 0.34, t, z + gruesa),
                         P(o, x + 0.34 + (dx - 0.68) * largo, t, z + gruesa),
                         w=1.9, color=TINTA, op=0.7))
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
    """Investigacion: un paquete de hojas, y encima la que se firma aca.

    Antes eran losas y el grosor las delataba. Aca el filo es minimo, el
    papel es opaco y los reglones de largo desigual son los que dicen que
    eso es un texto."""
    escala(0.80)
    o = (1090.0, 300.0)
    gruesa = 0.06
    paquete = ((0.00, 0.00), (0.08, -0.05), (-0.06, 0.07), (0.11, 0.02),
               (-0.03, -0.08), (0.05, 0.09), (-0.08, 0.04), (0.03, -0.03))
    formas = []
    for k, (dx, dy) in enumerate(paquete):
        formas += hoja(o, dx, dy, k * gruesa, gruesa=gruesa,
                       reglones=(12 if k == len(paquete) - 1 else 0))
    formas += hoja(o, 1.32, 1.22, len(paquete) * gruesa, coral=True,
                   gruesa=gruesa, reglones=12)
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


def persona(o, a, b, u, coral=False):
    """Una persona de pie: cabeza, hombros y dos piernas.

    Es la unica figura plana del conjunto, y a proposito. Un cuerpo armado
    con prismas isometricos se lee como un bloque, no como alguien. En la
    reticula solo se apoyan los pies: (a) corre a lo ancho de la lamina y
    (b) es la profundidad, o sea que ordena quien tapa a quien."""
    x, y = (a + b) / 2.0, (b - a) / 2.0
    px, py = P(o, x, y, 0.0)
    # el contorno va en arena tambien sobre el coral: en un grupo apretado
    # dos figuras coral vecinas sin contorno se funden en una sola mancha
    trazo = ARENA
    relleno = CORAL_SUP if coral else CARA_SUP

    def redondo(x0, y0, x1, y1, r):
        return ('<rect x="%s" y="%s" width="%s" height="%s" rx="%s" fill="%s"'
                ' stroke="%s" stroke-width="%s"/>'
                % (_n(px + x0 * u), _n(py + y0 * u), _n((x1 - x0) * u),
                   _n((y1 - y0) * u), _n(r * u), relleno, trazo, PRIM))

    return [redondo(-0.52, -1.02, -0.09, 0.0, 0.21),      # pierna de atras
            redondo(0.09, -1.02, 0.52, 0.0, 0.21),        # pierna de adelante
            redondo(-0.64, -2.28, 0.64, -0.90, 0.46),     # torso y hombros
            '<circle cx="%s" cy="%s" r="%s" fill="%s" stroke="%s"'
            ' stroke-width="%s"/>' % (_n(px), _n(py - 2.72 * u), _n(0.46 * u),
                                      relleno, trazo, PRIM)]


def quienes_somos():
    """Quienes somos: el grupo de pie, hombro con hombro."""
    escala(0.9)
    o = (1099.0, 993.0)
    u = 210.0
    # a lo ancho, la profundidad, el tamano de cada quien
    grupo = ((-1.75, 0.00, 1.00, False), (0.00, 0.05, 1.06, True),
             (1.75, -0.03, 0.94, False),
             (-2.62, 1.05, 0.96, True), (-0.87, 1.08, 1.03, False),
             (0.87, 1.04, 0.99, True), (2.62, 1.06, 0.92, False))
    formas = []
    for a, b, f, coral in sorted(grupo, key=lambda g: g[1]):
        formas += persona(o, a, b, u * f, coral=coral)
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


def libro(o, x, y, dx, dy, z, alto, coral=False, w=SEC):
    """Un libro parado, con el lomo hacia el ojo.

    Lo que lo separa de un bloque son dos cosas: el bloque de hojas asoma
    por dentro de la tapa, y el lomo lleva su banda de titulo."""
    sup = [P(o, x, y, z + alto), P(o, x + dx, y, z + alto),
           P(o, x + dx, y + dy, z + alto), P(o, x, y + dy, z + alto)]
    izq = [P(o, x, y + dy, z + alto), P(o, x + dx, y + dy, z + alto),
           P(o, x + dx, y + dy, z), P(o, x, y + dy, z)]
    der = [P(o, x + dx, y, z + alto), P(o, x + dx, y + dy, z + alto),
           P(o, x + dx, y + dy, z), P(o, x + dx, y, z)]
    if coral:
        tapa, ci, cd, trazo = CORAL_SUP, CORAL_IZQ, CORAL_DER, CORAL
    else:
        tapa, ci, cd, trazo = CARA_SUP, CARA_IZQ, CARA_DER, ARENA
    out = [poli(izq, w=w, color=trazo, relleno=ci),
           poli(der, w=w, color=trazo, relleno=cd),
           poli(sup, w=w, color=trazo, relleno=tapa)]

    # el canto de las hojas: metido bajo la tapa y lejos del lomo
    m = min(0.055, dy * 0.22)
    hojas = [P(o, x + 0.05, y + m, z + alto),
             P(o, x + dx - 0.13, y + m, z + alto),
             P(o, x + dx - 0.13, y + dy - m, z + alto),
             P(o, x + 0.05, y + dy - m, z + alto)]
    out.append(poli(hojas, w=GUIA, color=trazo, op=0.5, relleno=HOJAS))

    # la banda del titulo y los dos filetes de abajo, sobre el lomo
    b = min(0.075, dy * 0.28)
    banda = [P(o, x + dx, y + b, z + alto * 0.80),
             P(o, x + dx, y + dy - b, z + alto * 0.80),
             P(o, x + dx, y + dy - b, z + alto * 0.60),
             P(o, x + dx, y + b, z + alto * 0.60)]
    out.append(poli(banda, w=GUIA, color=trazo, op=0.55, relleno=BANDA))
    for t in (0.36, 0.29):
        h = z + alto * t
        out.append(linea(P(o, x + dx, y + b * 1.6, h),
                         P(o, x + dx, y + dy - b * 1.6, h),
                         w=GUIA, color=trazo, op=0.5))
    return out


def recursos():
    """Recursos: la fila entera parada en su estante, y una sacada a medias.

    Esta se dibuja mas grande que las otras y aun asi pesa lo mismo. El
    estante es una banda delgada en diagonal: su caja es casi toda aire, y
    lo que el ojo mide no es la caja sino el libro. Con la caja del equipo
    los libros salian del tamano de un dedo."""
    escala(1.16)
    o = (1373.0, 342.0)
    formas = volumen(o, 0.0, 0.0, 1.3, 5.0, 0, 0.12)
    # grosor, alto, y cual es el que sale
    fila = ((0.50, 1.10, 0.0), (0.32, 0.86, 0.0), (0.44, 1.34, 0.0),
            (0.28, 0.78, 0.0), (0.56, 1.24, 0.30), (0.38, 0.94, 0.0),
            (0.30, 1.42, 0.0), (0.48, 0.88, 0.0), (0.34, 1.06, 0.0),
            (0.42, 0.74, 0.0))
    y = 0.28
    for k, (grosor, alto, fuera) in enumerate(fila):
        formas += libro(o, 0.16 + fuera, y, 0.98, grosor, 0.12, alto,
                        coral=(fuera > 0))
        y += grosor + 0.045
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
    """Hackathon: la caja cerrada, llena hasta poco mas de la mitad. Cuatro
    esquinas, cuatro muros y el contenido en coral, que es la unica pieza
    solida de la lamina."""
    escala(0.78)
    o = (1160.0, 540.0)
    muro = 1.02

    # la base, que sobresale un poco por los cuatro lados
    formas = volumen(o, -0.3, -0.3, 4.6, 4.6, 0.0, 0.12, w=SEC)

    # el fondo se levanta primero: esquina, los dos muros de atras y las dos
    # esquinas de los lados
    for x, y, dx, dy in [(0.0, 0.0, 0.7, 0.7), (0.7, 0.0, 2.6, 0.7),
                         (0.0, 0.7, 0.7, 2.6), (3.3, 0.0, 0.7, 0.7),
                         (0.0, 3.3, 0.7, 0.7)]:
        formas += volumen(o, x, y, dx, dy, 0.12, muro, w=SEC)

    # el contenido, por debajo del borde
    formas += volumen(o, 0.7, 0.7, 2.6, 2.6, 0.12, 0.62, coral=True)

    # y encima los dos muros del frente, que son los que lo tapan
    for x, y, dx, dy in [(0.7, 3.3, 2.6, 0.7), (3.3, 0.7, 0.7, 2.6),
                         (3.3, 3.3, 0.7, 0.7)]:
        formas += volumen(o, x, y, dx, dy, 0.12, muro, w=SEC)
    return formas


# ------------------------------------------- todas del tamano de la del equipo

def _caja(formas):
    """La caja del dibujo, leida de las coordenadas ya escritas."""
    xs, ys = [], []
    for f in formas:
        for m in re.finditer(r'points="([^"]+)"', f):
            for par in m.group(1).split():
                a, b = par.split(",")
                xs.append(float(a)); ys.append(float(b))
        for m in re.finditer(r'x1="([-\d.]+)" y1="([-\d.]+)" x2="([-\d.]+)"'
                             r' y2="([-\d.]+)"', f):
            xs += [float(m.group(1)), float(m.group(3))]
            ys += [float(m.group(2)), float(m.group(4))]
        for m in re.finditer(r'<rect x="([-\d.]+)" y="([-\d.]+)" width="([-\d.]+)"'
                             r' height="([-\d.]+)"', f):
            x, y, w, h = (float(g) for g in m.groups())
            xs += [x, x + w]; ys += [y, y + h]
        for m in re.finditer(r'<circle cx="([-\d.]+)" cy="([-\d.]+)" r="([-\d.]+)"', f):
            cx, cy, r = (float(g) for g in m.groups())
            xs += [cx - r, cx + r]; ys += [cy - r, cy + r]
    return min(xs), min(ys), max(xs), max(ys)


def _ajustar(formas, k, cx, cy):
    """Agranda o achica la geometria alrededor de (cx, cy).

    El grosor del trazo no entra en la cuenta: si entrara, la lamina que
    crece saldria con lineas mas gordas que las demas y la jerarquia de
    3.4 / 1.9 / 1.7 dejaria de valer para todo el conjunto."""
    def ex(v):
        return _n(cx + (float(v) - cx) * k)

    def ey(v):
        return _n(cy + (float(v) - cy) * k)

    def el(v):
        return _n(float(v) * k)

    def _p(m):
        return 'points="%s"' % " ".join(
            "%s,%s" % (ex(par.split(",")[0]), ey(par.split(",")[1]))
            for par in m.group(1).split())

    def _li(m):
        return 'x1="%s" y1="%s" x2="%s" y2="%s"' % (
            ex(m.group(1)), ey(m.group(2)), ex(m.group(3)), ey(m.group(4)))

    def _re(m):
        return '<rect x="%s" y="%s" width="%s" height="%s" rx="%s"' % (
            ex(m.group(1)), ey(m.group(2)), el(m.group(3)), el(m.group(4)),
            el(m.group(5)))

    def _ci(m):
        return '<circle cx="%s" cy="%s" r="%s"' % (
            ex(m.group(1)), ey(m.group(2)), el(m.group(3)))

    out = []
    for f in formas:
        f = re.sub(r'points="([^"]+)"', _p, f)
        f = re.sub(r'x1="([-\d.]+)" y1="([-\d.]+)" x2="([-\d.]+)" y2="([-\d.]+)"',
                   _li, f)
        f = re.sub(r'<rect x="([-\d.]+)" y="([-\d.]+)" width="([-\d.]+)"'
                   r' height="([-\d.]+)" rx="([-\d.]+)"', _re, f)
        f = re.sub(r'<circle cx="([-\d.]+)" cy="([-\d.]+)" r="([-\d.]+)"', _ci, f)
        out.append(f)
    return out


def _mover(formas, dx, dy):
    """Corre el dibujo entero sin cambiarle el tamano."""
    def ex(v):
        return _n(float(v) + dx)

    def ey(v):
        return _n(float(v) + dy)

    out = []
    for f in formas:
        f = re.sub(r'points="([^"]+)"', lambda m: 'points="%s"' % " ".join(
            "%s,%s" % (ex(par.split(",")[0]), ey(par.split(",")[1]))
            for par in m.group(1).split()), f)
        f = re.sub(r'x1="([-\d.]+)" y1="([-\d.]+)" x2="([-\d.]+)" y2="([-\d.]+)"',
                    lambda m: 'x1="%s" y1="%s" x2="%s" y2="%s"' % (
                        ex(m.group(1)), ey(m.group(2)),
                        ex(m.group(3)), ey(m.group(4))), f)
        f = re.sub(r'<rect x="([-\d.]+)" y="([-\d.]+)"',
                    lambda m: '<rect x="%s" y="%s"' % (ex(m.group(1)),
                                                       ey(m.group(2))), f)
        f = re.sub(r'<circle cx="([-\d.]+)" cy="([-\d.]+)"',
                    lambda m: '<circle cx="%s" cy="%s"' % (ex(m.group(1)),
                                                           ey(m.group(2))), f)
        out.append(f)
    return out


# La lamina del equipo da la medida y las demas se igualan a ella. La medida
# es la media geometrica de la caja, no el alto ni el ancho: las siete figuras
# de pie son altas y la fila de recortes de Actualidad es ancha, y por area
# ocupan lo mismo en el ojo. La de "Que es AI safety" queda por fuera del
# ajuste: su embudo se sale del borde a proposito, y Recursos porque su
# estante es una banda diagonal cuya caja no dice nada del tamano del libro.
# Las dos traen su medida escrita en su propia funcion.
REFERENCIA = "quienes-somos"
SIN_AJUSTE = ("seguridad", "recursos")


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
    # se dibujan todas antes de escribir ninguna, porque la del equipo es la
    # que fija el tamano de las demas
    hechas = [(nombre, hacer()) for nombre, hacer in SECCIONES]
    cajas = dict((nombre, _caja(formas)) for nombre, formas in hechas)
    x0, y0, x1, y1 = cajas[REFERENCIA]
    medida = ((x1 - x0) * (y1 - y0)) ** 0.5
    for nombre, formas in hechas:
        if nombre != REFERENCIA and nombre not in SIN_AJUSTE:
            a0, b0, a1, b1 = cajas[nombre]
            k = medida / (((a1 - a0) * (b1 - b0)) ** 0.5)
            formas = _ajustar(formas, k, (a0 + a1) / 2.0, (b0 + b1) / 2.0)
            # el dibujo crece desde su centro, asi que la que se agranda se
            # saldria mas por el borde de lo que se salia. Se devuelve hasta
            # donde llegaba antes: el sangrado sigue siendo el que se dibujo.
            c0, d0, c1, d1 = _caja(formas)
            dx, dy = min(0.0, a1 - c1), min(0.0, b1 - d1)
            if dx or dy:
                formas = _mover(formas, dx, dy)
        capa = '<g fill="none" stroke-linecap="round" stroke-linejoin="round">\n'
        capa += "\n".join(formas) + "\n</g>\n"
        ruta = os.path.join(RAIZ, "aisc-hero-%s.svg" % nombre)
        io.open(ruta, "w", encoding="utf-8", newline="\n").write(
            cabeza + capa + "</svg>\n")
        print(nombre, os.path.getsize(ruta))


if __name__ == "__main__":
    main()
