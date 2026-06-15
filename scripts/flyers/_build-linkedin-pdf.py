"""Compose the 6-piece hackathon carousel into a LinkedIn-ready PDF.

Uses img2pdf for maximally compatible output (PDF 1.4, no fancy features that
LinkedIn parsers might reject). Embeds JPEGs without re-encoding; PNGs are
flattened to JPEG q95 4:4:4 in memory before being embedded.
"""
import io
from pathlib import Path
from PIL import Image
import img2pdf

SRC = Path(r"G:\Mon Drive\AI Safety Colombia\ai-safety-colombia-website\scripts\flyers\dist\instagram")
ONEDRIVE = Path(r"C:\Users\joseg\OneDrive - Universidad de los andes\Jose\Imágenes\AI Safety Colombia\Carrusel Hackathon")

PAGES = [
    SRC / "01-lanzamiento.jpeg",
    SRC / "02-que-es.png",
    SRC / "03-tracks.png",
    SRC / "04-ponentes.png",
    SRC / "05-jurado.png",
    SRC / "06-premio.png",
]

OUT = ONEDRIVE / "AISC-Hackathon-Carrusel.pdf"

def as_jpeg_bytes(p: Path) -> bytes:
    if p.suffix.lower() in (".jpg", ".jpeg"):
        return p.read_bytes()
    im = Image.open(p)
    if im.mode != "RGB":
        bg = Image.new("RGB", im.size, (251, 246, 236))
        if im.mode in ("RGBA", "LA"):
            bg.paste(im, mask=im.split()[-1])
        else:
            bg.paste(im.convert("RGB"))
        im = bg
    assert im.size == (1080, 1350), f"{p.name} is {im.size}"
    buf = io.BytesIO()
    im.save(buf, format="JPEG", quality=95, subsampling=0, optimize=True)
    return buf.getvalue()

jpegs = [as_jpeg_bytes(p) for p in PAGES]
# Fixed 150 DPI layout → page size 1080/150 = 7.2 in × 1350/150 = 9 in
layout = img2pdf.get_fixed_dpi_layout_fun((150, 150))
pdf = img2pdf.convert(jpegs, layout_fun=layout)
OUT.write_bytes(pdf)
print(f"wrote {OUT} ({len(pdf)//1024} KB, {len(jpegs)} pages)")
