import { generateProject } from "../core/generator";

export async function createProject(
  projectName: string,
  options: { preset?: string },
) {
  const preset = options.preset || "junior";
  try {
    await generateProject(projectName, preset);
  } catch (err: any) {
    console.error("Error: ", err.message);
  }
}
