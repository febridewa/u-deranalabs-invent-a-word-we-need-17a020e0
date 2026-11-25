// showergument — "Invent a Word We Need" (make.fun)
// Coins one new English word and defines it in a single clear line.
// Writes the entry to /output/entry.txt. Deterministic: same bytes every run.
import { mkdirSync, writeFileSync } from "node:fs";

const ENTRY =
  "showergument (n.) — the argument you finally win in the shower, hours after losing it in real life.";

// Gate: /output/entry.txt must be UTF-8 text of 1 to 140 characters,
// not only white space.
if (ENTRY.length < 1 || ENTRY.length > 140) {
  throw new Error(`entry must be 1-140 characters, got ${ENTRY.length}`);
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}

// The entry must be exactly one invented word plus one definition line:
// a single word, a part of speech, an em dash, then the definition —
// no line breaks, no second sentence carrying the meaning.
const match = /^([A-Za-z]+) \(n\.\) — ([^]+)$/.exec(ENTRY);
if (match === null) {
  throw new Error("entry must be one word plus a one-line definition");
}
const [, word, definition] = match;
if (definition.includes("\n") || definition.trim().length === 0) {
  throw new Error("definition must be a single non-empty line");
}
if (!/^[a-z]+$/.test(word)) {
  throw new Error("coined word must be a single lowercase word");
}
console.log(`word: ${word} (${word.length} letters)`);

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY, "utf8");
console.log(`wrote ${ENTRY.length} characters to /output/entry.txt`);
