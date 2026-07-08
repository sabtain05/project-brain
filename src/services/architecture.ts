import { readdirSync, statSync, existsSync } from "fs";
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

const ENTRY_POINTS = [
  "src/index.ts",
  "src/index.js",
  "src/main.ts",
  "src/main.js",
  "src/app.ts",
  "src/app.js",
  "index.ts",
  "index.js",
  "main.ts",
  "main.js",
  "app.ts",
  "app.js",
  "server.ts",
  "server.js"
];

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


export function detectEntryPoint(projectPath: string): string {
  for (const file of ENTRY_POINTS) {
    if (existsSync(join(projectPath, file))) {
      return file;
    }
  }

  return "Unknown";
}