import { generateProject } from "../core/generator";

export async function createProject(
  projectName: string,
  options: { preset: string; install?: boolean }
) {
  const presetName = options.preset || "junior";
  try {
    await generateProject(projectName, presetName, options.install);
  } catch (err: any) {
    console.error("Error: ", err.message);
  }
}
