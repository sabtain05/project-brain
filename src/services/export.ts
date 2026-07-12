import { mkdirSync, writeFileSync, existsSync } from "fs";
import { join, basename } from "path";


export interface ExportOptions {
    output: string;
    filename?: string;
}



function ensureDirectory(path: string) {
    if (!existsSync(path)) {
        mkdirSync(path, { recursive: true });
    }
}

function timestamp() {
  return new Date().toISOString().replace(/[:.]/g, "-");
}

function resolveFileName(
    options: ExportOptions,
    extension: string
) {
    return options.filename
        ? `${options.filename}.${extension}`
        : `quicklyzer-${timestamp()}.${extension}`;
}

export function exportJson(
  data: unknown,
  options: ExportOptions
): string {

  ensureDirectory(options.output);

  const file = join(
    options.output,
    resolveFileName(options, "json")
  );

  writeFileSync(
    file,
    JSON.stringify(data, null, 2),
    "utf8"
  );

  return file;
}



export function exportMarkdown(
  project: any,
  options: ExportOptions
): string {

  ensureDirectory(options.output);

  const file = join(
    options.output,
    resolveFileName(options, "md")
  );

  const markdown = `# Quicklyzer Report

## Project

- Name: ${project.name}
- Version: ${project.version}
- Type: ${project.projectType}

## Technology Stack

${project.technologyStack.map((t: string) => `- ${t}`).join("\n")}

## Project Score

${project.projectScore.score}/100 (${project.projectScore.rating})
`;

  writeFileSync(file, markdown);

  return file;
}


export function exportHtml(
  project: any,
  options: ExportOptions
): string {

  ensureDirectory(options.output);

  const file = join(
    options.output,
    resolveFileName(options, "html")
  );

  const html = `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Quicklyzer Report</title>
<style>
body{
font-family:Arial;
padding:40px;
}
table{
border-collapse:collapse;
}
td,th{
border:1px solid #ccc;
padding:8px;
}
</style>
</head>

<body>

<h1>Quicklyzer Report</h1>

<table>

<tr>
<th>Name</th>
<td>${project.name}</td>
</tr>

<tr>
<th>Version</th>
<td>${project.version}</td>
</tr>

<tr>
<th>Type</th>
<td>${project.projectType}</td>
</tr>

<tr>
<th>Score</th>
<td>${project.projectScore.score}/100</td>
</tr>

</table>

<h2>Technology Stack</h2>

<ul>

${project.technologyStack
.map((t: string) => `<li>${t}</li>`)
.join("")}

</ul>

</body>

</html>
`;

  writeFileSync(file, html);

  return file;
}



export function exportManifest(
    files: string[],
    options: ExportOptions
) {

    const manifest = {
        generatedAt: new Date().toISOString(),
        reports: files.map(file => basename(file))
    };

    const file = join(
        options.output,
        "manifest.json"
    );

    writeFileSync(
        file,
        JSON.stringify(manifest, null, 2)
    );

    return file;

}