import { existsSync, readFileSync } from "node:fs";

export function fileExists(path: string): boolean {
  return existsSync(path);
}

export function readJsonFile<T>(path: string): T {
  const content = readFileSync(path, "utf-8");
  return JSON.parse(content) as T;
}