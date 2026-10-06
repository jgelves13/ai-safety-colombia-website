"""Dibuja el triángulo del logo como haces de líneas finas paralelas.

Cada trazo del logo (el triángulo de afuera, el de adentro, las tres aristas
que los unen y las tres que suben al centro) se pinta como un haz: trazos
anidados, alternando el color de la línea y el del fondo, así que las juntas
salen redondas y donde un haz cruza a otro pasa por encima con su propio aire.
Correr con `py scripts/arte-triangulo.py` para regenerar los SVG de public/aisc/patterns.
"""
from pathlib import Path

SALIDA = Path(__file__).resolve().parent.parent / "public" / "aisc" / "patterns"

# El logo medido sobre logo-marca.png (296 × 240).
EXT = [(0, 0), (296, 0), (148, 240)]
INT = [(68, 40), (232, 40), (151, 166)]
CENTRO = (151, 79)


def trazo(puntos, cerrado=False):
    d = "M" + " L".join(f"{x:.1f} {y:.1f}" for x, y in puntos)
    return d + (" Z" if cerrado else "")


def haz(d, lineas, sep, grosor, color, fondo):
    """Un haz de `lineas` paralelas (par) separadas `sep`, de `grosor` cada una."""
    capas = []
    for j in range(lineas // 2, 0, -1):
        ancho = (2 * j - 1) * sep
        capas.append(f'<path d="{d}" stroke="{color}" stroke-width="{ancho + grosor:.2f}"/>')
        capas.append(f'<path d="{d}" stroke="{fondo}" stroke-width="{ancho - grosor:.2f}"/>')
    return "\n".join(capas)


def dibujo(escala, dx, dy, lineas, sep, grosor, color, fondo):
    t = lambda p: (p[0] * escala + dx, p[1] * escala + dy)
    ext = [t(p) for p in EXT]
    inn = [t(p) for p in INT]
    c = t(CENTRO)
    partes = []
    # De abajo hacia arriba: lo que va encima se dibuja después.
    for a, b in zip(ext, inn):
        partes.append(haz(trazo([a, b]), lineas, sep, grosor, color, fondo))
    for b in inn:
        partes.append(haz(trazo([c, b]), lineas, sep, grosor, color, fondo))
    partes.append(haz(trazo(inn, True), lineas, sep, grosor, color, fondo))
    partes.append(haz(trazo(ext, True), lineas, sep, grosor, color, fondo))
    return "\n".join(partes)


def svg(ancho, alto, cuerpo, fondo=None):
    rect = f'<rect width="{ancho}" height="{alto}" fill="{fondo}"/>' if fondo else ""
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {ancho} {alto}" '
        f'fill="none" stroke-linejoin="round" stroke-linecap="round">{rect}\n{cuerpo}\n</svg>\n'
    )


# Los fondos tienen que ser exactos, porque cada haz tapa lo de abajo con el
# color del fondo: bg-aisc-forest-deep para el hero y bg-aisc-sand para las tarjetas.
VERDE = "#143620"
LINEA = "#5f9f77"
TINTE = "#edf3ee"
SALVIA = "#3e7256"

# Las tres tarjetas de investigación: tres encuadres distintos del mismo dibujo.
TARJETAS = [
    ("aisc-investigacion-1.svg", 2.6, -90, -40),    # el nudo del centro
    ("aisc-investigacion-2.svg", 3.4, -230, -360),  # el vértice del triángulo de adentro
    ("aisc-investigacion-3.svg", 3.0, 20, 10),      # la arista de la izquierda
]

if __name__ == "__main__":
    SALIDA.mkdir(parents=True, exist_ok=True)
    # El hero: el triángulo grande, recostado a la derecha y cortado arriba.
    hero = dibujo(3.3, 40, -150, 8, 6, 1.2, LINEA, VERDE)
    (SALIDA / "aisc-triangulo-haces.svg").write_text(svg(1060, 680, hero, VERDE), encoding="utf-8")
    for nombre, escala, dx, dy in TARJETAS:
        cuerpo = dibujo(escala, dx, dy, 6, 5, 1, SALVIA, TINTE)
        (SALIDA / nombre).write_text(svg(600, 340, cuerpo, TINTE), encoding="utf-8")
    print("ok")
