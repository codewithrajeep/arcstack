# ArcStack

> Backend Architecture Scaffolding CLI from idea to structured project in seconds.

[![npm version](https://img.shields.io/npm/v/arcstack)](https://www.npmjs.com/package/arcstack)
[![license](https://img.shields.io/npm/l/arcstack)](LICENSE)
[![platform](https://img.shields.io/badge/platform-Windows%20%7C%20macOS%20%7C%20Linux-blue)](https://www.npmjs.com/package/arcstack)

---

## What is ArcStack?

ArcStack is a backend scaffolding CLI that generates production-ready Node.js project structures in seconds. Instead of manually creating folders, wiring up middleware, and copy-pasting boilerplate — just run one command and choose your stack.

It is designed for developers who want a clean, consistent starting point for every backend project — whether you're a junior building your first API or a senior setting up a team repository.

---

## Features

- **3 Frameworks** — Express, Fastify, NestJS
- **3 Architecture Styles** — Basic, Layered, Clean Architecture
- **Production-ready boilerplate** — Pino logger, error handling, health routes included
- **TypeScript first** — every generated project is fully typed
- **Cross-platform** — works on Windows, macOS, and Linux
- **Zero config** — interactive prompts guide you through every choice

---

## Installation

```bash
npm install -g arcstack
```

---

## Usage

```bash
arcstack create my-project
```

You will be guided through an interactive setup:

```
✔ Choose framework:         Express / Fastify / NestJS
✔ Choose architecture:      Basic / Layered / Clean
✔ Choose database:          None / PostgreSQL / MongoDB
✔ Add Docker support?       Yes / No
✔ Install dependencies?     Yes / No
```

Your project is created and ready to run.

---

## Generated Project Structures

### Express + Basic

```
my-project/
├── src/
│   ├── index.ts
│   ├── app.ts
│   ├── routes/
│   │   └── health.ts
│   └── middleware/
│       └── error.ts
├── package.json
├── tsconfig.json
└── .gitignore
```

### Express + Layered

```
my-project/
├── src/
│   ├── index.ts
│   ├── app.ts
│   ├── controllers/
│   │   └── health.controller.ts
│   ├── services/
│   │   └── health.service.ts
│   ├── repositories/
│   ├── models/
│   └── middleware/
│       └── error.ts
├── package.json
├── tsconfig.json
└── .gitignore
```

### Express + Clean Architecture

```
my-project/
├── src/
│   ├── index.ts
│   ├── app.ts
│   ├── domain/
│   │   ├── entities/
│   │   └── repositories/
│   ├── application/
│   │   ├── use-cases/
│   │   └── interfaces/
│   ├── infrastructure/
│   │   ├── http/
│   │   │   ├── routes/
│   │   │   └── middleware/
│   │   └── database/
│   └── presentation/
│       ├── controllers/
│       └── routes/
├── package.json
├── tsconfig.json
└── .gitignore
```

---

## Running Your Generated Project

```bash
cd my-project
npm run dev      # development with ts-node
npm run build    # compile TypeScript
npm start        # run compiled output
```

---

## Requirements

- Node.js 18 or higher
- npm 8 or higher

---

## Roadmap

- [x] Express — Basic, Layered, Clean
- [ ] Fastify — Basic, Layered, Clean
- [ ] NestJS — Basic, Layered, Clean
- [ ] Database modules — PostgreSQL, MongoDB
- [ ] Docker support
- [ ] CI/CD — GitHub Actions
- [ ] Intermediate and Senior presets

---

## Security

ArcStack does not collect any data, make network requests, or send telemetry of any kind. It runs entirely on your local machine. The only network activity that occurs is when you choose to install dependencies, which runs `npm install` directly from your terminal using your own npm configuration.

If you find a security issue, please report it privately by emailing the maintainer rather than opening a public issue.

---

## Contributing

Contributions are welcome. If you find a bug, have a feature request, or want to add a new framework or architecture template, feel free to open an issue or pull request on GitHub.

---

## License

MIT — free to use, modify, and distribute.

---

## Author

Built by Rajeep — a developer who got tired of setting up the same folder structures over and over again.