import fs from "fs";
import path from "path";
import ora from "ora";
import { ProjectConfig } from "../types/project-config";
import { generateFramework } from "../modules/frameworks";
import { mergeDependencies } from "./dependency-merger";
import { writeFiles } from "./file-writer";
import { createPackageJson } from "./package.json";
import { createTsConfig } from "./tsconfig.json";
import { createGitignore } from "./gitignore";
import { installDependencies } from "./installer";

export async function generateProject(config: ProjectConfig) {
  const spinner = ora("Building your Archon project....").start();
  const projectPath = path.join(process.cwd(), config.projectName);
  try {
    fs.mkdirSync(projectPath, { recursive: true });
    const frameworkResult = await generateFramework(config.framework);
    const finalDeps = mergeDependencies([frameworkResult.dependencies]);
    writeFiles(projectPath, frameworkResult.files);
    createPackageJson(projectPath, config.projectName, finalDeps);
    createTsConfig(projectPath);
    createGitignore(projectPath);
    spinner.succeed(`Project ${config.projectName} created successfully!`);
    if (config.installDependencies) {
      console.log("\nInstalling Dependencies...\n");
      installDependencies(projectPath);
    }
  } catch (error: any) {
    spinner.fail(`Build failed: ${error.message}`);
  }
}
