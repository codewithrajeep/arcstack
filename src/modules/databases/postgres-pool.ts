import { ModuleResult } from "../../types/module";
import { PostgresProvider } from "../../types/project-config";

export function generatePostgresPool(provider: PostgresProvider): ModuleResult {
  const isSupabase = provider === "supabase";

  const databaseUrl = isSupabase
    ? `DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres`
    : `DATABASE_URL=postgresql://postgres:password@localhost:5432/mydb`;

  return {
    files: [
      {
        path: "src/infrastructure/database/pool.ts",
        content: `
import pg from "pg";
const {Pool} = pg

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined in environment variables");
}

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
  ssl: process.env.NODE_ENV === "production"
    ? { rejectUnauthorized: false }
    : false,
});

pool.on("error", (err) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});

export async function query<T = any>(
  text: string,
  params?: any[]
): Promise<T[]> {
  const result = await pool.query(text, params);
  return result.rows;
}

export async function connectDatabase(): Promise<void> {
  const client = await pool.connect();
  client.release();
  console.log("PostgreSQL connected successfully");
}
        `.trim(),
      },
      {
        path: ".env",
        content: databaseUrl,
      },
      {
        path: ".env.example",
        content: databaseUrl,
      },
      ...(isSupabase
        ? [
            {
              path: "SUPABASE_SETUP.md",
              content: `
# Supabase Setup

1. Go to https://supabase.com and create a new project
2. Go to Project Settings → Database → Connection string
3. Copy the connection string and replace DATABASE_URL in .env
4. Make sure SSL is enabled for production connections
        `.trim(),
            },
          ]
        : []),
    ],
    dependencies: {
      dependencies: {
        pg: "^8.13.0",
      },
      devDependencies: {
        "@types/pg": "^8.11.0",
      },
      scripts: {},
    },
  };
}
