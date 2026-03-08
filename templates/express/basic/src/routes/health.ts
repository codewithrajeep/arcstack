import express, { Router } from "express";

const router: Router = express.Router();

router.get("/", (_, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
  });
});
export default router;