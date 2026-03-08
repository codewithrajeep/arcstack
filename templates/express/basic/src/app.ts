import express, { Application } from "express";
import healthRoutes from "./routes/health";
import { errorHandler } from "./middleware/error";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/health", healthRoutes);
app.use(errorHandler);

export default app;
