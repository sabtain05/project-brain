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

    recentCommits:{
        hash: string;
        message: string;
    }[];

    contributors:{
        name: string;
        commits: number;
    }[];

    recentTags: string[];
    gitignore:{
        exists: boolean;
        rules: number;
    };

    recommendations: string[];
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


function buildRecommendations(
    modified: number,
    staged: number,
    untracked: number,
    remote: boolean,
){
    const recommendations: string[]=[];

    if(modified>0)
        recommendations.push("Commit modified files.");

    if(staged>0)
        recommendations.push("Create a commit for staged changes.");

    if(untracked>0)
        recommendations.push("Review untracked files.");

    if(!remote)
        recommendations.push("Configure a remote repository.");

    return recommendations;


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


    const commits = run(
        "git log --pretty=format:%H|%s -5",
        projectPath
    );

    const contributors = run(
        "git shorting -sn HEAD",
        projectPath
    );

    const recentTags = run(
        "git tag --sort=-creatordate",
        projectPath
    );

    const gitignore = run(
        "git check-ignore .gitignore",
        projectPath
    );


    const recentCommitList = commits ? commits.split("\n").map(line=>{
        const [hash, message] = line.split("|");

        return{
            hash: hash.slice(0,7),
            message
        };
    }):[];


    const contributorList = contributors ? contributors.split("\n").map(line=>{
        const parts = line.trim().split(/\s+/);

        return{
            commits: Number(parts[0]),
            name: parts.slice(1).join("")
        };
    }):[];


    return{
        available: branch!==""||remote!=="",
        branch: currentBranch,
        remote,
        lastCommit,
        localBranches: branches? branches.split("\n").length:0,
        tags: tags? tags.split("\n").length:0,
        modifiedFiles: countLines(modified),
        stagedFiles: countLines(staged),
        untrackedFiles: countLines(untracked),
        ahead,
        behind,
        health: {
            score,
            rating
        },
        recentCommits: recentCommitList,
        contributors: contributorList,
        recentTags: recentTags ? recentTags.split("\n").slice(0,5):[],
        gitignore:{
            exists: gitignore!=="",
            rules:gitignore ? countLines(run(
                "Cat .gitignore",
                projectPath
                )
            )
            :0
        },

        recommendations: buildRecommendations(
            countLines(modified),
            countLines(staged),
            countLines(untracked),
            remote!==""
        )

    };
}