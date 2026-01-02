import React, { useState, useEffect } from 'react';
import ExpensesList from '../components/expenses/ExpensesList';
import ExpenseDetailView from '../components/expenses/ExpenseDetailView';
import * as Icons from '../../../constants/icons';
import MortgagePaymentForm from '../components/accounting/forms/MortgagePaymentForm';
import VendorBillForm from '../components/accounting/forms/VendorBillForm';
import { InsurancePaymentForm, TaxPaymentForm, HoaPaymentForm } from '../components/accounting/forms/SimplePaymentForms';

const ExpensesPage = ({ autoOpenCreate, onAutoOpenHandled }) => {
  const [expenses, setExpenses] = useState([
    {
      id: '1',
      date: '2025-02-05',
      category: 'Maintenance',
      property: '3809 Billingsley Street # a',
      payerOrPayee: 'FixIt Pros',
      amount: 150,
      status: 'Paid'
    }
  ]);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [isRecordModalOpen, setIsRecordModalOpen] = useState(false);
  const [recordType, setRecordType] = useState(null);

  useEffect(() => {
      if (autoOpenCreate) {
          setIsRecordModalOpen(true);
          if (onAutoOpenHandled) {
              onAutoOpenHandled();
          }
      }
  }, [autoOpenCreate, onAutoOpenHandled]);

  const mockProperties = [
      { id: 'p1', propertyName: '3809 Billingsley Street # a', address: '3809 Billingsley St', propertyType: 'Residential', units: [], tags: [], contactName: '', contactEmail: '', contactPhone: '', contactAddress: '' },
      { id: 'p2', propertyName: 'Test Property 123', address: '123 Test St', propertyType: 'Residential', units: [], tags: [], contactName: '', contactEmail: '', contactPhone: '', contactAddress: '' },
  ];

  const handleSaveEntry = (data) => {
      console.log('Saved Entry Data:', data);
      setIsRecordModalOpen(false);
      setRecordType(null);
  };

  return (
    <div className="relative h-full flex flex-col">
       {isRecordModalOpen && (
           <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
               <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                   <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setIsRecordModalOpen(false)}></div>
                   <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                   <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
                       <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                           <div className="flex justify-between items-center mb-4">
                               <h3 className="text-lg leading-6 font-medium text-gray-900">Record Expense</h3>
                               <button onClick={() => setIsRecordModalOpen(false)} className="text-gray-400 hover:text-gray-500">
                                   <Icons.XIcon className="h-6 w-6" />
                                </button>
                           </div>

                           {!recordType ? (
                               <div className="grid grid-cols-2 gap-4">
                                   <button onClick={() => setRecordType('VendorBill')} className="p-4 border rounded-lg hover:bg-blue-50 flex flex-col items-center justify-center space-y-2 text-center group">
                                       <div className="p-2 bg-blue-100 rounded-full text-blue-600 group-hover:bg-blue-200 transition-colors"><Icons.ExpensesIcon className="w-6 h-6"/></div>
                                       <span className="font-medium text-gray-900">Vendor Bill</span>
                                       <span className="text-xs text-gray-500">Repairs, Utilities, Services</span>
                                   </button>
                                   <button onClick={() => setRecordType('Mortgage')} className="p-4 border rounded-lg hover:bg-green-50 flex flex-col items-center justify-center space-y-2 text-center group">
                                       <div className="p-2 bg-green-100 rounded-full text-green-600 group-hover:bg-green-200 transition-colors"><Icons.BankIcon className="w-6 h-6"/></div>
                                       <span className="font-medium text-gray-900">Mortgage Payment</span>
                                       <span className="text-xs text-gray-500">Principal, Interest, Escrow</span>
                                   </button>
                                   <button onClick={() => setRecordType('Insurance')} className="p-4 border rounded-lg hover:bg-yellow-50 flex flex-col items-center justify-center space-y-2 text-center group">
                                       <div className="p-2 bg-yellow-100 rounded-full text-yellow-600 group-hover:bg-yellow-200 transition-colors"><Icons.ClipboardCheckIcon className="w-6 h-6"/></div>
                                       <span className="font-medium text-gray-900">Insurance</span>
                                       <span className="text-xs text-gray-500">Property Insurance Premiums</span>
                                   </button>
                                   <button onClick={() => setRecordType('Tax')} className="p-4 border rounded-lg hover:bg-purple-50 flex flex-col items-center justify-center space-y-2 text-center group">
                                       <div className="p-2 bg-purple-100 rounded-full text-purple-600 group-hover:bg-purple-200 transition-colors"><Icons.BuildingOfficeIcon className="w-6 h-6"/></div>
                                       <span className="font-medium text-gray-900">Property Tax</span>
                                       <span className="text-xs text-gray-500">County/State Taxes</span>
                                   </button>
                                   <button onClick={() => setRecordType('HOA')} className="p-4 border rounded-lg hover:bg-orange-50 flex flex-col items-center justify-center space-y-2 text-center group">
                                       <div className="p-2 bg-orange-100 rounded-full text-orange-600 group-hover:bg-orange-200 transition-colors"><Icons.PropertiesIcon className="w-6 h-6"/></div>
                                       <span className="font-medium text-gray-900">HOA Dues</span>
                                       <span className="text-xs text-gray-500">Association Fees</span>
                                   </button>
                               </div>
                           ) : (
                               <div>
                                   <button onClick={() => setRecordType(null)} className="mb-4 text-sm text-blue-600 hover:underline flex items-center">
                                       <Icons.ArrowLeftIcon className="w-4 h-4 mr-1"/> Back to Types
                                   </button>
                                   
                                   {recordType === 'Mortgage' && <MortgagePaymentForm properties={mockProperties} onSubmit={handleSaveEntry} onCancel={() => setIsRecordModalOpen(false)} />}
                                   {recordType === 'VendorBill' && <VendorBillForm properties={mockProperties} onSubmit={handleSaveEntry} onCancel={() => setIsRecordModalOpen(false)} />}
                                   {recordType === 'Insurance' && <InsurancePaymentForm properties={mockProperties} onSubmit={handleSaveEntry} onCancel={() => setIsRecordModalOpen(false)} />}
                                   {recordType === 'Tax' && <TaxPaymentForm properties={mockProperties} onSubmit={handleSaveEntry} onCancel={() => setIsRecordModalOpen(false)} />}
                                   {recordType === 'HOA' && <HoaPaymentForm properties={mockProperties} onSubmit={handleSaveEntry} onCancel={() => setIsRecordModalOpen(false)} />}
                               </div>
                           )}
                       </div>
                   </div>
               </div>
           </div>
       )}

        <ExpensesList 
          expenses={expenses} 
          onAddExpenseClick={() => setIsRecordModalOpen(true)} 
          onSelectExpense={setSelectedExpense}
        />
        {selectedExpense && (
            <ExpenseDetailView 
                expense={selectedExpense}
                onBack={() => setSelectedExpense(null)}
            />
        )}
    </div>
  );
};

export default ExpensesPage;

