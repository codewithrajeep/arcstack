import fp from "fastify-plugin";
import sensible from "@fastify/sensible";
import { FastifyInstance } from "fastify";

export default fp(async function (app: FastifyInstance) {
  await app.register(sensible);
});
