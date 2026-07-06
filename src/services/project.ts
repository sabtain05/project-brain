import { join } from "node:path";
import { fileExists, readJsonFile } from "../utils/system.js";

export interface ProjectInfo {
  name: string;
  version: string;
  packageManager: string;
  language: string;
  framework: string;
  buildTool: string;
  git: boolean;
}

interface PackageJson {
  name?: string;
  version?: string;
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
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

function detectFramework(pkg: PackageJson): string {
  const deps = {
    ...(pkg.dependencies ?? {}),
    ...(pkg.devDependencies ?? {})
  };

  if ("next" in deps) return "Next.js";
  if ("react" in deps) return "React";
  if ("vue" in deps) return "Vue";
  if ("@angular/core" in deps) return "Angular";
  if ("express" in deps) return "Express";
  if ("@nestjs/core" in deps) return "NestJS";
  if ("svelte" in deps) return "Svelte";

  return "Unknown";
}

function detectBuildTool(pkg: PackageJson): string {
  const deps = {
    ...(pkg.dependencies ?? {}),
    ...(pkg.devDependencies ?? {})
  };

  if ("vite" in deps) return "Vite";
  if ("webpack" in deps) return "Webpack";
  if ("rollup" in deps) return "Rollup";
  if ("parcel" in deps) return "Parcel";
  if ("@rspack/core" in deps) return "Rspack";
  if ("turbopack" in deps) return "Turbopack";

  return "Unknown";
}

function detectGit(projectPath: string): boolean {
  return fileExists(join(projectPath, ".git"));
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
    language: detectLanguage(projectPath),
    framework: detectFramework(pkg),
    buildTool: detectBuildTool(pkg),
    git: detectGit(projectPath)
  };
}