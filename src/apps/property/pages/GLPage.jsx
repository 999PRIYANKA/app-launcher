import React, { useState } from 'react';
import ChartOfAccountList from '../components/accounting/GL/ChartOfAccountList';
import ChartOfAccountDetailView from '../components/accounting/GL/ChartOfAccountDetailView';
import LedgerTransactionList from '../components/accounting/GL/LedgerTransactionList';
import LedgerTransactionDetailView from '../components/accounting/GL/LedgerTransactionDetailView';
import * as Icons from '../../../constants/icons';

const GLPage = () => {
  const [activeTab, setActiveTab] = useState('Chart of Accounts');
  
  // Seed Data for Chart of Accounts
  const seedAccounts = [
    // Assets (1000–1999)
    { id: '1000', accountCode: '1000', name: 'Operating Cash – Corporate', type: 'Asset', subType: 'Cash', normalBalance: 'Debit', statementGroup: 'BalanceSheet', isActive: true, balance: 5000 },
    { id: '1010', accountCode: '1010', name: 'Operating Cash – Property Trust', type: 'Asset', subType: 'Cash', normalBalance: 'Debit', statementGroup: 'BalanceSheet', isActive: true, balance: 12000 },
    { id: '1020', accountCode: '1020', name: 'Cash – Security Deposit Trust', type: 'Asset', subType: 'Cash', normalBalance: 'Debit', statementGroup: 'BalanceSheet', isActive: true, balance: 8500 },
    { id: '1030', accountCode: '1030', name: 'Undeposited Funds', type: 'Asset', subType: 'Cash', normalBalance: 'Debit', statementGroup: 'BalanceSheet', isActive: true, balance: 0 },
    { id: '1100', accountCode: '1100', name: 'Accounts Receivable – Tenants', type: 'Asset', subType: 'AR', normalBalance: 'Debit', statementGroup: 'BalanceSheet', isActive: true, balance: 1200 },
    { id: '1110', accountCode: '1110', name: 'Accounts Receivable – Owners', type: 'Asset', subType: 'AR', normalBalance: 'Debit', statementGroup: 'BalanceSheet', isActive: true, balance: 0 },
    { id: '1200', accountCode: '1200', name: 'Prepaid Expenses', type: 'Asset', subType: 'Other Asset', normalBalance: 'Debit', statementGroup: 'BalanceSheet', isActive: true, balance: 0 },
    { id: '1300', accountCode: '1300', name: 'Property & Equipment – Buildings', type: 'Asset', subType: 'Fixed Asset', normalBalance: 'Debit', statementGroup: 'BalanceSheet', isActive: true, balance: 500000 },
    { id: '1310', accountCode: '1310', name: 'Property & Equipment – Improvements', type: 'Asset', subType: 'Fixed Asset', normalBalance: 'Debit', statementGroup: 'BalanceSheet', isActive: true, balance: 25000 },
    { id: '1320', accountCode: '1320', name: 'Furniture, Fixtures & Equipment (FFE)', type: 'Asset', subType: 'Fixed Asset', normalBalance: 'Debit', statementGroup: 'BalanceSheet', isActive: true, balance: 5000 },
    { id: '1390', accountCode: '1390', name: 'Accumulated Depreciation', type: 'Asset', subType: 'Fixed Asset', normalBalance: 'Credit', statementGroup: 'BalanceSheet', isActive: true, balance: -10000 },

    // Liabilities (2000–2999)
    { id: '2000', accountCode: '2000', name: 'Accounts Payable – Vendors', type: 'Liability', subType: 'AP', normalBalance: 'Credit', statementGroup: 'BalanceSheet', isActive: true, balance: 450 },
    { id: '2010', accountCode: '2010', name: 'Credit Cards Payable', type: 'Liability', subType: 'Credit Card', normalBalance: 'Credit', statementGroup: 'BalanceSheet', isActive: true, balance: 0 },
    { id: '2100', accountCode: '2100', name: 'Security Deposits Payable – Tenants', type: 'Liability', subType: 'Other Liability', normalBalance: 'Credit', statementGroup: 'BalanceSheet', isActive: true, balance: 8500 },
    { id: '2110', accountCode: '2110', name: 'Prepaid Rent / Unearned Revenue', type: 'Liability', subType: 'Other Liability', normalBalance: 'Credit', statementGroup: 'BalanceSheet', isActive: true, balance: 0 },
    { id: '2120', accountCode: '2120', name: 'Tenant Credits / Overpayments', type: 'Liability', subType: 'Other Liability', normalBalance: 'Credit', statementGroup: 'BalanceSheet', isActive: true, balance: 0 },
    { id: '2200', accountCode: '2200', name: 'Owner Payable – Operating', type: 'Liability', subType: 'Other Liability', normalBalance: 'Credit', statementGroup: 'BalanceSheet', isActive: true, balance: 0 },
    { id: '2210', accountCode: '2210', name: 'Owner Reserve Liability', type: 'Liability', subType: 'Other Liability', normalBalance: 'Credit', statementGroup: 'BalanceSheet', isActive: true, balance: 0 },
    { id: '2300', accountCode: '2300', name: 'Taxes Payable', type: 'Liability', subType: 'Other Liability', normalBalance: 'Credit', statementGroup: 'BalanceSheet', isActive: true, balance: 0 },
    { id: '2400', accountCode: '2400', name: 'Payroll Liabilities', type: 'Liability', subType: 'Other Liability', normalBalance: 'Credit', statementGroup: 'BalanceSheet', isActive: true, balance: 0 },
    { id: '2500', accountCode: '2500', name: 'Loans Payable – Mortgage', type: 'Liability', subType: 'Long Term Liability', normalBalance: 'Credit', statementGroup: 'BalanceSheet', isActive: true, balance: 350000 },
    { id: '2510', accountCode: '2510', name: 'Loans Payable – Other', type: 'Liability', subType: 'Long Term Liability', normalBalance: 'Credit', statementGroup: 'BalanceSheet', isActive: true, balance: 0 },

    // Equity (3000–3999)
    { id: '3000', accountCode: '3000', name: "Owner's Capital", type: 'Equity', subType: 'Equity', normalBalance: 'Credit', statementGroup: 'BalanceSheet', isActive: true, balance: 100000 },
    { id: '3100', accountCode: '3100', name: 'Retained Earnings – Prior Years', type: 'Equity', subType: 'Equity', normalBalance: 'Credit', statementGroup: 'BalanceSheet', isActive: true, balance: 50000 },
    { id: '3200', accountCode: '3200', name: 'Current Year Earnings', type: 'Equity', subType: 'Equity', normalBalance: 'Credit', statementGroup: 'BalanceSheet', isActive: true, balance: 0 },
    { id: '3300', accountCode: '3300', name: 'Owner Draws / Distributions', type: 'Equity', subType: 'Equity', normalBalance: 'Debit', statementGroup: 'BalanceSheet', isActive: true, balance: 0 },

    // Income (4000–4299)
    { id: '4000', accountCode: '4000', name: 'Rental Income – Residential', type: 'Income', subType: 'Rent', normalBalance: 'Credit', statementGroup: 'ProfitAndLoss', isActive: true, balance: 12500 },
    { id: '4010', accountCode: '4010', name: 'Rental Income – Commercial', type: 'Income', subType: 'Rent', normalBalance: 'Credit', statementGroup: 'ProfitAndLoss', isActive: true, balance: 0 },
    { id: '4020', accountCode: '4020', name: 'Parking Income', type: 'Income', subType: 'Other Income', normalBalance: 'Credit', statementGroup: 'ProfitAndLoss', isActive: true, balance: 0 },
    { id: '4030', accountCode: '4030', name: 'Storage Income', type: 'Income', subType: 'Other Income', normalBalance: 'Credit', statementGroup: 'ProfitAndLoss', isActive: true, balance: 0 },
    { id: '4040', accountCode: '4040', name: 'Pet Rent', type: 'Income', subType: 'Other Income', normalBalance: 'Credit', statementGroup: 'ProfitAndLoss', isActive: true, balance: 0 },
    { id: '4050', accountCode: '4050', name: 'Utility Reimbursement – Tenants', type: 'Income', subType: 'Other Income', normalBalance: 'Credit', statementGroup: 'ProfitAndLoss', isActive: true, balance: 0 },
    { id: '4060', accountCode: '4060', name: 'Laundry / Vending Income', type: 'Income', subType: 'Other Income', normalBalance: 'Credit', statementGroup: 'ProfitAndLoss', isActive: true, balance: 0 },
    { id: '4070', accountCode: '4070', name: 'Other Tenant Fees', type: 'Income', subType: 'Other Income', normalBalance: 'Credit', statementGroup: 'ProfitAndLoss', isActive: true, balance: 0 },
    { id: '4100', accountCode: '4100', name: 'Late Fee Income', type: 'Income', subType: 'Fees', normalBalance: 'Credit', statementGroup: 'ProfitAndLoss', isActive: true, balance: 0 },
    { id: '4110', accountCode: '4110', name: 'NSF / Returned Check Fees', type: 'Income', subType: 'Fees', normalBalance: 'Credit', statementGroup: 'ProfitAndLoss', isActive: true, balance: 0 },
    { id: '4120', accountCode: '4120', name: 'Lease Break / Termination Fees', type: 'Income', subType: 'Fees', normalBalance: 'Credit', statementGroup: 'ProfitAndLoss', isActive: true, balance: 0 },
    { id: '4130', accountCode: '4130', name: 'Application Fees', type: 'Income', subType: 'Fees', normalBalance: 'Credit', statementGroup: 'ProfitAndLoss', isActive: true, balance: 0 },
    { id: '4140', accountCode: '4140', name: 'Screening / Background Check Fees', type: 'Income', subType: 'Fees', normalBalance: 'Credit', statementGroup: 'ProfitAndLoss', isActive: true, balance: 0 },
    { id: '4150', accountCode: '4150', name: 'Move-in / Admin Fees', type: 'Income', subType: 'Fees', normalBalance: 'Credit', statementGroup: 'ProfitAndLoss', isActive: true, balance: 0 },
    { id: '4200', accountCode: '4200', name: 'Property Management Fee Income', type: 'Income', subType: 'Mgmt Income', normalBalance: 'Credit', statementGroup: 'ProfitAndLoss', isActive: true, balance: 0 },
    { id: '4210', accountCode: '4210', name: 'Leasing Commission Income', type: 'Income', subType: 'Mgmt Income', normalBalance: 'Credit', statementGroup: 'ProfitAndLoss', isActive: true, balance: 0 },
    { id: '4220', accountCode: '4220', name: 'Maintenance Coordination Fee Income', type: 'Income', subType: 'Mgmt Income', normalBalance: 'Credit', statementGroup: 'ProfitAndLoss', isActive: true, balance: 0 },
    { id: '4230', accountCode: '4230', name: 'Project Management Fee Income', type: 'Income', subType: 'Mgmt Income', normalBalance: 'Credit', statementGroup: 'ProfitAndLoss', isActive: true, balance: 0 },
    { id: '4240', accountCode: '4240', name: 'Other Service Fee Income', type: 'Income', subType: 'Mgmt Income', normalBalance: 'Credit', statementGroup: 'ProfitAndLoss', isActive: true, balance: 0 },

    // Operating Expenses (5000–5999)
    { id: '5000', accountCode: '5000', name: 'Repairs & Maintenance – General', type: 'Expense', subType: 'R&M', normalBalance: 'Debit', statementGroup: 'ProfitAndLoss', isActive: true, balance: 800 },
    { id: '5010', accountCode: '5010', name: 'Unit Turnover Costs', type: 'Expense', subType: 'R&M', normalBalance: 'Debit', statementGroup: 'ProfitAndLoss', isActive: true, balance: 0 },
    { id: '5020', accountCode: '5020', name: 'Cleaning & Janitorial', type: 'Expense', subType: 'R&M', normalBalance: 'Debit', statementGroup: 'ProfitAndLoss', isActive: true, balance: 0 },
    { id: '5030', accountCode: '5030', name: 'Landscaping & Grounds', type: 'Expense', subType: 'R&M', normalBalance: 'Debit', statementGroup: 'ProfitAndLoss', isActive: true, balance: 0 },
    { id: '5040', accountCode: '5040', name: 'Pest Control', type: 'Expense', subType: 'R&M', normalBalance: 'Debit', statementGroup: 'ProfitAndLoss', isActive: true, balance: 0 },
    { id: '5050', accountCode: '5050', name: 'Utilities – Water & Sewer', type: 'Expense', subType: 'Utilities', normalBalance: 'Debit', statementGroup: 'ProfitAndLoss', isActive: true, balance: 0 },
    { id: '5060', accountCode: '5060', name: 'Utilities – Electricity', type: 'Expense', subType: 'Utilities', normalBalance: 'Debit', statementGroup: 'ProfitAndLoss', isActive: true, balance: 0 },
    { id: '5070', accountCode: '5070', name: 'Utilities – Gas', type: 'Expense', subType: 'Utilities', normalBalance: 'Debit', statementGroup: 'ProfitAndLoss', isActive: true, balance: 0 },
    { id: '5080', accountCode: '5080', name: 'Trash & Recycling', type: 'Expense', subType: 'Utilities', normalBalance: 'Debit', statementGroup: 'ProfitAndLoss', isActive: true, balance: 0 },
    { id: '5090', accountCode: '5090', name: 'Telecom / Internet – Property', type: 'Expense', subType: 'Utilities', normalBalance: 'Debit', statementGroup: 'ProfitAndLoss', isActive: true, balance: 0 },
    { id: '5100', accountCode: '5100', name: 'Property Taxes', type: 'Expense', subType: 'Taxes & Ins', normalBalance: 'Debit', statementGroup: 'ProfitAndLoss', isActive: true, balance: 0 },
    { id: '5110', accountCode: '5110', name: 'Property Insurance', type: 'Expense', subType: 'Taxes & Ins', normalBalance: 'Debit', statementGroup: 'ProfitAndLoss', isActive: true, balance: 0 },
    { id: '5120', accountCode: '5120', name: 'HOA / Condo Association Dues', type: 'Expense', subType: 'Other Exp', normalBalance: 'Debit', statementGroup: 'ProfitAndLoss', isActive: true, balance: 0 },
    { id: '5130', accountCode: '5130', name: 'Security Services', type: 'Expense', subType: 'Other Exp', normalBalance: 'Debit', statementGroup: 'ProfitAndLoss', isActive: true, balance: 0 },
    { id: '5140', accountCode: '5140', name: 'Supplies – Property', type: 'Expense', subType: 'Other Exp', normalBalance: 'Debit', statementGroup: 'ProfitAndLoss', isActive: true, balance: 0 },
    { id: '5150', accountCode: '5150', name: 'Advertising & Marketing – Property', type: 'Expense', subType: 'Other Exp', normalBalance: 'Debit', statementGroup: 'ProfitAndLoss', isActive: true, balance: 0 },
    { id: '5160', accountCode: '5160', name: 'Legal & Professional – Property', type: 'Expense', subType: 'Other Exp', normalBalance: 'Debit', statementGroup: 'ProfitAndLoss', isActive: true, balance: 0 },
    { id: '5170', accountCode: '5170', name: 'Bank Service Charges – Property', type: 'Expense', subType: 'Other Exp', normalBalance: 'Debit', statementGroup: 'ProfitAndLoss', isActive: true, balance: 0 },
    { id: '5180', accountCode: '5180', name: 'Bad Debt Expense', type: 'Expense', subType: 'Other Exp', normalBalance: 'Debit', statementGroup: 'ProfitAndLoss', isActive: true, balance: 0 },
    { id: '5190', accountCode: '5190', name: 'Management Fees – Paid to Mgmt Co', type: 'Expense', subType: 'Mgmt Fees', normalBalance: 'Debit', statementGroup: 'ProfitAndLoss', isActive: true, balance: 0 },
    
    // Operating Expenses - Management Company (5800-5999)
    { id: '5800', accountCode: '5800', name: 'Salaries & Wages', type: 'Expense', subType: 'Corporate', normalBalance: 'Debit', statementGroup: 'ProfitAndLoss', isActive: true, balance: 0 },
    { id: '5810', accountCode: '5810', name: 'Payroll Taxes', type: 'Expense', subType: 'Corporate', normalBalance: 'Debit', statementGroup: 'ProfitAndLoss', isActive: true, balance: 0 },
    { id: '5820', accountCode: '5820', name: 'Employee Benefits', type: 'Expense', subType: 'Corporate', normalBalance: 'Debit', statementGroup: 'ProfitAndLoss', isActive: true, balance: 0 },
    { id: '5830', accountCode: '5830', name: 'Office Rent', type: 'Expense', subType: 'Corporate', normalBalance: 'Debit', statementGroup: 'ProfitAndLoss', isActive: true, balance: 0 },
    { id: '5840', accountCode: '5840', name: 'Office Supplies', type: 'Expense', subType: 'Corporate', normalBalance: 'Debit', statementGroup: 'ProfitAndLoss', isActive: true, balance: 0 },
    { id: '5850', accountCode: '5850', name: 'Software & Subscriptions', type: 'Expense', subType: 'Corporate', normalBalance: 'Debit', statementGroup: 'ProfitAndLoss', isActive: true, balance: 0 },
    { id: '5860', accountCode: '5860', name: 'Advertising & Marketing – Corporate', type: 'Expense', subType: 'Corporate', normalBalance: 'Debit', statementGroup: 'ProfitAndLoss', isActive: true, balance: 0 },
    { id: '5870', accountCode: '5870', name: 'Travel & Meals', type: 'Expense', subType: 'Corporate', normalBalance: 'Debit', statementGroup: 'ProfitAndLoss', isActive: true, balance: 0 },
    { id: '5880', accountCode: '5880', name: 'Professional Fees – Legal & Accounting', type: 'Expense', subType: 'Corporate', normalBalance: 'Debit', statementGroup: 'ProfitAndLoss', isActive: true, balance: 0 },
    { id: '5890', accountCode: '5890', name: 'Insurance – General Liability', type: 'Expense', subType: 'Corporate', normalBalance: 'Debit', statementGroup: 'ProfitAndLoss', isActive: true, balance: 0 },
    { id: '5900', accountCode: '5900', name: 'Bank Service Charges – Corporate', type: 'Expense', subType: 'Corporate', normalBalance: 'Debit', statementGroup: 'ProfitAndLoss', isActive: true, balance: 0 },
    { id: '5910', accountCode: '5910', name: 'Licenses & Permits', type: 'Expense', subType: 'Corporate', normalBalance: 'Debit', statementGroup: 'ProfitAndLoss', isActive: true, balance: 0 },
    { id: '5920', accountCode: '5920', name: 'Training & Education', type: 'Expense', subType: 'Corporate', normalBalance: 'Debit', statementGroup: 'ProfitAndLoss', isActive: true, balance: 0 },
    { id: '5930', accountCode: '5930', name: 'Miscellaneous Expense', type: 'Expense', subType: 'Corporate', normalBalance: 'Debit', statementGroup: 'ProfitAndLoss', isActive: true, balance: 0 },

    // Non-Operating (6000–6999)
    { id: '6000', accountCode: '6000', name: 'Interest Expense – Mortgage', type: 'Expense', subType: 'Other Expense', normalBalance: 'Debit', statementGroup: 'ProfitAndLoss', isActive: true, balance: 0 },
    { id: '6010', accountCode: '6010', name: 'Interest Expense – Other Debt', type: 'Expense', subType: 'Other Expense', normalBalance: 'Debit', statementGroup: 'ProfitAndLoss', isActive: true, balance: 0 },
    { id: '6100', accountCode: '6100', name: 'Depreciation Expense', type: 'Expense', subType: 'Other Expense', normalBalance: 'Debit', statementGroup: 'ProfitAndLoss', isActive: true, balance: 0 },
    { id: '6200', accountCode: '6200', name: 'Amortization Expense', type: 'Expense', subType: 'Other Expense', normalBalance: 'Debit', statementGroup: 'ProfitAndLoss', isActive: true, balance: 0 },
    { id: '6300', accountCode: '6300', name: 'Gain/Loss on Sale of Assets', type: 'Income', subType: 'Other Income', normalBalance: 'Credit', statementGroup: 'ProfitAndLoss', isActive: true, balance: 0 },
  ];

  const [accounts, setAccounts] = useState(seedAccounts);

  const [transactions, setTransactions] = useState([
      { 
          id: '1', 
          transactionDate: '2024-03-01', 
          entryNumber: 'JE-1001', 
          memo: 'Opening Balance', 
          status: 'Posted', 
          lines: [
              { id: 'l1', ledgerTransactionId: '1', accountId: '1000', accountName: 'Operating Cash – Corporate', debit: 5000, description: 'Initial deposit' },
              { id: 'l2', ledgerTransactionId: '1', accountId: '3000', accountName: "Owner's Capital", credit: 5000, description: 'Initial deposit' }
          ]
      }
  ]);

  const [selectedAccount, setSelectedAccount] = useState(null);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const renderTabContent = () => {
      switch(activeTab) {
          case 'Chart of Accounts':
              return (
                <>
                    <ChartOfAccountList 
                        accounts={accounts} 
                        onAddClick={() => {
                            const newAccount = { 
                                id: Math.random().toString(), 
                                accountCode: '', 
                                name: '', 
                                type: 'Expense', 
                                normalBalance: 'Debit', 
                                statementGroup: 'ProfitAndLoss', 
                                isActive: true, 
                                balance: 0 
                            };
                            setSelectedAccount(newAccount);
                        }}
                        onSelect={setSelectedAccount}
                    />
                    {selectedAccount && (
                        <ChartOfAccountDetailView 
                            account={selectedAccount} 
                            onBack={() => setSelectedAccount(null)}
                            onSave={(acct) => {
                                const idx = accounts.findIndex(a => a.id === acct.id);
                                if (idx >= 0) {
                                    const updated = [...accounts];
                                    updated[idx] = acct;
                                    setAccounts(updated);
                                } else {
                                    setAccounts([...accounts, acct]);
                                }
                                setSelectedAccount(null);
                            }}
                        />
                    )}
                </>
              );
          case 'Journal Entries':
              return (
                  <>
                    <LedgerTransactionList 
                        transactions={transactions}
                        onAddClick={() => {
                            const newTrx = { id: Math.random().toString(), transactionDate: new Date().toISOString().split('T')[0], entryNumber: 'New', status: 'Draft', lines: [] };
                            setSelectedTransaction(newTrx);
                        }}
                        onSelect={setSelectedTransaction}
                    />
                    {selectedTransaction && (
                        <LedgerTransactionDetailView 
                            transaction={selectedTransaction}
                            accounts={accounts}
                            onBack={() => setSelectedTransaction(null)}
                            onSave={(trx) => {
                                const idx = transactions.findIndex(t => t.id === trx.id);
                                if (idx >= 0) {
                                    const updated = [...transactions];
                                    updated[idx] = trx;
                                    setTransactions(updated);
                                } else {
                                    setTransactions([...transactions, trx]);
                                }
                                setSelectedTransaction(null);
                            }}
                        />
                    )}
                  </>
              );
      }
  };

  return (
    <div className="relative h-full flex flex-col">
      <div className="bg-white border-b px-6 pt-4">
        <div className="flex space-x-8">
            <button 
                className={`pb-4 text-sm font-medium border-b-2 transition-colors flex items-center ${activeTab === 'Chart of Accounts' ? 'border-brand-teal text-brand-dark-blue' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                onClick={() => setActiveTab('Chart of Accounts')}
            >
                <Icons.BookOpenIcon className="w-5 h-5 mr-2" />
                Chart of Accounts
            </button>
            <button 
                className={`pb-4 text-sm font-medium border-b-2 transition-colors flex items-center ${activeTab === 'Journal Entries' ? 'border-brand-teal text-brand-dark-blue' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                onClick={() => setActiveTab('Journal Entries')}
            >
                <Icons.ClipboardIcon className="w-5 h-5 mr-2" />
                Journal Entries
            </button>
        </div>
      </div>
      <div className="flex-1 overflow-hidden relative">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default GLPage;

