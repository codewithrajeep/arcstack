# Contributing to ArcStack

Thank you for your interest in contributing to ArcStack! This guide will help you get started.

---

## Getting Started

### Prerequisites
- Node.js 18 or higher
- pnpm
- Git

### Setup

```bash
# 1. Fork the repository on GitHub

# 2. Clone your fork
git clone https://github.com/YOUR-USERNAME/arcstack.git
cd arcstack

# 3. Install dependencies
pnpm install

# 4. Build the project
pnpm run build

# 5. Test your local build
node dist/index.js create test-project
```

---

## Workflow

### Never push directly to `main`

All changes must go through a pull request. Direct pushes to `main` are blocked.

### Branch Naming

```
feat/your-feature-name       — new feature
fix/your-bug-fix             — bug fix
docs/your-docs-update        — documentation
chore/your-chore             — tooling, config, build
refactor/your-refactor       — code restructure
```

### Step by Step

```bash
# 1. Always start from an up-to-date main
git checkout main
git pull origin main

# 2. Create your branch
git checkout -b feat/your-feature-name

# 3. Make your changes
# 4. Build and test
pnpm run build
node dist/index.js create test-project

# 5. Commit with a clear message
git add .
git commit -m "feat(scope): short description of change"

# 6. Push your branch
git push origin feat/your-feature-name

# 7. Open a Pull Request on GitHub
```

---

## Commit Message Format

Follow this format for all commits:

```
type(scope): short description

- detail 1
- detail 2
```

### Types
- `feat` — new feature
- `fix` — bug fix
- `refactor` — code restructure, no behavior change
- `chore` — build, config, tooling changes
- `docs` — documentation updates

### Examples
```
feat(databases): add MySQL support with Prisma
fix(docker): fix docker-compose indentation for db services
docs(readme): update installation instructions
chore(deps): upgrade inquirer to latest version
```

---

## Adding a New Framework Template

1. Create template files in `templates/framework/architecture/`
2. Add the framework module in `src/modules/frameworks/your-framework.ts`
3. Register it in `src/modules/frameworks/index.ts`
4. Add the framework option in `src/core/config-builder.ts`
5. Update `src/types/project-config.ts` if needed
6. Test all three architecture variants (basic, layered, clean)
7. Update README.md roadmap

---

## Adding a New Database Module

1. Add the database module in `src/modules/databases/your-database.ts`
2. Register it in `src/modules/databases/index.ts`
3. Add the database option in `src/core/config-builder.ts`
4. Update `src/types/project-config.ts` if needed
5. Test with all framework + architecture combinations
6. Update README.md roadmap

---

## Pull Request Guidelines

- Keep PRs focused — one feature or fix per PR
- Write a clear PR title following the commit message format
- Describe what changed and why in the PR description
- Make sure `pnpm run build` passes before opening a PR
- Test your changes with `arcstack create test-project`
- Link any related issues in the PR description

---

## Code Style

- TypeScript strict mode is enabled — no `any` types without justification
- All module functions must return `ModuleResult`
- Template files live in `templates/framework/architecture/`
- No direct `fs` calls inside module files — use the file writer
- Follow the existing patterns in the codebase

---

## Questions?

Open a GitHub issue with the `question` label if you need help or clarification before starting work on a contribution.