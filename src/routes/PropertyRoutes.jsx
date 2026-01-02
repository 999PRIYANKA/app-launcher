import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useProperty } from '../contexts/PropertyContext';
import { useApp } from '../contexts/AppContext';

// Property App Pages
import DashboardPage from '../apps/property/pages/DashboardPage';
import PropertiesPage from '../apps/property/pages/PropertiesPage';
import LeasesPage from '../apps/property/pages/LeasesPage';
import TenantsPage from '../apps/property/pages/TenantsPage';
import LandlordsPage from '../apps/property/pages/LandlordsPage';
import VendorsPage from '../apps/property/pages/VendorsPage';
import OpsMaintenancePage from '../apps/property/pages/OpsMaintenancePage';
import ListingsPage from '../apps/property/pages/ListingsPage';
import ApplicationsPage from '../apps/property/pages/ApplicationsPage';
import IncomePage from '../apps/property/pages/IncomePage';
import ExpensesPage from '../apps/property/pages/ExpensesPage';
import GLPage from '../apps/property/pages/GLPage';
import ARPage from '../apps/property/pages/ARPage';
import APPage from '../apps/property/pages/APPage';
import BankingPage from '../apps/property/pages/BankingPage';
import OwnerAccountingPage from '../apps/property/pages/OwnerAccountingPage';
import MortgagesPage from '../apps/property/pages/MortgagesPage';
import InsurancePage from '../apps/property/pages/InsurancePage';
import TaxPage from '../apps/property/pages/TaxPage';
import HOAPage from '../apps/property/pages/HOAPage';
import EvictionsPage from '../apps/property/pages/EvictionsPage';
import TenantMessagesPage from '../components/messaging/TenantMessagesPage';

// Wrapper components that bridge contexts to props (for backward compatibility)
const TenantMessagesPageWrapper = () => {
  const { conversations, messages, handleSendMessage } = useProperty();
  return (
    <TenantMessagesPage
      conversations={conversations}
      messages={messages}
      onSendMessage={handleSendMessage}
    />
  );
};

const TenantsPageWrapper = () => {
  const { tenants, properties, leases, applications, evictions, handleAddTenant, handleUpdateTenant } = useProperty();
  return (
    <TenantsPage
      tenants={tenants}
      properties={properties}
      leases={leases}
      applications={applications}
      evictions={evictions}
      onAddTenant={handleAddTenant}
      onUpdateTenant={handleUpdateTenant}
    />
  );
};

const LandlordsPageWrapper = () => {
  const { landlords, properties, leases, applications, evictions, handleAddLandlord, handleUpdateLandlord } = useProperty();
  return (
    <LandlordsPage
      landlords={landlords}
      properties={properties}
      leases={leases}
      applications={applications}
      evictions={evictions}
      onAddLandlord={handleAddLandlord}
      onUpdateLandlord={handleUpdateLandlord}
    />
  );
};

const VendorsPageWrapper = () => {
  const { vendors, handleAddVendor, handleUpdateVendor } = useProperty();
  return (
    <VendorsPage
      vendors={vendors}
      onAddVendor={handleAddVendor}
      onUpdateVendor={handleUpdateVendor}
    />
  );
};

