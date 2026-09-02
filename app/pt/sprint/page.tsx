import type { Metadata } from "next";
import Link from "next/link";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import { HeroHackathon } from "@/components/hero-hackathon";
import {
  CTA_LINK,
  CTA_LINK_PRIMARY,
  CTA_PATTERN_BOTTOM,
  CTA_PATTERN_TOP,
  HERO_FUGA_CLASS,
  HERO_INNER,
  HERO_SECTION,
  PAGE_SHELL,
} from "@/components/ui";
import {
  APART_FELLOWSHIP_URL,
  APART_SPRINT_URL,
  CIERRE_TEXTO_IDIOMA,
} from "@/app/sprint/datos";
import { alternativas } from "@/lib/idiomas";
import { orderSprintMentors } from "@/lib/sprint-mentor-order.mjs";

const CIERRE_TEXTO = CIERRE_TEXTO_IDIOMA.pt;

export const metadata: Metadata = {
  title: "AI Incident Response Sprint",
  description:
    "De 11 a 13 de setembro de 2026. Apart Research e CeSIA convocam o sprint sobre resposta a incidentes de IA. Abrimos o hub presencial em Bogotá; as inscrições encerram à meia-noite de domingo, 6 de setembro.",
  alternates: {
    canonical: "/pt/sprint",
    languages: alternativas("/pt/sprint"),
  },
};

const ENLACE =
  "text-aisc-forest underline underline-offset-[3px] transition-colors hover:text-aisc-forest-deep";

/* Los tres datos que alguien busca antes de leer nada más. Una cifra grande y
   una línea de apoyo, sin más: es lo que hace que se lean de un vistazo. */
const DATOS = [
  {
    valor: "11 a 13 de setembro",
    nota: "Um fim de semana, da sexta à tarde ao domingo à noite",
  },
  {
    valor: "Bogotá e on-line",
    nota: "Hub presencial no Chicó, Bogotá",
  },
  {
    valor: "USD 2.000 em prêmios",
    nota: "Cinco vencedores no mundo todo, que a Apart escolhe entre o sprint inteiro",
  },
];

/* Los cinco tracks son de Apart. La descripción resume lo que su convocatoria
   pide como entregable, no lo que a nosotros nos parece interesante. */
const TRACKS = [
  {
    id: "contencion",
    titulo: "Padrões de contenção",
    body: "Escrever o mínimo com que se deveria rodar uma avaliação em caixa de areia. Entra aqui quem puder propor uma matriz de controle por fase de ataque, ou empacotar mitigações de modo que um terceiro verifique que estão cumpridas.",
  },
  {
    id: "analisis",
    titulo: "Análise do incidente",
    body: "Reconstruir o que aconteceu e em que ponto o monitoramento falhou. Buscam-se perguntas que alguém possa resolver, revisões que se possam rodar amanhã e explicações causais que prevejam algo.",
  },
  {
    id: "regulacion",
    titulo: "Resposta regulatória",
    body: "Redigir pedidos de informação que um regulador possa usar quase sem editar, pôr à prova os sistemas de reporte que já existem e apontar as lacunas legais que eles deixam.",
  },
  {
    id: "comunicacion",
    titulo: "Estratégia de comunicação",
    body: "Auditar como a imprensa cobriu o incidente e montar o kit com que se comunica o próximo. Aqui pesa a ancoragem no registro do que de fato ocorreu.",
  },
  {
    id: "abierto",
    titulo: "Track aberto",
    body: "Qualquer outro ângulo do mesmo problema. A condição é a de sempre: um artefato que alguém possa usar e uma frase honesta sobre até onde vai o que ele demonstra.",
  },
];

/* Quién convoca el sprint y quién pone la plata del hub. Los logos viven en
   public/aisc/aliados/. */
/* Os três grupos de Bogotá que abrem o hub conosco. A mesma lista alimenta a
   tira que vai abaixo do hero e os cartões de «Quem está por trás?». */
const COORGANIZAN = [
  {
    name: "Young AI Leaders Bogotá",
    body: "Capítulo em Bogotá da rede Young AI Leaders, ligada à plataforma AI for Good da União Internacional de Telecomunicações. Reúne quem constrói e pesquisa IA na região.",
    logo: "/aisc/aliados/yail-v2.png",
    clase: "max-h-[60px] max-w-[110px]",
    ancho: 292,
    alto: 240,
    href: "https://www.youngaileadershub.org/",
  },
  {
    name: "Semillero de Modelos Generativos UNAL",
    body: "Grupo de pesquisa estudantil da Universidad Nacional. Trabalha em aprendizado profundo, modelos de difusão e processamento de linguagem natural, com vinte e dois repositórios públicos.",
    logo: "/aisc/aliados/simg-unal.png",
    clase: "max-h-[44px] max-w-[128px]",
    ancho: 240,
    alto: 240,
    href: "https://wsimg-un.vercel.app/",
  },
  {
    name: "IEEE Computer Society Uniandes",
    body: "Capítulo estudantil do IEEE na Universidad de los Andes. Faz oficinas técnicas, TechTalks e o congresso CONECS, e trabalha em inteligência artificial, cibersegurança e desenvolvimento de software.",
    logo: "/aisc/aliados/ieee-cs-uniandes.png",
    clase: "max-h-[44px] max-w-[128px]",
    ancho: 560,
    alto: 167,
    href: "https://www.instagram.com/csuniandes/",
  },
];

const GRUPOS = [
  {
    rotulo: "Organizam o sprint",
    orgs: [
      {
        name: "Apart Research",
        body: "Laboratório de pesquisa em segurança da IA. Convoca o sprint, define os cinco tracks, oferece os prêmios e publica os relatórios.",
        logo: "/aisc/aliados/apart.png",
        href: "https://apartresearch.com",
      },
      {
        name: "CeSIA",
        body: "Centro francês para a segurança da IA. Coorganiza o sprint e leva a reguladores europeus o material que sai dele.",
        logo: "/aisc/aliados/cesia.svg",
        href: "https://www.securite-ia.fr",
      },
    ],
  },
  {
    rotulo: "Coorganizam o hub em Bogotá",
    orgs: COORGANIZAN,
  },
  {
    rotulo: "Financiam o hub em Bogotá",
    orgs: [
      {
        name: "Apart Research",
        body: "Além de convocar o sprint, apoia os grupos que abrem um hub presencial durante o fim de semana.",
        logo: "/aisc/aliados/apart.png",
        href: "https://apartresearch.com",
      },
      {
        name: "BlueDot Impact",
        body: "Seus cursos gratuitos são a entrada padrão no campo. Com os Rapid Grants financiam trabalho concreto: USD 1,4 milhão concedidos no total e decisões em apenas três dias, em média.",
        logo: "/aisc/aliados/bluedot.png",
        href: "https://bluedot.org/grants/rapid",
      },
      {
        name: "Pathfinder Fellowship",
        body: "Bolsa da Kairos para quem constrói comunidades de segurança da IA. Contribui com mentoria e financiamento para suas atividades.",
        logo: "/aisc/aliados/pathfinder.png",
        href: "https://pathfinder.kairos-project.org",
      },
    ],
  },
];

