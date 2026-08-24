import type { Metadata } from "next";
import Link from "next/link";
import CtaPanel from "@/components/cta-panel";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import { CTA_LINK, CTA_LINK_PRIMARY, HERO_CORNER_CLASS, HERO_INNER, HERO_SECTION, PAGE_SHELL } from "@/components/ui";
import { alternativas } from "@/lib/idiomas";

export const metadata: Metadata = {
  title: "Pesquisa",
  description:
    "O que os membros da AI Safety Colombia publicam: artigos revisados por pares, documentos de trabalho, relatórios de pesquisa e os produtos dos nossos hackathons.",
  alternates: { canonical: "/pt/pesquisa", languages: alternativas("/pt/pesquisa") },
};

/* Publicaciones en las que alguien de la comunidad aparece como autor.
   `miembros` marca en negrilla a quien es de acá dentro de la lista de autores,
   que se transcribe completa y en el orden en que la publicó el editor. Los
   títulos van como los publicó cada editor, sin traducir. */
const PUBLICACIONES = [
  {
    titulo: "AI Benefit-Sharing Framework: Balancing Access and Safety",
    tipo: "Documento de trabalho",
    editor: "Oxford Martin AI Governance Initiative, Universidade de Oxford",
    fecha: "Dezembro de 2025",
    autores: [
      "Sumaya Nur Adan",
      "Joanna Wiaterek",
      "Varun Sen Bahl",
      "Ima Bello",
      "Camila Beltran",
      "Tobias Dierks",
      "Luise Eder",
      "Liam Epstein",
      "Abra Ganz",
      "Natalie Kiilu",
      "Marianne Lu",
      "Chinasa T. Okolo",
      "Sydney Reis",
      "Said Saillant",
      "Krishna Sharma",
      "Marjia Siddik",
      "Jan Pieter Snoeij",
      "José Jaime Villalobos",
      "Anna Yelizarova",
    ],
    miembros: ["Camila Beltran"],
    body: "Propõe um marco para repartir os benefícios da IA sem baixar o padrão de segurança. Apoia-se em três peças: redistribuir parte dos retornos econômicos, compartilhar tecnologia e capacidade técnica, e conter a difusão de capacidades perigosas. O argumento de fundo é que a governança atual não resolve quem acessa esses benefícios, e que os países da maioria global são os que ficam de fora.",
    href: "https://aigi.ox.ac.uk/publications/ai-benefit-sharing-framework-balancing-access-and-safety/",
  },
  {
    titulo: "Approximating Human Preferences Using a Multi-Judge Learned System",
    tipo: "Artigo aceito em workshop",
    editor: "arXiv. Aceito em dois workshops da NeurIPS 2025: Reliable ML from Unreliable Data e Latinx in AI",
    fecha: "Outubro de 2025",
    autores: [
      "Eitán Sprejer",
      "Fernando Avalos",
      "Augusto Bernardi",
      "Jose Pedro Brito de Azevedo Faustino",
      "Jacob Haimes",
      "Narmeen Fatimah Oozeer",
    ],
    miembros: ["Fernando Avalos"],
    body: "Cada vez mais se usam modelos de linguagem como juízes que avaliam as respostas de outros modelos. O problema é que avaliam mal: mudam de critério conforme a redação da rubrica, arrastam vieses e são instáveis. O trabalho propõe não confiar num único juiz e sim combinar vários, cada um com sua rubrica, e aprender quanto pesa cada um. O sistema resultante deixa ver qual juiz pesou mais em cada decisão, então dá para revisar por que avaliou como avaliou.",
    href: "https://arxiv.org/abs/2510.25884",
  },
  {
    titulo: "La securitización de la inteligencia artificial: un análisis de sus impulsores y sus consecuencias",
    tipo: "Artigo revisado por pares",
    editor: "Revista de Estudios Sociales n.º 93, Universidad de los Andes",
    fecha: "Julho de 2025",
    autores: ["Mónica A. Ulloa Ruiz", "Guillem Bas Graells"],
    miembros: ["Mónica A. Ulloa Ruiz"],
    body: "Estuda o que acontece quando, nos Estados Unidos, se fala da inteligência artificial como assunto de segurança nacional. Os autores revisam vinte e cinco declarações públicas de agências do governo, organizações técnicas e imprensa, e encontram duas maneiras de formular o problema: uma fala de ameaças, aponta um adversário concreto e serve para justificar medidas excepcionais; a outra fala de riscos e cabe dentro da regulação de sempre. A conclusão é que a segunda sustenta melhor a cooperação de longo prazo.",
    href: "https://revistas.uniandes.edu.co/index.php/res/article/view/10754",
  },
];

