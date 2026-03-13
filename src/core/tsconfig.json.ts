import fs from "fs";
import path from "path";
import { Framework } from "../types/project-config";

export function createTsConfig(
  projectPath: string,
  hasPrisma: boolean = false,
  framework?: Framework,
) {
  const isNest = framework === "nestjs";

  const tsconfig = {
    compilerOptions: {
      target: "ES2020",
      module: "CommonJS",
      rootDir: "src",
      outDir: "dist",
      esModuleInterop: true,
      strict: true,
      skipLibCheck: true,
      ...(isNest && {
        experimentalDecorators: true,
        emitDecoratorMetadata: true,
        strictPropertyInitialization: false,
      }),
    },
    include: ["src/**/*"],
    exclude: [
      "node_modules",
      "dist",
      ...(hasPrisma ? ["prisma.config.ts"] : []),
    ],
  };

  fs.writeFileSync(
    path.join(projectPath, "tsconfig.json"),
    JSON.stringify(tsconfig, null, 2),
  );
}
