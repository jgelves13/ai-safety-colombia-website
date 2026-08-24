# -*- coding: utf-8 -*-
u"""El derrame simulado, no dibujado a mano.

El charco no se leia como hecho por el chorro porque no lo estaba: era un
ovalo que crecia con un scale, anclado bajo el punto de caida. Aqui se
simula el liquido de verdad y el charco aparece porque le llega masa.

Son dos solvers acoplados:

  1. Particulas en el corte vertical (y, z) del muro. Salen por el boquete,
     caen con gravedad, chocan contra el reborde de la base y se empujan
     entre ellas con una presion sacada de su propia densidad. Esa presion
     es la que hace que lo que se acumula en el reborde se derrame por el
     canto en vez de quedarse apilado.
  2. Aguas someras (shallow water) sobre el suelo z = 0. Cada particula que
     toca el suelo se disuelve ahi: entrega su masa y su cantidad de
     movimiento. El charco crece porque le llega masa, y su frente avanza a
     la velocidad de onda del propio solver. La huella de la caja es solido:
     el liquido la rodea, no pasa por debajo.

El dibujo no son dos figuras superpuestas. Los dos solvers se pintan en un
solo campo escalar de pantalla, las particulas como gotas gaussianas y la
lamina de agua como su propia profundidad, y se saca UN contorno de nivel.
Chorro y charco son literalmente la misma silueta, con su chaflan donde se
juntan, porque nunca fueron dos objetos.

    py -X utf8 scripts/fluido.py
"""
import io
import math
import os
import sys

import numpy as np
from scipy import ndimage
from skimage import measure

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

import heroes as H
import rotura as R

H.escala(0.78)
EX, EY, EZ = H._E[0], H._E[1], H._E[2]
O = R.O

SALIDA = os.path.join(os.path.dirname(R.SALIDA), "fluido")

# ---------------------------------------------------------------- encuadre

BW, BH = 1280.0, 521.0
K = BH / 1415.0
OX = BW - 1697.0 * K


def PB(x, y, z=0.0):
    u"""Del mundo a la banda de 1280x521."""
    return (OX + K * (O[0] + EX * (x - y)),
            K * (O[1] + EY * (x + y) - EZ * z))


# ------------------------------------------------------------- la geometria

MURO_Y = R.YB                    # 4.0, la cara del frente izquierdo
PISO = R.PISO                    # 0.12, la tapa de la base
BORDE = R.BORDE                  # 1.14, el canto del muro
BASE0, BASE1 = -0.3, 4.3         # la huella de la base
BOCA_X, BOCA_Z = R.BOCA_C        # 2.03, 0.63

G = 6.2                          # gravedad, en unidades de mundo


# ------------------------------------------------- 1. el corte vertical

CEL = 0.020
GY0, GY1 = 3.88, 5.10
GZ0, GZ1 = -0.08, 0.82
NGY = int(round((GY1 - GY0) / CEL))
NGZ = int(round((GZ1 - GZ0) / CEL))

RHO0 = 2.2                       # densidad de reposo
KP = 0.16                        # rigidez de la presion
VISC = 0.75                      # cuanto se pega cada gota a sus vecinas
REBOTE = 0.02                    # espeso: no rebota, se aplasta
ROCE = 4.8                        # roce del reborde, POR SEGUNDO

N_MAX = 9000
CAUDAL = 1050.0                   # particulas por segundo
ANCHO_JET = 0.145                 # medio ancho del chorro, sobre el eje x
ALTO_JET = 0.065
V_SALIDA = 0.58                  # apenas lo justo para cruzar el reborde


def _splat(campo, iy, iz, peso):
    u"""Reparte cada particula entre las cuatro celdas que la rodean."""
    i0 = np.floor(iy).astype(np.int32)
    j0 = np.floor(iz).astype(np.int32)
    fy, fz = iy - i0, iz - j0
    np.clip(i0, 0, NGY - 2, out=i0)
    np.clip(j0, 0, NGZ - 2, out=j0)
    for di, wy in ((0, 1.0 - fy), (1, fy)):
        for dj, wz in ((0, 1.0 - fz), (1, fz)):
            np.add.at(campo, (i0 + di, j0 + dj), peso * wy * wz)


