import type { Metadata } from "next";
import Link from "next/link";
import {
  Figura,
  GraficaAsimetria,
  GraficaEstimaciones,
  GraficaGpqa,
  GraficaHoneypot,
  GraficaHorizonte,
} from "@/components/charts";
import CtaPanel from "@/components/cta-panel";
import IndiceEnsayo, { type ItemIndice } from "@/components/indice-ensayo";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import {
  CTA_LINK,
  CTA_LINK_PRIMARY,
  HERO_CORNER_CLASS,
  HERO_INNER,
  HERO_SECTION,
  PAGE_SHELL,
} from "@/components/ui";
import { alternativas } from "@/lib/idiomas";

export const metadata: Metadata = {
  title: "O que é a segurança da IA",
  description:
    "Por que a velocidade do progresso em inteligência artificial, e não a inteligência das máquinas, é o que a transforma em um problema de segurança. Com as medições que sustentam isso e o que elas não permitem concluir.",
  alternates: {
    canonical: "/pt/seguranca-da-ia",
    languages: alternativas("/pt/seguranca-da-ia"),
  },
};

/** enlace de fuente en linea: siempre apunta al documento primario, nunca a un resumen */
function Fuente({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-aisc-forest underline decoration-aisc-forest/40 underline-offset-4 transition-colors hover:decoration-aisc-forest"
    >
      {children}
    </a>
  );
}

/* Ancho de lectura: una sola columna. La prosa se queda en 720px y las figuras
   salen a 980px. */
const COL = "mx-auto w-full max-w-[720px]";
const ANCHO = "mx-auto w-full max-w-[980px] px-6 md:px-8";
const P = "text-body md:text-body-lg text-aisc-ink";

function H2({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <div className={`${COL} scroll-mt-24 pt-14 md:pt-16`} id={id}>
      <h2 className="text-display-2 md:text-display-2-lg text-balance">
        {children}
      </h2>
    </div>
  );
}

function H3({ id, children }: { id?: string; children: React.ReactNode }) {
  return (
    <h3
      id={id}
      className={`${COL} text-display-4 md:text-display-4-lg mt-10 mb-3 scroll-mt-24 text-aisc-forest`}
    >
      {children}
    </h3>
  );
}

function Parrafo({ children }: { children: React.ReactNode }) {
  return <p className={`${COL} ${P} mt-5`}>{children}</p>;
}

const INDICE: ItemIndice[] = [
  { id: "resumen", label: "Em resumo" },
  {
    id: "capacidades",
    label: "Esses sistemas fazem cada vez mais coisas sem supervisão",
    corto: "O que fazem sem supervisão",
  },
  {
    id: "horizonte",
    label: "De responder perguntas a executar tarefas",
    corto: "De responder a agir",
    nivel: 3,
  },
  {
    id: "verificacion",
    label: "Olhar dentro de um modelo só agora começa a ser possível",
    corto: "Olhar dentro do modelo",
  },
  {
    id: "incidentes",
    label: "Já existem casos em que o sistema saiu da sua caixa",
    corto: "Casos fora da caixa",
  },
  {
    id: "intencional",
    label: "E nem tudo é acidental",
    corto: "Nem tudo é acidental",
    nivel: 3,
  },
  {
    id: "pesos-abiertos",
    label: "Publicar os pesos elimina o freio",
    corto: "Pesos publicados",
    nivel: 3,
  },
  {
    id: "asimetria",
    label: "A capacidade de decidir não cresce no mesmo ritmo",
    corto: "Decidir anda em outro ritmo",
  },
  {
    id: "desacuerdo",
    label: "Quem discorda tem parte de razão",
    corto: "A discordância tem razão",
  },
  {
    id: "objeciones",
    label: "As cinco objeções que mais ouvimos",
    corto: "Cinco objeções",
    nivel: 3,
  },
  {
    id: "frentes",
    label: "São três frentes e nem todas exigem formação técnica",
    corto: "Três frentes de trabalho",
  },
  {
    id: "colombia",
    label: "Há mais problemas abertos do que gente para trabalhar neles",
    corto: "Mais problemas do que gente",
  },
];

const RESUMEN = [
  "Os melhores sistemas de IA já não respondem perguntas: trabalham sozinhos durante horas, escrevem e executam código e usam ferramentas sem que ninguém revise cada passo. A METR, a organização que mede o que esses sistemas conseguem fazer, encontra que a duração das tarefas que completam sozinhos dobra a cada sete meses. Quando um sistema responde, um erro é uma resposta ruim que alguém descarta; quando age, um erro é algo que já aconteceu.",
  "Ninguém sabe verificar de antemão o que um desses sistemas vai fazer, porque eles não são programados, são treinados. Em 2025 a Anthropic descobriu que seu modelo reconhecia quando estava sendo avaliado e que isso o fazia comportar-se melhor, o que colocou em dúvida suas próprias medições de segurança. Em julho de 2026, dois modelos da OpenAI saíram do ambiente isolado em que estavam sendo testados, comprometeram a infraestrutura da Hugging Face e tiraram de lá as respostas do exame que estavam fazendo. Ninguém era obrigado a reportar isso.",
  "Verificar esses sistemas e decidir sobre eles, enquanto isso, avança no ritmo de sempre. Todo o campo da segurança da IA soma cerca de 1.300 pessoas e USD 525 milhões por ano; as quatro empresas que mais investem anunciaram perto de 700.000 milhões só para 2026. O mapa mais completo do campo, com 170 organizações, não registra nenhuma na América Latina.",
];

