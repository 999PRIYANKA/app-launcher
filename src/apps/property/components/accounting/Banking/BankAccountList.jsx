import React from 'react';
import * as Icons from '../../../../../constants/icons';

const BankAccountList = ({ accounts, onAddClick, onSelect }) => {
  return (
    <div className="flex h-full bg-white flex-col p-6">
        <div className="flex justify-end mb-6">
            <button 
                onClick={onAddClick} 
                className="bg-blue-600 text-white px-4 py-2 rounded-md font-medium text-sm hover:bg-blue-700 flex items-center"
            >
                <Icons.PlusCircleIcon className="w-4 h-4 mr-2" /> Add Bank Account
            </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {accounts.length > 0 ? (
                accounts.map(acc => (
                    <div 
                        key={acc.id} 
                        onClick={() => onSelect(acc)} 
                        className="border rounded-lg p-6 hover:shadow-md cursor-pointer bg-white transition-shadow"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-blue-50 rounded-full text-blue-600">
                                <Icons.BankIcon className="w-8 h-8" />
                            </div>
                            <span className="text-xs font-semibold bg-gray-100 text-gray-600 px-2 py-1 rounded">{acc.type}</span>
                        </div>
                        <h3 className="font-bold text-gray-900 text-lg mb-1">{acc.accountName}</h3>
                        <p className="text-gray-500 text-sm mb-4">{acc.bankName} • {acc.accountNumber || 'N/A'}</p>
                        <div className="border-t pt-4">
                            <p className="text-sm text-gray-500 mb-1">Current Balance</p>
                            <p className="text-2xl font-bold text-gray-900">${acc.currentBalance.toLocaleString()}</p>
                        </div>
                    </div>
                ))
            ) : (
                <div className="col-span-full text-center py-12 text-gray-500">
                    <p>No bank accounts found.</p>
                    <button 
                        onClick={onAddClick} 
                        className="mt-4 text-blue-600 font-medium hover:underline"
                    >
                        Add your first bank account
                    </button>
                </div>
            )}
        </div>
    </div>
  );
};

export default BankAccountList;

