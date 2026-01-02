import React, { useState } from 'react';

export const InsurancePaymentForm = ({ properties = [], onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    property: '',
    amount: '',
    policyNumber: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Date *</label>
        <input type="date" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} className="w-full p-2 border rounded-md" required />
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Property *</label>
        <select value={formData.property} onChange={(e) => setFormData({...formData, property: e.target.value})} className="w-full p-2 border rounded-md bg-white" required>
          <option value="">Select Property</option>
          {properties.map(p => <option key={p.id} value={p.propertyName}>{p.propertyName}</option>)}
        </select>
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Amount *</label>
        <div className="relative"><span className="absolute left-3 top-2 text-gray-500">$</span>
        <input type="number" step="0.01" value={formData.amount} onChange={(e) => setFormData({...formData, amount: e.target.value})} className="w-full p-2 pl-6 border rounded-md" required />
        </div>
      </div>
      <div className="flex justify-end space-x-3 pt-4">
        <button type="button" onClick={onCancel} className="px-4 py-2 border rounded-md text-sm">Cancel</button>
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm">Save</button>
      </div>
    </form>
  );
};

export const TaxPaymentForm = ({ properties = [], onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    property: '',
    amount: '',
    taxYear: new Date().getFullYear()
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Date *</label>
        <input type="date" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} className="w-full p-2 border rounded-md" required />
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Property *</label>
        <select value={formData.property} onChange={(e) => setFormData({...formData, property: e.target.value})} className="w-full p-2 border rounded-md bg-white" required>
          <option value="">Select Property</option>
          {properties.map(p => <option key={p.id} value={p.propertyName}>{p.propertyName}</option>)}
        </select>
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Tax Year</label>
        <input type="number" value={formData.taxYear} onChange={(e) => setFormData({...formData, taxYear: parseInt(e.target.value)})} className="w-full p-2 border rounded-md" />
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Amount *</label>
        <div className="relative"><span className="absolute left-3 top-2 text-gray-500">$</span>
        <input type="number" step="0.01" value={formData.amount} onChange={(e) => setFormData({...formData, amount: e.target.value})} className="w-full p-2 pl-6 border rounded-md" required />
        </div>
      </div>
      <div className="flex justify-end space-x-3 pt-4">
        <button type="button" onClick={onCancel} className="px-4 py-2 border rounded-md text-sm">Cancel</button>
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm">Save</button>
      </div>
    </form>
  );
};

export const HoaPaymentForm = ({ properties = [], onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    property: '',
    amount: '',
    associationName: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Date *</label>
        <input type="date" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} className="w-full p-2 border rounded-md" required />
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Property *</label>
        <select value={formData.property} onChange={(e) => setFormData({...formData, property: e.target.value})} className="w-full p-2 border rounded-md bg-white" required>
          <option value="">Select Property</option>
          {properties.map(p => <option key={p.id} value={p.propertyName}>{p.propertyName}</option>)}
        </select>
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Association Name</label>
        <input type="text" value={formData.associationName} onChange={(e) => setFormData({...formData, associationName: e.target.value})} className="w-full p-2 border rounded-md" />
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Amount *</label>
        <div className="relative"><span className="absolute left-3 top-2 text-gray-500">$</span>
        <input type="number" step="0.01" value={formData.amount} onChange={(e) => setFormData({...formData, amount: e.target.value})} className="w-full p-2 pl-6 border rounded-md" required />
        </div>
      </div>
      <div className="flex justify-end space-x-3 pt-4">
        <button type="button" onClick={onCancel} className="px-4 py-2 border rounded-md text-sm">Cancel</button>
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm">Save</button>
      </div>
    </form>
  );
};

