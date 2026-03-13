import fp from "fastify-plugin";
import { FastifyInstance } from "fastify";
import { HealthController } from "../controllers/health.controller";

async function healthRoutes(app: FastifyInstance) {
  const healthController = new HealthController();
  app.get("/health", async (_request, reply) => {
    const result = healthController.getHealth();
    return reply.send(result);
  });
}

export const healthRoute = fp(healthRoutes);
