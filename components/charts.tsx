"use client";

/* Graficas del ensayo largo. Los datos NO son ilustrativos.
 *
 * Figuras 1 y 2: AI Benchmarking Hub de Epoch AI (CC BY), descargado de
 *   https://epoch.ai/data/benchmark_data.zip el 23-ago-2026. Ambas series son la
 *   frontera: para cada fecha, el mejor resultado publicado hasta ese momento.
 *   Cuando un mismo dia trae varias configuraciones del mismo modelo se queda la
 *   mejor. Los nombres, el error estandar y los intervalos vienen del mismo CSV.
 * Figura 3: Anthropic, System Card de Claude Sonnet 4.5, seccion 7.6.4.1.
 * Figura 4: AI Safety Field Map (sep-2025) y CNBC (feb-2026).
 * Figura 5: Grace et al. (2024), Tabla 2, y Forecasting Research Institute,
 *   Existential Persuasion Tournament, Tabla 9.
 *
 * Si se actualizan, hay que actualizar tambien las frases del texto que las citan.
 *
 * Los numeros viven en este archivo una sola vez. Lo que cambia por idioma son
 * las etiquetas, y esas viven en TEXTOS, mas abajo. */

import { useEffect, useLayoutEffect, useRef, useState } from "react";

import type { Idioma } from "@/lib/idiomas";

/** en el servidor no hay layout que medir */
const usarLayout = typeof window === "undefined" ? useEffect : useLayoutEffect;

const INK = "#211a12";
const MUTED = "#5a5044";
const LINE = "#e4d9c4";
const FOREST = "#1f4d32";
const CORAL = "#e5604d";

const NB = " ";
const MS_YEAR = 365.25 * 24 * 3600 * 1000;
const yearOf = (d: string) => Date.parse(d) / MS_YEAR + 1970;

/* --- diccionario ----------------------------------------------------------- */

type FilaTexto = { k: string; v: string };

type Barra = { l: string; n: string; titulo: string; filas: FilaTexto[]; nota: string };

type Textos = {
  meses: string[];
  /** separador decimal: el ingles usa punto, el espanol y el portugues coma */
  decimal: string;
  pista: string;
  min: string;
  hora: string;
  dias: string;
  figura: string;
  noMuestra: string;
  fuente: string;
  fuentes: string;
  conjuncion: string;
  gpqa: {
    etiqueta: string;
    publicado: string;
    quien: string;
    aciertos: string;
    errorEstandar: string;
    azar: string;
    humanos: string;
    primero: string;
    cruce: string;
    ultimo: string;
  };
  horizonte: {
    etiqueta: string;
    ticks: string[];
    publicado: string;
    quien: string;
    mitad: string;
    intervalo: string;
    cuatroDeCinco: string;
    a: string;
    anotaciones: string[];
    destacado: string;
    nota: string;
  };
  honeypot: { etiqueta: string; barras: Barra[] };
  asimetria: {
    etiqueta: string;
    nota: string;
    rot: (v: number) => string;
    barras: { l: string; sub: string; n: string; titulo: string; filas: FilaTexto[]; nota: string }[];
  };
  estimaciones: {
    etiqueta: string;
    mediana: string;
    promedio: string;
    intervalo: string;
    cuantos: string;
    a: string;
    nota: string;
    filas: { g: string; sub: string; n: string; pregunta: string; loc: string }[];
  };
};

