import React, { useState, useEffect } from 'react';
import RecordDetail from '../../../../components/common/RecordDetail';
import RecordSection from '../../../../components/common/RecordSection';
import * as Icons from '../../../../constants/icons';

const VendorDetailView = ({ vendor, onBack, onSave }) => {
  const [formData, setFormData] = useState(vendor);

  useEffect(() => {
    setFormData(vendor);
  }, [vendor]);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isNew = !vendor.companyName;

  return (
    <RecordDetail //check
        title={isNew ? 'New Vendor' : formData.companyName}
        subtitle={formData.category}
        onClose={onBack}
        onSave={() => onSave(formData)}
        status={formData.status}
        headerIcon={<Icons.AccountIcon className="w-6 h-6" />}
    >
        <RecordSection title="Vendor Information">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Company Name</label>
                    <input 
                        type="text" 
                        value={formData.companyName || ''} 
                        onChange={e => handleChange('companyName', e.target.value)} 
                        className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none" 
                    />
                </div>
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Primary Contact</label>
                    <input 
                        type="text" 
                        value={formData.contactName || ''} 
                        onChange={e => handleChange('contactName', e.target.value)} 
                        className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none" 
                    />
                </div>
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Category</label>
                    <select 
                        value={formData.category || 'General'} 
                        onChange={e => handleChange('category', e.target.value)} 
                        className="w-full p-2 border border-gray-300 rounded text-sm bg-white focus:ring-1 focus:ring-blue-500 outline-none"
                    >
                        <option>Plumbing</option>
                        <option>Electrical</option>
                        <option>HVAC</option>
                        <option>General</option>
                        <option>Landscaping</option>
                        <option>Cleaning</option>
                        <option>Legal</option>
                    </select>
                </div>
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Status</label>
                    <select 
                        value={formData.status || 'Active'} 
                        onChange={e => handleChange('status', e.target.value)} 
                        className="w-full p-2 border border-gray-300 rounded text-sm bg-white focus:ring-1 focus:ring-blue-500 outline-none"
                    >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                        <option value="Pending">Pending</option>
                    </select>
                </div>
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Email</label>
                    <input 
                        type="email" 
                        value={formData.email || ''} 
                        onChange={e => handleChange('email', e.target.value)} 
                        className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none" 
                    />
                </div>
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Phone</label>
                    <input 
                        type="tel" 
                        value={formData.phone || ''} 
                        onChange={e => handleChange('phone', e.target.value)} 
                        className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none" 
                    />
                </div>
                <div className="col-span-2">
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Website</label>
                    <input 
                        type="url" 
                        value={formData.website || ''} 
                        onChange={e => handleChange('website', e.target.value)} 
                        className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none" 
                        placeholder="https://" 
                    />
                </div>
            </div>
        </RecordSection>

        <RecordSection title="Compliance & Tax">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Tax ID (EIN/SSN)</label>
                    <input 
                        type="text" 
                        value={formData.taxId || ''} 
                        onChange={e => handleChange('taxId', e.target.value)} 
                        className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none" 
                    />
                </div>
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Insurance Expiry</label>
                    <input 
                        type="date" 
                        value={formData.insuranceExpiry || ''} 
                        onChange={e => handleChange('insuranceExpiry', e.target.value)} 
                        className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none" 
                    />
                </div>
                <div className="col-span-2">
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Notes</label>
                    <textarea 
                        rows={4} 
                        value={formData.notes || ''} 
                        onChange={e => handleChange('notes', e.target.value)} 
                        className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none" 
                    />
                </div>
            </div>
        </RecordSection>
    </RecordDetail>
  );
};

export default VendorDetailView;

