import express, { Application } from "express";
import { pinoHttp } from "pino-http";
import { logger } from "./infrastructure/http/middleware/logger";
import { router } from "./presentation/routes";
import { errorHandler } from "./infrastructure/http/middleware/error";

const app: Application = express();

app.use(pinoHttp({ logger }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);
app.use(errorHandler)

export default app;