def _muestra(campo, iy, iz):
    return ndimage.map_coordinates(campo, np.vstack([iy, iz]), order=1,
                                   mode="nearest")


class Corte(object):
    u"""Las particulas que van del boquete al suelo."""

    def __init__(self):
        self.x = np.zeros(N_MAX)
        self.y = np.zeros(N_MAX)
        self.z = np.zeros(N_MAX)
        self.vy = np.zeros(N_MAX)
        self.vz = np.zeros(N_MAX)
        self.n = 0
        self.deuda = 0.0
        self.rng = np.random.default_rng(7)

    def emite(self, dt, caudal):
        self.deuda += caudal * dt
        k = int(self.deuda)
        if k <= 0:
            return
        self.deuda -= k
        k = min(k, N_MAX - self.n)
        if k <= 0:
            return
        r = self.rng
        s = slice(self.n, self.n + k)
        self.x[s] = BOCA_X + r.uniform(-1, 1, k) * ANCHO_JET
        self.y[s] = MURO_Y + r.uniform(0.0, 0.02, k)
        self.z[s] = BOCA_Z + r.uniform(-1, 1, k) * ALTO_JET
        self.vy[s] = V_SALIDA * (0.6 + 0.8 * r.random(k))
        self.vz[s] = r.normal(0.0, 0.06, k)
        self.n += k

    def paso(self, dt):
        n = self.n
        if n == 0:
            return np.zeros(0), np.zeros(0), np.zeros(0)
        y = self.y[:n]
        z = self.z[:n]
        vy = self.vy[:n]
        vz = self.vz[:n]

        # presion: la densidad se arma en la rejilla del corte y su gradiente
        # devuelve el empuje. Es lo que derrama el reborde.
        iy = np.clip((y - GY0) / CEL, 0.5, NGY - 1.5)
        iz = np.clip((z - GZ0) / CEL, 0.5, NGZ - 1.5)
        rho = np.zeros((NGY, NGZ))
        _splat(rho, iy, iz, np.ones(n))
        rho = ndimage.gaussian_filter(rho, 1.5)
        pre = np.maximum(rho - RHO0, 0.0) * KP
        gy, gz = np.gradient(pre, CEL)
        ay = -_muestra(gy, iy, iz)
        az = -_muestra(gz, iy, iz) - G

        # viscosidad: cada gota se acerca a la velocidad media de su entorno
        my = np.zeros((NGY, NGZ))
        mz = np.zeros((NGY, NGZ))
        _splat(my, iy, iz, vy)
        _splat(mz, iy, iz, vz)
        peso = np.maximum(ndimage.gaussian_filter(rho, 1.0), 1e-3)
        my = ndimage.gaussian_filter(my, 1.5) / peso
        mz = ndimage.gaussian_filter(mz, 1.5) / peso
        vy += VISC * (_muestra(my, iy, iz) - vy)
        vz += VISC * (_muestra(mz, iy, iz) - vz)

        vy += ay * dt
        vz += az * dt
        np.clip(vy, -6.0, 6.0, out=vy)
        np.clip(vz, -8.0, 8.0, out=vz)
        y += vy * dt
        z += vz * dt

        # el muro: nada puede meterse hacia adentro de la cara
        pega = (y < MURO_Y) & (z > 0.0) & (z < BORDE)
        y[pega] = MURO_Y
        vy[pega] = np.maximum(vy[pega], 0.0)

        # el reborde de la base
        sobre = (y >= MURO_Y) & (y <= BASE1) & (z < PISO) & (vz < 0.0)
        z[sobre] = PISO
        vz[sobre] = np.maximum(vz[sobre] * -REBOTE, 0.0)
        vy[sobre] *= (1.0 - ROCE * dt)

        # el suelo: ahi se acaba la particula y empieza el agua
        cae = z <= 0.0
        if not cae.any():
            self.n = n
            return np.zeros(0), np.zeros(0), np.zeros(0)
        gx = self.x[:n][cae].copy()
        gyy = y[cae].copy()
        gv = vy[cae].copy()
        vive = ~cae
        m = int(vive.sum())
        for arr, src in ((self.x, self.x[:n]), (self.y, y), (self.z, z),
                         (self.vy, vy), (self.vz, vz)):
            arr[:m] = src[vive]
        self.n = m
        return gx, gyy, gv


