# -*- coding: utf-8 -*-
u"""El agente que sale de la caja rota y cruza el encabezado.

Reemplaza al liquido. Un liquido cae: no elige. Lo que se documento en los
incidentes de julio de 2026 no fue una fuga, fue una busqueda. El modelo de
OpenAI salio del entorno de evaluacion por un 0-day en el proxy de cache del
registro de paquetes y llego a produccion de Hugging Face; el de Anthropic
salio del entorno de Irregular y llego a produccion de tres organizaciones.
En los dos casos la caja no era la frontera que se creia, y el agente siguio
andando como si nada.

Por eso el gesto central no es el boquete: es la duda. El cubo sale, prueba
una direccion, se queda sin piso, retrocede y toma la otra.

El rastro no se acumula. Cada tramo se borra un par de segundos despues de
darlo, con la celda que lo sostiene, y detras del agente la banda vuelve a
quedar limpia. Lo que se ve en cualquier instante es la cola de lo recien
andado, no el mapa entero: el recorrido se lee por donde va, no por donde
estuvo.

La caja es la lamina 2 de rotura.py, la que Jose escogio: reborde intacto,
labios doblados y esquirlas. No se toca un solo cuadro de la rotura.

    py -X utf8 scripts/agente.py          laminas + index.html
    py -X utf8 scripts/agente.py --png    ademas la hoja de instantes
    py -X utf8 scripts/agente.py --tsx    escribe components/hero-hackathon.tsx
    py -X utf8 scripts/agente.py --ronda  el gif de una vuelta de la ronda
"""
import io
import math
import os
import re
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

import heroes as H
import rotura as R
from heroes import ARENA, CORAL, SEC, P, poli

SALIDA = (r"C:\Users\joseg\AppData\Local\Temp\claude\C--Users-joseg"
          r"\8dd7b0bd-d085-4ba7-a9bd-11a5d6dc0e5b\scratchpad\agente")

# La banda del hero, y la ventana de la reticula dentro de ella. Igual que en
# fluido.py: el dibujo vive en 1697x1415 y se mete en 1280x521 por la esquina.
BW, BH = 1280.0, 521.0
K = BH / 1415.0
OX = BW - 1697.0 * K

O = R.O                      # (1160, 540), el origen isometrico de la caja
PASO = 0.95                  # el lado de la celda que pisa el agente
LADO = 0.60                  # el cubo; el boquete mide 1,70 x 0,78

# El reloj de la pagina. La rotura ya estaba afinada contra el derrame y no se
# mueve: golpe en 1,330, roto en 1,368, esquirlas en 1,444.
T_GOLPE = 1.330
T_ROTO = 1.368
T_ESQUIRLA = 1.444
ESCALA_T = 3.8               # lo que rotura.py multiplica para llegar ahi

T_NACE = 1.62
D_NACE = 0.24
D_SALE = 0.34
D_CAE = 0.30
D_TANTEO = 0.26
D_ASOMA = 0.20              # estira el paso al vacio
D_RECOGE = 0.24             # y lo recoge
D_DUDA = 0.30               # y se queda mirando
D_VUELTA = 0.17
T_ENTRA = 0.23               # respiro entre volver y decidirse
P_RAPIDO, P_LENTO = 0.062, 0.135     # el paso del tramo decidido

# El coral de adentro se apaga cuando el agente sale: lo que estaba en la caja
# es lo que ahora anda por la banda. No baja de nivel —eso seria un liquido
# otra vez—, pierde el color y queda la caja como lo que es, una caja vacia.
T_APAGA = T_ROTO
D_APAGA = 0.40

# El rastro no se queda. Cada tramo se borra unos segundos despues de darlo,
# asi que lo que se ve en la banda es la cola de lo recien andado y no el mapa
# entero. La banda vuelve a quedar limpia detras del agente.
RETARDO = 1.25               # lo que aguanta un tramo antes de empezar a irse
D_BORRA = 1.00               # y lo que tarda en irse
RETARDO_PISO = 0.35          # la celda se va un poco despues que la marca

# La ronda. Salirse del cuadro no es el final: el agente sigue andando por ahi
# mientras alguien lee la pagina. Vuelve al piso que quedo delante de la caja
# rota, da una vuelta corta, se detiene a mirar y se va otra vez. El circuito
# es cerrado —termina exactamente donde empieza— y se repite sin fin.
ESPERA_RONDA = 2.9           # lo que la banda se queda vacia despues de la fuga
D_RONDA = 0.42               # el paso de la ronda: anda, no corre
D_ALTO = 1.20                # el alto en el fondo del recodo
CICLO = 22.0                 # de una ronda a la siguiente

# El punto de partida esta a la derecha del cuadro, fuera de la banda, para no
# tener que aparecerlo ni desaparecerlo: cuando no esta en la ronda, no esta.
RONDA_INICIO = (6.785, 1.915)
# Entra por el zigzag de abajo, se detiene y sale por el de arriba. Ninguno de
# los dos pisa la huella isometrica de la caja, y los dos se quedan a la
# derecha del titular en los anchos de escritorio.
RONDA_PASOS = ((0, 1), (-1, 0), (0, 1), (-1, 0), (0, 1), (-1, 0),
               None,
               (0, -1), (1, 0), (0, -1), (1, 0), (0, -1), (1, 0))

BALDOSA = H._mezcla(H.FONDO, ARENA, 0.085)  # el piso que va apareciendo


# --------------------------------------------------------------- el camino

