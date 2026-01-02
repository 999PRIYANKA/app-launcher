import React, { useState } from 'react';
import RecordDetail from '../../../../components/common/RecordDetail';
import RecordSection from '../../../../components/common/RecordSection';

const MortgageDetailView = ({ mortgage, properties, onBack, onSave }) => {
  const [formData, setFormData] = useState(mortgage);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <RecordDetail
        title={formData.lenderName || 'New Mortgage'}
        subtitle={properties.find(p => p.id === formData.propertyId)?.propertyName}
        onClose={onBack}
        onSave={() => onSave(formData)}
        status={formData.isDelinquent ? 'Delinquent' : 'Current'}
    >
        <RecordSection title="Loan Details">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Property *</label>
                    <select 
                        value={formData.propertyId || ''} 
                        onChange={e => handleChange('propertyId', e.target.value)}
                        className="w-full p-2 border rounded-md bg-white focus:ring-1 focus:ring-blue-500 outline-none"
                    >
                        <option value="">Select Property</option>
                        {properties.map(p => <option key={p.id} value={p.id}>{p.propertyName}</option>)}
                    </select>
                </div>
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Lender Name *</label>
                    <input type="text" value={formData.lenderName || ''} onChange={e => handleChange('lenderName', e.target.value)} className="w-full p-2 border rounded-md focus:ring-1 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Loan Number</label>
                    <input type="text" value={formData.loanNumber || ''} onChange={e => handleChange('loanNumber', e.target.value)} className="w-full p-2 border rounded-md focus:ring-1 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Interest Rate (%)</label>
                    <input type="number" step="0.01" value={formData.interestRate || ''} onChange={e => handleChange('interestRate', parseFloat(e.target.value))} className="w-full p-2 border rounded-md focus:ring-1 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Original Loan Amount</label>
                    <div className="relative"><span className="absolute left-3 top-2 text-gray-500">$</span>
                    <input type="number" value={formData.originalLoanAmount || ''} onChange={e => handleChange('originalLoanAmount', parseFloat(e.target.value))} className="w-full p-2 pl-6 border rounded-md focus:ring-1 focus:ring-blue-500 outline-none" />
                    </div>
                </div>
            </div>
        </RecordSection>

        <RecordSection title="Payments & Balance">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Current Principal Balance</label>
                    <div className="relative"><span className="absolute left-3 top-2 text-gray-500">$</span>
                    <input type="number" value={formData.currentPrincipalBalance || ''} onChange={e => handleChange('currentPrincipalBalance', parseFloat(e.target.value))} className="w-full p-2 pl-6 border rounded-md focus:ring-1 focus:ring-blue-500 outline-none" />
                    </div>
                </div>
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Monthly P&I</label>
                    <div className="relative"><span className="absolute left-3 top-2 text-gray-500">$</span>
                    <input type="number" value={formData.monthlyPaymentPI || ''} onChange={e => handleChange('monthlyPaymentPI', parseFloat(e.target.value))} className="w-full p-2 pl-6 border rounded-md focus:ring-1 focus:ring-blue-500 outline-none" />
                    </div>
                </div>
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Payment Due Day (1-31)</label>
                    <input type="number" min="1" max="31" value={formData.paymentDueDayOfMonth || ''} onChange={e => handleChange('paymentDueDayOfMonth', parseInt(e.target.value))} className="w-full p-2 border rounded-md focus:ring-1 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Next Payment Due</label>
                    <input type="date" value={formData.nextPaymentDueDate || ''} onChange={e => handleChange('nextPaymentDueDate', e.target.value)} className="w-full p-2 border rounded-md focus:ring-1 focus:ring-blue-500 outline-none" />
                </div>
            </div>
        </RecordSection>

        <RecordSection title="Dates & Status">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Loan Start Date</label>
                    <input type="date" value={formData.loanStartDate || ''} onChange={e => handleChange('loanStartDate', e.target.value)} className="w-full p-2 border rounded-md focus:ring-1 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Maturity Date</label>
                    <input type="date" value={formData.maturityDate || ''} onChange={e => handleChange('maturityDate', e.target.value)} className="w-full p-2 border rounded-md focus:ring-1 focus:ring-blue-500 outline-none" />
                </div>
                <div className="col-span-2 flex items-center mt-2">
                    <input type="checkbox" checked={formData.isDelinquent || false} onChange={e => handleChange('isDelinquent', e.target.checked)} className="h-4 w-4 text-red-600 rounded border-gray-300" />
                    <label className="ml-2 text-sm font-medium text-gray-700">Is Delinquent?</label>
                </div>
            </div>
        </RecordSection>
    </RecordDetail>
  );
};

export default MortgageDetailView;
