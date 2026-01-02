import React, { useState } from 'react';

const IncomeEntryForm = ({ properties = [], onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    category: 'Rent',
    property: '',
    payerOrPayee: '',
    amount: '',
    paymentMethod: '',
    referenceNumber: ''
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      amount: parseFloat(formData.amount) || 0
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Date *</label>
        <input 
          type="date" 
          value={formData.date} 
          onChange={(e) => handleChange('date', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none" 
          required
        />
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Category *</label>
        <select 
          value={formData.category} 
          onChange={(e) => handleChange('category', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded text-sm bg-white focus:ring-1 focus:ring-blue-500 outline-none"
          required
        >
          <option>Rent</option>
          <option>Late Fees</option>
          <option>Application Fees</option>
          <option>Pet Fees</option>
          <option>Other</option>
        </select>
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Property *</label>
        <select
          value={formData.property} 
          onChange={(e) => handleChange('property', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded text-sm bg-white focus:ring-1 focus:ring-blue-500 outline-none"
          required
        >
          <option value="">Select Property</option>
          {properties.map(p => (
            <option key={p.id} value={p.propertyName}>{p.propertyName}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Payer *</label>
        <input 
          type="text" 
          value={formData.payerOrPayee} 
          onChange={(e) => handleChange('payerOrPayee', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none" 
          required
        />
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Amount *</label>
        <div className="relative">
          <span className="absolute left-3 top-2 text-gray-500">$</span>
          <input 
            type="number" 
            step="0.01"
            value={formData.amount} 
            onChange={(e) => handleChange('amount', e.target.value)}
            className="w-full p-2 pl-6 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none" 
            required
          />
        </div>
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Payment Method</label>
        <select 
          value={formData.paymentMethod} 
          onChange={(e) => handleChange('paymentMethod', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded text-sm bg-white focus:ring-1 focus:ring-blue-500 outline-none"
        >
          <option value="">Select</option>
          <option>Cash</option>
          <option>Check</option>
          <option>ACH</option>
          <option>Credit Card</option>
          <option>Other</option>
        </select>
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Reference Number</label>
        <input 
          type="text" 
          value={formData.referenceNumber} 
          onChange={(e) => handleChange('referenceNumber', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none" 
        />
      </div>
      <div className="flex justify-end space-x-3 pt-4">
        <button 
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button 
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
        >
          Save Income
        </button>
      </div>
    </form>
  );
};

export default IncomeEntryForm;

