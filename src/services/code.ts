import { readdirSync, readFileSync, statSync } from "fs";
import { extname, join, basename } from "path";

const IGNORED = [
  "node_modules",
  ".git",
  "dist",
  "coverage",
  ".next",
  "build",
  "out"
];

export interface CodeAnalysis {
  extensions: Record<string, number>;
  largestFiles: {
    path: string;
    lines: number;
  }[];
  emptyFiles: number;
}

export function analyzeCode(projectPath: string): CodeAnalysis {
  const extensions: Record<string, number> = {};
  const largestFiles: { path: string; lines: number }[] = [];
  let emptyFiles = 0;

  scan(projectPath);

  largestFiles.sort((a, b) => b.lines - a.lines);

  return {
    extensions,
    largestFiles: largestFiles.slice(0, 5),
    emptyFiles
  };

  function scan(dir: string) {
    for (const entry of readdirSync(dir)) {
      if (IGNORED.includes(entry)) continue;

      const fullPath = join(dir, entry);

      const stats = statSync(fullPath);

      if (stats.isDirectory()) {
        scan(fullPath);
        continue;
      }

      const extension = extname(entry).toLowerCase() || "none";

      extensions[extension] = (extensions[extension] || 0) + 1;

      if (
        [
          ".ts",
          ".tsx",
          ".js",
          ".jsx",
          ".json",
          ".css",
          ".scss",
          ".html",
          ".md"
        ].includes(extension)
      ) {
        const content = readFileSync(fullPath, "utf8");

        if (content.trim() === "") {
          emptyFiles++;
        }

        const lines = content.split(/\r?\n/).length;

        largestFiles.push({
          path: basename(fullPath),
          lines
        });
      }
    }
  }
}