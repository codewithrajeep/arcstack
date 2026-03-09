import { HealthStatus } from "../../domain/entities/health.entity";
import { IHealthRepository } from "../../domain/repositories/health.repository.interface";

export class HealthRepositoryImpl implements IHealthRepository {
  getStatus(): HealthStatus {
    return {
      status: "ok",
      timestamp: new Date().toISOString(),
    };
  }
}
