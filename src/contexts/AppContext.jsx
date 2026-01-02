import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  // Global Mode State
  const [siteMode, setSiteMode] = useState('backend');
  const [currentApp, setCurrentApp] = useState('Property');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState('DASHBOARD');
  const [currentView, setCurrentView] = useState('app');
  const [wizardApplicationId, setWizardApplicationId] = useState(null);
  const [retailSelectedPropertyId, setRetailSelectedPropertyId] = useState(null);
  
  // Navigation State Triggers
  const [autoOpenExpenseModal, setAutoOpenExpenseModal] = useState(false);
  const [autoOpenIncomeModal, setAutoOpenIncomeModal] = useState(false);
  
  // Deep Linking Data
  const [mortgageInitialData, setMortgageInitialData] = useState(undefined);
  const [insuranceInitialData, setInsuranceInitialData] = useState(undefined);
  const [taxInitialData, setTaxInitialData] = useState(undefined);
  const [hoaInitialData, setHoaInitialData] = useState(undefined);

  // Navigation Helpers
  // Note: These helpers open modals. Navigation to routes is handled by the components calling these.
  const handleRecordExpense = () => {
    setAutoOpenExpenseModal(true);
  };

  const handleRecordPayment = () => {
    setAutoOpenIncomeModal(true);
  };

  // Retail Mode Trigger
  const handleRetailApplyClick = (property) => {
    setRetailSelectedPropertyId(property.id || null);
    setWizardApplicationId('new-draft-id');
    setCurrentView('applicant-wizard');
  };

  const switchApp = (app) => {
    setCurrentApp(app);
    // Navigation is now handled by routes, no need to set activePage
  };

  // Nav Helpers for Deep Linking
  // Note: These helpers set initial data for modals. Navigation to routes should be handled by components.
  const handleNavigateToMortgageCreate = (propertyId) => {
    setMortgageInitialData({ propertyId });
  };

  const handleNavigateToInsuranceCreate = (propertyId) => {
    setInsuranceInitialData({ propertyId });
  };

  const handleNavigateToTaxCreate = (propertyId) => {
    setTaxInitialData({ propertyId });
  };

  const handleNavigateToHoaCreate = (propertyId) => {
    setHoaInitialData({ propertyId });
  };

  // Wizard Functions
  const openApplicantWizard = (applicationId) => {
    setWizardApplicationId(applicationId);
    setCurrentView('applicant-wizard');
  };

  const closeApplicantWizard = () => {
    setCurrentView('app');
    setWizardApplicationId(null);
    setRetailSelectedPropertyId(null);
  };

  const value = {
    // Mode & View
    siteMode,
    setSiteMode,
    currentApp,
    setCurrentApp,
    currentView,
    setCurrentView,
    sidebarOpen,
    setSidebarOpen,
    activePage,
    setActivePage,
    // Wizard
    wizardApplicationId,
    setWizardApplicationId,
    retailSelectedPropertyId,
    setRetailSelectedPropertyId,
    openApplicantWizard,
    closeApplicantWizard,
    // Navigation Triggers
    autoOpenExpenseModal,
    setAutoOpenExpenseModal,
    autoOpenIncomeModal,
    setAutoOpenIncomeModal,
    // Deep Linking
    mortgageInitialData,
    setMortgageInitialData,
    insuranceInitialData,
    setInsuranceInitialData,
    taxInitialData,
    setTaxInitialData,
    hoaInitialData,
    setHoaInitialData,
    // Navigation Helpers
    handleRecordExpense,
    handleRecordPayment,
    handleRetailApplyClick,
    switchApp,
    handleNavigateToMortgageCreate,
    handleNavigateToInsuranceCreate,
    handleNavigateToTaxCreate,
    handleNavigateToHoaCreate,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}

