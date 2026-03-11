import fs from "fs";
import path from "path";

export function createTsConfig(projectPath: string, hasPrisma: boolean = false) {
  const tsconfig = {
    compilerOptions: {
      target: "ES2020",
      module: "CommonJS",
      rootDir: "src",
      outDir: "dist",
      esModuleInterop: true,
      strict: true,
      skipLibCheck: true,
    },
    include: ["src/**/*"],
    exclude: [
      "node_modules",
      "dist",
      "prisma.config.ts",
    ],
  };

  fs.writeFileSync(
    path.join(projectPath, "tsconfig.json"),
    JSON.stringify(tsconfig, null, 2)
  );
}