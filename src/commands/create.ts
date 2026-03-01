import { generateProject } from "../core/generator";
import { buildProjectConfig } from "../core/config-builder";

export async function createProject() {
  try {
    const config = await buildProjectConfig();
    await generateProject(config);
  } catch (err: any) {
    console.error("Error: ", err.message);
  }
}