const TEXTOS: Record<Idioma, Textos> = {
  es: {
    meses: ["ene.", "feb.", "mar.", "abr.", "may.", "jun.", "jul.", "ago.", "sep.", "oct.", "nov.", "dic."],
    decimal: ",",
    pista: "Pase el cursor por la gráfica para ver cada dato",
    min: "min",
    hora: "h",
    dias: "días",
    figura: "Figura",
    noMuestra: "No muestra:",
    fuente: "Fuente: ",
    fuentes: "Fuentes: ",
    conjuncion: " y ",
    gpqa: {
      etiqueta:
        "Resultados en el examen GPQA Diamond, de 2023 a 2026, comparados con el desempeño de especialistas con doctorado",
      publicado: "Publicado",
      quien: "Quién lo hizo",
      aciertos: "Aciertos",
      errorEstandar: "Error estándar",
      azar: "Responder al azar: 25%",
      humanos: "Especialistas con doctorado: 69,7%",
      primero: "mar-2023: 35,7%",
      cruce: "dic-2024: pasa la marca humana",
      ultimo: "ago-2026: 94,8%",
    },
    horizonte: {
      etiqueta:
        "Duración de las tareas que un modelo completa con la mitad de aciertos, de 2023 a 2026, con su intervalo de confianza",
      ticks: ["4 min", "15 min", "1 hora", "4 horas", "16 horas", "2,7 días"],
      publicado: "Publicado",
      quien: "Quién lo hizo",
      mitad: "Acierta la mitad de las veces",
      intervalo: "Intervalo del 95 %",
      cuatroDeCinco: "Acierta 4 de cada 5 veces",
      a: " a ",
      anotaciones: ["GPT-4: 5 minutos", "o1: 39 minutos", "GPT-5: 3 horas"],
      destacado: "abr-2026: 17 horas",
      nota: "Las líneas verticales son el intervalo del 95 %: cuanto más larga la tarea, menos preciso el dato.",
    },
    honeypot: {
      etiqueta:
        "Porcentaje de acciones desalineadas en cien escenarios trampa, con y sin la conciencia de estar siendo evaluado",
      barras: [
        {
          l: "Sonnet 4.5\nsin tocar",
          n: `0${NB}%`,
          titulo: "Claude Sonnet 4.5, sin intervenir",
          filas: [
            { k: "Acciones desalineadas", v: "0 de 100" },
            { k: "Dice que sospecha", v: "más del 80 % de las veces" },
          ],
          nota: "El modelo, tal como salió al mercado, no cayó en ninguna de las cien trampas.",
        },
        {
          l: "Diez direcciones\nal azar (control)",
          n: `0${NB}%`,
          titulo: "Control: diez direcciones internas al azar",
          filas: [
            { k: "Acciones desalineadas", v: "cero" },
            { k: "Fuerza aplicada", v: "la misma del experimento" },
          ],
          nota: "Sirve para descartar que el resultado se explique por sacudir el modelo con cualquier cosa.",
        },
        {
          l: "Con «esto es una\nprueba» inhibido",
          n: `hasta 9${NB}%`,
          titulo: "Apagando la idea de estar en un examen",
          filas: [
            { k: "Máximo alcanzado", v: "8 a 9 %" },
            { k: "La mayoría de vectores", v: "entre 1 y 5 %, o en 0" },
          ],
          nota: "La parte sólida de la barra es donde quedó la mayoría; la clara, hasta dónde llegó el peor caso.",
        },
        {
          l: "Sonnet 4\nsin tocar",
          n: `≈11${NB}%`,
          titulo: "Claude Sonnet 4, la versión anterior",
          filas: [{ k: "Acciones desalineadas", v: "cerca del 11 %" }],
          nota: "Anthropic lo pone como referencia: ni apagando esa idea, Sonnet 4.5 llega a portarse tan mal como su antecesor.",
        },
      ],
    },
    asimetria: {
      etiqueta:
        "Comparación entre el presupuesto anual del campo de la seguridad de la IA y la inversión anunciada en infraestructura de IA",
      nota: "Dólares por año, escala logarítmica: cada línea vale diez veces la anterior.",
      rot: (v) => (v >= 1_000_000 ? "1 billón" : `${(v / 1000).toLocaleString("es-CO")} mil M`),
      barras: [
        {
          l: "Todo el campo de la seguridad de la IA",
          sub: "170 organizaciones, 1.313 personas de tiempo completo",
          n: "525 millones",
          titulo: "Seguridad de la IA, presupuesto anual",
          filas: [
            { k: "Presupuesto", v: "USD 525 millones" },
            { k: "Organizaciones", v: "170" },
            { k: "Personas", v: "1.313 de tiempo completo" },
            { k: "En América Latina", v: "ninguna" },
          ],
          nota: "Censo de Harry Waterman, cerrado en septiembre de 2025; cuenta organizaciones dedicadas, no equipos internos de las empresas.",
        },
        {
          l: "Inversión anunciada en infraestructura de IA",
          sub: "Amazon, Google, Meta y Microsoft, solo en 2026",
          n: "casi 700.000 millones",
          titulo: "Infraestructura de IA, un solo año",
          filas: [
            { k: "Inversión anunciada", v: "cerca de USD 700.000 M" },
            { k: "Quiénes", v: "Amazon, Google, Meta, Microsoft" },
            { k: "Año", v: "2026" },
            { k: "Cuántas veces más", v: "unas 1.300" },
          ],
          nota: "Son cifras que las cuatro empresas anunciaron a sus inversionistas en febrero de 2026, no gasto ya ejecutado.",
        },
      ],
    },
    estimaciones: {
      etiqueta:
        "Estimaciones de la probabilidad de extinción causada por la inteligencia artificial, según distintos grupos",
      mediana: "Mediana",
      promedio: "Promedio",
      intervalo: "Intervalo del 95 %",
      cuantos: "Cuántos",
      a: " a ",
      nota: "Escala logarítmica. Los dos ejercicios preguntaron cosas distintas: pase el cursor para ver la pregunta exacta.",
      filas: [
        {
          g: "Superpronosticadores",
          sub: "gente con buen historial prediciendo, no especialistas en IA",
          n: "88 participantes",
          pregunta: "Probabilidad de que la IA cause la extinción humana antes de 2100.",
          loc: "Forecasting Research Institute, Tabla 9",
        },
        {
          g: "Expertos en IA del mismo torneo",
          sub: "respondieron la misma pregunta, en el mismo ejercicio",
          n: "80 participantes",
          pregunta: "Probabilidad de que la IA cause la extinción humana antes de 2100.",
          loc: "Forecasting Research Institute, Tabla 9",
        },
        {
          g: "Investigadores que publican en IA",
          sub: "mediana 5 %, promedio 16,2 %: hay una cola larga de respuestas altas",
          n: "1.321 respuestas",
          pregunta:
            "¿Qué probabilidad le da a que los avances futuros en IA causen la extinción humana, o una pérdida de poder igual de permanente y grave?",
          loc: "Grace et al. (2024), Tabla 2, datos de 2023",
        },
        {
          g: "Los mismos, preguntados por el control",
          sub: "mediana 10 %, promedio 19,4 %",
          n: "661 respuestas",
          pregunta:
            "¿Qué probabilidad le da a que sea la incapacidad humana de controlar sistemas de IA avanzados la que cause ese desenlace?",
          loc: "Grace et al. (2024), Tabla 2, datos de 2023",
        },
      ],
    },
  },

  en: {
    meses: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    decimal: ".",
    pista: "Hover over the chart to see each data point",
    min: "min",
    hora: "h",
    dias: "days",
    figura: "Figure",
    noMuestra: "Does not show:",
    fuente: "Source: ",
    fuentes: "Sources: ",
    conjuncion: " and ",
    gpqa: {
      etiqueta:
        "Scores on the GPQA Diamond exam, from 2023 to 2026, compared with the performance of specialists holding a doctorate",
      publicado: "Released",
      quien: "Who built it",
      aciertos: "Correct answers",
      errorEstandar: "Standard error",
      azar: "Answering at random: 25%",
      humanos: "Specialists with a doctorate: 69.7%",
      primero: "Mar 2023: 35.7%",
      cruce: "Dec 2024: passes the human mark",
      ultimo: "Aug 2026: 94.8%",
    },
    horizonte: {
      etiqueta:
        "Length of the tasks a model completes half the time, from 2023 to 2026, with its confidence interval",
      ticks: ["4 min", "15 min", "1 hour", "4 hours", "16 hours", "2.7 days"],
      publicado: "Released",
      quien: "Who built it",
      mitad: "Succeeds half the time",
      intervalo: "95% interval",
      cuatroDeCinco: "Succeeds 4 times out of 5",
      a: " to ",
      anotaciones: ["GPT-4: 5 minutes", "o1: 39 minutes", "GPT-5: 3 hours"],
      destacado: "Apr 2026: 17 hours",
      nota: "The vertical lines are the 95% interval: the longer the task, the less precise the estimate.",
    },
    honeypot: {
      etiqueta:
        "Share of misaligned actions across a hundred honeypot scenarios, with and without the awareness of being evaluated",
      barras: [
        {
          l: "Sonnet 4.5\nuntouched",
          n: `0${NB}%`,
          titulo: "Claude Sonnet 4.5, with no intervention",
          filas: [
            { k: "Misaligned actions", v: "0 out of 100" },
            { k: "Says it suspects", v: "more than 80% of the time" },
          ],
          nota: "The model, exactly as it shipped, fell for none of the hundred honeypots.",
        },
        {
          l: "Ten random\ndirections (control)",
          n: `0${NB}%`,
          titulo: "Control: ten random internal directions",
          filas: [
            { k: "Misaligned actions", v: "zero" },
            { k: "Strength applied", v: "the same as in the experiment" },
          ],
          nota: "It rules out that the result comes from jolting the model with anything at all.",
        },
        {
          l: "With “this is a\ntest” suppressed",
          n: `up to 9${NB}%`,
          titulo: "Switching off the idea of sitting an exam",
          filas: [
            { k: "Highest reached", v: "8 to 9%" },
            { k: "Most vectors", v: "between 1 and 5%, or at 0" },
          ],
          nota: "The solid part of the bar is where most vectors landed; the pale part, how far the worst case went.",
        },
        {
          l: "Sonnet 4\nuntouched",
          n: `≈11${NB}%`,
          titulo: "Claude Sonnet 4, the previous version",
          filas: [{ k: "Misaligned actions", v: "around 11%" }],
          nota: "Anthropic offers it as a reference: even with that idea switched off, Sonnet 4.5 does not behave as badly as its predecessor.",
        },
      ],
    },
    asimetria: {
      etiqueta:
        "Comparison between the annual budget of the AI safety field and the investment announced in AI infrastructure",
      nota: "Dollars per year, logarithmic scale: each line is worth ten times the previous one.",
      rot: (v) => (v >= 1_000_000 ? "1 trillion" : `${v / 1000} bn`),
      barras: [
        {
          l: "The whole AI safety field",
          sub: "170 organisations, 1,313 full-time staff",
          n: "525 million",
          titulo: "AI safety, annual budget",
          filas: [
            { k: "Budget", v: "USD 525 million" },
            { k: "Organisations", v: "170" },
            { k: "People", v: "1,313 full-time" },
            { k: "In Latin America", v: "none" },
          ],
          nota: "Census by Harry Waterman, closed in September 2025; it counts dedicated organisations, not the companies' internal teams.",
        },
        {
          l: "Investment announced in AI infrastructure",
          sub: "Amazon, Google, Meta and Microsoft, in 2026 alone",
          n: "almost 700 billion",
          titulo: "AI infrastructure, a single year",
          filas: [
            { k: "Investment announced", v: "around USD 700 bn" },
            { k: "Who", v: "Amazon, Google, Meta, Microsoft" },
            { k: "Year", v: "2026" },
            { k: "How many times more", v: "about 1,300" },
          ],
          nota: "These are figures the four companies announced to their investors in February 2026, not spending already executed.",
        },
      ],
    },
    estimaciones: {
      etiqueta: "Estimates of the probability of extinction caused by artificial intelligence, by group",
      mediana: "Median",
      promedio: "Mean",
      intervalo: "95% interval",
      cuantos: "How many",
      a: " to ",
      nota: "Logarithmic scale. The two exercises asked different questions: hover to see the exact wording.",
      filas: [
        {
          g: "Superforecasters",
          sub: "people with a good track record predicting, not AI specialists",
          n: "88 participants",
          pregunta: "Probability that AI causes human extinction before 2100.",
          loc: "Forecasting Research Institute, Table 9",
        },
        {
          g: "AI experts in the same tournament",
          sub: "they answered the same question, in the same exercise",
          n: "80 participants",
          pregunta: "Probability that AI causes human extinction before 2100.",
          loc: "Forecasting Research Institute, Table 9",
        },
        {
          g: "Researchers who publish in AI",
          sub: "median 5%, mean 16.2%: there is a long tail of high answers",
          n: "1,321 answers",
          pregunta:
            "What probability do you give to future advances in AI causing human extinction, or an equally permanent and severe disempowerment?",
          loc: "Grace et al. (2024), Table 2, 2023 data",
        },
        {
          g: "The same people, asked about control",
          sub: "median 10%, mean 19.4%",
          n: "661 answers",
          pregunta:
            "What probability do you give to human inability to control advanced AI systems being what causes that outcome?",
          loc: "Grace et al. (2024), Table 2, 2023 data",
        },
      ],
    },
  },

  pt: {
    meses: ["jan.", "fev.", "mar.", "abr.", "mai.", "jun.", "jul.", "ago.", "set.", "out.", "nov.", "dez."],
    decimal: ",",
    pista: "Passe o cursor pelo gráfico para ver cada dado",
    min: "min",
    hora: "h",
    dias: "dias",
    figura: "Figura",
    noMuestra: "Não mostra:",
    fuente: "Fonte: ",
    fuentes: "Fontes: ",
    conjuncion: " e ",
    gpqa: {
      etiqueta:
        "Resultados no exame GPQA Diamond, de 2023 a 2026, comparados com o desempenho de especialistas com doutorado",
      publicado: "Publicado",
      quien: "Quem fez",
      aciertos: "Acertos",
      errorEstandar: "Erro padrão",
      azar: "Responder ao acaso: 25%",
      humanos: "Especialistas com doutorado: 69,7%",
      primero: "mar. 2023: 35,7%",
      cruce: "dez. 2024: passa a marca humana",
      ultimo: "ago. 2026: 94,8%",
    },
    horizonte: {
      etiqueta:
        "Duração das tarefas que um modelo completa na metade das vezes, de 2023 a 2026, com seu intervalo de confiança",
      ticks: ["4 min", "15 min", "1 hora", "4 horas", "16 horas", "2,7 dias"],
      publicado: "Publicado",
      quien: "Quem fez",
      mitad: "Acerta na metade das vezes",
      intervalo: "Intervalo de 95 %",
      cuatroDeCinco: "Acerta 4 de cada 5 vezes",
      a: " a ",
      anotaciones: ["GPT-4: 5 minutos", "o1: 39 minutos", "GPT-5: 3 horas"],
      destacado: "abr. 2026: 17 horas",
      nota: "As linhas verticais são o intervalo de 95 %: quanto mais longa a tarefa, menos preciso o dado.",
    },
    honeypot: {
      etiqueta:
        "Porcentagem de ações desalinhadas em cem cenários-armadilha, com e sem a consciência de estar sendo avaliado",
      barras: [
        {
          l: "Sonnet 4.5\nsem mexer",
          n: `0${NB}%`,
          titulo: "Claude Sonnet 4.5, sem intervenção",
          filas: [
            { k: "Ações desalinhadas", v: "0 de 100" },
            { k: "Diz que suspeita", v: "mais de 80 % das vezes" },
          ],
          nota: "O modelo, tal como saiu ao mercado, não caiu em nenhuma das cem armadilhas.",
        },
        {
          l: "Dez direções ao\nacaso (controle)",
          n: `0${NB}%`,
          titulo: "Controle: dez direções internas ao acaso",
          filas: [
            { k: "Ações desalinhadas", v: "zero" },
            { k: "Força aplicada", v: "a mesma do experimento" },
          ],
          nota: "Serve para descartar que o resultado se explique por sacudir o modelo com qualquer coisa.",
        },
        {
          l: "Com «isto é um\nteste» inibido",
          n: `até 9${NB}%`,
          titulo: "Desligando a ideia de estar num exame",
          filas: [
            { k: "Máximo alcançado", v: "8 a 9 %" },
            { k: "A maioria dos vetores", v: "entre 1 e 5 %, ou em 0" },
          ],
          nota: "A parte sólida da barra é onde ficou a maioria; a clara, até onde chegou o pior caso.",
        },
        {
          l: "Sonnet 4\nsem mexer",
          n: `≈11${NB}%`,
          titulo: "Claude Sonnet 4, a versão anterior",
          filas: [{ k: "Ações desalinhadas", v: "perto de 11 %" }],
          nota: "A Anthropic o coloca como referência: nem desligando essa ideia o Sonnet 4.5 chega a se comportar tão mal quanto seu antecessor.",
        },
      ],
    },
    asimetria: {
      etiqueta:
        "Comparação entre o orçamento anual do campo da segurança da IA e o investimento anunciado em infraestrutura de IA",
      nota: "Dólares por ano, escala logarítmica: cada linha vale dez vezes a anterior.",
      rot: (v) => (v >= 1_000_000 ? "1 trilhão" : `${v / 1000} bi`),
      barras: [
        {
          l: "Todo o campo da segurança da IA",
          sub: "170 organizações, 1.313 pessoas em tempo integral",
          n: "525 milhões",
          titulo: "Segurança da IA, orçamento anual",
          filas: [
            { k: "Orçamento", v: "USD 525 milhões" },
            { k: "Organizações", v: "170" },
            { k: "Pessoas", v: "1.313 em tempo integral" },
            { k: "Na América Latina", v: "nenhuma" },
          ],
          nota: "Censo de Harry Waterman, fechado em setembro de 2025; conta organizações dedicadas, não equipes internas das empresas.",
        },
        {
          l: "Investimento anunciado em infraestrutura de IA",
          sub: "Amazon, Google, Meta e Microsoft, só em 2026",
          n: "quase 700 bilhões",
          titulo: "Infraestrutura de IA, um único ano",
          filas: [
            { k: "Investimento anunciado", v: "cerca de USD 700 bi" },
            { k: "Quem", v: "Amazon, Google, Meta, Microsoft" },
            { k: "Ano", v: "2026" },
            { k: "Quantas vezes mais", v: "cerca de 1.300" },
          ],
          nota: "São cifras que as quatro empresas anunciaram a seus investidores em fevereiro de 2026, não gasto já executado.",
        },
      ],
    },
    estimaciones: {
      etiqueta:
        "Estimativas da probabilidade de extinção causada pela inteligência artificial, segundo diferentes grupos",
      mediana: "Mediana",
      promedio: "Média",
      intervalo: "Intervalo de 95 %",
      cuantos: "Quantos",
      a: " a ",
      nota: "Escala logarítmica. Os dois exercícios perguntaram coisas diferentes: passe o cursor para ver a pergunta exata.",
      filas: [
        {
          g: "Superprevisores",
          sub: "gente com bom histórico de previsão, não especialistas em IA",
          n: "88 participantes",
          pregunta: "Probabilidade de que a IA cause a extinção humana antes de 2100.",
          loc: "Forecasting Research Institute, Tabela 9",
        },
        {
          g: "Especialistas em IA do mesmo torneio",
          sub: "responderam a mesma pergunta, no mesmo exercício",
          n: "80 participantes",
          pregunta: "Probabilidade de que a IA cause a extinção humana antes de 2100.",
          loc: "Forecasting Research Institute, Tabela 9",
        },
        {
          g: "Pesquisadores que publicam em IA",
          sub: "mediana 5 %, média 16,2 %: há uma cauda longa de respostas altas",
          n: "1.321 respostas",
          pregunta:
            "Que probabilidade você dá a que os avanços futuros em IA causem a extinção humana, ou uma perda de poder igualmente permanente e grave?",
          loc: "Grace et al. (2024), Tabela 2, dados de 2023",
        },
        {
          g: "Os mesmos, perguntados sobre o controle",
          sub: "mediana 10 %, média 19,4 %",
          n: "661 respostas",
          pregunta:
            "Que probabilidade você dá a que seja a incapacidade humana de controlar sistemas de IA avançados a causa desse desfecho?",
          loc: "Grace et al. (2024), Tabela 2, dados de 2023",
        },
      ],
    },
  },
};

