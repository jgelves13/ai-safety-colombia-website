/* La primera página de cada publicación, sacada del PDF que publicó el editor
   (`public/aisc/publicaciones/`). Se busca por el enlace, que es lo que las
   tres versiones de /investigacion y la portada comparten. */
export const PORTADAS: Record<string, string> = {
  "https://aigi.ox.ac.uk/publications/ai-benefit-sharing-framework-balancing-access-and-safety/":
    "/aisc/publicaciones/oxford-aigi-benefit-sharing.jpg",
  "https://arxiv.org/abs/2510.25884": "/aisc/publicaciones/arxiv-multi-judge.jpg",
  "https://revistas.uniandes.edu.co/index.php/res/article/view/10754":
    "/aisc/publicaciones/revista-estudios-sociales-securitizacion.jpg",
  /* Los reportes premiados del hackathon de junio de 2026, sacados del PDF que
     cada equipo publicó en Apart (`public/aisc/hackathon/`). */
  "https://apartresearch.com/project/coldron-lj2w": "/aisc/hackathon/coldron.jpg",
  "https://apartresearch.com/project/probing-latent-colombian-identity-inferences-in-qwen257b-with-natural-language-autoencoders-mucf":
    "/aisc/hackathon/identidad-colombiana.jpg",
  "https://apartresearch.com/project/thought-anchors-for-social-bias-which-reasoning-steps-matter-in-extended-thinking-llms-on-latin-american-scenarios-27ti":
    "/aisc/hackathon/pasos-del-razonamiento.jpg",
  "https://apartresearch.com/project/por-qu-los-agentes-obedecen-la-direccin-de-rechazo-se-debilita-en-formato-agntico-ux70":
    "/aisc/hackathon/agentes-obedecen.jpg",
  "https://apartresearch.com/project/justicia-a-counterfactual-benchmark-for-auditing-contextual-biases-in-language-models-for-transitional-justice-jjvl":
    "/aisc/hackathon/justicia.jpg",
};
