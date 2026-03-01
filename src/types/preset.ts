export interface Preset {
  name: string;
  description: string;
  structure: string[];
  dependencies: string[];
  devDependencies: string[];
  script?: Record<string, string>;
  config?: {
    tsconfig?: boolean;
    eslint?: boolean;
    gitignore?: boolean;
  };
  architecture?: {
    style: "basic" | "layered" | "clean";
    includeRepositoryLayer?: boolean;
    includeServiceLayer?: boolean;
  };
}
