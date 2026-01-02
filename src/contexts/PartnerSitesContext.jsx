import React, { createContext, useContext, useState } from 'react';

const PartnerSitesContext = createContext(null);

export function PartnerSitesProvider({ children }) {
  // --- Partner Sites State ---
  const [partnerSites, setPartnerSites] = useState([]);

  const handleAddPartnerSite = (site) => {
    setPartnerSites(prev => [...prev, site]);
  };

  const handleUpdatePartnerSite = (updatedSite) => {
    setPartnerSites(prev => prev.map(s => s.id === updatedSite.id ? updatedSite : s));
  };

  const handleDeletePartnerSite = (siteId) => {
    setPartnerSites(prev => prev.filter(s => s.id !== siteId));
  };

  // --- Office Records State ---
  const [officeRecords, setOfficeRecords] = useState([]);

  const handleAddOfficeRecord = (record) => {
    setOfficeRecords(prev => [...prev, record]);
  };

  const handleUpdateOfficeRecord = (updatedRecord) => {
    setOfficeRecords(prev => prev.map(r => r.id === updatedRecord.id ? updatedRecord : r));
  };

  const handleDeleteOfficeRecord = (recordId) => {
    setOfficeRecords(prev => prev.filter(r => r.id !== recordId));
  };

  // --- Templates State ---
  const [templates, setTemplates] = useState([]);

  const handleAddTemplate = (template) => {
    setTemplates(prev => [...prev, template]);
  };

  const handleUpdateTemplate = (updatedTemplate) => {
    setTemplates(prev => prev.map(t => t.id === updatedTemplate.id ? updatedTemplate : t));
  };

  const handleDeleteTemplate = (templateId) => {
    setTemplates(prev => prev.filter(t => t.id !== templateId));
  };

  // --- Agent Sites State ---
  const [agentSites, setAgentSites] = useState([]);

  const handleAddAgentSite = (site) => {
    setAgentSites(prev => [...prev, site]);
  };

  const handleUpdateAgentSite = (updatedSite) => {
    setAgentSites(prev => prev.map(s => s.id === updatedSite.id ? updatedSite : s));
  };

  const handleDeleteAgentSite = (siteId) => {
    setAgentSites(prev => prev.filter(s => s.id !== siteId));
  };

  // --- Website Wizard State ---
  const [websiteWizardData, setWebsiteWizardData] = useState(null);

  const setWizardData = (data) => {
    setWebsiteWizardData(data);
  };

  const clearWizardData = () => {
    setWebsiteWizardData(null);
  };

  const value = {
    // Partner Sites
    partnerSites,
    handleAddPartnerSite,
    handleUpdatePartnerSite,
    handleDeletePartnerSite,
    // Office Records
    officeRecords,
    handleAddOfficeRecord,
    handleUpdateOfficeRecord,
    handleDeleteOfficeRecord,
    // Templates
    templates,
    handleAddTemplate,
    handleUpdateTemplate,
    handleDeleteTemplate,
    // Agent Sites
    agentSites,
    handleAddAgentSite,
    handleUpdateAgentSite,
    handleDeleteAgentSite,
    // Website Wizard
    websiteWizardData,
    setWizardData,
    clearWizardData,
  };

  return (
    <PartnerSitesContext.Provider value={value}>
      {children}
    </PartnerSitesContext.Provider>
  );
}

export function usePartnerSites() {
  const context = useContext(PartnerSitesContext);
  if (!context) {
    throw new Error('usePartnerSites must be used within PartnerSitesProvider');
  }
  return context;
}

