import path from "path";
import { loadPreset } from "./preset-loader";
import { createDirectoryStructure } from "./file-writer";

export async function generateProject(projectName: string, presetName: string) {
  const preset = loadPreset(presetName);
  const projectPath = path.join(process.cwd(), projectName);
  createDirectoryStructure(projectPath, preset.structure);
  console.log(
    `\n✅ Project "${projectName}" created using ${preset.name} preset.`,
  );
}
