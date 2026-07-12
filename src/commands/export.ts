import { Command } from "commander";
import { analyzeProject } from "../services/project.js";
import {
  exportJson,
  exportMarkdown,
  exportHtml
} from "../services/export.js";

export function exportCommand() {

  return new Command("export")

    .description("Export project report")

    .option("-f, --format <format>", "json|md|html", "json")

    .option("-o, --output <dir>", "Output directory", "reports")

    .action((options) => {

      const project = analyzeProject();

      let file = "";

      switch (options.format) {

        case "md":
          file = exportMarkdown(project, {
            output: options.output
          });
          break;

        case "html":
          file = exportHtml(project, {
            output: options.output
          });
          break;

        default:
          file = exportJson(project, {
            output: options.output
          });

      }

      console.log();

      console.log("Export Complete");
      console.log("────────────────────────────");

      console.log(`Format : ${options.format}`);
      console.log(`Output : ${file}`);

      console.log();

    });

}