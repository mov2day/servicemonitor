import type { Service, HealthStatus } from './types';

const API_URL = import.meta.env.VITE_API_URL;

export async function checkServiceHealth(service: Service): Promise<HealthStatus> {
  const response = await fetch(`${API_URL}/api/check-service`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ service }),
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }

  const data = await response.json();
  return {
    ...data,
    lastChecked: new Date(data.lastChecked),
  };
}