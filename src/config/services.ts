export interface Service {
  id: string;
  name: string;
  description: string;
  endpoint: string;
  expectedStatus?: number;
  timeout?: number;
  category?: string;
}

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
    endpoint: 'https://users.example.com/health',
    category: 'Core',
  },
];