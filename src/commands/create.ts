import inquirer from "inquirer";
import { generateProject } from "../core/generator";

export async function createProject(
  projectName: string,
  options: { preset: string; install?: boolean }
) {
  try {
    let finalProjectName = projectName;
    let finalPreset = options.preset;
    let finalInstall = options.install;
    if (!projectName) {
      const answers = await inquirer.prompt([
        {
          type: "input",
          name: "projectName",
          message: "Project Name:",
          validate: (input: string) =>
            input ? true : "Project name cannot be empty",
        },
        {
          type: "list",
          name: "preset",
          message: "Select preset:",
          choices: ["junior", "intermediate", "senior"],
          default: "junior",
        },
        {
          type: "confirm",
          name: "install",
          message: "Install dependencies?",
          default: true,
        },
      ]);
      finalProjectName = answers.projectName;
      finalPreset = answers.preset;
      finalInstall = answers.install;
    }

    const presetName = finalPreset || "junior";
    await generateProject(finalProjectName as string, presetName, finalInstall);
  } catch (err: any) {
    console.error("Error: ", err.message);
  }
}
