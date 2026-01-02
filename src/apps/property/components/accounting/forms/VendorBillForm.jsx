import React, { useState } from 'react';

const VendorBillForm = ({ properties = [], onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    property: '',
    vendor: '',
    category: '',
    amount: '',
    description: ''
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Date *</label>
        <input type="date" value={formData.date} onChange={(e) => handleChange('date', e.target.value)} className="w-full p-2 border rounded-md" required />
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Property *</label>
        <select value={formData.property} onChange={(e) => handleChange('property', e.target.value)} className="w-full p-2 border rounded-md bg-white" required>
          <option value="">Select Property</option>
          {properties.map(p => <option key={p.id} value={p.propertyName}>{p.propertyName}</option>)}
        </select>
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Vendor *</label>
        <input type="text" value={formData.vendor} onChange={(e) => handleChange('vendor', e.target.value)} className="w-full p-2 border rounded-md" required />
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Category</label>
        <select value={formData.category} onChange={(e) => handleChange('category', e.target.value)} className="w-full p-2 border rounded-md bg-white">
          <option value="">Select</option>
          <option>Maintenance</option>
          <option>Utilities</option>
          <option>Services</option>
          <option>Other</option>
        </select>
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Amount *</label>
        <div className="relative"><span className="absolute left-3 top-2 text-gray-500">$</span>
        <input type="number" step="0.01" value={formData.amount} onChange={(e) => handleChange('amount', e.target.value)} className="w-full p-2 pl-6 border rounded-md" required />
        </div>
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Description</label>
        <textarea value={formData.description} onChange={(e) => handleChange('description', e.target.value)} className="w-full p-2 border rounded-md" rows={3}></textarea>
      </div>
      <div className="flex justify-end space-x-3 pt-4">
        <button type="button" onClick={onCancel} className="px-4 py-2 border rounded-md text-sm">Cancel</button>
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm">Save</button>
      </div>
    </form>
  );
};

export default VendorBillForm;

