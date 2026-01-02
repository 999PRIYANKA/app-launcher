import React, { useState, useEffect } from 'react';
import RecordDetail from '../../../../components/common/RecordDetail';
import RecordSection from '../../../../components/common/RecordSection';

const HOADetailView = ({ account, properties, onBack, onSave }) => {
  const [formData, setFormData] = useState(account);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setFormData(account);
  }, [account]);

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
      if (!formData.associationName) newErrors.associationName = 'Association name is required';

      if (Object.keys(newErrors).length > 0) {
          setErrors(newErrors);
          return;
      }
      onSave(formData);
  };

  const isNew = !account.id || account.id.startsWith('new');

  return (
    <RecordDetail
        title={isNew ? 'New HOA Account' : formData.associationName}
        subtitle={properties.find(p => p.id === formData.propertyId)?.propertyName}
        onClose={onBack}
        onSave={handleSave}
        status={formData.lienFiled ? 'Lien Filed' : (formData.isDelinquent ? 'Delinquent' : 'Current')}
    >
        <RecordSection title="Association Details">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Property *</label>
                    <select 
                        value={formData.propertyId || ''} 
                        onChange={e => handleChange('propertyId', e.target.value)}
                        className={`w-full p-2 border rounded-md bg-white focus:ring-1 focus:ring-blue-500 outline-none ${errors.propertyId ? 'border-red-500' : 'border-gray-300'}`}
                        disabled={!isNew && !!account.propertyId}
                    >
                        <option value="">Select Property</option>
                        {properties.map(p => <option key={p.id} value={p.id}>{p.propertyName}</option>)}
                    </select>
                    {errors.propertyId && <p className="text-xs text-red-500 mt-1">{errors.propertyId}</p>}
                </div>
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Association Name *</label>
                    <input 
                        type="text" 
                        value={formData.associationName || ''} 
                        onChange={e => handleChange('associationName', e.target.value)} 
                        className={`w-full p-2 border rounded-md focus:ring-1 focus:ring-blue-500 outline-none ${errors.associationName ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.associationName && <p className="text-xs text-red-500 mt-1">{errors.associationName}</p>}
                </div>
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Includes Utilities?</label>
                    <input 
                        type="text" 
                        value={formData.includesUtilities || ''} 
                        onChange={e => handleChange('includesUtilities', e.target.value)} 
                        placeholder="e.g. Water, Trash"
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 outline-none" 
                    />
                </div>
            </div>
        </RecordSection>

        <RecordSection title="Dues & Payment">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Dues Amount</label>
                    <div className="relative">
                        <span className="absolute left-3 top-2 text-gray-500">$</span>
                        <input 
                            type="number" 
                            value={formData.hoaDuesAmount || ''} 
                            onChange={e => handleChange('hoaDuesAmount', parseFloat(e.target.value))} 
                            className="w-full p-2 pl-6 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 outline-none" 
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Frequency</label>
                    <select 
                        value={formData.hoaDuesFrequency || 'Monthly'} 
                        onChange={e => handleChange('hoaDuesFrequency', e.target.value)} 
                        className="w-full p-2 border rounded-md bg-white focus:ring-1 focus:ring-blue-500 outline-none"
                    >
                        <option value="Monthly">Monthly</option>
                        <option value="Quarterly">Quarterly</option>
                        <option value="Annually">Annually</option>
                    </select>
                </div>
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Next Due Date</label>
                    <input 
                        type="date" 
                        value={formData.nextDuesDueDate || ''} 
                        onChange={e => handleChange('nextDuesDueDate', e.target.value)} 
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 outline-none" 
                    />
                </div>
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Paid By</label>
                    <select 
                        value={formData.hoaDuesPaidBy || 'Owner'} 
                        onChange={e => handleChange('hoaDuesPaidBy', e.target.value)} 
                        className="w-full p-2 border rounded-md bg-white focus:ring-1 focus:ring-blue-500 outline-none"
                    >
                        <option value="Owner">Owner (Direct)</option>
                        <option value="Manager">Property Manager</option>
                        <option value="Tenant">Tenant</option>
                    </select>
                </div>
            </div>
        </RecordSection>

        <RecordSection title="Status">
            <div className="flex flex-col space-y-4">
                <div className="flex items-center">
                    <input 
                        type="checkbox" 
                        checked={formData.isDelinquent || false} 
                        onChange={e => handleChange('isDelinquent', e.target.checked)} 
                        className="h-4 w-4 text-orange-600 rounded mr-2" 
                    />
                    <label className="text-sm font-medium text-gray-700">Account is Delinquent</label>
                </div>
                <div className="flex items-center">
                    <input 
                        type="checkbox" 
                        checked={formData.lienFiled || false} 
                        onChange={e => handleChange('lienFiled', e.target.checked)} 
                        className="h-4 w-4 text-red-600 rounded mr-2" 
                    />
                    <label className="text-sm font-medium text-gray-700">Lien Filed on Property</label>
                </div>
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Current Balance Due</label>
                    <div className="relative">
                        <span className="absolute left-3 top-2 text-gray-500">$</span>
                        <input 
                            type="number" 
                            value={formData.currentBalance || ''} 
                            onChange={e => handleChange('currentBalance', parseFloat(e.target.value))} 
                            className="w-full p-2 pl-6 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 outline-none" 
                        />
                    </div>
                </div>
            </div>
        </RecordSection>

        <RecordSection title="Management Contact">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Management Company</label>
                    <input 
                        type="text" 
                        value={formData.managementCompanyName || ''} 
                        onChange={e => handleChange('managementCompanyName', e.target.value)} 
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 outline-none" 
                    />
                </div>
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Phone</label>
                    <input 
                        type="tel" 
                        value={formData.contactPhone || ''} 
                        onChange={e => handleChange('contactPhone', e.target.value)} 
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 outline-none" 
                    />
                </div>
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Email</label>
                    <input 
                        type="email" 
                        value={formData.contactEmail || ''} 
                        onChange={e => handleChange('contactEmail', e.target.value)} 
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 outline-none" 
                    />
                </div>
                <div className="md:col-span-2">
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Portal URL</label>
                    <input 
                        type="url" 
                        value={formData.portalUrl || ''} 
                        onChange={e => handleChange('portalUrl', e.target.value)} 
                        placeholder="https://"
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 outline-none" 
                    />
                </div>
            </div>
        </RecordSection>
    </RecordDetail>
  );
};

export default HOADetailView;
