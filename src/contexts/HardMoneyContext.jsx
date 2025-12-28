import React, { createContext, useContext, useState } from 'react';

const HardMoneyContext = createContext(null);

export function HardMoneyProvider({ children }) {
  // --- Loan Leads State ---
  const [loanLeads, setLoanLeads] = useState([]);

  const handleAddLoanLead = (lead) => {
    setLoanLeads(prev => [...prev, lead]);
  };

  const handleUpdateLoanLead = (updatedLead) => {
    setLoanLeads(prev => prev.map(l => l.id === updatedLead.id ? updatedLead : l));
  };

  const handleDeleteLoanLead = (leadId) => {
    setLoanLeads(prev => prev.filter(l => l.id !== leadId));
  };

  // --- Loan Applications State ---
  const [loanApplications, setLoanApplications] = useState([]);

  const handleAddLoanApplication = (application) => {
    setLoanApplications(prev => [...prev, application]);
  };

  const handleUpdateLoanApplication = (updatedApplication) => {
    setLoanApplications(prev => prev.map(a => a.id === updatedApplication.id ? updatedApplication : a));
  };

  const handleDeleteLoanApplication = (applicationId) => {
    setLoanApplications(prev => prev.filter(a => a.id !== applicationId));
  };

  // --- Borrowers State ---
  const [borrowers, setBorrowers] = useState([]);

  const handleAddBorrower = (borrower) => {
    setBorrowers(prev => [...prev, borrower]);
  };

  const handleUpdateBorrower = (updatedBorrower) => {
    setBorrowers(prev => prev.map(b => b.id === updatedBorrower.id ? updatedBorrower : b));
  };

  const handleDeleteBorrower = (borrowerId) => {
    setBorrowers(prev => prev.filter(b => b.id !== borrowerId));
  };

  // --- Active Loans State ---
  const [activeLoans, setActiveLoans] = useState([]);

  const handleAddActiveLoan = (loan) => {
    setActiveLoans(prev => [...prev, loan]);
  };

  const handleUpdateActiveLoan = (updatedLoan) => {
    setActiveLoans(prev => prev.map(l => l.id === updatedLoan.id ? updatedLoan : l));
  };

  const handleDeleteActiveLoan = (loanId) => {
    setActiveLoans(prev => prev.filter(l => l.id !== loanId));
  };

  // --- Servicing State ---
  const [servicing, setServicing] = useState([]);

  const handleAddServicing = (service) => {
    setServicing(prev => [...prev, service]);
  };

  const handleUpdateServicing = (updatedService) => {
    setServicing(prev => prev.map(s => s.id === updatedService.id ? updatedService : s));
  };

  const handleDeleteServicing = (serviceId) => {
    setServicing(prev => prev.filter(s => s.id !== serviceId));
  };

  // --- Lending Offices State ---
  const [lendingOffices, setLendingOffices] = useState([]);

  const handleAddLendingOffice = (office) => {
    setLendingOffices(prev => [...prev, office]);
  };

  const handleUpdateLendingOffice = (updatedOffice) => {
    setLendingOffices(prev => prev.map(o => o.id === updatedOffice.id ? updatedOffice : o));
  };

  const handleDeleteLendingOffice = (officeId) => {
    setLendingOffices(prev => prev.filter(o => o.id !== officeId));
  };

  const value = {
    // Loan Leads
    loanLeads,
    handleAddLoanLead,
    handleUpdateLoanLead,
    handleDeleteLoanLead,
    // Loan Applications
    loanApplications,
    handleAddLoanApplication,
    handleUpdateLoanApplication,
    handleDeleteLoanApplication,
    // Borrowers
    borrowers,
    handleAddBorrower,
    handleUpdateBorrower,
    handleDeleteBorrower,
    // Active Loans
    activeLoans,
    handleAddActiveLoan,
    handleUpdateActiveLoan,
    handleDeleteActiveLoan,
    // Servicing
    servicing,
    handleAddServicing,
    handleUpdateServicing,
    handleDeleteServicing,
    // Lending Offices
    lendingOffices,
    handleAddLendingOffice,
    handleUpdateLendingOffice,
    handleDeleteLendingOffice,
  };

  return (
    <HardMoneyContext.Provider value={value}>
      {children}
    </HardMoneyContext.Provider>
  );
}

export function useHardMoney() {
  const context = useContext(HardMoneyContext);
  if (!context) {
    throw new Error('useHardMoney must be used within HardMoneyProvider');
  }
  return context;
}

