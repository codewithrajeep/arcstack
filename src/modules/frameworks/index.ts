import { generateExpress } from "./express";

export async function generateFramework(framework: string) {
  if (framework === "express") {
    return generateExpress();
  }
  throw new Error(`Unsupported framework: ${framework}`);
}