/* Lo que ponemos nosotros. Cada línea es una cosa que el sitio se compromete a
   dar; lo que aún no está cerrado se dice que no está cerrado. */
const HUB = [
  {
    titulo: "Alimentação",
    body: "Cobrimos as refeições do fim de semana, para que as equipes não precisem sair da sala para resolver isso.",
  },
  {
    titulo: "Apoio para computação",
    body: "Cobrimos parte do gasto de computação das equipes. O valor é confirmado antes do encerramento das inscrições.",
  },
  {
    titulo: "Mentoria na sala",
    body: "Gente que trabalha em resposta a incidentes, em segurança ofensiva e em regulação passa pelo hub durante o fim de semana.",
  },
  {
    titulo: "Sala e conectividade",
    body: "Espaço de trabalho durante todo o fim de semana, com mesas para equipes e com onde se conectar.",
  },
  {
    titulo: "Com quem montar equipe",
    body: "Na sexta à noite as equipes se formam na sala. Muita gente chega sozinha e sai com equipe.",
  },
  {
    titulo: "Vagas limitadas",
    body: "O hub tem lotação, então há processo de seleção. Você se inscreve pelo formulário e avisamos por e-mail.",
  },
];

/* Premios de Apart, tal como los publica su convocatoria. */
const PREMIOS = [
  { puesto: "Primeiro lugar", monto: "1.000" },
  { puesto: "Segundo lugar", monto: "500" },
  { puesto: "Terceiro lugar", monto: "300" },
  { puesto: "Quarto lugar", monto: "100" },
  { puesto: "Quinto lugar", monto: "100" },
];

/* Los mentores, al modo de SASH: retrato cuadrado, nombre, rol y una bio de
   dos o tres frases. Mientras no tengamos la foto de alguien se muestra la
   tarjeta con sus iniciales; el archivo va en public/aisc/mentores/. */
