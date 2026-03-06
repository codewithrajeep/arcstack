import inquirer from "inquirer";
import {
  Architecture,
  Database,
  Framework,
  ProjectConfig,
} from "../types/project-config";

export async function buildProjectConfig(
  projectNameArg?: string,
  options?: any
): Promise<ProjectConfig> {
  const questions: any[] = [];
  if (!projectNameArg) {
    questions.push({
      type: "input",
      name: "projectName",
      message: "Project name:",
      validate: (input: string) =>
        input.trim() ? true : "Project name is required",
    });
  }
  questions.push(
    {
      type: "list",
      name: "framework",
      message: "Choose framework:",
      choice: [
        { name: "Express", value: "express" },
        { name: "Fastify", value: "fastify" },
        { name: "Nestjs", value: "nestjs" },
      ],
      default: "express",
    },
    {
      type: "list",
      name: "architecture",
      message: "Choose architecture style:",
      choices: [
        { name: "Basic   — simple flat structure", value: "basic" },
        { name: "Layered — controllers/services/repos", value: "layered" },
        {
          name: "Clean   — domain/application/infra/presentation",
          value: "clean",
        },
      ],
      default: "basic",
    },
    {
      type: "list",
      name: "database",
      message: "Choose database:",
      choices: [
        { name: "None", value: "none" },
        { name: "PostgreSQL", value: "postgres" },
        { name: "MongoDB", value: "mongodb" },
      ],
      default: "none",
    },
    {
      type: "confirm",
      name: "docker",
      message: "Add Docker support?",
      default: false,
    }
  );
  if (!options?.install) {
    questions.push({
      type: "confirm",
      name: "installDependencies",
      message: "Install dependencies?",
      default: true,
    });
  }
  const answers = await inquirer.prompt(questions);
  return {
    projectName: (projectNameArg || answers.projectName).trim(),
    framework: answers.framework as Framework,
    architecture: answers.architecture as Architecture,
    infrastructure: {
      database: answers.database as Database,
      docker: answers.docker,
    },
    installDependencies: options?.install ?? answers.installDependencies,
  };
}
