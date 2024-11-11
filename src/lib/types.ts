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
  status: 'healthy' | 'unhealthy' | 'loading';
  latency: number;
  lastChecked: Date;
  error?: string;
}