import { GetHealthUseCase } from "../../application/use-cases/get-health.use-case";
import { HealthRepositoryImpl } from "../../infrastructure/database/health.repository.impl";

export class HealthController {
  private readonly getHealthUseCase: GetHealthUseCase;
  constructor() {
    const healthRepository = new HealthRepositoryImpl();
    this.getHealthUseCase = new GetHealthUseCase(healthRepository);
  }
  getHealth(): object {
    return this.getHealthUseCase.execute();
  }
}
