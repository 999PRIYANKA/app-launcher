import React from 'react';
import { useLocation, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import ApplicantWizardPage from './pages/ApplicantWizardPage';
import DevModeToggle from './components/common/DevModeToggle';
import RetailApp from './components/retail/RetailApp';
import TenantPortal from './components/tenant/TenantPortal';
import SoftPhone from './components/softphone/SoftPhone';
import { PropertyProvider, useProperty } from './contexts/PropertyContext';
import { AppProvider, useApp } from './contexts/AppContext';
import { HRProvider } from './contexts/HRContext';
import { SalesProvider } from './contexts/SalesContext';
import { HardMoneyProvider } from './contexts/HardMoneyContext';
import { PartnerSitesProvider } from './contexts/PartnerSitesContext';
import { FounderProvider } from './contexts/FounderContext';
import { CRMConnectProvider } from './contexts/CRMConnectContext';

// Import route components
import PropertyRoutes from './routes/PropertyRoutes';
import HRRoutes from './routes/HRRoutes';
import SalesRoutes from './routes/SalesRoutes';
import HardMoneyRoutes from './routes/HardMoneyRoutes';
import PartnerSitesRoutes from './routes/PartnerSitesRoutes';
import FounderRoutes from './routes/FounderRoutes';
import CRMConnectRoutes from './routes/CRMConnectRoutes';
import { APP_ROUTES } from './config/appRoutes';

function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();
  // Get state from contexts
  const appState = useApp();
  const propertyState = useProperty();
  
  // Sync currentApp with route for ALL apps
  // This ensures the sidebar shows correct tabs based on the current route
  React.useEffect(() => {
    const pathname = location.pathname;
    let newApp = appState.currentApp; // Default to current
    
    // Determine app from route
    if (pathname.startsWith('/app/founder')) {
      newApp = 'Founder';
    } else if (pathname.startsWith('/app/partner-sites')) {
      newApp = 'PartnerSites';
    } else if (pathname.startsWith('/app/crm-connect')) {
      newApp = 'CRMConnect';
    } else if (pathname.startsWith('/app/hr')) {
      newApp = 'HR';
    } else if (pathname.startsWith('/app/sales')) {
      newApp = 'Sales';
    } else if (pathname.startsWith('/app/hard-money')) {
      newApp = 'HardMoney';
    } else if (pathname.startsWith('/app/property')) {
      newApp = 'Property';
    }
    
    // Update currentApp if it changed
    if (appState.currentApp !== newApp) {
      appState.setCurrentApp(newApp);
    }
  }, [location.pathname, appState]);

  // Destructure app state
  const {
    siteMode,
    setSiteMode,
    currentApp,
    sidebarOpen,
    setSidebarOpen,
    currentView,
    wizardApplicationId,
    retailSelectedPropertyId,
    autoOpenExpenseModal,
    setAutoOpenExpenseModal,
    autoOpenIncomeModal,
    setAutoOpenIncomeModal,
    mortgageInitialData,
    insuranceInitialData,
    taxInitialData,
    hoaInitialData,
    handleRecordExpense,
    handleRecordPayment,
    handleRetailApplyClick,
    switchApp,
    openApplicantWizard,
    closeApplicantWizard,
  } = appState;

  // Destructure property state
  const {
    properties,
    handleAddProperty,
    handleUpdateProperty,
    leases,
    handleAddLease,
    handleUpdateLease,
    handleDeleteLease,
    tenants,
    handleAddTenant,
    handleUpdateTenant,
    handleDeleteTenant,
    landlords,
    handleAddLandlord,
    handleUpdateLandlord,
    vendors,
    handleAddVendor,
    handleUpdateVendor,
    mortgages,
    handleAddMortgage,
    handleUpdateMortgage,
    handleDeleteMortgage,
    insurancePolicies,
    handleAddInsurance,
    handleUpdateInsurance,
    handleDeleteInsurance,
    taxRecords,
    handleAddTaxRecord,
    handleUpdateTaxRecord,
    handleDeleteTaxRecord,
    hoaAccounts,
    handleAddHOA,
    handleUpdateHOA,
    handleDeleteHOA,
    evictions,
    handleAddEviction,
    handleUpdateEviction,
    handleDeleteEviction,
    maintenanceRequests,
    handleAddMaintenanceRequest,
    applications,
    handleApplicationUpdate,
    conversations,
    messages,
    handleSendMessage,
    activities,
    tasks,
    handleLogActivity,
    handleAddTask,
    handleUpdateTask,
  } = propertyState;

  // Wizard submit handler (needs access to applications)
  const handleWizardSubmit = (completedApp) => {
    const finalApp = { ...completedApp };
    if (wizardApplicationId === 'new-draft-id' || !finalApp.id || finalApp.id === '1') { 
      finalApp.id = Math.random().toString(36).substr(2, 9);
      finalApp.applicationNumber = `APP-${2025 + applications.length + 1}`;
    }
    handleApplicationUpdate(finalApp);
    closeApplicantWizard();
  };


  // If wizard is active (Application Mode), it takes over full screen regardless of siteMode 
  if (currentView === 'applicant-wizard' && wizardApplicationId) {
    return (
        <>
            <DevModeToggle currentMode={siteMode} onModeChange={setSiteMode} />
            <ApplicantWizardPage 
                applicationId={wizardApplicationId} 
                onExit={closeApplicantWizard}
                onSubmit={handleWizardSubmit}
            />
        </>
    );
  }

  // Format Page Title from route
  const getPageTitle = () => {
    const pathname = location.pathname;
    if (pathname === '/' || pathname === '/app' || pathname.endsWith('/dashboard')) {
      return 'Dashboard';
    }
    
    // Extract last part of path
    const lastPart = pathname.split('/').pop();
    if (!lastPart) return 'Dashboard';
    
    // Convert kebab-case to Title Case
    const title = lastPart
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    
    // Special cases
    if (title === 'Hoa') return 'HOA';
    if (title === 'Tax Records') return 'Tax Records';
    
    return title;
  };
  
  const pageTitle = getPageTitle();

  // MAIN RENDER SWITCH based on Mode
  return (
    <div className="min-h-screen bg-gray-100">
      <DevModeToggle currentMode={siteMode} onModeChange={setSiteMode} />
      
      {siteMode === 'backend' && (
        <div className="relative h-screen flex overflow-hidden bg-gray-100 font-sans text-gray-800">
          <Sidebar 
            sidebarOpen={sidebarOpen} 
            setSidebarOpen={setSidebarOpen} 
            currentApp={currentApp}
            onSwitchApp={switchApp}
          />
          <div className="flex-1 flex flex-col overflow-hidden ml-0"
          onClick={() => sidebarOpen && setSidebarOpen(false)} // Closes sidebar when main area is clicked
          >
            <Header 
                setSidebarOpen={setSidebarOpen} 
                title={pageTitle === 'Hoa' ? 'HOA' : pageTitle} 
                onRecordExpense={currentApp === 'Property' ? () => {
                  navigate(APP_ROUTES.PROPERTY.EXPENSES);
                  handleRecordExpense();
                } : undefined}
                onRecordPayment={currentApp === 'Property' ? () => {
                  navigate(APP_ROUTES.PROPERTY.INCOME);
                  handleRecordPayment();
                } : undefined}
            />
            <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
              <Routes>
                {/* Property App Routes */}
                <Route path="/app/property/*" element={<PropertyRoutes />} />
                
                {/* HR App Routes */}
                <Route path="/app/hr/*" element={<HRRoutes />} />
                
                {/* Sales App Routes */}
                <Route path="/app/sales/*" element={<SalesRoutes />} />
                
                {/* Hard Money App Routes */}
                <Route path="/app/hard-money/*" element={<HardMoneyRoutes />} />
                
                {/* Partner Sites App Routes */}
                <Route path="/app/partner-sites/*" element={<PartnerSitesRoutes />} />
                
                {/* Founder App Routes */}
                <Route path="/app/founder/*" element={<FounderRoutes />} />
                
                {/* CRM Connect App Routes */}
                <Route path="/app/crm-connect/*" element={<CRMConnectRoutes />} />
                
                {/* Default redirect to property dashboard */}
                <Route path="*" element={<Navigate to={APP_ROUTES.PROPERTY.DASHBOARD} replace />} />
              </Routes>
            </main>
            <footer className="text-center p-4 text-gray-500 text-sm border-t bg-white">
              ©2025 Dwellio LLC || Dwellio's <a href="#" className="text-blue-500 hover:underline">Terms and Conditions</a> and <a href="#" className="text-blue-500 hover:underline">Privacy Policy</a>.
            </footer>
          </div>
          
          {/* SoftPhone Component: Floating over all apps */}
          <SoftPhone />
        </div>
      )}

      {siteMode === 'retail' && (
          <RetailApp 
            properties={properties}
            onApplyClick={handleRetailApplyClick}
          />
      )}

      {siteMode === 'tenant' && (
          <TenantPortal 
            maintenanceRequests={maintenanceRequests}
            onCreateMaintenanceRequest={handleAddMaintenanceRequest}
            conversations={conversations}
            messages={messages}
            onSendMessage={handleSendMessage}
          />
      )}
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <PropertyProvider>
        <HRProvider>
          <SalesProvider>
            <HardMoneyProvider>
              <PartnerSitesProvider>
                <FounderProvider>
                  <CRMConnectProvider>
                    <AppContent />
                  </CRMConnectProvider>
                </FounderProvider>
              </PartnerSitesProvider>
            </HardMoneyProvider>
          </SalesProvider>
        </HRProvider>
      </PropertyProvider>
    </AppProvider>
  );
}

export default App;