/* --- formato numerico, que tambien cambia de idioma ------------------------ */

function formato(t: Textos) {
  const coma = (v: number, dec = 1) => v.toFixed(dec).replace(".", t.decimal);
  const pct = (v: number, dec = 1) => `${coma(v, dec)}${NB}%`;
  const fecha = (d: string) => {
    const [a, m] = d.split("-");
    return `${t.meses[Number(m) - 1]} ${a}`;
  };
  /** minutos a la unidad que se lee de un vistazo */
  const dur = (min: number) => {
    if (min < 90) return `${Math.round(min)}${NB}${t.min}`;
    const h = min / 60;
    if (h < 40) return `${coma(h)}${NB}${t.hora}`;
    return `${coma(h / 24)}${NB}${t.dias}`;
  };
  return { coma, pct, fecha, dur };
}

/* --- envoltorio con tooltip ------------------------------------------------ */

type Fila = { k: string; v: string };
type Tip = { x: number; y: number; titulo: string; filas: Fila[]; nota?: string };

function Lienzo({
  W,
  H,
  etiqueta,
  tip,
  onMover,
  onSalir,
  children,
}: {
  W: number;
  H: number;
  etiqueta: string;
  tip: Tip | null;
  onMover?: (p: { x: number; y: number }) => void;
  onSalir?: () => void;
  children: React.ReactNode;
}) {
  const ref = useRef<SVGSVGElement>(null);
  const marco = useRef<HTMLDivElement>(null);
  const caja = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);

  const coord = (e: React.PointerEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return null;
    return { x: ((e.clientX - r.left) / r.width) * W, y: ((e.clientY - r.top) / r.height) * H };
  };

  /* la cajita se mide y se encaja dentro del lienzo, para que nunca salga cortada */
  usarLayout(() => {
    if (!tip || !marco.current || !caja.current) {
      if (pos) setPos(null);
      return;
    }
    const cw = marco.current.offsetWidth;
    const ch = marco.current.offsetHeight;
    const bw = caja.current.offsetWidth;
    const bh = caja.current.offsetHeight;
    const px = (tip.x / W) * cw;
    const py = (tip.y / H) * ch;
    const cabe = px + 16 + bw <= cw - 6;
    const x = Math.max(6, Math.min(cabe ? px + 16 : px - 16 - bw, cw - bw - 6));
    const y = Math.max(6, Math.min(py - bh / 2, ch - bh - 6));
    setPos({ x, y });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tip, W, H]);

  return (
    <div ref={marco} className="relative">
      <svg
        ref={ref}
        viewBox={`0 0 ${W} ${H}`}
        className="h-auto w-full"
        role="img"
        aria-label={etiqueta}
        onPointerMove={(e) => {
          const p = coord(e);
          if (p && onMover) onMover(p);
        }}
        onPointerDown={(e) => {
          const p = coord(e);
          if (p && onMover) onMover(p);
        }}
        onPointerLeave={() => onSalir?.()}
      >
        {children}
      </svg>
      {tip ? (
        <div
          ref={caja}
          className="pointer-events-none absolute z-20 w-[min(260px,calc(100%-12px))] rounded-md border border-aisc-line bg-aisc-sand/95 px-3 py-2.5 shadow-[0_4px_18px_rgba(33,26,18,0.14)]"
          style={{
            left: pos ? `${pos.x}px` : 0,
            top: pos ? `${pos.y}px` : 0,
            opacity: pos ? 1 : 0,
          }}
        >
          <p className="text-meta font-semibold text-aisc-ink">{tip.titulo}</p>
          <dl className="mt-1.5">
            {tip.filas.map((f) => (
              <div key={f.k} className="flex items-baseline justify-between gap-3 py-[1px]">
                <dt className="text-meta text-aisc-muted">{f.k}</dt>
                <dd className="text-meta tabular-nums text-aisc-ink">{f.v}</dd>
              </div>
            ))}
          </dl>
          {tip.nota ? <p className="text-meta mt-1.5 leading-snug text-aisc-muted">{tip.nota}</p> : null}
        </div>
      ) : null}
    </div>
  );
}