def camino():
    u"""Los puntos por los que pasa el cubo, en coordenadas del mundo.

    Devuelve tres tramos: la salida (del boquete al piso), el tanteo (que
    muere) y el tramo decidido. El tanteo se va en +x, que en pantalla baja
    hacia la derecha: a dos celdas ya se le acabo el piso, porque la banda se
    termina ahi. Esa direccion es la contraria de la que acaba tomando, y por
    eso el retroceso se lee como un cambio de idea y no como un rodeo. El
    tramo decidido alterna dos pasos en -x y uno en +y, y esa terna avanza a
    la izquierda subiendo despacio, que es lo que lo saca del cuadro por el
    costado sin pasar nunca por el titular.
    """
    bx, bz = R.BOCA_C                       # (2.03, 0.63) en la cara del muro
    base = bz - LADO / 2.0

    salida = [(bx, R.YB, base),             # nace dentro del boquete
              (bx, R.YB + 1.15, base),      # sale al aire
              (bx, R.YB + 1.15, 0.0)]       # cae al suelo

    pie = salida[-1]
    tanteo = [(pie[0] + PASO * k, pie[1], 0.0) for k in (1, 2)]

    decidido = []
    x, y = pie[0], pie[1]
    for _ in range(7):                      # siete ternas
        for dx, dy in ((-PASO, 0.0), (-PASO, 0.0), (0.0, PASO)):
            x, y = x + dx, y + dy
            decidido.append((x, y, 0.0))
    return salida, tanteo, decidido


def banda(p):
    u"""Del mundo a la banda de 1280x521, que es donde hay que medir si algo
    se sale por arriba o le pasa por encima al titular."""
    lx, ly = P(O, p[0], p[1], p[2])
    return OX + lx * K, ly * K


# --------------------------------------------------------------- el reloj

def linea_de_tiempo():
    u"""(t0, t1, desde, hasta, salto) por cada tramo de movimiento.

    `salto` es la altura del brinco a mitad de paso. El cubo no se desliza de
    celda en celda: da un paso, y entre paso y paso descansa. Ese descanso es
    el 30 % del tiempo de cada celda, y es lo que lo hace leer como algo que
    anda y no como algo que lo arrastran.
    """
    salida, tanteo, decidido = camino()
    seg = []
    t = T_NACE

    seg.append((t, t + D_SALE, salida[0], salida[1], 0.0))
    t += D_SALE
    seg.append((t, t + D_CAE, salida[1], salida[2], 0.0))
    t += D_CAE

    aqui = salida[2]
    for p in tanteo:                        # el tanteo, todavia en coral
        seg.append((t, t + D_TANTEO, aqui, p, 0.10))
        aqui = p
        t += D_TANTEO

    # la duda: estira medio paso hacia donde no hay celda, y lo recoge. Sin
    # esto la duda es una pausa, y una pausa no se ve; lo que se ve es el pie
    # que se asoma al vacio y vuelve.
    t_duda = t
    asoma = (aqui[0] + 0.45 * PASO, aqui[1], 0.0)
    seg.append((t, t + D_ASOMA, aqui, asoma, 0.05))
    t += D_ASOMA
    seg.append((t, t + D_RECOGE, asoma, aqui, 0.0))
    t += D_RECOGE
    t += D_DUDA                             # se queda quieto en el borde

    for p in [tanteo[0], salida[2]]:        # y desanda
        seg.append((t, t + D_VUELTA, aqui, p, 0.06))
        aqui = p
        t += D_VUELTA

    t_apaga = seg[-1][1]                    # la rama muere al pisar el origen
    t += T_ENTRA
    t_decide = t

    n = len(decidido)
    for k, p in enumerate(decidido):        # y se lanza, acelerando
        d = P_LENTO + (P_RAPIDO - P_LENTO) * (k / float(n - 1))
        seg.append((t, t + d, aqui, p, 0.12))
        aqui = p
        t += d

    return seg, dict(duda=t_duda, apaga=t_apaga, decide=t_decide, fin=t)


def posicion(seg, t):
    u"""Donde esta el cubo en el instante t, con el brinco incluido."""
    if t <= seg[0][0]:
        return seg[0][2]
    for t0, t1, a, b, salto in seg:
        if t <= t1:
            u = (t - t0) / (t1 - t0)
            u = min(1.0, max(0.0, u))
            v = min(1.0, u / 0.70)          # el 70 % anda, el 30 % descansa
            z = salto * math.sin(math.pi * v)
            return (a[0] + (b[0] - a[0]) * v,
                    a[1] + (b[1] - a[1]) * v,
                    a[2] + (b[2] - a[2]) * v + z)
    return seg[-1][3]


# --------------------------------------------------------------- el dibujo

def reticula(animado):
    u"""La malla triangular del fondo, la misma de siempre. Sin ella la banda
    queda un rectangulo verde vacio y la caja flota en el medio."""
    base = io.open(R.BASE, encoding="utf-8").read()
    i = base.index(">", base.index("<svg")) + 1
    dentro = base[i: base.rindex("</svg>")]
    if not animado:
        # el rasterizador no entiende la mascara del degradado
        dentro = re.sub(r' stroke-dash(array|offset)="[^"]*"', "", dentro)
        dentro = dentro.replace('mask="url(#m)"', 'stroke-opacity="0.17"')
    return dentro


def cubo(p):
    u"""El cubo coral, con el centro de su huella en p y la base en p[2]."""
    m = LADO / 2.0
    return H.volumen(O, p[0] - m, p[1] - m, LADO, LADO, p[2], LADO,
                     coral=True, w=H.PRIM)


