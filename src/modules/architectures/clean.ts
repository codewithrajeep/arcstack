import { ModuleResult } from "../../types/module";

export function generateCleanArchitecture(): ModuleResult {
  return {
    files: [
      { path: "src/application/interfaces/.gitkeep", content: "" },
      { path: "src/infrastructure/database/.gitkeep", content: "" },
    ],
    dependencies: {},
  };
}