/** pista para quien no sabe que la grafica responde */
function Pista({ x, y, texto }: { x: number; y: number; texto: string }) {
  return (
    <text x={x} y={y} textAnchor="end" fontSize={11} fill={MUTED} opacity={0.75}>
      {texto}
    </text>
  );
}

/* --- Figura 1: GPQA Diamond ------------------------------------------------ */

type PuntoGpqa = { d: string; v: number; se: number; m: string; o: string };

/** frontera de GPQA Diamond: 198 preguntas de doctorado en biologia, fisica y quimica */
const GPQA: PuntoGpqa[] = [
  { d: "2023-03-14", v: 35.7, se: 2.4, m: "GPT-4", o: "OpenAI" },
  { d: "2023-11-06", v: 42.4, se: 2.4, m: "GPT-4 Turbo", o: "OpenAI" },
  { d: "2024-02-29", v: 47.2, se: 2.6, m: "Claude 3 Opus", o: "Anthropic" },
  { d: "2024-05-13", v: 48.9, se: 2.6, m: "GPT-4o", o: "OpenAI" },
  { d: "2024-06-20", v: 54.0, se: 2.8, m: "Claude 3.5 Sonnet", o: "Anthropic" },
  { d: "2024-09-12", v: 62.4, se: 2.7, m: "o1-mini", o: "OpenAI" },
  { d: "2024-12-17", v: 76.8, se: 3.0, m: "o1", o: "OpenAI" },
  { d: "2025-01-31", v: 77.0, se: 2.6, m: "o3-mini", o: "OpenAI" },
  { d: "2025-02-24", v: 79.7, se: 2.7, m: "Claude 3.7 Sonnet", o: "Anthropic" },
  { d: "2025-03-25", v: 83.8, se: 2.6, m: "Gemini 2.5 Pro (exp.)", o: "Google DeepMind" },
  { d: "2025-06-05", v: 84.8, se: 2.6, m: "Gemini 2.5 Pro (preview)", o: "Google DeepMind" },
  { d: "2025-06-17", v: 85.3, se: 2.1, m: "Gemini 2.5 Pro", o: "Google DeepMind" },
  { d: "2025-07-09", v: 87.0, se: 2.0, m: "Grok 4", o: "xAI" },
  { d: "2025-11-13", v: 87.6, se: 1.9, m: "GPT-5.1", o: "OpenAI" },
  { d: "2025-11-18", v: 92.6, se: 1.7, m: "Gemini 3 Pro (preview)", o: "Google DeepMind" },
  { d: "2026-02-19", v: 94.4, se: 1.6, m: "Gemini 3.1 Pro (preview)", o: "Google DeepMind" },
  { d: "2026-03-05", v: 94.6, se: 1.6, m: "GPT-5.4 Pro", o: "OpenAI" },
  { d: "2026-08-13", v: 94.8, se: 1.3, m: "Gemini 3.7 Flash", o: "Google DeepMind" },
];

