import { execSync } from "child_process";



export interface GitAnalysis {
    available: boolean;
    branch: string;
    remote: string;
    lastCommit: string;
    localBranches: number;
    tags: number;
}


function run(command: string, path: string){
    try{

        return execSync(command,{
            cwd: path,
            encoding: "utf-8"
        }).trim();
    }catch{
        return " ";
    }
}