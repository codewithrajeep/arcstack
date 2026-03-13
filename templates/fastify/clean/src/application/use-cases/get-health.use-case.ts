import { HealthStatus } from "../../domain/entities/health.entity";
import { IHealthRepository } from "../../domain/repositories/health.repository.interface";

export class GetHealthUseCase {
  constructor(private readonly healthRepository: IHealthRepository) {}
  execute(): HealthStatus {
    return this.healthRepository.getStatus();
  }
}