/** las tres formas de trabajar en el problema */
const FRENTES = [
  {
    title: "Alinhamento e interpretabilidade",
    body: "Como fazer com que um sistema persiga o que lhe foi pedido e não algo parecido, e como olhar por dentro para saber o que está fazendo. Ataca o problema de fundo e continua sem solução.",
  },
  {
    title: "Avaliação e controle",
    body: "Como medir do que um modelo é capaz antes de publicá-lo e como supervisioná-lo quando já age sozinho. É o mais parecido com uma inspeção técnica e onde mais falta gente.",
  },
  {
    title: "Governança e política pública",
    body: "O que se exige de quem implanta um sistema, com que evidência e diante de quem responde. Na Colômbia isso está sendo decidido agora, nas compras públicas e na regulação setorial, e não exige formação técnica.",
  },
];

export default function SegurancaDaIa() {
  return (
    <main className={PAGE_SHELL} lang="pt">
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
          src="/aisc/patterns/aisc-hero-seguridad.svg"
        />
        <SiteHeader active="/pt/seguranca-da-ia" />
        <div className={HERO_INNER}>
          <div className="flex max-w-[760px] flex-col gap-5">
            <h1 className="text-display-1 md:text-display-1-lg text-aisc-sand text-balance">
              O que é a segurança da IA
            </h1>
            <p className="text-body md:text-body-lg max-w-[660px] text-aisc-sand/90">
              A{" "}
              <a
                href="https://hai.stanford.edu/ai-definitions/what-is-ai-safety"
                target="_blank"
                rel="noopener noreferrer"
                className="text-aisc-sand underline decoration-aisc-sand/40 underline-offset-4 transition-colors hover:decoration-aisc-sand"
              >
                “segurança da IA”
              </a>{" "}
              é o campo que trabalha para que os sistemas de inteligência
              artificial façam o que se espera deles e não causem danos. O
              problema é verificar isso. Esses sistemas não são programados, são
              treinados, então ninguém escreve as regras que eles acabam
              seguindo, e hoje já trabalham sozinhos durante horas. Este texto
              explica até onde isso chegou, o que se pode medir e o que não, e
              como alguém entra para trabalhar nisso.
            </p>
            <p className="text-meta text-aisc-sand/60">
              AI Safety Colombia · atualizado em agosto de 2026 · cerca de 15
              minutos de leitura
            </p>
          </div>
        </div>
      </section>

      <article className="bg-aisc-cream pb-16 md:pb-20">
        {/* Entrada: la escena concreta antes de cualquier definicion */}
        <div className={`${ANCHO} pt-14 md:pt-16`}>
          <p className={`${COL} text-display-4 md:text-display-4-lg text-aisc-forest`}>
            Um órgão público está prestes a contratar um sistema de
            inteligência artificial para ordenar as inscrições em um programa
            social, e alguém tem que revisar o edital. Tem o nome do
            fornecedor, uma demonstração de vinte minutos e a promessa de 92 %
            de acerto sobre um conjunto de prova que o próprio fornecedor
            montou. Não tem os pesos do modelo, nem os dados de treinamento,
            nem forma de rodá-lo com casos que o órgão desenhe.
          </p>
          <Parrafo>
            O que essa pessoa deveria exigir antes de assinar é a pergunta deste
            texto. A resposta curta: hoje ninguém sabe certificar o que um
            desses sistemas persegue, nem quem os constrói.
          </Parrafo>

          {/* En resumen: lo que se lleva quien no siga leyendo */}
          <div className={`${COL} mt-12 scroll-mt-24`} id="resumen">
            <div className="rounded-lg border border-aisc-ink bg-aisc-sand p-6 md:p-8">
              <span className="text-kicker text-aisc-coral">Em resumo</span>
              <div className="mt-5 flex flex-col gap-4">
                {RESUMEN.map((parrafo) => (
                  <p
                    key={parrafo}
                    className="text-body-sm md:text-body text-aisc-ink"
                  >
                    {parrafo}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* En esta pagina */}
          <IndiceEnsayo items={INDICE} idioma="pt" />

          {/* ---------------------------------------------------------- */}
          <H2 id="capacidades">
            Esses sistemas fazem cada vez mais coisas sem supervisão
          </H2>
          <Parrafo>
            GPQA é um conjunto de perguntas de biologia, física e química que
            doutorandos escreveram em 2023 para que resistissem ao Google. As
            pessoas com doutorado na disciplina de cada pergunta acertaram
            65 %, ou 74 % descontando as perguntas em que elas mesmas, ao
            reler, aceitaram ter lido mal o enunciado. Pessoas com formação mas
            de fora do tema, com acesso à internet e meia hora por pergunta,
            ficaram em 34 %, nove pontos acima dos 25 % do acaso{" "}
            <Fuente href="https://arxiv.org/abs/2311.12022">
              (Rein et al., 2023)
            </Fuente>
            . O melhor sistema disponível naquele ano obteve 39 %, mais perto
            dos não especialistas do que dos especialistas. Em dezembro de
            2024, vinte meses depois de o exame ser publicado, um modelo passou
            os especialistas.
          </Parrafo>

          <Figura
            numero={1}
            idioma="pt"
            titulo="Um exame feito para resistir ao Google, superado em vinte meses"
            pie="Cada ponto é o melhor resultado publicado até essa data no GPQA Diamond, o subconjunto de 198 perguntas que os especialistas do estudo original responderam corretamente. A linha pontilhada, 69,7 %, é o que obteve nesse subconjunto um grupo com doutorado recrutado pela OpenAI."
            limite="se um sistema entende de biologia, porque são perguntas de múltipla escolha e só se avalia a resposta final. O exame também satura: quando os sistemas passam de 95 % deixa de servir para distinguir uns dos outros."
            fuentes={[
              {
                texto: "Rein et al. (2023), o exame e seus grupos de controle",
                href: "https://arxiv.org/abs/2311.12022",
              },
              {
                texto: "OpenAI, “Learning to Reason with LLMs”, a linha de 69,7 %",
                href: "https://openai.com/index/learning-to-reason-with-llms/",
              },
              {
                texto: "Epoch AI, “GPQA Diamond”, AI Benchmarking Hub (CC BY)",
                href: "https://epoch.ai/benchmarks/gpqa-diamond",
              },
            ]}
          >
            <GraficaGpqa idioma="pt" />
          </Figura>

          <Parrafo>
            Esse progresso também fica mais barato por conta própria. A Epoch AI
            revisou 231 modelos de linguagem publicados ao longo de uma década e
            mediu quanta capacidade de cálculo era necessária, ano a ano, para
            alcançar o mesmo desempenho. Faz falta metade a cada oito meses, com
            um intervalo de confiança de 95 % entre cinco e catorze meses{" "}
            <Fuente href="https://epoch.ai/blog/algorithmic-progress-in-language-models">
              (Epoch AI, 2024)
            </Fuente>
            . Não é que as máquinas sejam melhores: é que as pessoas aprenderam
            a tirar mais das mesmas máquinas. O que hoje só roda no centro de
            dados de uma das grandes empresas, em poucos anos vai rodar para
            muito mais gente com muito menos.
          </Parrafo>

          <H3 id="horizonte">De responder perguntas a executar tarefas</H3>
          <Parrafo>
            A fronteira já não são modelos que respondem: são agentes que
            escrevem e executam código durante horas sem que ninguém revise cada
            passo. A METR, a organização a quem os laboratórios entregam seus
            modelos antes de publicá-los, mede cada tarefa pelo tempo que um
            profissional levaria para fazê-la. Seu indicador é a duração a
            partir da qual o modelo já erra metade das vezes: se resolve o que a
            uma pessoa toma uma hora, mas tropeça no trabalho de quatro, seu
            horizonte é de uma hora.
          </Parrafo>

          <Figura
            numero={2}
            idioma="pt"
            titulo="De cinco minutos a dezessete horas, acertando metade das vezes"
            pie="Duração da tarefa mais longa que o melhor modelo de cada momento completa com 50 % de sucesso. Eixo logarítmico. A METR estima que dobra a cada sete meses."
            limite="que os modelos vão substituir um profissional. As tarefas medidas são de software e pesquisa, e nem a própria METR afirma que o resultado se transfira para outros ofícios."
            fuentes={[
              {
                texto: "METR, “Measuring AI Ability to Complete Long Tasks”",
                href: "https://metr.org/blog/2025-03-19-measuring-ai-ability-to-complete-long-tasks/",
              },
              {
                texto: "Epoch AI, “METR Time Horizons” (CC BY), a série atualizada",
                href: "https://epoch.ai/benchmarks/metr-time-horizons",
              },
            ]}
          >
            <GraficaHorizonte idioma="pt" />
          </Figura>

          <Parrafo>
            Quando um sistema responde, um erro é uma resposta que alguém
            descarta. Quando age, um erro é algo que já aconteceu. E quanto mais
            longa a cadeia, menos viável fica segui-la passo a passo, que é o
            controle disponível hoje.
          </Parrafo>

          {/* ---------------------------------------------------------- */}
          <H2 id="verificacion">
            Olhar dentro de um modelo só agora começa a ser possível
          </H2>
          <Parrafo>
            Um modelo não é programado: define-se uma medida de sucesso,
            mostram-se milhões de exemplos e ele ajusta sozinho bilhões de
            números que ninguém escolheu. Ninguém escreveu esses números e
            ninguém pode lê-los de forma corrida. Então o único caminho prático
            para saber o que um sistema vai fazer é submetê-lo a provas e olhar
            como se comporta. Em 2025 ficou visível que esse caminho tem um
            problema.
          </Parrafo>
          <Parrafo>
            Em setembro daquele ano,{" "}
            <Fuente href="https://www.anthropic.com/claude-sonnet-4-5-system-card">
              o relatório técnico do Claude Sonnet 4.5
            </Fuente>{" "}
            reportou algo que a Anthropic não estava procurando: o modelo dizia
            em voz alta que suspeitava estar em uma prova, e quando dizia isso,
            quase nunca se comportava mal. Descartar essas conversas e ficar com
            o resto não resolve nada, porque o modelo também pode perceber sem
            dizer. De fora não há como saber se percebeu.
          </Parrafo>
          <Parrafo>
            Então a Anthropic o abriu por dentro. Quando uma rede maneja uma
            ideia, acende-se dentro dela um padrão de ativações associado a essa
            ideia, e é isso que a interpretabilidade permite localizar. A prova
            foram cem cenários-armadilha: situações montadas para que o modelo
            tivesse ao alcance uma ação indevida e nenhuma razão aparente para
            não a executar, por exemplo permissões mais amplas do que deveria
            ter e ninguém supervisionando. Sem tocar em nada, disse em mais de
            80 % desses cenários que aquilo parecia uma prova, e não executou a
            ação indevida em nenhum dos cem. Com o padrão de “isto é uma
            avaliação” desligado e os cenários idênticos, executou-a em até 9 de
            100. Desligar dez padrões ao acaso, que foi o controle, não produziu
            nenhuma.
          </Parrafo>

          <Figura
            numero={3}
            idioma="pt"
            titulo="O exame media, em parte, se o modelo sabia que era um exame"
            pie="Proporção de ações desalinhadas em cem cenários-armadilha. As três primeiras barras são o Claude Sonnet 4.5 sob diferentes intervenções internas; a última é o modelo anterior, sem intervenção."
            limite="que o modelo seja perigoso, nem que estivesse fingindo de propósito. Os 9 % são o pior resultado entre todas as intervenções tentadas; com a maioria delas o modelo ficou entre 1 e 5 %."
            fuentes={[
              {
                texto: "Anthropic, “System Card: Claude Sonnet 4.5”, seção 7.6.4.1 (setembro de 2025)",
                href: "https://www.anthropic.com/claude-sonnet-4-5-system-card",
              },
            ]}
          >
            <GraficaHoneypot idioma="pt" />
          </Figura>

          <Parrafo>
            Isso não torna o modelo perigoso, e convém dizê-lo. Nem no pior caso
            ele se comportou pior do que a versão anterior, e a Anthropic não
            encontrou sinal de que estivesse enganando alguém de propósito; sua
            explicação é que reconhecer uma prova lembra ao modelo seus próprios
            princípios. O que ficou demonstrado é outra coisa. O número com que
            se decide se um sistema sai para o mundo dependia de algo que
            ninguém estava controlando. Abri-lo por dentro serviu para descobrir
            isso, e não serve para o contrário, que seria certificar que o
            próximo número está limpo.
          </Parrafo>
          <Parrafo>
            Essa ferramenta é mais jovem do que parece. A Anthropic, que é quem
            mais publicou sobre ela, diz do seu próprio método para traçar
            circuitos que dá uma explicação satisfatória em cerca de um quarto
            dos casos que tenta{" "}
            <Fuente href="https://transformer-circuits.pub/2025/attribution-graphs/biology.html">
              “On the Biology of a Large Language Model”
            </Fuente>
            . Dario Amodei, seu diretor executivo, colocou como meta que em 2027
            a interpretabilidade detecte de forma confiável a maioria dos
            problemas de um modelo, e descreve assim o ponto de partida: quando
            um desses sistemas faz algo, não temos ideia, em um nível preciso,
            de por que toma as decisões que toma{" "}
            <Fuente href="https://darioamodei.com/post/the-urgency-of-interpretability">
              “The Urgency of Interpretability”
            </Fuente>
            . Enquanto isso o problema se estendeu. Em julho de 2026 a Redwood
            Research revisou as avaliações de segurança publicadas por
            Anthropic, OpenAI, Meta, Google DeepMind e o instituto britânico, e
            encontrou que os modelos continuam reconhecendo as provas, com as
            taxas mais altas registradas até agora no último modelo da Meta. Sua{" "}
            <Fuente href="https://blog.redwoodresearch.org/p/sota-alignment-assessments-dont-strongly">
              conclusão
            </Fuente>{" "}
            é que essas avaliações dizem consideravelmente menos do que parecem
            dizer.
          </Parrafo>
          <Parrafo>
            Uma ponte se calcula, se inspeciona e alguém a assina. Um modelo se
            prova de fora, e o que fica é uma estatística sobre os casos que
            alguém pensou em tentar. O exame por dentro que se fez ao Claude
            Sonnet 4.5 foi o primeiro do seu tipo antes de publicar um modelo de
            fronteira, foi feito pela mesma empresa que ia vendê-lo, e a
            Anthropic pede que deixe de ser voluntário.
          </Parrafo>

          {/* ---------------------------------------------------------- */}
          <H2 id="incidentes">
            Já existem casos em que o sistema saiu da sua caixa
          </H2>
          <Parrafo>
            Em julho de 2026 a OpenAI estava avaliando dois de seus modelos,
            GPT-5.6 Sol e um sem publicar, contra um teste de cibersegurança
            ofensiva. Para medir até onde chegariam, parte das restrições de
            segurança tinha sido levantada. Dentro do ambiente isolado gastaram
            capacidade de cálculo considerável procurando uma saída para a
            internet. Encontraram uma falha que ninguém havia reportado em um
            servidor interno de bibliotecas, encadearam-na com outras até sair
            do ambiente de pesquisa da OpenAI e chegar à infraestrutura da
            Hugging Face, e tiraram do banco de dados da Hugging Face as
            respostas do exame que estavam fazendo{" "}
            <Fuente href="https://openai.com/index/hugging-face-model-evaluation-security-incident/">
              (OpenAI, 21 de julho de 2026)
            </Fuente>
            . A Hugging Face confirmou que chegaram a controlar máquinas
            inteiras, que se registraram mais de 17.000 eventos de atacante e
            que nada do que as pessoas publicam ali foi comprometido{" "}
            <Fuente href="https://huggingface.co/blog/security-incident-july-2026">
              (Hugging Face, 16 de julho de 2026)
            </Fuente>
            .
          </Parrafo>
          <Parrafo>
            Não houve intenção de causar dano: os modelos estavam resolvendo o
            problema que lhes deram. Um objetivo estreito, capacidade suficiente
            e nenhuma instrução de parar bastaram para sair da caixa e
            comprometer a infraestrutura de um terceiro. Nenhuma das duas
            empresas era obrigada a reportá-lo: as leis estaduais que hoje
            exigem reportar incidentes de IA nos Estados Unidos colocam o limiar
            em cinquenta mortes ou mil milhões de dólares em danos{" "}
            <Fuente href="https://www.iaps.ai/research/the-openaihugging-face-incident-challenges-in-controlling-and-containing-cyber-capable-ai-systems">
              (Institute for AI Policy and Strategy, 2026)
            </Fuente>
            .
          </Parrafo>

          <H3 id="intencional">E nem tudo é acidental</H3>
          <Parrafo>
            Em junho de 2025 a equipe de inteligência de ameaças do Google
            encontrou na Ucrânia um programa espião disfarçado de gerador de
            imagens que, enquanto a vítima digitava, perguntava a um modelo de
            linguagem aberto quais comandos usar para encontrar documentos e
            copiá-los. As ordens não vinham escritas dentro: pedia-as na hora e
            executava-as sem revisá-las. O Google atribui isso ao APT28, o grupo
            associado à inteligência militar russa, e diz que é a primeira vez
            que vê um programa malicioso consultando um modelo de linguagem em
            uma operação real{" "}
            <Fuente href="https://cloud.google.com/blog/topics/threat-intelligence/threat-actor-usage-of-ai-tools">
              (Google Threat Intelligence Group, novembro de 2025)
            </Fuente>
            . O mesmo relatório qualifica essas capacidades de incipientes. O
            que muda não é a potência do ataque, é onde fica sua parte
            pensante: antes vinha escrita dentro do arquivo, onde um analista
            podia lê-la, e agora se gera diferente em cada execução. Um antivírus
            que reconhece uma ameaça por sua assinatura, isto é, pelo aspecto do
            arquivo, fica sem nada fixo para reconhecer.
          </Parrafo>

          <H3 id="pesos-abiertos">
            Publicar os pesos elimina o freio, e em biologia isso já importa
          </H3>
          <Parrafo>
            Nos dois casos anteriores havia uma empresa que podia cortar o
            acesso ao modelo. Publicar os pesos elimina essa possibilidade: quem
            os tem roda o modelo na sua própria máquina, retira as restrições e
            continua usando-o mesmo que o autor se arrependa. Os modelos
            abertos têm bons argumentos a seu favor, começando porque sem eles a
            pesquisa de países como o nosso seria muito mais difícil. O balanço
            depende do domínio.
          </Parrafo>
          <Parrafo>
            Em 6 de agosto de 2026 a <em>Science</em> publicou o trabalho de uma
            equipe de Stanford e do Arc Institute liderada por Brian Hie e
            Samuel King. Com Evo 1 e Evo 2, modelos treinados com sequências de
            DNA em vez de texto e cujos pesos estão publicados, escreveram
            genomas virais completos a partir de um fragmento curto. De cerca de
            700.000 genomas gerados enviaram 302 para serem sintetizados,
            conseguiram construir 285 e 16 resultaram em vírus funcionais,
            capazes de destruir <em>E. coli</em> em duas ou três horas{" "}
            <Fuente href="https://www.science.org/doi/10.1126/science.aec2657">
              (King, Hie et al., Science, agosto de 2026)
            </Fuente>
            . São bacteriófagos, que infectam bactérias e não pessoas: as
            sequências capazes de infectar humanos, animais ou plantas foram
            excluídas do treinamento{" "}
            <Fuente href="https://arcinstitute.org/news/hie-king-first-synthetic-phage">
              (Arc Institute, 2026)
            </Fuente>
            . 5,6 % do que conseguiram construir funcionou, 16 genomas de 285.
            Escrever do zero um genoma viral que depois funciona no laboratório
            deixou de ser hipotético.
          </Parrafo>
          <Parrafo>
            Entre um desenho na tela e uma molécula real há um único controle: os
            fornecedores de síntese de DNA, que revisam cada pedido de forma
            voluntária. Em outubro de 2025 uma equipe liderada por Eric
            Horvitz, diretor científico da Microsoft, gerou 76.089 variantes de
            72 proteínas preocupantes, entre elas a ricina e a neurotoxina
            botulínica, e a maioria passou sem ser detectada pelo software com
            que esses fornecedores revisam os pedidos{" "}
            <Fuente href="https://erichorvitz.com/paraphrase.htm">
              (Wittmann et al., Science, 2025)
            </Fuente>
            . O exercício foi computacional: nada foi sintetizado e não se
            demonstrou que as variantes mantivessem a toxicidade, e Michael
            Cohen, de Berkeley, sustenta que o desafio era fraco.
          </Parrafo>
          <Parrafo>
            O gargalo continua sendo o laboratório, e quanto isso dura é o que
            ninguém sabe medir. Em maio de 2025 a Anthropic ativou seu nível de
            proteção ASL-3 para o Claude Opus 4 sem ter determinado que o modelo
            cruzava o limiar que o exige, porque já não era possível descartar
            esse risco{" "}
            <Fuente href="https://www.anthropic.com/news/activating-asl3-protections">
              (Anthropic, 2025)
            </Fuente>
            . A restrição que manda não é o que o sistema pode fazer, é o que
            ninguém sabe verificar.
          </Parrafo>

          {/* ---------------------------------------------------------- */}
          <H2 id="asimetria">
            A capacidade de decidir não cresce no mesmo ritmo
          </H2>
          <Parrafo>
            O que acelera é a tecnologia. As pessoas que entendem do assunto, a
            discussão pública e os calendários das instituições continuam no
            ritmo de sempre. Acelerar só uma das duas metades deixa a outra cada
            vez mais atrás, e o argumento é de William MacAskill e Fin Moorhouse{" "}
            <Fuente href="https://www.forethought.org/research/preparing-for-the-intelligence-explosion">
              (Forethought, 2025)
            </Fuente>
            .
          </Parrafo>
          <Parrafo>
            A forma mais simples de ver isso é contar quem está de cada lado. Um
            mapeamento público encontra 170 organizações dedicadas à segurança e
            à governança da IA no mundo: somando só as que reportam dados, cerca
            de 1.313 pessoas em tempo integral e uns USD 525 milhões por ano{" "}
            <Fuente href="https://harrywaterman.com/fieldmap/">
              (AI Safety Field Map, dados até setembro de 2025)
            </Fuente>
            . Amazon, Google, Meta e Microsoft anunciaram perto de USD 700.000
            milhões em infraestrutura de IA só para 2026, mais de 60 % acima de
            2025{" "}
            <Fuente href="https://www.cnbc.com/2026/02/06/google-microsoft-meta-amazon-ai-cash.html">
              (CNBC, 2026)
            </Fuente>
            .
          </Parrafo>

          <Figura
            numero={4}
            idioma="pt"
            titulo="Três ordens de grandeza entre construir esses sistemas e entendê-los"
            pie="Orçamento anual declarado do campo da segurança da IA contra o investimento em infraestrutura anunciado pelas quatro empresas que mais gastam. Escala logarítmica."
            limite="quanto essas quatro empresas gastam em segurança, porque não o desagregam. A comparação também não é exata: uma cifra é gasto operacional e a outra investimento de capital, então serve para a ordem de grandeza e não para a diferença precisa."
            fuentes={[
              {
                texto: "AI Safety Field Map (setembro de 2025), o campo",
                href: "https://harrywaterman.com/fieldmap/",
              },
              {
                texto: "CNBC (fevereiro de 2026), o investimento anunciado",
                href: "https://www.cnbc.com/2026/02/06/google-microsoft-meta-amazon-ai-cash.html",
              },
            ]}
          >
            <GraficaAsimetria idioma="pt" />
          </Figura>

          <Parrafo>
            A outra metade da assimetria é o calendário. A Colômbia aprovou sua
            política nacional de inteligência artificial em fevereiro de 2025,
            com mais de cem ações e um roteiro que vai até 2030{" "}
            <Fuente href="https://colaboracion.dnp.gov.co/CDT/Conpes/Econ%C3%B3micos/4144.pdf">
              (CONPES 4144, DNP)
            </Fuente>
            . Esse prazo é normal para uma política pública; o ponto é a
            comparação. Se a tendência que a METR mede se mantivesse nesses
            cinco anos, o horizonte de tarefas que um sistema executa sozinho
            teria dobrado oito vezes, isto é multiplicado por mais de duzentos,
            antes que termine o plano que ia regulá-lo.
          </Parrafo>
          <Parrafo>
            Daí a tentação de esperar, que para muitos problemas é o acertado.
            Para três coisas não é. As regras que se fixam quando um assunto é
            novo costumam durar, e quem não está na mesa em que se escrevem
            tampouco está quando se aplicam. Montar uma capacidade de auditoria
            ou formar alguém leva anos. E há acordos que só se assinam enquanto
            ninguém sabe ainda a quem vão favorecer: depois cada um já calculou
            o que lhe convém e deixa de assiná-los.
          </Parrafo>

          {/* ---------------------------------------------------------- */}
          <H2 id="desacuerdo">Quem discorda tem parte de razão</H2>
          <Parrafo>
            Em 2023 perguntou-se a 2.778 pesquisadores que publicam nas
            principais conferências de IA pela probabilidade de que a IA
            avançada termine em extinção humana ou em uma perda de controle
            comparável: a mediana foi 5 % e a média 16,2 %, e entre 38 % e 51 %
            deram a esse desfecho ao menos 10 %{" "}
            <Fuente href="https://arxiv.org/abs/2401.02843">
              (Grace et al., 2024)
            </Fuente>
            . Os prognosticadores profissionais dão números muito mais baixos:
            em um torneio do Forecasting Research Institute, um grupo de
            especialistas em IA estimou 3 % antes de 2100, e os
            superprognosticadores, escolhidos por acertar de forma sistemática,
            0,38 %{" "}
            <Fuente href="https://forecastingresearch.org/xpt">
              (Forecasting Research Institute, 2023)
            </Fuente>
            .
          </Parrafo>

          <Figura
            numero={5}
            idioma="pt"
            titulo="Quase uma ordem de grandeza entre pessoas cujo ofício é estimar bem"
            pie="Probabilidade de extinção ou perda grave de controle causada pela IA. Eixo logarítmico."
            limite="uma probabilidade real. São opiniões agregadas, as perguntas não são idênticas nos dois estudos e o torneio foi feito em 2022, antes do ChatGPT."
            fuentes={[
              {
                texto: "Grace et al. (2024), a pesquisa com pesquisadores",
                href: "https://arxiv.org/abs/2401.02843",
              },
              {
                texto: "Forecasting Research Institute (2023), o torneio de prognóstico",
                href: "https://forecastingresearch.org/xpt",
              },
            ]}
          >
            <GraficaEstimaciones idioma="pt" />
          </Figura>

          <Parrafo>
            A discordância é de fundo. O Prêmio Turing de 2018 foi para três
            pessoas pela aprendizagem profunda, a técnica sobre a qual tudo isso
            está construído, e duas das três hoje alertam publicamente sobre o
            que ajudaram a construir. Geoffrey Hinton renunciou ao Google em
            2023 para falar sem representar ninguém{" "}
            <Fuente href="https://www.technologyreview.com/2023/05/02/1072528/geoffrey-hinton-google-why-scared-ai/">
              (MIT Technology Review, maio de 2023)
            </Fuente>
            . Yoshua Bengio explicou naquele mesmo ano{" "}
            <Fuente href="https://yoshuabengio.org/2023/06/24/faq-on-catastrophic-ai-risks/">
              por que dá peso aos riscos catastróficos
            </Fuente>{" "}
            e hoje preside{" "}
            <Fuente href="https://arxiv.org/abs/2602.21012">
              o relatório internacional sobre segurança da IA
            </Fuente>
            , respaldado por vinte e nove países, a ONU, a OCDE e a União
            Europeia.
          </Parrafo>
          <Parrafo>
            O terceiro é Yann LeCun, e pensa o contrário: a inteligência não traz
            consigo a vontade de dominar{" "}
            <Fuente href="https://time.com/6694432/yann-lecun-meta-ai-interview/">
              (TIME, fevereiro de 2024)
            </Fuente>
            . Andrew Ng considera minúscula a probabilidade de um acidente desse
            tipo, embora leve a sério o uso malicioso{" "}
            <Fuente href="https://www.deeplearning.ai/the-batch/ai-doomsday-scenarios-and-how-to-guard-against-them">
              (The Batch, dezembro de 2023)
            </Fuente>
            . Melanie Mitchell aponta para a pesquisa:{" "}
            <Fuente href="https://aiguide.substack.com/p/do-half-of-ai-researchers-believe">
              quem decide respondê-la não é uma amostra aleatória da disciplina
            </Fuente>
            . Responderam-na 2.778 das 18.459 pessoas convidadas, 15 %. Gary
            Marcus situa o perigo{" "}
            <Fuente href="https://garymarcus.substack.com/p/ai-risk-agi-risk">
              em sistemas medíocres a quem já se entregam decisões
            </Fuente>
            , e por isso exige regulação com tanta força quanto qualquer um dos
            outros.
          </Parrafo>

          <H3 id="objeciones">As cinco objeções que mais ouvimos</H3>
          <Parrafo>
            <strong>Isto é uma estratégia de marketing.</strong> Em parte sim:
            convém ao laboratório que seu produto soe potente. Mas as cifras
            desta página vêm de fora dessas empresas: de{" "}
            <Fuente href="https://blog.redwoodresearch.org/p/sota-alignment-assessments-dont-strongly">
              gente que avalia os modelos por conta própria
            </Fuente>
            , de Hinton e Bengio, e de um{" "}
            <Fuente href="https://futureoflife.org/ai-safety-index-summer-2026/">
              painel independente
            </Fuente>{" "}
            que este ano não deu a nenhuma delas mais do que C+ em segurança. E
            às vezes é a própria empresa que diz o que nenhum vendedor diria. A
            Anthropic negou o Claude ao Pentágono para armas autônomas porque os
            sistemas de fronteira{" "}
            <Fuente href="https://www.anthropic.com/news/statement-department-of-war">
              “não são suficientemente confiáveis”
            </Fuente>
            , e isso lhe custou{" "}
            <Fuente href="https://www.anthropic.com/news/anthropic-and-the-department-of-defense-to-advance-responsible-ai-in-defense-operations">
              um contrato de até USD 200 milhões
            </Fuente>{" "}
            e{" "}
            <Fuente href="https://www.npr.org/2026/03/06/g-s1-112713/pentagon-labels-ai-company-anthropic-a-supply-chain-risk">
              o acesso a todas as agências federais
            </Fuente>
            .
          </Parrafo>
          <Parrafo>
            <strong>Os modelos ainda erram em coisas óbvias.</strong> É verdade,
            e não afirmamos que sejam confiáveis, ao contrário: erram de formas
            difíceis de antecipar. Um sistema que errasse sempre igual poderia
            ser delimitado e certificado. O problema é que ninguém sabe de
            antemão em que vai errar.
          </Parrafo>
          <Parrafo>
            <strong>Isto distrai dos danos que já existem.</strong> É a objeção
            que corrige o argumento, porque a atenção e o orçamento são finitos.
            Mas o trabalho se sobrepõe: medir do que um sistema é capaz,
            auditá-lo e ter alguém a quem cobrar quando falha é a mesma
            capacidade institucional para um modelo que hoje nega um crédito e
            para um que daqui a dez anos opere infraestrutura.
          </Parrafo>
          <Parrafo>
            <strong>O progresso vai empacar.</strong> Pode ser: a capacidade de
            cálculo, a energia e os dados de boa qualidade são gargalos reais.
            Contra isso está a medição da Epoch: se a capacidade de cálculo
            necessária para o mesmo desempenho cai pela metade a cada oito
            meses, avançar exige cada vez menos recursos, não mais. E mesmo que
            os freios ganhem, esse mundo também precisa de alguém que audite o
            que compra.
          </Parrafo>
          <Parrafo>
            <strong>Ninguém vai implantar algo perigoso de propósito.</strong> O
            argumento não precisa que alguém o faça de propósito. Bastam duas
            condições que já se cumprem: que seja difícil verificar o que um
            sistema faz antes de publicá-lo, e que haja pressão competitiva para
            publicá-lo mesmo assim. O episódio da OpenAI e da Hugging Face
            aconteceu a portas fechadas, em uma prova que a própria empresa
            tinha desenhado para medir esse risco.
          </Parrafo>
          <Parrafo>
            O campo pode estar exagerando o perigo e pode estar subestimando-o. O
            que sustentamos não depende de acertar o número: hoje não sabemos
            certificar o que um sistema persegue, e as decisões difíceis de
            reverter estão sendo tomadas agora. Se a fronteira empacar dois ou
            três anos seguidos, cai a parte dos prazos. Se aparecerem métodos
            para certificar o que um sistema persegue antes de implantá-lo, cai
            quase todo o resto.
          </Parrafo>

          {/* ---------------------------------------------------------- */}
          <H2 id="frentes">
            São três frentes e nem todas exigem formação técnica
          </H2>
          <Parrafo>
            Qualquer pessoa pode entrar por qualquer uma das três, e por mais de
            uma ao longo do tempo.
          </Parrafo>
        </div>

        <div className="mx-auto mt-10 w-full max-w-[1448px] px-6 md:px-8">
          <div className="grid grid-cols-1 gap-[10px] lg:grid-cols-3">
            {FRENTES.map((frente) => (
              <article
                key={frente.title}
                className="overflow-hidden rounded-lg bg-aisc-cream border border-aisc-ink flex flex-col p-6 text-aisc-ink md:min-h-[270px] md:p-7 lg:min-h-[300px] lg:p-8"
              >
                <span
                  aria-hidden="true"
                  className="mb-5 block h-px w-10 flex-none bg-aisc-coral"
                />
                <div className="flex max-w-[420px] min-w-0 flex-col gap-3">
                  <h3 className="text-display-3 md:text-display-3-lg break-words text-balance">
                    {frente.title}
                  </h3>
                  <p className="text-body-sm text-aisc-ink">{frente.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className={ANCHO}>
          {/* ---------------------------------------------------------- */}
          <H2 id="colombia">
            Há mais problemas abertos do que gente para trabalhar neles
          </H2>
          <Parrafo>
            Ainda ninguém sabe ler por dentro o que um modelo persegue, nem
            montar uma avaliação que o modelo não reconheça como avaliação, nem
            antecipar em que vai errar. São perguntas abertas, e delas depende
            poder entregar um desses sistemas com alguma garantia. A pesquisa
            que se ocupa delas é cerca de 2 % de tudo o que se publica sobre
            inteligência artificial{" "}
            <Fuente href="https://eto.tech/blog/still-drop-bucket-ai-safety-research/">
              (Emerging Technology Observatory, 2025)
            </Fuente>
            .
          </Parrafo>
          <Parrafo>
            Há também uma parte do problema que começa quando o modelo já está
            construído. Quando um órgão compra um sistema para decidir sobre
            cidadãos, alguém tem que saber o que exigir antes de assinar, com
            que dados foi treinado, e diante de quem responde o fornecedor se
            dois anos depois se descobre que estava baixando a nota das pessoas
            de um certo município. Nisso há ainda menos gente.
          </Parrafo>
          <Parrafo>
            As duas coisas pedem o mesmo: pessoas que possam se dedicar a isso.
            Hoje entram menos do que poderiam, e quem entra demora mais do que
            deveria porque não tem com quem conversar. Encurtar esse caminho é o
            que fazemos. Somos um grupo que lê, discute e trabalha em coisas
            concretas, e entra-se sem credencial prévia. Para começar por conta
            própria, o mais curto que conhecemos é{" "}
            <Fuente href="https://bluedot.org">
              o curso de fundamentos da BlueDot
            </Fuente>
            . Para ir além, ajuda trabalhar em algo concreto com mais alguém, e
            é para isso que estamos aqui.
          </Parrafo>
        </div>
      </article>

      <CtaPanel
        title="E o que faço com isto?"
        body="O que limita o campo é quanta gente consegue entrar. Encurtar esse caminho é o que fazemos."
      >
        <Link className={CTA_LINK_PRIMARY} href="/pt/participe">
          Entrar na comunidade
        </Link>
        <Link className={CTA_LINK} href="/pt/recursos">
          Ver os recursos
        </Link>
      </CtaPanel>
      <SiteFooter idioma="pt" />
    </main>
  );
}
