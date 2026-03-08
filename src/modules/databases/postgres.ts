import fs from "fs";
import path from "path";
import { ProjectConfig } from "../../types/project-config";

export async function generatePostgres(config: ProjectConfig) {
  const envPath = path.join(process.cwd(), config.projectName, ".env");
  fs.appendFileSync(
    envPath,
    `DATABASE_URL=postgresql://user:password@localhost:5432/db\n`
  );
}
  