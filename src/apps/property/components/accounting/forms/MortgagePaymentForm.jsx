import React, { useState } from 'react';

const MortgagePaymentForm = ({ properties = [], onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    property: '',
    mortgageId: '',
    principal: '',
    interest: '',
    escrow: '',
    total: ''
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
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Principal</label>
        <div className="relative"><span className="absolute left-3 top-2 text-gray-500">$</span>
        <input type="number" value={formData.principal} onChange={(e) => handleChange('principal', e.target.value)} className="w-full p-2 pl-6 border rounded-md" />
        </div>
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Interest</label>
        <div className="relative"><span className="absolute left-3 top-2 text-gray-500">$</span>
        <input type="number" value={formData.interest} onChange={(e) => handleChange('interest', e.target.value)} className="w-full p-2 pl-6 border rounded-md" />
        </div>
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Escrow</label>
        <div className="relative"><span className="absolute left-3 top-2 text-gray-500">$</span>
        <input type="number" value={formData.escrow} onChange={(e) => handleChange('escrow', e.target.value)} className="w-full p-2 pl-6 border rounded-md" />
        </div>
      </div>
      <div className="flex justify-end space-x-3 pt-4">
        <button type="button" onClick={onCancel} className="px-4 py-2 border rounded-md text-sm">Cancel</button>
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm">Save</button>
      </div>
    </form>
  );
};

export default MortgagePaymentForm;

