import { Command } from "commander";
import { showBanner } from "./utils/banner";
import { createProject } from "./commands/create";

export function runCLI() {
  showBanner();

  const program = new Command();

  program
    .name("arcstack")
    .description("Backend Architecture Scaffolding CLI")
    .version("0.1.0");

  program
    .command("create")
    .description("Create a new backend project")
    .argument("[project-name]", "Name of the project")
    .option(
      "-p, --preset <preset>",
      "Preset type (junior | intermediate | senior)"
    )
    .option("-i, --install", "Install dependencies automatically")
    .action(createProject);

  program.parse(process.argv);
}
