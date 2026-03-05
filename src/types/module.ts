import { DependencySet } from "./dependency-set";

export interface GeneratedFile {
  path: string;
  content: string;
}

export interface ModuleResult {
  files: GeneratedFile[];
  dependencies: DependencySet;
}
