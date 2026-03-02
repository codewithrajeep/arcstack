export interface ProjectConfig {
  projectName: string;
  framework: "express" | "fastify" | "nest-like";
  architecture: "basic" | "layered" | "clean";
  infrastructure?: {
    docker?: boolean;
    database?: "none" | "postgres" | "mongodb";
  };
  deployment?: {
    cli?: "github-actions" | "none";
  };
  installDependencies?: boolean;
}
