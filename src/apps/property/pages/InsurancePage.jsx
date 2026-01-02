import React, { useState, useEffect } from 'react';
import InsuranceList from '../components/insurance/InsuranceList';
import InsuranceDetailView from '../components/insurance/InsuranceDetailView';

const InsurancePage = ({ 
    policies, 
    properties, 
    onUpdateInsurance, 
    onAddInsurance,
    initialData
}) => {
  const [selectedPolicy, setSelectedPolicy] = useState(null);

  useEffect(() => {
      if (initialData && initialData.propertyId) {
          handleCreate(initialData.propertyId);
      }
  }, [initialData]);

  const handleSave = (policy) => {
      const exists = policies.find(p => p.id === policy.id);
      if (exists) {
          onUpdateInsurance(policy);
      } else {
          onAddInsurance(policy);
      }
      setSelectedPolicy(null);
  };

  const handleCreate = (propertyId = '') => {
      const newPolicy = {
          id: `new-${Math.random().toString(36).substr(2, 5)}`,
          propertyId: propertyId,
          carrierName: '',
          policyNumber: '',
          policyType: 'Homeowners',
          isPrimaryHazardPolicy: false,
          isPolicyActive: true,
          annualPremium: 0,
          billingFrequency: 'Annual',
          policyStartDate: '',
          policyEndDate: ''
      };
      setSelectedPolicy(newPolicy);
  };

  return (
    <div className="relative h-full">
        <InsuranceList 
            policies={policies}
            properties={properties}
            onAddClick={() => handleCreate()} 
            onSelect={setSelectedPolicy}
        />
        {selectedPolicy && (
            <InsuranceDetailView 
                policy={selectedPolicy}
                properties={properties}
                onBack={() => setSelectedPolicy(null)}
                onSave={handleSave}
            />
        )}
    </div>
  );
};

export default InsurancePage;

