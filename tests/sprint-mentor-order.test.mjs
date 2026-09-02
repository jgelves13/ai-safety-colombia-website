import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { orderSprintMentors } from "../lib/sprint-mentor-order.mjs";

const expectedOrder = [
  "Diego Gómez",
  "Roberto García Alonso",
  "María Lorena Flórez",
  "Camila Beltrán",
  "Liliana Fernández",
  "Luis Cosio",
  "Luis Montoya",
  "Christian Urcuqui",
  "Manuela Chacón",
  "Gerson Quintero",
  "Robert Gómez",
  "Leidy Aldana",
  "Juan Cortés",
];

test("the cards rank by professional background, strongest first", () => {
  const shuffled = [...expectedOrder].reverse().map((nombre) => ({ nombre }));

  assert.deepEqual(
    orderSprintMentors(shuffled).map(({ nombre }) => nombre),
    expectedOrder,
  );
});

test("every sprint locale renders mentors with the shared order", () => {
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
      source.includes("MENTORES_ORDENADOS.map((m, i) =>"),
      `${page} must render the shared mentor order`,
    );
  }
});
