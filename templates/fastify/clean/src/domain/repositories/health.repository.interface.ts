import { HealthStatus } from "../entities/health.entity";

export interface IHealthRepository {
    getStatus(): HealthStatus;
}