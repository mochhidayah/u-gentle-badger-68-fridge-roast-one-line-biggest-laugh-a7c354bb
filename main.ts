// Fridge Roast: One Line, Biggest Laugh.
// Entrypoint: picks the sharpest roast from roast.ts and writes it to /output/entry.txt.
import { pickRoast } from "./roast.ts";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const OUT = "/output/entry.txt";
const line = pickRoast();

if (line.length < 1 || line.length > 200) {
  throw new Error(`roast must be 1-200 chars, got ${line.length}`);
}

mkdirSync("/output", { recursive: true });
writeFileSync(OUT, line, "utf8");
// Round-trip check: the file the judge reads must be exactly the line picked.
const back = readFileSync(OUT, "utf8");
if (back !== line) {
  throw new Error("round-trip mismatch: /output/entry.txt differs from picked roast");
}
console.log(`wrote ${line.length} chars to ${OUT}`);
console.log(line);
