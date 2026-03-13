import { HealthService } from "../services/health.service";

export class HealthController {
  private readonly healthService: HealthService;
  constructor() {
    this.healthService = new HealthService();
  }
  getHealth(): object {
    return this.healthService.getStatus();
  }
}
