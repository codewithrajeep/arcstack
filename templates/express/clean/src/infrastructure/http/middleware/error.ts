import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { logger } from "./logger";

export const errorHandler: ErrorRequestHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  logger.error({ err }, "Unhandled error");
  res.status(500).json({ error: err.message || "Internal Server Error" });
};