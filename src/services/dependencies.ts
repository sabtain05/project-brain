import { readFileSync, existsSync, readdirSync, statSync } from "fs";
import { join } from "path";

export interface DependencyAnalysis {
  production: number;
  development: number;
  total: number;

  installed: number;

  unused: string[];
  missing: string[];

  duplicateVersions: string[];

  packageInsights: {
    private: boolean;
    workspaces: boolean;
    packageManager: string;
  };
}

export function analyzeDependencies(
  projectPath: string,
  packageJson: any
): DependencyAnalysis {

  const dependencies = packageJson.dependencies ?? {};
  const devDependencies = packageJson.devDependencies ?? {};

  return {
    production: Object.keys(dependencies).length,
    development: Object.keys(devDependencies).length,
    total:
      Object.keys(dependencies).length +
      Object.keys(devDependencies).length,

    installed: 0,

    unused: [],

    missing: [],

    duplicateVersions: [],

    packageInsights: {
      private: packageJson.private === true,
      workspaces: !!packageJson.workspaces,
      packageManager:
        packageJson.packageManager ?? "Unknown"
    }
  };

}