# --------------------------------------------------- 2. el agua del suelo

# La banda cabe justo entre -14,0 y 7,4 en x y entre -5,3 y 16,1 en y. Como
# ahora el liquido llega hasta el borde del cuadro, la rejilla lleva cuatro
# unidades de margen por lado: las condiciones de contorno son periodicas y sin
# ese margen la inundacion daria la vuelta y reapareceria por la esquina
# contraria. El anillo exterior ademas se drena, ver ABSORBE.
WX0, WX1 = -19.4, 12.4
WY0, WY1 = -10.6, 21.2
NW = 278
DX = (WX1 - WX0) / NW

_gx = WX0 + (np.arange(NW) + 0.5) * DX
_gy = WY0 + (np.arange(NW) + 0.5) * DX
MX, MY = np.meshgrid(_gx, _gy, indexing="ij")
SOLIDO = ((MX > BASE0 - 0.06) & (MX < BASE1 + 0.06) &
          (MY > BASE0 - 0.06) & (MY < BASE1 + 0.06))
FLUIDO = (~SOLIDO).astype(float)

# Un liquido espeso se mueve como una lamina, no como agua: mucho roce de
# fondo y mucha difusion de cantidad de movimiento. El frente queda romo y
# avanza entero en vez de deshilacharse en dedos.
#
# La difusion es explicita, asi que NU y NUH no se pueden subir sin mirar: el
# paso aguanta mientras dt*NU dividido por DX al cuadrado quede por debajo de
# 0,25, o sea NU por debajo de 1,31 con dt de 0,0025 y DX de 0,114. Pasado ahi
# la lamina se llena de cuadros y revienta. Para frenar mas de lo que da esa
# cota se sube el roce del fondo, que no tiene ese limite.
CF = 12.0                        # roce del fondo: lo que hace que se asiente
NU = 1.15                        # viscosidad

# NUH difumina la profundidad, y esa difusion es la que planchaba el charco.
# Con 0,11 la longitud que alcanza a borrar en los dos segundos que tarda el
# frente en cruzar es de unas cuatro celdas, justo el tamano de los lobulos
# que dibuja el relieve del suelo: la lamina salia lisa y el charco quedaba
# ovalado. Con 0,05 los lobulos sobreviven. Es el estabilizador del campo de
# alturas, asi que bajarlo mas empieza a dejar ondas de una celda.
NUH = 0.05

# Fuera del cuadro el liquido se va. Sin esto se acumula contra el borde de la
# rejilla y el frente se frena justo donde tiene que seguir.
_borde = np.minimum(np.minimum(np.arange(NW)[:, None], NW - 1 - np.arange(NW)[:, None]),
                    np.minimum(np.arange(NW)[None, :], NW - 1 - np.arange(NW)[None, :]))
ABSORBE = np.clip(_borde / 14.0, 0.0, 1.0) ** 2


