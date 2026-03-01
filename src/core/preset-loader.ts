import path from "path";
import fs from "fs";
import { Preset } from "../types/preset";

export function loadPreset(presetName: string): Preset {
  const presetPath = path.join(
    __dirname,
    "..",
    "presets",
    `${presetName}.json`
  );
  if (!fs.existsSync(presetPath)) {
    throw new Error(`Preset "${presetName}" not found at ${presetPath}.`);
  }
  const raw = fs.readFileSync(presetPath, "utf-8");
  return JSON.parse(raw);
}
