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

    // ============================================================
    // Project
    // ============================================================

    console.log("Project");
    console.log("────────────────────────────");
    console.log(`Name             : ${project.name}`);
    console.log(`Version          : ${project.version}`);
    console.log(`Type             : ${project.projectType}`);
    console.log(`Entry Point      : ${project.entryPoint}`);

    // ============================================================
    // Project Structure
    // ============================================================

    console.log();
    console.log("Project Structure");
    console.log("────────────────────────────");

    console.log("\nFolders:");
    project.projectTree.directories.forEach(dir => console.log(`📁 ${dir}`));

    console.log("\nFiles:");
    project.projectTree.files.forEach(file => console.log(`📄 ${file}`));

    // ============================================================
    // Configuration Files
    // ============================================================

    console.log();
    console.log("Configuration Files");
    console.log("────────────────────────────");

    if (project.configFiles.length === 0) {
      console.log("None");
    } else {
      project.configFiles.forEach(file => console.log(`${file}`));
    }

    // ============================================================
    // Technology Stack
    // ============================================================

    console.log();
    console.log("Technology Stack");
    console.log("────────────────────────────");

    project.technologyStack.forEach(tech => console.log(`${tech}`));

    // ============================================================
    // Package Health
    // ============================================================

    console.log();
    console.log("Package Health");
    console.log("────────────────────────────");
    console.log(`Score : ${project.packageHealth.score}/10`);

    console.log("\nPassed:");
    project.packageHealth.passed.forEach(item => console.log(`${item}`));

    console.log("\nMissing:");
    project.packageHealth.missing.forEach(item => console.log(`${item}`));

    // ============================================================
    // Environment
    // ============================================================

    console.log();
    console.log("Environment");
    console.log("────────────────────────────");
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
    console.log("Dependencies");
    console.log("────────────────────────────");
    console.log(`Dependencies     : ${project.dependencyCount}`);
    console.log(`Dev Dependencies : ${project.devDependencyCount}`);
    console.log(`Total Packages   : ${project.totalDependencyCount}`);



    console.log();
    console.log("Dependency Intelligence");
    console.log("────────────────────────────");
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


    // ============================================================
    // Scripts
    // ============================================================

    console.log();
    console.log("Scripts");
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
    console.log("Project Statistics");
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
    console.log("Largest Directories");
    console.log("────────────────────────────");

    for (const dir of project.largestDirectories) {
      console.log(`${basename(dir.path)} (${dir.fileCount} files)`);
    }

    // ============================================================
    // Code Analysis
    // ============================================================

    console.log();
    console.log("Code Analysis");
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
    console.log("Code Quality");
    console.log("────────────────────────────");
    console.log(`TODO   : ${project.code.todos.todo}`);
    console.log(`FIXME  : ${project.code.todos.fixme}`);
    console.log(`HACK   : ${project.code.todos.hack}`);
    console.log(`NOTE   : ${project.code.todos.note}`);

    // ============================================================
    // Duplicate Files
    // ============================================================

    console.log();
    console.log("Duplicate File Names");
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
    console.log("Recent Activity");
    console.log("────────────────────────────");

    project.code.recentFiles.forEach(file =>
      console.log(file.path)
    );

    // ============================================================
    // Repository
    // ============================================================

    console.log();
    console.log("Repository");
    console.log("────────────────────────────");
    console.log(`Git              : ${project.git ? "Yes" : "No"}`);
    console.log(`Branch           : ${project.gitBranch}`);
    console.log(`README           : ${project.readme ? "Yes" : "No"}`);
    console.log(`LICENSE          : ${project.license ? "Yes" : "No"}`);

    // ============================================================
    // Project Score
    // ============================================================

    console.log();
    console.log("Project Score");
    console.log("────────────────────────────");
    console.log(`Score            : ${project.projectScore.score}/100`);
    console.log(`Rating           : ${project.projectScore.rating}`);

    // ============================================================
    // Summary
    // ============================================================

    console.log();
    console.log("Summary");
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

  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error("An unknown error occurred.");
    }
  }
});
}