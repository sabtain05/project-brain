import { Command } from "commander";
import { analyzeProject } from "../services/project.js";

export function scanCommand() {
  return new Command("scan")
    .description("Analyze the current project")
    .action(() => {
      try {
        const project = analyzeProject();

        console.log(" Project Information");
        console.log("========================");
        console.log(`Name            : ${project.name}`);
        console.log(`Version         : ${project.version}`);
        console.log(`Package Manager : ${project.packageManager}`);
        console.log(`Language        : ${project.language}`);
        console.log(`Framework       : ${project.framework}`);
      } catch (error) {
        if (error instanceof Error) {
          console.error(`${error.message}`);
        } else {
          console.error("An unknown error occurred.");
        }
      }
    });
}