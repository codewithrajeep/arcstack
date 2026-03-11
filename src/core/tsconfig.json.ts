import fs from "fs";
import path from "path";

export function createTsConfig(projectPath: string, hasPrisma: boolean = false) {
  const tsconfig = {
    compilerOptions: {
      target: "ES2020",
      module: "CommonJS",
      outDir: "dist",
      esModuleInterop: true,
      strict: true,
      skipLibCheck: true,
    },
    include: hasPrisma
      ? ["src/**/*", "prisma.config.ts"]
      : ["src/**/*"],
    exclude: ["node_modules", "dist"],
  };

  fs.writeFileSync(
    path.join(projectPath, "tsconfig.json"),
    JSON.stringify(tsconfig, null, 2)
  );
}