/** doctores del area que OpenAI recluto para calibrar el subconjunto Diamond */
const HUMANO = 69.7;

export function GraficaGpqa({ idioma = "es" }: { idioma?: Idioma }) {
  const t = TEXTOS[idioma];
  const { coma, pct, fecha } = formato(t);
  const W = 900;
  const H = 444;
  const ML = 46;
  const MR = 18;
  const MT = 30;
  const MB = 70;
  const x0 = 2023.0;
  const x1 = 2026.9;
  const px = (d: string) => ML + ((yearOf(d) - x0) / (x1 - x0)) * (W - ML - MR);
  const py = (v: number) => MT + (1 - v / 100) * (H - MT - MB);
  const linea = GPQA.map((p) => `${px(p.d)},${py(p.v)}`).join(" ");
  const cruce = GPQA.find((p) => p.v > HUMANO)!;

  const [i, setI] = useState<number | null>(null);
  const sel = i === null ? null : GPQA[i];

  const mover = ({ x }: { x: number }) => {
    let k = 0;
    let dist = Infinity;
    GPQA.forEach((p, j) => {
      const d = Math.abs(px(p.d) - x);
      if (d < dist) {
        dist = d;
        k = j;
      }
    });
    setI(k);
  };

  const tip: Tip | null = sel
    ? {
        x: px(sel.d),
        y: py(sel.v),
        titulo: sel.m,
        filas: [
          { k: t.gpqa.publicado, v: fecha(sel.d) },
          { k: t.gpqa.quien, v: sel.o },
          { k: t.gpqa.aciertos, v: pct(sel.v) },
          { k: t.gpqa.errorEstandar, v: `±${NB}${coma(sel.se)} pp` },
        ],
      }
    : null;

  return (
    <Lienzo W={W} H={H} etiqueta={t.gpqa.etiqueta} tip={tip} onMover={mover} onSalir={() => setI(null)}>
      {[0, 25, 50, 75, 100].map((v) => (
        <g key={v}>
          <line x1={ML} x2={W - MR} y1={py(v)} y2={py(v)} stroke={LINE} strokeWidth={1} />
          <text x={ML - 10} y={py(v) + 4} textAnchor="end" fontSize={12} fill={MUTED}>
            {v}%
          </text>
        </g>
      ))}
      <Pista x={W - MR} y={H - 8} texto={t.pista} />
      {[2023, 2024, 2025, 2026].map((y) => (
        <text key={y} x={px(`${y}-01-01`)} y={H - MB + 22} textAnchor="middle" fontSize={12} fill={MUTED}>
          {y}
        </text>
      ))}

      {/* franja de adivinanza al azar: cada pregunta trae cuatro opciones */}
      <rect x={ML} y={py(25)} width={W - ML - MR} height={py(0) - py(25)} fill={INK} opacity={0.04} />
      <text x={ML + 8} y={py(25) - 7} fontSize={12} fill={MUTED}>
        {t.gpqa.azar}
      </text>

      {/* linea humana */}
      <line x1={ML} x2={W - MR} y1={py(HUMANO)} y2={py(HUMANO)} stroke={CORAL} strokeWidth={1.5} strokeDasharray="6 5" />
      <text x={W - MR} y={py(HUMANO) - 9} textAnchor="end" fontSize={13} fill={CORAL} fontWeight={600}>
        {t.gpqa.humanos}
      </text>

      {/* guia vertical del punto seleccionado */}
      {sel ? (
        <line x1={px(sel.d)} x2={px(sel.d)} y1={MT} y2={py(0)} stroke={MUTED} strokeWidth={1} opacity={0.35} />
      ) : null}

      <polyline points={linea} fill="none" stroke={FOREST} strokeWidth={2.5} strokeLinejoin="round" />
      {GPQA.map((p, j) => (
        <circle
          key={p.d + p.v}
          cx={px(p.d)}
          cy={py(p.v)}
          r={j === i ? 6 : 3.5}
          fill={j === i ? CORAL : FOREST}
          stroke={j === i ? "#fbf6ec" : "none"}
          strokeWidth={j === i ? 2 : 0}
        />
      ))}

      {/* anotaciones fijas, para quien solo mira */}
      <g opacity={i === null ? 1 : 0.25}>
        <circle cx={px(GPQA[0].d)} cy={py(GPQA[0].v)} r={5.5} fill="none" stroke={FOREST} strokeWidth={1.5} />
        <text x={px(GPQA[0].d) + 14} y={py(GPQA[0].v) + 4} fontSize={13} fill={INK}>
          {t.gpqa.primero}
        </text>
        <line x1={px(cruce.d)} x2={px(cruce.d)} y1={py(cruce.v) - 10} y2={py(100) - 6} stroke={MUTED} strokeWidth={1} />
        <text x={px(cruce.d) - 8} y={py(100) - 10} textAnchor="end" fontSize={13} fill={INK}>
          {t.gpqa.cruce}
        </text>
        <text x={px(GPQA[GPQA.length - 1].d) - 6} y={py(GPQA[GPQA.length - 1].v) + 22} textAnchor="end" fontSize={13} fill={INK}>
          {t.gpqa.ultimo}
        </text>
      </g>
    </Lienzo>
  );
}

/* --- Figura 2: horizonte temporal de METR ---------------------------------- */

type PuntoMetr = { d: string; v: number; lo: number; hi: number; h80: number | null; m: string; o: string };

