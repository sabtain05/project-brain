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

  packageInsights:{
      private:boolean;
      workspaces:boolean;
      packageManager:string;
  };
}

function formatBytes(bytes:number){

    if(bytes<1024)
        return `${bytes} B`;

    if(bytes<1024*1024)
        return `${(bytes/1024).toFixed(1)} KB`;

    return `${(bytes/1024/1024).toFixed(1)} MB`;

}

function directorySize(path:string):number{

    let total=0;

    for(const entry of readdirSync(path)){

        const full=join(path,entry);

        const stats=statSync(full);

        if(stats.isDirectory())
            total+=directorySize(full);

        else
            total+=stats.size;

    }

    return total;

}

export function analyzeDependencies(
  projectPath: string,
  packageJson: any
): DependencyAnalysis {

  const dependencies = packageJson.dependencies ?? {};
  const devDependencies = packageJson.devDependencies ?? {};

  const nodeModules=join(projectPath,"node_modules");

let installed=0;

let installedBytes=0;

const largestPackages:{
    name:string;
    size:number;
}[]=[];

if(existsSync(nodeModules)){

    for(const entry of readdirSync(nodeModules)){

        if(entry.startsWith(".")) continue;

        const full=join(nodeModules,entry);

        if(!statSync(full).isDirectory()) continue;

        installed++;

        const size=directorySize(full);

        installedBytes+=size;

        largestPackages.push({
            name:entry,
            size
        });

    }

}
  return {
    production: Object.keys(dependencies).length,
    development: Object.keys(devDependencies).length,
    total:
      Object.keys(dependencies).length +
      Object.keys(devDependencies).length,

    installed: 0,
    installedSize: formatBytes(directorySize(nodeModules)),

    largestPackages: largestPackages,
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