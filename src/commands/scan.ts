import { Command } from "commander";
import { analyzeProject } from "../services/project.js";
import { basename } from "path";
import { formatBytes } from "../services/statistics.js";
import { performance } from "node:perf_hooks";

export function scanCommand() {
  return new Command("scan")
    .description("Analyze the current project")
    .action(() => {
        const startTime = performance.now();
      try {
        const project = analyzeProject();

        console.log();

        console.log("Project");
        console.log("────────────────────────────");
        console.log(`Name             : ${project.name}`);
        console.log(`Version          : ${project.version}`);
        console.log(`Entry Point      : ${project.entryPoint}`);

        console.log();
        console.log("Project Structure");
        console.log("────────────────────────────");
        console.log();
        console.log("Folders:");
        console.log();
        for (const directory of project.projectTree.directories) {
            console.log(`📁 ${directory}`);
        }

        console.log();
        console.log("Files:");
        console.log();
        for (const file of project.projectTree.files) {
            console.log(`📄 ${file}`);
       }

      
        console.log();
        console.log("Configuration Files");
        console.log("────────────────────────────");
        if (project.configFiles.length === 0) {
            console.log("None");
        } else {
            for (const file of project.configFiles) {
                console.log(`${file}`);
            }
         }

       
        console.log();
        console.log("Technology Stack");
        console.log("────────────────────────────");
        for (const technology of project.technologyStack) {
            console.log(`${technology}`);
        }


        console.log();
        console.log("Package Health");
        console.log("────────────────────────────");
        console.log(`Score : ${project.packageHealth.score}/10`);
        console.log();
        console.log("Passed Packages:");
        console.log();
        for (const item of project.packageHealth.passed) {
            console.log(`${item}`);
        }

        console.log();
        console.log("Missing Packages:");
        console.log();
        for (const item of project.packageHealth.missing) {
            console.log(`${item}`);
        }







        console.log();
        console.log("Environment");
        console.log("────────────────────────────");
        console.log(`Package Manager    : ${project.packageManager}`);
        console.log(`Language           : ${project.language}`);
        console.log(`Framework          : ${project.framework}`);
        console.log(`Framework Version  : ${project.frameworkVersion}`);
        console.log(`Build Tool         : ${project.buildTool}`);
        console.log(`Build Tool Version : ${project.buildToolVersion}`);
        console.log(`Node.js Required   : ${project.nodeVersion}`);
        console.log(`Docker             : ${project.docker ? "Yes" : "No"}`);
        console.log(`CI/CD              : ${project.ci}`);
        console.log(`ESLint             : ${project.eslint ? "Yes" : "No"}`);
        console.log(`Prettier           : ${project.prettier ? "Yes" : "No"}`);
        console.log(`Monorepo           : ${project.monorepo ? "Yes" : "No"}`);
       
       
        
        console.log();
        console.log("Dependencies");
        console.log("────────────────────────────");
        console.log(`Dependencies      : ${project.dependencyCount}`);
        console.log(`Dev Dependencies  : ${project.devDependencyCount}`);
        console.log(`Total Packages    : ${project.totalDependencyCount}`);
        
      
        console.log();
        console.log("Scripts");
        console.log("────────────────────────────");
        if (project.scripts.length === 0) {
           console.log("No scripts found.");
        } else {
          for (const script of project.scripts) {
            console.log(`${script}`);
          }
       }


        console.log();
        console.log("Project Statistics");
        console.log("────────────────────────────");
        console.log(`Total Files       : ${project.totalFiles}`);
        console.log(`Source Files      : ${project.sourceFiles}`);
        console.log(`Directories       : ${project.directories}`);
        console.log(`Largest Directory : ${basename(project.largestDirectory.path)} (${project.largestDirectory.fileCount} files)`);
        console.log(`Lines of Code     : ${project.linesOfCode.toLocaleString()}`);
        console.log(`Largest File      : ${basename(project.largestFile.path)} (${project.largestFile.lines.toLocaleString()} lines)`);
        console.log(`Empty Directories : ${project.emptyDirectories}`);
        console.log(`Hidden Files      : ${project.hiddenFiles}`);
        console.log(`Project Size      : ${formatBytes(project.projectSize)}`);
        const endTime = performance.now();
        console.log(`Scan Time         : ${(endTime - startTime).toFixed(2)} ms`);


        console.log();
        console.log("Code Analysis");
        console.log("────────────────────────────");
        console.log(`Empty Source Files : ${project.code.emptyFiles}`);
        console.log();
        console.log("Largest Files");
        for (const file of project.code.largestFiles) {
            console.log(`${file.path} (${file.lines} lines)`);
        }

        console.log();
        console.log("Extensions");
        for (const [extension, count] of Object.entries(project.code.extensions).sort()) {
            console.log(`${extension.padEnd(8)} ${count}`);
        }






        console.log();
        console.log("Repository");
        console.log("────────────────────────────");
        console.log(`Git              : ${project.git ? "Yes" : "No"}`);
        console.log(`README           : ${project.readme ? "Yes" : "No"}`);
        console.log(`LICENSE          : ${project.license ? "Yes" : "No"}`);



        console.log();
        console.log("Project Score");
        console.log("────────────────────────────");
        console.log(`Score            : ${project.projectScore.score}/100`);
        console.log(`Rating           : ${project.projectScore.rating}`);




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