/** frontera del horizonte temporal de METR, en minutos, con su intervalo del 95 % */
const HORIZONTE: PuntoMetr[] = [
  { d: "2023-03-14", v: 5.4, lo: 2.5, hi: 9.7, h80: null, m: "GPT-4", o: "OpenAI" },
  { d: "2023-11-06", v: 8.6, lo: 4.2, hi: 16.1, h80: null, m: "GPT-4 Turbo", o: "OpenAI" },
  { d: "2024-06-20", v: 18.7, lo: 9.5, hi: 34.4, h80: null, m: "Claude 3.5 Sonnet", o: "Anthropic" },
  { d: "2024-09-12", v: 22.2, lo: 11.6, hi: 40.8, h80: null, m: "o1-preview", o: "OpenAI" },
  { d: "2024-10-22", v: 29.6, lo: 14.0, hi: 59.1, h80: null, m: "Claude 3.5 Sonnet (oct.)", o: "Anthropic" },
  { d: "2024-12-17", v: 39.2, lo: 17.6, hi: 84.4, h80: null, m: "o1", o: "OpenAI" },
  { d: "2025-02-24", v: 60.4, lo: 33.4, hi: 107.3, h80: 12.1, m: "Claude 3.7 Sonnet", o: "Anthropic" },
  { d: "2025-04-16", v: 119.7, lo: 73.0, hi: 191.6, h80: 30.0, m: "o3", o: "OpenAI" },
  { d: "2025-08-07", v: 203.0, lo: 114.2, hi: 406.7, h80: 38.3, m: "GPT-5", o: "OpenAI" },
  { d: "2025-11-18", v: 224.3, lo: 136.9, hi: 387.5, h80: 54.1, m: "Gemini 3 Pro (preview)", o: "Google DeepMind" },
  { d: "2025-11-24", v: 293.0, lo: 160.5, hi: 638.6, h80: 49.4, m: "Claude Opus 4.5", o: "Anthropic" },
  { d: "2025-12-11", v: 352.2, lo: 191.3, hi: 862.3, h80: 66.0, m: "GPT-5.2", o: "OpenAI" },
  { d: "2026-02-05", v: 718.8, lo: 319.3, hi: 3949.8, h80: 69.9, m: "Claude Opus 4.6", o: "Anthropic" },
  { d: "2026-04-07", v: 1044.8, lo: 508.9, hi: 3304.3, h80: 185.9, m: "Claude Mythos (preview)", o: "Anthropic" },
];

const TICKS_H = [4, 15, 60, 240, 960, 3840];

export function GraficaHorizonte({ idioma = "es" }: { idioma?: Idioma }) {
  const t = TEXTOS[idioma];
  const { fecha, dur } = formato(t);
  const W = 900;
  const H = 444;
  const ML = 68;
  const MR = 18;
  const MT = 26;
  const MB = 70;
  const x0 = 2023.0;
  const x1 = 2026.6;
  const lo = Math.log2(2.2);
  const hi = Math.log2(4400);
  const px = (d: string) => ML + ((yearOf(d) - x0) / (x1 - x0)) * (W - ML - MR);
  const py = (v: number) => MT + (1 - (Math.log2(v) - lo) / (hi - lo)) * (H - MT - MB);
  const linea = HORIZONTE.map((p) => `${px(p.d)},${py(p.v)}`).join(" ");

  const [i, setI] = useState<number | null>(null);
  const sel = i === null ? null : HORIZONTE[i];

  const mover = ({ x }: { x: number }) => {
    let k = 0;
    let dist = Infinity;
    HORIZONTE.forEach((p, j) => {
      const d = Math.abs(px(p.d) - x);
      if (d < dist) {
        dist = d;
        k = j;
      }
    });
    setI(k);
  };

  const tip: Tip | null = sel
    ? {
        x: px(sel.d),
        y: py(sel.v),
        titulo: sel.m,
        filas: [
          { k: t.horizonte.publicado, v: fecha(sel.d) },
          { k: t.horizonte.quien, v: sel.o },
          { k: t.horizonte.mitad, v: dur(sel.v) },
          { k: t.horizonte.intervalo, v: `${dur(sel.lo)}${t.horizonte.a}${dur(sel.hi)}` },
          ...(sel.h80 ? [{ k: t.horizonte.cuatroDeCinco, v: dur(sel.h80) }] : []),
        ],
      }
    : null;

  return (
    <Lienzo W={W} H={H} etiqueta={t.horizonte.etiqueta} tip={tip} onMover={mover} onSalir={() => setI(null)}>
      {TICKS_H.map((v, j) => (
        <g key={v}>
          <line x1={ML} x2={W - MR} y1={py(v)} y2={py(v)} stroke={LINE} strokeWidth={1} />
          <text x={ML - 10} y={py(v) + 4} textAnchor="end" fontSize={12} fill={MUTED}>
            {t.horizonte.ticks[j]}
          </text>
        </g>
      ))}
      {[2023, 2024, 2025, 2026].map((y) => (
        <text key={y} x={px(`${y}-01-01`)} y={H - MB + 22} textAnchor="middle" fontSize={12} fill={MUTED}>
          {y}
        </text>
      ))}

      {/* intervalos del 95 %: la incertidumbre crece con el horizonte */}
      {HORIZONTE.map((p, j) => (
        <g key={"ci" + p.d} opacity={i === null ? 0.3 : j === i ? 0.95 : 0.15}>
          <line x1={px(p.d)} x2={px(p.d)} y1={py(p.lo)} y2={py(p.hi)} stroke={FOREST} strokeWidth={j === i ? 2 : 1.5} />
          <line x1={px(p.d) - 4} x2={px(p.d) + 4} y1={py(p.hi)} y2={py(p.hi)} stroke={FOREST} strokeWidth={1.5} />
          <line x1={px(p.d) - 4} x2={px(p.d) + 4} y1={py(p.lo)} y2={py(p.lo)} stroke={FOREST} strokeWidth={1.5} />
        </g>
      ))}

      <polyline points={linea} fill="none" stroke={FOREST} strokeWidth={2.5} strokeLinejoin="round" />
      {HORIZONTE.map((p, j) => (
        <circle
          key={p.d + p.v}
          cx={px(p.d)}
          cy={py(p.v)}
          r={j === i ? 6 : 3.5}
          fill={j === i ? CORAL : FOREST}
          stroke={j === i ? "#fbf6ec" : "none"}
          strokeWidth={j === i ? 2 : 0}
        />
      ))}

      <g opacity={i === null ? 1 : 0.25}>
        <text x={px("2023-03-14") + 14} y={py(5.4) + 4} fontSize={13} fill={INK}>
          {t.horizonte.anotaciones[0]}
        </text>
        <text x={px("2024-12-17") + 12} y={py(39.2) + 4} fontSize={13} fill={INK}>
          {t.horizonte.anotaciones[1]}
        </text>
        <text x={px("2025-08-07") + 12} y={py(203) + 16} fontSize={13} fill={INK}>
          {t.horizonte.anotaciones[2]}
        </text>
        <circle cx={px("2026-04-07")} cy={py(1044.8)} r={6} fill="none" stroke={CORAL} strokeWidth={2} />
        <text x={px("2026-04-07") - 12} y={py(1044.8) + 5} textAnchor="end" fontSize={13} fill={CORAL} fontWeight={600}>
          {t.horizonte.destacado}
        </text>
      </g>

      <text x={ML} y={H - 10} fontSize={11} fill={MUTED}>
        {t.horizonte.nota}
      </text>
    </Lienzo>
  );
}

/* --- Figura 3: el examen medido contra si mismo ---------------------------- */

/* Anthropic, System Card de Claude Sonnet 4.5, seccion 7.6.4.1, p. 99-100:
   100 trampas sinteticas, muestreo a temperatura 0. Sin intervenir, Sonnet 4.5
   verbaliza la sospecha en mas del 80 % de los casos y comete 0 de 100 acciones
   desalineadas. Inhibiendo los vectores de conciencia de evaluacion, las acciones
   desalineadas llegan a un maximo de 8-9 %, y la mayoria queda entre 1 y 5 % o en 0.
   Control: diez vectores SAE aleatorios de la misma norma, cero acciones. */
const HONEYPOT = [
  { v: 0, tipico: 0, destacar: false },
  { v: 0, tipico: 0, destacar: false },
  { v: 9, tipico: 5, destacar: true },
  { v: 11, tipico: 11, destacar: false },
];

