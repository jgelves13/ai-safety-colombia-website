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
import { APART_SPRINT_URL, CIERRE_TEXTO_IDIOMA } from "@/app/sprint/datos";
import { alternativas } from "@/lib/idiomas";

const CIERRE_TEXTO = CIERRE_TEXTO_IDIOMA.pt;

export const metadata: Metadata = {
  title: "AI Incident Response Sprint",
  description:
    "De 11 a 13 de setembro de 2026. Apart Research e CeSIA convocam o sprint sobre resposta a incidentes de IA. Abrimos o hub presencial em Bogotá; as inscrições encerram à meia-noite de domingo, 6 de setembro.",
  alternates: { canonical: "/pt/sprint", languages: alternativas("/pt/sprint") },
};

const ENLACE =
  "text-aisc-forest underline underline-offset-[3px] transition-colors hover:text-aisc-forest-deep";

/* Los tres datos que alguien busca antes de leer nada más. Una cifra grande y
   una línea de apoyo, sin más: es lo que hace que se lean de un vistazo. */
const DATOS = [
  {
    valor: "11 a 13 de setembro",
    nota: "Três dias, da sexta à tarde ao domingo à noite",
  },
  {
    valor: "Bogotá e on-line",
    nota: "Hub presencial em Bogotá, sede a confirmar",
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
    body: "Cobrimos as refeições dos três dias, para que as equipes não precisem sair da sala para resolver isso.",
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
  foto?: string;
  linkedin?: string;
  bio?: React.ReactNode;
}[] = [
  {
    nombre: "Camila Beltrán",
    rol: "Mentora e palestrante",
    foto: "/aisc/mentores/camila-beltran.png",
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
    nombre: "Luis Cosio",
    rol: "Mentor e palestrante",
    foto: "/aisc/mentores/luis-cosio.png",
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
    nombre: "Manuela Chacón",
    rol: "Palestrante",
    foto: "/aisc/mentores/manuela-chacon.png",
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
        da IEEE sobre resiliência cooperativa em sistemas
        multiagente e participante da{" "}
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
];

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
    body: "Engenharia, ciência de dados ou segurança da informação: a contenção e a análise do incidente pedem mãos no teclado durante os três dias.",
  },
  {
    rotulo: "Direito, políticas públicas e jornalismo",
    body: "Os tracks de regulação e comunicação se ganham escrevendo bem e entendendo o processo, não programando.",
  },
  {
    rotulo: "Quem já responde a incidentes",
    body: "De bancos a saúde, a resposta a incidentes já é um ofício. Aqui se trata de ver o que muda quando quem falhou é um sistema de IA.",
  },
  {
    rotulo: "Quem chega ao tema pela primeira vez",
    body: "Não é preciso ter lido nada sobre segurança da IA. Você entra pelo que já sabe fazer e o que faltar se pergunta na sala. Boa parte de quem hoje trabalha no campo entrou por um fim de semana como este.",
  },
];

