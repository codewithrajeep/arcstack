import fp from "fastify-plugin";
import { FastifyInstance } from "fastify";
import { healthRoute } from "../../infrastructure/http/routes/health.route";

async function routes(app: FastifyInstance) {
  await app.register(healthRoute);
}
export const router = fp(routes);
