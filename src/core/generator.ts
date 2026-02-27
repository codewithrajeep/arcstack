import path from "path";
import { loadPreset } from "./preset-loader";
import { createDirectoryStructure } from "./file-writer";
import fs from "fs";
import { execSync } from "child_process";

function createPackageJson(
  projectPath: string,
  projectName: string,
  dependencies: string[],
) {
  const pkg = {
    name: projectName,
    version: "1.0.0",
    main: "dist/index.js",
    scripts: {
      dev: "ts-node src/index.ts",
      build: "tsc",
    },
    dependencies: Object.fromEntries(
      dependencies.map((dep) => [dep, "latest"]),
    ),
  };

  fs.writeFileSync(
    path.join(projectPath, "package.json"),
    JSON.stringify(pkg, null, 2),
  );
}

function createStarterTemplate(projectPath: string) {
  const template = `
    import express from "express";
    
    const app = express();
    app.use(express.json());
    
    app.get("/", (_, res) => {
      res.json({
        message: "Archon backend ready",
      });
    });
    
    app.listen(4000, () => {
      console.log("Server is running on port 4000");
    });
  `;
  fs.writeFileSync(path.join(projectPath, "src", "index.ts"), template);
}

export async function generateProject(
  projectName: string,
  presetName: string,
  install?: boolean,
) {
  const preset = loadPreset(presetName);
  const projectPath = path.join(process.cwd(), projectName);
  if (fs.existsSync(projectPath)) {
    throw new Error("Project folder already exists.");
  }

  // create folder
  createDirectoryStructure(projectPath, preset.structure);
  // create package.json
  createPackageJson(projectPath, projectName, preset.dependencies);
  // create starter template
  createStarterTemplate(projectPath);

  // install dependencies
  if (install) {
    console.log("\n 📦 Installing dependencies...");
    execSync("npm install", { cwd: projectPath, stdio: "inherit" });
  }

  console.log("\n✅ Project created successfully!");
  console.log(`📁 Location: ${projectPath}`);
}
