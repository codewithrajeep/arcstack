import path from "path";
import fs from "fs";
import ora from "ora";
import { DependencySet } from "../types/dependency-set";

function createPackageJson(
  projectPath: string,
  projectName: string,
  dependencySet: DependencySet
) {
  const pkg = {
    name: projectName,
    version: "1.0.0",
    main: "dist/index.js",
    scripts: {
      dev: "ts-node src/index.ts",
      build: "tsc",
    },
    dependencies: dependencySet.dependencies || {},
    devDependencies: dependencySet.devDependencies || {},
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
import { mergeDependencies } from "./dependency-merger";

export async function generateProject(config: ProjectConfig){
  const projectPath = path.join(process.cwd(), config.projectName);
  const spinner = ora("Constructing your Archon System...").start();
  try {
    fs.mkdirSync(projectPath, {recursive: true});
    fs.mkdirSync(path.join(projectPath, "src"));
    const frameworkData = await generateFramework(config);
    const finalDeps = mergeDependencies([
      frameworkData,
    ])
    createPackageJson(projectPath,config.projectName, finalDeps)
    createTsConfig(projectPath)
    createGitignore(projectPath);
    createStarterTemplate(projectPath);
    spinner.succeed(`Project ${config.projectName} is successfully created!`);
  }catch(error: any){
    spinner.fail(`Build failed: ${error.message}`)
  }
}
