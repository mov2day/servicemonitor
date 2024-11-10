import React from 'react';
import { Activity, CheckCircle2, XCircle, Clock } from 'lucide-react';
import type { Service } from '../config/services';
import { useServiceHealth } from '../hooks/useServiceHealth';

interface ServiceCardProps {
  service: Service;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const health = useServiceHealth(service);

  const statusColor = {
    healthy: 'bg-green-100 text-green-800',
    unhealthy: 'bg-red-100 text-red-800',
    loading: 'bg-gray-100 text-gray-800',
  }[health.status];

  const StatusIcon = {
    healthy: CheckCircle2,
    unhealthy: XCircle,
    loading: Clock,
  }[health.status];

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{service.name}</h3>
          <p className="text-sm text-gray-500 mt-1">{service.description}</p>
        </div>
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusColor}`}>
          <StatusIcon className="w-4 h-4 mr-1" />
          {health.status}
        </span>
      </div>
      
      <div className="mt-4 space-y-2">
        <div className="flex items-center text-sm text-gray-600">
          <Activity className="w-4 h-4 mr-2" />
          <span>Latency: {health.latency.toFixed(0)}ms</span>
        </div>
        
        <div className="text-sm text-gray-500">
          Last checked: {health.lastChecked.toLocaleTimeString()}
        </div>
        
        {health.error && (
          <div className="text-sm text-red-600 mt-2">
            Error: {health.error}
          </div>
        )}
      </div>
    </div>
  );
};