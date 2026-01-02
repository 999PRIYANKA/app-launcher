import React, { useState, useEffect } from 'react';
import RecordDetail from '../../../../../components/common/RecordDetail';
import RecordSection from '../../../../../components/common/RecordSection';

const ChartOfAccountDetailView = ({ account, onBack, onSave }) => {
  const [formData, setFormData] = useState(account);

  useEffect(() => {
    setFormData(account);
  }, [account]);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <RecordDetail
        title={formData.name || 'New Account'}
        subtitle={`Account Code: ${formData.accountCode || 'New'}`}
        onClose={onBack}
        onSave={() => onSave && onSave(formData)}
        status={formData.isActive ? 'Active' : 'Inactive'}
    >
        <RecordSection title="Account Information">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Account Code *</label>
                    <input 
                        type="text" 
                        value={formData.accountCode || ''} 
                        onChange={(e) => handleChange('accountCode', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none" 
                        required
                    />
                </div>
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Account Name *</label>
                    <input 
                        type="text" 
                        value={formData.name || ''} 
                        onChange={(e) => handleChange('name', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none" 
                        required
                    />
                </div>
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Type *</label>
                    <select 
                        value={formData.type || ''} 
                        onChange={(e) => handleChange('type', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded text-sm bg-white focus:ring-1 focus:ring-blue-500 outline-none"
                        required
                    >
                        <option value="">Select Type</option>
                        <option>Asset</option>
                        <option>Liability</option>
                        <option>Equity</option>
                        <option>Income</option>
                        <option>Expense</option>
                    </select>
                </div>
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Sub Type</label>
                    <input 
                        type="text" 
                        value={formData.subType || ''} 
                        onChange={(e) => handleChange('subType', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none" 
                    />
                </div>
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Normal Balance *</label>
                    <select 
                        value={formData.normalBalance || ''} 
                        onChange={(e) => handleChange('normalBalance', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded text-sm bg-white focus:ring-1 focus:ring-blue-500 outline-none"
                        required
                    >
                        <option value="">Select</option>
                        <option>Debit</option>
                        <option>Credit</option>
                    </select>
                </div>
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Statement Group *</label>
                    <select 
                        value={formData.statementGroup || ''} 
                        onChange={(e) => handleChange('statementGroup', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded text-sm bg-white focus:ring-1 focus:ring-blue-500 outline-none"
                        required
                    >
                        <option value="">Select</option>
                        <option>BalanceSheet</option>
                        <option>ProfitAndLoss</option>
                    </select>
                </div>
                <div className="flex items-center mt-6">
                    <input 
                        type="checkbox" 
                        checked={formData.isActive !== false} 
                        onChange={(e) => handleChange('isActive', e.target.checked)}
                        className="h-4 w-4 text-blue-600 rounded mr-2" 
                    />
                    <label className="text-sm font-medium text-gray-700">Account is Active</label>
                </div>
            </div>
        </RecordSection>
    </RecordDetail>
  );
};

export default ChartOfAccountDetailView;