# El suelo no es una mesa de billar. Un charco tiene cara de charco porque el
# piso bajo el tiene lomos y hondonadas: el frente se atasca donde sube y corre
# donde baja, y de ahi salen los lobulos. Sin esto la lamina se extiende igual
# en todas direcciones y da un ovalo, que es lo que se veia.
#
# La amplitud se mide contra la pendiente del propio frente, no contra la
# profundidad del charco. El borde del contorno esta donde el agua llega a
# 0,012 de hondo, y ahi la lamina sube unos 0,0035 por celda: un lomo de altura
# d corre el borde unas d/0,0035 celdas. El charco mide unas treinta y seis
# celdas de ancho, asi que 0,030 da mordiscos de ocho, que es lo que se ve.
# Subirla mas empieza a dejar islas secas dentro del charco.
#
# El tamano de los lomos importa tanto como su altura. La primera version
# repartia el peso hacia la escala ancha, y una loma de ocho celdas tiene
# pendiente ocho veces menor que su altura: el frente ni se entera. Aqui pesan
# casi igual las tres escalas, y la normalizacion va por desviacion tipica y no
# por el maximo, que lo fija un solo pico y aplana todo lo demas.
AMP_SUELO = 0.030
SEMILLA_SUELO = 7


def _relieve(amp=AMP_SUELO, semilla=SEMILLA_SUELO):
    u"""Un piso con lomos, de media cero y con la caja plana debajo."""
    rng = np.random.RandomState(semilla)
    r = rng.standard_normal((NW, NW))
    b = (ndimage.gaussian_filter(r, 7.0) * 7.0 +
         ndimage.gaussian_filter(r, 3.0) * 2.6 +
         ndimage.gaussian_filter(r, 1.4) * 1.0)
    b = b - b.mean()
    b = b / (b.std() + 1e-9) * amp
    # Bajo la huella de la caja el relieve no pinta nada y solo mete gradientes
    # contra una pared solida, asi que se aplana.
    return b * (1.0 - ndimage.gaussian_filter(SOLIDO.astype(float), 2.0))


SUELO = _relieve()


def _ddx(a):
    return (np.roll(a, -1, 0) - np.roll(a, 1, 0)) / (2.0 * DX)


def _ddy(a):
    return (np.roll(a, -1, 1) - np.roll(a, 1, 1)) / (2.0 * DX)


def _lap(a):
    return (np.roll(a, -1, 0) + np.roll(a, 1, 0) +
            np.roll(a, -1, 1) + np.roll(a, 1, 1) - 4.0 * a) / (DX * DX)


def _divx(q, u):
    """Divergencia de q*u, upwind sobre el signo de la velocidad en la cara.
    Con diferencias centradas la advecion se llena de ondas de una celda y el
    agua revienta; el upwind las disipa."""
    uf = 0.5 * (u + np.roll(u, -1, 0))
    f = np.where(uf > 0.0, q, np.roll(q, -1, 0)) * uf
    return (f - np.roll(f, 1, 0)) / DX


def _divy(q, v):
    vf = 0.5 * (v + np.roll(v, -1, 1))
    g = np.where(vf > 0.0, q, np.roll(q, -1, 1)) * vf
    return (g - np.roll(g, 1, 1)) / DX


UMAX = 8.0
# Tope de seguridad, no de diseno. Con 2,5 la masa extra que hace falta para
# que el frente no se frene se tiraba a la basura y la inundacion se detenia
# sola. El limite real lo pone el CFL: el paso aguanta mientras dt*raiz(g*h)
# sea menor que DX, o sea h por debajo de 42 con g=50 y DX=0,114. Que el charco
# quede hondo junto al boquete no se ve: el contorno solo pregunta si hay
# liquido, no cuanto.
HMAX = 22.0


