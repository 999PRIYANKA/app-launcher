import React, { useState, useEffect } from 'react';
import RecordDetail from '../../../../../components/common/RecordDetail';
import RecordSection from '../../../../../components/common/RecordSection';
import * as Icons from '../../../../../constants/icons';

const ARInvoiceDetailView = ({ invoice, onBack, onSave }) => {
  const [formData, setFormData] = useState(invoice);

  useEffect(() => {
    setFormData(invoice);
  }, [invoice]);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isNew = formData.invoiceNumber === 'New' || !formData.invoiceNumber;

  return (
    <RecordDetail
        title={isNew ? 'New Invoice' : `Invoice ${formData.invoiceNumber}`}
        subtitle={formData.tenantName || 'Draft'}
        onClose={onBack}
        onSave={() => onSave(formData)}
        status={formData.status}
        headerIcon={<Icons.ReceiptRefundIcon className="w-6 h-6" />}
    >
        <RecordSection title="Invoice Details">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Invoice Number</label>
                    <input 
                        type="text" 
                        value={formData.invoiceNumber || ''} 
                        onChange={e => handleChange('invoiceNumber', e.target.value)} 
                        className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none" 
                    />
                </div>
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Status</label>
                    <select 
                        value={formData.status || 'Draft'} 
                        onChange={e => handleChange('status', e.target.value)} 
                        className="w-full p-2 border border-gray-300 rounded text-sm bg-white focus:ring-1 focus:ring-blue-500 outline-none"
                    >
                        <option>Draft</option>
                        <option>Posted</option>
                        <option>Paid</option>
                        <option>Void</option>
                    </select>
                </div>
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Invoice Date</label>
                    <input 
                        type="date" 
                        value={formData.invoiceDate || ''} 
                        onChange={e => handleChange('invoiceDate', e.target.value)} 
                        className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none" 
                    />
                </div>
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Due Date</label>
                    <input 
                        type="date" 
                        value={formData.dueDate || ''} 
                        onChange={e => handleChange('dueDate', e.target.value)} 
                        className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none" 
                    />
                </div>
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Tenant</label>
                    <input 
                        type="text" 
                        value={formData.tenantName || ''} 
                        onChange={e => handleChange('tenantName', e.target.value)} 
                        className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none" 
                    />
                </div>
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Property</label>
                    <input 
                        type="text" 
                        value={formData.propertyName || ''} 
                        onChange={e => handleChange('propertyName', e.target.value)} 
                        className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none" 
                    />
                </div>
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Total Amount</label>
                    <div className="relative">
                        <span className="absolute left-3 top-2 text-gray-500">$</span>
                        <input 
                            type="number" 
                            value={formData.amount || 0} 
                            onChange={e => {
                                const amount = parseFloat(e.target.value) || 0;
                                handleChange('amount', amount);
                                // If balance hasn't been set or equals old amount, update balance too
                                if (formData.balance === formData.amount || !formData.balance) {
                                    handleChange('balance', amount);
                                }
                            }} 
                            className="w-full p-2 pl-6 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none" 
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Balance</label>
                    <div className="relative">
                        <span className="absolute left-3 top-2 text-gray-500">$</span>
                        <input 
                            type="number" 
                            value={formData.balance || 0} 
                            onChange={e => handleChange('balance', parseFloat(e.target.value) || 0)} 
                            className="w-full p-2 pl-6 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none" 
                        />
                    </div>
                </div>
            </div>
        </RecordSection>

        <RecordSection title="Invoice Lines">
             <div className="text-center py-4 text-gray-500 text-sm bg-gray-50 border rounded mb-4">
                 Line Items Table would go here...
             </div>
             <button className="text-blue-600 text-sm font-medium hover:underline flex items-center">
                 <Icons.PlusCircleIcon className="w-4 h-4 mr-1" /> Add Line Item
             </button>
        </RecordSection>
    </RecordDetail>
  );
};

export default ARInvoiceDetailView;