def celda(p):
    u"""La celda de suelo que el agente esta a punto de pisar. El terreno no
    esta dibujado de antemano: aparece delante de el, que es la verdad del
    asunto, porque el agente va hasta donde el mapa lo deja. Va rellena: solo
    con el contorno se confunde con la reticula del fondo."""
    m = PASO / 2.0
    pts = [P(O, p[0] - m, p[1] - m), P(O, p[0] + m, p[1] - m),
           P(O, p[0] + m, p[1] + m), P(O, p[0] - m, p[1] + m)]
    return poli(pts, w=3.0, color=ARENA, op=0.55, relleno=BALDOSA)


def celdas(pts, cuandos, animado, t):
    u"""Las celdas de un tramo: cada una entra justo antes del pie y se va
    detras de la marca que el pie dejo encima."""
    out = []
    for q, cuando in zip(pts, cuandos):
        borra = cuando + RETARDO + RETARDO_PISO
        el = celda(q).replace("<polygon ", '<polygon opacity="%s" ', 1)
        if animado:
            out.append((el % "0").replace(
                "/>", '><animate attributeName="opacity" from="0" to="1"'
                      ' begin="%.3fs" dur="0.30s" fill="freeze"/>'
                      '<animate attributeName="opacity" from="1" to="0"'
                      ' begin="%.3fs" dur="%.3fs" fill="freeze"/></polygon>'
                      % (cuando, borra, D_BORRA)))
        else:
            out.append(el % ("%.3f" % _vive(cuando, borra, t)))
    return "".join(out)


def _vive(nace, borra, t):
    u"""Cuanto queda de algo que aparecio en `nace` y se borra desde `borra`."""
    if t is None:
        return 0.0
    if t < nace:
        return 0.0
    return 1.0 - min(1.0, max(0.0, (t - borra) / D_BORRA))


def _d(pts):
    xy = [P(O, x, y, z) for x, y, z in pts]
    return "M " + " L ".join("%.1f %.1f" % q for q in xy)


def _largo(pts):
    xy = [P(O, x, y, z) for x, y, z in pts]
    return sum(math.hypot(xy[i + 1][0] - xy[i][0], xy[i + 1][1] - xy[i][1])
               for i in range(len(xy) - 1))


def trazado():
    u"""Las dos ramas: la que murio y la que sirvio."""
    salida, tanteo, decidido = camino()
    pie = salida[2]
    return [pie] + tanteo, [pie] + decidido


def rastro(pts, tramos, color, op, w, animado, t):
    u"""El rastro, un trazo por paso.

    Antes era una sola linea que se iba revelando de punta a punta. Ahora cada
    tramo es su propio trazo, porque cada uno tiene que borrarse en su
    momento: el que se dio primero se va primero, y no todos juntos al final.
    """
    out = []
    for k, (a, b) in enumerate(tramos):
        par = [pts[k], pts[k + 1]]
        largo = _largo(par)
        # el hueco va mas largo que el trazo: con hueco y trazo iguales la
        # fase cae justo en el empalme y el remate redondo deja un punto
        # suelto al final del tramo que todavia no se ha andado
        anda = 0.70 * (b - a)               # el mismo 70 % que anda el cubo
        borra = b + RETARDO
        if animado:
            out.append(
                '<path d="%s" fill="none" stroke="%s" stroke-width="%s"'
                ' stroke-opacity="%s" stroke-linecap="round"'
                ' stroke-dasharray="%.1f %.1f" stroke-dashoffset="%.1f">'
                '<animate attributeName="stroke-dashoffset" from="%.1f" to="0"'
                ' begin="%.3fs" dur="%.3fs" calcMode="linear" fill="freeze"/>'
                '<animate attributeName="stroke-opacity" from="%s" to="0"'
                ' begin="%.3fs" dur="%.3fs" fill="freeze"/></path>'
                % (_d(par), color, w, op, largo, largo + 4.0, largo,
                   largo, a, anda, op, borra, D_BORRA))
        else:
            queda = op * _vive(a, borra, t)
            if queda <= 0.005:
                continue
            u = 0.0 if t is None else min(1.0, max(0.0, (t - a) / anda))
            out.append(
                '<path d="%s" fill="none" stroke="%s" stroke-width="%s"'
                ' stroke-opacity="%.3f" stroke-linecap="round"'
                ' stroke-dasharray="%.1f %.1f" stroke-dashoffset="%.1f"/>'
                % (_d(par), color, w, queda, largo, largo + 4.0,
                   largo * (1.0 - u)))
    return "".join(out)


# ------------------------------------------------------------- la lamina

CSS = u"""
<style>
.hk-caja{animation:hkGolpe 0.340s cubic-bezier(.36,.07,.19,.97) 1.330s both}
.hk-intacto{animation:hkSale 0.100s steps(1,start) 1.368s both}
.hk-roto{animation:hkEntra 0.120s steps(1,start) 1.368s both}
.hk-esquirla{transform-box:fill-box;transform-origin:60%% 20%%;
  animation:hkEntra 0.160s linear 1.444s both,hkAbre 0.340s cubic-bezier(.2,.8,.3,1) 1.444s both}
@keyframes hkEntra{from{opacity:0}to{opacity:1}}
@keyframes hkSale{from{opacity:1}to{opacity:0}}
@keyframes hkAbre{from{transform:scale(.55)}to{transform:scale(1)}}
@keyframes hkGolpe{0%%{transform:translate(0,0)}22%%{transform:translate(-7px,3px)}
  48%%{transform:translate(5px,-2px)}74%%{transform:translate(-2px,1px)}
  100%%{transform:translate(0,0)}}
.ag-piel{transform-box:fill-box;transform-origin:50%% 80%%;
  animation:agNace %(dnace).3fs cubic-bezier(.2,.9,.3,1) %(tnace).3fs both}
@keyframes agNace{from{opacity:0;transform:scale(.2)}to{opacity:1;transform:scale(1)}}
.hk-lleno{animation:hkSale %(dapaga).3fs cubic-bezier(.85,0,.15,1) %(tapaga).3fs both}
@media (prefers-reduced-motion:reduce){
  .hk-caja,.hk-roto,.hk-esquirla{animation:none;opacity:1;transform:none}
  .hk-intacto,.hk-grieta,.hk-lleno{display:none}
  .ag-corre{display:none}
  .ag-quieto{display:block}
}
.ag-quieto{display:none}
/* La ronda se retira en pantallas angostas. Ahi la banda se recorta por
   el ancho, el dibujo se corre sobre la columna de texto y el cubo queda
   justo encima del boton de participar en linea. La fuga pasa por ahi una
   sola vez; la ronda volveria cada rato. */
@media (max-width:1079px){.ag-ronda{display:none}}
</style>
"""