def paso_agua(h, hu, hv, dt, g):
    eps = 1e-5
    u = np.clip(hu / np.maximum(h, eps), -UMAX, UMAX)
    v = np.clip(hv / np.maximum(h, eps), -UMAX, UMAX)
    hn = h - dt * (_divx(h, u) + _divy(h, v)) + dt * NUH * _lap(h)
    hu = (hu - dt * (_divx(hu, u) + _divy(hu, v)) - dt * g * h * _ddx(h + SUELO)
          - dt * CF * hu + dt * NU * _lap(hu))
    hv = (hv - dt * (_divx(hv, u) + _divy(hv, v)) - dt * g * h * _ddy(h + SUELO)
          - dt * CF * hv + dt * NU * _lap(hv))
    h = np.clip(hn, 0.0, HMAX)
    # la caja es solida: lo que entro en su huella se devuelve a los vecinos
    dentro = h * SOLIDO
    if dentro.any():
        h = h - dentro
        vuelta = (np.roll(dentro, 1, 0) + np.roll(dentro, -1, 0) +
                  np.roll(dentro, 1, 1) + np.roll(dentro, -1, 1)) * 0.25
        h = h + vuelta * FLUIDO
    h = h * ABSORBE
    hu = np.clip(hu * FLUIDO * ABSORBE, -h * UMAX, h * UMAX)
    hv = np.clip(hv * FLUIDO * ABSORBE, -h * UMAX, h * UMAX)
    return h, hu, hv


def vierte(h, hv, gx, gy, gv, masa):
    """Cada particula que toco el suelo deja ahi su masa y su empuje. Se
    reparte con un poco de borrosidad: toda la masa en una sola celda es un
    pico que el solver no aguanta."""
    if gx.size == 0 or masa <= 0.0:
        return
    i = np.clip(((gx - WX0) / DX).astype(np.int32), 2, NW - 3)
    j = np.clip(((gy - WY0) / DX).astype(np.int32), 2, NW - 3)
    caida = np.zeros_like(h)
    np.add.at(caida, (i, j), masa)
    caida = ndimage.gaussian_filter(caida, 1.1)
    h += caida * FLUIDO
    empuje = np.zeros_like(h)
    np.add.at(empuje, (i, j), masa * gv * 0.9)
    hv += ndimage.gaussian_filter(empuje, 1.1) * FLUIDO


# --------------------------------------------------------- 3. el contorno

FW, FH = 640, 261
SF = BW / FW

_fx = (np.arange(FW) + 0.5) * SF
_fy = (np.arange(FH) + 0.5) * SF
_BX, _BY = np.meshgrid(_fx, _fy, indexing="ij")
_IX = (_BX - OX) / K
_IY = _BY / K
_u = (_IX - O[0]) / EX
_v = (_IY - O[1]) / EY
_WXf = (_u + _v) * 0.5
_WYf = (_v - _u) * 0.5
COORD = np.vstack([((_WXf - WX0) / DX).ravel(),
                   ((_WYf - WY0) / DX).ravel()])

SIGMA_P = 3.1                    # radio de cada gota en pixeles del campo
GANANCIA = 13.5                  # cuanto pinta cada gota en el campo
HREF = 0.024                     # profundidad a la que el agua ya es opaca
NIVEL = 1.0


def campo(corte, h):
    u"""Un solo campo escalar: gotas mas lamina. De ahi sale una sola linea."""
    c = np.zeros((FW, FH))
    n = corte.n
    if n:
        bx = OX + K * (O[0] + EX * (corte.x[:n] - corte.y[:n]))
        by = K * (O[1] + EY * (corte.x[:n] + corte.y[:n]) - EZ * corte.z[:n])
        fx = np.clip(bx / SF, 0, FW - 1.01)
        fy = np.clip(by / SF, 0, FH - 1.01)
        i0 = fx.astype(np.int32)
        j0 = fy.astype(np.int32)
        a, b = fx - i0, fy - j0
        for di, wa in ((0, 1 - a), (1, a)):
            for dj, wb in ((0, 1 - b), (1, b)):
                np.add.at(c, (np.minimum(i0 + di, FW - 1),
                              np.minimum(j0 + dj, FH - 1)), wa * wb)
        c = ndimage.gaussian_filter(c, SIGMA_P) * GANANCIA
    agua = ndimage.map_coordinates(h, COORD, order=1, mode="constant")
    agua = agua.reshape(FW, FH) / HREF * 2.0
    return np.minimum(c, 3.0) + np.minimum(agua, 2.6)


