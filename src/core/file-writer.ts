import path from "path";
import fs from "fs";
import figlet from "figlet";
import chalk from "chalk";

console.log(
  chalk.cyan(
    figlet.textSync("ARCHON", {
      horizontalLayout: "full",
    }),
  ),
);

export function createDirectoryStructure(
  basePath: string,
  structure: string[],
) {
  for (const dir of structure) {
    const fullPath = path.join(basePath, dir);
    fs.mkdirSync(fullPath, { recursive: true });
  }
}
