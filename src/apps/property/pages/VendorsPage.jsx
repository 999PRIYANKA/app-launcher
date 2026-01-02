import React, { useState } from 'react';
import VendorsList from '../components/contacts/VendorsList';
import VendorDetailView from '../components/contacts/VendorDetailView';

const VendorsPage = ({ vendors, onAddVendor, onUpdateVendor }) => {
  const [selectedVendor, setSelectedVendor] = useState(null);

  const handleSave = (vendor) => {
      const exists = vendors.find(v => v.id === vendor.id);
      if (exists) {
          onUpdateVendor(vendor);
      } else {
          onAddVendor(vendor);
      }
      setSelectedVendor(null);
  };

  const handleCreate = () => {
      const newVendor = {
          id: Math.random().toString(36).substr(2, 9),
          companyName: '',
          contactName: '',
          email: '',
          phone: '',
          category: 'General',
          status: 'Active'
      };
      setSelectedVendor(newVendor);
  };

  return (
    <div className="relative h-full">
        <VendorsList 
            vendors={vendors} 
            onAddClick={handleCreate} 
            onSelect={setSelectedVendor}
        />
        {selectedVendor && (
            <VendorDetailView 
                vendor={selectedVendor}
                onBack={() => setSelectedVendor(null)}
                onSave={handleSave}
            />
        )}
    </div>
  );
};

export default VendorsPage;

