# Quicklyzer

Quicklyzer is a CLI tool that understands and analyzes software projects in seconds.

It helps developers quickly inspect a project and understand its basic structure before diving into the code.

---

## Features

### v0.0.2

* Beautiful CLI interface
* Modular command architecture
* Project scanning
* Reads `package.json`
* Displays project name
* Displays project version
* Detects package manager
* Detects project language
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
 Project Information
========================
Name            : quicklyzer
Version         : 0.0.2
Package Manager : npm
Language        : TypeScript
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

## License

MIT

---

**A Sabtain Ali Production**
