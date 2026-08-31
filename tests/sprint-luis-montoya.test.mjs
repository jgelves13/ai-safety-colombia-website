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
