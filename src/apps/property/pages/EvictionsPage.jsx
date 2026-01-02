import React, { useState } from 'react';
import EvictionsList from '../components/evictions/EvictionsList';
import EvictionDetailView from '../components/evictions/EvictionDetailView';

const EvictionsPage = ({ 
    evictions, 
    properties, 
    tenants, 
    leases,
    onAddEviction, 
    onUpdateEviction, 
    onDeleteEviction
}) => {
  const [selectedEviction, setSelectedEviction] = useState(null);

  const handleSave = (eviction) => {
      const exists = evictions.find(e => e.id === eviction.id);
      if (exists) {
          onUpdateEviction(eviction);
      } else {
          onAddEviction(eviction);
      }
      setSelectedEviction(null);
  };

  const handleCreate = () => {
      const newEviction = {
          id: `new-${Math.random().toString(36).substr(2, 5)}`,
          evictionId: `EVC-${Math.floor(Math.random() * 10000)}`,
          evictionNumber: `EVC-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000)}`,
          propertyId: '',
          tenantId: '',
          leaseId: '',
          evictionType: 'Nonpayment of Rent',
          evictionStatus: 'Draft / Pre-Notice Review'
      };
      setSelectedEviction(newEviction);
  };

  return (
    <div className="relative h-full">
        <EvictionsList 
            evictions={evictions}
            properties={properties}
            tenants={tenants}
            onAddClick={handleCreate} 
            onSelect={setSelectedEviction}
        />
        {selectedEviction && (
            <EvictionDetailView 
                eviction={selectedEviction}
                properties={properties}
                tenants={tenants}
                leases={leases}
                onBack={() => setSelectedEviction(null)}
                onSave={handleSave}
            />
        )}
    </div>
  );
};

export default EvictionsPage;

