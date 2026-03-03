import fs from "fs";
import path from "path";
import { ProjectConfig } from "../../types/project-config";
import { DependencySet } from "../../types/dependency-set";

export async function generateFastify(config: ProjectConfig): Promise<DependencySet> {
  const basePath = path.join(process.cwd(), config.projectName);
  fs.mkdirSync(basePath, { recursive: true });
  fs.writeFileSync(
    path.join(basePath, "src/server.ts"),
    `
        import Fastify, { FastifyInstance } from 'fastify';

        const server: FastifyInstance = Fastify({ logger: true });

        // Health check route
        server.get('/health', async () => {
          return { status: 'ok' };
        });

        const start = async () => {
          try {
            await server.listen({ port: 3000, host: '0.0.0.0' });
            } catch (err) {
              server.log.error(err);
              process.exit(1);
            }
          };

        start();
        `
  );

  return {
    dependencies: {
      fastify: "^4.28.0",
    },
    devDependencies: {
      "@types/node": "^20.0.0",
    },
  };
}
