import fs from "fs";
import path from "path";

export function createPackageJson(
  projectPath: string,
  projectName: string,
  deps: any
) {
  const pkg = {
    name: projectName,
    version: "1.0.0",
    main: "dist/index.js",
    scripts: {
      dev: "ts-node src/index.ts",
      build: "tsc",
    },
    dependencies: deps.dependencies || {},
    devDependencies: deps.devDependencies || {},
  };
  fs.writeFileSync(
    path.join(projectPath, "package.json"),
    JSON.stringify(pkg, null, 2)
  );
}
