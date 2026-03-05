import path from "path";
import { ProjectConifg } from "../types/project-config";
import fs from "fs";

export function initializeProject(config: ProjectConifg): string {
  const projectPath = path.join(process.cwd(), config.projectName);
  fs.mkdirSync(path.join(projectPath, "src"), { recursive: true });
  return projectPath;
}
