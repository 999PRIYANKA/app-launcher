import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Sales App Pages
import SalesDashboardPage from '../apps/sales/pages/SalesDashboardPage';
import LeadsPage from '../apps/sales/pages/LeadsPage';
import OpportunitiesPage from '../apps/sales/pages/OpportunitiesPage';
import AccountsPage from '../apps/sales/pages/AccountsPage';
import ContactsPage from '../apps/sales/pages/ContactsPage';

// Sales App Routes
export const SalesRoutes = () => {
  return (
    <Routes>
      <Route path="dashboard" element={<SalesDashboardPage />} />
      <Route path="leads" element={<LeadsPage />} />
      <Route path="opportunities" element={<OpportunitiesPage />} />
      <Route path="accounts" element={<AccountsPage />} />
      <Route path="contacts" element={<ContactsPage />} />
      
      {/* Default redirect to dashboard */}
      <Route path="*" element={<SalesDashboardPage />} />
    </Routes>
  );
};

export default SalesRoutes;

