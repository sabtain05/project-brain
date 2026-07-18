# 🚀 Quicklyzer

> A powerful CLI that understands and analyzes software projects in seconds.

Quicklyzer scans your project and provides detailed insights about its structure, dependencies, code quality, repository health, package configuration, and much more.

---

## ✨ Features

### 📦 Project Analysis

- Project information
- Project type detection
- Technology stack detection
- Entry point detection
- Configuration file detection
- Package health analysis
- Project score

### 🌍 Environment Detection

- Package manager
- Framework
- Framework version
- Build tool
- Build tool version
- Node.js version requirement
- Docker detection
- CI/CD detection
- ESLint detection
- Prettier detection
- Monorepo detection

### 📊 Project Statistics

- Total files
- Source files
- Directories
- Largest directories
- Largest files
- Lines of code
- Hidden files
- Empty files
- Empty directories
- Project size

### 🧠 Code Analysis

- File extension breakdown
- Largest source files
- TODO detection
- FIXME detection
- HACK detection
- NOTE detection
- Duplicate filenames
- Recently modified files

### 📦 Dependency Intelligence

- Production dependencies
- Development dependencies
- Installed packages
- Installed package size
- Largest installed packages
- Unused dependencies
- Missing dependencies
- Duplicate dependency versions
- Dependency risk score

### Export Reports

- JSON
- Markdown
- HTML

### CLI Experience

- Colored output
- Progress spinner
- Quiet mode
- Verbose mode
- Custom ignore directories
- Performance timings
- Professional summaries

---

# Installation

```bash
npm install -g quicklyzer
```

or

```bash
npx quicklyzer scan
```

---

# Commands

## Scan Project

```bash
quicklyzer scan
```

Verbose mode

```bash
quicklyzer scan --verbose
```

Quiet mode

```bash
quicklyzer scan --quiet
```

Ignore directories

```bash
quicklyzer scan --ignore dist
```

Multiple directories

```bash
quicklyzer scan --ignore dist --ignore coverage
```

---

## Export Reports

JSON

```bash
quicklyzer export
```

Markdown

```bash
quicklyzer export --format md
```

HTML

```bash
quicklyzer export --format html
```

Export every format

```bash
quicklyzer export --all
```

Custom output folder

```bash
quicklyzer export --all --output reports
```

Custom filename

```bash
quicklyzer export --all --name project-report
```

---

# Example

```bash
quicklyzer scan
```

```
Project
────────────────────────────
Name             : quicklyzer
Version          : 0.1.0

Environment
────────────────────────────
Framework         : Unknown
Package Manager   : npm
Language          : TypeScript

...

Project Score
────────────────────────────
Score             : 96/100
Rating            : Excellent
```

---

# Requirements

- Node.js 20+

---

# License

MIT

---

**A Sabtain Ali production**