const MENTORES: {
  nombre: string;
  rol: string;
  modalidad: string;
  foto?: string;
  linkedin?: string;
  bio?: React.ReactNode;
}[] = [
  {
    nombre: "Diego Gómez",
    rol: "Mentor",
    foto: "/aisc/mentores/diego-gomez.png",
    modalidad: "Remoto",
    linkedin: "https://www.linkedin.com/in/diegoalejogm/",
    bio: (
      <>
        Engenheiro sênior de ML no{" "}
        <a
          className={ENLACE}
          href="https://about.google/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Google
        </a>
        , onde treina modelos multimodais para a{" "}
        <a
          className={ENLACE}
          href="https://www.youtube.com/howyoutubeworks/our-commitments/managing-harmful-content/"
          target="_blank"
          rel="noopener noreferrer"
        >
          segurança do YouTube
        </a>
        . Em um{" "}
        <a
          className={ENLACE}
          href="https://bluedot.org/courses/technical-ai-safety-project"
          target="_blank"
          rel="noopener noreferrer"
        >
          sprint da BlueDot
        </a>
        , avaliou se os vetores de persona do Qwen2.5-7B detectam mudanças de
        caráter induzidas implicitamente.
      </>
    ),
  },
  {
    nombre: "Luis Montoya",
    rol: "Mentor e palestrante",
    foto: "/aisc/mentores/luis-montoya.png",
    modalidad: "Remoto",
    linkedin: "https://www.linkedin.com/in/luismmontoya/",
    bio: (
      <>
        Pesquisador de IA e bolsista da{" "}
        <a
          className={ENLACE}
          href="https://www.pivotal-research.org/fellowship"
          target="_blank"
          rel="noopener noreferrer"
        >
          Pivotal Research
        </a>
        . No{" "}
        <a
          className={ENLACE}
          href="https://www.matsprogram.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          MATS
        </a>
        , com{" "}
        <a
          className={ENLACE}
          href="https://www.matsprogram.org/mentor/neel"
          target="_blank"
          rel="noopener noreferrer"
        >
          Neel Nanda
        </a>
        , estudou se um modelo reconhece uma avaliação sem dizê-lo; publicou o
        trabalho no{" "}
        <a
          className={ENLACE}
          href="https://openreview.net/forum?id=zGmgeR0f4D"
          target="_blank"
          rel="noopener noreferrer"
        >
          workshop do ICML 2026
        </a>
        .
      </>
    ),
  },
  {
    nombre: "Camila Beltrán",
    rol: "Mentora e palestrante",
    foto: "/aisc/mentores/camila-beltran.png",
    modalidad: "Em Bogotá",
    linkedin:
      "https://www.linkedin.com/in/camila-alejandra-beltran-reyes-ab288627a/",
    bio: (
      <>
        Consultora em governança de IA para várias organizações. Membro do grupo
        de especialistas da{" "}
        <a
          className={ENLACE}
          href="https://oecd.ai/en/about/network-of-experts"
          target="_blank"
          rel="noopener noreferrer"
        >
          OCDE
        </a>
        . Como Winter Fellow do{" "}
        <a
          className={ENLACE}
          href="https://www.governance.ai/"
          target="_blank"
          rel="noopener noreferrer"
        >
          GovAI
        </a>{" "}
        pesquisou a{" "}
        <a
          className={ENLACE}
          href="https://digital-strategy.ec.europa.eu/en/policies/contents-code-gpai"
          target="_blank"
          rel="noopener noreferrer"
        >
          regulação europeia
        </a>{" "}
        dos cenários de perda de controle.
      </>
    ),
  },
  {
    nombre: "Liliana Fernández",
    rol: "Mentora",
    foto: "/aisc/mentores/liliana-fernandez-v2.png",
    modalidad: "Em Bogotá",
    linkedin: "https://www.linkedin.com/in/lilianafernandezict4d/",
    bio: (
      <>
        Especialista em governança de IA, avaliadora autorizada do{" "}
        <a
          className={ENLACE}
          href="https://standards.ieee.org/products-programs/icap/ieee-certifaied/"
          target="_blank"
          rel="noopener noreferrer"
        >
          IEEE CertifAIed
        </a>{" "}
        e membro do{" "}
        <a
          className={ENLACE}
          href="https://oecd.ai/en/community/liliana-frenandez"
          target="_blank"
          rel="noopener noreferrer"
        >
          grupo da OCDE
        </a>{" "}
        sobre computação. Assessorou oito anos a política de dados e IA do{" "}
        <a
          className={ENLACE}
          href="https://www.dnp.gov.co/"
          target="_blank"
          rel="noopener noreferrer"
        >
          DNP
        </a>{" "}
        e foi ao{" "}
        <a
          className={ENLACE}
          href="https://www.successif.org/womens-retreat"
          target="_blank"
          rel="noopener noreferrer"
        >
          retiro da Successif
        </a>{" "}
        para mulheres em segurança de IA.
      </>
    ),
  },
  {
    nombre: "Luis Cosio",
    rol: "Mentor e palestrante",
    foto: "/aisc/mentores/luis-cosio.png",
    modalidad: "Remoto",
    linkedin: "https://www.linkedin.com/in/luiscosio/",
    bio: (
      <>
        Integrante da equipe técnica da{" "}
        <a
          className={ENLACE}
          href="https://sl5.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Security Level 5
        </a>
        , iniciativa que protege sistemas avançados de IA diante de adversários
        estatais. Coautor do{" "}
        <a
          className={ENLACE}
          href="https://arxiv.org/abs/2605.08449"
          target="_blank"
          rel="noopener noreferrer"
        >
          padrão SL5
        </a>
        . Também já foi mentor no{" "}
        <a
          className={ENLACE}
          href="https://sparai.org/projects/sp26/recXdgQxof26exbLh/"
          target="_blank"
          rel="noopener noreferrer"
        >
          SPAR
        </a>{" "}
        e no{" "}
        <a
          className={ENLACE}
          href="https://www.matsprogram.org/stream/thiergart-11"
          target="_blank"
          rel="noopener noreferrer"
        >
          MATS
        </a>{" "}
        em projetos sobre segurança de centros de dados.
      </>
    ),
  },
  {
    nombre: "Christian Urcuqui",
    rol: "Mentor e palestrante",
    foto: "/aisc/mentores/christian-urcuqui.png",
    modalidad: "Remoto",
    linkedin: "https://www.linkedin.com/in/christianurcuqui/",
    bio: (
      <>
        Pesquisador de cibersegurança e IA na{" "}
        <a
          className={ENLACE}
          href="https://tryhackme.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          TryHackMe
        </a>
        . Docente da{" "}
        <a
          className={ENLACE}
          href="https://www.icesi.edu.co/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Universidad Icesi
        </a>{" "}
        e coautor de três{" "}
        <a
          className={ENLACE}
          href="https://www.icesi.edu.co/editorial/ciberseguridad-datos-caos/"
          target="_blank"
          rel="noopener noreferrer"
        >
          livros
        </a>{" "}
        de cibersegurança. Publicou o{" "}
        <a
          className={ENLACE}
          href="https://github.com/urcuqui/AgentBreak"
          target="_blank"
          rel="noopener noreferrer"
        >
          AgentBreak
        </a>
        , um laboratório de injeção indireta de prompts em sistemas com
        LLM.
      </>
    ),
  },
  {
    nombre: "Manuela Chacón",
    rol: "Palestrante",
    foto: "/aisc/mentores/manuela-chacon.png",
    modalidad: "Remoto",
    linkedin:
      "https://www.linkedin.com/in/manuela-viviana-chac%C3%B3n-chamorro-04b0621bb/",
    bio: (
      <>
        Doutoranda em Engenharia na{" "}
        <a
          className={ENLACE}
          href="https://uniandes.edu.co/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Universidad de los Andes
        </a>{" "}
        e{" "}
        <a
          className={ENLACE}
          href="https://ingenieria.uniandes.edu.co/es/noticias/ganadores-becas-deepmind-cinfonia"
          target="_blank"
          rel="noopener noreferrer"
        >
          bolsista da Google DeepMind
        </a>
        . Primeira autora de um{" "}
        <a
          className={ENLACE}
          href="https://ieeexplore.ieee.org/document/10988739/"
          target="_blank"
          rel="noopener noreferrer"
        >
          artigo
        </a>{" "}
        da IEEE sobre resiliência cooperativa em sistemas multiagente; em 2025
        participou da{" "}
        <a
          className={ENLACE}
          href="https://www.cooperativeai.com/summer-school/summer-school-2025"
          target="_blank"
          rel="noopener noreferrer"
        >
          Cooperative AI Summer School
        </a>
        .
      </>
    ),
  },
  {
    nombre: "Leidy Aldana",
    rol: "Mentora e palestrante",
    foto: "/aisc/mentores/leidy-aldana.png",
    modalidad: "Em Bogotá",
    linkedin: "https://www.linkedin.com/in/l-aldana/",
    bio: (
      <>
        Pesquisadora de aprendizado de máquina adversário na{" "}
        <a
          className={ENLACE}
          href="https://repositorio.unal.edu.co/handle/unal/89285"
          target="_blank"
          rel="noopener noreferrer"
        >
          Universidad Nacional
        </a>
        . Vulnerou quatro detectores de malware para Android com dez ataques de
        evasão e propôs um filtro que os detecta, com{" "}
        <a
          className={ENLACE}
          href="https://www.kaggle.com/datasets/l7032681/static-and-dynamic-features-adv"
          target="_blank"
          rel="noopener noreferrer"
        >
          dados
        </a>{" "}
        e{" "}
        <a
          className={ENLACE}
          href="https://github.com/leidy-m/Adversarial-ML-Android-Malware"
          target="_blank"
          rel="noopener noreferrer"
        >
          código
        </a>{" "}
        públicos.
      </>
    ),
  },
  {
    nombre: "Gerson Quintero",
    rol: "Palestrante",
    foto: "/aisc/mentores/gerson-quintero.png",
    modalidad: "Em Bogotá",
    linkedin:
      "https://www.linkedin.com/in/gerson-david-quintero-rodriguez-2b7b9a18/",
    bio: (
      <>
        Professor de{" "}
        <a
          className={ENLACE}
          href="https://www.escuelaing.edu.co/es/programas/curso-gestion-de-incidentes-y-forensia-digitall/"
          target="_blank"
          rel="noopener noreferrer"
        >
          gestão de incidentes e perícia digital
        </a>{" "}
        na{" "}
        <a
          className={ENLACE}
          href="https://www.escuelaing.edu.co/es/personal/gerson-david-quintero-rodriguez/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Escuela Colombiana de Ingeniería
        </a>
        . Foi gestor da estratégia e da arquitetura de cibersegurança da{" "}
        <a
          className={ENLACE}
          href="https://agata.gov.co/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Ágata
        </a>
        , a agência de analítica de dados de Bogotá.
      </>
    ),
  },
  {
    nombre: "Robert Gómez",
    rol: "Mentor",
    foto: "/aisc/mentores/robert-gomez.png",
    modalidad: "Em Bogotá",
    linkedin: "https://www.linkedin.com/in/robert-gomez-6361571b6/",
    bio: (
      <>
        CTO da{" "}
        <a
          className={ENLACE}
          href="https://www.aimedic.com.co/"
          target="_blank"
          rel="noopener noreferrer"
        >
          AIMEDIC
        </a>
        , que leva IA generativa a clínicas e hospitais. Coautor de um estudo de
        assistentes de saúde para adolescentes na{" "}
        <a
          className={ENLACE}
          href="https://unal.edu.co/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Universidad Nacional
        </a>{" "}
        e pesquisa brechas tributárias no{" "}
        <a
          className={ENLACE}
          href="https://socampoq.github.io/LoopholeCheck.github.io/"
          target="_blank"
          rel="noopener noreferrer"
        >
          LoopholeCheck
        </a>
        , com o{" "}
        <a
          className={ENLACE}
          href="https://www.mit.edu/"
          target="_blank"
          rel="noopener noreferrer"
        >
          MIT
        </a>
        .
      </>
    ),
  },
  {
    nombre: "Juan Cortés",
    rol: "Mentor",
    foto: "/aisc/mentores/juan-cortes.png",
    modalidad: "Remoto",
    linkedin: "https://www.linkedin.com/in/jcortesj/",
    bio: (
      <>
        Bolsista do{" "}
        <a
          className={ENLACE}
          href="https://velezreyesmas.com/proyectos/tech-fellowship/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Tech Fellowship
        </a>{" "}
        da vélezreyes+ e desenvolvedor de software com passagem pela{" "}
        <a
          className={ENLACE}
          href="https://habi.co/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Habi
        </a>. Coautor, na revista{" "}
        <a
          className={ENLACE}
          href="https://revistas.udistrital.edu.co/index.php/Tecnura/article/view/23438"
          target="_blank"
          rel="noopener noreferrer"
        >
          Tecnura
        </a>, de um estudo sobre aprendizado de máquina adversário para a
        cibersegurança da IA na Colômbia.
      </>
    ),
  },
  {
    nombre: "María Lorena Flórez",
    rol: "Palestrante",
    foto: "/aisc/mentores/maria-lorena-florez-v4.png",
    modalidad: "Remoto",
    linkedin:
      "https://www.linkedin.com/in/maria-lorena-florez-rojas/",
    bio: (
      <>
        Professora de direito e tecnologia em{" "}
        <a
          className={ENLACE}
          href="https://www.rug.nl/staff/m.l.florez.rojas/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Groningen
        </a>, editora de governança algorítmica da{" "}
        <a
          className={ENLACE}
          href="https://www.cambridge.org/core/journals/data-and-policy/information/about-this-journal/editorial-board"
          target="_blank"
          rel="noopener noreferrer"
        >
          Data &amp; Policy
        </a>{" "}
        e especialista da{" "}
        <a
          className={ENLACE}
          href="https://www.unesco.org/en/artificial-intelligence/rule-law/network-experts"
          target="_blank"
          rel="noopener noreferrer"
        >
          UNESCO
        </a>{" "}
        em IA e estado de direito.{" "}
        <a
          className={ENLACE}
          href="https://journals.openedition.org/revestudsoc/59583"
          target="_blank"
          rel="noopener noreferrer"
        >
          Escreveu
        </a>{" "}
        sobre a algocracia nos tribunais e como ela corrói a confiança na justiça.
      </>
    ),
  },
  /* Oculto temporalmente el 26-ago-2026 a peticion de Jose. Para
     devolverlo, basta con quitar este comentario. */
  /*
  {
    nombre: "Roberto García Alonso",
    rol: "Mentor e palestrante",
    foto: "/aisc/mentores/roberto-garcia.png",
    linkedin: "https://www.linkedin.com/in/roberto-garcia-alonso/",
    bio: (
      <>
        Professor da{" "}
        <a
          className={ENLACE}
          href="https://pure.unisabana.edu.co/en/persons/roberto-garcia-alonso-2/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Universidad de La Sabana
        </a>{" "}
        e pesquisador da{" "}
        <a
          className={ENLACE}
          href="https://www.usal.es/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Universidad de Salamanca
        </a>
        . Dirige pela Colômbia o{" "}
        <a
          className={ENLACE}
          href="https://nato.usal.es/"
          target="_blank"
          rel="noopener noreferrer"
        >
          projeto da OTAN
        </a>{" "}
        sobre cooperação transatlântica em supervisão da IA e analisou o{" "}
        <a
          className={ENLACE}
          href="https://periodicos.unb.br/index.php/RDET/article/view/48974"
          target="_blank"
          rel="noopener noreferrer"
        >
          marco ético
        </a>{" "}
        da política colombiana de IA.
      </>
    ),
  },
  */
];

