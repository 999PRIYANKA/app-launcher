export const GL_MAPPING = {
  defaults: {
    cashAccount: '1010', // Operating Cash – Property Trust
  },

  mortgagePayment: {
    principalDebit: '2500', // Loans Payable – Mortgage
    interestDebit: '6000',  // Interest Expense – Mortgage
    escrowDebit: '1200',    // Prepaid Expenses
    cashCredit: '1010',     // Cash
  },

  insurancePayment: {
    prepaidDebit: '1200',   // Prepaid Expenses
    payableCredit: '2000',  // AP – Vendors
    expenseMonthlyDebit: '5110', // Property Insurance (for future amortization job)
    cashCredit: '1010',
  },

  taxPayment: {
    expenseDebit: '5100',   // Property Taxes
    payableCredit: '2300',  // Taxes Payable
    cashCredit: '1010',
  },

  hoaPayment: {
    expenseDebit: '5120',   // HOA / Condo Dues
    payableCredit: '2000',
    cashCredit: '1010',
  },

  accountsPayable: {
    categories: {
      repairsMaintenance: '5000',
      unitTurnover: '5010',
      waterSewer: '5050',
      electric: '5060',
      gas: '5070',
      trash: '5080',
      internet: '5090',
      propertyLegal: '5160',
      bankFees: '5170',
      default: '5000',
    },
    payable: '2000',
    cash: '1010',
  },
};

export const ACCOUNT_LABELS = {
    '1010': 'Operating Cash',
    '1200': 'Prepaid Expenses',
    '2000': 'Accounts Payable',
    '2300': 'Taxes Payable',
    '2500': 'Loans Payable - Mortgage',
    '5000': 'Repairs & Maintenance',
    '5010': 'Unit Turnover',
    '5050': 'Water & Sewer',
    '5060': 'Electricity',
    '5070': 'Gas',
    '5080': 'Trash & Recycling',
    '5090': 'Internet/Telecom',
    '5100': 'Property Taxes',
    '5110': 'Property Insurance',
    '5120': 'HOA Dues',
    '5160': 'Legal (Property)',
    '5170': 'Bank Fees',
    '6000': 'Interest Expense - Mortgage'
};

