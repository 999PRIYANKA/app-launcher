import React, { useState, useEffect } from 'react';
import MortgagesList from '../components/mortgages/MortgagesList';
import MortgageDetailView from '../components/mortgages/MortgageDetailView';

const MortgagesPage = ({ mortgages, properties, onUpdateMortgage, onAddMortgage, initialData }) => {
  const [selectedMortgage, setSelectedMortgage] = useState(null);

  useEffect(() => {
      if (initialData && initialData.propertyId) {
          handleCreate(initialData.propertyId);
      }
  }, [initialData]);

  const handleSave = (mortgage) => {
      const exists = mortgages.find(m => m.id === mortgage.id);
      if (exists) {
          onUpdateMortgage(mortgage);
      } else {
          onAddMortgage(mortgage);
      }
      setSelectedMortgage(null);
  };

  const handleCreate = (propertyId = '') => {
      const newMortgage = {
          id: Math.random().toString(),
          propertyId: propertyId,
          lenderName: '',
          loanNumber: '',
          interestRate: 0,
          originalLoanAmount: 0,
          currentPrincipalBalance: 0,
          monthlyPaymentPI: 0,
          isDelinquent: false
      };
      setSelectedMortgage(newMortgage);
  };

  return (
    <div className="relative h-full">
        <MortgagesList 
            mortgages={mortgages}
            properties={properties}
            onAddClick={() => handleCreate()} 
            onSelect={setSelectedMortgage}
        />
        {selectedMortgage && (
            <MortgageDetailView 
                mortgage={selectedMortgage}
                properties={properties}
                onBack={() => setSelectedMortgage(null)}
                onSave={handleSave}
            />
        )}
    </div>
  );
};

export default MortgagesPage;

