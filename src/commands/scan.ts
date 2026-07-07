import { Command } from "commander";
import { analyzeProject } from "../services/project.js";

export function scanCommand() {
  return new Command("scan")
    .description("Analyze the current project")
    .action(() => {
      try {
        const project = analyzeProject();

        console.log();

        console.log("Project");
        console.log("────────────────────────────");
        console.log(`Name             : ${project.name}`);
        console.log(`Version          : ${project.version}`);

        console.log();

        console.log("Environment");
        console.log("────────────────────────────");
        console.log(`Package Manager  : ${project.packageManager}`);
        console.log(`Language         : ${project.language}`);
        console.log(`Framework        : ${project.framework}`);
        console.log(`Framework Version: ${project.frameworkVersion}`);
        console.log(`Build Tool       : ${project.buildTool}`);
        console.log(`Build Tool Version: ${project.buildToolVersion}`);

        
        console.log();

        console.log("Dependencies");
        console.log("========================");
        console.log(`Dependencies      : ${project.dependencyCount}`);
        console.log(`Dev Dependencies  : ${project.devDependencyCount}`);
        console.log(`Total Packages    : ${project.totalDependencyCount}`);

        console.log();

        console.log("Repository");
        console.log("────────────────────────────");
        console.log(`Git              : ${project.git ? "Yes" : "No"}`);
        console.log(`README           : ${project.readme ? "Yes" : "No"}`);
        console.log(`LICENSE          : ${project.license ? "Yes" : "No"}`);

        console.log();
      } catch (error) {
        if (error instanceof Error) {
          console.error(`${error.message}`);
        } else {
          console.error("An unknown error occurred.");
        }
      }
    });
}