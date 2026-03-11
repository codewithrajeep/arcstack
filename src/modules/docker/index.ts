import { ModuleResult } from "../../types/module";
import { Database, PostgresProvider } from "../../types/project-config";

export function generateDocker(
  database?: Database,
  postgresProvider?: PostgresProvider
): ModuleResult {
  const isExternalDb =
    database === "postgres" && postgresProvider === "supabase";
  const hasLocalDb =
    database !== "none" && database !== undefined && !isExternalDb;

  return {
    files: [
      {
        path: "Dockerfile",
        content: generateDockerfile(),
      },
      {
        path: "docker-compose.yml",
        content: generateDockerCompose(database, isExternalDb, hasLocalDb),
      },
      {
        path: ".dockerignore",
        content: generateDockerignore(),
      },
      {
        path: ".env.docker",
        content: generateEnvDocker(database, isExternalDb),
      },
      {
        path: "DOCKER.md",
        content: generateDockerReadme(database, isExternalDb),
      },
    ],
    dependencies: {},
  };
}

function generateDockerfile(): string {
  return `# ── Build stage ────────────────────────────────────────────────
FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma
COPY prisma.config.ts ./

RUN npm ci

COPY . .
RUN npm run build

# ── Production stage ───────────────────────────────────────────
FROM node:20-alpine AS production
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup -g 1001 -S nodejs && \\
    adduser -S nodeuser -u 1001

COPY package*.json ./
COPY prisma ./prisma
COPY prisma.config.ts ./

RUN npm ci --only=production && npm cache clean --force

COPY --from=builder /app/dist ./dist

USER nodeuser

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \\
  CMD wget -qO- http://localhost:3000/health || exit 1

CMD ["node", "dist/index.js"]`;
}

function generateDockerCompose(
  database?: Database,
  isExternalDb?: boolean,
  hasLocalDb?: boolean
): string {
  const dependsOn = hasLocalDb
    ? database === "postgres"
      ? `\n    depends_on:\n      postgres:\n        condition: service_healthy`
      : `\n    depends_on:\n      mongo:\n        condition: service_healthy`
    : "";

  const appService = `  app:
    build:
      context: .
      target: production
    ports:
      - "3000:3000"
    env_file:
      - .env.docker${dependsOn}
    healthcheck:
      test: ["CMD", "wget", "-qO-", "http://localhost:3000/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 10s
    restart: unless-stopped`;

  const dbService = generateDbService(database, isExternalDb);
  const volumes = generateVolumes(database, isExternalDb);

  const parts = ["services:", appService];
  if (dbService) parts.push(dbService);
  if (volumes) parts.push(volumes);

  return parts.join("\n");
}

function generateDbService(
  database?: Database,
  isExternalDb?: boolean
): string {
  if (!database || database === "none" || isExternalDb) return "";

  if (database === "postgres") {
    return `  postgres:
    image: postgres:16-alpine
    ports:
      - "5432:5432"
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
      POSTGRES_DB: mydb
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 10s
      timeout: 5s
      retries: 5
      start_period: 10s
    restart: unless-stopped`;
  }

  if (database === "mongodb") {
    return `  mongo:
    image: mongo:7
    ports:
      - "27017:27017"
    environment:
      MONGO_INITDB_DATABASE: mydb
    volumes:
      - mongo_data:/data/db
    healthcheck:
      test: ["CMD", "mongosh", "--eval", "db.adminCommand('ping')"]
      interval: 10s
      timeout: 5s
      retries: 5
      start_period: 10s
    restart: unless-stopped`;
  }

  return "";
}

function generateVolumes(database?: Database, isExternalDb?: boolean): string {
  if (!database || database === "none" || isExternalDb) return "";
  if (database === "postgres") return `volumes:\n  postgres_data:`;
  if (database === "mongodb") return `volumes:\n  mongo_data:`;
  return "";
}

function generateDockerignore(): string {
  return `node_modules
dist
.env
.env.docker
.git
*.log
coverage
.nyc_output`;
}

function generateEnvDocker(
  database?: Database,
  isExternalDb?: boolean
): string {
  const lines = ["NODE_ENV=production", "PORT=3000"];

  if (database === "postgres" && !isExternalDb) {
    lines.push(
      "DATABASE_URL=postgresql://postgres:password@postgres:5432/mydb"
    );
  } else if (database === "postgres" && isExternalDb) {
    lines.push(
      "DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres"
    );
    lines.push(
      "DIRECT_URL=postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres"
    );
  } else if (database === "mongodb") {
    lines.push("MONGODB_URI=mongodb://mongo:27017/mydb");
  }

  return lines.join("\n");
}

function generateDockerReadme(
  database?: Database,
  isExternalDb?: boolean
): string {
  const dbNote =
    database === "postgres" && !isExternalDb
      ? `\n## Database\nPostgreSQL runs as a Docker service. Connection is handled automatically via docker-compose.\n`
      : database === "mongodb"
      ? `\n## Database\nMongoDB runs as a Docker service. Connection is handled automatically via docker-compose.\n`
      : database === "postgres" && isExternalDb
      ? `\n## Database\nThis project uses Supabase. Update \`.env.docker\` with your real Supabase credentials before running.\n`
      : "";

  return `# Docker Setup

## Requirements
- Docker
- Docker Compose

## Getting Started

\`\`\`bash
# 1. Copy and update environment variables
cp .env.docker .env.docker.local
# Edit .env.docker.local with your values

# 2. Build and start all services
docker compose up --build

# 3. App will be running at
http://localhost:3000

# 4. Check health
http://localhost:3000/health
\`\`\`
${dbNote}
## Useful Commands

\`\`\`bash
# Run in background
docker compose up -d --build

# View logs
docker compose logs -f app

# Stop all services
docker compose down

# Stop and remove volumes
docker compose down -v

# Rebuild after code changes
docker compose up --build
\`\`\`

## Environment Variables

Edit \`.env.docker\` before running. Never commit this file with real credentials.`;
}
