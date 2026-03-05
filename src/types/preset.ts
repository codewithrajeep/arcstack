import { Architecture } from "./project-config";

export interface Preset {
  name: string;
  description: string;
  structure: string[];
  dependencies: string[];
  devDependencies: string[];
  scripts?: Record<string, string>;
  config?: {
    tsconfig?: boolean;
    eslint?: boolean;
    gitignore?: boolean;
  };
  architecture?: {
    style: Architecture;
    includeRepositoryLayer?: boolean;
    includeServiceLayer?: boolean;
  };
}
