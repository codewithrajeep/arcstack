import Fastify from "fastify";
import sensible from "@fastify/sensible";
import { router } from "./presentation/routes";

export async function buildApp() {
  const app = Fastify({
    logger: {
      transport:
        process.env.NODE_ENV !== "production"
          ? { target: "pino-pretty", options: { colorize: true } }
          : undefined,
    },
  });
  await app.register(sensible);
  await app.register(router);
  await app.ready();
  return app;
}
