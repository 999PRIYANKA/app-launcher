import React, { useState, useEffect } from 'react';
import RecordDetail from '../../../../../components/common/RecordDetail';
import RecordSection from '../../../../../components/common/RecordSection';
import * as Icons from '../../../../../constants/icons';

const OwnerDrawDetailView = ({ draw, onBack, onSave }) => {
  const [formData, setFormData] = useState(draw);

  useEffect(() => {
    setFormData(draw);
  }, [draw]);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isNew = formData.drawNumber === 'New' || !formData.drawNumber;

  return (
    <RecordDetail
        title={isNew ? 'New Owner Draw' : `Draw ${formData.drawNumber}`}
        subtitle={formData.ownerName || 'Draft'}
        onClose={onBack}
        onSave={() => onSave(formData)}
        status={formData.status}
        headerIcon={<Icons.BanknotesIcon className="w-6 h-6" />}
    >
        <RecordSection title="Draw Details">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Draw Number</label>
                    <input 
                        type="text" 
                        value={formData.drawNumber || ''} 
                        onChange={e => handleChange('drawNumber', e.target.value)} 
                        className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none" 
                    />
                </div>
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Status</label>
                    <select 
                        value={formData.status || 'Draft'} 
                        onChange={e => handleChange('status', e.target.value)} 
                        className="w-full p-2 border border-gray-300 rounded text-sm bg-white focus:ring-1 focus:ring-blue-500 outline-none"
                    >
                        <option>Draft</option>
                        <option>Posted</option>
                        <option>Paid</option>
                    </select>
                </div>
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Date</label>
                    <input 
                        type="date" 
                        value={formData.date || ''} 
                        onChange={e => handleChange('date', e.target.value)} 
                        className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none" 
                    />
                </div>
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Owner Entity</label>
                    <input 
                        type="text" 
                        value={formData.ownerName || ''} 
                        onChange={e => handleChange('ownerName', e.target.value)} 
                        className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none" 
                    />
                </div>
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Amount</label>
                    <div className="relative">
                        <span className="absolute left-3 top-2 text-gray-500">$</span>
                        <input 
                            type="number" 
                            value={formData.amount || 0} 
                            onChange={e => handleChange('amount', parseFloat(e.target.value) || 0)} 
                            className="w-full p-2 pl-6 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none" 
                        />
                    </div>
                </div>
                <div className="col-span-2">
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Memo</label>
                    <input 
                        type="text" 
                        value={formData.memo || ''} 
                        onChange={e => handleChange('memo', e.target.value)} 
                        className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none" 
                        placeholder="Optional memo or description"
                    />
                </div>
            </div>
        </RecordSection>
    </RecordDetail>
  );
};

export default OwnerDrawDetailView;

