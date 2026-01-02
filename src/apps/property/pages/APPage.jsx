import React, { useState } from 'react';
import APBillList from '../components/accounting/AP/APBillList';
import APBillDetailView from '../components/accounting/AP/APBillDetailView';
import * as Icons from '../../../constants/icons';

const APPage = () => {
  const [activeTab, setActiveTab] = useState('Bills');
  const [bills, setBills] = useState([
      { 
          id: '1', 
          billNumber: 'BILL-500', 
          vendorContactId: 'v1', 
          vendorName: 'ABC Plumbing', 
          propertyId: 'p1', 
          propertyName: '3809 Billingsley Street # a',
          billDate: '2024-03-02', 
          dueDate: '2024-03-12', 
          amount: 250, 
          balance: 250, 
          status: 'Open', 
          lines: []
      }
  ]);
  const [selectedBill, setSelectedBill] = useState(null);

  return (
    <div className="relative h-full flex flex-col">
       <div className="bg-white border-b px-6 pt-4">
        <div className="flex space-x-8">
            <button 
                className={`pb-4 text-sm font-medium border-b-2 transition-colors flex items-center ${activeTab === 'Bills' ? 'border-brand-teal text-brand-dark-blue' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                onClick={() => setActiveTab('Bills')}
            >
                <Icons.CreditCardIcon className="w-5 h-5 mr-2" />
                Bills
            </button>
            <button 
                className={`pb-4 text-sm font-medium border-b-2 transition-colors flex items-center ${activeTab === 'Payments' ? 'border-brand-teal text-brand-dark-blue' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                onClick={() => setActiveTab('Payments')}
            >
                <Icons.BanknotesIcon className="w-5 h-5 mr-2" />
                Payments
            </button>
        </div>
      </div>
      <div className="flex-1 overflow-hidden relative">
          {activeTab === 'Bills' ? (
              <>
                <APBillList 
                    bills={bills}
                    onAddClick={() => {
                        const newBill = { 
                            id: Math.random().toString(36).substr(2, 9), 
                            billNumber: 'New', 
                            status: 'Draft', 
                            billDate: '', 
                            dueDate: '', 
                            vendorContactId: '', 
                            vendorName: '', 
                            propertyId: '', 
                            propertyName: '',
                            amount: 0, 
                            balance: 0, 
                            lines: [] 
                        };
                        setSelectedBill(newBill);
                    }}
                    onSelect={setSelectedBill}
                />
                {selectedBill && (
                    <APBillDetailView 
                        bill={selectedBill}
                        onBack={() => setSelectedBill(null)}
                        onSave={(b) => {
                             const idx = bills.findIndex(x => x.id === b.id);
                             if (idx >= 0) {
                                 const updated = [...bills];
                                 updated[idx] = b;
                                 setBills(updated);
                             } else {
                                 setBills([...bills, b]);
                             }
                             setSelectedBill(null);
                        }}
                    />
                )}
              </>
          ) : (
             <div className="p-10 text-center text-gray-500">Bill Payments List View (Not Implemented in Demo)</div>
          )}
      </div>
    </div>
  );
};

export default APPage;

