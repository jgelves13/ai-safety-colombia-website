# -*- coding: utf-8 -*-
"""Variante guardada: la caja del hero del sprint, rota como se rompe una
botella, con el contenido derramado. Estuvo en linea entre el 22 y el 23 de
agosto de 2026 y se retiro a peticion de Jose, que la quiere rota de otra forma.

No se ejecuta sola: usa los ayudantes de scripts/heroes.py (escala, volumen,
_losa, P, SEC y los tonos CORAL_*). Para volver a verla, pega esta funcion
sobre la de heroes.py y corre `py -X utf8 scripts/heroes.py`. El SVG que
produjo esta al lado, en aisc-hero-hackathon-liquido.svg.
"""

def hackathon():
    """Hackathon: la caja se rompio como se rompe una botella. Lo de adentro
    corrio hacia la esquina rota, se derramo por encima del muro mas bajo y
    quedo regado en el piso."""
    escala(0.78)
    o = (1160.0, 540.0)
    muro = 1.02
    liq = dict(sup=CORAL_SUP, izq=CORAL_IZQ, der=CORAL_DER, trazo=CORAL,
               w=SEC)

    # por donde se parte la base; la esquina se solto en dos pedazos
    grieta = [(4.3, 2.95), (4.02, 3.28), (3.86, 3.86), (3.28, 4.02),
              (2.95, 4.3)]
    plancha = [(-0.3, -0.3), (4.3, -0.3)] + grieta + [(-0.3, 4.3)]
    # lo que quedo de la esquina de la base, ya en pedazos sueltos
    pedazos = [
        [(4.52, 3.32), (4.9, 3.44), (4.78, 3.84), (4.46, 3.7)],
        [(3.32, 4.52), (3.7, 4.46), (3.84, 4.78), (3.44, 4.9)],
        [(3.9, 4.96), (4.24, 4.86), (4.36, 5.16), (4.02, 5.24)],
    ]

    formas = _losa(o, plancha, 0.0, 0.12, w=SEC)

    # las tres esquinas y los dos muros del fondo siguen en pie
    for x, y, dx, dy in [(0.0, 0.0, 0.7, 0.7), (0.7, 0.0, 2.6, 0.7),
                         (0.0, 0.7, 0.7, 2.6), (3.3, 0.0, 0.7, 0.7),
                         (0.0, 3.3, 0.7, 0.7)]:
        formas += volumen(o, x, y, dx, dy, 0.12, muro, w=SEC)

    # adentro ya casi no queda: un resto corrido contra la esquina rota, y el
    # fondo del rincon seco
    pozo = [(2.0, 2.3), (2.62, 2.08), (3.12, 2.32), (3.3, 2.86),
            (2.86, 3.3), (2.32, 3.12), (2.08, 2.62), (2.3, 2.0)]
    formas += _losa(o, pozo, 0.12, 0.15, **liq)

    # los dos muros del frente quedan como munones, cada vez mas bajos hacia
    # la esquina rota
    t = 0.7
    for largo, alto in [(1.0, muro), (0.6, 0.74), (0.55, 0.42), (0.45, 0.18)]:
        formas += volumen(o, 3.3, t, 0.7, largo, 0.12, alto, w=SEC)
        formas += volumen(o, t, 3.3, largo, 0.7, 0.12, alto, w=SEC)
        t += largo

    # se sale por la boca de la esquina, pasando por encima del muro roto
    labio = [(3.04, 2.72), (3.62, 2.98), (4.0, 3.3), (3.86, 3.86),
             (3.3, 4.0), (2.98, 3.62), (2.72, 3.04)]
    formas += _losa(o, labio, 0.16, 0.11, **liq)

    # y ahi cae: la lamina que baja del borde partido hasta el piso
    cascada = [(4.0, 3.3), (3.86, 3.86), (3.3, 4.0), (3.42, 4.16),
               (3.96, 3.96), (4.16, 3.42)]
    formas += _losa(o, cascada, 0.06, 0.21, **liq)

    # el charco de abajo, ya sin forma, alrededor de la esquina rota
    charco = grieta + [(2.98, 4.72), (3.18, 5.16), (3.7, 5.46), (4.24, 5.3),
                       (4.62, 5.5), (5.06, 5.22), (5.12, 4.7), (4.86, 4.3),
                       (5.02, 3.9), (4.74, 3.54), (4.62, 3.04)]
    formas += _losa(o, charco, 0.0, 0.06, **liq)

    # los pedazos de base que se soltaron, tirados dentro del charco
    for pts in pedazos:
        formas += _losa(o, pts, 0.06, 0.05, w=SEC)

    # las gotas que saltaron mas lejos
    for gota in ([(5.34, 3.46), (5.54, 3.56), (5.46, 3.8), (5.28, 3.7)],
                 [(3.46, 5.38), (3.68, 5.48), (3.6, 5.7), (3.4, 5.6)],
                 [(4.54, 5.46), (4.74, 5.56), (4.66, 5.76), (4.48, 5.66)]):
        formas += _losa(o, gota, 0.0, 0.05, **liq)

    # y las esquirlas que salieron disparadas
    for x, y, dx, dy, h in [(5.34, 2.96, 0.4, 0.34, 0.16),
                            (2.96, 5.34, 0.34, 0.4, 0.14),
                            (5.36, 4.96, 0.28, 0.28, 0.11)]:
        formas += volumen(o, x, y, dx, dy, 0.0, h, w=SEC)
    return formas
