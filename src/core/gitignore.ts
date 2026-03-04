import fs from "fs";
import path from "path";

export function createGitignore(projectPath: string) {
  fs.writeFileSync(
    path.join(projectPath, ".gitignore"),
    "node_modules\ndist\n.env\n"
  );
}