def _remuestrea(pts, n):
    d = np.sqrt(((np.roll(pts, -1, 0) - pts) ** 2).sum(1))
    s = np.concatenate([[0.0], np.cumsum(d)])
    total = s[-1]
    if total <= 0:
        return None
    t = np.linspace(0.0, total, n, endpoint=False)
    out = np.empty((n, 2))
    for k in range(2):
        out[:, k] = np.interp(t, s, np.concatenate([pts[:, k], pts[:1, k]]))
    return out


def _bezier(pts):
    n = len(pts)
    d = ["M%.0f,%.0f" % (pts[0][0], pts[0][1])]
    for i in range(n):
        p0, p1 = pts[(i - 1) % n], pts[i]
        p2, p3 = pts[(i + 1) % n], pts[(i + 2) % n]
        c1 = (p1[0] + (p2[0] - p0[0]) / 6.0, p1[1] + (p2[1] - p0[1]) / 6.0)
        c2 = (p2[0] - (p3[0] - p1[0]) / 6.0, p2[1] - (p3[1] - p1[1]) / 6.0)
        d.append("C%.0f,%.0f %.0f,%.0f %.0f,%.0f"
                 % (c1[0], c1[1], c2[0], c2[1], p2[0], p2[1]))
    d.append("Z")
    return "".join(d)


def siluetas(c, npts=64, minlargo=26.0, maxsub=3):
    u"""Las lineas de nivel del campo, en coordenadas de la banda."""
    out = []
    for con in measure.find_contours(c.T, NIVEL):
        pts = np.column_stack([con[:, 1] * SF, con[:, 0] * SF])
        largo = np.sqrt(((np.roll(pts, -1, 0) - pts) ** 2).sum(1)).sum()
        if largo < minlargo:
            continue
        pts = ndimage.gaussian_filter1d(pts, 1.5, axis=0, mode="wrap")
        r = _remuestrea(pts, npts)
        if r is not None:
            out.append((largo, r))
    out.sort(key=lambda t: -t[0])
    return [p for _, p in out[:maxsub]]


# ------------------------------------------------------------- 4. la corrida

DT = 0.0025
FPS = 24.0
# Cuando se rompe el muro, en reloj de simulacion. Va a la mitad de lo que
# estaba porque el reloj de pantalla se duplico: el muro se sigue rompiendo
# en el mismo instante de la pagina, 1,37 s, pero ahora ese instante se
# alcanza con la mitad de segundos simulados. Quien lo mueva tiene que mover
# con el los retrasos del CSS y de la grieta de rotura.py, que estan escritos
# en la misma escala.
T_GOLPE = 0.36
T_FIN = 8.4

# El frente tiene que avanzar a paso constante, y una lamina viscosa que se
# alimenta a caudal fijo se frena: el area mojada crece y la misma masa se
# reparte en mas sitio. Para que el borde recorra los mismos pixeles cada
# segundo hay que meter masa como una potencia del tiempo. EXP_MASA es ese
# exponente, ajustado midiendo el alcance del contorno cuadro a cuadro.
EXP_MASA = 1.80
MASA0 = 0.020


# La caja pierde la presion, pero no se vacia. El chorro pasa de derrame a
# hilo y se queda en hilo: sigue cayendo cuando el charco ya esta hecho. Antes
# se cerraba del todo, y cerrar del todo deja el ultimo cuadro sin nada que se
# mueva, que es una foto y no un final.
#
# Los tres tiempos van en el reloj de la rotura, que es el que reciben caudal y
# masa. Una version anterior medio el cierre contra el final de la corrida, que
# va en reloj de pared, y la diferencia entre uno y otro se comia el cierre
# entero: la caja seguia a presion en el ultimo cuadro.
T_MENGUA = 0.88                  # cuando el boquete deja de dar de si
MENGUA = 0.45                    # lo que tarda en pasar de chorro a hilo
COLA = 0.85                      # lo que se deja correr ya con el hilo puesto

