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
]