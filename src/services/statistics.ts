import { readdirSync, statSync } from "fs";
import { join } from "path";


const IGNORED_DIRECTORIES = [
  "node_modules",
  ".git",
  "dist",
  "coverage",
  ".next",
  ".nuxt",
  "build",
  "out"
];


function countFiles(directory: string): number {
  let total = 0;

  const entries = readdirSync(directory);

  for (const entry of entries) {
    const fullPath = join(directory, entry);
    const stats = statSync(fullPath);

    if (stats.isDirectory()) {
      if (IGNORED_DIRECTORIES.includes(entry)) {
        continue;
      }

      total += countFiles(fullPath);
    } else {
      total++;
    }
  }

  return total;
}


export function getProjectStatistics(projectPath: string) {
  return {
    totalFiles: countFiles(projectPath)
  };
}