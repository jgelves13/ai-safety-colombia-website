import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { orderSprintMentors } from "../lib/sprint-mentor-order.mjs";

const expectedOrder = [
  "Diego Gómez",
  "Luis Cosio",
  "Camila Beltrán",
  "Christian Urcuqui",
  "Luis Montoya",
  "Liliana Fernández",
  "Gerson Quintero",
  "Leidy Aldana",
  "Manuela Chacón",
  "Robert Gómez",
];

test("Diego stays first while the remaining sprint profiles follow relevance order", () => {
  const currentOrder = [
    "Diego Gómez",
    "Luis Montoya",
    "Camila Beltrán",
    "Liliana Fernández",
    "Luis Cosio",
    "Christian Urcuqui",
    "Manuela Chacón",
    "Leidy Aldana",
    "Gerson Quintero",
    "Robert Gómez",
  ].map((nombre) => ({ nombre }));

  assert.deepEqual(
    orderSprintMentors(currentOrder).map(({ nombre }) => nombre),
    expectedOrder,
  );
});

test("every sprint locale renders mentors with the shared relevance order", () => {
  const localePages = [
    "app/sprint/page.tsx",
    "app/en/sprint/page.tsx",
    "app/pt/sprint/page.tsx",
  ];

  for (const page of localePages) {
    const source = readFileSync(page, "utf8");

    assert.ok(
      source.includes(
        "const MENTORES_ORDENADOS = orderSprintMentors(MENTORES);",
      ),
      `${page} must derive the shared mentor order once`,
    );
    assert.ok(
      source.includes("MENTORES_ORDENADOS.map((m) =>"),
      `${page} must render the shared mentor order`,
    );
  }
});
