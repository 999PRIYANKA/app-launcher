import React from 'react';
import RecordDetail from '../../../../components/common/RecordDetail';
import RecordSection from '../../../../components/common/RecordSection';

const ExpenseDetailView = ({ expense, onBack }) => {
  return (
    <RecordDetail
        title={`Expense: ${expense.category || 'Transaction'}`}
        subtitle={`${expense.property || ''} • ${expense.payerOrPayee || ''}`}
        onClose={onBack}
        status={expense.status}
    >
        <RecordSection title="Transaction Details">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Date</label>
                    <p className="text-sm font-medium text-gray-900">{expense.date}</p>
                </div>
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Category</label>
                    <p className="text-sm font-medium text-gray-900">{expense.category}</p>
                </div>
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Property</label>
                    <p className="text-sm font-medium text-gray-900">{expense.property}</p>
                </div>
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Payee</label>
                    <p className="text-sm font-medium text-gray-900">{expense.payerOrPayee}</p>
                </div>
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Amount</label>
                    <p className="text-sm font-bold text-red-600">${(expense.amount || 0).toLocaleString()}</p>
                </div>
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Status</label>
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      expense.status === 'Paid' ? 'bg-green-100 text-green-800' :
                      expense.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      expense.status === 'Overdue' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {expense.status}
                    </span>
                </div>
            </div>
        </RecordSection>
    </RecordDetail>
  );
};

export default ExpenseDetailView;

