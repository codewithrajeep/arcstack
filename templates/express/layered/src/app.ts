import express, { Application } from "express";
import pinoHttp from "pino-http";
import { logger } from "./utils/logger";
import { healthRouter } from "./controllers/health.controller";
import { errorHandler } from "./middleware/error";

const app: Application = express();

app.use(pinoHttp({ logger }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/health", healthRouter);

app.use(errorHandler);

export default app;
