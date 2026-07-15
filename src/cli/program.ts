import { Command } from "commander";
import { showBanner } from "./banner.js";
import { scanCommand } from "../commands/scan.js";
import { aboutCommand } from "../commands/about.js";
import { versionCommand } from "../commands/version.js";
import { exportCommand } from "../commands/export.js";
import { compareCommand } from "../commands/compare.js";

export function createProgram() {
  const program = new Command();

  program
    .name("quicklyzer")
    .description(
      "A CLI that understands and analyzes software projects in seconds."
    );

  program.hook("preAction", () => {
    showBanner();
  });

  program.addCommand(scanCommand());
  program.addCommand(aboutCommand());
  program.addCommand(versionCommand());
  program.addCommand(exportCommand());
  program.addCommand(compareCommand());
  return program;
}