import { execSync } from "child_process";



export interface GitAnalysis {
    available: boolean;
    branch: string;
    remote: string;
    lastCommit: string;
    localBranches: number;
    tags: number;
    modifiedFiles: number;
    staggedFiles: number;
    untrackedFiles: number;
    ahead: number;
    behind: number;
    health: {
        score: number;
        rating: string;
    };
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


function countLines(text: string){
    if (!text)
        return 0;

    return text
       .split("\n")
       .filter(Boolean)
       .length;
}


export function analyzeGit(projectPath: string): GitAnalysis{
    const branch = run(
        "git rev-parse --abbrev-ref HEAD",
        projectPath
    );

    const currentBranch = branch === "HEAD" ? "Detached HEAD": branch;

    const branches = run(
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

    const modified = run(
        "git diff --name-only",
        projectPath
    );

    const stagged = run(
        "git diff --cached --name-only",
        projectPath
    );

    

    return{
        available: branch!==""||remote!=="",
        branch: currentBranch,
        remote,
        lastCommit,
        localBranches: branches? branches.split("\n").length:0,
        tags: tags? tags.split("\n").length:0
    };
}