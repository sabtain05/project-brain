import { readdirSync, statSync } from "fs";
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

function countFiles(
  directory: string,
  projectPath: string
): {
  totalFiles: number;
  sourceFiles: number;
  directories: number;
  largestDirectory: DirectoryStats;
} {
  let totalFiles = 0;
  let sourceFiles = 0;
  let directories = 0;

  let largestDirectory: DirectoryStats = {
    path: "",
    fileCount: 0
  };

  let filesInCurrentDirectory = 0;

  const entries = readdirSync(directory);

  for (const entry of entries) {
    const fullPath = join(directory, entry);
    const stats = statSync(fullPath);

    if (stats.isDirectory()) {
      if (IGNORED_DIRECTORIES.includes(entry)) {
        continue;
      }

      directories++;

      const child = countFiles(fullPath, projectPath);

      totalFiles += child.totalFiles;
      sourceFiles += child.sourceFiles;
      directories += child.directories;

      if (
        child.largestDirectory.fileCount >
        largestDirectory.fileCount
      ) {
        largestDirectory = child.largestDirectory;
      }
    } else {
      totalFiles++;
      filesInCurrentDirectory++;

      if (
        SOURCE_EXTENSIONS.some((extension) =>
          entry.endsWith(extension)
        )
      ) {
        sourceFiles++;
      }
    }
  }

  // Ignore the project root when selecting the largest directory
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
    largestDirectory
  };
}

export function getProjectStatistics(projectPath: string) {
  const stats = countFiles(projectPath, projectPath);

  return {
    totalFiles: stats.totalFiles,
    sourceFiles: stats.sourceFiles,
    directories: stats.directories,
    largestDirectory: stats.largestDirectory
  };
}