import { GL_MAPPING } from '../constants/glMapping';

export const createJournalEntryForMortgagePayment = (
    mortgage, 
    payload
) => {
    return {
        propertyId: mortgage.propertyId || '',
        date: payload.date,
        memo: `Mortgage Payment - ${mortgage.lenderName || 'Loan'}`,
        lines: [
            { accountCode: GL_MAPPING.mortgagePayment.principalDebit, debit: payload.principal, credit: 0, description: 'Principal' },
            { accountCode: GL_MAPPING.mortgagePayment.interestDebit, debit: payload.interest, credit: 0, description: 'Interest' },
            { accountCode: GL_MAPPING.mortgagePayment.escrowDebit, debit: payload.escrow, credit: 0, description: 'Escrow' },
            { accountCode: GL_MAPPING.mortgagePayment.cashCredit, debit: 0, credit: payload.totalAmount, description: 'Payment' }
        ]
    };
};

export const createJournalEntryForInsurancePayment = (
    policy,
    payload
) => {
    return {
        propertyId: payload.propertyId,
        date: payload.date,
        memo: `Insurance Payment - ${policy.carrierName || 'Carrier'}`,
        lines: [
            // Cash basis implementation as per requirements
            { accountCode: GL_MAPPING.insurancePayment.expenseMonthlyDebit, debit: payload.amount, credit: 0, description: 'Insurance Premium' },
            { accountCode: GL_MAPPING.insurancePayment.cashCredit, debit: 0, credit: payload.amount, description: 'Payment' }
        ]
    };
};

export const createJournalEntryForTaxPayment = (
    taxRecord,
    payload
) => {
    return {
        propertyId: payload.propertyId,
        date: payload.date,
        memo: `Tax Payment - ${taxRecord.taxAuthorityName || 'Tax Authority'}`,
        lines: [
            { accountCode: GL_MAPPING.taxPayment.expenseDebit, debit: payload.amount, credit: 0, description: 'Property Tax' },
            { accountCode: GL_MAPPING.taxPayment.cashCredit, debit: 0, credit: payload.amount, description: 'Payment' }
        ]
    };
};

export const createJournalEntryForHoaPayment = (
    hoaAccount,
    payload
) => {
    return {
        propertyId: payload.propertyId,
        date: payload.date,
        memo: `HOA Payment - ${hoaAccount.associationName || 'Association'}`,
        lines: [
            { accountCode: GL_MAPPING.hoaPayment.expenseDebit, debit: payload.amount, credit: 0, description: 'HOA Dues' },
            { accountCode: GL_MAPPING.hoaPayment.cashCredit, debit: 0, credit: payload.amount, description: 'Payment' }
        ]
    };
};

export const createJournalEntryForVendorBill = (
    bill
) => {
    const expenseAccount = GL_MAPPING.accountsPayable.categories[bill.categoryKey] || GL_MAPPING.accountsPayable.categories.default;
    
    return {
        propertyId: bill.propertyId,
        date: bill.invoiceDate, // JE date is usually invoice date for accrual, or use a separate payment date if creating payment JE directly
        memo: `Bill - ${bill.vendorName} - ${bill.invoiceNumber}`,
        lines: [
            { accountCode: expenseAccount, debit: bill.amount, credit: 0, description: bill.categoryKey },
            { accountCode: GL_MAPPING.accountsPayable.payable, debit: 0, credit: bill.amount, description: 'AP' }
        ]
    };
};

