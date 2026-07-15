import { Command } from "commander";

import { compareProjects } from "../services/compare.js";

export function compareCommand(){

    return new Command("compare")

    .argument("<path>")

    .description("Compare two projects")

    .action((path)=>{

        const result=

        compareProjects(

            process.cwd(),

            path

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