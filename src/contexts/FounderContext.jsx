import React, { createContext, useContext, useState } from 'react';

const FounderContext = createContext(null);

export function FounderProvider({ children }) {
  // --- Company Health Metrics State ---
  const [companyHealth, setCompanyHealth] = useState(null);

  const handleUpdateCompanyHealth = (data) => {
    setCompanyHealth(data);
  };

  // --- Financials State ---
  const [financials, setFinancials] = useState([]);

  const handleAddFinancial = (financial) => {
    setFinancials(prev => [...prev, financial]);
  };

  const handleUpdateFinancial = (updatedFinancial) => {
    setFinancials(prev => prev.map(f => f.id === updatedFinancial.id ? updatedFinancial : f));
  };

  const handleDeleteFinancial = (financialId) => {
    setFinancials(prev => prev.filter(f => f.id !== financialId));
  };

  // --- Investor Relations State ---
  const [investorRelations, setInvestorRelations] = useState([]);

  const handleAddInvestorRelation = (relation) => {
    setInvestorRelations(prev => [...prev, relation]);
  };

  const handleUpdateInvestorRelation = (updatedRelation) => {
    setInvestorRelations(prev => prev.map(r => r.id === updatedRelation.id ? updatedRelation : r));
  };

  const handleDeleteInvestorRelation = (relationId) => {
    setInvestorRelations(prev => prev.filter(r => r.id !== relationId));
  };

  // --- KPIs State ---
  const [kpis, setKpis] = useState(null);

  const handleUpdateKpis = (data) => {
    setKpis(data);
  };

  const value = {
    // Company Health
    companyHealth,
    handleUpdateCompanyHealth,
    // Financials
    financials,
    handleAddFinancial,
    handleUpdateFinancial,
    handleDeleteFinancial,
    // Investor Relations
    investorRelations,
    handleAddInvestorRelation,
    handleUpdateInvestorRelation,
    handleDeleteInvestorRelation,
    // KPIs
    kpis,
    handleUpdateKpis,
  };

  return (
    <FounderContext.Provider value={value}>
      {children}
    </FounderContext.Provider>
  );
}

export function useFounder() {
  const context = useContext(FounderContext);
  if (!context) {
    throw new Error('useFounder must be used within FounderProvider');
  }
  return context;
}

