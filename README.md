# Quicklyzer

Quicklyzer is a CLI tool that understands and analyzes software projects in seconds.

It helps developers quickly inspect a project, understand its structure, and identify the technologies being used before diving into the codebase.

---

## Features

### v0.0.3

* Beautiful CLI interface
* Modular command architecture
* Fast project scanning
* Reads `package.json`
* Displays project name
* Displays project version
* Detects package manager
* Detects programming language
* Detects framework
* Detects build tool
* Detects Git repository
* Detects README file
* Detects LICENSE file
* About command
* Version command

---

## Installation

Run directly without installing:

```bash
npx quicklyzer scan
```

Or install globally:

```bash
npm install -g quicklyzer
```

Then use:

```bash
quicklyzer scan
quicklyzer about
quicklyzer version
```

---

## Commands

### Scan the current project

```bash
quicklyzer scan
```

Example output:

```text
QUICKLYZER
====================================

Project Information
========================
Name            : quicklyzer
Version         : 0.0.3
Package Manager : npm
Language        : TypeScript
Framework       : Unknown
Build Tool      : Unknown
Git Repository  : Yes
README File     : Yes
LICENSE         : Yes
```

### Show information about Quicklyzer

```bash
quicklyzer about
```

### Display the installed version

```bash
quicklyzer version
```

---

## Requirements

* Node.js 20 or later

---

## Roadmap

### Current Release

* v0.0.3 — Project Intelligence (Foundation)

### Upcoming

* Framework version detection
* Build tool version detection
* Dependency statistics
* Available npm scripts
* Node.js version detection
* Docker detection
* CI/CD detection
* ESLint detection
* Prettier detection
* Monorepo detection

---

## License

MIT

---

**A Sabtain Ali production**
