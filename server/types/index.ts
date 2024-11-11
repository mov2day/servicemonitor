export interface Service {
  id: string;
  name: string;
  description: string;
  endpoint: string;
  expectedStatus?: number;
  timeout?: number;
  category?: string;
}

export interface HealthStatus {
  status: 'healthy' | 'unhealthy';
  latency: number;
  lastChecked: Date;
  error?: string;
}

export interface TeamsNotification {
  service: Service;
  error: string;
  timestamp: Date;
}