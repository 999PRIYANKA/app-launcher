import React from 'react';
import { Routes, Route } from 'react-router-dom';

// HR App Pages
import HRDashboardPage from '../apps/hr/pages/HRDashboardPage';
import EmployeesPage from '../apps/hr/pages/EmployeesPage';
import ApplicantsPage from '../apps/hr/pages/ApplicantsPage';
import InquiriesPage from '../apps/hr/pages/InquiriesPage';
import TrainingPage from '../apps/hr/pages/TrainingPage';
import HRTeamsPage from '../apps/hr/pages/HRTeamsPage';
import HROfficesPage from '../apps/hr/pages/HROfficesPage';

// HR App Routes
export const HRRoutes = () => {
  return (
    <Routes>
      <Route path="dashboard" element={<HRDashboardPage />} />
      <Route path="employees" element={<EmployeesPage />} />
      <Route path="applicants" element={<ApplicantsPage />} />
      <Route path="inquiries" element={<InquiriesPage />} />
      <Route path="training" element={<TrainingPage />} />
      <Route path="teams" element={<HRTeamsPage />} />
      <Route path="offices" element={<HROfficesPage />} />
      
      {/* Default redirect to dashboard */}
      <Route path="*" element={<HRDashboardPage />} />
    </Routes>
  );
};

export default HRRoutes;