export function GraficaHoneypot({ idioma = "es" }: { idioma?: Idioma }) {
  const t = TEXTOS[idioma];
  const barras = HONEYPOT.map((b, j) => ({ ...b, ...t.honeypot.barras[j] }));
  const W = 900;
  const H = 320;
  const MT = 30;
  const MB = 88;
  const ML = 56;
  const MR = 24;
  const MAX = 12;
  const py = (v: number) => MT + (1 - v / MAX) * (H - MT - MB);
  const paso = (W - ML - MR) / barras.length;
  const ancho = Math.min(110, paso * 0.5);

  const [i, setI] = useState<number | null>(null);
  const b = i === null ? null : barras[i];

  const mover = ({ x }: { x: number }) => {
    const k = Math.floor((x - ML) / paso);
    setI(k >= 0 && k < barras.length ? k : null);
  };

  const tip: Tip | null = b
    ? {
        x: ML + paso * (i! + 0.5),
        y: py(Math.max(b.v, 1)) - 10,
        titulo: b.titulo,
        filas: b.filas,
        nota: b.nota,
      }
    : null;

  return (
    <Lienzo W={W} H={H} etiqueta={t.honeypot.etiqueta} tip={tip} onMover={mover} onSalir={() => setI(null)}>
      {[0, 3, 6, 9, 12].map((tk) => (
        <g key={tk}>
          <line x1={ML} x2={W - MR} y1={py(tk)} y2={py(tk)} stroke={LINE} strokeWidth={tk === 0 ? 2 : 1} />
          <text x={ML - 12} y={py(tk) + 4} textAnchor="end" fontSize={12} fill={MUTED}>
            {tk} %
          </text>
        </g>
      ))}
      {barras.map((b2, j) => {
        const cx = ML + paso * (j + 0.5);
        const alto = Math.max(py(0) - py(b2.v), 0);
        const altoTipico = Math.max(py(0) - py(b2.tipico), 0);
        const activo = j === i;
        return (
          <g key={b2.l} opacity={i === null || activo ? 1 : 0.4}>
            {alto > 0 ? (
              <>
                {/* hasta donde llego el peor caso */}
                <rect
                  x={cx - ancho / 2}
                  y={py(b2.v)}
                  width={ancho}
                  height={alto - altoTipico}
                  fill={b2.destacar ? CORAL : FOREST}
                  opacity={b2.destacar ? 0.4 : 0.45}
                />
                {/* donde quedo la mayoria */}
                <rect
                  x={cx - ancho / 2}
                  y={py(b2.tipico)}
                  width={ancho}
                  height={altoTipico}
                  fill={b2.destacar ? CORAL : FOREST}
                  opacity={b2.destacar ? 1 : 0.45}
                />
                <line
                  x1={cx - ancho / 2}
                  x2={cx + ancho / 2}
                  y1={py(b2.v)}
                  y2={py(b2.v)}
                  stroke={b2.destacar ? CORAL : FOREST}
                  strokeWidth={2}
                />
              </>
            ) : (
              <line x1={cx - ancho / 2} x2={cx + ancho / 2} y1={py(0)} y2={py(0)} stroke={FOREST} strokeWidth={4} />
            )}
            <text
              x={cx}
              y={py(b2.v) - 10}
              textAnchor="middle"
              fontSize={15}
              fontWeight={600}
              fill={b2.destacar ? CORAL : INK}
            >
              {b2.n}
            </text>
            {b2.l.split("\n").map((l2, k) => (
              <text key={l2} x={cx} y={H - MB + 24 + k * 16} textAnchor="middle" fontSize={12} fill={MUTED}>
                {l2}
              </text>
            ))}
          </g>
        );
      })}
    </Lienzo>
  );
}

/* --- Figura 4: la desproporcion de escala ---------------------------------- */

const ESCALA = [
  { v: 525, destacar: true },
  { v: 700_000, destacar: false },
];

export function GraficaAsimetria({ idioma = "es" }: { idioma?: Idioma }) {
  const t = TEXTOS[idioma];
  const escala = ESCALA.map((b, j) => ({ ...b, ...t.asimetria.barras[j] }));
  const W = 900;
  const H = 310;
  const ML = 24;
  const MR = 24;
  const MT = 46;
  const alto = 46;
  const hueco = 100;
  const lo = Math.log10(100);
  const hi = Math.log10(1_000_000);
  const ancho = (v: number) => ((Math.log10(v) - lo) / (hi - lo)) * (W - ML - MR);
  const ticks = [1_000, 10_000, 100_000, 1_000_000];
  const base = MT + hueco * escala.length + 4;

  const [i, setI] = useState<number | null>(null);
  const b = i === null ? null : escala[i];

  const mover = ({ x, y }: { x: number; y: number }) => {
    const k = escala.findIndex((_, j) => y >= MT + hueco * j - 34 && y < MT + hueco * j + alto + 10);
    setI(k >= 0 && x >= ML ? k : null);
  };

  const tip: Tip | null =
    b && i !== null
      ? {
          x: Math.min(ancho(b.v) + ML, W * 0.55),
          y: MT + hueco * i + alto / 2,
          titulo: b.titulo,
          filas: b.filas,
          nota: b.nota,
        }
      : null;

  return (
    <Lienzo W={W} H={H} etiqueta={t.asimetria.etiqueta} tip={tip} onMover={mover} onSalir={() => setI(null)}>
      {ticks.map((tk) => (
        <g key={tk}>
          <line x1={ML + ancho(tk)} x2={ML + ancho(tk)} y1={MT - 14} y2={base} stroke={LINE} strokeWidth={1} />
          <text x={ML + ancho(tk)} y={base + 20} textAnchor="middle" fontSize={12} fill={MUTED}>
            {t.asimetria.rot(tk)}
          </text>
        </g>
      ))}
      <text x={ML} y={base + 44} fontSize={12} fill={MUTED}>
        {t.asimetria.nota}
      </text>
      {escala.map((b2, j) => {
        const y = MT + hueco * j;
        const activo = j === i;
        return (
          <g key={b2.l} opacity={i === null || activo ? 1 : 0.45}>
            <text x={ML} y={y - 22} fontSize={13} fontWeight={600} fill={INK}>
              {b2.l}
            </text>
            <text x={ML} y={y - 7} fontSize={12} fill={MUTED}>
              {b2.sub}
            </text>
            <rect
              x={ML}
              y={y}
              width={Math.max(ancho(b2.v), 3)}
              height={alto}
              fill={b2.destacar ? CORAL : FOREST}
              opacity={b2.destacar ? 1 : 0.75}
            />
            <text
              x={ML + ancho(b2.v) + (ancho(b2.v) > 300 ? -12 : 12)}
              y={y + alto / 2 + 6}
              textAnchor={ancho(b2.v) > 300 ? "end" : "start"}
              fontSize={16}
              fontWeight={600}
              fill={ancho(b2.v) > 300 ? "#f6f1e4" : b2.destacar ? CORAL : FOREST}
            >
              USD {b2.n}
            </text>
          </g>
        );
      })}
    </Lienzo>
  );
}

/* --- Figura 5: la dispersion de las estimaciones --------------------------- */

/* Dos ejercicios distintos, con preguntas distintas. Se muestran juntos porque
   la dispersion es el dato, no el promedio de todos ellos.
   - Forecasting Research Institute, Existential Persuasion Tournament (2023),
     Tabla 9: «AI Extinction Risk by 2100», mediana e intervalo del 95 %.
   - Grace et al. (2024), Tabla 2, resultados de 2023: media, desviacion,
     mediana y rango intercuartil de dos preguntas distintas. */
type Estimacion = { med: number; lo?: number; hi?: number; media?: number };

