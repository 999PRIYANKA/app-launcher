import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import * as Icons from '../constants/icons';
import AppLauncherModal from './common/AppLauncherModal';
import { APP_ROUTES } from '../config/appRoutes';
import { getAppConfig } from '../config/appConfig';

function Sidebar({ sidebarOpen, setSidebarOpen, currentApp = 'Property', onSwitchApp }) {
  const navigate = useNavigate();
  const location = useLocation();
  // Track the currently open section title. Closed by default.
  const [openSection, setOpenSection] = useState(null);
  const [isLauncherOpen, setIsLauncherOpen] = useState(false);
  // Manage activeItem state internally based on routes
  const [activeItem, setActiveItem] = useState('DASHBOARD');
  // Track previous pathname to detect route changes
  const prevPathnameRef = useRef(location.pathname);
  
  // Sync activeItem with current route for all apps
  useEffect(() => {
    const appConfig = getAppConfig(currentApp);
    const pathnameChanged = prevPathnameRef.current !== location.pathname;
    prevPathnameRef.current = location.pathname;
    
    if (appConfig && appConfig.sidebarConfig) {
      // Find the active item by matching route
      let foundActive = false;
      for (const section of appConfig.sidebarConfig) {
        if (section.items) {
          for (const item of section.items) {
            // Check if current pathname matches the route or starts with it (for nested routes)
            if (item.route && (location.pathname === item.route || location.pathname.startsWith(item.route + '/'))) {
              if (activeItem !== item.name) {
                setActiveItem(item.name);
              }
              // Only auto-open section when pathname actually changes (navigating to a new route)
              // This allows manual closing to work without being overridden
              if (section.title && pathnameChanged && openSection !== section.title) {
                setOpenSection(section.title);
              }
              foundActive = true;
              return;
            }
          }
        }
      }
      
      // If on Partner Sites dashboard, open VARIANTS section by default for visibility
      if (!foundActive && currentApp === 'PartnerSites' && location.pathname === APP_ROUTES.PARTNER_SITES.DASHBOARD && pathnameChanged && openSection !== 'VARIANTS') {
        setOpenSection('VARIANTS');
      }
    }
  }, [location.pathname, currentApp]);

  const toggleSection = (title) => {
    // If clicking the already open section, close it. Otherwise, open the new one.
    setOpenSection(prev => prev === title ? null : title);
  };

  const handleAppSelect = (appName) => {
      // Navigate to route for all apps
      if (appName === 'Founder App') {
          navigate(APP_ROUTES.FOUNDER.DASHBOARD);
          onSwitchApp?.('Founder');
      } else if (appName === 'Partner Sites App') {
          navigate(APP_ROUTES.PARTNER_SITES.DASHBOARD);
          onSwitchApp?.('PartnerSites');
      } else if (appName === 'CRM Connect App') {
          navigate(APP_ROUTES.CRM_CONNECT.DASHBOARD);
          onSwitchApp?.('CRMConnect');
      } else if (appName === 'Sales App') {
          navigate(APP_ROUTES.SALES.DASHBOARD);
          onSwitchApp?.('Sales');
      } else if (appName === 'HR App') {
          navigate(APP_ROUTES.HR.DASHBOARD);
          onSwitchApp?.('HR');
      } else if (appName === 'Hard Money Loan App') {
          navigate(APP_ROUTES.HARD_MONEY.DASHBOARD);
          onSwitchApp?.('HardMoney');
      } else {
          navigate(APP_ROUTES.PROPERTY.DASHBOARD);
          onSwitchApp?.('Property');
      }
      setIsLauncherOpen(false);
  };

  const navSections = useMemo(() => {
      // Use appConfig for all apps to get routes
      const activeApp = currentApp || 'Property';
      const appConfig = getAppConfig(activeApp);
      
      if (appConfig && appConfig.sidebarConfig) {
          return appConfig.sidebarConfig;
      }
      
      // Fallback if config not found
      return [
          {
              items: [
                  { name: 'DASHBOARD', icon: <Icons.DashboardIcon /> },
              ],
          },
      ];
  }, [currentApp, location.pathname]);

  const bottomIcons = [
    { name: 'Settings', icon: <Icons.SettingsIcon /> },
    { name: 'Account', icon: <Icons.AccountIcon /> },
    { name: 'Logout', icon: <Icons.LogoutIcon /> },
  ];
  
  const NavLink = ({ item, isNested }) => {
    const handleClick = (e) => {
      e.preventDefault();
      
      // Use route navigation for all apps
      if (item.route) {
        navigate(item.route);
        setActiveItem(item.name);
        setSidebarOpen(false);
      } else {
        // Fallback if no route defined
        setActiveItem(item.name);
        setSidebarOpen(false);
      }
    };
    
    return (
      <a
        key={item.name}
        href="#"
        className={`flex items-center py-3 text-sm font-medium transition-colors duration-200 relative 
        ${isNested ? 'pl-14 pr-6' : 'px-6'} 
        ${
          activeItem === item.name
            ? 'text-white bg-brand-dark-blue-light'
            : 'text-gray-400 hover:text-white hover:bg-brand-dark-blue-light'
        }`}
        onClick={handleClick}
      >
        {item.icon}
        <span className="ml-4">{item.name}</span>
        {activeItem === item.name && (
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-8 border-l-gray-50"></div>
        )}
      </a>
    );
  };

  return (
    <>
    <div className={`fixed inset-y-0 left-0 z-30 w-64 bg-brand-dark-blue transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}
    onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the sidebar
    >
        <div className="flex flex-col h-full bg-brand-dark-blue">
            {/* Header Area with App Launcher */}
            <div className="flex items-center px-6 py-5 text-white">
                <button 
                    onClick={() => setIsLauncherOpen(true)}
                    className="mr-3 p-1.5 rounded-md hover:bg-white/10 text-gray-300 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white/20"
                    title="App Launcher"
                >
                    <Icons.AppGridIcon className="w-6 h-6" />
                </button>
                <div className="flex items-center text-xl font-bold cursor-default">
                    <Icons.LogoIcon className="w-7 h-7 text-brand-teal" /> 
                    <span className="ml-2">Dwellio</span>
                </div>
            </div>

            <div className="px-6 pb-6 text-center text-white">
                <div className="w-16 h-16 mx-auto bg-brand-teal/20 rounded-full flex items-center justify-center text-2xl font-bold mb-2 border-2 border-brand-teal text-brand-teal">DW</div>
                <h3 className="font-semibold text-sm">Dustin Wyatt</h3>
                <p className="text-xs text-gray-400">{currentApp === 'HardMoney' ? 'Lending' : currentApp} App</p>
            </div>
            <nav className="flex-1 overflow-y-auto py-2">
              {navSections.map((section, sectionIndex) => {
                // Sections with titles are collapsible, sections without titles are always open
                const isOpen = section.title ? (openSection === section.title) : true;

                return (
                  <div key={sectionIndex}>
                    {section.title ? (
                      <div 
                        className={`
                            flex items-center justify-between cursor-pointer transition-colors duration-200 py-2
                            ${isOpen 
                                ? "px-6 mt-4 mb-2 text-xs font-semibold text-white uppercase tracking-wider bg-brand-dark-blue-light bg-opacity-20" 
                                : "px-6 mt-4 mb-2 text-xs font-semibold text-gray-500 group hover:text-gray-300 uppercase tracking-wider"
                            }
                        `}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          toggleSection(section.title);
                        }}
                      >
                          <div className="flex items-center">
                              {section.icon && (
                                  <span className={`mr-4 ${isOpen ? 'text-white' : 'text-gray-500 group-hover:text-gray-300'}`}>{section.icon}</span>
                              )}
                              <span>{section.title}</span>
                          </div>
                          
                          <Icons.ChevronRightIcon 
                            className={`w-4 h-4 transition-transform duration-200 
                                ${isOpen ? 'rotate-90 text-white' : 'text-gray-500 group-hover:text-gray-300'}
                            `} 
                          />
                      </div>
                    ) : (
                        sectionIndex > 0 && <div className="mt-4"></div>
                    )}
                    
                    <div className={`space-y-1 overflow-hidden transition-all duration-300 ${!section.title || isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                      {section.items.map((item) => <NavLink key={item.name} item={item} isNested={!!section.title} />)}
                    </div>
                  </div>
                );
              })}
            </nav>
            <div className="flex items-center justify-around p-4 border-t border-gray-700 bg-black/10">
              {bottomIcons.map(item => (
                <a href="#" key={item.name} className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full">
                  {item.icon}
                </a>
              ))}
            </div>
        </div>
    </div>
    {sidebarOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-20" onClick={() => setSidebarOpen(false)}></div>}
    
    {/* App Launcher Modal */}
    <AppLauncherModal 
        isOpen={isLauncherOpen} 
        onClose={() => setIsLauncherOpen(false)}
        onSelectApp={handleAppSelect}
    />
    </>
  );
}

export default Sidebar;

