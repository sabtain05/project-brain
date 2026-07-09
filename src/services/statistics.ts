import { readdirSync, statSync, readFileSync } from "fs";
import { join } from "path";

const IGNORED_DIRECTORIES = [
  "node_modules",
  ".git",
  "dist",
  "coverage",
  ".next",
  ".nuxt",
  "build",
  "out"
];

const SOURCE_EXTENSIONS = [
  ".ts",
  ".tsx",
  ".js",
  ".jsx",
  ".mjs",
  ".cjs"
];

interface DirectoryStats {
  path: string;
  fileCount: number;
}

interface FileStats {
  path: string;
  lines: number;
}

interface Statistics {
  totalFiles: number;
  sourceFiles: number;
  directories: number;
  largestDirectories: DirectoryStats[];
  linesOfCode: number;
  largestFile: FileStats;
  emptyDirectories: number;
  hiddenFiles: number;
  projectSize: number;
}

export function getProjectStatistics(projectPath: string): Statistics {
  let totalFiles = 0;
  let sourceFiles = 0;
  let directories = 0;
  let emptyDirectories = 0;
  let hiddenFiles = 0;
  let projectSize = 0;
  let linesOfCode = 0;

  const directoryStats: DirectoryStats[] = [];

  let largestFile: FileStats = {
    path: "",
    lines: 0
  };

  scan(projectPath);

  directoryStats.sort((a, b) => b.fileCount - a.fileCount);

  return {
    totalFiles,
    sourceFiles,
    directories,
    largestDirectories: directoryStats.slice(0, 5),
    linesOfCode,
    largestFile,
    emptyDirectories,
    hiddenFiles,
    projectSize
  };

  function scan(directory: string) {
    const entries = readdirSync(directory);

    let filesInCurrentDirectory = 0;
    let visibleEntries = 0;

    for (const entry of entries) {
      if (IGNORED_DIRECTORIES.includes(entry)) continue;

      visibleEntries++;

      const fullPath = join(directory, entry);
      const stats = statSync(fullPath);

      if (stats.isDirectory()) {
        directories++;
        scan(fullPath);
        continue;
      }

      totalFiles++;
      filesInCurrentDirectory++;
      projectSize += stats.size;

      if (entry.startsWith(".")) {
        hiddenFiles++;
      }

      if (
        SOURCE_EXTENSIONS.some(ext => entry.endsWith(ext))
      ) {
        sourceFiles++;

        const content = readFileSync(fullPath, "utf8");
        const lineCount = content.split(/\r?\n/).length;

        linesOfCode += lineCount;

        if (lineCount > largestFile.lines) {
          largestFile = {
            path: fullPath,
            lines: lineCount
          };
        }
      }
    }

    if (visibleEntries === 0 && directory !== projectPath) {
      emptyDirectories++;
    }

    if (directory !== projectPath) {
      directoryStats.push({
        path: directory,
        fileCount: filesInCurrentDirectory
      });
    }
  }
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  if (bytes < 1024 * 1024 * 1024) {
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
}