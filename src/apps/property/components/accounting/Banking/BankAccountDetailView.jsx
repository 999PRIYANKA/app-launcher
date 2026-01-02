import React, { useState, useEffect } from 'react';
import RecordDetail from '../../../../../components/common/RecordDetail';
import RecordSection from '../../../../../components/common/RecordSection';
import * as Icons from '../../../../../constants/icons';

const BankAccountDetailView = ({ account, onBack, onSave }) => {
  const [formData, setFormData] = useState(account);

  useEffect(() => {
    setFormData(account);
  }, [account]);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isNew = formData.accountName === 'New Account' || !formData.accountName;

  return (
    <RecordDetail
        title={isNew ? 'New Bank Account' : formData.accountName}
        subtitle={formData.bankName || 'Draft'}
        onClose={onBack}
        onSave={() => onSave(formData)}
        headerIcon={<Icons.BankIcon className="w-6 h-6" />}
    >
        <RecordSection title="Account Info">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Account Name</label>
                    <input 
                        type="text" 
                        value={formData.accountName || ''} 
                        onChange={e => handleChange('accountName', e.target.value)} 
                        className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none" 
                    />
                </div>
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Bank Name</label>
                    <input 
                        type="text" 
                        value={formData.bankName || ''} 
                        onChange={e => handleChange('bankName', e.target.value)} 
                        className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none" 
                    />
                </div>
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Account Number (Masked)</label>
                    <input 
                        type="text" 
                        value={formData.accountNumber || ''} 
                        onChange={e => handleChange('accountNumber', e.target.value)} 
                        className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none" 
                        placeholder="****1234"
                    />
                </div>
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Type</label>
                    <select 
                        value={formData.type || 'Checking'} 
                        onChange={e => handleChange('type', e.target.value)} 
                        className="w-full p-2 border border-gray-300 rounded text-sm bg-white focus:ring-1 focus:ring-blue-500 outline-none"
                    >
                        <option>Checking</option>
                        <option>Savings</option>
                    </select>
                </div>
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Current Balance</label>
                    <div className="relative">
                        <span className="absolute left-3 top-2 text-gray-500">$</span>
                        <input 
                            type="number" 
                            value={formData.currentBalance || 0} 
                            onChange={e => handleChange('currentBalance', parseFloat(e.target.value) || 0)} 
                            className="w-full p-2 pl-6 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none" 
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">GL Account Code</label>
                    <input 
                        type="text" 
                        value={formData.glAccountId || ''} 
                        onChange={e => handleChange('glAccountId', e.target.value)} 
                        className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none" 
                        placeholder="e.g., 1000"
                    />
                </div>
            </div>
        </RecordSection>

        <RecordSection title="Transactions">
             <div className="text-center py-12 text-gray-500 bg-gray-50 rounded border">
                 <p>No recent transactions found.</p>
                 <button className="mt-2 text-blue-600 font-medium hover:underline">Import from Bank Feed</button>
             </div>
        </RecordSection>
    </RecordDetail>
  );
};

export default BankAccountDetailView;

