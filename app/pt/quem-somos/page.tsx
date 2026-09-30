import type { Metadata } from "next";
import Link from "next/link";
import QuienesSomosPagina, { type GrupoPersonas, type TextosQuienesSomos } from "@/components/quienes-somos-pagina";
import { alternativas } from "@/lib/idiomas";

export const metadata: Metadata = {
  title: "Quem somos?",
  description:
    "Comunidade na Colômbia que trabalha para reduzir os riscos da inteligência artificial avançada: formamos quem quer entrar no campo, apoiamos pesquisa e organizamos eventos abertos.",
  alternates: { canonical: "/pt/quem-somos", languages: alternativas("/pt/quem-somos") },
};

const ENLACE = "text-aisc-forest transition-colors hover:text-aisc-coral";

function Ext({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a className={ENLACE} href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

const SOBRE = [
  <>
    A AI Safety Colombia é uma comunidade, criada em 2024, que trabalha para reduzir os riscos da inteligência artificial
    avançada. Formamos quem quer entrar no campo, apoiamos pesquisa e organizamos eventos abertos.
  </>,
  <>
    A comunidade reúne estudantes, pesquisadores, engenheiros e profissionais de políticas públicas. A participação é pelo
    grupo de leitura, pelos seminários, pelas palestras e pelos hackathons de pesquisa:{" "}
    <Link className={ENLACE} href="/pt/participe">
      veja como entrar
    </Link>
    .
  </>,
  <>
    Trabalhamos com a <Ext href="https://apartresearch.com">Apart Research</Ext> e a{" "}
    <Ext href="https://bluedot.org">BlueDot Impact</Ext>, com apoio da <Ext href="https://kairos-project.org">Kairos</Ext> e
    da <Ext href="https://www.coefficientgiving.org">Coefficient Giving</Ext>.
  </>,
];

/* Tres grupos: quienes dirigen, quienes facilitan los seminarios y el grupo
   de lectura, y quienes ayudan con la operación. Cada bio abre con un cargo
   y la afirmación que la carga va enlazada. */
const GRUPOS: GrupoPersonas[] = [
  {
    id: "equipe",
    titulo: "A equipe",
    entrada:
      "As pessoas que dirigem a comunidade.",
    personas: [
      {
        nombre: "Jose Gelves",
        rol: "Cofundador e diretor",
        foto: "/aisc/equipo/jose-gelves.png",
        linkedin: "https://www.linkedin.com/in/josegelves/",
        bio: (
          <>
            Consultor de transformação digital da <Ext href="https://uniandes.edu.co/">Universidad de los Andes</Ext> para o{" "}
            <Ext href="https://www.mintic.gov.co/">MinTIC</Ext>, o ministério de tecnologia da Colômbia. Bolsista Pathfinder
            do <Ext href="https://kairos-project.org">Kairos</Ext> e embaixador da{" "}
            <Ext href="https://apartresearch.com">Apart Research</Ext>.
          </>
        ),
      },
      {
        nombre: "Fernando Avalos",
        rol: "Cofundador (in memoriam)",
        foto: "/aisc/equipo/fernando-avalos.png",
        linkedin: "https://www.linkedin.com/in/fernando-avalos-lopez/",
        bio: (
          <>
            Foi pesquisador da <Ext href="https://apartresearch.com">Apart Research</Ext> e engenheiro de pesquisa e analista
            de riscos no <Ext href="https://www.orcg.info/">Observatório de Riscos Catastróficos Globais</Ext>.
          </>
        ),
      },
    ],
  },
  {
    id: "facilitadores",
    titulo: "Facilitadores",
    entrada: "As pessoas que conduzem os seminários e o grupo de leitura.",
    personas: [
      {
        nombre: "Camila Beltrán",
        rol: "Grupo de leitura de AI Control",
        foto: "/aisc/mentores/camila-beltran.png",
        linkedin: "https://www.linkedin.com/in/camila-alejandra-beltran-reyes-ab288627a/",
        bio: (
          <>
            Consultora em governança de IA para várias organizações. Membro do grupo de especialistas da{" "}
            <Ext href="https://oecd.ai/en/about/network-of-experts">OCDE</Ext> e pesquisadora associada do{" "}
            <Ext href="https://aiforgood.itu.int/multimedia-authenticity/">AMAS Young Research Programme</Ext> da UIT.
          </>
        ),
      },
      {
        nombre: "Tomás Antolinez",
        foto: "/aisc/equipo/tomas-antolinez.png",
        rol: (
          <Link className={ENLACE} href="/pt/seminarios/futuro-e-riscos">
            Seminário de futuro e riscos da IA
          </Link>
        ),
        linkedin: "https://www.linkedin.com/in/tomas-antolinez-543719193",
        bio: (
          <>
            Estudante de Ciência Política e Direito na Universidad de los Andes. Foi{" "}
            <Ext href="https://www.uniandes.edu.co/es/noticias/desarrollo-regional/representacion-uniandina-en-foro-de-jovenes-de-las-americas">
              delegado jovem na IX Cúpula das Américas
            </Ext>
            .
          </>
        ),
      },
      {
        nombre: "Helen Stefany Penagos",
        foto: "/aisc/equipo/helen-penagos.png",
        rol: (
          <Link className={ENLACE} href="/pt/seminarios/tecnico">
            Seminário técnico de segurança da IA
          </Link>
        ),
        linkedin: "https://www.linkedin.com/in/helen-stefany-penagos/",
        bio: (
          <>
            Trabalha na Mastercard. Menção honrosa no hackathon do Sul Global da Apart Research com{" "}
            <Ext href="https://apartresearch.com/project/por-qu-los-agentes-obedecen-la-direccin-de-rechazo-se-debilita-en-formato-agntico-ux70">
              «Por que os agentes obedecem?»
            </Ext>
            .
          </>
        ),
      },
      {
        nombre: "Andrés Mosquera",
        foto: "/aisc/equipo/andres-mosquera.png",
        rol: (
          <Link className={ENLACE} href="/pt/seminarios/tecnico">
            Seminário técnico de segurança da IA
          </Link>
        ),
        linkedin: "https://www.linkedin.com/in/andresmosqueraw/",
        bio: (
          <>
            Estudante da Universidad de los Andes. Prêmio da América Latina no hackathon do Sul Global da Apart Research com{" "}
            <Ext href="https://apartresearch.com/project/thought-anchors-for-social-bias-which-reasoning-steps-matter-in-extended-thinking-llms-on-latin-american-scenarios-27ti">
              «Quais passos do raciocínio produzem o viés»
            </Ext>
            .
          </>
        ),
      },
    ],
  },
  {
    id: "voluntarios",
    titulo: "Voluntários",
    entrada: "As pessoas que ajudam a manter a operação.",
    personas: [
      {
        nombre: "Sofía Botia",
        rol: "Voluntária",
        foto: "/aisc/equipo/sofia-botia.png",
        linkedin: "https://www.linkedin.com/in/karen-sof%C3%ADa-botia-vizcaya-2898b334b/",
        bio: (
          <>
            Estudante de Direito na <Ext href="https://uniandes.edu.co/">Universidad de los Andes</Ext>. Assistente de
            pesquisa na <Ext href="https://www.psu.edu/">Penn State</Ext> e monitora de pesquisa na{" "}
            <Ext href="https://www.hbs.edu/">Harvard Business School</Ext>.
          </>
        ),
      },
      {
        nombre: "Leonardo Párraga",
        rol: "Voluntário",
        foto: "/aisc/equipo/leonardo-parraga.png",
        linkedin: "https://www.linkedin.com/in/leonardoparraga/",
        bio: (
          <>
            Cofundador e codiretor da Coalizão Colombiana de Juventudes, Paz e Segurança. Mestrado em política educativa
            internacional pela <Ext href="https://www.gse.harvard.edu/">Harvard Graduate School of Education</Ext>.
          </>
        ),
      },
      {
        nombre: "Manuel Cabrera",
        rol: "Voluntário",
        foto: "/aisc/equipo/manuel-cabrera.png",
        linkedin: "https://www.linkedin.com/in/manueloff14/",
        bio: (
          <>
            Trabalhou recentemente como programador full stack no{" "}
            <Ext href="https://www.linkedin.com/company/aeuniandes">Altruísmo Eficaz Uniandes</Ext>. Acaba de terminar o
            ensino médio.
          </>
        ),
      },
    ],
  },
];

const TEXTOS: TextosQuienesSomos = {
  kicker: "Desde 2024",
  h1: "Quem somos?",
  intro: "Uma comunidade na Colômbia que trabalha para reduzir os riscos da inteligência artificial avançada.",
  sobreTitulo: "Sobre nós",
  linkedin: "no LinkedIn",
  cta: {
    title: "Quer ser voluntário?",
    body: "Não há filiação nem edital: você aparece num evento, num programa ou numa conversa.",
    primario: "Conversar 20 minutos",
    secundario: "Entrar no grupo",
  },
};

export default function QuemSomos() {
  return <QuienesSomosPagina active="/pt/quem-somos" idioma="pt" sobre={SOBRE} grupos={GRUPOS} t={TEXTOS} />;
}
