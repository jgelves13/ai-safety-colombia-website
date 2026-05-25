"""Bake uniform 800x800 thumbnails for the /recursos/ featured cards.

Each source image is fit to ~72% of the canvas (centered, aspect preserved)
on top of a paper-colored field tinted with the card's accent. The result
is a set of visually identical plates that the component can drop in with
a single object-fit rule and no per-card padding tricks.
"""

from __future__ import annotations

from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
RES = ROOT / "src" / "assets" / "resources"
LEARN = ROOT / "src" / "assets" / "learn"
OUT = ROOT / "src" / "assets" / "resources-baked"
OUT.mkdir(parents=True, exist_ok=True)

CANVAS = 800
INNER = int(CANVAS * 0.72)
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

# filename in source folder -> accent key
SOURCES: list[tuple[Path, str, str]] = [
    (RES / "robert-miles.png",         "coral",  "robert-miles.png"),
    (RES / "rational-animations.png",  "coral",  "rational-animations.png"),
    (LEARN / "bluedot-future-of-ai.png", "blue", "bluedot-future-of-ai.png"),
    (RES / "deepmind.png",             "blue",   "deepmind.png"),
    (RES / "arena.png",                "blue",   "arena.png"),
    (RES / "cais.png",                 "blue",   "cais.png"),
    (LEARN / "80k-ai-catastrophe.jpg", "green",  "80k-ai-catastrophe.png"),
    (RES / "alignment-forum.png",      "green",  "alignment-forum.png"),
    (RES / "arxiv.jpg",                "green",  "arxiv.png"),
    (RES / "anthropic-core-views.png", "green",  "anthropic-core-views.png"),
    (RES / "axrp.jpg",                 "yellow", "axrp.png"),
    (RES / "80k-podcast.jpg",          "yellow", "80k-podcast.png"),
    (RES / "inside-view.png",          "yellow", "inside-view.png"),
    (RES / "alignment-problem.png",    "green",  "alignment-problem.png"),
    (RES / "human-compatible.jpg",     "green",  "human-compatible.png"),
    (RES / "superintelligence.jpg",    "green",  "superintelligence.png"),
    (RES / "if-anyone-builds-it.png",  "green",  "if-anyone-builds-it.png"),
]


def tinted_background(accent: str) -> Image.Image:
    r, g, b = ACCENTS[accent]
    a = ACCENT_OPACITY[accent]
    pr, pg, pb = PAPER
    mix = (
        round(pr * (1 - a) + r * a),
        round(pg * (1 - a) + g * a),
        round(pb * (1 - a) + b * a),
    )
    return Image.new("RGB", (CANVAS, CANVAS), mix)


def fit_inside(img: Image.Image, max_side: int) -> Image.Image:
    w, h = img.size
    scale = min(max_side / w, max_side / h)
    new_w = max(1, round(w * scale))
    new_h = max(1, round(h * scale))
    return img.resize((new_w, new_h), Image.LANCZOS)


def bake(source: Path, accent: str, out_name: str) -> None:
    if not source.exists():
        raise FileNotFoundError(source)
    canvas = tinted_background(accent)
    img = Image.open(source).convert("RGBA")
    fitted = fit_inside(img, INNER)
    x = (CANVAS - fitted.width) // 2
    y = (CANVAS - fitted.height) // 2
    canvas.paste(fitted, (x, y), fitted)
    out_path = OUT / out_name
    canvas.save(out_path, format="PNG", optimize=True)
    print(f"baked {out_path.relative_to(ROOT)}  ({fitted.width}x{fitted.height})")


def main() -> None:
    for src, accent, out_name in SOURCES:
        bake(src, accent, out_name)
    print(f"\nWrote {len(SOURCES)} thumbnails to {OUT.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