const PropertiesPageWrapper = () => {
  const {
    properties,
    leases,
    tenants,
    mortgages,
    insurancePolicies,
    taxRecords,
    hoaAccounts,
    evictions,
    activities,
    tasks,
    handleLogActivity,
    handleAddTask,
    handleUpdateTask,
    handleAddProperty,
    handleUpdateProperty,
    handleAddLease,
    handleUpdateLease,
    handleDeleteLease,
    handleAddTenant,
    handleUpdateTenant,
    handleDeleteTenant,
    handleAddMortgage,
    handleUpdateMortgage,
    handleDeleteMortgage,
    handleAddInsurance,
    handleUpdateInsurance,
    handleDeleteInsurance,
    handleAddTaxRecord,
    handleUpdateTaxRecord,
    handleDeleteTaxRecord,
    handleAddHOA,
    handleUpdateHOA,
    handleDeleteHOA,
    handleAddEviction,
    handleUpdateEviction,
    handleDeleteEviction,
  } = useProperty();
  
  return (
    <PropertiesPage
      properties={properties}
      leases={leases}
      tenants={tenants}
      mortgages={mortgages}
      policies={insurancePolicies}
      taxRecords={taxRecords}
      hoaAccounts={hoaAccounts}
      evictions={evictions}
      activities={activities}
      tasks={tasks}
      onLogActivity={handleLogActivity}
      onAddTask={handleAddTask}
      onUpdateTask={handleUpdateTask}
      onAddProperty={handleAddProperty}
      onUpdateProperty={handleUpdateProperty}
      onAddLease={handleAddLease}
      onUpdateLease={handleUpdateLease}
      onDeleteLease={handleDeleteLease}
      onAddTenant={handleAddTenant}
      onUpdateTenant={handleUpdateTenant}
      onDeleteTenant={handleDeleteTenant}
      onAddMortgage={handleAddMortgage}
      onUpdateMortgage={handleUpdateMortgage}
      onDeleteMortgage={handleDeleteMortgage}
      onAddInsurance={handleAddInsurance}
      onUpdateInsurance={handleUpdateInsurance}
      onDeleteInsurance={handleDeleteInsurance}
      onAddTaxRecord={handleAddTaxRecord}
      onUpdateTaxRecord={handleUpdateTaxRecord}
      onDeleteTaxRecord={handleDeleteTaxRecord}
      onAddHOA={handleAddHOA}
      onUpdateHOA={handleUpdateHOA}
      onDeleteHOA={handleDeleteHOA}
      onAddEviction={handleAddEviction}
      onUpdateEviction={handleUpdateEviction}
      onDeleteEviction={handleDeleteEviction}
    />
  );
};

const MortgagesPageWrapper = () => {
  const { mortgages, properties, handleAddMortgage, handleUpdateMortgage } = useProperty();
  const { mortgageInitialData } = useApp();
  return (
    <MortgagesPage
      mortgages={mortgages}
      properties={properties}
      onAddMortgage={handleAddMortgage}
      onUpdateMortgage={handleUpdateMortgage}
      initialData={mortgageInitialData}
    />
  );
};

const InsurancePageWrapper = () => {
  const { insurancePolicies, properties, handleAddInsurance, handleUpdateInsurance } = useProperty();
  const { insuranceInitialData } = useApp();
  return (
    <InsurancePage
      policies={insurancePolicies}
      properties={properties}
      onAddInsurance={handleAddInsurance}
      onUpdateInsurance={handleUpdateInsurance}
      initialData={insuranceInitialData}
    />
  );
};

const TaxPageWrapper = () => {
  const { taxRecords, properties, handleAddTaxRecord, handleUpdateTaxRecord } = useProperty();
  const { taxInitialData } = useApp();
  return (
    <TaxPage
      taxRecords={taxRecords}
      properties={properties}
      onAddTaxRecord={handleAddTaxRecord}
      onUpdateTaxRecord={handleUpdateTaxRecord}
      initialData={taxInitialData}
    />
  );
};

const HOAPageWrapper = () => {
  const { hoaAccounts, properties, handleAddHOA, handleUpdateHOA } = useProperty();
  const { hoaInitialData } = useApp();
  return (
    <HOAPage
      hoaAccounts={hoaAccounts}
      properties={properties}
      onAddHOA={handleAddHOA}
      onUpdateHOA={handleUpdateHOA}
      initialData={hoaInitialData}
    />
  );
};

const OpsMaintenancePageWrapper = ({ initialTab }) => {
  const { properties } = useProperty();
  return <OpsMaintenancePage properties={properties} initialTab={initialTab} />;
};

