import { useState, useEffect } from 'react';
import type { Service } from '../config/services';
import { config } from '../config/services';
import { sendNotification } from '../services/notifications';

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
          signal: AbortSignal.timeout(service.timeout || config.defaultTimeout),
        });
        
        const latency = performance.now() - startTime;
        const isHealthy = response.ok;
        const error = isHealthy ? undefined : `Status: ${response.status}`;
        
        setHealth({
          status: isHealthy ? 'healthy' : 'unhealthy',
          latency,
          lastChecked: new Date(),
          error,
        });

        if (!isHealthy && error) {
          sendNotification(service, error);
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        setHealth({
          status: 'unhealthy',
          latency: performance.now() - startTime,
          lastChecked: new Date(),
          error: errorMessage,
        });
        
        sendNotification(service, errorMessage);
      }
    };

    checkHealth();
    const interval = setInterval(checkHealth, config.refreshInterval);
    return () => clearInterval(interval);
  }, [service]);

  return health;
};