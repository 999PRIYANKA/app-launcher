import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { APP_ROUTES } from '../config/appRoutes';
import AppLayout from '../components/Layout/AppLayout';
import DevModeToggle from '../components/common/DevModeToggle';
import ApplicantWizardPage from '../pages/ApplicantWizardPage';
import RetailApp from '../components/retail/RetailApp';
import TenantPortal from '../components/tenant/TenantPortal';
import { useApp } from '../contexts/AppContext';
import { useProperty } from '../contexts/PropertyContext';

// Import all app route components
import PropertyRoutes from './PropertyRoutes';
import HRRoutes from './HRRoutes';
import SalesRoutes from './SalesRoutes';
import HardMoneyRoutes from './HardMoneyRoutes';
import PartnerSitesRoutes from './PartnerSitesRoutes';
import FounderRoutes from './FounderRoutes';

// Wrapper for AppLayout that handles mode switching
const AppLayoutWrapper = () => {
  const { siteMode } = useApp();
  
  if (siteMode !== 'backend') {
    return null; // Mode switching handled in App.jsx for now
  }
  
  return <AppLayout />;
};

// Wizard route wrapper
const ApplicantWizardRoute = () => {
  const { wizardApplicationId, closeApplicantWizard, siteMode, setSiteMode } = useApp();
  const { applications, handleApplicationUpdate } = useProperty();
  
  const handleWizardSubmit = (completedApp) => {
    const finalApp = { ...completedApp };
    if (wizardApplicationId === 'new-draft-id' || !finalApp.id || finalApp.id === '1') { 
      finalApp.id = Math.random().toString(36).substr(2, 9);
      finalApp.applicationNumber = `APP-${2025 + applications.length + 1}`;
    }
    handleApplicationUpdate(finalApp);
    closeApplicantWizard();
  };
  
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
};

// Retail mode wrapper
const RetailAppWrapper = () => {
  const { properties } = useProperty();
  const { handleRetailApplyClick } = useApp();
  
  return (
    <RetailApp 
      properties={properties}
      onApplyClick={handleRetailApplyClick}
    />
  );
};

// Tenant portal wrapper
const TenantPortalWrapper = () => {
  const { maintenanceRequests, handleAddMaintenanceRequest, conversations, messages, handleSendMessage } = useProperty();
  
  return (
    <TenantPortal 
      maintenanceRequests={maintenanceRequests}
      onCreateMaintenanceRequest={handleAddMaintenanceRequest}
      conversations={conversations}
      messages={messages}
      onSendMessage={handleSendMessage}
    />
  );
};

// Main App Router Component
const AppRouterContent = () => {
  const { siteMode } = useApp();
  
  return (
    <div className="min-h-screen bg-gray-100">
      <DevModeToggle currentMode={siteMode} onModeChange={() => {}} />
      
      <Routes>
        {/* Special routes that take over full screen */}
        <Route path="/applicant-wizard/:id?" element={<ApplicantWizardRoute />} />
        
        {/* Main app routes with layout */}
        <Route path="/" element={<AppLayoutWrapper />}>
          {/* Property App Routes */}
          <Route path="app/property/*" element={<PropertyRoutes />} />
          
          {/* HR App Routes */}
          <Route path="app/hr/*" element={<HRRoutes />} />
          
          {/* Sales App Routes */}
          <Route path="app/sales/*" element={<SalesRoutes />} />
          
          {/* Hard Money App Routes */}
          <Route path="app/hard-money/*" element={<HardMoneyRoutes />} />
          
          {/* Partner Sites App Routes */}
          <Route path="app/partner-sites/*" element={<PartnerSitesRoutes />} />
          
          {/* Founder App Routes */}
          <Route path="app/founder/*" element={<FounderRoutes />} />
          
          {/* Default redirect */}
          <Route path="*" element={<Navigate to="/app/property/dashboard" replace />} />
        </Route>
        
        {/* Mode-specific routes (handled separately for now) */}
        {siteMode === 'retail' && (
          <Route path="*" element={<RetailAppWrapper />} />
        )}
        
        {siteMode === 'tenant' && (
          <Route path="*" element={<TenantPortalWrapper />} />
        )}
      </Routes>
    </div>
  );
};

// Main App Router - wraps with BrowserRouter
export const AppRouter = () => {
  return (
    <BrowserRouter>
      <AppRouterContent />
    </BrowserRouter>
  );
};

export default AppRouter;