/* Lo premiado. Cada tarjeta enlaza al reporte publico en Apart, que es donde se
   puede comprobar el premio y leer el trabajo completo. */
const PREMIADOS = [
  {
    titulo: "ColDron",
    premio: "Prêmio da América Latina",
    ciudad: "Bogotá",
    equipo: "Leonardo Párraga, Angie Giraldo e Víctor Gelves",
    body: "Os grupos armados ilegais na Colômbia já atacam com drones comerciais modificados. A equipe montou um conjunto de dados aberto com 42 ataques documentados para responder à pergunta da qual depende como isso se regula: quem escolhe o alvo e quem aperta o gatilho.",
    href: "https://apartresearch.com/project/coldron-lj2w",
  },
  {
    titulo: "Identidade colombiana nas representações internas de um modelo",
    premio: "Prêmio da América Latina",
    ciudad: "Cali",
    equipo:
      "Gilber Alexis Corrales Gallego, Pablo Santiago Potes Velasco, Jhoan Stevan Mosquera Ortiz, Nicolás Lozano Mazuera, María del Mar García Matabanchoy e Óscar Julián Pérez Ladino",
    body: "Um modelo pode deduzir de quem lhe escreve coisas que ninguém lhe disse. A equipe mediu se o Qwen2.5-7B representa por dentro a identidade colombiana e a classe social a partir de pistas da fala, e se isso arrasta estereótipos.",
    href: "https://apartresearch.com/project/probing-latent-colombian-identity-inferences-in-qwen257b-with-natural-language-autoencoders-mucf",
  },
  {
    titulo: "Que passos do raciocínio produzem o viés",
    premio: "Prêmio da América Latina",
    ciudad: "Bogotá",
    equipo: "Andres Felipe Mosquera Hernandez",
    body: "Os modelos que raciocinam em voz alta deixam um rastro de passos intermediários. O trabalho identifica quais desses passos acabam produzindo respostas estereotipadas em cenários latino-americanos, em vez de medir só o resultado final.",
    href: "https://apartresearch.com/project/thought-anchors-for-social-bias-which-reasoning-steps-matter-in-extended-thinking-llms-on-latin-american-scenarios-27ti",
  },
  {
    titulo: "Por que os agentes obedecem?",
    premio: "Menção honrosa",
    ciudad: "Bogotá",
    equipo: "Helen Stefany Penagos e Juan Esteban Leiva",
    body: "Um modelo recusa um pedido nocivo num chat e o cumpre quando opera como agente com ferramentas. A equipe mediu por dentro o que muda: o mecanismo interno de recusa se enfraquece em formato agêntico.",
    href: "https://apartresearch.com/project/por-qu-los-agentes-obedecen-la-direccin-de-rechazo-se-debilita-en-formato-agntico-ux70",
  },
  {
    titulo: "JusticIA",
    premio: "Menção honrosa",
    ciudad: "Bogotá",
    equipo: "Lina Gomez, Brenda Barahona e Ernesto Duarte",
    body: "Um teste para a justiça transicional colombiana: pede-se a seis modelos uma recomendação de sanção e muda-se um único dado de contexto, a região, o ator armado ou o perfil da vítima, deixando intacto o que é juridicamente relevante. Mede-se quanto a resposta muda.",
    href: "https://apartresearch.com/project/justicia-a-counterfactual-benchmark-for-auditing-contextual-biases-in-language-models-for-transitional-justice-jjvl",
  },
];

/* El resto de equipos con integrantes en Colombia, en el orden en que aparecen
   en el catalogo publico de Apart. */
