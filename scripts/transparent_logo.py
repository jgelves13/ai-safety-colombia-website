"""One-shot: make the OUTER white of logo.png transparent (border flood-fill),
preserving the logo's interior white accent lines, then derive transparent
favicon/apple-touch icons from the cropped mark.

Run: py scripts/transparent_logo.py
"""
from collections import deque
from pathlib import Path
from PIL import Image

PUB = Path(__file__).resolve().parent.parent / "public"
SRC = PUB / "logo.png"

NEAR_WHITE = 238  # min(R,G,B) >= this counts as removable background


def is_bg(px):
    r, g, b, a = px
    return a > 0 and min(r, g, b) >= NEAR_WHITE


def clear_outer_white(img):
    """BFS flood-fill from every border pixel through near-white regions,
    so border-disconnected interior whites (accent lines) survive."""
    w, h = img.size
    px = img.load()
    q = deque()
    seen = bytearray(w * h)

    def push(x, y):
        i = y * w + x
        if not seen[i]:
            seen[i] = 1
            q.append((x, y))

    for x in range(w):
        push(x, 0)
        push(x, h - 1)
    for y in range(h):
        push(0, y)
        push(w - 1, y)

    cleared = 0
    while q:
        x, y = q.popleft()
        r, g, b, a = px[x, y]
        if not is_bg((r, g, b, a)):
            continue
        px[x, y] = (r, g, b, 0)
        cleared += 1
        if x > 0:
            push(x - 1, y)
        if x < w - 1:
            push(x + 1, y)
        if y > 0:
            push(x, y - 1)
        if y < h - 1:
            push(x, y + 1)
    return cleared


def main():
    img = Image.open(SRC).convert("RGBA")
    w, h = img.size
    cleared = clear_outer_white(img)
    img.save(SRC)
    print(f"logo.png: cleared {cleared} px of outer white ({w}x{h})")

    # logo-white.png is the same colored mark on a white box (misnamed); the
    # dark footer needs it transparent too. Same flood-fill applies.
    wl = PUB / "logo-white.png"
    if wl.exists():
        wi = Image.open(wl).convert("RGBA")
        wc = clear_outer_white(wi)
        wi.save(wl)
        print(f"logo-white.png: cleared {wc} px of outer white ({wi.size[0]}x{wi.size[1]})")

    # Tight crop to the visible mark, pad to a centered square, transparent.
    bbox = img.getbbox()
    mark = img.crop(bbox)
    side = max(mark.size)
    sq = Image.new("RGBA", (side, side), (0, 0, 0, 0))
    sq.paste(mark, ((side - mark.size[0]) // 2, (side - mark.size[1]) // 2))

    for name, size in (("favicon.png", 256), ("apple-touch-icon.png", 180)):
        sq.resize((size, size), Image.LANCZOS).save(PUB / name)
        print("wrote", name, f"{size}x{size}")


if __name__ == "__main__":
    main()
