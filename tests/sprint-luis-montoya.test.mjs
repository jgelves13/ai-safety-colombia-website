import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const localePages = [
  "app/sprint/page.tsx",
  "app/en/sprint/page.tsx",
  "app/pt/sprint/page.tsx",
];

test("Luis Montoya is a public mentor and speaker in every sprint locale", () => {
  for (const page of localePages) {
    const source = readFileSync(page, "utf8");
    const activeSource = source.replace(/\/\*[\s\S]*?\*\//g, "");

    assert.match(
      activeSource,
      /nombre: "Luis Montoya"/,
      `${page} must include Luis Montoya outside a block comment`,
    );
    assert.doesNotMatch(
      source,
      /Oculto temporalmente el 31-ago-2026/,
      `${page} must not retain the temporary-hide marker`,
    );
  }
});

const matsBioExpectations = [
  {
    page: "app/sprint/page.tsx",
    phrases: [
      "En MATS, con Neel Nanda",
      "estudió si un modelo reconoce que lo evalúan",
      "sin decirlo; publicó el trabajo",
    ],
  },
  {
    page: "app/en/sprint/page.tsx",
    phrases: [
      "At MATS, with Neel Nanda",
      "studied whether models recognize",
      "evaluations without saying so",
    ],
  },
  {
    page: "app/pt/sprint/page.tsx",
    phrases: [
      "No MATS, com Neel Nanda",
      "estudou se um modelo reconhece",
      "uma avaliação sem dizê-lo; publicou o trabalho",
    ],
  },
];

const previousLuisBios = new Map([
  [
    "app/sprint/page.tsx",
    "Investigador de seguridad de IA y becario de Pivotal Research. Es primer autor de un artículo del taller de interpretabilidad de ICML 2026: un modelo puede comportarse distinto cuando sabe que lo evalúan, aunque deje de decirlo.",
  ],
  [
    "app/en/sprint/page.tsx",
    "AI safety researcher and Pivotal Research fellow. First author of an ICML 2026 workshop paper on interpretability: a model can behave differently when it knows it is being evaluated, even after it stops saying so.",
  ],
  [
    "app/pt/sprint/page.tsx",
    "Pesquisador de segurança de IA e bolsista da Pivotal Research. É primeiro autor de um artigo do workshop de interpretabilidade do ICML 2026: um modelo pode agir diferente quando sabe que o avaliam, mesmo sem dizê-lo.",
  ],
]);

function visibleMentorBio(source, name) {
  const mentorStart = source.indexOf(`nombre: "${name}"`);
  assert.notEqual(mentorStart, -1, `Missing mentor: ${name}`);

  const nextMentor = source.indexOf("\n  {\n    nombre:", mentorStart + 1);
  const mentorBlock = source.slice(
    mentorStart,
    nextMentor === -1 ? source.length : nextMentor,
  );
  const bioStart = mentorBlock.indexOf("<>");
  const bioEnd = mentorBlock.indexOf("</>", bioStart);
  assert.notEqual(bioStart, -1, `Missing bio start for ${name}`);
  assert.notEqual(bioEnd, -1, `Missing bio end for ${name}`);

  return mentorBlock
    .slice(bioStart + 2, bioEnd)
    .replace(/<a[\s\S]*?>/g, " ")
    .replace(/<\/a>/g, " ")
    .replace(/\{" "\}/g, " ")
    .replace(/\s+/g, " ")
    .replace(/\s+([.,;:!?])/g, "$1")
    .trim();
}

function wordCount(text) {
  return text.split(/\s+/).length;
}

test("Luis Montoya's bio explains his work in Neel Nanda's MATS stream", () => {
  for (const { page, phrases } of matsBioExpectations) {
    const source = readFileSync(page, "utf8");
    const activeSource = source.replace(/\/\*[\s\S]*?\*\//g, "");
    const normalizedSource = activeSource.replace(/\s+/g, " ");

    for (const phrase of phrases) {
      assert.ok(
        normalizedSource.includes(phrase),
        `${page} must include: ${phrase}`,
      );
    }
  }
});

test("Luis Montoya's revised bio is no longer than its previous version or Camila's", () => {
  for (const page of localePages) {
    const source = readFileSync(page, "utf8");
    const luisWords = wordCount(visibleMentorBio(source, "Luis Montoya"));
    const previousLuisWords = wordCount(previousLuisBios.get(page));
    const camilaWords = wordCount(visibleMentorBio(source, "Camila Beltrán"));

    assert.ok(
      luisWords <= previousLuisWords,
      `${page}: Luis has ${luisWords} words; previous version had ${previousLuisWords}`,
    );
    assert.ok(
      luisWords <= camilaWords,
      `${page}: Luis has ${luisWords} words; Camila has ${camilaWords}`,
    );
  }
});
