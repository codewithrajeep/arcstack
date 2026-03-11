import ora from "ora";
import { ProjectConfig } from "../types/project-config";
import { initializeProject } from "./initializer";
import { generateArchitecture } from "../modules/architectures";
import { generateFramework } from "../modules/frameworks";
import { mergeDependencies } from "./dependency-merger";
import { writeFiles } from "./file-writer";
import { createPackageJson } from "./package.json";
import { createTsConfig } from "./tsconfig.json";
import { createGitignore } from "./gitignore";
import { installDependencies } from "./installer";
import { generateDatabase } from "../modules/databases";
import { generateDocker } from "../modules/docker";

export async function generateProject(config: ProjectConfig): Promise<void> {
  const spinner = ora("Building your Archon project...").start();
  try {
    const projectPath = initializeProject(config);
    const architectureResult = generateArchitecture(config.architecture);
    const frameworkResult = generateFramework(
      config.framework,
      config.architecture
    );
    const databaseResult = generateDatabase(
      config.infrastructure?.database,
      config.infrastructure?.postgresProvider,
      config.infrastructure?.postgresClient,
      config.infrastructure?.databaseUrl,
      config.infrastructure?.directUrl
    );
    const dockerResult = config.infrastructure?.docker
      ? generateDocker(
          config.infrastructure?.database,
          config.infrastructure?.postgresProvider
        )
      : { files: [], dependencies: {} };
    const finalDeps = mergeDependencies([
      architectureResult.dependencies,
      frameworkResult.dependencies,
      databaseResult.dependencies,
      dockerResult.dependencies
    ]);
    writeFiles(projectPath, [
      ...architectureResult.files,
      ...frameworkResult.files,
      ...databaseResult.files,
      ...dockerResult.files,
    ]);
    const hasPrisma = config.infrastructure?.postgresClient === "prisma";
    createPackageJson(projectPath, config.projectName, finalDeps);
    createTsConfig(projectPath, hasPrisma);
    createGitignore(projectPath);
    spinner.succeed(`Project "${config.projectName}" created successfully!`);
    if (config.installDependencies) {
      console.log("\nInstalling dependencies...\n");
      installDependencies(projectPath);
    }
  } catch (error: any) {
    spinner.fail(`Build failed: ${error.message}`);
    process.exit(1);
  }
}
