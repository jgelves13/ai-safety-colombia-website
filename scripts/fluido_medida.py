# -*- coding: utf-8 -*-
u"""Mide el avance del frente para ajustar el ritmo de la inundacion.

Imprime, cuadro a cuadro, hasta donde llego el contorno medido en pixeles de
la banda desde el punto de caida, y que fraccion de la banda va cubierta. Si
el liquido se esparce a una misma velocidad, el alcance sube en linea recta.

    py -X utf8 scripts/fluido_medida.py
"""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

import numpy as np
import fluido as F

# Para tantear cuanto tarda el frente en llegar a la esquina se alarga la
# corrida sin tocar el modulo: py -X utf8 scripts/fluido_medida.py 11.6
if len(sys.argv) > 1:
    F.T_FIN = float(sys.argv[1])

CAIDA = F.PB(F.BOCA_X, F.MURO_Y, 0.0)
ESQ = max(np.hypot(CAIDA[0] - x, CAIDA[1] - y)
          for x in (0.0, F.BW) for y in (0.0, F.BH))

filas = []


def al_frame(k, t, corte, h):
    c = F.campo(corte, h)
    dentro = c >= F.NIVEL
    if not dentro.any():
        filas.append((t, 0.0, 0.0))
        return
    ii, jj = np.nonzero(dentro)
    bx = (ii + 0.5) * F.SF
    by = (jj + 0.5) * F.SF
    r = float(np.hypot(bx - CAIDA[0], by - CAIDA[1]).max())
    filas.append((t, r, dentro.sum() / float(F.FW * F.FH)))


F.corre(al_frame)
print(u"caida en %.0f,%.0f   esquina mas lejana a %.0f px" % (CAIDA[0], CAIDA[1], ESQ))
print(u"   t    alcance   px/s   cubierto")
ant = None
for t, r, frac in filas[::6]:
    v = u"    -" if ant is None else u"%5.0f" % ((r - ant[1]) / (t - ant[0]))
    print(u"%5.2f  %7.0f  %s   %5.1f%%" % (t, r, v, 100.0 * frac))
    ant = (t, r)
