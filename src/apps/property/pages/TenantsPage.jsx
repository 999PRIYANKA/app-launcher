import React, { useState } from 'react';
import TenantsList from '../components/tenants/TenantsList';
import TenantDetailView from '../components/tenants/TenantDetailView';

const TenantsPage = ({ 
    tenants, 
    properties = [], 
    leases = [],
    applications = [],
    evictions = [],
    onAddTenant, 
    onUpdateTenant 
}) => {
  const [selectedTenant, setSelectedTenant] = useState(null);

  const handleSave = (tenant) => {
      const exists = tenants.find(t => t.id === tenant.id);
      if (exists) {
          onUpdateTenant(tenant);
      } else {
          onAddTenant(tenant);
      }
      setSelectedTenant(null);
  };

  return (
    <div className="relative h-full">
        <TenantsList 
            tenants={tenants} 
            onAddTenantClick={() => setSelectedTenant({ id: Math.random().toString(36).substr(2, 9), name: '', property: '', email: '', phone: '', status: 'Current' })} 
            onSelectTenant={setSelectedTenant}
        />
        {selectedTenant && (
            <TenantDetailView 
                tenant={selectedTenant}
                properties={properties}
                leases={leases}
                applications={applications}
                evictions={evictions}
                onBack={() => setSelectedTenant(null)}
                onSave={handleSave}
            />
        )}
    </div>
  );
};

export default TenantsPage;

