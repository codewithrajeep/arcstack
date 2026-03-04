import inquirer from "inquirer";
import { ProjectConfig } from "../types/project-config";

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
      validate: (input: string) => (input ? true : "Project name is required"),
    });
  }
  questions.push(
    {
      type: "list",
      name: "framework",
      message: "Choose framework:",
      choices: ["express", "fastify", "nest-like"],
      default: "express",
    },
    {
      type: "list",
      name: "architecture",
      message: "Choose architecture:",
      choices: ["basic", "layered", "clean"],
      default: "basic",
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
    projectName: projectNameArg || answers.projectName,
    framework: answers.framework,
    architecture: answers.architecture,
    installDependencies: options?.install ?? answers.installDependencies,
  };
}
