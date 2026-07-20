import { existsSync, readFileSync } from "fs";
import { join } from "path";

export interface DocumentationAnalysis {

    readme:boolean;

    changelog:boolean;

    contributing:boolean;

    codeOfConduct:boolean;

    security:boolean;

    license:boolean;

    readmeSections:string[];

}


function detectReadmeSections(content:string){

    const sections:string[]=[];

    const checks=[
        "installation",
        "usage",
        "features",
        "license",
        "contributing",
        "api",
        "configuration"
    ];

    const lower=content.toLowerCase();

    for(const section of checks){

        if(lower.includes(section))
            sections.push(section);

    }

    return sections;

}