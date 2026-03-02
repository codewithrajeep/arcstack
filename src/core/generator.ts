import path from "path";
import fs from "fs";
import ora from "ora";

function createPackageJson(
  projectPath: string,
  projectName: string,
  dependencies: string[]
) {
  const pkg = {
    name: projectName,
    version: "1.0.0",
    main: "dist/index.js",
    scripts: {
      dev: "ts-node src/index.ts",
      build: "tsc",
    },
    dependencies: Object.fromEntries(
      dependencies.map((dep) => [dep, "latest"])
    ),
  };

  fs.writeFileSync(
    path.join(projectPath, "package.json"),
    JSON.stringify(pkg, null, 2)
  );
}

function createStarterTemplate(projectPath: string) {
  const template = `
    import express from "express";
    
    const app = express();
    app.use(express.json());
    
    app.get("/", (_, res) => {
      res.json({
        message: "Archon backend ready",
      });
    });
    
    app.listen(4000, () => {
      console.log("Server is running on port 4000");
    });
  `;
  fs.writeFileSync(path.join(projectPath, "src", "index.ts"), template);
}

function createTsConfig(projectPath: string) {
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

function createGitignore(projectPath: string) {
  const content = `
    node_modules
    dist
    .env
  `;
  fs.writeFileSync(path.join(projectPath, ".gitignore"), content);
}

import { ProjectConfig } from "../types/project-config";
import { generateFramework } from "../modules/frameworks";

export async function generateProject(config: ProjectConfig) {
  const projectPath = path.join(process.cwd(), config.projectName);

  if (fs.existsSync(projectPath)) {
    throw new Error("Project folder already exists.");
  }

  const spinner = ora("Building project with configuration...").start();
  try {
    fs.mkdirSync(projectPath);
    await generateFramework(config);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    spinner.succeed("Project build successfully!");
  } catch (error) {
    spinner.fail("Build failed!");
  }
}
