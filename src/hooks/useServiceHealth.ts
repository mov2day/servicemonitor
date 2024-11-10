import { useState, useEffect } from 'react';
import type { Service } from '../config/services';

export interface ServiceHealth {
  status: 'healthy' | 'unhealthy' | 'loading';
  latency: number;
  lastChecked: Date;
  error?: string;
}

export const useServiceHealth = (service: Service) => {
  const [health, setHealth] = useState<ServiceHealth>({
    status: 'loading',
    latency: 0,
    lastChecked: new Date(),
  });

  useEffect(() => {
    const checkHealth = async () => {
      const startTime = performance.now();
      try {
        const response = await fetch(service.endpoint, {
          signal: AbortSignal.timeout(service.timeout || 5000),
        });
        
        const latency = performance.now() - startTime;
        
        setHealth({
          status: response.ok ? 'healthy' : 'unhealthy',
          latency,
          lastChecked: new Date(),
          error: response.ok ? undefined : `Status: ${response.status}`,
        });
      } catch (error) {
        setHealth({
          status: 'unhealthy',
          latency: performance.now() - startTime,
          lastChecked: new Date(),
          error: error instanceof Error ? error.message : 'Unknown error',
        });
      }
    };

    checkHealth();
    const interval = setInterval(checkHealth, 30000);
    return () => clearInterval(interval);
  }, [service]);

  return health;
};