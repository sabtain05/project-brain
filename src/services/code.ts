import { readdirSync, readFileSync, statSync } from "fs";
import { basename, extname, join } from "path";

const DEFAULT_IGNORED_DIRECTORIES = [
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

  todos: {
    todo: number;
    fixme: number;
    hack: number;
    note: number;
  };

  duplicateFiles: Record<string, string[]>;

  recentFiles: {
    path: string;
    modified: number;
  }[];
}

export function analyzeCode(projectPath: string, options: { ignore?: string[] } = {}): CodeAnalysis {
  const extensions: Record<string, number> = {};
  const largestFiles: { path: string; lines: number }[] = [];
  const ignored = new Set([
    ...DEFAULT_IGNORED_DIRECTORIES,
    ...(options.ignore ?? [])
  ]);

  let emptyFiles = 0;

  const todos = {
    todo: 0,
    fixme: 0,
    hack: 0,
    note: 0
  };

  const duplicateMap = new Map<string, string[]>();

  const recentFiles: {
    path: string;
    modified: number;
  }[] = [];

  scan(projectPath);

  largestFiles.sort((a, b) => b.lines - a.lines);

  recentFiles.sort((a, b) => b.modified - a.modified);

  const duplicateFiles: Record<string, string[]> = {};

  for (const [name, files] of duplicateMap) {
    if (files.length > 1) {
      duplicateFiles[name] = files;
    }
  }

  return {
    extensions,
    largestFiles: largestFiles.slice(0, 5),
    emptyFiles,
    todos,
    duplicateFiles,
    recentFiles: recentFiles.slice(0, 5)
  };

  function scan(dir: string) {
    for (const entry of readdirSync(dir)) {
      if (ignored.has(entry)) continue;

      const fullPath = join(dir, entry);

      const stats = statSync(fullPath);

      if (stats.isDirectory()) {
        scan(fullPath);
        continue;
      }

      const extension = extname(entry).toLowerCase() || "none";

      extensions[extension] = (extensions[extension] || 0) + 1;

      const fileName = basename(fullPath);

      if (!duplicateMap.has(fileName)) {
        duplicateMap.set(fileName, []);
      }

      duplicateMap.get(fileName)!.push(fullPath);

      recentFiles.push({
        path: basename(fullPath),
        modified: stats.mtimeMs
      });
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

        const lower = content.toLowerCase();

        todos.todo += (lower.match(/todo/g) || []).length;
        todos.fixme += (lower.match(/fixme/g) || []).length;
        todos.hack += (lower.match(/hack/g) || []).length;
        todos.note += (lower.match(/note/g) || []).length;

        if (content.trim() === "") {
          emptyFiles++;
        }

        const lines = content.split(/\r?\n/).length;

        largestFiles.push({
          path: fileName,
          lines
        });
      }
    }
  }
}