const FAQ = [
  {
    q: "Posso me inscrever se nunca trabalhei em segurança da IA?",
    a: "Sim, e é o caso de boa parte de quem participa. Os projetos que saem melhor costumam misturar alguém que conhece o campo com alguém que sabe fazer muito bem outra coisa: escrever, litigar, montar infraestrutura, ler um processo. O que pedimos é que você possa estar os três dias.",
  },
  {
    q: "Preciso saber programar?",
    a: "Não para todos os tracks. Os de regulação e comunicação se ganham escrevendo bem e entendendo o processo. Os de contenção e análise pedem mãos no teclado, embora as equipes costumem misturar perfis.",
  },
  {
    q: "Tenho que chegar com equipe?",
    a: "Não. As equipes são de uma a cinco pessoas e se formam na sexta à noite, na sala e no Discord da Apart. Muita gente chega sozinha e sai com equipe.",
  },
  {
    q: "Qual é a diferença entre se inscrever aqui e participar on-line?",
    a: "O sprint é o mesmo e o entregável vai para o mesmo lugar. Inscrever-se aqui é para o hub presencial em Bogotá, que tem vagas limitadas e por isso tem seleção. No hub cobrimos alimentação, apoio para computação e mentoria na sala. Participar on-line com a Apart não tem seleção nem limite de vagas.",
  },
  {
    q: "Quanto tempo leva a inscrição?",
    a: "Cerca de vinte minutos. Não esperamos uma proposta fechada; queremos ver como você pensa o problema.",
  },
  {
    q: "Posso me inscrever se não moro em Bogotá?",
    a: "Sim. No formulário você nos diz de onde viria. O transporte até Bogotá e a estadia correm por sua conta.",
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
              Um fim de semana para transformar os primeiros incidentes em que
              um sistema de IA agiu por conta própria contra um terceiro em
              material que sirva a quem tem que responder.
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
                Do que se trata
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
                <p>
                  Quando algo assim acontece, quase ninguém tem o procedimento à
                  mão: não está escrito como se contém, nem como se reconstrói o
                  que falhou, nem o que um regulador pode exigir do fornecedor,
                  nem como se conta o caso sem exagerar nem minimizar.
                </p>
                <p>
                  O sprint existe para preencher esse vazio com peças concretas.
                  Trabalha-se em cinco frentes em paralelo durante três dias.
                  Cada equipe entrega algo que outra pessoa possa usar: um
                  padrão, uma bancada de testes, um questionário para um
                  regulador, um exercício de mesa. Depois do fim de semana, o
                  trabalho é avaliado por jurados que não estiveram na sala. O
                  retorno chega por escrito e o relatório fica publicado com o
                  seu nome. Apart Research e CeSIA convocam o sprint no mundo
                  todo; nós abrimos o hub presencial em Bogotá.
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
                Cada equipe escolhe um. No formulário você nos diz qual chama a
                sua atenção, e isso nos serve para saber que perfis haverá na
                sala e para convidar os mentores que faltarem. A Apart descreve
                cada track na{" "}
                <a
                  className={ENLACE}
                  href={APART_SPRINT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  convocatória do sprint
                </a>
                , com projetos de exemplo para cada um.
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
              O que você encontra em Bogotá
            </h2>
            <div className={COLUMNA}>
              <div className={PROSA}>
                <p>
                  Trabalhar três dias seguidos é mais fácil acompanhado do que
                  sozinho em casa. Por isso abrimos uma sala em Bogotá durante
                  todo o fim de semana.
                </p>
                <p>
                  A sede se confirma nos próximos dias. Anunciamos por e-mail a
                  quem for selecionado e pelo{" "}
                  <a
                    className={ENLACE}
                    href="https://chat.whatsapp.com/KwE8cciX48TAVhAOHnrLaZ"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    grupo de WhatsApp
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
          <ul className="mt-12 grid grid-cols-1 gap-3 md:mt-14 lg:mt-16 lg:grid-cols-3">
            {HUB.map((h) => (
              <li className="flex" key={h.titulo}>
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
                  construindo.
                </p>
                <p>
                  Se você trabalha em resposta a incidentes, em segurança
                  ofensiva, em regulação ou em comunicação de riscos e tem
                  interesse em dar uma palestra ou acompanhar uma equipe,
                  escreva para{" "}
                  <a
                    className={ENLACE}
                    href="mailto:contacto@aisafetycolombia.org"
                  >
                    contacto@aisafetycolombia.org
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
          <ul className="mt-12 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 md:mt-14 lg:mt-16 lg:grid-cols-5">
            {MENTORES.map((m) => (
              <li className="flex flex-col gap-3" key={m.nombre}>
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
                  <span className="text-body-sm text-aisc-muted">{m.rol}</span>
                  {m.bio ? (
                    <p className="text-body-sm mt-2 text-aisc-ink">{m.bio}</p>
                  ) : null}
                </div>
              </li>
            ))}
            <li className="flex flex-col gap-3">
              <div className="flex aspect-square w-full items-center justify-center rounded-[8px] border border-dashed border-aisc-forest/40 p-4 text-center">
                <span className="text-body-sm text-aisc-muted">
                  Em breve anunciamos mais nomes.
                </span>
              </div>
            </li>
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
              Quem pode se inscrever
            </h2>
            <div className="flex max-w-[640px] flex-col gap-4">
              <p className="text-body md:text-body-lg text-aisc-sand/90">
                Não se pede experiência prévia em segurança da IA nem diploma em
                nada. Pede-se que você possa estar os três dias e que chegue com
                uma ideia do que gostaria de abordar.
              </p>
              <p className="text-body-sm text-aisc-sand/70">
                A inscrição leva cerca de vinte minutos e você não precisa
                preparar nada de antemão.
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
                  na via rápida da bolsa de pesquisa da Apart e ficam conectadas
                  a mentores do campo. Cada relatório é publicado na íntegra e
                  com os nomes de seus autores.
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
              Quem está por trás
            </h2>
            <div className={COLUMNA}>
              <p className="text-body md:text-body-lg max-w-[640px] text-aisc-ink">
                Apart Research e CeSIA convocam o sprint no mundo todo. Nós
                abrimos o hub presencial em Bogotá, e são estas organizações que
                o tornam possível.
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
              <p className="text-body md:text-body-lg text-aisc-sand/85">
                Não buscamos uma proposta fechada. Queremos ver como você
                pensa o problema.
              </p>
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
