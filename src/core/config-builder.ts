import { confirm, input, select } from "@inquirer/prompts";
import {
  Architecture,
  Database,
  Framework,
  PostgresClient,
  PostgresProvider,
  ProjectConfig,
} from "../types/project-config";

export async function buildProjectConfig(
  projectNameArg?: string,
  options?: any
): Promise<ProjectConfig> {
  const projectName =
    projectNameArg ||
    (await input({
      message: "Project name:",
      validate: (value) => (value.trim() ? true : "Project name is required"),
    }));
  const framework = await select<Framework>({
    message: "Choose framework:",
    choices: [
      {
        name: "Express   — minimal, fast, most popular Node.js framework",
        value: "express",
      },
      {
        name: "Fastify   — high performance, schema-based, Pino built-in",
        value: "fastify",
      },
      {
        name: "NestJS    — opinionated, Angular-style, enterprise ready",
        value: "nestjs",
      },
    ],
  });
  const architecture = await select<Architecture>({
    message: "Choose architecture style:",
    choices: [
      {
        name: "Basic     — flat src/ structure, great for small APIs",
        value: "basic",
      },
      {
        name: "Layered   — controllers → services → repositories",
        value: "layered",
      },
      {
        name: "Clean     — domain / application / infrastructure / presentation",
        value: "clean",
      },
    ],
  });
  const database = await select<Database>({
    message: "Choose database:",
    choices: [
      { name: "None       — skip database setup", value: "none" },
      {
        name: "PostgreSQL — relational, production-grade SQL database",
        value: "postgres",
      },
      {
        name: "MongoDB    — flexible, document-based NoSQL database",
        value: "mongodb",
      },
    ],
  });
  let postgresProvider: PostgresProvider | undefined;
  let postgresClient: PostgresClient | undefined;

  if (database === "postgres") {
    postgresProvider = await select<PostgresProvider>({
      message: "Choose PostgreSQL provider:",
      choices: [
        {
          name: "Local    — runs on your machine (localhost:5432)",
          value: "local",
        },
        {
          name: "Supabase — managed cloud PostgreSQL, free tier available",
          value: "supabase",
        },
      ],
    });
    postgresClient = await select<PostgresClient>({
      message: "Choose PostgreSQL client:",
      choices: [
        {
          name: "Prisma   — type-safe ORM, auto-generated client, migrations",
          value: "prisma",
        },
        {
          name: "pg Pool  — lightweight raw SQL, full control, no ORM",
          value: "pool",
        },
      ],
    });
  }
  const docker = await confirm({
    message: "Add Docker support? (Dockerfile + docker-compose)",
    default: false,
  });
  const installDependencies =
    options?.install ??
    (await confirm({
      message: "Install dependencies?  (runs npm install)",
      default: true,
    }));
  return {
    projectName: projectName.trim(),
    framework,
    architecture,
    infrastructure: {
      database,
      postgresProvider,
      postgresClient,
      docker,
    },
    installDependencies,
  };
}
