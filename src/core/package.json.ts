import fs from "fs";
import path from "path";
import { DependencySet } from "../types/dependency-set";

export function createPackageJson(
  projectPath: string,
  projectName: string,
  deps: DependencySet
) {
  const pkg = {
    name: projectName,
    version: "1.0.0",
    main: "dist/index.js",
    scripts: {
      dev: "ts-node src/index.ts",
      build: "tsc",
      start: "node dist/index.js",
      ...deps.scripts
    },
    dependencies: deps.dependencies || {},
    devDependencies: deps.devDependencies || {},
  };
  fs.writeFileSync(
    path.join(projectPath, "package.json"),
    JSON.stringify(pkg, null, 2)
  );
}
