import { existsSync, readdirSync, readFileSync, statSync } from "fs";
import { join } from "path";


export interface SecurityAnalysis {
    envFiles: string[];
    dangerousFiles: string[];
    secrets: string[];
}


const ENV_FILES = [
    ".env",
    ".env.local",
    ".env.development",
    ".env.production",
    ".env.test"
];


const DANGEROUS_FILES = [
    "id_rsa",
    "id_dsa",
    ".npmrc",
    ".htpasswd"
];


function scanDirectory(dir: string, result: string[]){
    for(const entry of readdirSync(dir)){
        if(["node_modules", "git", "dist"].includes(entry))
            continue;
        
        const full = join (dir, entry);

        const stats = statSync(full);

        if(stats.isDirectory()){
            scanDirectory(full, result);

            continue;
        }

        result.push(full);
    }
}