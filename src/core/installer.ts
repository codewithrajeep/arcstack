import { execSync } from "child_process"

export function installDependencies(projectPath: string){
  try {
    execSync("npm install", {
      cwd: projectPath,
      stdio: "inherit",
      shell: process.platform === "win32" ? "cmd.exe" : "/bin/sh"
    })
  }catch(error: any){
    console.error(`Failed to install dependencies: ${error.message}`)
  }
}