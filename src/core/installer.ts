import { execSync } from "child_process";
import path from "path";
import fs from "fs";

export function installDependencies(projectPath: string) {
  try {
    console.log("This may take a moment...\n");
    execSync("npm install", {
      cwd: projectPath,
      stdio: "inherit",
      shell: process.platform === "win32" ? "cmd.exe" : "/bin/sh",
    });
    const prismaSchemaPath = path.join(projectPath, "prisma", "schema.prisma");
    if (fs.existsSync(prismaSchemaPath)) {
      console.log("\nGenerating Prisma client...\n");
      execSync("npx prisma generate", {
        cwd: projectPath,
        stdio: "inherit",
        shell: process.platform === "win32" ? "cmd.exe" : "/bin/sh",
      });
    }
  } catch (error: any) {
    console.error(`Failed: ${error.message}`);
    console.log(
      "\nYou can manually run: cd <project> && npm install && npx prisma generate"
    );
  }
}
