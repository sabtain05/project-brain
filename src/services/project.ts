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

export function analyzeProject(): ProjectInfo {
  const packageJsonPath = join(process.cwd(), "package.json");

  if (!fileExists(packageJsonPath)) {
    throw new Error("No package.json found in the current directory.");
  }

  const pkg = readJsonFile<PackageJson>(packageJsonPath);

  return {
    name: pkg.name ?? "Unknown",
    version: pkg.version ?? "Unknown",
    packageManager: "npm",
    language: "TypeScript"
  };
}