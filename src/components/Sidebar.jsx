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
    
    const isActive = activeItem === item.name;
    
    return (
      <a
        key={item.name}
        href="#"
        className="flex items-center font-medium relative"
        style={{
          display: "flex",
          fontSize: isNested ? "12px" : "14px",
          alignItems: "center",
          gap: "12px",
          paddingLeft: isNested ? "12px" : (isActive ? "20px" : "16px"),
          paddingRight: isActive ? "20px" : "16px",
          paddingTop: isNested ? "6px" : "10px",
          paddingBottom: isNested ? "6px" : "10px",
          borderRadius: isNested ? "6px" : "8px",
          transition: "all 0.25s ease",
          color: isActive ? "white" : "#4B5563",
          backgroundColor: isActive ? "#3B82F6" : "transparent",
          textDecoration: "none",
          marginBottom: isNested ? "4px" : "0",
        }}
        onMouseEnter={(e) => {
          if (!isActive) {
            e.currentTarget.style.backgroundColor = "#F3F4F6";
            e.currentTarget.style.color = "#1F2937";
          } else {
            e.currentTarget.style.paddingLeft = isNested ? "12px" : "20px";
            e.currentTarget.style.paddingRight = "20px";
          }
        }}
        onMouseLeave={(e) => {
          if (!isActive) {
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.color = "#4B5563";
          } else {
            e.currentTarget.style.paddingLeft = isNested ? "12px" : "20px";
            e.currentTarget.style.paddingRight = "20px";
          }
        }}
        onClick={handleClick}
      >
        <span className="flex-shrink-0" style={{ display: "flex", alignItems: "center" }}>
          {item.icon}
        </span>
        <span>{item.name}</span>
      </a>
    );
  };

  return (
    <>
    <div className={`fixed inset-y-0 left-0 z-30 w-72 bg-white transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}
    onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the sidebar
    >
        <div className={`fixed top-0 left-0 h-screen w-72 bg-white text-gray-700 flex flex-col shadow-xl border-r border-gray-200 transform transition-transform duration-300 z-100 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            {/* Header Area with App Launcher */}
            <div className="flex items-center px-6 py-5 text-gray-900">
                <button 
                    onClick={() => setIsLauncherOpen(true)}
                    className="mr-3 p-1.5 rounded-md hover:bg-gray-100 text-gray-600 hover:text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-200"
                    title="App Launcher"
                >
                    <Icons.AppGridIcon className="w-6 h-6" />
                </button>
                <div className="flex items-center text-xl font-bold cursor-default text-gray-900">
                    <Icons.LogoIcon className="w-7 h-7 text-brand-teal" /> 
                    <span className="ml-2">Dwellio</span>
                </div>
            </div>

            <div className="px-6 pb-6 text-center text-gray-900">
                <div className="w-16 h-16 mx-auto bg-brand-teal/20 rounded-full flex items-center justify-center text-2xl font-bold mb-2 border-2 border-brand-teal text-brand-teal">DW</div>
                <h3 className="font-semibold text-sm text-gray-900">Dustin Wyatt</h3>
                <p className="text-xs text-gray-600">{currentApp === 'HardMoney' ? 'Lending' : currentApp} App</p>
            </div>
            <nav className="flex-1 overflow-y-auto py-2">
              {navSections.map((section, sectionIndex) => {
                // Sections with titles are collapsible, sections without titles are always open
                const isOpen = section.title ? (openSection === section.title) : true;
                
                // Check if any item in this section is active
                const isSectionActive = section.items?.some(item => activeItem === item.name);

                return (
                  <div key={sectionIndex} className={sectionIndex > 0 ? "mt-2" : ""}>
                    {section.title ? (
                      <div 
                        className={`flex items-center gap-3 px-4 py-2 rounded-lg mb-1 text-sm font-medium cursor-pointer transition-all duration-250 ${
                          isSectionActive
                            ? "bg-blue-500 text-white"
                            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          toggleSection(section.title);
                        }}
                      >
                          {section.icon && (
                            <span className="flex-shrink-0" style={{ display: "flex", alignItems: "center" }}>
                              {section.icon}
                            </span>
                          )}
                          <span style={{ fontSize: "0.875rem" }} className="flex-1">
                            {section.title}
                          </span>
                          <svg 
                            className={`transition-transform duration-250 flex-shrink-0 ${
                              isSectionActive ? "text-white" : "text-gray-400"
                            } ${isOpen ? "rotate-90" : "rotate-0"}`}
                            style={{ width: "10px", height: "10px" }}
                            xmlns="http://www.w3.org/2000/svg" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor" 
                            strokeWidth={2}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                          </svg>
                      </div>
                    ) : (
                        sectionIndex > 0 && <div className="mt-4"></div>
                    )}
                    
                    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${!section.title || isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                      <ul className="py-2 space-y-1">
                        {section.items.map((item) => (
                          <li key={item.name} className={section.title ? "pl-4" : ""}>
                            <NavLink item={item} isNested={!!section.title} />
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </nav>
            <div className="flex items-center justify-around p-4 border-t border-gray-200 bg-white">
              {bottomIcons.map(item => (
                <a 
                  href="#" 
                  key={item.name} 
                  className="text-gray-600 hover:text-gray-900 transition-colors p-2 hover:bg-gray-100 rounded-lg"
                  style={{ fontSize: "0.875rem" }}
                >
                  {item.icon}
                </a>
              ))}
            </div>
        </div>
    </div>
    {sidebarOpen && <div className="fixed inset-0 bg-black bg-opacity-30 z-20" onClick={() => setSidebarOpen(false)}></div>}
    
    {/* App Launcher Modal */}
    <AppLauncherModal 
        isOpen={isLauncherOpen} 
        onClose={() => setIsLauncherOpen(false)}
        onSelectApp={handleAppSelect}
    />
    </>
  );
};

export default Sidebar;

