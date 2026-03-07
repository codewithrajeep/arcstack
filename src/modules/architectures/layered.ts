import { ModuleResult } from "../../types/module";

export function generateLayeredArchitecture(): ModuleResult {
  return {
    files: [
      { path: "src/controllers/.gitkeep", content: "" },
      { path: "src/services/.gitkeep", content: "" },
      { path: "src/repositories/.gitkeep", content: "" },
      { path: "src/models/.gitkeep", content: "" },
    ],
    dependencies: {},
  };
}
