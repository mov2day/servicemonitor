import React, { useMemo } from 'react';
import { services } from '../config/services';
import ServiceCard from './ServiceCard';

const ServiceGrid: React.FC = () => {
  const categories = useMemo(() => {
    const cats = new Set(services.map(s => s.category || 'Other'));
    return Array.from(cats);
  }, []);

  return (
    <div className="space-y-8">
      {categories.map(category => (
        <div key={category}>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">{category}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services
              .filter(s => (s.category || 'Other') === category)
              .map(service => (
                <ServiceCard key={service.id} service={service} />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ServiceGrid;