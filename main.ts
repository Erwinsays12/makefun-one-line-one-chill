// One Line, One Chill — entry program.
//
// Writes a single sentence of horror to /output/entry.txt.
// The line is fixed and deterministic: the same text on every run, so the
// two grading runs agree byte for byte. It stays well under the 200
// character gate, is one sentence, and ends on the image that carries the
// scare: a name carved where only the writer could have put it.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "The dentist held up my X-ray and said the tooth wasn't mine — my name was carved into its root, in my own handwriting.";

function main(): void {
  if (LINE.length < 1 || LINE.length > 200) {
    throw new Error(`entry line must be 1-200 characters, got ${LINE.length}`);
  }
  if (LINE.trim() !== LINE) {
    throw new Error("entry line must not start or end with whitespace");
  }
  // One sentence: exactly one terminal period, at the very end.
  if (!/^[^.]*\.$/.test(LINE)) {
    throw new Error("entry line must be a single sentence ending in one period");
  }
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
}

main();