const OTROS = [
  {
    titulo: "Marco ético para IA aplicada à língua guna do Panamá",
    ciudad: "Bogotá",
    href: "https://apartresearch.com/project/marco-tico-para-ia-aplicada-a-la-preservacin-lingstica-guna-de-panam-6uxw",
    equipo: "Ana María González Aldana, Kelvin Alvarado e Mariana Zuluaga Abril",
  },
  {
    titulo: "Governance Drift Evaluation Framework",
    ciudad: "Colômbia",
    href: "https://apartresearch.com/project/governance-drift-evaluation-framework-gdef-vfzj",
    equipo: "Andrés Mogollón, Juan Manuel Cortes Jimenez, Oscar Poveda, Devesh Sawant e Liliana Isabel Salazar",
  },
  {
    titulo: "Sistema de dois classificadores para segurança em modelos de linguagem",
    ciudad: "Bogotá",
    href: "https://apartresearch.com/project/dualclassifier-system-for-llm-security-s491",
    equipo: "Nicolás David Galindo, Daniel Libardo Diaz Gonzalez, Juan Jacobo Izquierdo Becerra e David Andrés Ramírez",
  },
  {
    titulo: "Los peajes de los de abajo",
    ciudad: "Bogotá",
    href: "https://apartresearch.com/project/los-peajes-de-los-de-abajo-i6wx",
    equipo: "Mongui Rogers",
  },
  {
    titulo: "Contestabilidade algorítmica no Estado colombiano",
    ciudad: "Bogotá",
    href: "https://apartresearch.com/project/contestabilidad-algortmica-en-el-estado-colombiano-un-canal-de-objecin-asistido-por-ia-lbsm",
    equipo: "Emely Condor e Federico Perez",
  },
  {
    titulo: "Comércio agêntico e proteção ao consumidor",
    ciudad: "Bogotá",
    href: "https://apartresearch.com/project/agentic-commerce-and-consumer-protection-emerging-risks-and-regulatory-gaps-be7b",
    equipo: "Francely Carreño, Sofía Botía e Vanessa Reyes",
  },
  {
    titulo: "JurisGuard-LATAM",
    ciudad: "Jamundí",
    href: "https://apartresearch.com/project/jurisguardlatam-sadx",
    equipo: "Jhon Harvey Tejada Tabares",
  },
  {
    titulo: "Honest-Code",
    ciudad: "Bogotá",
    href: "https://apartresearch.com/project/honestcode-8pnk",
    equipo: "Yoel Alfonso",
  },
  {
    titulo: "Mapeamento de ferramentas de IA nos call centers colombianos",
    ciudad: "Bogotá",
    href: "https://apartresearch.com/project/mapeo-de-herramientas-ia-en-contextos-laborales-el-caso-de-los-call-centers-en-colombia-k1kk",
    equipo: "Daniel Bravo",
  },
  {
    titulo: "Confía-CO",
    ciudad: "Bogotá",
    href: "https://apartresearch.com/project/confaco-a-reliability-evaluation-for-an-ai-customerservice-assistant-operating-in-colombian-spanish-vfxt",
    equipo: "Marlon Naranjo",
  },
  {
    titulo: "Avaliação de uso responsável de IA em pequenas empresas latino-americanas",
    ciudad: "Bogotá",
    href: "https://apartresearch.com/project/herramienta-de-evaluacin-y-recomendacin-para-la-promocin-de-uso-responsable-de-ia-en-pymes-latinoamericanas-1gvb",
    equipo: "Diana Marcela Daza Jaimes, David José Daza Jaimes, Juan Camilo Medina Moreno, Luis Carlos Ordoñez Montenegro e Ángela Pinilla Parra",
  },
  {
    titulo: "Jailbreaks estruturais em espanhol",
    ciudad: "Cali",
    href: "https://apartresearch.com/project/beyond-english-assessing-the-robustness-of-llm-safety-mechanisms-against-structural-jailbreaks-in-spanish-s4zk",
    equipo: "Jonathan Narvaez",
  },
  {
    titulo: "Guardian LATAM",
    ciudad: "Armenia",
    href: "https://apartresearch.com/project/guardian-latam-early-detection-of-hallucination-risk-in-spanishspeaking-multiagent-ai-systems-using-consensus-geometry-5lzw",
    equipo: "Edwin Hernan Cedeño Vargas",
  },
];

const ENLACE =
  "text-aisc-forest underline underline-offset-4 transition-colors hover:text-aisc-forest-deep";

