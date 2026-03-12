import chalk from "chalk";
import { version } from "../../package.json";

export function showBanner() {
  console.log(
    chalk.cyan(`
  ░█████╗░██████╗░░█████╗░░██████╗████████╗░█████╗░░█████╗░██╗░░██╗
  ██╔══██╗██╔══██╗██╔══██╗██╔════╝╚══██╔══╝██╔══██╗██╔══██╗██║░██╔╝
  ███████║██████╔╝██║░░╚═╝╚█████╗░░░░██║░░░███████║██║░░╚═╝█████═╝░
  ██╔══██║██╔══██╗██║░░██╗░╚═══██╗░░░██║░░░██╔══██║██║░░██╗██╔═██╗░
  ██║░░██║██║░░██║╚█████╔╝██████╔╝░░░██║░░░██║░░██║╚█████╔╝██║░╚██╗
  ╚═╝░░╚═╝╚═╝░░╚═╝░╚════╝░╚═════╝░░░╚═╝░░░╚═╝░░╚═╝░╚════╝░╚═╝░░╚═╝`),
  );

  console.log(
    chalk.white(
      "  ────────────────────────────────────────────────────────────────",
    ),
  );

  console.log(
    chalk.white("  ") +
      chalk.bold.white("Backend Architecture Scaffolding CLI") +
      chalk.gray("  •  ") +
      chalk.cyan(`v${version}`),
  );

  console.log(
    chalk.white("  ") +
      chalk.gray("Built by ") +
      chalk.bold.white("Rajeep") +
      chalk.gray("  •  ") +
      chalk.gray("npm install -g arcstack"),
  );

  console.log(
    chalk.white(
      "  ────────────────────────────────────────────────────────────────",
    ),
  );

  console.log();
}
