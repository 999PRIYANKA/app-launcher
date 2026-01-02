import React, { useState } from 'react';
import LeasesList from '../components/leases/LeasesList';
import LeaseDetailView from '../components/leases/LeaseDetailView';
import RecordTypeModal from '../components/leases/RecordTypeModal';

const LeasesPage = ({ leases, properties = [], evictions = [], onAddLease, onUpdateLease }) => {
  const [selectedLease, setSelectedLease] = useState(null);
  const [showRecordTypeModal, setShowRecordTypeModal] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const handleAddLeaseClick = () => {
    setShowRecordTypeModal(true);
  };

  const handleRecordTypeSelect = (type) => {
    setShowRecordTypeModal(false);
    if (type === 'Residential Lease') {
        const newLease = {
            id: Math.random().toString(36).substr(2, 9),
            property: '',
            tenant: '',
            status: 'Draft',
            startDate: '',
            endDate: '',
            amount: 0,
            type: 'New',
            paymentFrequency: 'Monthly'
        };
        setSelectedLease(newLease);
        setIsCreating(true);
    }
  };

  const handleSaveLease = (leaseData) => {
    if (isCreating) {
        onAddLease(leaseData);
    } else {
        onUpdateLease(leaseData);
    }
    setSelectedLease(null);
    setIsCreating(false);
  };

  const handleSelectLease = (lease) => {
      setSelectedLease(lease);
      setIsCreating(false);
  };

  return (
    <div className="relative h-full">
        <LeasesList 
          leases={leases} 
          onAddLeaseClick={handleAddLeaseClick}
          onSelectLease={handleSelectLease} 
        />
        
        {showRecordTypeModal && (
            <RecordTypeModal 
                onClose={() => setShowRecordTypeModal(false)}
                onSelect={handleRecordTypeSelect}
            />
        )}

        {selectedLease && (
            <LeaseDetailView 
                lease={selectedLease}
                properties={properties}
                evictions={evictions}
                onBack={() => setSelectedLease(null)}
                onSave={handleSaveLease}
            />
        )}
    </div>
  );
};

export default LeasesPage;

