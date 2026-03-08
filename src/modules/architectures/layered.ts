import { ModuleResult } from "../../types/module";

export function generateLayeredArchitecture(): ModuleResult {
  return {
    files: [
      { path: "src/repositories/.gitkeep", content: "" },
      { path: "src/models/.gitkeep", content: "" },
    ],
    dependencies: {},
  };
}