# El hilo tiene dos residuos y no uno, porque lo que se ve y lo que moja son
# cosas distintas y hacen falta las dos a la vez.
#
# RESIDUO es cuantas gotas siguen saliendo, y decide si el hilo se ve. El
# contorno se traza donde el campo llega a NIVEL, y el chorro es apenas dos
# radios de desenfoque de ancho, asi que su pico va con el caudal y punto. Con
# 0,12 el pico se quedaba en 0,9 y el hilo no salia en el contorno: el ultimo
# tramo de la escena se veia como un charco pegado a la caja, sin nada cayendo.
# La frontera esta cerca de 0,21; 0,26 deja el pico en torno a 1,7.
#
# RESIDUO_M es cuanto deja en el suelo cada una de esas gotas, y decide el
# tamano del charco. Lo que manda sobre el frente es el producto de los dos, y
# ese producto vale 0,12, que es el alcance de 219 px que Jose aprobo. Quien
# suba uno tiene que bajar el otro en la misma proporcion, o el charco se pasa.
RESIDUO = 0.26
RESIDUO_M = 0.46


def _suave(t):
    u"""De uno a cero mientras el chorro adelgaza, con las dos puntas planas.

    Es un suavizado de tercer grado y no una recta porque el corte de una recta
    tiene esquina: la velocidad del frente cambiaria de golpe en el instante en
    que el chorro empieza a adelgazar, y ese quiebre se ve."""
    x = (T_MENGUA + MENGUA - t) / MENGUA
    if x >= 1.0:
        return 1.0
    if x <= 0.0:
        return 0.0
    return x * x * (3.0 - 2.0 * x)


def caudal(t):
    u"""Cuantas gotas salen por el boquete: el derrame primero, el hilo
    despues."""
    if t < 0.0:
        return 0.0
    return CAUDAL * (RESIDUO + (1.0 - RESIDUO) * _suave(t))


def masa(t):
    u"""Lo que cada gota deja en el suelo, creciendo como una potencia del
    tiempo para que el frente no pierda velocidad. Arranca en la rotura: si
    espera, el charco se asienta primero y se ve el frenazo.

    Deja de crecer cuando el chorro se queda en hilo, y ademas se encoge con el:
    las gotas del hilo cargan menos de la mitad que las del derrame. Asi el
    charco sigue engordando, pero reparte cada vez menos en cada vez mas
    superficie, y el frente se va parando solo, que es como se para un charco de
    verdad. Sin lo segundo el hilo acabaria acelerando la inundacion otra vez,
    porque para que se vea hacen falta el doble de gotas de las que el charco
    aguanta."""
    if t < 0.0:
        return 0.0
    return (MASA0 * (1.0 + min(t, T_MENGUA + MENGUA)) ** EXP_MASA
            * (RESIDUO_M + (1.0 - RESIDUO_M) * _suave(t)))


def grav_agua(t):
    u"""Constante: lo que regula el avance es la masa que entra, no un
    empujon que crece. Con el roce alto de un liquido espeso, esta es la que
    da un frente romo que se mueve entero."""
    return 50.0


def corre(al_frame):
    corte = Corte()
    h = np.zeros((NW, NW))
    hu = np.zeros((NW, NW))
    hv = np.zeros((NW, NW))
    t = 0.0
    prox = 0.0
    k = 0
    while t < T_FIN:
        tl = t - T_GOLPE
        corte.emite(DT, caudal(tl))
        gx, gy, gv = corte.paso(DT)
        vierte(h, hv, gx, gy, gv, masa(tl))
        h, hu, hv = paso_agua(h, hu, hv, DT, grav_agua(tl))
        if not np.isfinite(h).all():
            raise RuntimeError("el agua exploto en t=%.2f" % t)
        t += DT
        if t >= prox:
            al_frame(k, t, corte, h)
            k += 1
            prox += 1.0 / FPS
    return k
