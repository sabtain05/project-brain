import { Command } from "commander";
import { analyzeProject } from "../services/project.js";
import { basename } from "path";
import { formatBytes } from "../services/statistics.js";
import { performance } from "node:perf_hooks";
import ora from "ora";
import {title, error} from "../utils/ui.js";

export function scanCommand() {
  return new Command("scan")
    .description("Analyze the current project")
    .action(() => {
  const startTime = performance.now();
  const spinner = ora("Analyzing project...");

  try {
    spinner.start();

    const project = analyzeProject();
    spinner.succeed("Analyzation completed");

    console.log();

    // ============================================================
    // Project
    // ============================================================

    title("Project");
    console.log(`Name             : ${project.name}`);
    console.log(`Version          : ${project.version}`);
    console.log(`Type             : ${project.projectType}`);
    console.log(`Entry Point      : ${project.entryPoint}`);

    // ============================================================
    // Project Structure
    // ============================================================

    console.log();
    title("Project Structure");

    console.log("\nFolders:");
    project.projectTree.directories.forEach(dir => console.log(`📁 ${dir}`));

    console.log("\nFiles:");
    project.projectTree.files.forEach(file => console.log(`📄 ${file}`));

    // ============================================================
    // Configuration Files
    // ============================================================

    console.log();
    title("Configuration Files");

    if (project.configFiles.length === 0) {
      console.log("None");
    } else {
      project.configFiles.forEach(file => console.log(`${file}`));
    }

    // ============================================================
    // Technology Stack
    // ============================================================

    console.log();
    title("Technology Stack");

    project.technologyStack.forEach(tech => console.log(`${tech}`));

    // ============================================================
    // Package Health
    // ============================================================

    console.log();
    title("Package Health");
    console.log(`Score : ${project.packageHealth.score}/10`);

    console.log("\nPassed:");
    project.packageHealth.passed.forEach(item => console.log(`${item}`));

    console.log("\nMissing:");
    project.packageHealth.missing.forEach(item => console.log(`${item}`));

    // ============================================================
    // Environment
    // ============================================================

    console.log();
    title("Environment");
    console.log(`Package Manager  : ${project.packageManager}`);
    console.log(`Language         : ${project.language}`);
    console.log(`Framework        : ${project.framework}`);
    console.log(`Framework Ver.   : ${project.frameworkVersion}`);
    console.log(`Build Tool       : ${project.buildTool}`);
    console.log(`Build Tool Ver.  : ${project.buildToolVersion}`);
    console.log(`Node.js Required : ${project.nodeVersion}`);
    console.log(`Docker           : ${project.docker ? "Yes" : "No"}`);
    console.log(`CI/CD            : ${project.ci}`);
    console.log(`ESLint           : ${project.eslint ? "Yes" : "No"}`);
    console.log(`Prettier         : ${project.prettier ? "Yes" : "No"}`);
    console.log(`Monorepo         : ${project.monorepo ? "Yes" : "No"}`);

    // ============================================================
    // Dependencies
    // ============================================================

    console.log();
    title("Dependencies");
    console.log(`Dependencies     : ${project.dependencyCount}`);
    console.log(`Dev Dependencies : ${project.devDependencyCount}`);
    console.log(`Total Packages   : ${project.totalDependencyCount}`);

    console.log();
    console.log("Unused Dependencies:");
      if(project.dependencyAnalysis.unused.length){
        for(const pkg of project.dependencyAnalysis.unused)
          console.log(`• ${pkg}`);
        }else{
          console.log("None");
        }
    console.log();
    console.log("Missing Dependencies:");
      if(project.dependencyAnalysis.missing.length){
        for(const pkg of project.dependencyAnalysis.missing)
          console.log(`• ${pkg}`);
        }else{
          console.log("None");
        }
    
    
    console.log();
    title("Duplicate Versions");
    if(project.dependencyAnalysis.duplicateVersions.length){
      for(const version of project.dependencyAnalysis.duplicateVersions)
        {console.log(`• ${version}`);
        }
      }else{
        console.log("None");
      }    





    console.log();
    title("Dependency Intelligence");
    console.log(`Production Packages : ${project.dependencyAnalysis.production}`);
    console.log(`Development Packages: ${project.dependencyAnalysis.development}`);
    console.log(`Total Packages      : ${project.dependencyAnalysis.total}`);
    console.log(`Private Package     : ${project.dependencyAnalysis.packageInsights.private ? "Yes":"No"}`);
    console.log(`Workspaces          : ${project.dependencyAnalysis.packageInsights.workspaces ? "Yes":"No"}`);
    console.log(`Installed Packages : ${project.dependencyAnalysis.installed}`);
    console.log(`Installed Size     : ${project.dependencyAnalysis.installedSize}`);
    console.log();
    console.log("Largest Packages:");
    for(const pkg of project.dependencyAnalysis.largestPackages){console.log(`${pkg.name} (${(pkg.size/1024/1024).toFixed(1)} MB)`);}


    console.log();
    title("Dependency Risk");
    console.log("────────────────────────────");
    console.log(`Score  : ${project.dependencyAnalysis.riskScore.score}/100`);
    console.log(`Rating : ${project.dependencyAnalysis.riskScore.rating}`);



    console.log();
    title("Dependency Summary");
    console.log("────────────────────────────");
    console.log(`Declared Packages : ${project.dependencyAnalysis.total}`);
    console.log(`Installed Packages: ${project.dependencyAnalysis.installed}`);
    console.log(`Unused            : ${project.dependencyAnalysis.unused.length}`);
    console.log(`Missing           : ${project.dependencyAnalysis.missing.length}`);
    console.log(`Duplicate Versions: ${project.dependencyAnalysis.duplicateVersions.length}`);


    // ============================================================
    // Scripts
    // ============================================================

    console.log();
    title("Scripts");
    console.log("────────────────────────────");

    if (project.scripts.length === 0) {
      console.log("No scripts found.");
    } else {
      project.scripts.forEach(script => console.log(`${script}`));
    }

    // ============================================================
    // Statistics
    // ============================================================

    console.log();
    title("Project Statistics");
    console.log("────────────────────────────");
    console.log(`Total Files      : ${project.totalFiles}`);
    console.log(`Source Files     : ${project.sourceFiles}`);
    console.log(`Directories      : ${project.directories}`);
    console.log(`Lines of Code    : ${project.linesOfCode.toLocaleString()}`);
    console.log(`Largest File     : ${basename(project.largestFile.path)} (${project.largestFile.lines.toLocaleString()} lines)`);
    console.log(`Empty Directories: ${project.emptyDirectories}`);
    console.log(`Hidden Files     : ${project.hiddenFiles}`);
    console.log(`Project Size     : ${formatBytes(project.projectSize)}`);

    const endTime = performance.now();
    console.log(`Scan Time        : ${(endTime - startTime).toFixed(2)} ms`);

    // ============================================================
    // Largest Directories
    // ============================================================

    console.log();
    title("Largest Directories");
    console.log("────────────────────────────");

    for (const dir of project.largestDirectories) {
      console.log(`${basename(dir.path)} (${dir.fileCount} files)`);
    }

    // ============================================================
    // Code Analysis
    // ============================================================

    console.log();
    title("Code Analysis");
    console.log("────────────────────────────");
    console.log(`Empty Source Files : ${project.code.emptyFiles}`);

    console.log("\nLargest Files:");

    project.code.largestFiles.forEach(file =>
      console.log(`${file.path} (${file.lines} lines)`)
    );

    console.log("\nExtensions:");

    Object.entries(project.code.extensions)
      .sort()
      .forEach(([ext, count]) =>
        console.log(`${ext.padEnd(8)} ${count}`)
      );

    // ============================================================
    // Code Quality
    // ============================================================

    console.log();
    title("Code Quality");
    console.log("────────────────────────────");
    console.log(`TODO   : ${project.code.todos.todo}`);
    console.log(`FIXME  : ${project.code.todos.fixme}`);
    console.log(`HACK   : ${project.code.todos.hack}`);
    console.log(`NOTE   : ${project.code.todos.note}`);

    // ============================================================
    // Duplicate Files
    // ============================================================

    console.log();
    title("Duplicate File Names");
    console.log("────────────────────────────");

    const duplicates = Object.entries(project.code.duplicateFiles);

    if (duplicates.length === 0) {
      console.log("None");
    } else {
      for (const [name, files] of duplicates) {
        console.log(`\n${name}`);
        files.forEach(file => console.log(`${file}`));
      }
    }

    // ============================================================
    // Recent Activity
    // ============================================================

    console.log();
    title("Recent Activity");
    console.log("────────────────────────────");

    project.code.recentFiles.forEach(file =>
      console.log(file.path)
    );

    // ============================================================
    // Repository
    // ============================================================

    console.log();
    title("Repository");
    console.log("────────────────────────────");
    console.log(`Git              : ${project.git ? "Yes" : "No"}`);
    console.log(`Branch           : ${project.gitBranch}`);
    console.log(`README           : ${project.readme ? "Yes" : "No"}`);
    console.log(`LICENSE          : ${project.license ? "Yes" : "No"}`);

    // ============================================================
    // Project Score
    // ============================================================

    console.log();
    title("Project Score");
    console.log("────────────────────────────");
    console.log(`Score            : ${project.projectScore.score}/100`);
    console.log(`Rating           : ${project.projectScore.rating}`);

    // ============================================================
    // Summary
    // ============================================================

    console.log();
    title("Summary");
    console.log("────────────────────────────");
    console.log(`Project Type     : ${project.projectType}`);
    console.log(`Technologies     : ${project.technologyStack.join(", ")}`);
    console.log(`Health           : ${project.projectScore.score}/100 (${project.projectScore.rating})`);

    if (project.projectScore.score >= 90) {
      console.log("Recommendation   : Excellent project structure.");
    } else if (project.projectScore.score >= 75) {
      console.log("Recommendation   : Good project with minor improvements.");
    } else if (project.projectScore.score >= 60) {
      console.log("Recommendation   : Improve documentation and project structure.");
    } else {
      console.log("Recommendation   : Significant improvements recommended.");
    }

    console.log();

  } catch (err) {

    spinner.fail("Analysis failed");

    if(err instanceof Error){

        error(err.message);

    }else{

        error("Unknown error.");

    }

    process.exit(1);

}
});
}