import React, { useState, useEffect } from 'react';
import RecordDetail from '../../../../components/common/RecordDetail';
import RecordSection from '../../../../components/common/RecordSection';

const InsuranceDetailView = ({ policy, properties, onBack, onSave }) => {
  const [formData, setFormData] = useState(policy);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setFormData(policy);
  }, [policy]);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
        setErrors(prev => {
            const newErrors = { ...prev };
            delete newErrors[field];
            return newErrors;
        });
    }
  };

  const handleSave = () => {
      const newErrors = {};
      if (!formData.propertyId) newErrors.propertyId = 'Property is required';
      if (!formData.carrierName) newErrors.carrierName = 'Carrier name is required';

      if (Object.keys(newErrors).length > 0) {
          setErrors(newErrors);
          return;
      }
      onSave(formData);
  };

  const isNew = !policy.id || policy.id.startsWith('new');

  return (
    <RecordDetail
        title={isNew ? 'New Policy' : formData.carrierName}
        subtitle={properties.find(p => p.id === formData.propertyId)?.propertyName}
        onClose={onBack}
        onSave={handleSave}
        status={formData.isPolicyActive ? 'Active' : 'Inactive'}
    >
        <RecordSection title="Policy Information">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Property *</label>
                    <select 
                        value={formData.propertyId || ''} 
                        onChange={e => handleChange('propertyId', e.target.value)}
                        className={`w-full p-2 border rounded-md bg-white focus:ring-1 focus:ring-blue-500 outline-none ${errors.propertyId ? 'border-red-500' : 'border-gray-300'}`}
                        disabled={!isNew && !!policy.propertyId}
                    >
                        <option value="">Select Property</option>
                        {properties.map(p => <option key={p.id} value={p.id}>{p.propertyName}</option>)}
                    </select>
                    {errors.propertyId && <p className="text-xs text-red-500 mt-1">{errors.propertyId}</p>}
                </div>
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Carrier Name *</label>
                    <input 
                        type="text" 
                        value={formData.carrierName || ''} 
                        onChange={e => handleChange('carrierName', e.target.value)} 
                        className={`w-full p-2 border rounded-md focus:ring-1 focus:ring-blue-500 outline-none ${errors.carrierName ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.carrierName && <p className="text-xs text-red-500 mt-1">{errors.carrierName}</p>}
                </div>
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Policy Number</label>
                    <input 
                        type="text" 
                        value={formData.policyNumber || ''} 
                        onChange={e => handleChange('policyNumber', e.target.value)} 
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 outline-none" 
                    />
                </div>
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Policy Type</label>
                    <select 
                        value={formData.policyType || ''} 
                        onChange={e => handleChange('policyType', e.target.value)} 
                        className="w-full p-2 border rounded-md bg-white focus:ring-1 focus:ring-blue-500 outline-none"
                    >
                        <option value="">Select</option>
                        <option value="Homeowners">Homeowners</option>
                        <option value="Landlord">Landlord</option>
                        <option value="Flood">Flood</option>
                        <option value="Liability">Liability</option>
                        <option value="Umbrella">Umbrella</option>
                    </select>
                </div>
                <div className="flex items-center mt-6">
                    <input 
                        type="checkbox" 
                        checked={formData.isPolicyActive !== false} 
                        onChange={e => handleChange('isPolicyActive', e.target.checked)} 
                        className="h-4 w-4 text-blue-600 rounded mr-2" 
                    />
                    <label className="text-sm font-medium text-gray-700">Policy Active</label>
                </div>
                <div className="flex items-center mt-6">
                    <input 
                        type="checkbox" 
                        checked={formData.isPrimaryHazardPolicy || false} 
                        onChange={e => handleChange('isPrimaryHazardPolicy', e.target.checked)} 
                        className="h-4 w-4 text-blue-600 rounded mr-2" 
                    />
                    <label className="text-sm font-medium text-gray-700">Primary Hazard Policy?</label>
                </div>
            </div>
        </RecordSection>

        <RecordSection title="Premiums & Dates">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Annual Premium</label>
                    <div className="relative">
                        <span className="absolute left-3 top-2 text-gray-500">$</span>
                        <input 
                            type="number" 
                            value={formData.annualPremium || ''} 
                            onChange={e => handleChange('annualPremium', parseFloat(e.target.value))} 
                            className="w-full p-2 pl-6 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 outline-none" 
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Payment Frequency</label>
                    <select 
                        value={formData.billingFrequency || ''} 
                        onChange={e => handleChange('billingFrequency', e.target.value)} 
                        className="w-full p-2 border rounded-md bg-white focus:ring-1 focus:ring-blue-500 outline-none"
                    >
                        <option value="Annual">Annual</option>
                        <option value="Monthly">Monthly</option>
                        <option value="Quarterly">Quarterly</option>
                    </select>
                </div>
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Next Due Date</label>
                    <input 
                        type="date" 
                        value={formData.nextPremiumDueDate || ''} 
                        onChange={e => handleChange('nextPremiumDueDate', e.target.value)} 
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 outline-none" 
                    />
                </div>
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Start Date</label>
                    <input 
                        type="date" 
                        value={formData.policyStartDate || ''} 
                        onChange={e => handleChange('policyStartDate', e.target.value)} 
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 outline-none" 
                    />
                </div>
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">End Date</label>
                    <input 
                        type="date" 
                        value={formData.policyEndDate || ''} 
                        onChange={e => handleChange('policyEndDate', e.target.value)} 
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 outline-none" 
                    />
                </div>
            </div>
        </RecordSection>

        <RecordSection title="Coverage Limits">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Dwelling Coverage</label>
                    <div className="relative">
                        <span className="absolute left-3 top-2 text-gray-500">$</span>
                        <input 
                            type="number" 
                            value={formData.coverageAmountDwelling || ''} 
                            onChange={e => handleChange('coverageAmountDwelling', parseFloat(e.target.value))} 
                            className="w-full p-2 pl-6 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 outline-none" 
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Personal Property</label>
                    <div className="relative">
                        <span className="absolute left-3 top-2 text-gray-500">$</span>
                        <input 
                            type="number" 
                            value={formData.coverageAmountPersonalProperty || ''} 
                            onChange={e => handleChange('coverageAmountPersonalProperty', parseFloat(e.target.value))} 
                            className="w-full p-2 pl-6 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 outline-none" 
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Liability Coverage</label>
                    <div className="relative">
                        <span className="absolute left-3 top-2 text-gray-500">$</span>
                        <input 
                            type="number" 
                            value={formData.coverageAmountLiability || ''} 
                            onChange={e => handleChange('coverageAmountLiability', parseFloat(e.target.value))} 
                            className="w-full p-2 pl-6 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 outline-none" 
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Deductible</label>
                    <div className="relative">
                        <span className="absolute left-3 top-2 text-gray-500">$</span>
                        <input 
                            type="number" 
                            value={formData.deductibleAmount || ''} 
                            onChange={e => handleChange('deductibleAmount', parseFloat(e.target.value))} 
                            className="w-full p-2 pl-6 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 outline-none" 
                        />
                    </div>
                </div>
            </div>
        </RecordSection>
    </RecordDetail>
  );
};

export default InsuranceDetailView;
