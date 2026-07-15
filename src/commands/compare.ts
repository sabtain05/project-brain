import { resolve } from "path";
import { Command } from "commander";

import { compareProjects } from "../services/compare.js";

export function compareCommand(){

    return new Command("compare")

    .argument("<path>")

    .description("Compare two projects")

    .action((path)=>{

        const targetPath = resolve(process.cwd(), path);

        const result = compareProjects(
            process.cwd(),
            targetPath
        );

        console.log();

        console.log("Comparison");

        console.log("────────────────────────────");

        console.log(
`Current : ${result.left.name}`
);

        console.log(
`Target  : ${result.right.name}`
);

        console.log();

    });

}