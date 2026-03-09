import { Router } from "express";
import healthRoutes from "../../infrastructure/http/routes/health.routes";

export const router = Router();

router.use(healthRoutes);
