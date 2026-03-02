import fs from "fs";
import path from "path";
import { ProjectConfig } from "../../types/project-config";

export async function generateCleanArchitecture(config: ProjectConfig) {
  const base = path.join(process.cwd(), config.projectName, "src");
  const folders = ["domain", "application", "infrastructure", "presentation"];
  folders.forEach((folder) => {
    fs.mkdirSync(path.join(base, folder), { recursive: true });
  });
}
