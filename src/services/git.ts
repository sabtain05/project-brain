import { execSync } from "child_process";
import { readFileSync } from "fs";
import { join } from "path";



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
    
    status: "Clean"|"Dirty";

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
    }catch (error) {
        console.error(`Git command failed: ${command}`);
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


    const upstreamStatus = run(
        "git rev-list --left-right --count @{upstream}...HEAD",
        projectPath
    );

    let ahead = 0;
    let behind = 0;

    if(upstreamStatus){
        const parts = upstreamStatus.split(/\s+/);
        behind = Number(parts[0]);
        ahead = Number(parts[1]);
    }
    
    const status = countLines(modified) === 0 && countLines(staged) === 0 && countLines(untracked) === 0 ? "Clean" : "Dirty";


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
        "git log --pretty=format:%H%x09%s -5",
        projectPath
    );

    const contributors = run(
        'git log --format="%an"',
        projectPath
    );

    const recentTags = run(
        "git tag --sort=-creatordate",
        projectPath
    );

    const gitignorePath = join(projectPath, ".gitignore");
    const gitignoreExists = existsSync(gitignorePath);
    let gitignoreRules = 0;

    if (gitignoreExists) {
        const content = readFileSync(gitignorePath, "utf-8");

        gitignoreRules = content 
            .split("\n")
            .map(line => line.trim())
            .filter(line => line && !line.startsWith("#")).length;
    }


    const recentCommitList = commits ? commits.split("\n").map(line=>{
        const [hash, message] = line.split("\t");

        return{
            hash: hash.slice(0,7),
            message
        };
    }):[];


    const contributorMap = new Map<string, number>();
    if (contributors) {
        for (const name of contributors.split("\n")) {
            const author = name.trim();
            if (!author) continue;

            contributorMap.set(author, (contributorMap.get(author) ?? 0) + 1);
        }
    }

    
    const contributorList = [...contributorMap.entries()].map(([name, commits]) => ({
        name, commits
    })).sort((a,b) => b.commits - a.commits);


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
        status,
        recentCommits: recentCommitList,
        contributors: contributorList,
        recentTags: recentTags ? recentTags.split("\n").slice(0,5):[],
        gitignore:{
            exists: gitignoreExists,
            rules: gitignoreRules
        }

        recommendations: buildRecommendations(
            countLines(modified),
            countLines(staged),
            countLines(untracked),
            remote!==""
        )
    };
}