const MENTORES_ORDENADOS = orderSprintMentors(MENTORES);

function iniciales(nombre: string): string {
  return nombre
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((parte) => parte[0])
    .join("");
}

/* Cada perfil con el rótulo por el que alguien se reconoce de un vistazo. */
const PERFILES = [
  {
    rotulo: "Perfis técnicos",
    body: "Engenharia, ciência de dados ou segurança da informação. As frentes de contenção e análise do incidente se trabalham programando durante todo o fim de semana.",
  },
  {
    rotulo: "Direito, políticas públicas e jornalismo",
    body: "As frentes de regulação e comunicação se trabalham escrevendo e lendo documentação. Não é preciso programar.",
  },
  {
    rotulo: "Quem já responde a incidentes",
    body: "A resposta a incidentes já é um ofício em bancos, saúde e outros setores. Aqui se olha o que muda quando o sistema que falha é de IA.",
  },
  {
    rotulo: "Quem chega ao tema pela primeira vez",
    body: "Não é preciso ter lido sobre segurança da IA. Você entra pelo que já sabe fazer e pergunta o que faltar durante o sprint.",
  },
];

const FAQ = [
  {
    q: "Posso me inscrever se nunca trabalhei em segurança da IA?",
    a: "Sim, e é o caso de boa parte de quem participa. Os projetos que saem melhor costumam misturar alguém que conhece o campo com alguém que sabe fazer muito bem outra coisa: escrever, litigar, montar infraestrutura, ler um processo. O que pedimos é que você possa estar o fim de semana inteiro.",
  },
  {
    q: "Preciso saber programar?",
    a: "Não para todas as frentes. As de regulação e comunicação se trabalham escrevendo e lendo documentação. As de contenção e análise exigem programar, embora as equipes costumem misturar perfis.",
  },
  {
    q: "Tenho que chegar com equipe?",
    a: "Não. As equipes são de uma a cinco pessoas e se formam na sexta à noite, na sala e no Discord da Apart. Muita gente chega sozinha e sai com equipe.",
  },
  {
    q: "Qual é a diferença entre se inscrever aqui e participar on-line?",
    a: "O sprint é o mesmo e o entregável vai para o mesmo lugar. Inscrever-se aqui é para o hub presencial em Bogotá, que tem vagas limitadas e por isso tem seleção. No hub cobrimos alimentação, hospedagem para quem vier de outra cidade, apoio para computação e mentoria na sala. Participar on-line com a Apart não tem seleção nem limite de vagas.",
  },
  {
    q: "Quanto tempo leva a inscrição?",
    a: "Cerca de vinte minutos. Não esperamos uma proposta fechada; queremos ver como você pensa o problema.",
  },
  {
    q: "Posso me inscrever se não moro em Bogotá?",
    a: "Sim. No formulário você nos diz de onde viria. Cobrimos a hospedagem de quem vier de outra cidade; o transporte até Bogotá corre por sua conta.",
  },
];

