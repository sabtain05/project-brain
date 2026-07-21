import { execSync } from "child_process";



export interface GitAnalysis {
    available: boolean;
    branch: string;
    remote: string;
    lastCommit: string;
    localBranches: number;
    tags: number;
    modifiedFiles: number;
    stagedFiles: number;
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

    const staged = run(
        "git diff --cached --name-only",
        projectPath
    );

    const untracked = run(
        "git ls-files --others --exclude-standard",
        projectPath
    );


    const status = run (
        "git rev-list --left-right --count @{upstream}...HEAD",
        projectPath
    );

    let ahead = 0;
    let behind = 0;

    if(status){
        const parts = status.split(/\s+/);
        behind = Number(parts[0]);
        ahead=Number(parts[1]);
    }

    
    let score = 100;
    score-=countLines(modified);
    score-=countLines(staged);
    score-=countLines(untracked);

    if(score<0)
        score = 0;

    let rating = "Excellent";

    if(score<90)
        rating = "Good";

    if(score<75)
        rating = "Fair";

    if(score<50)
        rating = "Poor"


    return{
        available: branch!==""||remote!=="",
        branch: currentBranch,
        remote,
        lastCommit,
        localBranches: branches? branches.split("\n").length:0,
        tags: tags? tags.split("\n").length:0,
        modifiedFiles: countLines(modified),
        staggedFiles: countLines(staged),

    };
}