import { readFileSync, existsSync, readdirSync, statSync } from "fs";
import { join } from "path";

export interface DependencyAnalysis {

  production:number;
  development:number;
  total:number;

  installed:number;
  installedSize:string;

  largestPackages:{
      name:string;
      size:number;
  }[];

  unused:string[];
  missing:string[];
  duplicateVersions:string[];

  riskScore:{
      score:number;
      rating:string;
  };

  packageInsights:{
      private:boolean;
      workspaces:boolean;
      packageManager:string;
  };

}

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

function directorySize(path: string): number {
  let total = 0;

  for (const entry of readdirSync(path)) {
    const full = join(path, entry);
    const stats = statSync(full);

    if (stats.isDirectory()) {
      total += directorySize(full);
    } else {
      total += stats.size;
    }
  }

  return total;
}

function collectImports(projectPath: string): Set<string> {
  const imports = new Set<string>();

  scan(projectPath);

  return imports;

  function scan(dir: string) {
    for (const entry of readdirSync(dir)) {
      if (
        [
          "node_modules",
          ".git",
          "dist",
          "coverage",
          ".next",
          "build",
          "out"
        ].includes(entry)
      ) {
        continue;
      }

      const full = join(dir, entry);
      const stats = statSync(full);

      if (stats.isDirectory()) {
        scan(full);
        continue;
      }

      if (!/\.(ts|tsx|js|jsx)$/.test(entry)) {
        continue;
      }

      const content = readFileSync(full, "utf8");

      const importRegex = /from\s+['"]([^'"]+)['"]/g;
      const requireRegex = /require\(['"]([^'"]+)['"]\)/g;

      let match: RegExpExecArray | null;

      while ((match = importRegex.exec(content))) {
        const pkg = normalizePackage(match[1]);

        if (pkg) {
          imports.add(pkg);
        }
      }

      while ((match = requireRegex.exec(content))) {
        const pkg = normalizePackage(match[1]);

        if (pkg) {
          imports.add(pkg);
        }
      }
    }
  }
}

function normalizePackage(value: string): string | null {
  if (value.startsWith(".")) {
    return null;
  }

  if (value.startsWith("@")) {
    const parts = value.split("/");
    return parts.length >= 2 ? `${parts[0]}/${parts[1]}` : value;
  }

  return value.split("/")[0];
}

function calculateRiskScore(
    unused:number,
    missing:number,
    duplicates:number
){

    let score=100;

    score-=unused*2;
    score-=missing*5;
    score-=duplicates*3;

    if(score<0)
        score=0;

    let rating="Excellent";

    if(score<90)
        rating="Good";

    if(score<75)
        rating="Fair";

    if(score<60)
        rating="Poor";

    return{
        score,
        rating
    };

}


export function analyzeDependencies(
  projectPath: string,
  packageJson: any
): DependencyAnalysis {
  const dependencies = packageJson.dependencies ?? {};
  const devDependencies = packageJson.devDependencies ?? {};

  const nodeModules = join(projectPath, "node_modules");

  let installed = 0;
  let installedBytes = 0;

  const largestPackages: {
    name: string;
    size: number;
  }[] = [];

  if (existsSync(nodeModules)) {
    for (const entry of readdirSync(nodeModules)) {
      if (entry.startsWith(".")) continue;

      const full = join(nodeModules, entry);

      if (!statSync(full).isDirectory()) continue;

      installed++;

      const size = directorySize(full);

      installedBytes += size;

      largestPackages.push({
        name: entry,
        size
      });
    }
  }

  largestPackages.sort((a, b) => b.size - a.size);

  const imports = collectImports(projectPath);

  const declared = [
    ...Object.keys(dependencies),
    ...Object.keys(devDependencies)
  ];

  const unused = declared.filter(pkg => !imports.has(pkg));

  const missing = [...imports].filter(pkg => !declared.includes(pkg));
    
  const versionMap=new Map<string,string[]>();
  for(const [name,version] of Object.entries(dependencies)){

    if(!versionMap.has(String(version))){
        versionMap.set(String(version),[]);
    }

    versionMap.get(String(version))!.push(name);

}

for(const [name,version] of Object.entries(devDependencies)){

    if(!versionMap.has(String(version))){
        versionMap.set(String(version),[]);
    }

    versionMap.get(String(version))!.push(name);

}

  const duplicateVersions:string[]=[];

for(const [version,packages] of versionMap){

    if(packages.length>1){

        duplicateVersions.push(
            `${version} → ${packages.join(", ")}`
        );

    }

}

  const riskScore=calculateRiskScore(unused.length,missing.length,duplicateVersions.length);

  return {
    production: Object.keys(dependencies).length,
    development: Object.keys(devDependencies).length,
    total:
      Object.keys(dependencies).length +
      Object.keys(devDependencies).length,

    installed,
    installedSize: formatBytes(installedBytes),

    largestPackages: largestPackages.slice(0, 5),

    unused,
    missing,

    duplicateVersions,
    riskScore,

    packageInsights: {
      private: packageJson.private === true,
      workspaces: !!packageJson.workspaces,
      packageManager: packageJson.packageManager ?? "Unknown"
    }
  };
}