import React, { useState, useEffect } from 'react';
import IncomeList from '../components/income/IncomeList';
import IncomeDetailView from '../components/income/IncomeDetailView';
import IncomeEntryForm from '../components/income/IncomeEntryForm';
import * as Icons from '../../../constants/icons';

const IncomePage = ({ autoOpenCreate, onAutoOpenHandled }) => {
  const [incomes, setIncomes] = useState([
    {
      id: '1',
      date: '2025-02-01',
      category: 'Rent',
      property: '3809 Billingsley Street # a',
      payerOrPayee: 'John Doe',
      amount: 1650,
      status: 'Collected'
    },
    {
      id: '2',
      date: '2025-01-01',
      category: 'Rent',
      property: '3809 Billingsley Street # a',
      payerOrPayee: 'John Doe',
      amount: 1650,
      status: 'Collected'
    }
  ]);
  const [selectedIncome, setSelectedIncome] = useState(null);
  const [isRecordModalOpen, setIsRecordModalOpen] = useState(false);

  // Mock Property Data for Selectors
  const mockProperties = [
      { id: 'p1', propertyName: '3809 Billingsley Street # a', address: '3809 Billingsley St', propertyType: 'Residential', units: [], tags: [], contactName: '', contactEmail: '', contactPhone: '', contactAddress: '' },
      { id: 'p2', propertyName: 'Test Property 123', address: '123 Test St', propertyType: 'Residential', units: [], tags: [], contactName: '', contactEmail: '', contactPhone: '', contactAddress: '' },
  ];

  useEffect(() => {
      if (autoOpenCreate) {
          setIsRecordModalOpen(true);
          if (onAutoOpenHandled) {
              onAutoOpenHandled();
          }
      }
  }, [autoOpenCreate, onAutoOpenHandled]);

  const handleSaveIncome = (data) => {
      const newIncome = {
          id: Math.random().toString(),
          date: data.date || '',
          category: data.category || 'Rent',
          property: data.property || '',
          payerOrPayee: data.payerOrPayee || '',
          amount: data.amount || 0,
          status: 'Collected',
          paymentMethod: data.paymentMethod,
          referenceNumber: data.referenceNumber
      };
      setIncomes([newIncome, ...incomes]);
      setIsRecordModalOpen(false);
  };

  return (
    <div className="relative h-full">
        {/* Modal for Recording Income */}
        {isRecordModalOpen && (
           <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
               <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                   <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setIsRecordModalOpen(false)}></div>
                   <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                   <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full">
                       <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                           <div className="flex justify-between items-center mb-4">
                               <h3 className="text-lg leading-6 font-medium text-gray-900">Record Income</h3>
                               <button onClick={() => setIsRecordModalOpen(false)} className="text-gray-400 hover:text-gray-500">
                                   <Icons.XIcon className="h-6 w-6" />
                               </button>
                           </div>
                           <IncomeEntryForm 
                                properties={mockProperties} 
                                onSubmit={handleSaveIncome} 
                                onCancel={() => setIsRecordModalOpen(false)} 
                           />
                       </div>
                   </div>
               </div>
           </div>
       )}

        <IncomeList 
          incomes={incomes} 
          onAddIncomeClick={() => setIsRecordModalOpen(true)} 
          onSelectIncome={setSelectedIncome}
        />
        {selectedIncome && (
            <IncomeDetailView 
                income={selectedIncome}
                onBack={() => setSelectedIncome(null)}
            />
        )}
    </div>
  );
};

export default IncomePage;

