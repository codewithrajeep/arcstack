import fs from "fs";
import path from "path";

export function createTsConfig(projectPath: string) {
  const tsconfig = {
    compilerOptions: {
      target: "ES2020",
      module: "CommonJS",
      rootDir: "src",
      outDir: "dist",
      esModuleInterop: true,
      strict: true,
    },
  };
  fs.writeFileSync(
    path.join(projectPath, "tsconfig.json"),
    JSON.stringify(tsconfig, null, 2)
  );
}
