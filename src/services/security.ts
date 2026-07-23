import { existsSync, readdirSync, readFileSync, statSync } from "fs";
import { join } from "path";


export interface SecurityAnalysis {
    envFiles: string[];
    dangerousFiles: string[];
    secrets: string[];
    sensitiveFiles: string[];
    score: {
        score: number;
        rating: string;
    };

    recommendation: string;
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


function calculateSecurityScore(
    envFiles: number,
    dangerousFiles: number,
    secrets: number,
    sensitiveFiles: number,
){
    let score = 100;

    score-=envFiles*5;
    score-=dangerousFiles*10;
    score-=secrets*20;
    score-=sensitiveFiles*10;

    if(score<0)
        score=0;

    let rating = "Excellent";

    if(score<90)
        rating = "Good";

    if(score<75)
        rating = "Fair";

    if(score<50)
        rating = "Poor";

    return{
        score,
        rating
    };
}


function buildRecommendations(
    analysis:{
        envFiles: number;
        dangerousFiles: number;
        secrets: number;
        sensitiveFiles: number;
    }
){
    const recommendations: string[] = [];

    if(analysis.envFiles>0)
        recommendations.push("Ensure environment files are excluded from version control.");

    if(analysis.dangerousFiles>0)
        recommendations.push("Remove sensitive credential files from the project.");

    if(analysis.secrets>0)
        recommendations.push("Rotate exposed secrets immediately.");

    if(analysis.sensitiveFiles>0)
        recommendations.push("Review sensitive files before publishing.");


    return recommendations;
}



export function analyzeSecurity(projectPath: string): SecurityAnalysis{
    const files: string[] = [];
    scanDirectory(projectPath, files);
    const envFiles: string[] = [];
    const dangerousFiles: string[] = [];
    const secrets: string[] = [];
    const sensitiveFiles: string[] = [];

    for (const file of files) {
        const name = file.split(/[\\/]/).pop()!;

        if (ENV_FILES.includes(name))
            envFiles.push(file);

        if (DANGEROUS_FILES.includes(name))
            dangerousFiles.push(file);

        try{
            const content = readFileSync(file, "utf8");
            secrets.push(...detectSecrets(content));
        }catch{}
    }

    return{
        envFiles,
        dangerousFiles,
        secrets
    };
}