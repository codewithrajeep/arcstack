export type Framework = "express" | "fastify" | "nestjs";
export type Architecture = "basic" | "layered" | "clean";
export type Database = "none" | "postgres" | "mongodb";
export type PostgresProvider = "local" | "supabase";
export type PostgresClient = "prisma" | "pool";
export type CI = "github-actions" | "none";

export interface ProjectConfig {
  projectName: string;
  framework: Framework;
  architecture: Architecture;
  infrastructure?: {
    docker?: boolean;
    database?: Database;
    postgresProvider?: PostgresProvider;
    postgresClient?: PostgresClient;
  };
  deployment?: {
    ci?: CI;
  };
  installDependencies?: boolean;
}
