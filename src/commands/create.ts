import { generateProject } from "../core/generator";
import { buildProjectConfig } from "../core/config-builder";

export async function createProject(projectNameArg?: string, options?: any) {
  try {
    const config = await buildProjectConfig(projectNameArg, options);
    await generateProject(config);
  } catch (err: any) {
    console.error("Error: ", err.message);
  }
}
