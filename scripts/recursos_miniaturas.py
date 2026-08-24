# -*- coding: utf-8 -*-
"""Hornea las miniaturas de /recursos.

Dentro de cada grupo todas las miniaturas salen del mismo tamano y con el
mismo tratamiento, para que la fila entera se lea pareja:

  canales   800x800  el avatar centrado sobre una placa con tinte coral
  podcasts  800x800  la caratula a sangre
  libros    600x900  la portada a sangre, en su proporcion de libro

Los canales llevan placa porque un avatar de YouTube es un logo: a sangre
llenaria el cuadro con fondo plano y cada tarjeta pesaria distinto. Las
caratulas y las portadas si son imagenes completas y se dejan enteras.

Las fuentes estan en scripts/recursos-fuente/ y se versionan junto con la
salida, que va a public/aisc/recursos/.
"""

from __future__ import annotations

from pathlib import Path

from PIL import Image

RAIZ = Path(__file__).resolve().parents[1]
FUENTE = RAIZ / "scripts" / "recursos-fuente"
SALIDA = RAIZ / "public" / "aisc" / "recursos"

PAPEL = (251, 246, 236)   # --color-aisc-cream
CORAL = (229, 96, 77)     # --color-aisc-coral
TINTE = 0.10

MEDIDAS = {
    "canal": (800, 800),
    "podcast": (800, 800),
    "libro": (600, 900),
}

# cuanto del cuadro ocupa el avatar dentro de la placa
DENTRO = 0.78

# (archivo fuente, grupo)
PIEZAS: list[tuple[str, str]] = [
    ("robert-miles.jpg", "canal"),
    ("rational-animations.jpg", "canal"),
    ("siliconversations.jpg", "canal"),
    ("doom-debates.jpg", "canal"),
    ("axrp.jpg", "podcast"),
    ("80k-podcast.jpg", "podcast"),
    ("cognitive-revolution.jpg", "podcast"),
    ("fli-podcast.jpg", "podcast"),
    ("alignment-problem.jpg", "libro"),
    ("human-compatible.jpg", "libro"),
    ("superintelligence.jpg", "libro"),
    ("if-anyone-builds-it.jpg", "libro"),
]


def placa(medida: tuple[int, int]) -> Image.Image:
    mezcla = tuple(round(p * (1 - TINTE) + c * TINTE) for p, c in zip(PAPEL, CORAL))
    return Image.new("RGB", medida, mezcla)


def caber_dentro(img: Image.Image, ancho: int, alto: int) -> Image.Image:
    w, h = img.size
    f = min(ancho / w, alto / h)
    return img.resize((max(1, round(w * f)), max(1, round(h * f))), Image.LANCZOS)


def llenar(img: Image.Image, ancho: int, alto: int) -> Image.Image:
    w, h = img.size
    f = max(ancho / w, alto / h)
    nw, nh = max(1, round(w * f)), max(1, round(h * f))
    esc = img.resize((nw, nh), Image.LANCZOS)
    x = (nw - ancho) // 2
    y = (nh - alto) // 2
    return esc.crop((x, y, x + ancho, y + alto))


def hornear(nombre: str, grupo: str) -> None:
    origen = FUENTE / nombre
    if not origen.exists():
        raise FileNotFoundError(origen)
    ancho, alto = MEDIDAS[grupo]
    img = Image.open(origen).convert("RGBA")

    if grupo == "canal":
        lienzo = placa((ancho, alto))
        cabe = caber_dentro(img, round(ancho * DENTRO), round(alto * DENTRO))
        lienzo.paste(cabe, ((ancho - cabe.width) // 2, (alto - cabe.height) // 2), cabe)
    else:
        lienzo = llenar(img, ancho, alto).convert("RGB")

    destino = SALIDA / (Path(nombre).stem + ".webp")
    lienzo.save(destino, format="WEBP", quality=82, method=6)
    print(f"{destino.relative_to(RAIZ)}  {ancho}x{alto}  {destino.stat().st_size // 1024} KB")


def main() -> None:
    SALIDA.mkdir(parents=True, exist_ok=True)
    for pieza in PIEZAS:
        hornear(*pieza)
    print(f"\n{len(PIEZAS)} miniaturas en {SALIDA.relative_to(RAIZ)}")


if __name__ == "__main__":
    main()
