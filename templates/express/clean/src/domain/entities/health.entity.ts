export interface HealthStatus {
    status: "ok" | "degraded" | "down"
    timestamp: string;
}