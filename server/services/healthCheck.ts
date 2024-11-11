import axios from 'axios';
import type { Service, HealthStatus } from '../types';
import { config } from '../config';

export async function checkServiceHealth(service: Service): Promise<HealthStatus> {
  const startTime = Date.now();

  try {
    const response = await axios.get(service.endpoint, {
      timeout: service.timeout || config.defaultTimeout
    });

    const latency = Date.now() - startTime;
    const isHealthy = response.status === (service.expectedStatus || 200);

    return {
      status: isHealthy ? 'healthy' : 'unhealthy',
      latency,
      lastChecked: new Date(),
      error: isHealthy ? undefined : `Unexpected status: ${response.status}`
    };
  } catch (error) {
    const latency = Date.now() - startTime;
    const errorMessage = axios.isAxiosError(error) && error.response
      ? `HTTP ${error.response.status}: ${error.response.statusText}`
      : error instanceof Error ? error.message : 'Unknown error';

    return {
      status: 'unhealthy',
      latency,
      lastChecked: new Date(),
      error: errorMessage
    };
  }
}