def _kt(vals, ts, t0, dur):
    u"""values/keyTimes de un animate, con la garantia de que las llaves van
    de 0 a 1 sin pasarse. Un keyTime mayor que uno no degrada la animacion:
    el navegador la tira entera y no se ve nada."""
    ks = [(t - t0) / dur for t in ts]
    assert abs(ks[0]) < 1e-6, "la primera llave no arranca en cero: %r" % ks[0]
    assert abs(ks[-1] - 1.0) < 1e-6, "la ultima llave no cierra en uno: %r" % ks[-1]
    for a, b in zip(ks, ks[1:]):
        assert b >= a - 1e-9, "llaves fuera de orden"
    return (";".join(vals),
            ";".join("%.5f" % min(1.0, max(0.0, k)) for k in ks))


def animacion_cubo(seg, hitos):
    u"""El translate del cubo. Se muestrea cada tramo en tres puntos, que es
    lo que hace falta para que el brinco tenga curva y el descanso se note."""
    t0 = seg[0][0]
    dur = hitos["fin"] - t0
    ori = P(O, *seg[0][2])
    ts, vals = [], []

    def mete(t):
        p = posicion(seg, t)
        q = P(O, *p)
        ts.append(t)
        vals.append("%.1f %.1f" % (q[0] - ori[0], q[1] - ori[1]))

    mete(t0)
    for a, b, _x, _y, _s in seg:
        for u in (0.35, 0.70, 1.0):
            mete(a + (b - a) * u)
    if ts[-1] < hitos["fin"]:
        mete(hitos["fin"])

    v, k = _kt(vals, ts, t0, dur)
    return ('<animateTransform attributeName="transform" type="translate"'
            ' begin="%.3fs" dur="%.3fs" values="%s" keyTimes="%s"'
            ' calcMode="linear" fill="freeze"/>' % (t0, dur, v, k))


def ronda_camino():
    u"""El circuito, en coordenadas del mundo. Cierra donde abre: el ultimo
    punto es el primero, y por eso el ciclo se repite sin costura."""
    pts = [(RONDA_INICIO[0], RONDA_INICIO[1], 0.0)]
    for s in RONDA_PASOS:
        if s is None:
            continue
        x, y, _z = pts[-1]
        pts.append((x + s[0] * PASO, y + s[1] * PASO, 0.0))
    return pts


def ronda_reloj():
    u"""Los tramos de la ronda, medidos desde el arranque del ciclo. El alto
    no es un tramo: es un hueco en la linea de tiempo."""
    pts = ronda_camino()
    seg, t, i = [], 0.0, 0
    for s in RONDA_PASOS:
        if s is None:
            t += D_ALTO
            continue
        seg.append((t, t + D_RONDA, pts[i], pts[i + 1], 0.10))
        i += 1
        t += D_RONDA
    return seg


def _llaves(ts):
    u"""Las llaves de un animate que da la vuelta entera al ciclo."""
    ks = [min(1.0, max(0.0, x / CICLO)) for x in ts]
    for a, b in zip(ks, ks[1:]):
        assert b >= a - 1e-9, "llaves de la ronda fuera de orden: %r" % ks
    return ";".join("%.5f" % k for k in ks)


