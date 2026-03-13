import fp from "fastify-plugin";
import { FastifyInstance } from "fastify";
import sensible from "@fastify/sensible";

export default fp(async function (app: FastifyInstance) {
  await app.register(sensible);
});