const LeasesPageWrapper = () => {
  const { leases, properties, evictions, handleAddLease, handleUpdateLease } = useProperty();
  return (
    <LeasesPage
      leases={leases}
      properties={properties}
      evictions={evictions}
      onAddLease={handleAddLease}
      onUpdateLease={handleUpdateLease}
    />
  );
};

const EvictionsPageWrapper = () => {
  const { evictions, properties, tenants, leases, handleAddEviction, handleUpdateEviction, handleDeleteEviction } = useProperty();
  return (
    <EvictionsPage
      evictions={evictions}
      properties={properties}
      tenants={tenants}
      leases={leases}
      onAddEviction={handleAddEviction}
      onUpdateEviction={handleUpdateEviction}
      onDeleteEviction={handleDeleteEviction}
    />
  );
};

const ListingsPageWrapper = () => {
  const { properties } = useProperty();
  return <ListingsPage properties={properties} />;
};

const ApplicationsPageWrapper = () => {
  const { applications, properties, handleApplicationUpdate } = useProperty();
  const { openApplicantWizard } = useApp();
  return (
    <ApplicationsPage
      applications={applications}
      properties={properties}
      onUpdateApplication={handleApplicationUpdate}
      onOpenWizard={openApplicantWizard}
    />
  );
};

const IncomePageWrapper = () => {
  const { autoOpenIncomeModal, setAutoOpenIncomeModal } = useApp();
  return (
    <IncomePage
      autoOpenCreate={autoOpenIncomeModal}
      onAutoOpenHandled={() => setAutoOpenIncomeModal(false)}
    />
  );
};

const ExpensesPageWrapper = () => {
  const { autoOpenExpenseModal, setAutoOpenExpenseModal } = useApp();
  return (
    <ExpensesPage
      autoOpenCreate={autoOpenExpenseModal}
      onAutoOpenHandled={() => setAutoOpenExpenseModal(false)}
    />
  );
};

// Property App Routes
export const PropertyRoutes = () => {
  return (
    <Routes>
      <Route path="dashboard" element={<DashboardPage />} />
      <Route path="communications" element={<TenantMessagesPageWrapper />} />
      
      {/* Contacts */}
      <Route path="tenants" element={<TenantsPageWrapper />} />
      <Route path="landlords" element={<LandlordsPageWrapper />} />
      <Route path="vendors" element={<VendorsPageWrapper />} />
      
      {/* Properties */}
      <Route path="properties" element={<PropertiesPageWrapper />} />
      <Route path="mortgages" element={<MortgagesPageWrapper />} />
      <Route path="insurance" element={<InsurancePageWrapper />} />
      <Route path="tax-records" element={<TaxPageWrapper />} />
      <Route path="hoa" element={<HOAPageWrapper />} />
      
      {/* Ops & Maintenance */}
      <Route path="work-orders" element={<OpsMaintenancePageWrapper initialTab="Work Orders" />} />
      <Route path="inspections" element={<OpsMaintenancePageWrapper initialTab="Inspections" />} />
      <Route path="turns" element={<OpsMaintenancePageWrapper initialTab="Turns" />} />
      
      {/* Leasing */}
      <Route path="listings" element={<ListingsPageWrapper />} />
      <Route path="applications" element={<ApplicationsPageWrapper />} />
      <Route path="leases" element={<LeasesPageWrapper />} />
      <Route path="evictions" element={<EvictionsPageWrapper />} />
      
      {/* Accounting */}
      <Route path="income" element={<IncomePageWrapper />} />
      <Route path="expenses" element={<ExpensesPageWrapper />} />
      <Route path="general-ledger" element={<GLPage />} />
      <Route path="accounts-receivable" element={<ARPage />} />
      <Route path="accounts-payable" element={<APPage />} />
      <Route path="banking" element={<BankingPage />} />
      <Route path="owner-accounting" element={<OwnerAccountingPage />} />
      
      {/* Default redirect to dashboard */}
      <Route path="*" element={<DashboardPage />} />
    </Routes>
  );
};

export default PropertyRoutes;

