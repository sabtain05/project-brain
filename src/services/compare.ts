import { analyzeProject } from "./project.js";

export interface Comparison {

    left:any;

    right:any;

}



export function compareProjects(

    current:string,

    target:string

):Comparison{

    const left=analyzeProject(current);

    const right=analyzeProject(target);

    return{

        left,

        right

    };

}