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