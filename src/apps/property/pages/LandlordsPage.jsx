import React, { useState } from 'react';
import LandlordsList from '../components/contacts/LandlordsList';
import LandlordDetailView from '../components/contacts/LandlordDetailView';

const LandlordsPage = ({ 
    landlords, 
    properties = [], 
    leases = [],
    applications = [],
    evictions = [],
    onAddLandlord, 
    onUpdateLandlord 
}) => {
  const [selectedLandlord, setSelectedLandlord] = useState(null);

  const handleSave = (landlord) => {
      const exists = landlords.find(l => l.id === landlord.id);
      if (exists) {
          onUpdateLandlord(landlord);
      } else {
          onAddLandlord(landlord);
      }
      setSelectedLandlord(null);
  };

  const handleCreate = () => {
      const newLandlord = {
          id: Math.random().toString(36).substr(2, 9),
          name: '',
          companyName: '',
          email: '',
          phone: '',
          status: 'Active',
          propertiesOwnedCount: 0
      };
      setSelectedLandlord(newLandlord);
  };

  return (
    <div className="relative h-full">
        <LandlordsList 
            landlords={landlords} 
            onAddClick={handleCreate} 
            onSelect={setSelectedLandlord}
        />
        {selectedLandlord && (
            <LandlordDetailView 
                landlord={selectedLandlord}
                properties={properties}
                leases={leases}
                applications={applications}
                evictions={evictions}
                onBack={() => setSelectedLandlord(null)}
                onSave={handleSave}
            />
        )}
    </div>
  );
};

export default LandlordsPage;

