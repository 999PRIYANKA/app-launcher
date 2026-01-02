import React, { useState } from 'react';
import BankAccountList from '../components/accounting/Banking/BankAccountList';
import BankAccountDetailView from '../components/accounting/Banking/BankAccountDetailView';

const BankingPage = () => {
  const [accounts, setAccounts] = useState([
      { 
          id: '1', 
          accountName: 'Operating Checking', 
          accountNumber: '****1234', 
          bankName: 'Chase', 
          type: 'Checking', 
          currentBalance: 15450, 
          glAccountId: '1000'
      }
  ]);
  const [selectedAccount, setSelectedAccount] = useState(null);

  return (
    <div className="relative h-full flex flex-col">
       <div className="bg-white border-b px-6 py-4">
          <h2 className="text-xl font-semibold text-gray-800">Banking</h2>
      </div>
      <div className="flex-1 overflow-hidden relative">
          <BankAccountList 
            accounts={accounts}
            onAddClick={() => {
                const newAcct = { 
                    id: Math.random().toString(36).substr(2, 9), 
                    accountName: 'New Account', 
                    accountNumber: '', 
                    bankName: '', 
                    type: 'Checking', 
                    currentBalance: 0, 
                    glAccountId: ''
                };
                setSelectedAccount(newAcct);
            }}
            onSelect={setSelectedAccount}
          />
          {selectedAccount && (
            <BankAccountDetailView 
                account={selectedAccount}
                onBack={() => setSelectedAccount(null)}
                onSave={(acc) => {
                     const idx = accounts.findIndex(x => x.id === acc.id);
                     if (idx >= 0) {
                         const updated = [...accounts];
                         updated[idx] = acc;
                         setAccounts(updated);
                     } else {
                         setAccounts([...accounts, acc]);
                     }
                     setSelectedAccount(null);
                }}
            />
          )}
      </div>
    </div>
  );
};

export default BankingPage;

