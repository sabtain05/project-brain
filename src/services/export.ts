import { mkdirSync, writeFileSync, existsSync } from "fs";
import { join } from "path";


export interface ExportOptions {
    output: string;
}



function ensureDirectory(path: string) {
    if (!existsSync(path)) {
        mkdirSync(path, { recursive: true });
    }
}

function timestamp() {
  return new Date().toISOString().replace(/[:.]/g, "-");
}



export function exportJson(
  data: unknown,
  options: ExportOptions
): string {

  ensureDirectory(options.output);

  const file = join(
    options.output,
    `quicklyzer-${timestamp()}.json`
  );

  writeFileSync(
    file,
    JSON.stringify(data, null, 2),
    "utf8"
  );

  return file;
}