import { join } from "node:path";
import { fileExists, readJsonFile } from "../utils/system.js";

export interface ProjectInfo {
  name: string;
  version: string;
  packageManager: string;
  language: string;
}

interface PackageJson {
  name?: string;
  version?: string;
}

function detectPackageManager(projectPath: string): string {
  if (fileExists(join(projectPath, "package-lock.json"))) {
    return "npm";
  }

  if (fileExists(join(projectPath, "pnpm-lock.yaml"))) {
    return "pnpm";
  }

  if (fileExists(join(projectPath, "yarn.lock"))) {
    return "yarn";
  }

  if (fileExists(join(projectPath, "bun.lockb"))) {
    return "bun";
  }

  return "Unknown";
}

function detectLanguage(projectPath: string): string {
  if (fileExists(join(projectPath, "tsconfig.json"))) {
    return "TypeScript";
  }

  if (fileExists(join(projectPath, "jsconfig.json"))) {
    return "JavaScript";
  }

  return "Unknown";
}

export function analyzeProject(): ProjectInfo {
  const projectPath = process.cwd();
  const packageJsonPath = join(projectPath, "package.json");

  if (!fileExists(packageJsonPath)) {
    throw new Error("No package.json found in the current directory.");
  }

  const pkg = readJsonFile<PackageJson>(packageJsonPath);

  return {
    name: pkg.name ?? "Unknown",
    version: pkg.version ?? "Unknown",
    packageManager: detectPackageManager(projectPath),
    language: detectLanguage(projectPath)
  };
}