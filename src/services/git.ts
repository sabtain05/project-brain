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
        return "";
    }
}


export function analyzeGit(projectPath: string): GitAnalysis{
    const branch=run(
        "git branch --show-content",
        projectPath
    );

    const branches= run(
        "git branch",
        projectPath
    );

    const remote = run(
        "git remote get-url origin",
        projectPath
    );

    const lastCommit = run(
        "git log -1 --pretty=%s",
        projectPath
    );

    const tags = run(
        "git tag",
        projectPath
    );

    return{
        available: branch!==""||remote!=="",
        branch,
        remote,
        lastCommit,
        localBranches: branches? branches.split("\n").length:0,
        tags: tags? tags.split("\n").length:0
    };
}