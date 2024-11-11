import { useState, useEffect } from 'react';
import type { Service, HealthStatus } from '../lib/types';
import { checkServiceHealth } from '../lib/api';
import { config } from '../config/services';

export function useServiceHealth(service: Service) {
  const [health, setHealth] = useState<HealthStatus>({
    status: 'loading',
    latency: 0,
    lastChecked: new Date(),
  });

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const data = await checkServiceHealth(service);
        setHealth(data);
      } catch (error) {
        setHealth({
          status: 'unhealthy',
          latency: 0,
          lastChecked: new Date(),
          error: error instanceof Error ? error.message : 'Unknown error',
        });
      }
    };

    checkHealth();
    const interval = setInterval(checkHealth, config.refreshInterval);
    return () => clearInterval(interval);
  }, [service]);

  return health;
}