import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Hard Money App Pages
import HardMoneyDashboardPage from '../apps/hard-money/pages/HardMoneyDashboardPage';
import LoanLeadsPage from '../apps/hard-money/pages/LoanLeadsPage';
import LoanApplicationsPage from '../apps/hard-money/pages/LoanApplicationsPage';
import BorrowersPage from '../apps/hard-money/pages/BorrowersPage';
import ActiveLoansPage from '../apps/hard-money/pages/ActiveLoansPage';
import ServicingPage from '../apps/hard-money/pages/ServicingPage';
import LendingOfficesPage from '../apps/hard-money/pages/LendingOfficesPage';

// Hard Money App Routes
export const HardMoneyRoutes = () => {
  return (
    <Routes>
      <Route path="dashboard" element={<HardMoneyDashboardPage />} />
      <Route path="loan-leads" element={<LoanLeadsPage />} />
      <Route path="loan-applications" element={<LoanApplicationsPage />} />
      <Route path="borrowers" element={<BorrowersPage />} />
      <Route path="active-loans" element={<ActiveLoansPage />} />
      <Route path="servicing" element={<ServicingPage />} />
      <Route path="lending-offices" element={<LendingOfficesPage />} />
      
      {/* Default redirect to dashboard */}
      <Route path="*" element={<HardMoneyDashboardPage />} />
    </Routes>
  );
};

export default HardMoneyRoutes;