def ronda(animado, t, arranque):
    u"""La vuelta que el agente da mientras alguien lee la pagina.

    Todo lo de aca dentro se anima sobre el ciclo entero, no sobre su propio
    tramo: un `values` que arranca y termina en el mismo estado, repetido sin
    fin. Lo que en la fuga era `fill="freeze"` aca seria el final de todo, asi
    que en su lugar cada cosa vuelve sola a como estaba.

    El cubo se dibuja quieto en el punto de partida, que esta fuera del cuadro
    a la derecha: antes del primer ciclo no hay nada que ocultar, porque no
    hay nada que se vea.
    """
    seg = ronda_reloj()
    tc = None
    if not animado:
        if t is None or t < arranque:
            return "", "", ""
        tc = math.fmod(t - arranque, CICLO)

    pts = ronda_camino()
    ini = "%.3fs" % arranque

    suelo = []
    for j, (a, b, _x, _y, _s) in enumerate(seg):
        cuando = max(0.0, a - 0.10)
        borra = b + RETARDO + RETARDO_PISO
        el = celda(pts[j + 1]).replace("<polygon ", '<polygon opacity="%s" ', 1)
        if animado:
            k = _llaves([0.0, cuando, cuando + 0.30, borra,
                         borra + D_BORRA, CICLO])
            suelo.append((el % "0").replace(
                "/>", '><animate attributeName="opacity" values="0;0;1;1;0;0"'
                      ' keyTimes="%s" begin="%s" dur="%.3fs"'
                      ' repeatCount="indefinite"/></polygon>' % (k, ini, CICLO)))
        else:
            v = _vive(cuando, borra, tc)
            if v > 0.005:
                suelo.append(el % ("%.3f" % v))

    marcas = []
    for j, (a, b, _x, _y, _s) in enumerate(seg):
        par = [pts[j], pts[j + 1]]
        largo = _largo(par)
        anda = 0.70 * (b - a)
        borra = b + RETARDO
        if animado:
            # el trazo vuelve a esconderse en un pestaneo, ya con la opacidad
            # en cero: el reinicio del ciclo no se ve
            kd = _llaves([0.0, a, a + anda, borra + D_BORRA,
                          borra + D_BORRA + 0.08, CICLO])
            ko = _llaves([0.0, borra, borra + D_BORRA, CICLO])
            marcas.append(
                '<path d="%s" fill="none" stroke="%s" stroke-width="6.5"'
                ' stroke-opacity="0.85" stroke-linecap="round"'
                ' stroke-dasharray="%.1f %.1f" stroke-dashoffset="%.1f">'
                '<animate attributeName="stroke-dashoffset"'
                ' values="%.1f;%.1f;0;0;%.1f;%.1f" keyTimes="%s" begin="%s"'
                ' dur="%.3fs" calcMode="linear" repeatCount="indefinite"/>'
                '<animate attributeName="stroke-opacity"'
                ' values="0.85;0.85;0;0" keyTimes="%s" begin="%s" dur="%.3fs"'
                ' repeatCount="indefinite"/></path>'
                % (_d(par), CORAL, largo, largo + 4.0, largo,
                   largo, largo, largo, largo, kd, ini, CICLO,
                   ko, ini, CICLO))
        else:
            queda = 0.85 * _vive(a, borra, tc)
            if queda > 0.005:
                u = min(1.0, max(0.0, (tc - a) / anda))
                marcas.append(
                    '<path d="%s" fill="none" stroke="%s" stroke-width="6.5"'
                    ' stroke-opacity="%.3f" stroke-linecap="round"'
                    ' stroke-dasharray="%.1f %.1f" stroke-dashoffset="%.1f"/>'
                    % (_d(par), CORAL, queda, largo, largo + 4.0,
                       largo * (1.0 - u)))

    ori = pts[0]
    if animado:
        o = P(O, *ori)
        ts, vals = [], []

        def mete(x):
            q = P(O, *posicion(seg, x))
            ts.append(x)
            vals.append("%.1f %.1f" % (q[0] - o[0], q[1] - o[1]))

        mete(0.0)
        for a, b, _x, _y, _s in seg:
            if a > ts[-1] + 1e-6:
                mete(a)      # el alto hay que anclarlo, o el cubo se desliza
            for u in (0.35, 0.70, 1.0):
                mete(a + (b - a) * u)
        mete(CICLO)
        cuerpo = "".join(cubo(ori)) + (
            '<animateTransform attributeName="transform" type="translate"'
            ' values="%s" keyTimes="%s" begin="%s" dur="%.3fs"'
            ' calcMode="linear" repeatCount="indefinite"/>'
            % (";".join(vals), _llaves(ts), ini, CICLO))
    else:
        cuerpo = "".join(cubo(posicion(seg, tc)))

    agente = ('<g class="ag-ronda" fill="none" stroke-linecap="round"'
              ' stroke-linejoin="round">%s</g>' % cuerpo)
    # las tres piezas llevan la misma clase: la regla que las retira en
    # pantallas angostas tiene que llevarselas juntas, o quedan las huellas
    # de alguien que no esta
    return _grupo(suelo), _grupo(marcas), agente


def _grupo(partes):
    # Envuelve las piezas de la ronda en su clase, o nada si no hay nada.
    if not partes:
        return ""
    return '<g class="ag-ronda">%s</g>' % "".join(partes)


