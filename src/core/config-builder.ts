import inquirer from "inquirer";
import { ProjectConfig } from "../types/project-config";

export async function buildProjectConfig(): Promise<ProjectConfig> {
  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "projectName",
      message: "Project name:",
      validate: (input: string) => (input ? true : "Project name is required"),
    },
    {
      type: "list",
      name: "framework",
      message: "Choose framework:",
      choices: ["express", "fastify", "nest-like"],
    },
    {
      type: "list",
      name: "architecture",
      message: "Select architecture style:",
      choices: ["basic", "layered", "clean"],
    },
    {
      type: "list",
      name: "database",
      message: "Select database:",
      choices: ["none", "mongodb", "postgres"],
    },
    {
      type: "confirm",
      name: "docker",
      message: "Do you want to use Docker?",
      default: false,
    },
    {
      type: "list",
      name: "ci",
      message: "Setup CI/CD?",
      choices: ["none", "github-choices"],
    },
    {
      type: "confirm",
      name: "installDependencies",
      message: "Do you want to install dependencies?",
      default: true,
    },
  ]);
  return answers as ProjectConfig;
}
