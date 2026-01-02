import React, { useState, useEffect } from 'react';
import TaxRecordsList from '../components/tax/TaxRecordsList';
import TaxRecordDetailView from '../components/tax/TaxRecordDetailView';

const TaxPage = ({ 
    taxRecords, 
    properties, 
    onUpdateTaxRecord, 
    onAddTaxRecord,
    initialData
}) => {
  const [selectedRecord, setSelectedRecord] = useState(null);

  useEffect(() => {
      if (initialData && initialData.propertyId) {
          handleCreate(initialData.propertyId);
      }
  }, [initialData]);

  const handleSave = (record) => {
      const exists = taxRecords.find(r => r.id === record.id);
      if (exists) {
          onUpdateTaxRecord(record);
      } else {
          onAddTaxRecord(record);
      }
      setSelectedRecord(null);
  };

  const handleCreate = (propertyId = '') => {
      const newRecord = {
          id: `new-${Math.random().toString(36).substr(2, 5)}`,
          propertyId: propertyId,
          taxAuthorityName: '',
          taxAuthorityType: 'County',
          taxYear: new Date().getFullYear(),
          annualTaxAmount: 0,
          isEscrowed: true,
          isDelinquent: false,
      };
      setSelectedRecord(newRecord);
  };

  return (
    <div className="relative h-full">
        <TaxRecordsList 
            taxRecords={taxRecords}
            properties={properties}
            onAddClick={() => handleCreate()} 
            onSelect={setSelectedRecord}
        />
        {selectedRecord && (
            <TaxRecordDetailView 
                taxRecord={selectedRecord}
                properties={properties}
                onBack={() => setSelectedRecord(null)}
                onSave={handleSave}
            />
        )}
    </div>
  );
};

export default TaxPage;

