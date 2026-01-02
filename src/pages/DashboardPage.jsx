import React from 'react';
import CollectionStats from '../components/CollectionStats';
import OccupancyStats from '../components/OccupancyStats';
import OpenMaintenanceRequests from '../components/OpenMaintenanceRequests';

const DashboardPage= () => {
  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <CollectionStats />
        </div>
        <div className="space-y-6">
          <OccupancyStats />
          <OpenMaintenanceRequests />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;


