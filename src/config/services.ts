import type { Service } from '../lib/types';

export interface NotificationConfig {
  enabled: boolean;
  platform: 'teams';
  webhookUrl?: string;
  retryInterval: number;
  cooldown: number;
}

export interface Config {
  refreshInterval: number;
  defaultTimeout: number;
  notifications: NotificationConfig;
}

export const config: Config = {
  refreshInterval: 30000,
  defaultTimeout: 5000,
  notifications: {
    enabled: true,
    platform: 'teams',
    retryInterval: 300000,
    cooldown: 1800000,
  }
};

export const services: Service[] = [
  {
    id: 'user-service',
    name: 'User Service',
    description: 'User Management and Authentication',
    endpoint: 'https://mockbin.org/bin/73580dd2-b41e-46bd-b203-f8dc0ef8bb87',
    category: 'Core Services',
    timeout: 3000
  },
  {
    id: 'payment-gateway',
    name: 'Payment Gateway',
    description: 'Payment Processing Service',
    endpoint: 'https://api.example.com/payment/health',
    category: 'Financial',
    timeout: 5000
  },
  {
    id: 'inventory-service',
    name: 'Inventory System',
    description: 'Stock Management and Tracking',
    endpoint: 'https://api.example.com/inventory/health',
    category: 'Operations',
    timeout: 4000
  },
  {
    id: 'notification-service',
    name: 'Notification Service',
    description: 'Email and Push Notifications',
    endpoint: 'https://api.example.com/notifications/health',
    category: 'Communications',
    timeout: 3000
  },
  {
    id: 'search-service',
    name: 'Search Engine',
    description: 'Product and Content Search',
    endpoint: 'https://api.example.com/search/health',
    category: 'Core Services',
    timeout: 2000
  },
  {
    id: 'analytics-service',
    name: 'Analytics Engine',
    description: 'Data Analytics and Reporting',
    endpoint: 'https://api.example.com/analytics/health',
    category: 'Analytics',
    timeout: 6000
  },
  {
    id: 'cache-service',
    name: 'Cache Service',
    description: 'Distributed Caching System',
    endpoint: 'https://api.example.com/cache/health',
    category: 'Infrastructure',
    timeout: 1000
  },
  {
    id: 'recommendation-engine',
    name: 'Recommendation Engine',
    description: 'Product Recommendations',
    endpoint: 'https://api.example.com/recommendations/health',
    category: 'ML Services',
    timeout: 4000
  }
];