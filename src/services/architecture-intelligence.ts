import { readdirSync, readFileSync, statSync } from "fs";
import Module from "module";
import { join, extname } from "path"; 


export interface ModuleInfo {
    file: string;
    imports: string[];
}


export interface ArchitectureAnalysis {
    modules: ModuleInfo[];

    totalModules: number;

    totalImports: number;

    circularDependencies: number;

    dependencyDepth: number;

    publicModules: number;

    deadModules: number;

    layers: string[];

    score:{
        score: number;
        rating: string;
    };
}


function walk(
    dir: string,
    files: string[]
){
    for(const entry of readdirSync(dir)){
        if([
            "node_modules",
            ".git",
            "dist"
        ].includes(entry))continue;

        const full = join(dir,entry);
        const stats = statSync(full);

        if(stats.isDirectory()){
            walk(full,files);
            continue;
        }

        if(extname(full)===".ts"){
            files.push(full);
        }
    }
}


function extractImports(content: string){
    const imports: string[] = [];
    const regex= /import\s+(?:[\s\S]*?)\s+from\s+["']([^"']+)["']/g;

    let match;
    while((match=regex.exec(content))){
        imports.push(match[1]);
    }

    return imports;
}


function detectLayers(modules: ModuleInfo[]){
    const layers = new Set<string>();

    for(const module of modules){
        const normalized = module.file.replace(/\\/g,"/");

        const parts = normalized.split("/");

        if(parts.length>=2){
            layers.add(parts[parts.length-2]);
        }
    }

    return [...layers];
}


function countCircularDependencies(modules: ModuleInfo[]){
    let count = 0;
    for(const module of modules){
        for(const imported of module.imports){
            const target = modules.find(m=>m.file.includes(imported));

            if(!target)
                continue;

            if(target.imports.some(i=>module.file.includes(i))){
                count++;
            }
        }
    }

    return count;
}


function detectPublicModules(modules: ModuleInfo[]){
    return modules.filter(m=>m.file.endsWith("index.ts")).length;
}


function detectDeadModules(modules: ModuleInfo[]){
    return modules.filter(module=> module.imports.length===0&&!module.file.endsWith("index.ts")).length;
}


function estimateDepth(modules:ModuleInfo[]){
    let depth = 0;
    for(const module of modules){
        if(module.imports.length>depth){
            depth = module.imports.length;
        }
    }

    return depth;
}



export function analyzeArchitecture(projectPath: string): ArchitectureAnalysis{
    const files: string[] = [];
    walk(projectPath, files);

    const modules: ModuleInfo[] = [];

    let totalImports = 0;
    for(const file of files){
        const imports =  extractImports(readFileSync(file,"utf8"));
        totalImports+=imports.length;

        modules.push({
            file,
         imports
        });
    }

    const circularDependencies = countCircularDependencies(modules);

    const dependencyDepth = estimateDepth(modules);

    const publicModules = detectPublicModules(modules);

    const deadModules = detectDeadModules(modules);

    const layers = detectLayers(modules);


    let architectureScore = 100;
    architectureScore-=circularDependencies*10;
    architectureScore-=deadModules*2;
    
    if(architectureScore<0){
        architectureScore=0;
    }

    

    return{
        modules,
        totalModules: modules.length,
        totalImports
    };
}