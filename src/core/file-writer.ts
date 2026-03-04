import fs from "fs";
import path from "path";
import { GeneratedFile } from "../types/module";

export function writeFiles(projectPath: string, files: GeneratedFile[]) {
  for (const file of files) {
    const fullPath = path.join(projectPath, file.path);
    const dir = path.dirname(fullPath);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(fullPath, file.content);
  }
}
