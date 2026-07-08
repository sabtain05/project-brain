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

export interface ProjectTree {
  directories: string[];
  files: string[];
}

export function getProjectTree(projectPath: string): ProjectTree {
  const directories: string[] = [];
  const files: string[] = [];

  const entries = readdirSync(projectPath);

  for (const entry of entries) {
    if (IGNORED_DIRECTORIES.includes(entry)) {
      continue;
    }

    const fullPath = join(projectPath, entry);

    if (statSync(fullPath).isDirectory()) {
      directories.push(entry);
    } else {
      files.push(entry);
    }
  }

  directories.sort();
  files.sort();

  return {
    directories,
    files
  };
}
