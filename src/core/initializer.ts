import path from "path";
import { ProjectConfig } from "../types/project-config";
import fs from "fs";

export function initializeProject(config: ProjectConfig): string {
  const projectPath = path.join(process.cwd(), config.projectName);
  if (fs.existsSync(projectPath)) {
    throw new Error(
      `Project "${config.projectName}" already exists. Choose a different name or delete the existing folder.`
    );
  }
  fs.mkdirSync(path.join(projectPath, "src"), { recursive: true });
  return projectPath;
}