const SECCION = "bg-aisc-cream";
const CONTENEDOR = "mx-auto w-full max-w-[1448px] px-8 md:px-16";
const HAIRLINE = "h-px w-full flex-none bg-aisc-forest-deep";
/* El encabezado de dos columnas de SASH: el titular a la izquierda, todo el
   texto a la derecha en una medida corta. */
const ENCABEZADO =
  "mt-5 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-start lg:gap-6";
const COLUMNA = "flex min-w-0 flex-col gap-6";
const PROSA =
  "text-body md:text-body-lg flex max-w-[640px] flex-col gap-5 text-aisc-ink";
/* La tarjeta de contorno con la que SASH lista lo que recibe cada persona. */
const TARJETA =
  "flex min-h-[104px] flex-col gap-3 rounded-[8px] border border-aisc-forest/55 bg-aisc-cream p-5 md:min-h-[114px] md:p-6";
/* El recuadro del informe del incidente: bloque oscuro dentro de la seccion
   clara, para que se vea sin sacar a nadie del hilo. */
const AVISO =
  "flex flex-col gap-3 rounded-[8px] bg-aisc-forest-deep px-5 py-6 text-aisc-sand md:px-7 md:py-7";
const AVISO_ENLACE =
  "underline underline-offset-[3px] transition-colors hover:text-aisc-coral";
const PATRON = "/aisc/patterns/aisc-wash-lattice.svg";