def capas(animado=True, t=None):
    u"""Las capas del dibujo, en orden de pintado.

    El agente y su rastro van despues de la caja: si fueran detras, el
    reborde de la base los partiria justo donde nacen, que es el error que ya
    se pago una vez con el charco.
    """
    H.escala(0.78)
    R.RITMO = ESCALA_T if animado else 1.0
    fondo, intacto, roto, fisura, frente, bordes = R.lamina(False, True)
    lleno, fondo = fondo[-3:], fondo[:-3]      # el bloque coral del interior
    vacio = H.volumen(R.O, 0.7, 0.7, 2.6, 2.6, R.PISO, 0.62)

    seg, hitos = linea_de_tiempo()
    ram_tanteo, ram_buena = trazado()
    _sal, tanteo, decidido = camino()

    if animado:
        piezas = [R.capa("hk-fondo", fondo), R.capa("hk-vacio", vacio),
                  R.capa("hk-lleno", lleno), R.capa("hk-intacto", intacto),
                  R.capa("hk-roto", _adentro(roto, None), oculto=True),
                  R.capa("hk-grieta", fisura), R.capa("hk-frente", frente),
                  R.capa("hk-esquirla", bordes, oculto=True)]
    elif t is not None and t < T_ROTO:      # todavia entera
        piezas = [R.capa("hk-fondo", fondo), R.capa("hk-vacio", vacio),
                  R.capa("hk-lleno", lleno), R.capa("hk-intacto", intacto),
                  R.capa("hk-frente", frente)]
    else:
        piezas = [R.capa("hk-fondo", fondo), R.capa("hk-vacio", vacio),
                  _lleno_quieto(lleno, t), R.capa("hk-roto", _adentro(roto, t)),
                  R.capa("hk-grieta", R.sin_trazo("".join(fisura)).split("\n")),
                  R.capa("hk-frente", frente)]
        if t is None or t >= T_ESQUIRLA:
            piezas.append(R.capa("hk-esquirla", bordes))

    caja = ('<g class="hk-caja" fill="none" stroke-linecap="round"'
            ' stroke-linejoin="round">%s</g>' % "".join(p for p in piezas if p))

    # el suelo que va apareciendo: cada celda entra justo antes de que la
    # pisen, porque el agente llega hasta donde el mapa lo deja
    d0 = len(seg) - len(decidido)
    pie_suelo = celdas([_sal[2]], [seg[1][0]], animado, t)
    suelo_t = celdas(tanteo, [seg[2 + k][0] - 0.10 for k in range(len(tanteo))],
                     animado, t)
    suelo_d = celdas(decidido, [seg[d0 + k][0] - 0.10 for k in range(len(decidido))],
                     animado, t)
    # y la ronda, que empieza cuando la banda ya lleva un rato vacia
    ron_suelo, ron_marcas, ron_agente = ronda(
        animado, t, hitos["fin"] + ESPERA_RONDA)
    suelo = [pie_suelo, suelo_t, suelo_d, ron_suelo]

    tr_tanteo = [(a, b) for a, b, _x, _y, _s in seg[2:2 + len(tanteo)]]
    tr_buena = [(a, b) for a, b, _x, _y, _s in seg[d0:]]
    marcas = (rastro(ram_tanteo, tr_tanteo, CORAL, 0.85, 6.5, animado, t)
              + rastro(ram_buena, tr_buena, CORAL, 0.9, 6.5, animado, t)
              + ron_marcas)

    quieto = ""
    if animado:
        motor = animacion_cubo(seg, hitos)
        aqui = seg[0][2]
    else:
        motor = ""
        aqui = posicion(seg, t if t is not None else hitos["fin"])

    if not animado and t is not None and t < T_NACE:
        piel = ""                            # todavia no ha nacido
    else:
        piel = '<g class="ag-piel">%s</g>' % "".join(cubo(aqui))
    agente = ('<g class="ag-cubo" fill="none" stroke-linecap="round"'
              ' stroke-linejoin="round">%s%s</g>' % (piel, motor if animado else ""))
    return caja, "".join(suelo), marcas, agente + ron_agente, quieto, hitos


def _adentro(roto, t):
    u"""Lo que se ve por el boquete es el mismo coral del interior, y se apaga
    con el. Va anidado dentro de hk-roto: las dos opacidades se multiplican, y
    asi la tapa entra con el hueco y se apaga con el contenido."""
    tapa = _lleno_quieto(roto[:1], t) if t is not None else (
        '<g class="hk-lleno">%s</g>' % roto[0])
    return ([tapa] if tapa else []) + list(roto[1:])


def _lleno_quieto(lleno, t):
    u"""El bloque coral con la opacidad que le toca en el instante t."""
    if t is None:
        o = 0.0
    else:
        u = min(1.0, max(0.0, (t - T_APAGA) / D_APAGA))
        o = 1.0 - u * u * u * (u * (u * 6 - 15) + 10)   # la misma curva
    if o < 0.01:
        return ""
    return '<g class="hk-lleno" opacity="%.3f">%s</g>' % (o, "".join(lleno))


def quietud(hitos):
    u"""La misma escena sin una sola animacion, para quien pidio que nada se
    mueva. El cubo se deja a media travesia: al final del recorrido ya salio
    del cuadro, y una banda con el rastro y sin nadie no cuenta nada."""
    t = hitos["decide"] + 0.72 * (hitos["fin"] - hitos["decide"])
    _c, suelo, rastro, agente, _q, _h = capas(False, t)
    R.RITMO = ESCALA_T
    piezas = re.sub(r' id="ag[A-Za-z]+"', "", suelo + rastro + agente)
    piezas = piezas.replace(' class="ag-piel"', "")
    return '<g class="ag-quieto">%s</g>' % piezas


def svg(animado=True, t=None, suf="", fondo=True):
    caja, suelo, rastro, agente, _q, hitos = capas(animado, t)
    css = (CSS % dict(dnace=D_NACE, tnace=T_NACE, dapaga=D_APAGA,
                      tapaga=T_APAGA)) if animado else ""
    # el taller pinta su propio fondo; en el sitio lo pone la seccion del hero
    tapa = ('<rect width="%d" height="%d" fill="%s"/>' % (
        int(BW), int(BH), R._hex(H.FONDO))) if fondo else ""
    if animado:
        corre = '<g class="ag-corre">%s%s%s</g>' % (suelo, rastro, agente)
        dentro = reticula(animado) + caja + corre + quietud(hitos)
    else:
        dentro = reticula(animado) + caja + suelo + rastro + agente
    cuerpo = (u'<svg viewBox="0 0 %d %d" xmlns="http://www.w3.org/2000/svg"'
              u' xmlns:xlink="http://www.w3.org/1999/xlink"'
              u' preserveAspectRatio="xMaxYMax slice" role="presentation">'
              u'%s%s<g transform="translate(%.1f,0) scale(%.5f)">%s</g></svg>'
              % (int(BW), int(BH), css, tapa, OX, K, dentro))
    if suf:
        for viejo in ("fade", "m"):
            cuerpo = cuerpo.replace('id="%s"' % viejo, 'id="%s%s"' % (viejo, suf))
            cuerpo = cuerpo.replace("url(#%s)" % viejo, "url(#%s%s)" % (viejo, suf))
            cuerpo = cuerpo.replace('href="#%s"' % viejo, 'href="#%s%s"' % (viejo, suf))
    return cuerpo, hitos


