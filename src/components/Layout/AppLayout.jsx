import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../Sidebar';
import Header from '../Header';
import SoftPhone from '../softphone/SoftPhone';
import { useApp } from '../../contexts/AppContext';

function AppLayout() {
  const location = useLocation();
  const { 
    sidebarOpen, 
    setSidebarOpen,
    currentApp,
    switchApp,
    handleRecordExpense,
    handleRecordPayment,
  } = useApp();
  
  // Extract app ID from route path
  const pathParts = location.pathname.split('/');
  const appRoute = pathParts[1] === 'app' ? pathParts[2] : null;
  
  // Map route to app display name
  const routeToAppMap = {
    'property': 'Property',
    'hr': 'HR',
    'sales': 'Sales',
    'hard-money': 'HardMoney',
    'partner-sites': 'PartnerSites',
    'founder': 'Founder',
  };
  
  const currentAppFromRoute = appRoute ? routeToAppMap[appRoute] || 'Property' : currentApp;
  
  // Get page title from route
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
  
  return (
    <div className="relative h-screen flex overflow-hidden bg-gray-100 font-sans text-gray-800">
      <Sidebar 
        sidebarOpen={sidebarOpen} 
        setSidebarOpen={setSidebarOpen} 
        currentApp={currentAppFromRoute}
        onSwitchApp={switchApp}
      />
      <div 
        className="flex-1 flex flex-col overflow-hidden ml-0"
        onClick={() => sidebarOpen && setSidebarOpen(false)}
      >
        <Header 
          setSidebarOpen={setSidebarOpen} 
          title={pageTitle}
          onRecordExpense={currentAppFromRoute === 'Property' ? handleRecordExpense : undefined}
          onRecordPayment={currentAppFromRoute === 'Property' ? handleRecordPayment : undefined}
        />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
          <Outlet />
        </main>
        <footer className="text-center p-4 text-gray-500 text-sm border-t bg-white">
          ©2025 Dwellio LLC || Dwellio's <a href="#" className="text-blue-500 hover:underline">Terms and Conditions</a> and <a href="#" className="text-blue-500 hover:underline">Privacy Policy</a>.
        </footer>
      </div>
      
      {/* SoftPhone Component: Floating over backend */}
      <SoftPhone />
    </div>
  );
}

export default AppLayout;