export default function Hackathon() {
  return (
    <main lang="pt" className={PAGE_SHELL}>
      <section className={HERO_SECTION}>
        <HeroHackathon className={HERO_FUGA_CLASS} />
        <SiteHeader active="/pt/sprint" />
        <div className={HERO_INNER}>
          <div className="flex max-w-[860px] flex-col gap-5">
            <h1 className="text-display-1 md:text-display-1-lg text-balance text-aisc-sand">
              AI Incident Response Sprint
            </h1>
            <p className="text-body md:text-body-lg max-w-[680px] text-aisc-sand/90">
              Um agente de IA age por conta própria e causa dano a um terceiro.
              Neste sprint, engenharia, cibersegurança, política pública e
              jornalismo se unem para construir a resposta.
            </p>
            <p className="text-body-sm mt-1 w-fit text-aisc-sand/75">
              {CIERRE_TEXTO}
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <Link className={CTA_LINK_PRIMARY} href="/pt/sprint/inscricao">
                Inscrever-se no hub em Bogotá
              </Link>
              <a
                className={CTA_LINK}
                href={APART_SPRINT_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Participar on-line com a Apart
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Los coorganizadores, en una banda de arena pegada al hero: solo las
          marcas, en una fila baja. El nombre de cada una va en el alt y en el
          title, que es lo que la lupa y el lector de pantalla necesitan. */}
      <section className="bg-aisc-sand">
        <div className={CONTENEDOR}>
          <div className="flex flex-col gap-5 py-6 sm:flex-row sm:items-center sm:gap-10 md:py-7">
            <p className="text-kicker whitespace-nowrap text-aisc-muted sm:flex-none">
              Coorganizam o hub em Bogotá
            </p>
            <ul className="flex flex-wrap items-center gap-x-12 gap-y-5 sm:ml-auto">
              {COORGANIZAN.map((o) => (
                <li key={o.name}>
                  <a
                    className="block transition-opacity hover:opacity-60"
                    href={o.href}
                    rel="noopener noreferrer"
                    target="_blank"
                    title={o.name}
                  >
                    <img
                      alt={o.name}
                      className={`w-auto object-contain ${o.clase}`}
                      decoding="async"
                      height={o.alto}
                      src={o.logo}
                      width={o.ancho}
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Las tres cifras duras, en tarjetas oscuras pegadas al hero. */}
      <section className={`${SECCION} pt-9 pb-10 md:pt-10 md:pb-12`}>
        <div className={`${CONTENEDOR} flex flex-col gap-12 md:gap-14`}>
          <dl className="grid grid-cols-1 gap-2 lg:grid-cols-3 lg:gap-3">
            {DATOS.map((d) => (
              <div
                className="flex min-h-[122px] flex-col justify-start rounded-[8px] bg-aisc-forest-deep px-5 py-5 text-aisc-sand md:min-h-[142px] md:px-7 md:py-7"
                key={d.valor}
              >
                <dt className="text-display-4 md:text-display-4-lg break-words">
                  {d.valor}
                </dt>
                <dd className="text-body-sm mt-3 text-aisc-sand">{d.nota}</dd>
              </div>
            ))}
          </dl>

          {/* De qué se trata */}
          <section id="que-es" className="flex flex-col gap-5">
            <div aria-hidden="true" className={HAIRLINE} />
            <div className="mt-5 flex flex-col gap-6">
              <h2 className="text-display-2 md:text-display-2-lg break-words">
                Do que se trata?
              </h2>
              <div className="text-body md:text-body-lg flex flex-col gap-5 text-aisc-ink">
                <p>
                  Já há casos documentados em que um sistema de IA atacou por
                  conta própria um terceiro. Em julho de 2026, modelos que
                  estavam sendo avaliados saíram do seu ambiente de testes e
                  encadearam falhas até entrar na infraestrutura de produção da
                  Hugging Face. Contaram o caso a{" "}
                  <a
                    className={ENLACE}
                    href="https://openai.com/index/hugging-face-model-evaluation-security-incident/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    OpenAI
                  </a>{" "}
                  e a{" "}
                  <a
                    className={ENLACE}
                    href="https://huggingface.co/blog/security-incident-july-2026"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Hugging Face
                  </a>
                  , cada uma por seu lado. Nenhuma lei as obrigava a isso.
                </p>
                <div className={AVISO}>
                  <p className="text-kicker text-aisc-sand/60">
                    26 de agosto de 2026
                  </p>
                  <h3 className="text-display-4 break-words">
                    Já saiu o relatório do incidente
                  </h3>
                  <p className="text-body-sm md:text-body text-aisc-sand">
                    A OpenAI publicou seu{" "}
                    <a
                      className={AVISO_ENLACE}
                      href="https://cdn.openai.com/pdf/67869394-cb91-4c12-888c-5cbd85c7814c/OpenAI-Hugging-Face%20Incident-Technical-Report.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      relatório técnico
                    </a>{" "}
                    e uma{" "}
                    <a
                      className={AVISO_ENLACE}
                      href="https://openai.com/index/hugging-face-incident-and-the-road-ahead/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      nota que o resume
                    </a>
                    . Reconstroem o que os modelos fizeram, explicam por que
                    falharam as barreiras que deviam contê-los e contam o que
                    está mudando para que não se repita.{" "}
                    <a
                      className={AVISO_ENLACE}
                      href="https://metr.org/blog/2026-08-26-openai-hugging-face-incident-investigation/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      METR e Redwood Research
                    </a>{" "}
                    revisaram o caso por conta própria e publicaram seu próprio
                    relatório no mesmo dia. É a leitura com a qual convém chegar
                    ao sprint.
                  </p>
                </div>
                <p>
                  Quando algo assim acontece, quase ninguém tem o procedimento à
                  mão: não está escrito como se contém, nem como se reconstrói o
                  que falhou, nem o que um regulador pode exigir do fornecedor,
                  nem como se conta o caso sem exagerar nem minimizar.
                </p>
                <p>
                  O sprint existe para preencher esse vazio com peças concretas.
                  Trabalha-se em cinco frentes em paralelo durante um fim de
                  semana.
                  Cada equipe entrega algo que outra pessoa possa usar: um
                  padrão, uma bancada de testes, um questionário para um
                  regulador, um exercício de mesa. Depois, o trabalho é
                  avaliado por jurados que não estiveram na sala. O
                  retorno chega por escrito e o relatório fica publicado com o
                  seu nome.{" "}
                  <a
                    className={ENLACE}
                    href="https://apartresearch.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Apart Research
                  </a>{" "}
                  e{" "}
                  <a
                    className={ENLACE}
                    href="https://www.securite-ia.fr"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    CeSIA
                  </a>{" "}
                  convocam o sprint no mundo todo; nós abrimos o hub presencial
                  em Bogotá.
                </p>
              </div>
            </div>
          </section>
        </div>
      </section>

      {/* Los cinco frentes */}
      <section id="tracks" className={`${SECCION} py-12 md:py-14`}>
        <div className={CONTENEDOR}>
          <div aria-hidden="true" className={HAIRLINE} />
          <div className={ENCABEZADO}>
            <h2 className="text-display-2 md:text-display-2-lg break-words">
              Os cinco tracks
            </h2>
            <div className={COLUMNA}>
              <p className="text-body md:text-body-lg max-w-[640px] text-aisc-ink">
                Cada equipe escolhe um. No formulário você nos diz qual
                interessa a você. A Apart explica cada track em mais detalhe na{" "}
                <a
                  className={ENLACE}
                  href={APART_SPRINT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  convocatória do sprint
                </a>
                , onde também propõe projetos concretos que você pode
                desenvolver em cada um.
              </p>
            </div>
          </div>
          <ul className="mt-12 grid grid-cols-1 gap-3 md:mt-14 lg:mt-16 lg:grid-cols-3">
            {TRACKS.map((t, i) => (
              <li className="flex" key={t.id}>
                <article className="flex min-h-[180px] w-full flex-col gap-3 rounded-[8px] border border-aisc-forest/55 bg-aisc-cream p-6 md:min-h-[200px] md:p-7">
                  <span
                    className="text-display-4 tabular-nums text-aisc-coral"
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-display-4 md:text-display-4-lg text-balance">
                    {t.titulo}
                  </h3>
                  <p className="text-body-sm text-aisc-ink">{t.body}</p>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* El hub en Bogotá */}
      <section id="bogota" className={`${SECCION} py-12 md:py-14`}>
        <div className={CONTENEDOR}>
          <div aria-hidden="true" className={HAIRLINE} />
          <div className={ENCABEZADO}>
            <h2 className="text-display-2 md:text-display-2-lg break-words">
              O que você encontra em Bogotá?
            </h2>
            <div className={COLUMNA}>
              <div className={PROSA}>
                <p>
                  Trabalhar um fim de semana inteiro é mais fácil acompanhado
                  do que sozinho em casa. Por isso abrimos uma sala em Bogotá,
                  de sexta a domingo.
                </p>
                <p>
                  A sala fica no Chicó, no norte da cidade. Enviamos o endereço
                  exato por e-mail a quem for selecionado.
                </p>
              </div>
            </div>
          </div>
          <ul className="mt-12 grid grid-cols-1 gap-3 md:mt-14 lg:mt-16 lg:grid-cols-3">
            {HUB.map((h) => (
              <li
                className="flex w-full"
                key={h.titulo}
              >
                <article className={`${TARJETA} w-full`}>
                  <h3 className="text-display-4 text-balance">{h.titulo}</h3>
                  <p className="text-body-sm text-aisc-muted">{h.body}</p>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Mentoría */}
      <section id="mentores" className={`${SECCION} py-12 md:py-14`}>
        <div className={CONTENEDOR}>
          <div aria-hidden="true" className={HAIRLINE} />
          <div className={ENCABEZADO}>
            <h2 className="text-display-2 md:text-display-2-lg break-words">
              Mentores e palestrantes
            </h2>
            <div className={COLUMNA}>
              <div className={PROSA}>
                <p>
                  Durante o fim de semana passa pela sala gente que trabalha nos
                  temas dos cinco tracks. Alguns abrem com uma palestra curta.
                  Outros se sentam com as equipes para apoiar o que estiverem
                  construindo. Cada cartão diz se a pessoa estará na sala em
                  Bogotá ou se conecta remotamente.
                </p>
              </div>
            </div>
          </div>
          <ul className="mt-12 flex flex-wrap justify-center gap-x-6 gap-y-8 md:mt-14 lg:mt-16">
            {MENTORES_ORDENADOS.map((m) => (
              <li
                className="flex w-[calc((100%_-_1.5rem)/2)] flex-col gap-3 sm:w-[calc((100%_-_3rem)/3)] lg:w-[calc((100%_-_4.5rem)/4)]"
                key={m.nombre}
              >
                <div className="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-[8px] bg-aisc-sand">
                  {m.foto ? (
                    <img
                      alt={m.nombre}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover object-center"
                      src={m.foto}
                    />
                  ) : (
                    <span
                      className="text-display-2 md:text-display-2-lg text-aisc-forest/45"
                      aria-hidden="true"
                    >
                      {iniciales(m.nombre)}
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-display-4 font-semibold text-aisc-forest">
                    {m.linkedin ? (
                      <a
                        className="underline decoration-aisc-forest/30 underline-offset-4 transition-colors hover:text-aisc-coral hover:decoration-aisc-coral"
                        href={m.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {m.nombre}
                      </a>
                    ) : (
                      m.nombre
                    )}
                  </span>
                  <span className="text-body-sm text-aisc-muted">
                    {m.rol}
                    <span aria-hidden="true"> · </span>
                    <span className="text-aisc-forest/70">
                      {m.modalidad}
                    </span>
                  </span>
                  {m.bio ? (
                    <p className="text-body-sm mt-2 text-aisc-ink">{m.bio}</p>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Quién puede aplicar: banda oscura, para que la página respire entre
          tanto papel crema y para que los cuatro perfiles no queden en viñetas. */}
      <section
        id="quien"
        className="relative overflow-hidden bg-aisc-forest-deep py-14 text-aisc-sand md:py-16"
      >
        <img
          alt=""
          aria-hidden="true"
          loading="lazy"
          width="1697"
          height="995"
          decoding="async"
          className={CTA_PATTERN_TOP}
          style={{ color: "transparent" }}
          src={PATRON}
        />
        <div className={`${CONTENEDOR} relative z-10`}>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-start lg:gap-6">
            <h2 className="text-display-2 md:text-display-2-lg break-words">
              Quem pode se inscrever?
            </h2>
            <div className="flex max-w-[640px] flex-col gap-4">
              <p className="text-body md:text-body-lg text-aisc-sand/90">
                Não se pede experiência prévia em segurança da IA nem um
                diploma específico. Pede-se estar o fim de semana inteiro e chegar com
                ideia do que você quer trabalhar.
              </p>
            </div>
          </div>
          <ul className="mt-12 grid grid-cols-1 gap-x-10 md:mt-14 lg:mt-16 lg:grid-cols-2">
            {PERFILES.map((p) => (
              <li
                className="flex flex-col gap-1.5 border-t border-aisc-sand/25 py-6"
                key={p.rotulo}
              >
                <h3 className="text-display-4 md:text-display-4-lg text-balance">
                  {p.rotulo}
                </h3>
                <p className="text-body-sm text-aisc-sand/75">{p.body}</p>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link className={CTA_LINK_PRIMARY} href="/pt/sprint/inscricao">
              Inscrever-se no hub em Bogotá
            </Link>
            <span className="text-body-sm text-aisc-sand/70">
              {CIERRE_TEXTO}
            </span>
          </div>
        </div>
      </section>

      {/* Premios */}
      <section id="premios" className={`${SECCION} py-12 md:py-14`}>
        <div className={CONTENEDOR}>
          <div aria-hidden="true" className={HAIRLINE} />
          <div className={ENCABEZADO}>
            <h2 className="text-display-2 md:text-display-2-lg break-words">
              Prêmios e o que acontece depois
            </h2>
            <div className={COLUMNA}>
              <div className={PROSA}>
                <p>
                  A Apart reparte USD 2.000 entre os cinco primeiros lugares do
                  sprint inteiro. Os jurados avaliam os projetos na semana
                  seguinte e a correção é cega: eles não sabem de onde vem cada
                  equipe.
                </p>
                <p>
                  Para além do prêmio, as equipes com melhores resultados entram
                  na via rápida da{" "}
                  <a
                    className={ENLACE}
                    href={APART_FELLOWSHIP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    bolsa de pesquisa da Apart
                  </a>{" "}
                  e ficam conectadas a mentores do campo. Cada relatório é
                  publicado na íntegra e com os nomes de seus autores.
                </p>
              </div>
            </div>
          </div>
          {/* La escalera de premios: el primer puesto lleno, los otros cuatro de
              contorno, con la cifra como lo primero que se ve. */}
          <ul className="mt-12 grid grid-cols-2 gap-3 md:mt-14 lg:mt-16 lg:grid-cols-5">
            {PREMIOS.map((p, i) => (
              <li className="flex" key={p.puesto}>
                <article
                  className={`flex min-h-[150px] w-full flex-col justify-between rounded-[8px] p-5 md:min-h-[172px] md:p-6 ${
                    i === 0
                      ? "bg-aisc-forest text-aisc-sand"
                      : "border border-aisc-forest/55 bg-aisc-cream text-aisc-ink"
                  }`}
                >
                  <span
                    className={`text-meta font-semibold tracking-widest uppercase ${
                      i === 0 ? "text-aisc-sand/75" : "text-aisc-muted"
                    }`}
                  >
                    {p.puesto}
                  </span>
                  <span className="mt-6 flex flex-col">
                    <span
                      className={`text-meta ${i === 0 ? "text-aisc-sand/75" : "text-aisc-muted"}`}
                    >
                      USD
                    </span>
                    <span
                      className={`text-display-2 md:text-display-2-lg tabular-nums ${
                        i === 0 ? "text-aisc-sand" : "text-aisc-forest"
                      }`}
                    >
                      {p.monto}
                    </span>
                  </span>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Quién convoca y quién financia */}
      <section id="organizan" className={`${SECCION} py-12 md:py-14`}>
        <div className={CONTENEDOR}>
          <div aria-hidden="true" className={HAIRLINE} />
          <div className={ENCABEZADO}>
            <h2 className="text-display-2 md:text-display-2-lg break-words">
              Quem está por trás?
            </h2>
            <div className={COLUMNA}>
              <p className="text-body md:text-body-lg max-w-[640px] text-aisc-ink">
                <a
                  className={ENLACE}
                  href="https://apartresearch.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Apart Research
                </a>{" "}
                e{" "}
                <a
                  className={ENLACE}
                  href="https://www.securite-ia.fr"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  CeSIA
                </a>{" "}
                convocam o sprint no mundo todo. Nós abrimos o hub presencial em
                Bogotá, e são estas organizações que o tornam possível.
              </p>
            </div>
          </div>
          {GRUPOS.map((g) => (
            <div className="mt-12 flex flex-col gap-5 md:mt-14" key={g.rotulo}>
              <h3 className="text-kicker text-aisc-muted">{g.rotulo}</h3>
              <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {g.orgs.map((o) => (
                  <li className="flex" key={o.name}>
                    <a
                      className="flex min-h-[190px] w-full flex-col justify-between gap-8 rounded-[8px] border border-aisc-forest/55 bg-aisc-cream p-6 transition-colors hover:bg-aisc-sand md:p-7"
                      href={o.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="flex h-[42px] items-center">
                        <img
                          alt={o.name}
                          loading="lazy"
                          decoding="async"
                          className="max-h-[38px] w-auto object-contain"
                          src={o.logo}
                        />
                      </span>
                      <span className="flex flex-col gap-2">
                        <span className="text-display-4 md:text-display-4-lg text-balance">
                          {o.name}
                        </span>
                        <span className="text-body-sm text-aisc-ink">
                          {o.body}
                        </span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Preguntas frecuentes */}
      <section id="preguntas" className={`${SECCION} py-12 md:py-14`}>
        <div className={CONTENEDOR}>
          <div aria-hidden="true" className={HAIRLINE} />
          <div className="mt-5 flex flex-col gap-8">
            <h2 className="text-display-2 md:text-display-2-lg break-words">
              Perguntas frequentes
            </h2>
            <ul className="flex flex-col">
              {FAQ.map((f) => (
                <li key={f.q}>
                  <details className="group border-t border-aisc-ink/20">
                    <summary className="text-display-4 md:text-display-4-lg flex cursor-pointer list-none items-baseline justify-between gap-6 py-5 transition-colors hover:text-aisc-forest [&::-webkit-details-marker]:hidden">
                      <span className="text-balance">{f.q}</span>
                      <span
                        aria-hidden="true"
                        className="shrink-0 text-aisc-coral transition-transform group-open:rotate-45"
                      >
                        +
                      </span>
                    </summary>
                    <p className="text-body-sm max-w-[860px] pb-5 text-aisc-muted">
                      {f.a}
                    </p>
                  </details>
                </li>
              ))}
            </ul>
            <div
              aria-hidden="true"
              className="h-px w-full flex-none bg-aisc-ink/20"
            />
          </div>
        </div>
      </section>

      {/* El cierre: panel alto y centrado, como el de SASH */}
      <section className="bg-aisc-cream px-6">
        <div className="mx-auto w-full max-w-[1400px] py-12 md:py-14 lg:py-16">
          <div className="relative flex min-h-[380px] items-center justify-center overflow-hidden rounded-[var(--radius)] bg-aisc-forest-deep px-6 py-16 text-center text-aisc-sand md:py-20">
            <img
              alt=""
              aria-hidden="true"
              loading="lazy"
              width="1697"
              height="995"
              decoding="async"
              className={CTA_PATTERN_TOP}
              style={{ color: "transparent" }}
              src={PATRON}
            />
            <img
              alt=""
              aria-hidden="true"
              loading="lazy"
              width="1697"
              height="995"
              decoding="async"
              className={CTA_PATTERN_BOTTOM}
              style={{ color: "transparent" }}
              src={PATRON}
            />
            <div className="relative z-10 flex w-full max-w-[760px] flex-col items-center gap-6">
              <span className="text-body-sm text-aisc-sand/70">
                {CIERRE_TEXTO}
              </span>
              <h2 className="text-display-2 md:text-display-2-lg text-balance">
                Inscreva-se no hub em Bogotá
              </h2>
              <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
                <Link className={CTA_LINK_PRIMARY} href="/pt/sprint/inscricao">
                  Inscrever-se
                </Link>
                <a
                  className={CTA_LINK}
                  href={APART_SPRINT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Participar on-line
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <SiteFooter idioma="pt" />
    </main>
  );
}
