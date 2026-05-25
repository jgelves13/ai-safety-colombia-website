"""Bake per-category thumbnails for the /recursos/ featured cards.

Within each category the output is a single (width, height) at a single
treatment so every card in the row reads as identical. Across categories
the dimensions/treatment vary by kind:

  videos     800x800  center on accent plate (channel avatars)
  courses    800x800  center on accent plate (org logos)
  readings   800x800  center on accent plate (publisher logos)
  podcasts   800x800  full-bleed (real podcast cover art)
  books      600x900  full-bleed (real portrait book covers)

Sources live in src/assets/resources-fresh/ and are committed alongside
the bake output in src/assets/resources-baked/.
"""

from __future__ import annotations

from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "src" / "assets" / "resources-fresh"
OUT = ROOT / "src" / "assets" / "resources-baked"
OUT.mkdir(parents=True, exist_ok=True)

PAPER = (255, 251, 242)

ACCENTS = {
    "coral":  (229, 96, 77),
    "blue":   (74, 132, 102),
    "green":  (31, 77, 50),
    "yellow": (212, 169, 56),
}

ACCENT_OPACITY = {
    "coral":  0.10,
    "blue":   0.10,
    "green":  0.08,
    "yellow": 0.12,
}

DIMS = {
    "video":   (800, 800),
    "course":  (800, 800),
    "read":    (800, 800),
    "podcast": (800, 800),
    "book":    (600, 900),
}

INNER_SCALE = {
    "video":  0.78,
    "course": 0.72,
    "read":   0.72,
}

# (source file, kind, accent, mode)
SOURCES: list[tuple[str, str, str, str]] = [
    ("robert-miles.jpg",        "video",   "coral",  "center"),
    ("rational-animations.jpg", "video",   "coral",  "center"),
    ("doom-debates.jpg",        "video",   "coral",  "center"),
    ("mlst.jpg",                "video",   "coral",  "center"),
    ("bluedot.png",             "course",  "blue",   "center"),
    ("deepmind.png",            "course",  "blue",   "center"),
    ("arena.png",               "course",  "blue",   "center"),
    ("cais.png",                "course",  "blue",   "center"),
    ("80k.png",                 "read",    "green",  "center"),
    ("alignment-forum.png",     "read",    "green",  "center"),
    ("arxiv.png",               "read",    "green",  "center"),
    ("anthropic.png",           "read",    "green",  "center"),
    ("axrp.jpg",                "podcast", "yellow", "cover"),
    ("80k-podcast.jpg",         "podcast", "yellow", "cover"),
    ("inside-view.jpg",         "podcast", "yellow", "cover"),
    ("dwarkesh.jpg",            "podcast", "yellow", "cover"),
    ("fli-podcast.jpg",         "podcast", "yellow", "cover"),
    ("alignment-problem.jpg",   "book",    "green",  "cover"),
    ("human-compatible.jpg",    "book",    "green",  "cover"),
    ("superintelligence.jpg",   "book",    "green",  "cover"),
    ("if-anyone-builds-it.jpg", "book",    "green",  "cover"),
]


def tinted_background(accent: str, size: tuple[int, int]) -> Image.Image:
    r, g, b = ACCENTS[accent]
    a = ACCENT_OPACITY[accent]
    pr, pg, pb = PAPER
    mix = (
        round(pr * (1 - a) + r * a),
        round(pg * (1 - a) + g * a),
        round(pb * (1 - a) + b * a),
    )
    return Image.new("RGB", size, mix)


def fit_inside(img: Image.Image, max_w: int, max_h: int) -> Image.Image:
    w, h = img.size
    scale = min(max_w / w, max_h / h)
    return img.resize((max(1, round(w * scale)), max(1, round(h * scale))), Image.LANCZOS)


def fill_cover(img: Image.Image, w: int, h: int) -> Image.Image:
    iw, ih = img.size
    scale = max(w / iw, h / ih)
    nw, nh = max(1, round(iw * scale)), max(1, round(ih * scale))
    resized = img.resize((nw, nh), Image.LANCZOS)
    left = (nw - w) // 2
    top = (nh - h) // 2
    return resized.crop((left, top, left + w, top + h))


def bake(name: str, kind: str, accent: str, mode: str) -> None:
    src = SRC / name
    if not src.exists():
        raise FileNotFoundError(src)
    width, height = DIMS[kind]
    img = Image.open(src).convert("RGBA")

    if mode == "cover":
        canvas = fill_cover(img, width, height).convert("RGB")
    else:
        inner = INNER_SCALE[kind]
        canvas = tinted_background(accent, (width, height))
        fitted = fit_inside(img, round(width * inner), round(height * inner))
        x = (width - fitted.width) // 2
        y = (height - fitted.height) // 2
        canvas.paste(fitted, (x, y), fitted)

    out_path = OUT / (Path(name).stem + ".png")
    canvas.save(out_path, format="PNG", optimize=True)
    print(f"baked {out_path.relative_to(ROOT)}  {width}x{height}  ({mode})")


def main() -> None:
    for entry in SOURCES:
        bake(*entry)
    print(f"\nWrote {len(SOURCES)} thumbnails to {OUT.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
