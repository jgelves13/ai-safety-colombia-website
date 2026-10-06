/* La primera página de cada publicación, sacada del PDF que publicó el editor
   (`public/aisc/publicaciones/`). Se busca por el enlace, que es lo que las
   tres versiones de /investigacion y la portada comparten. */
export const PORTADAS: Record<string, string> = {
  "https://aigi.ox.ac.uk/publications/ai-benefit-sharing-framework-balancing-access-and-safety/":
    "/aisc/publicaciones/oxford-aigi-benefit-sharing.jpg",
  "https://arxiv.org/abs/2510.25884": "/aisc/publicaciones/arxiv-multi-judge.jpg",
  "https://revistas.uniandes.edu.co/index.php/res/article/view/10754":
    "/aisc/publicaciones/revista-estudios-sociales-securitizacion.jpg",
};
