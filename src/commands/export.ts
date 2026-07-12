import { Command } from "commander";
import { analyzeProject } from "../services/project.js";
import {
  exportJson,
  exportMarkdown,
  exportHtml,
  exportManifest
} from "../services/export.js";

export function exportCommand() {

  return new Command("export")

    .description("Export project report")

    .option("-f, --format <format>", "json|md|html", "json")

    .option("-o, --output <dir>", "Output directory", "reports")
    .option(
    "--all",
    "Export every supported format"
)

.option(
    "--name <filename>",
    "Custom filename"
)
    .action((options) => {

    const project = analyzeProject();

    const exportOptions = {
        output: options.output,
        filename: options.name
    };

    const files: string[] = [];

    if (options.all) {

        files.push(
            exportJson(project, exportOptions)
        );

        files.push(
            exportMarkdown(project, exportOptions)
        );

        files.push(
            exportHtml(project, exportOptions)
        );

    } else {

        switch (options.format) {

            case "md":
                files.push(
                    exportMarkdown(project, exportOptions)
                );
                break;

            case "html":
                files.push(
                    exportHtml(project, exportOptions)
                );
                break;

            default:
                files.push(
                    exportJson(project, exportOptions)
                );

        }

    }

    exportManifest(files, exportOptions);

    console.log();

    console.log("Export Complete");
    console.log("────────────────────────────");

    console.log(`Reports Generated : ${files.length}`);

    for (const file of files) {
        console.log(file);
    }

    console.log();

});

}