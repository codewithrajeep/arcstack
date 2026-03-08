import { Router, Request, Response } from "express";
import { HealthService } from "../services/health.service";

export const healthRouter = Router();

const healthService = new HealthService();

healthRouter.get("/", (_req: Request, res: Response) => {
  const result = healthService.getStatus();
  res.json(result);
});
