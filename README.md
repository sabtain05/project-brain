# Quicklyzer

> Understand any software project in seconds.

Quicklyzer is an open-source CLI that analyzes software projects and provides instant insights into their architecture, technology stack, codebase, and overall project health.

Instead of manually exploring a repository, Quicklyzer gives you a comprehensive overview with a single command.

---

## Features

### Project Information

* Project name
* Project version
* Entry point detection
* Project type detection

### Project Structure

* Top-level project structure
* Configuration file detection
* Technology stack detection

### Environment Intelligence

* Package manager detection
* Programming language detection
* Framework detection
* Framework version detection
* Build tool detection
* Build tool version detection
* Required Node.js version
* Docker detection
* CI/CD detection
* ESLint detection
* Prettier detection
* Monorepo detection

### Dependencies

* Dependency count
* Dev dependency count
* Total installed packages

### Scripts

* Lists all available npm scripts

### Project Statistics

* Total files
* Source files
* Total directories
* Largest directories
* Largest files
* Lines of code
* Hidden files
* Empty directories
* Empty source files
* Project size

### Code Intelligence

* File extension breakdown
* Largest source files
* TODO detection
* FIXME detection
* HACK detection
* NOTE detection
* Duplicate file name detection
* Recently modified files

### Repository

* Git repository detection
* Current Git branch
* README detection
* LICENSE detection

### Quality Analysis

* Package Health Score
* Project Score
* Intelligent project summary
* Technology summary
* Project recommendations

---

## Installation

### Using npm

```bash
npm install -g quicklyzer
```

Or run without installing:

```bash
npx quicklyzer scan
```

---

## Usage

### Scan the current project

```bash
quicklyzer scan
```

or

```bash
npx quicklyzer scan
```

### Show version

```bash
quicklyzer version
```

### About Quicklyzer

```bash
quicklyzer about
```

---

## Example Output

```text
QUICKLYZER
====================================

Project
────────────────────────────
Name             : quicklyzer
Version          : 0.0.7
Entry Point      : src/index.ts

Technology Stack
────────────────────────────
 Node.js
 TypeScript
 Commander
 Chalk
 Ora

Package Health
────────────────────────────
Score            : 8/10

Project Score
────────────────────────────
Score            : 95/100
Rating           : Excellent
```

---

## Requirements

* Node.js 20 or later

---

## Installation Size

Quicklyzer is lightweight and optimized for fast project scanning.

---

## Roadmap

### Current Version

* Project Intelligence
* Code Intelligence
* Repository Intelligence
* Project Health Analysis

### Upcoming

* JSON export
* Markdown report export
* HTML report generation
* Project dependency graph
* Circular dependency detection
* Dead code detection
* Complexity analysis
* AI-ready project reports
* Plugin system

---

## Contributing

Contributions are welcome.

If you'd like to improve Quicklyzer:

1. Fork the repository.
2. Create a new feature branch.
3. Commit your changes.
4. Open a Pull Request.

Bug reports and feature requests are always appreciated.

---

## License

MIT License

---

## Author

**Sabtain Ali**

GitHub: https://github.com/sabtain05

---

## Support

If you find Quicklyzer useful, please consider:

* Starring the repository
* Reporting bugs
* Suggesting new features
* Contributing to the project

Every contribution helps make Quicklyzer better.

---

## Philosophy

> Understand first. Build second.

Quicklyzer helps developers understand unfamiliar codebases before making changes, reducing onboarding time and improving productivity.



**A Sabtain Ali production**