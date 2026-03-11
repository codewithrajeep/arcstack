import { ModuleResult } from "../../types/module";
import { PostgresClient, PostgresProvider } from "../../types/project-config";
import { generatePostgresPool } from "./postgres-pool";
import { generatePostgresPrisma } from "./postgres-prisma";

export function generatePostgres(
  provider: PostgresProvider = "local",
  client: PostgresClient = "prisma",
  datbaseUrl?: string,
  directUrl?: string,
): ModuleResult {
  switch (client) {
    case "prisma":
      return generatePostgresPrisma(provider, datbaseUrl, directUrl);
    case "pool":
      return generatePostgresPool(provider);
  }
}
