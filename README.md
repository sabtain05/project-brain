# 🚀 Quicklyzer

Quicklyzer is an intelligent CLI that analyzes software projects in seconds.

It inspects your project's architecture, dependencies, documentation, Git repository, source code, exports professional reports, and performs security analysis to help developers better understand and maintain their projects.

---

# Installation

## Global

```bash
npm install -g quicklyzer
```

## Using npx

```bash
npx quicklyzer scan
```

---

# Commands

## Scan Project

```bash
quicklyzer scan
```

## Verbose Mode

```bash
quicklyzer scan --verbose
```

## Quiet Mode

```bash
quicklyzer scan --quiet
```

## Ignore Directories

```bash
quicklyzer scan --ignore dist
```

```bash
quicklyzer scan --ignore coverage
```

```bash
quicklyzer scan --ignore uploads
```

Multiple ignores:

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

Export all formats

```bash
quicklyzer export --all
```

Custom directory

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
- Technology stack detection
- Entry point detection
- Node.js requirement detection
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
- Dependency statistics
- Installed package count
- Largest packages
- Dependency health insights
- Package manager detection

---

## Code Intelligence

- Project statistics
- Source file analysis
- Lines of code
- Largest files
- Largest directories
- Hidden files
- Empty directories
- Project size
- TODO detection
- FIXME detection
- NOTE detection
- HACK detection

---

## Documentation Intelligence

- README detection
- README section analysis
- README statistics
- Badge detection
- External link detection
- CHANGELOG detection
- CONTRIBUTING detection
- CODE_OF_CONDUCT detection
- SECURITY detection
- LICENSE detection
- License type detection
- Documentation score
- Documentation recommendations
- Documentation health summary

---

## Git Intelligence

- Git repository detection
- Current branch
- Local branch count
- Remote repository
- Last commit
- Recent commits
- Top contributors
- Recent tags
- Modified files
- Staged files
- Untracked files
- Ahead / Behind status
- Repository health score
- .gitignore analysis
- Git recommendations

---

## Security Intelligence

- Environment file detection
- Dangerous file detection
- Sensitive file detection
- Secret pattern detection
- Security score
- Security rating
- Security recommendations
- Security health summary

---

## Report Export

- JSON reports
- Markdown reports
- HTML reports
- Export all formats
- Custom filenames
- Custom output directory
- Export manifest

---

## Developer Experience

- Colored terminal output
- Progress spinner
- Verbose mode
- Quiet mode
- Performance timing
- Scan duration
- Custom ignored directories
- Friendly error handling
- Professional CLI output

---

# Requirements

- Node.js 20+
- npm

---

# Roadmap

- Project architecture visualization
- Dependency graph generation
- Plugin system
- AI-powered project insights
- Performance profiling
- Cloud project reports

---

# License

MIT License

---

Made with ❤️ by **Sabtain Ali**

