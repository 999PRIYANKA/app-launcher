import React, { useState, useEffect } from 'react';
import RecordDetail from '../../../../../components/common/RecordDetail';
import RecordSection from '../../../../../components/common/RecordSection';
import * as Icons from '../../../../../constants/icons';

const LedgerTransactionDetailView = ({ transaction, accounts = [], onBack, onSave }) => {
  const [formData, setFormData] = useState(transaction);
  const [lines, setLines] = useState(transaction.lines || []);

  useEffect(() => {
    setFormData(transaction);
    setLines(transaction.lines || []);
  }, [transaction]);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAddLine = () => {
    const newLine = {
      id: Math.random().toString(),
      ledgerTransactionId: formData.id,
      accountId: '',
      accountName: '',
      debit: 0,
      credit: 0,
      description: ''
    };
    setLines([...lines, newLine]);
  };

  const handleLineChange = (lineId, field, value) => {
    setLines(lines.map(line => {
      if (line.id === lineId) {
        const updated = { ...line, [field]: value };
        if (field === 'accountId') {
          const account = accounts.find(a => a.id === value);
          updated.accountName = account?.name || '';
        }
        return updated;
      }
      return line;
    }));
  };

  const handleRemoveLine = (lineId) => {
    setLines(lines.filter(line => line.id !== lineId));
  };

  const totalDebits = lines.reduce((sum, line) => sum + (parseFloat(line.debit) || 0), 0);
  const totalCredits = lines.reduce((sum, line) => sum + (parseFloat(line.credit) || 0), 0);
  const isBalanced = Math.abs(totalDebits - totalCredits) < 0.01;

  const handleSave = () => {
    if (onSave) {
      onSave({ ...formData, lines });
    }
  };

  return (
    <RecordDetail
        title={formData.entryNumber || 'New Journal Entry'}
        subtitle={formData.memo || 'Draft Entry'}
        onClose={onBack}
        onSave={handleSave}
        status={formData.status}
    >
        <RecordSection title="Entry Information">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Entry Number</label>
                    <input 
                        type="text" 
                        value={formData.entryNumber || ''} 
                        onChange={(e) => handleChange('entryNumber', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none" 
                    />
                </div>
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Date *</label>
                    <input 
                        type="date" 
                        value={formData.transactionDate || ''} 
                        onChange={(e) => handleChange('transactionDate', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none" 
                        required
                    />
                </div>
                <div className="md:col-span-2">
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Memo</label>
                    <input 
                        type="text" 
                        value={formData.memo || ''} 
                        onChange={(e) => handleChange('memo', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none" 
                    />
                </div>
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Status</label>
                    <select 
                        value={formData.status || 'Draft'} 
                        onChange={(e) => handleChange('status', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded text-sm bg-white focus:ring-1 focus:ring-blue-500 outline-none"
                    >
                        <option>Draft</option>
                        <option>Posted</option>
                    </select>
                </div>
            </div>
        </RecordSection>

        <RecordSection title="Journal Entry Lines">
            <div className="flex justify-end mb-3">
                <button 
                    onClick={handleAddLine}
                    className="flex items-center text-sm font-semibold text-blue-600 hover:text-blue-800 hover:bg-blue-50 px-3 py-1.5 rounded transition-colors"
                >
                    <Icons.PlusCircleIcon className="w-4 h-4 mr-1.5" />
                    Add Line
                </button>
            </div>
            {lines.length > 0 ? (
                <div className="overflow-x-auto border rounded-md">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Account</th>
                                <th className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase">Debit</th>
                                <th className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase">Credit</th>
                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                                <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {lines.map((line) => (
                                <tr key={line.id} className="hover:bg-gray-50">
                                    <td className="px-3 py-2">
                                        <select 
                                            value={line.accountId || ''} 
                                            onChange={(e) => handleLineChange(line.id, 'accountId', e.target.value)}
                                            className="w-full p-1.5 border border-gray-300 rounded text-sm bg-white focus:ring-1 focus:ring-blue-500 outline-none"
                                        >
                                            <option value="">Select Account</option>
                                            {accounts.map(acc => (
                                                <option key={acc.id} value={acc.id}>{acc.accountCode} - {acc.name}</option>
                                            ))}
                                        </select>
                                    </td>
                                    <td className="px-3 py-2">
                                        <div className="relative">
                                            <span className="absolute left-2 top-1.5 text-gray-500 text-xs">$</span>
                                            <input 
                                                type="number" 
                                                step="0.01"
                                                value={line.debit || ''} 
                                                onChange={(e) => handleLineChange(line.id, 'debit', parseFloat(e.target.value) || 0)}
                                                className="w-full p-1.5 pl-5 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none text-right" 
                                            />
                                        </div>
                                    </td>
                                    <td className="px-3 py-2">
                                        <div className="relative">
                                            <span className="absolute left-2 top-1.5 text-gray-500 text-xs">$</span>
                                            <input 
                                                type="number" 
                                                step="0.01"
                                                value={line.credit || ''} 
                                                onChange={(e) => handleLineChange(line.id, 'credit', parseFloat(e.target.value) || 0)}
                                                className="w-full p-1.5 pl-5 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none text-right" 
                                            />
                                        </div>
                                    </td>
                                    <td className="px-3 py-2">
                                        <input 
                                            type="text" 
                                            value={line.description || ''} 
                                            onChange={(e) => handleLineChange(line.id, 'description', e.target.value)}
                                            className="w-full p-1.5 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none" 
                                        />
                                    </td>
                                    <td className="px-3 py-2 text-center">
                                        <button 
                                            onClick={() => handleRemoveLine(line.id)}
                                            className="text-red-600 hover:text-red-800"
                                        >
                                            <Icons.DeleteIcon className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot className="bg-gray-50">
                            <tr>
                                <td className="px-3 py-2 text-sm font-bold text-gray-700">Total</td>
                                <td className="px-3 py-2 text-sm font-bold text-gray-700 text-right">${totalDebits.toFixed(2)}</td>
                                <td className="px-3 py-2 text-sm font-bold text-gray-700 text-right">${totalCredits.toFixed(2)}</td>
                                <td className="px-3 py-2" colSpan={2}>
                                    <span className={`text-xs font-bold ${isBalanced ? 'text-green-600' : 'text-red-600'}`}>
                                        {isBalanced ? '✓ Balanced' : '✗ Out of Balance'}
                                    </span>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            ) : (
                <div className="text-center py-8 text-gray-500 text-sm border-2 border-dashed border-gray-200 rounded-lg">
                    <p>No entry lines. Add a line to get started.</p>
                </div>
            )}
        </RecordSection>
    </RecordDetail>
  );
};

export default LedgerTransactionDetailView;

