import { ModuleResult } from "../../types/module";
import { Architecture } from "../../types/project-config";
import { generateBasicArchitecture } from "./basic";
import { generateCleanArchitecture } from "./clean";
import { generateLayeredArchitecture } from "./layered";

export function generateArchitecture(architecture: Architecture): ModuleResult {
  switch (architecture) {
    case "basic":
      return generateBasicArchitecture();
    case "layered":
      return generateLayeredArchitecture();
    case "clean":
      return generateCleanArchitecture();
  }
}
