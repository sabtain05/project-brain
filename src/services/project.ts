import { join } from "node:path";
import { fileExists, readJsonFile } from "../utils/system.js";

export interface ProjectInfo {
  name: string;
  version: string;
  packageManager: string;
  language: string;
  framework: string;
  frameworkVersion: string;
  buildTool: string;
  buildToolVersion: string;
  dependencyCount: number;
  devDependencyCount: number;
  totalDependencyCount: number;
  scripts: string[];
  git: boolean;
  readme: boolean;
  license: boolean;
}

interface PackageJson {
  name?: string;
  version?: string;

  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;

  scripts?: Record<string, string>;

  engines?: {
    node?: string;
  };

  workspaces?: string[];
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

function detectFrameworkVersion(pkg: PackageJson): string {
    const deps = {
        ...(pkg.dependencies ?? {}),
        ...(pkg.devDependencies ?? {})
  };

  const frameworks = [
    "next",
    "react",
    "vue",
    "@angular/core",
    "express",
    "@nestjs/core",
    "svelte",

  ];

  for (const framework of frameworks) {
    if (framework in deps) {
      return deps[framework];
    }
  }

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

function detectBuildToolVersion(pkg: PackageJson): string {
  const deps = {
    ...(pkg.dependencies ?? {}),
    ...(pkg.devDependencies ?? {})
  };

  const buildTools = [
    "vite",
    "webpack",
    "rollup",
    "parcel",
    "@rspack/core",
    "turbopack"
  ];

  for (const tool of buildTools) {
    if (tool in deps) {
      return deps[tool];
    }
  }

  return "Unknown";
}

function getDependencyStatistics(pkg: PackageJson) {
  const dependencies = pkg.dependencies ?? {};
  const devDependencies = pkg.devDependencies ?? {};

  const dependencyCount = Object.keys(dependencies).length;
  const devDependencyCount = Object.keys(devDependencies).length;

  return {
    dependencyCount,
    devDependencyCount,
    totalDependencyCount:
      dependencyCount + devDependencyCount
  };
}

function getScripts(pkg: PackageJson): string[] {
  return Object.keys(pkg.scripts ?? {});
}

function detectGit(projectPath: string): boolean {
  return fileExists(join(projectPath, ".git"));
}

function detectReadme(projectPath: string): boolean {
  return (
    fileExists(join(projectPath, "README.md")) ||
    fileExists(join(projectPath, "README.MD")) ||
    fileExists(join(projectPath, "readme.md")) ||
    fileExists(join(projectPath, "readme.MD")) ||
    fileExists(join(projectPath, "Readme.md")) ||
    fileExists(join(projectPath, "Readme.MD"))
  );
}

function detectLicense(projectPath: string): boolean {
  return (
    fileExists(join(projectPath, "LICENSE")) ||
    fileExists(join(projectPath, "LICENSE.md")) ||
    fileExists(join(projectPath, "LICENSE.txt")) ||
    fileExists(join(projectPath, "license")) ||
    fileExists(join(projectPath, "license.md")) ||
    fileExists(join(projectPath, "license.txt")) ||
    fileExists(join(projectPath, "License")) ||
    fileExists(join(projectPath, "License.md")) ||
    fileExists(join(projectPath, "License.txt"))
  );
}

export function analyzeProject(): ProjectInfo {
  const projectPath = process.cwd();
  const packageJsonPath = join(projectPath, "package.json");

  if (!fileExists(packageJsonPath)) {
    throw new Error("No package.json found in the current directory.");
  }

  const pkg = readJsonFile<PackageJson>(packageJsonPath);
  const dependencyStats = getDependencyStatistics(pkg);
  const scripts = getScripts(pkg);


  return {
    name: pkg.name ?? "Unknown",
    version: pkg.version ?? "Unknown",
    packageManager: detectPackageManager(projectPath),
    language: detectLanguage(projectPath),
    framework: detectFramework(pkg),
    frameworkVersion: detectFrameworkVersion(pkg),
    buildTool: detectBuildTool(pkg),
    buildToolVersion: detectBuildToolVersion(pkg),
    dependencyCount: dependencyStats.dependencyCount,
    devDependencyCount: dependencyStats.devDependencyCount,
    totalDependencyCount: dependencyStats.totalDependencyCount,
    scripts: scripts,
    git: detectGit(projectPath),
    readme: detectReadme(projectPath),
    license: detectLicense(projectPath)
  };
}