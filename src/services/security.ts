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


function detectSecrets(content: string){
    const findings: string[] = [];
    
    const patterns = [
        /AKIA[0-9A-Z]{16}/g,
        /AIza[0-9A-Za-z\-_]{35}/g,
        /ghp_[A-Za-z0-9]{36}/g
    ];

    for(const pattern of patterns){
        if(pattern.test(content))
            findings.push(pattern.source);
    }

    return findings;
}



export function analyzeSecurity(projectPath: string): SecurityAnalysis{
    const files: string[] = [];
    scanDirectory(projectPath, files);
    const envFiles: string[] = [];
    const dangerousFiles: string[] = [];
    const secrets: string[] = [];

    for (const file of files) {
        const name = file.split(/[\\/]/).pop()!;

        if (ENV_FILES.includes(name))
            envFiles.push(file);

        if (DANGEROUS_FILES.includes(name))
            dangerousFiles.push(file);

        try{
            const content = readFileSync(file, "utf8");
            detectSecrets.push(...detectSecrets(content));
        }catch{}
    }

    return{
        envFiles,
        dangerousFiles,
        secrets
    };
}