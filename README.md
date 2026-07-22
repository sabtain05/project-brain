# Quicklyzer

Quicklyzer is an intelligent CLI that analyzes software projects in seconds.

It scans your project structure, dependencies, Git repository, documentation, source code, configuration files, package health, and much more to provide actionable insights.

---

## Installation

```bash
npm install -g quicklyzer
```

or

```bash
npx quicklyzer scan
```

---

## Commands

### Analyze Current Project

```bash
quicklyzer scan
```

### Verbose Output

```bash
quicklyzer scan --verbose
```

### Quiet Mode

```bash
quicklyzer scan --quiet
```

### Ignore Directories

```bash
quicklyzer scan --ignore dist
```

```bash
quicklyzer scan --ignore coverage
```

```bash
quicklyzer scan --ignore uploads
```

Multiple directories:

```bash
quicklyzer scan --ignore dist --ignore coverage
```

---

### Export Reports

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

Export all formats

```bash
quicklyzer export --all
```

Custom output

```bash
quicklyzer export --all --output reports
```

Custom filename

```bash
quicklyzer export --all --output reports --name project-report
```

---

# Features

## Project Intelligence

- Project information
- Framework detection
- Framework version detection
- Build tool detection
- Build tool version detection
- Programming language detection
- Node.js version detection
- Technology stack detection
- Entry point detection
- Configuration file detection

---

## Environment Intelligence

- Docker detection
- CI/CD detection
- ESLint detection
- Prettier detection
- Monorepo detection

---

## Dependency Intelligence

- Production dependencies
- Development dependencies
- Installed packages
- Installed package size
- Largest packages
- Unused dependency detection
- Missing dependency detection
- Duplicate version detection
- Dependency risk score
- Package manager insights

---

## Code Intelligence

- Source file analysis
- Extension statistics
- Largest files
- Largest directories
- Empty source files
- Hidden files
- TODO detection
- FIXME detection
- HACK detection
- NOTE detection
- Duplicate filenames
- Recent file activity

---

## Documentation Intelligence

- README detection
- CHANGELOG detection
- CONTRIBUTING detection
- CODE_OF_CONDUCT detection
- SECURITY detection
- LICENSE detection
- README section analysis
- README statistics
- Badge detection
- Link detection
- License type detection
- Documentation health score
- Documentation recommendations

---

## Git Intelligence

- Repository detection
- Current branch
- Local branch count
- Remote repository
- Last commit
- Recent commits
- Contributors
- Recent tags
- Modified files
- Staged files
- Untracked files
- Ahead/Behind status
- .gitignore analysis
- Repository health score
- Git recommendations

---

## Export Engine

- JSON reports
- Markdown reports
- HTML reports
- Export all formats
- Timestamped reports
- Custom filenames
- Export manifest

---

## Developer Experience

- Colored terminal output
- Progress spinner
- Verbose mode
- Quiet mode
- Performance timing
- Scan duration
- Custom ignore directories
- Professional CLI output
- Friendly error handling

---

## Example

```bash
quicklyzer scan
```

---

## Requirements

- Node.js 20+
- npm

---

## License

MIT

---

**A Sabtain Ali production**