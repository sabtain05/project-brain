# Quicklyzer

A fast, intelligent CLI tool that analyzes software projects in seconds.

Quicklyzer helps developers understand unfamiliar codebases by detecting project structure, technologies, environment, repository information, code statistics, and more—all from the command line.

---

## Features

### Project Analysis

* Project name and version
* Project type detection
* Entry point detection
* Technology stack detection
* Configuration file detection

### Environment Detection

* Framework detection
* Framework version
* Build tool detection
* Build tool version
* Node.js version requirement
* Docker detection
* CI/CD detection
* ESLint detection
* Prettier detection
* Monorepo detection

### Dependency Analysis

* Dependency count
* Dev dependency count
* Total package count
* npm scripts

### Project Statistics

* Total files
* Source files
* Directory count
* Largest directories
* Largest files
* Lines of code
* Empty directories
* Empty source files
* Hidden files
* Project size
* Extension statistics

### Code Intelligence

* TODO detection
* FIXME detection
* HACK detection
* NOTE detection
* Duplicate file name detection
* Recently modified files

### Repository Intelligence

* Git repository detection
* Current Git branch
* README detection
* LICENSE detection

### Quality Analysis

* Package Health Score
* Project Score
* Project Summary
* Recommendations

### Export Engine (v0.0.8)

* Export JSON reports
* Export Markdown reports
* Export HTML reports
* Export all formats at once
* Custom output directory
* Custom report filename
* Timestamped reports
* Export manifest

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

## Commands

### Scan a project

```bash
quicklyzer scan
```

### About

```bash
quicklyzer about
```

### Version

```bash
quicklyzer version
```

### Export JSON

```bash
quicklyzer export
```

### Export Markdown

```bash
quicklyzer export --format md
```

### Export HTML

```bash
quicklyzer export --format html
```

### Export all formats

```bash
quicklyzer export --all
```

### Export to a custom directory

```bash
quicklyzer export --all --output reports
```

### Export with a custom filename

```bash
quicklyzer export --all --output reports --name project-report
```

---

## Example

```bash
quicklyzer scan
```

Produces a detailed report including:

* Project information
* Environment
* Technology stack
* Configuration files
* Dependency statistics
* Code analysis
* Project statistics
* Repository information
* Package health
* Project score
* Summary

---

## Requirements

* Node.js 20 or later

---

## License

MIT

---

## Author

Sabtain Ali

GitHub: https://github.com/sabtain05/quicklyzer


**a Sabtain Ali production**