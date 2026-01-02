import React, { useState, useEffect } from 'react';
import RecordDetail from '../../../../components/common/RecordDetail';
import RecordSection from '../../../../components/common/RecordSection';

const TaxRecordDetailView = ({ taxRecord, properties, onBack, onSave }) => {
  const [formData, setFormData] = useState(taxRecord);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setFormData(taxRecord);
  }, [taxRecord]);

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
      if (!formData.taxAuthorityName) newErrors.taxAuthorityName = 'Authority name is required';
      if (!formData.taxYear) newErrors.taxYear = 'Tax Year is required';

      if (Object.keys(newErrors).length > 0) {
          setErrors(newErrors);
          return;
      }
      onSave(formData);
  };

  const isNew = !taxRecord.id || taxRecord.id.startsWith('new');

  return (
    <RecordDetail
        title={isNew ? 'New Tax Record' : formData.taxAuthorityName}
        subtitle={`${properties.find(p => p.id === formData.propertyId)?.propertyName || ''} • ${formData.taxYear || ''}`}
        onClose={onBack}
        onSave={handleSave}
        status={formData.isDelinquent ? 'Delinquent' : 'Current'}
    >
        <RecordSection title="Tax Authority & Property">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Property *</label>
                    <select 
                        value={formData.propertyId || ''} 
                        onChange={e => handleChange('propertyId', e.target.value)}
                        className={`w-full p-2 border rounded-md bg-white focus:ring-1 focus:ring-blue-500 outline-none ${errors.propertyId ? 'border-red-500' : 'border-gray-300'}`}
                        disabled={!isNew && !!taxRecord.propertyId}
                    >
                        <option value="">Select Property</option>
                        {properties.map(p => <option key={p.id} value={p.id}>{p.propertyName}</option>)}
                    </select>
                    {errors.propertyId && <p className="text-xs text-red-500 mt-1">{errors.propertyId}</p>}
                </div>
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Authority Name *</label>
                    <input 
                        type="text" 
                        value={formData.taxAuthorityName || ''} 
                        onChange={e => handleChange('taxAuthorityName', e.target.value)} 
                        className={`w-full p-2 border rounded-md focus:ring-1 focus:ring-blue-500 outline-none ${errors.taxAuthorityName ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.taxAuthorityName && <p className="text-xs text-red-500 mt-1">{errors.taxAuthorityName}</p>}
                </div>
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Authority Type</label>
                    <select 
                        value={formData.taxAuthorityType || ''} 
                        onChange={e => handleChange('taxAuthorityType', e.target.value)} 
                        className="w-full p-2 border rounded-md bg-white focus:ring-1 focus:ring-blue-500 outline-none"
                    >
                        <option value="County">County</option>
                        <option value="City">City</option>
                        <option value="School">School District</option>
                        <option value="MUD">MUD</option>
                        <option value="Special">Special District</option>
                    </select>
                </div>
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Tax Year *</label>
                    <input 
                        type="number" 
                        value={formData.taxYear || ''} 
                        onChange={e => handleChange('taxYear', parseInt(e.target.value))} 
                        className={`w-full p-2 border rounded-md focus:ring-1 focus:ring-blue-500 outline-none ${errors.taxYear ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.taxYear && <p className="text-xs text-red-500 mt-1">{errors.taxYear}</p>}
                </div>
            </div>
        </RecordSection>

        <RecordSection title="Assessments & Amounts">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Annual Tax Amount</label>
                    <div className="relative">
                        <span className="absolute left-3 top-2 text-gray-500">$</span>
                        <input 
                            type="number" 
                            value={formData.annualTaxAmount || ''} 
                            onChange={e => handleChange('annualTaxAmount', parseFloat(e.target.value))} 
                            className="w-full p-2 pl-6 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 outline-none" 
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Assessed Value</label>
                    <div className="relative">
                        <span className="absolute left-3 top-2 text-gray-500">$</span>
                        <input 
                            type="number" 
                            value={formData.assessedValue || ''} 
                            onChange={e => handleChange('assessedValue', parseFloat(e.target.value))} 
                            className="w-full p-2 pl-6 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 outline-none" 
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Taxable Value</label>
                    <div className="relative">
                        <span className="absolute left-3 top-2 text-gray-500">$</span>
                        <input 
                            type="number" 
                            value={formData.taxableValue || ''} 
                            onChange={e => handleChange('taxableValue', parseFloat(e.target.value))} 
                            className="w-full p-2 pl-6 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 outline-none" 
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Exemptions</label>
                    <input 
                        type="text" 
                        value={formData.exemptions || ''} 
                        onChange={e => handleChange('exemptions', e.target.value)} 
                        placeholder="e.g. Homestead"
                        className="w-full p-2 border rounded-md focus:ring-1 focus:ring-blue-500 outline-none" 
                    />
                </div>
            </div>
        </RecordSection>

        <RecordSection title="Payment Status">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Bill Due Date</label>
                    <input 
                        type="date" 
                        value={formData.billDueDate || ''} 
                        onChange={e => handleChange('billDueDate', e.target.value)} 
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 outline-none" 
                    />
                </div>
                <div className="flex items-center mt-6">
                    <input 
                        type="checkbox" 
                        checked={formData.isEscrowed !== false} 
                        onChange={e => handleChange('isEscrowed', e.target.checked)} 
                        className="h-4 w-4 text-blue-600 rounded mr-2" 
                    />
                    <label className="text-sm font-medium text-gray-700">Paid via Escrow?</label>
                </div>
                <div className="flex items-center mt-6">
                    <input 
                        type="checkbox" 
                        checked={formData.isDelinquent || false} 
                        onChange={e => handleChange('isDelinquent', e.target.checked)} 
                        className="h-4 w-4 text-red-600 rounded mr-2" 
                    />
                    <label className="text-sm font-medium text-gray-700">Is Delinquent?</label>
                </div>
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Last Payment Date</label>
                    <input 
                        type="date" 
                        value={formData.lastPaymentDate || ''} 
                        onChange={e => handleChange('lastPaymentDate', e.target.value)} 
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 outline-none" 
                    />
                </div>
            </div>
        </RecordSection>
    </RecordDetail>
  );
};

export default TaxRecordDetailView;
