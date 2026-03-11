# ArcStack

> Backend Architecture Scaffolding CLI — from idea to structured project in seconds.

[![npm version](https://img.shields.io/npm/v/arcstack)](https://www.npmjs.com/package/arcstack)
[![license](https://img.shields.io/npm/l/arcstack)](LICENSE)
[![platform](https://img.shields.io/badge/platform-Windows%20%7C%20macOS%20%7C%20Linux-blue)](https://www.npmjs.com/package/arcstack)

---

## What is ArcStack?

ArcStack is a backend scaffolding CLI that generates production-ready Node.js project structures in seconds. Instead of manually creating folders, wiring up middleware, and copy-pasting boilerplate — just run one command and choose your stack.

It is designed for developers who want a clean, consistent starting point for every backend project — whether you're a junior building your first API or a senior setting up a team repository.

---

## Features

- **3 Architecture Styles** — Basic, Layered, Clean Architecture
- **Database Support** — PostgreSQL (Prisma ORM or pg Pool) and MongoDB (Mongoose)
- **Cloud Database** — Supabase support with credential setup at scaffold time
- **Docker Ready** — Dockerfile + docker-compose with health checks
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
✔ Project name
✔ Choose framework:           Express / Fastify / NestJS
✔ Choose architecture:        Basic / Layered / Clean
✔ Choose database:            None / PostgreSQL / MongoDB
✔ Choose PostgreSQL provider: Local / Supabase
✔ Choose PostgreSQL client:   Prisma / pg Pool
✔ Add Docker support?         Yes / No
✔ Install dependencies?       Yes / No
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

### With PostgreSQL + Prisma

```
my-project/
├── prisma/
│   └── schema.prisma
├── prisma.config.ts
├── src/
│   ├── infrastructure/
│   │   └── database/
│   │       └── prisma.ts
│   └── generated/
│       └── prisma/
├── .env
└── .env.example
```

### With Docker

```
my-project/
├── Dockerfile
├── docker-compose.yml
├── .dockerignore
├── .env.docker
└── DOCKER.md
```

---

## Database Options

### PostgreSQL

| Option | Description |
|--------|-------------|
| Prisma ORM | Type-safe ORM with auto-generated client and migrations |
| pg Pool | Lightweight raw SQL with full control, no ORM |
| Local | Runs on your machine at localhost:5432 |
| Supabase | Managed cloud PostgreSQL, free tier available |

### MongoDB

Raw mongoose with connection management and environment validation.

---

## Docker Support

When Docker is enabled, ArcStack generates:

- **Dockerfile** — multi-stage build with Node 20 Alpine (builder + production)
- **docker-compose.yml** — app + database services with health checks
- **.env.docker** — environment variable template for Docker
- **DOCKER.md** — setup and usage guide

```bash
# Start all services
docker compose up --build

# Run in background
docker compose up -d --build

# Stop all services
docker compose down
```

---

## Running Your Generated Project

```bash
cd my-project
npm run dev        # development with ts-node
npm run build      # compile TypeScript
npm start          # run compiled output

# PostgreSQL + Prisma only
npm run db:generate   # generate Prisma client
npm run db:migrate    # run migrations
npm run db:studio     # open Prisma Studio
```

---

## Requirements

- Node.js 18 or higher
- npm 8 or higher
- Docker (optional, only if using Docker support)

---

## Roadmap

- [x] Express — Basic, Layered, Clean
- [x] Database — PostgreSQL (Prisma 7, pg Pool, Local, Supabase)
- [x] Database — MongoDB (Mongoose)
- [x] Docker — Dockerfile + docker-compose with health checks
- [ ] Fastify — Basic, Layered, Clean
- [ ] NestJS — Basic, Layered, Clean
- [ ] CI/CD — GitHub Actions
- [ ] Intermediate and Senior presets

---

## Security

ArcStack does not collect any data, make network requests, or send telemetry of any kind. It runs entirely on your local machine. The only network activity that occurs is when you choose to install dependencies, which runs `npm install` directly from your terminal using your own npm configuration.

If you find a security issue, please report it privately by emailing the maintainer rather than opening a public issue.

---

## Contributing

Contributions are welcome. Please read [CONTRIBUTING.md](CONTRIBUTING.md) before opening a pull request.

If you find a bug or have a feature request, open an issue on GitHub.

---

## License

MIT — free to use, modify, and distribute.

---

## Author

Built by Rajeep — a developer who got tired of setting up the same folder structures over and over again.