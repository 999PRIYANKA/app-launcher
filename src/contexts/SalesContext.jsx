import React, { createContext, useContext, useState } from 'react';

const SalesContext = createContext(null);

export function SalesProvider({ children }) {
  // --- Leads State ---
  const [leads, setLeads] = useState([]);

  const handleAddLead = (lead) => {
    setLeads(prev => [...prev, lead]);
  };

  const handleUpdateLead = (updatedLead) => {
    setLeads(prev => prev.map(l => l.id === updatedLead.id ? updatedLead : l));
  };

  const handleDeleteLead = (leadId) => {
    setLeads(prev => prev.filter(l => l.id !== leadId));
  };

  // --- Opportunities State ---
  const [opportunities, setOpportunities] = useState([]);

  const handleAddOpportunity = (opportunity) => {
    setOpportunities(prev => [...prev, opportunity]);
  };

  const handleUpdateOpportunity = (updatedOpportunity) => {
    setOpportunities(prev => prev.map(o => o.id === updatedOpportunity.id ? updatedOpportunity : o));
  };

  const handleDeleteOpportunity = (opportunityId) => {
    setOpportunities(prev => prev.filter(o => o.id !== opportunityId));
  };

  // --- Accounts State ---
  const [accounts, setAccounts] = useState([]);

  const handleAddAccount = (account) => {
    setAccounts(prev => [...prev, account]);
  };

  const handleUpdateAccount = (updatedAccount) => {
    setAccounts(prev => prev.map(a => a.id === updatedAccount.id ? updatedAccount : a));
  };

  const handleDeleteAccount = (accountId) => {
    setAccounts(prev => prev.filter(a => a.id !== accountId));
  };

  // --- Contacts State ---
  const [contacts, setContacts] = useState([]);

  const handleAddContact = (contact) => {
    setContacts(prev => [...prev, contact]);
  };

  const handleUpdateContact = (updatedContact) => {
    setContacts(prev => prev.map(c => c.id === updatedContact.id ? updatedContact : c));
  };

  const handleDeleteContact = (contactId) => {
    setContacts(prev => prev.filter(c => c.id !== contactId));
  };

  const value = {
    // Leads
    leads,
    handleAddLead,
    handleUpdateLead,
    handleDeleteLead,
    // Opportunities
    opportunities,
    handleAddOpportunity,
    handleUpdateOpportunity,
    handleDeleteOpportunity,
    // Accounts
    accounts,
    handleAddAccount,
    handleUpdateAccount,
    handleDeleteAccount,
    // Contacts
    contacts,
    handleAddContact,
    handleUpdateContact,
    handleDeleteContact,
  };

  return (
    <SalesContext.Provider value={value}>
      {children}
    </SalesContext.Provider>
  );
}

export function useSales() {
  const context = useContext(SalesContext);
  if (!context) {
    throw new Error('useSales must be used within SalesProvider');
  }
  return context;
}

