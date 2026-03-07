import { ModuleResult } from "../../types/module";

export function generateCleanArchitecture(): ModuleResult {
  return {
    files: [
      { path: "src/domain/entities/.gitkeep", content: "" },
      { path: "src/domain/repositories/.gitkeep", content: "" },
      { path: "src/application/use-cases/.gitkeep", content: "" },
      { path: "src/application/interfaces/.gitkeep", content: "" },
      { path: "src/infrastructure/database/.gitkeep", content: "" },
      { path: "src/infrastructure/http/.gitkeep", content: "" },
      { path: "src/presentation/controllers/.gitkeep", content: "" },
      { path: "src/presentation/routes/.gitkeep", content: "" },
    ],
    dependencies: {},
  };
}
