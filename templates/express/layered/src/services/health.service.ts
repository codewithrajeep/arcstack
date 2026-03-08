export class HealthService {
  getStatus(): object {
    return {
      status: "ok",
      timestamp: new Date().toISOString(),
    };
  }
}
