import { Command } from "commander";
import { createProject } from "./commands/create";
import { showBanner } from "./utils/banner";

export function runCLI() {
  const program = new Command();

  program
    .name("archon")
    .description("Backend Architecture Scaffolding CLI")
    .version("0.1.0");

  program
    .command("create")  
    .description("Create a new backend project")
    .argument("[project-name]", "Name of the project")
    .option(
      "-p, --preset <preset>",
      "Preset type (junior | intermediate | senior)",
    )
    .option("-i, --install", "Install dependencies automatically")
    .action(createProject);

    if(process.argv.length <= 2){
      showBanner();
    }

  program.parse(process.argv);
}
