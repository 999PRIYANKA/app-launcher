import React, { useState, useEffect } from 'react';
import HOAList from '../components/hoa/HOAList';
import HOADetailView from '../components/hoa/HOADetailView';

const HOAPage = ({ 
    hoaAccounts, 
    properties, 
    onUpdateHOA, 
    onAddHOA,
    initialData
}) => {
  const [selectedAccount, setSelectedAccount] = useState(null);

  useEffect(() => {
      if (initialData && initialData.propertyId) {
          handleCreate(initialData.propertyId);
      }
  }, [initialData]);

  const handleSave = (account) => {
      const exists = hoaAccounts.find(a => a.id === account.id);
      if (exists) {
          onUpdateHOA(account);
      } else {
          onAddHOA(account);
      }
      setSelectedAccount(null);
  };

  const handleCreate = (propertyId = '') => {
      const newAccount = {
          id: `new-${Math.random().toString(36).substr(2, 5)}`,
          propertyId: propertyId,
          associationName: '',
          hoaDuesAmount: 0,
          hoaDuesFrequency: 'Monthly',
          isDelinquent: false,
          lienFiled: false
      };
      setSelectedAccount(newAccount);
  };

  return (
    <div className="relative h-full">
        <HOAList 
            hoaAccounts={hoaAccounts}
            properties={properties}
            onAddClick={() => handleCreate()} 
            onSelect={setSelectedAccount}
        />
        {selectedAccount && (
            <HOADetailView 
                account={selectedAccount}
                properties={properties}
                onBack={() => setSelectedAccount(null)}
                onSave={handleSave}
            />
        )}
    </div>
  );
};

export default HOAPage;

