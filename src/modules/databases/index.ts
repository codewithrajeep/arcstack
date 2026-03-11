import { ModuleResult } from "../../types/module";
import {
  Database,
  PostgresClient,
  PostgresProvider,
} from "../../types/project-config";
import { generateMongodb } from "./mongodb";
import { generatePostgres } from "./postgres";

export function generateDatabase(
  database?: Database,
  postgresProvider?: PostgresProvider,
  postgresClient?: PostgresClient,
  databaseUrl?: string,
  directUrl?: string,
): ModuleResult {
  switch (database) {
    case "postgres":
      return generatePostgres(postgresProvider, postgresClient, databaseUrl, directUrl);
    case "mongodb":
      return generateMongodb();
    default:
      return { files: [], dependencies: {} };
  }
}
