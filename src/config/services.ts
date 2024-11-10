export interface Service {
  id: string;
  name: string;
  description: string;
  endpoint: string;
  expectedStatus?: number;
  timeout?: number;
  category?: string;
}

export type NotificationPlatform = 'teams' | 'slack';

export interface NotificationConfig {
  enabled: boolean;
  platform: NotificationPlatform;
  webhookUrl?: string;
  retryInterval: number;  // How often to retry sending notifications in ms
  cooldown: number;       // Time to wait before sending another notification for the same service
}

export interface Config {
  refreshInterval: number;
  defaultTimeout: number;
  notifications: NotificationConfig;
}

export const config: Config = {
  refreshInterval: 30000, // 30 seconds in milliseconds
  defaultTimeout: 5000,   // 5 seconds in milliseconds
  notifications: {
    enabled: true,
    platform: 'slack',    // or 'teams'
    webhookUrl: 'WEBHOOK_URL',
    retryInterval: 300000, // 5 minutes
    cooldown: 1800000,    // 30 minutes
  }
};


export const services: Service[] = [
  {
    id: 'api-gateway',
    name: 'API Gateway',
    description: 'Main API Gateway Service',
    endpoint: 'https://api.example.com/health',
    category: 'Core',
  },
  {
    id: 'auth-service',
    name: 'Authentication',
    description: 'User Authentication Service',
    endpoint: 'https://auth.example.com/health',
    category: 'Security',
  },
  {
    id: 'payment-service',
    name: 'Payment Processing',
    description: 'Payment Gateway Integration',
    endpoint: 'https://payments.example.com/health',
    category: 'Financial',
  },
  {
    id: 'user-service',
    name: 'User Management',
    description: 'User Data Service',
    endpoint: 'https://73580dd2b41e46bdb203f8dc0ef8bb87.api.mockbin.io/',
    category: 'Core',
  },
];