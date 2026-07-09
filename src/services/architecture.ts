import { readdirSync, statSync, existsSync, readFileSync } from "fs";
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

export interface ProjectTree {
  directories: string[];
  files: string[];
}

const ENTRY_POINTS = [
  "src/index.ts",
  "src/index.tsx",
  "src/index.js",
  "src/index.jsx",

  "src/main.ts",
  "src/main.tsx",
  "src/main.js",
  "src/main.jsx",

  "src/app.ts",
  "src/app.tsx",
  "src/app.js",
  "src/app.jsx",

  "index.ts",
  "index.js",

  "main.ts",
  "main.js",

  "app.ts",
  "app.js",

  "server.ts",
  "server.js"
];


const CONFIG_FILES = [
  "tsconfig.json",

  "vite.config.ts",
  "vite.config.js",

  "webpack.config.js",
  "webpack.config.ts",

  "tailwind.config.js",
  "tailwind.config.ts",

  "eslint.config.js",
  "eslint.config.mjs",
  ".eslintrc",
  ".eslintrc.json",

  ".prettierrc",
  ".prettierrc.json",

  "vitest.config.ts",
  "vitest.config.js",

  "jest.config.js",
  "jest.config.ts",

  "Dockerfile",
  "docker-compose.yml",

  ".gitignore"
];

export interface PackageHealth {
  score: number;
  passed: string[];
  missing: string[];
}

export interface ProjectScore {
  score: number;
  rating: string;
}



export function getProjectTree(projectPath: string): ProjectTree {
  const directories: string[] = [];
  const files: string[] = [];

  const entries = readdirSync(projectPath);

  for (const entry of entries) {
    if (IGNORED_DIRECTORIES.includes(entry)) {
      continue;
    }

    const fullPath = join(projectPath, entry);

    if (statSync(fullPath).isDirectory()) {
      directories.push(entry);
    } else {
      files.push(entry);
    }
  }

  directories.sort();
  files.sort();

  return {
    directories,
    files
  };
}


export function detectEntryPoint(projectPath: string): string {
  for (const file of ENTRY_POINTS) {
    if (existsSync(join(projectPath, file))) {
      return file;
    }
  }

  return "Unknown";
}

export function detectConfigFiles(projectPath: string): string[] {
  const found: string[] = [];

  for (const file of CONFIG_FILES) {
    if (existsSync(join(projectPath, file))) {
      found.push(file);
    }
  }

  return found;
}


export function detectTechnologyStack(packageJson: any): string[] {
  const technologies = new Set<string>();

  const dependencies = {
    ...(packageJson.dependencies ?? {}),
    ...(packageJson.devDependencies ?? {})
  };

  technologies.add("Node.js");

  if (packageJson.type === "module") {
    technologies.add("ES Modules");
  }

  if (dependencies.typescript) technologies.add("TypeScript");
  if (dependencies.react) technologies.add("React");
  if (dependencies["react-dom"]) technologies.add("React DOM");
  if (dependencies.next) technologies.add("Next.js");
  if (dependencies.vue) technologies.add("Vue");
  if (dependencies.nuxt) technologies.add("Nuxt");
  if (dependencies.svelte) technologies.add("Svelte");
  if (dependencies.express) technologies.add("Express");
  if (dependencies.fastify) technologies.add("Fastify");
  if (dependencies.nestjs || dependencies["@nestjs/core"])
    technologies.add("NestJS");

  if (dependencies.vite) technologies.add("Vite");
  if (dependencies.webpack) technologies.add("Webpack");

  if (dependencies.tailwindcss) technologies.add("Tailwind CSS");

  if (dependencies.prisma) technologies.add("Prisma");
  if (dependencies.drizzle) technologies.add("Drizzle ORM");
  if (dependencies.mongoose) technologies.add("MongoDB");
  if (dependencies.mysql2) technologies.add("MySQL");
  if (dependencies.pg) technologies.add("PostgreSQL");
  if (dependencies.sqlite3) technologies.add("SQLite");

  if (dependencies.vitest) technologies.add("Vitest");
  if (dependencies.jest) technologies.add("Jest");

  if (dependencies.eslint) technologies.add("ESLint");
  if (dependencies.prettier) technologies.add("Prettier");

  if (dependencies.commander) technologies.add("Commander");
  if (dependencies.chalk) technologies.add("Chalk");
  if (dependencies.ora) technologies.add("Ora");

  return [...technologies];
}


export function analyzePackageHealth(
  packageJson: any
): PackageHealth {
  const passed: string[] = [];
  const missing: string[] = [];

  const checks = [
    ["Description", packageJson.description],
    ["Repository", packageJson.repository],
    ["Homepage", packageJson.homepage],
    ["Author", packageJson.author],
    ["License", packageJson.license],
    ["Keywords", packageJson.keywords?.length],
    ["Engines", packageJson.engines],
    ["Bugs", packageJson.bugs],
    ["Funding", packageJson.funding],
    ["Exports", packageJson.exports]
  ];

  for (const [name, value] of checks) {
    if (value) {
      passed.push(name as string);
    } else {
      missing.push(name as string);
    }
  }

  return {
    score: passed.length,
    passed,
    missing
  };
}



export function calculateProjectScore(project: {
  packageHealth: PackageHealth;
  git: boolean;
  readme: boolean;
  license: boolean;
  totalFiles: number;
  linesOfCode: number;
}): ProjectScore {
  let score = 0;

  // Package health (50 points)
  score += project.packageHealth.score * 5;

  // Repository quality
  if (project.git) score += 10;
  if (project.readme) score += 10;
  if (project.license) score += 10;

  // Project maturity
  if (project.totalFiles >= 20) score += 10;
  if (project.linesOfCode >= 500) score += 10;

  // Cap at 100
  score = Math.min(score, 100);

  let rating = "Needs Improvement";

  if (score >= 90) {
    rating = "Excellent";
  } else if (score >= 75) {
    rating = "Good";
  } else if (score >= 60) {
    rating = "Fair";
  }

  return {
    score,
    rating
  };
}

export function detectGitBranch(projectPath: string): string {
  const head = join(projectPath, ".git", "HEAD");

  if (!existsSync(head)) {
    return "None";
  }

  const content = readFileSync(head, "utf8").trim();

  if (content.startsWith("ref:")) {
    return content.split("/").pop() ?? "Unknown";
  }

  return "Detached HEAD";
}