export default function Pesquisa() {
  return (
    <main lang="pt" className={PAGE_SHELL}>
      <section className={HERO_SECTION}>
        <img
          alt=""
          aria-hidden="true"
          loading="lazy"
          width="1697"
          height="1415"
          decoding="async"
          className={HERO_CORNER_CLASS}
          style={{ color: "transparent" }}
          src="/aisc/patterns/aisc-hero-investigacion.svg"
        />
        <SiteHeader active="/pt/pesquisa" />
        <div className={HERO_INNER}>
          <div className="flex max-w-[760px] flex-col gap-5">
            <h1 className="text-display-1 md:text-display-1-lg text-balance text-aisc-sand">Pesquisa</h1>
            <p className="text-body md:text-body-lg max-w-[660px] text-aisc-sand/90">
              Aqui está o que a gente da comunidade publica: artigos revisados por pares, documentos de trabalho,
              relatórios de pesquisa e os produtos dos nossos hackathons.
            </p>
          </div>
        </div>
      </section>

      <section id="publicaciones" className="bg-aisc-cream">
        <div className="mx-auto w-full max-w-[1448px] px-8 md:px-16 pt-14 pb-14 md:pb-16">
          <div aria-hidden="true" className="h-px w-full flex-none bg-aisc-forest-deep" />
          <div className="grid grid-cols-1 gap-8 pt-5 pb-12 md:gap-10 md:pt-7 md:pb-14 lg:grid-cols-[minmax(0,1fr)_minmax(400px,0.95fr)] lg:gap-10">
            <h2 className="text-display-2 md:text-display-2-lg text-balance">Publicações da comunidade</h2>
            <div className="text-body md:text-body-lg flex flex-col gap-4 text-aisc-ink">
              <p>
                A lista está aberta. Se você é da comunidade e publicou algo,{" "}
                <a className={ENLACE} href="mailto:contacto@aisafetycolombia.org">
                  escreva para nós
                </a>{" "}
                e nós acrescentamos.
              </p>
            </div>
          </div>
          <ul className="grid grid-cols-1 gap-[10px]">
            {PUBLICACIONES.map((p) => (
              <li className="flex" key={p.href}>
                <a
                  className="focus-visible:outline-aisc-forest grid w-full grid-cols-1 gap-6 rounded-lg border border-aisc-ink bg-aisc-cream p-6 transition-colors hover:bg-aisc-sand focus-visible:outline-2 focus-visible:outline-offset-[3px] md:p-7 lg:grid-cols-[minmax(0,260px)_minmax(0,1fr)] lg:gap-10 lg:p-8"
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="flex flex-col gap-1">
                    <span className="text-kicker text-aisc-forest">{p.tipo}</span>
                    <span className="text-meta text-aisc-muted">{p.editor}</span>
                    <span className="text-meta text-aisc-muted">{p.fecha}</span>
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-display-3 md:text-display-3-lg text-balance">{p.titulo}</h3>
                    <p className="text-meta mt-3 text-aisc-muted">
                      {p.autores.map((autor, i) => (
                        <span key={autor}>
                          {i > 0 ? ", " : ""}
                          {p.miembros.includes(autor) ? (
                            <strong className="font-semibold text-aisc-forest">{autor}</strong>
                          ) : (
                            autor
                          )}
                        </span>
                      ))}
                    </p>
                    <p className="text-body-sm mt-4 text-aisc-ink">{p.body}</p>
                    <span className="text-display-4 md:text-display-4-lg mt-6 text-aisc-forest underline underline-offset-4">
                      Ler o documento
                    </span>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="hackathons" className="bg-aisc-cream">
        <div className="mx-auto w-full max-w-[1448px] px-8 md:px-16 pb-14 md:pb-16">
          <div aria-hidden="true" className="h-px w-full flex-none bg-aisc-forest-deep" />
          <div className="grid grid-cols-1 gap-8 pt-5 pb-12 md:gap-10 md:pt-7 md:pb-14 lg:grid-cols-[minmax(0,1fr)_minmax(400px,0.95fr)] lg:gap-10">
            <h2 className="text-display-2 md:text-display-2-lg text-balance">O que sai dos hackathons</h2>
            <div className="text-body md:text-body-lg flex flex-col gap-4 text-aisc-ink">
              <p>
                A{" "}
                <a className={ENLACE} href="https://apartresearch.com" target="_blank" rel="noopener noreferrer">
                  Apart Research
                </a>{" "}
                convoca esses hackathons em nível global. Nós abrimos o hub presencial em Bogotá para participar
                daqui. É um fim de semana para sair com um trabalho próprio: na sexta à noite se montam as equipes,
                no domingo à noite se entrega um relatório, e na semana seguinte jurados de fora o avaliam.
              </p>
              <p>
                A maioria de quem chega nunca havia trabalhado em segurança da IA. Sai com um trabalho assinado,
                publicado e com retorno por escrito.
              </p>
              <p>
                A última edição foi o{" "}
                <a
                  className={ENLACE}
                  href="https://apartresearch.com/sprints/global-south-ais-hackathon-2026-06-19-to-2026-06-21"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Global South AI Safety Hackathon, de 19 a 21 de junho de 2026
                </a>
                . Os jurados eram externos e avaliaram às cegas os projetos de toda a América Latina. Cada relatório
                está publicado na íntegra no site da Apart.
              </p>
            </div>
          </div>

          <h3 className="text-display-3 md:text-display-3-lg pb-6 text-balance md:pb-7">Os trabalhos premiados</h3>
          <ul className="grid grid-cols-1 gap-[10px] md:grid-cols-2">
            {PREMIADOS.map((p) => (
              <li className="flex" key={p.href}>
                <a
                  className="focus-visible:outline-aisc-forest flex w-full flex-col rounded-lg border border-aisc-ink bg-aisc-cream p-6 transition-colors hover:bg-aisc-sand focus-visible:outline-2 focus-visible:outline-offset-[3px] md:p-7 lg:p-8"
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="text-kicker text-aisc-coral">
                    {p.premio} · {p.ciudad}
                  </span>
                  <h4 className="text-display-3 md:text-display-3-lg mt-4 text-balance">{p.titulo}</h4>
                  <p className="text-body-sm mt-3 text-aisc-ink">{p.body}</p>
                  <p className="text-meta mt-5 text-aisc-muted">{p.equipo}</p>
                  <span className="text-display-4 md:text-display-4-lg mt-7 text-aisc-forest underline underline-offset-4">
                    Ler o relatório
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-14 md:mt-16">
            <div aria-hidden="true" className="h-px w-full flex-none bg-aisc-forest-deep/25" />
            <div className="flex flex-col gap-2 pt-5 pb-4 md:flex-row md:items-baseline md:justify-between md:gap-10 md:pt-6">
              <h3 className="text-display-4 md:text-display-4-lg text-balance">As demais equipes colombianas</h3>
              <p className="text-body-sm text-aisc-muted">
                Treze projetos a mais dessa mesma edição, entre presenciais e remotos.
              </p>
            </div>
            <ul className="grid grid-cols-1 gap-x-10 md:grid-cols-2">
              {OTROS.map((o) => (
                <li key={o.href} className="border-t border-aisc-forest-deep/15">
                  <a
                    className="flex flex-col gap-1 py-3.5 transition-colors hover:text-aisc-forest"
                    href={o.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="text-body-sm">{o.titulo}</span>
                    <span className="text-meta text-aisc-muted">
                      {o.equipo} · {o.ciudad}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="lo-que-viene" className="bg-aisc-cream">
        <div className="mx-auto w-full max-w-[1448px] px-8 md:px-16 pb-14 md:pb-16">
          <div aria-hidden="true" className="h-px w-full flex-none bg-aisc-forest-deep" />
          <div className="grid grid-cols-1 gap-8 pt-5 md:gap-10 md:pt-7 lg:grid-cols-[minmax(0,1fr)_minmax(400px,0.95fr)] lg:gap-10">
            <h2 className="text-display-2 md:text-display-2-lg text-balance">A próxima edição</h2>
            <div className="text-body md:text-body-lg flex flex-col gap-4 text-aisc-ink">
              <p>
                De 11 a 13 de setembro de 2026 abrimos o hub em Bogotá para o sprint de{" "}
                <Link className={ENLACE} href="/pt/sprint">
                  resposta a incidentes de IA
                </Link>
                . O tema é o que se faz quando um sistema de IA falha em produção e é preciso reagir.
              </p>
              <p>
                Não é preciso experiência prévia nem saber programar. As equipes se montam ali e há mentoria durante
                todo o fim de semana.
              </p>
              <p>
                <Link className={ENLACE} href="/pt/sprint/inscricao">
                  As inscrições para o hub em Bogotá estão abertas
                </Link>{" "}
                e encerram em 6 de setembro.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CtaPanel
        title="Participe do próximo"
        body="De 11 a 13 de setembro acontece o AI Incident Response Sprint, convocado pela Apart Research. Abrimos o hub em Bogotá e as inscrições encerram em 6 de setembro."
      >
        <Link className={CTA_LINK_PRIMARY} href="/pt/sprint">
          Ver o hackathon
        </Link>
        <a
          className={CTA_LINK}
          href="https://chat.whatsapp.com/KwE8cciX48TAVhAOHnrLaZ"
          target="_blank"
          rel="noopener noreferrer"
        >
          Entrar no grupo de WhatsApp
        </a>
      </CtaPanel>
      <SiteFooter idioma="pt" />
    </main>
  );
}
