import React from 'react';
import RecordDetail from '../../../../components/common/RecordDetail';
import RecordSection from '../../../../components/common/RecordSection';

const IncomeDetailView = ({ income, onBack }) => {
  return (
    <RecordDetail
        title={`Income: ${income.category || 'Transaction'}`}
        subtitle={`${income.property || ''} • ${income.payerOrPayee || ''}`}
        onClose={onBack}
        status={income.status}
    >
        <RecordSection title="Transaction Details">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Date</label>
                    <p className="text-sm font-medium text-gray-900">{income.date}</p>
                </div>
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Category</label>
                    <p className="text-sm font-medium text-gray-900">{income.category}</p>
                </div>
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Property</label>
                    <p className="text-sm font-medium text-gray-900">{income.property}</p>
                </div>
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Payer</label>
                    <p className="text-sm font-medium text-gray-900">{income.payerOrPayee}</p>
                </div>
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Amount</label>
                    <p className="text-sm font-bold text-green-600">${(income.amount || 0).toLocaleString()}</p>
                </div>
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Status</label>
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      income.status === 'Collected' ? 'bg-green-100 text-green-800' :
                      income.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {income.status}
                    </span>
                </div>
                {income.paymentMethod && (
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Payment Method</label>
                    <p className="text-sm font-medium text-gray-900">{income.paymentMethod}</p>
                  </div>
                )}
                {income.referenceNumber && (
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Reference Number</label>
                    <p className="text-sm font-medium text-gray-900">{income.referenceNumber}</p>
                  </div>
                )}
            </div>
        </RecordSection>
    </RecordDetail>
  );
};

export default IncomeDetailView;

