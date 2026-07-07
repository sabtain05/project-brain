# Quicklyzer

> Understand any software project in seconds.

Quicklyzer is a lightweight CLI that instantly analyzes a project and summarizes its development environment, tooling, and repository information.

Built for developers who want to understand unfamiliar codebases without manually inspecting configuration files.

---

## Features

- Project information
- Framework detection
- Framework version detection
- Build tool detection
- Build tool version detection
- Dependency statistics
- npm scripts detection
- Node.js version detection
- Docker detection
- CI/CD detection
- ESLint detection
- Prettier detection
- Monorepo detection
- Git repository detection
- README detection
- LICENSE detection

---

## Installation

```bash
npm install -g quicklyzer
```

Or run without installing:

```bash
npx quicklyzer scan
```

---

## Usage

### Scan a project

```bash
quicklyzer scan
```

Example output:

```text
QUICKLYZER
====================================

Project
────────────────────────────

Name             : quicklyzer
Version          : 0.0.4

Environment
────────────────────────────

Package Manager  : npm
Language         : TypeScript
Framework        : Unknown
Framework Version: Unknown
Build Tool       : Unknown
Build Tool Version: Unknown
Node.js Required : >=20
Docker           : No
CI/CD            : None
ESLint           : No
Prettier         : No
Monorepo         : No

Dependencies
────────────────────────────

Dependencies      : 4
Dev Dependencies  : 4
Total Packages    : 8

Scripts
────────────────────────────

dev
build
prepublishOnly
start
test

Repository
────────────────────────────

Git              : Yes
README           : Yes
LICENSE          : Yes
```

---

### Show version

```bash
quicklyzer version
```

---

### About

```bash
quicklyzer about
```

---

## Roadmap

### v0.0.1
- Initial CLI
- Welcome banner

### v0.0.2
- Basic project scanning
- Version command
- About command

### v0.0.3
- Git detection
- README detection
- LICENSE detection

### v0.0.4
- Framework version detection
- Build tool version detection
- Dependency statistics
- npm scripts detection
- Node.js version detection
- Docker detection
- CI/CD detection
- ESLint detection
- Prettier detection
- Monorepo detection

---

## License

MIT

---

## Author

Sabtain Ali

GitHub: https://github.com/sabtain05

**A Sabtain Ali production**