# ------------------------------------------------------------ comprobar

def revisar():
    u"""Lo que no se puede juzgar mirando: que el camino no se salga de la
    banda por arriba y que salga por el costado, no por el borde de abajo."""
    H.escala(0.78)               # banda() lee la escala global: sin esto se
                                 # mide la lamina a tamano 1 y no dice nada
    seg, hitos = linea_de_tiempo()
    _sal, _tan, decidido = camino()
    ys = [banda(p)[1] for p in decidido]
    xs = [banda(p)[0] for p in decidido]
    assert max(ys) < BH - 60, "el tramo decidido roza el borde de abajo: %.0f" % max(ys)
    assert min(ys) > 70, "se sale por arriba: %.0f" % min(ys)
    assert min(xs) < -20, "no llega a salirse por el costado: %.0f" % min(xs)
    bajo = [banda(p)[1] for p in _tan]
    assert max(bajo) > BH - 90, "el tanteo no llega a quedarse sin piso: %.0f" % max(bajo)
    pie = banda(_sal[2])
    assert banda(_tan[-1])[0] > pie[0] + 60, "el tanteo no contrasta con la ruta"
    assert min(xs) < pie[0] - 400, "la ruta no se aleja del pie"
    print("camino  x %.0f..%.0f   y %.0f..%.0f   tanteo hasta y=%.0f"
          % (min(xs), max(xs), min(ys), max(ys), max(bajo)))
    print("reloj   nace %.2f  duda %.2f  decide %.2f  fin %.2f"
          % (T_NACE, hitos["duda"], hitos["decide"], hitos["fin"]))

    # la ronda: el circuito tiene que cerrar, caber en la banda con celda y
    # cubo incluidos, y no pisar la huella de la caja
    ron = ronda_camino()
    assert max(abs(a - b) for a, b in zip(ron[0], ron[-1])) < 1e-9, (
        "el circuito de la ronda no cierra: %r vs %r" % (ron[0], ron[-1]))
    rx = [banda(p)[0] for p in ron]
    ry = [banda(p)[1] for p in ron]
    alto_celda = PASO * abs(P(O, 0, 0)[1] - P(O, 0.5, 0.5)[1]) * K * 2.0
    assert max(ry) + alto_celda / 2.0 < BH - 6, (
        "la celda de la ronda se sale por abajo: %.0f" % (max(ry) + alto_celda / 2.0))
    assert rx[0] > BW + 30, "la ronda no arranca fuera del cuadro: %.0f" % rx[0]
    assert min(rx) > 900, "la ronda se mete debajo del titular: %.0f" % min(rx)
    m = PASO / 2.0
    for p in ron:
        assert not (abs(p[0] - 2.0) < 1.3 + m and abs(p[1] - 2.0) < 1.3 + m), (
            "la ronda pisa la caja en %r" % (p,))
    ciclo = ronda_reloj()
    assert ciclo[-1][1] + RETARDO + D_BORRA + RETARDO_PISO < CICLO - 1.0, (
        "el rastro de la ronda no alcanza a borrarse antes del siguiente ciclo")
    print("ronda   x %.0f..%.0f   y %.0f..%.0f   anda %.2fs de cada %.0f"
          % (min(rx), max(rx), min(ry), max(ry), ciclo[-1][1], CICLO))
    return hitos


# -------------------------------------------------------------- la salida

PAGINA = u"""<!doctype html><meta charset="utf-8"><title>El agente sale</title>
<style>
 body{margin:0;background:#0d2417;color:#f3ead8;font:14px/1.6 system-ui}
 .rot{margin:0;padding:22px 26px 8px;font:600 13px/1 system-ui;
      letter-spacing:.14em;text-transform:uppercase;color:#e5604d}
 .rot small{display:block;margin-top:8px;letter-spacing:0;text-transform:none;
      font-weight:400;font-size:14px;color:#f3ead8;opacity:.72;max-width:70ch}
 .banda{position:relative;overflow:hidden;background:#143620;height:521px}
 .banda>svg{position:absolute;inset:0;height:100%%;width:100%%;
      pointer-events:none}
 .texto{position:absolute;left:80px;bottom:56px;max-width:620px;z-index:2}
 .texto b{display:block;font:800 52px/1.02 system-ui;letter-spacing:-.02em}
 .texto span{display:block;margin-top:14px;font-size:17px;opacity:.8}
 .otra{position:fixed;right:20px;bottom:18px;z-index:9;background:#e5604d;
      color:#143620;border:0;border-radius:999px;padding:11px 20px;
      font:600 14px system-ui;cursor:pointer}
</style>
%(cuerpo)s
<button class="otra" onclick="repetir()">volver a romperla</button>
<script>
function repetir(){document.querySelectorAll(".banda>svg").forEach(function(s){
  s.parentNode.replaceChild(s.cloneNode(true),s);});}
</script>
"""

BANDA = u"""<p class="rot">%(rot)s<small>%(nota)s</small></p>
<div class="banda">
%(svg)s
  <div class="texto"><b>Sprint de investigacion</b>
  <span>Respuesta a incidentes de IA &middot; 20 de agosto</span></div>
</div>
"""


