import React, { useState } from 'react';
import ARInvoiceList from '../components/accounting/AR/ARInvoiceList';
import ARInvoiceDetailView from '../components/accounting/AR/ARInvoiceDetailView';
import * as Icons from '../../../constants/icons';

const ARPage = () => {
  const [activeTab, setActiveTab] = useState('Invoices');

  const [invoices, setInvoices] = useState([
      { 
          id: '1', 
          invoiceNumber: 'INV-1001', 
          status: 'Posted', 
          invoiceDate: '2024-03-01', 
          dueDate: '2024-03-05', 
          tenantContactId: 't1', 
          tenantName: 'John Doe', 
          propertyId: 'p1', 
          propertyName: '3809 Billingsley Street # a',
          amount: 1500, 
          balance: 1500, 
          lines: []
      }
  ]);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  return (
    <div className="relative h-full flex flex-col">
       <div className="bg-white border-b px-6 pt-4">
        <div className="flex space-x-8">
            <button 
                className={`pb-4 text-sm font-medium border-b-2 transition-colors flex items-center ${activeTab === 'Invoices' ? 'border-brand-teal text-brand-dark-blue' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                onClick={() => setActiveTab('Invoices')}
            >
                <Icons.ReceiptRefundIcon className="w-5 h-5 mr-2" />
                Invoices
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
          {activeTab === 'Invoices' ? (
              <>
                <ARInvoiceList 
                    invoices={invoices}
                    onAddClick={() => {
                        const newInv = { 
                            id: Math.random().toString(36).substr(2, 9), 
                            invoiceNumber: 'New', 
                            status: 'Draft', 
                            invoiceDate: '', 
                            dueDate: '', 
                            tenantContactId: '', 
                            tenantName: '', 
                            propertyId: '', 
                            propertyName: '',
                            amount: 0, 
                            balance: 0, 
                            lines: [] 
                        };
                        setSelectedInvoice(newInv);
                    }}
                    onSelect={setSelectedInvoice}
                />
                {selectedInvoice && (
                    <ARInvoiceDetailView 
                        invoice={selectedInvoice}
                        onBack={() => setSelectedInvoice(null)}
                        onSave={(inv) => {
                             const idx = invoices.findIndex(i => i.id === inv.id);
                             if (idx >= 0) {
                                 const updated = [...invoices];
                                 updated[idx] = inv;
                                 setInvoices(updated);
                             } else {
                                 setInvoices([...invoices, inv]);
                             }
                             setSelectedInvoice(null);
                        }}
                    />
                )}
              </>
          ) : (
              <div className="p-10 text-center text-gray-500">Payments List View (Not Implemented in Demo)</div>
          )}
      </div>
    </div>
  );
};

export default ARPage;

