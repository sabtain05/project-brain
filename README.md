# Quicklyzer

> A fast and intelligent CLI that understands and analyzes software projects in seconds.

Quicklyzer helps developers quickly understand any codebase by analyzing project structure, technologies, dependencies, architecture, and code quality from the terminal.

---

## Features

### Project Intelligence

* Project information
* Entry point detection
* Project structure overview
* Configuration file detection
* Technology stack detection
* Project type detection

### Environment Intelligence

* Framework detection
* Framework version detection
* Build tool detection
* Build tool version detection
* Node.js version detection
* Docker detection
* CI/CD detection
* ESLint detection
* Prettier detection
* Monorepo detection

### Repository Intelligence

* Git repository detection
* Current Git branch
* README detection
* LICENSE detection

### Dependency Intelligence

* Production & development dependency analysis
* Installed package count
* Installed package size
* Largest installed packages
* Unused dependency detection
* Missing dependency detection
* Duplicate dependency version detection
* Dependency risk score
* Package insights

### Code Intelligence

* Source file analysis
* Extension statistics
* Largest source files
* Empty source files
* Duplicate file name detection
* TODO / FIXME / HACK / NOTE detection
* Recently modified files

### Project Statistics

* Total files
* Source files
* Directory count
* Largest directories
* Lines of code
* Largest file
* Hidden files
* Empty directories
* Project size
* Scan duration

### Project Evaluation

* Package Health Score
* Project Score
* Smart project summary

### Export Engine

* JSON reports
* Markdown reports
* HTML reports
* Timestamped reports
* Custom filenames
* Custom output directory
* Export all formats at once
* Export manifest

---

## Installation

```bash
npm install -g quicklyzer
```

Or use it without installing:

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

### Custom output directory

```bash
quicklyzer export --all --output reports
```

### Custom filename

```bash
quicklyzer export --all --output reports --name project-report
```

---

## Requirements

* Node.js 20 or later

---

## Author

**Sabtain Ali**

GitHub: https://github.com/sabtain05

---

## License

MIT License