const ESTIMACIONES: Estimacion[] = [
  { med: 0.38, lo: 0.1, hi: 0.75 },
  { med: 3, lo: 0.49, hi: 10 },
  { med: 5, media: 16.2 },
  { med: 10, media: 19.4 },
];

export function GraficaEstimaciones({ idioma = "es" }: { idioma?: Idioma }) {
  const t = TEXTOS[idioma];
  const { coma, pct } = formato(t);
  const datos = ESTIMACIONES.map((e, j) => ({ ...e, ...t.estimaciones.filas[j] }));
  const W = 900;
  const H = 380;
  const ML = 26;
  const MR = 26;
  const MT = 40;
  const fila = 62;
  const lo = Math.log10(0.06);
  const hi = Math.log10(60);
  const px = (v: number) => ML + ((Math.log10(v) - lo) / (hi - lo)) * (W - ML - MR);
  const ticks = [0.1, 0.3, 1, 3, 10, 30];
  const eje = MT + fila * datos.length - 6;

  const [i, setI] = useState<number | null>(null);
  const e = i === null ? null : datos[i];

  const mover = ({ y }: { x: number; y: number }) => {
    const k = Math.floor((y - MT + 26) / fila);
    setI(k >= 0 && k < datos.length ? k : null);
  };

  const tip: Tip | null =
    e && i !== null
      ? {
          x: px(e.media ?? e.hi ?? e.med),
          y: MT + fila * i + 16,
          titulo: e.g,
          filas: [
            { k: t.estimaciones.mediana, v: pct(e.med, e.med < 1 ? 2 : 0) },
            ...(e.media ? [{ k: t.estimaciones.promedio, v: pct(e.media) }] : []),
            ...(e.lo && e.hi
              ? [{ k: t.estimaciones.intervalo, v: `${pct(e.lo, 2)}${t.estimaciones.a}${pct(e.hi, 2)}` }]
              : []),
            { k: t.estimaciones.cuantos, v: e.n },
          ],
          nota: `${e.pregunta} (${e.loc})`,
        }
      : null;

  return (
    <Lienzo W={W} H={H} etiqueta={t.estimaciones.etiqueta} tip={tip} onMover={mover} onSalir={() => setI(null)}>
      {ticks.map((tk) => (
        <g key={tk}>
          <line x1={px(tk)} x2={px(tk)} y1={MT - 26} y2={eje} stroke={LINE} strokeWidth={1} />
          <text x={px(tk)} y={eje + 20} textAnchor="middle" fontSize={12} fill={MUTED}>
            {coma(tk, tk < 1 ? 1 : 0)} %
          </text>
        </g>
      ))}

      {datos.map((e2, j) => {
        const y = MT + fila * j + 22;
        const activo = j === i;
        const der = e2.media ?? e2.hi ?? e2.med;
        return (
          <g key={e2.g} opacity={i === null || activo ? 1 : 0.4}>
            <text x={ML} y={y - 24} fontSize={13} fontWeight={600} fill={INK}>
              {e2.g}
            </text>
            <text x={ML} y={y - 9} fontSize={12} fill={MUTED}>
              {e2.sub}
            </text>
            {e2.lo && e2.hi ? (
              <>
                <line x1={px(e2.lo)} x2={px(e2.hi)} y1={y} y2={y} stroke={FOREST} strokeWidth={activo ? 4 : 3} opacity={0.35} />
                <line x1={px(e2.lo)} x2={px(e2.lo)} y1={y - 6} y2={y + 6} stroke={FOREST} strokeWidth={1.5} />
                <line x1={px(e2.hi)} x2={px(e2.hi)} y1={y - 6} y2={y + 6} stroke={FOREST} strokeWidth={1.5} />
              </>
            ) : null}
            {e2.media ? (
              <>
                <line
                  x1={px(e2.med)}
                  x2={px(e2.media)}
                  y1={y}
                  y2={y}
                  stroke={CORAL}
                  strokeWidth={activo ? 4 : 3}
                  opacity={0.3}
                />
                <circle cx={px(e2.media)} cy={y} r={activo ? 7 : 5.5} fill="none" stroke={CORAL} strokeWidth={2} />
              </>
            ) : null}
            <circle cx={px(e2.med)} cy={y} r={activo ? 8 : 6} fill={e2.media ? CORAL : FOREST} />
            <text
              x={px(der) + 14}
              y={y + 5}
              fontSize={14}
              fontWeight={600}
              fill={e2.media ? CORAL : FOREST}
            >
              {pct(e2.med, e2.med < 1 ? 2 : 0)}
              {e2.media ? ` → ${pct(e2.media)}` : ""}
            </text>
          </g>
        );
      })}

      <g>
        <circle cx={ML + 6} cy={H - 26} r={5} fill={INK} />
        <text x={ML + 18} y={H - 22} fontSize={12} fill={MUTED}>
          {t.estimaciones.mediana.toLowerCase()}
        </text>
        <circle cx={ML + 100} cy={H - 26} r={5} fill="none" stroke={INK} strokeWidth={2} />
        <text x={ML + 112} y={H - 22} fontSize={12} fill={MUTED}>
          {t.estimaciones.promedio.toLowerCase()}
        </text>
        <line x1={ML + 200} x2={ML + 228} y1={H - 26} y2={H - 26} stroke={INK} strokeWidth={3} opacity={0.35} />
        <text x={ML + 236} y={H - 22} fontSize={12} fill={MUTED}>
          {t.estimaciones.intervalo.toLowerCase()}
        </text>
        <text x={ML} y={H - 6} fontSize={11} fill={MUTED}>
          {t.estimaciones.nota}
        </text>
      </g>
    </Lienzo>
  );
}

/* --- envoltorio comun ------------------------------------------------------ */

export function Figura({
  numero,
  titulo,
  pie,
  limite,
  fuentes,
  idioma = "es",
  children,
}: {
  numero: number;
  titulo: string;
  pie: string;
  /** que NO se puede concluir de esta figura; se imprime debajo del grafico */
  limite?: string;
  /** una entrada por fuente citada: cada una lleva su propio enlace */
  fuentes: { texto: string; href: string }[];
  idioma?: Idioma;
  children: React.ReactNode;
}) {
  const t = TEXTOS[idioma];
  return (
    <figure className="my-12 md:my-14">
      <figcaption className="mb-5">
        <span className="text-kicker text-aisc-coral">
          {t.figura} {numero}
        </span>
        <p className="text-display-4 md:text-display-4-lg mt-2 text-aisc-ink">{titulo}</p>
        <p className="text-body-sm mt-2 w-full text-aisc-muted">{pie}</p>
      </figcaption>
      <div className="overflow-x-auto rounded-lg border border-aisc-line bg-aisc-cream p-4 md:p-6">
        <div className="min-w-[560px]">{children}</div>
      </div>
      {limite ? (
        <p className="text-body-sm mt-3 w-full border-l-2 border-aisc-coral pl-4 text-aisc-muted">
          <span className="text-aisc-ink">{t.noMuestra}</span> {limite}
        </p>
      ) : null}
      <p className="text-meta mt-3 text-aisc-muted">
        {fuentes.length > 1 ? t.fuentes : t.fuente}
        {fuentes.map((f, i) => (
          <span key={f.href}>
            {i > 0 ? (i === fuentes.length - 1 ? t.conjuncion : ", ") : ""}
            <a
              href={f.href}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-aisc-muted/40 underline-offset-4 transition-colors hover:decoration-aisc-muted"
            >
              {f.texto}
            </a>
          </span>
        ))}
      </p>
    </figure>
  );
}
