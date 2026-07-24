import { readdirSync, readFileSync, statSync } from "fs";
import { join, extname } from "path"; 


export interface ModuleInfo {
    file: string;
    import: string[];
}


export interface ArchitectureAnalysis {
    modules: ModuleInfo[];

    totalModules: number;

    totalImports: number;
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