def hoja_de_instantes(ruta, hitos):
    u"""Doce instantes rasterizados, para juzgar el ritmo sin navegador."""
    import cairosvg
    from PIL import Image
    ts = [T_GOLPE - 0.05, T_NACE + 0.20, 2.30, 2.75, hitos["duda"] + 0.2,
          hitos["apaga"], hitos["decide"] + 0.35, hitos["decide"] + 1.1,
          hitos["fin"] - 0.35, hitos["fin"], hitos["fin"] + 1.0,
          hitos["fin"] + RETARDO + D_BORRA]
    cols, filas = 2, 6
    esc = 0.5
    w, h = int(BW * esc), int(BH * esc)
    hoja = Image.new("RGB", (cols * w, filas * h), (13, 36, 23))
    for i, t in enumerate(ts):
        cuerpo, _ = svg(animado=False, t=t)
        png = cairosvg.svg2png(bytestring=cuerpo.encode("utf-8"),
                               output_width=w, output_height=h)
        im = Image.open(io.BytesIO(png)).convert("RGB")
        hoja.paste(im, ((i % cols) * w, (i // cols) * h))
    hoja.save(ruta)
    print(os.path.basename(ruta), "  instantes:",
          " ".join("%.2f" % t for t in ts))


def pelicula(ruta, t0, t1, fps=12, ancho=760):
    u"""Un tramo del reloj en un gif, que es la unica forma de juzgar el
    ritmo: en cuadros sueltos la duda siempre parece mas larga de lo que es."""
    import cairosvg
    from PIL import Image
    n = int((t1 - t0) * fps)
    alto = int(ancho * BH / BW)
    cuadros = []
    for i in range(n + 1):
        t = t0 + (t1 - t0) * i / float(n)
        cuerpo, _ = svg(animado=False, t=t)
        png = cairosvg.svg2png(bytestring=cuerpo.encode("utf-8"),
                               output_width=ancho, output_height=alto)
        cuadros.append(Image.open(io.BytesIO(png)).convert("RGB")
                       .quantize(colors=96, method=Image.MEDIANCUT))
    cuadros[0].save(ruta, save_all=True, append_images=cuadros[1:],
                    duration=int(1000 / fps), loop=0, optimize=True)
    print(os.path.basename(ruta), " %d cuadros  %.1f s  %.1f MB"
          % (len(cuadros), t1 - t0, os.path.getsize(ruta) / 1e6))


RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TSX = os.path.join(RAIZ, "components", "hero-hackathon.tsx")

CABEZA = u"""// Generado por scripts/agente.py. No editar a mano.
//
// La caja se rompe y de adentro sale un agente. No es un liquido que cae:
// es alguien que elige. Prueba una direccion, se queda sin piso, retrocede
// y toma la otra, con el suelo apareciendo delante de el. El rastro no se
// acumula: cada paso se borra un par de segundos despues de darlo.

const MARCA = `%(svg)s`;

export function HeroHackathon({ className }: { className?: string }) {
  return (
    <div
      className={className}
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: MARCA }}
    />
  );
}
"""


BQ = chr(96)      # la comilla invertida, sin escribirla aqui
ESC = chr(92)     # y la contrabarra


def componente(cuerpo):
    u"""El SVG entra en una plantilla de JS, asi que hay tres cosas que hay
    que desactivar antes: la contrabarra, la comilla invertida y el ${."""
    return CABEZA % dict(
        svg=cuerpo.replace("\\", "\\\\").replace(BQ, ESC + BQ).replace("${", ESC + "${"))


def main():
    if not os.path.isdir(SALIDA):
        os.makedirs(SALIDA)
    hitos = revisar()

    cuerpo, _ = svg(animado=True, suf="A")
    io.open(os.path.join(SALIDA, "agente.svg"), "w", encoding="utf-8",
            newline="\n").write(cuerpo)

    nota = (u"La caja es la lamina 2, sin tocar. Lo nuevo empieza en 1,62 s: "
            u"el cubo coral que estaba adentro sale por el boquete, cae, "
            u"prueba hacia adelante y se queda sin piso, duda, desanda y se "
            u"lanza a la izquierda acelerando, con el suelo apareciendo "
            u"delante de el. El rastro no se acumula: cada paso se borra "
            u"un par de segundos despues de darlo, y detras del agente la banda "
            u"vuelve a quedar limpia. Sale del cuadro por el costado y nunca "
            u"pasa por encima del titular. Y no se va del todo: cada 22 s "
            u"vuelve por la derecha, da una vuelta delante de la caja rota, "
            u"se detiene a mirar y se va otra vez.")
    pagina = PAGINA % dict(cuerpo=BANDA % dict(
        rot=u"El agente sale de la caja", nota=nota, svg=cuerpo))
    io.open(os.path.join(SALIDA, "index.html"), "w", encoding="utf-8",
            newline="\n").write(pagina)
    print(os.path.join(SALIDA, "index.html"))

    if "--tsx" in sys.argv:
        web, _ = svg(animado=True, suf="Hk", fondo=False)
        io.open(TSX, "w", encoding="utf-8",
                newline=chr(10)).write(componente(web))
        print(TSX, os.path.getsize(TSX) // 1024, "KB")

    if "--png" in sys.argv:
        hoja_de_instantes(os.path.join(SALIDA, "instantes.png"), hitos)
    if "--gif" in sys.argv:
        pelicula(os.path.join(SALIDA, "agente.gif"), T_GOLPE - 0.45,
                 hitos["fin"] + RETARDO + D_BORRA + 0.35)
    if "--ronda" in sys.argv:
        # una vuelta entera, desde que la banda esta vacia hasta que vuelve
        # a estarlo; el resto del ciclo no tiene nada que mirar
        t0 = hitos["fin"] + ESPERA_RONDA
        pelicula(os.path.join(SALIDA, "ronda.gif"), t0 - 1.0,
                 t0 + ronda_reloj()[-1][1] + RETARDO + D_BORRA + 1.2)


if __name__ == "__main__":
    main()
