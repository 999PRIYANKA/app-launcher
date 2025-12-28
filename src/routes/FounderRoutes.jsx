import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Founder App Pages
import FounderDashboardPage from '../apps/founder/pages/FounderDashboardPage';

// Founder App Routes
export const FounderRoutes = () => {
  return (
    <Routes>
      <Route path="dashboard" element={<FounderDashboardPage />} />
      
      {/* Default redirect to dashboard */}
      <Route path="*" element={<FounderDashboardPage />} />
    </Routes>
  );
};

export default FounderRoutes;

