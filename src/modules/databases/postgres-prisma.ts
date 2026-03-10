import { ModuleResult } from "../../types/module";
import { PostgresProvider } from "../../types/project-config";

export function generatePostgresPrisma(
  provider: PostgresProvider
): ModuleResult {
  const isSupabase = provider === "supabase";
  const databaseUrl = isSupabase
    ? `DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres`
    : `DATABASE_URL=postgresql://postgres:password@localhost:5432/mydb`;
  const directUrl = isSupabase
    ? `DIRECT_URL=postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres`
    : "";
  return {
    files: [
      {
        path: "prisma/schema.prisma",
        content: `
generator client {
  provider = "prisma-client"
  output   = "../src/generated/prisma"
}

datasource db {
  provider = "postgresql"
}

model Example {
  id        Int      @id @default(autoincrement())
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  name      String
}
  `.trim(),
      },
      {
        path: "prisma/schema.prisma",
        content: `
generator client {
  provider = "prisma-client"
  output   = "../src/generated/prisma"
}

datasource db {
  provider = "postgresql"
}

model Example {
  id        Int      @id @default(autoincrement())
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  name      String
}
        `.trim(),
      },
      {
        path: "prisma.config.ts",
        content: `
import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: env("DATABASE_URL"),${
      isSupabase ? '\n    directUrl: env("DIRECT_URL"),' : ""
    }
  },
});
  `.trim(),
      },
      {
        path: "tsconfig.prisma.json",
        content: JSON.stringify(
          {
            compilerOptions: {
              target: "ES2020",
              module: "CommonJS",
              esModuleInterop: true,
              strict: true,
            },
            include: ["prisma.config.ts"],
          },
          null,
          2
        ),
      },
      {
        path: "src/infrastructure/database/prisma.ts",
        content: `
import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined in environment variables");
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === "production"
    ? { rejectUnauthorized: false }
    : false,
});

const adapter = new PrismaPg(pool);

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
  `.trim(),
      },
      {
        path: ".env",
        content: [databaseUrl, directUrl].filter(Boolean).join("\n"),
      },
      {
        path: ".env.example",
        content: [databaseUrl, directUrl].filter(Boolean).join("\n"),
      },
      ...(isSupabase
        ? [
            {
              path: "SUPABASE_SETUP.md",
              content: `
# Supabase Setup

1. Go to https://supabase.com and create a new project
2. Go to Project Settings → Database
3. Replace values in .env:
   - [YOUR-PASSWORD] → your database password
   - [YOUR-PROJECT-REF] → your project reference ID
4. npm run db:migrate
5. npm run db:generate
        `.trim(),
            },
          ]
        : []),
    ],
    dependencies: {
      dependencies: {
        "@prisma/client": "^7.0.0",
        "@prisma/adapter-pg": "^7.0.0",
        pg: "^8.13.0",
        dotenv: "^16.0.0",
      },
      devDependencies: {
        prisma: "^7.0.0",
        "@types/pg": "^8.11.0",
      },
      scripts: {
        postinstall: "prisma generate",
        "db:generate": "prisma generate",
        "db:migrate": "prisma migrate dev",
        "db:push": "prisma db push",
        "db:studio": "prisma studio",
        "db:seed": "ts-node prisma/seed.ts",
      },
    },
  };
}
