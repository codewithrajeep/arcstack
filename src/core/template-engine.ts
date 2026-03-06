import path from "path";
import fs from "fs";
import { GeneratedFile } from "../types/module";

const TEMPLATES_ROOT = path.join(__dirname, "../../templates");

export function loadTemplate(
  framework: string,
  architecture: string,
  filePath: string
): string {
  const fullPath = path.join(TEMPLATES_ROOT, framework, architecture, filePath);
  if (!fs.existsSync(fullPath)) {
    throw new Error(
      `Template not found: ${framework}/${architecture}/${filePath}`
    );
  }
  return fs.readFileSync(fullPath, "utf-8");
}

export function loadTemplateDir(
  framework: string,
  architecture: string
): GeneratedFile[] {
  const dirPath = path.join(TEMPLATES_ROOT, framework, architecture);
  if (!fs.existsSync(dirPath)) {
    throw new Error(
      `Template directory not found: ${framework}/${architecture}`
    );
  }
  return readDirRecursive(dirPath, dirPath);
}

function readDirRecursive(
  baseDir: string,
  currentDir: string
): GeneratedFile[] {
  const files: GeneratedFile[] = [];
  const entries = fs.readdirSync(currentDir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(currentDir, entry.name);
    if (entry.isDirectory()) {
      files.push(...readDirRecursive(baseDir, fullPath));
    } else {
      files.push({
        path: path.relative(baseDir, fullPath),
        content: fs.readFileSync(fullPath, "utf-8"),
      });
    }
  }
  return files;
}
