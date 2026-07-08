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

function countFiles(
  directory: string,
  projectPath: string
): {
  totalFiles: number;
  sourceFiles: number;
  directories: number;
  largestDirectory: DirectoryStats;
  linesOfCode: number;
  largestFile: FileStats;
  emptyDirectories: number;
  hiddenFiles: number;
} {
  let totalFiles = 0;
  let sourceFiles = 0;
  let directories = 0;
  let emptyDirectories = 0;
  let hiddenFiles = 0;

  let largestDirectory: DirectoryStats = {
    path: "",
    fileCount: 0
  };

  let filesInCurrentDirectory = 0;

  let linesOfCode = 0;

  let largestFile: FileStats = {
    path: "",
    lines: 0
  };

  const entries = readdirSync(directory);

  for (const entry of entries) {
    const fullPath = join(directory, entry);
    const stats = statSync(fullPath);

    if (stats.isDirectory()) {
      if (IGNORED_DIRECTORIES.includes(entry)) {
        continue;
      }

      directories++;

      const childEntries = readdirSync(fullPath);

      const visibleEntries = childEntries.filter(
        item => !IGNORED_DIRECTORIES.includes(item)
      );

      if (visibleEntries.length === 0) {
        emptyDirectories++;
      }

      const child = countFiles(fullPath, projectPath);

      totalFiles += child.totalFiles;
      sourceFiles += child.sourceFiles;
      directories += child.directories;
      linesOfCode += child.linesOfCode;
      emptyDirectories += child.emptyDirectories;
      hiddenFiles += child.hiddenFiles;

      if (
        child.largestDirectory.fileCount >
        largestDirectory.fileCount
      ) {
        largestDirectory = child.largestDirectory;
      }

      if (
        child.largestFile.lines >
        largestFile.lines
      ) {
        largestFile = child.largestFile;
      }

    } else {
      totalFiles++;
      filesInCurrentDirectory++;
      if (entry.startsWith(".")) {
        hiddenFiles++;
}

      if (
        SOURCE_EXTENSIONS.some(extension =>
          entry.endsWith(extension)
        )
      ) {
        sourceFiles++;

        const content = readFileSync(fullPath, "utf8");

        const lineCount = content
          .split(/\r?\n/)
          .filter(line => line.trim() !== "").length;

        linesOfCode += lineCount;

        if (lineCount > largestFile.lines) {
          largestFile = {
            path: fullPath,
            lines: lineCount
          };
        }
      }
    }
  }

  if (
    directory !== projectPath &&
    filesInCurrentDirectory > largestDirectory.fileCount
  ) {
    largestDirectory = {
      path: directory,
      fileCount: filesInCurrentDirectory
    };
  }

  return {
    totalFiles,
    sourceFiles,
    directories,
    largestDirectory,
    linesOfCode,
    largestFile,
    emptyDirectories,
    hiddenFiles
  };
}

export function getProjectStatistics(projectPath: string) {
  const stats = countFiles(projectPath, projectPath);

  return {
    totalFiles: stats.totalFiles,
    sourceFiles: stats.sourceFiles,
    directories: stats.directories,
    largestDirectory: stats.largestDirectory,
    linesOfCode: stats.linesOfCode,
    largestFile: stats.largestFile,
    emptyDirectories: stats.emptyDirectories,
    hiddenFiles: stats.hiddenFiles,
  };
}