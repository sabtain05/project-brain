# Quicklyzer

> Understand and analyze any software project in seconds.

Quicklyzer is a fast, lightweight, and intelligent CLI tool that scans software projects and provides a comprehensive overview of their architecture, environment, technology stack, repository health, and project statistics.

Whether you're exploring an open-source repository, auditing your own project, or onboarding to a new codebase, Quicklyzer helps you understand a project instantly.

---

## Features

### Project Information

- Project name
- Version
- Entry point detection

### Project Structure

- Top-level project tree
- Directory overview

### Configuration Detection

Automatically detects common configuration files including:

- TypeScript
- Vite
- Webpack
- Tailwind CSS
- ESLint
- Prettier
- Vitest
- Jest
- Docker
- Docker Compose
- Git Ignore

### Technology Stack Detection

Detects technologies such as:

- Node.js
- TypeScript
- React
- Next.js
- Vue
- Nuxt
- Svelte
- Express
- Fastify
- NestJS
- Vite
- Webpack
- Tailwind CSS
- Prisma
- Drizzle ORM
- MySQL
- PostgreSQL
- MongoDB
- SQLite
- Commander
- Chalk
- Ora
- Vitest
- Jest
- ESLint
- Prettier

### Environment Analysis

- Framework detection
- Framework version
- Build tool detection
- Build tool version
- Required Node.js version
- Docker detection
- CI/CD detection
- ESLint detection
- Prettier detection
- Monorepo detection

### Dependency Analysis

- Dependencies
- Dev Dependencies
- Total Packages

### Script Detection

Lists all available npm scripts.

### Project Statistics

- Total files
- Source files
- Directory count
- Largest directory
- Largest file
- Lines of code
- Hidden files
- Empty directories
- Project size
- Scan duration

### Repository Analysis

- Git repository
- README
- LICENSE

### Package Health

Analyzes important package metadata including:

- Description
- Repository
- Homepage
- Author
- License
- Keywords
- Engines
- Bugs
- Funding
- Exports

### Project Score

Provides an overall project quality score and rating.

---

# Installation

## Run without installing

```bash
npx quicklyzer scan
```

---

## Install globally

```bash
npm install -g quicklyzer
```

Then use:

```bash
quicklyzer scan
```

---

# Commands

## Scan a project

Run inside any project directory.

```bash
quicklyzer scan
```

or

```bash
npx quicklyzer scan
```

---

## Version

```bash
quicklyzer version
```

---

## About

```bash
quicklyzer about
```

---

# Example Output

```text
QUICKLYZER
====================================
v0.0.6
A CLI tool that understands and analyzes software projects in seconds.

Project
────────────────────────────
Name             : quicklyzer
Version          : 0.0.6
Entry Point      : src/index.ts

Project Structure
────────────────────────────
📁 src
📄 package.json
📄 README.md
📄 tsconfig.json

Configuration Files
────────────────────────────
 tsconfig.json
 .gitignore

Technology Stack
────────────────────────────
 Node.js
 ES Modules
 TypeScript
 Commander
 Chalk
 Ora
 Vitest

Environment
────────────────────────────
Package Manager   : npm
Language          : TypeScript
Framework         : Unknown
Build Tool        : Unknown
Node.js Required  : >=20

Dependencies
────────────────────────────
Dependencies      : 4
Dev Dependencies  : 4
Total Packages    : 8

Project Statistics
────────────────────────────
Total Files       : 34
Source Files      : 16
Directories       : 7
Lines of Code     : 1,542
Project Size      : 92.4 KB
Scan Time         : 11.24 ms

Repository
────────────────────────────
Git               : Yes
README            : Yes
LICENSE           : Yes

Package Health
────────────────────────────
Score             : 8/10

Project Score
────────────────────────────
Score             : 90/100
Rating            : Excellent
```

---

# Requirements

- Node.js **20** or later

---

# Roadmap

### v0.0.1

- CLI foundation
- Version command
- About command
- Project scanning

### v0.0.2

- Improved CLI
- Better project information

### v0.0.3

- Framework detection
- Build tool detection
- Repository analysis

### v0.0.4

- Environment intelligence
- Dependency analysis
- Script detection
- Docker detection
- CI/CD detection
- ESLint detection
- Prettier detection
- Monorepo detection

### v0.0.5

- Advanced project statistics
- Hidden files
- Empty directories
- Largest directory
- Largest file
- Project size
- Scan duration

### v0.0.6

- Project structure
- Entry point detection
- Configuration file detection
- Technology stack detection
- Package health analysis
- Project quality score

---

# Contributing

Contributions are welcome.

If you have ideas for new features, bug fixes, or improvements, feel free to open an issue or submit a pull request.

---

# License

MIT License

---

# Author

**Sabtain Ali**

GitHub: https://github.com/sabtain05


**A Sabtain Ali production**