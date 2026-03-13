import fp from "fastify-plugin";
import { FastifyInstance } from "fastify";

async function health(app: FastifyInstance) {
  app.get("/health", async (_request, _reply) => {
    return {
      status: "ok",
      timestamp: new Date().toISOString(),
    };
  });
}

export const healthRoute = fp(health);
