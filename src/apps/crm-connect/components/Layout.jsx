import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  PhoneIcon, 
  ClockIcon, 
  UserGroupIcon, 
  VoicemailIcon, 
  AppGridIcon, 
  ChevronDoubleLeftIcon, 
  ChevronDoubleRightIcon,
  MenuIcon,
  XMarkIcon,
  ChatBubbleOvalLeftIcon,
  DashboardIcon,
  UsersIcon
} from '../../../constants/icons';
import { APP_ROUTES } from '../../../config/appRoutes';

const NavItem = ({ to, icon: Icon, label, isActive, isCollapsed }) => (
  <Link
    to={to}
    className={`flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-all duration-200 group ${
      isActive
        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200'
        : 'text-slate-400 hover:bg-slate-800 hover:text-white'
    } ${isCollapsed ? 'justify-center px-0' : ''}`}
    title={isCollapsed ? label : ''}
  >
    <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-white' : 'text-slate-500 group-hover:text-indigo-400'}`} />
    {!isCollapsed && <span className="font-medium text-sm truncate">{label}</span>}
  </Link>
);

const CollapsibleSection = ({ 
    id, 
    label, 
    icon: Icon,
    isExpanded,
    isCollapsed,
    onToggle,
    children 
}) => {
    if (isCollapsed) {
        return <div className="space-y-1">{children}</div>;
    }

    return (
        <div className="space-y-1">
            <button 
              onClick={onToggle}
              className={`w-full flex items-center justify-between px-2 py-2 text-[10px] font-bold uppercase tracking-[0.1em] rounded-md transition-colors ${
                  isExpanded ? 'text-indigo-400 bg-slate-900' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
                <div className="flex items-center space-x-2">
                    <Icon className="w-3 h-3" />
                    <span>{label}</span>
                </div>
                <span className={`transition-transform duration-200 transform ${isExpanded ? 'rotate-90' : ''}`}>
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="9 5l7 7-7 7" /></svg>
                </span>
            </button>
            {isExpanded && (
                <div className="pl-2 space-y-1 animate-in fade-in slide-in-from-top-1 duration-200">
                    {children}
                </div>
            )}
        </div>
    );
};

export const Layout = () => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState('voice');

  // Close mobile menu on navigation
  useEffect(() => {
    setIsMobileMenuOpen(false);
    
    // Auto-expand section based on current route
    if (location.pathname.includes('/sms')) {
        setExpandedSection('sms');
    } else if (location.pathname.includes('/communications') || 
               location.pathname.includes('/calls') || 
               location.pathname.includes('/phone-numbers') || 
               location.pathname.includes('/recordings') || 
               location.pathname.includes('/voicemails') || 
               location.pathname.includes('/participants')) {
        setExpandedSection('voice');
    } else {
        setExpandedSection('workspace');
    }
  }, [location.pathname]);

  const isActive = (path) => {
    // Remove base path and check against relative path
    const relativePath = location.pathname.replace(APP_ROUTES.CRM_CONNECT.BASE, '') || '/';
    return relativePath === path || relativePath.startsWith(path + '/');
  };

  const SidebarContent = () => (
    <>
      <div className="h-16 flex items-center justify-between px-6 border-b border-slate-800">
        <div className={`flex items-center space-x-2 ${isCollapsed ? 'hidden' : 'flex'}`}>
          <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center font-bold text-white shrink-0">C</div>
          <span className="text-white font-bold tracking-tight">CRM CONNECT</span>
        </div>
        {isCollapsed && (
          <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center font-bold text-white mx-auto">C</div>
        )}
        <button 
          onClick={() => setIsMobileMenuOpen(false)} 
          className="md:hidden text-slate-400 hover:text-white"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-8">
          <CollapsibleSection 
              id="workspace" 
              label="Workspace" 
              icon={GridIcon}
              isExpanded={expandedSection === 'workspace'}
              isCollapsed={isCollapsed}
              onToggle={() => setExpandedSection(prev => prev === 'workspace' ? null : 'workspace')}
          >
              <NavItem to={APP_ROUTES.CRM_CONNECT.DASHBOARD} icon={DashboardIcon} label="Dashboard" isActive={isActive('/dashboard') || isActive('/')} isCollapsed={isCollapsed} />
              <NavItem to={APP_ROUTES.CRM_CONNECT.CONTACTS} icon={UsersIcon} label="Contacts" isActive={isActive('/contacts')} isCollapsed={isCollapsed} />
          </CollapsibleSection>

          <CollapsibleSection 
              id="voice" 
              label="Voice" 
              icon={PhoneIcon}
              isExpanded={expandedSection === 'voice'}
              isCollapsed={isCollapsed}
              onToggle={() => setExpandedSection(prev => prev === 'voice' ? null : 'voice')}
          >
              <NavItem to={APP_ROUTES.CRM_CONNECT.CALLS} icon={PhoneIcon} label="Call Logs" isActive={isActive('/calls')} isCollapsed={isCollapsed} />
              <NavItem to={APP_ROUTES.CRM_CONNECT.PHONE_NUMBERS} icon={PhoneIcon} label="Phone Numbers" isActive={isActive('/phone-numbers')} isCollapsed={isCollapsed} />
              <NavItem to={APP_ROUTES.CRM_CONNECT.RECORDINGS} icon={ClockIcon} label="Recordings" isActive={isActive('/recordings')} isCollapsed={isCollapsed} />
              <NavItem to={APP_ROUTES.CRM_CONNECT.VOICEMAILS} icon={VoicemailIcon} label="Voicemails" isActive={isActive('/voicemails')} isCollapsed={isCollapsed} />
              <NavItem to={APP_ROUTES.CRM_CONNECT.PARTICIPANTS} icon={UserGroupIcon} label="Participants" isActive={isActive('/participants')} isCollapsed={isCollapsed} />
          </CollapsibleSection>

          <CollapsibleSection 
              id="sms" 
              label="SMS" 
              icon={ChatBubbleOvalLeftIcon}
              isExpanded={expandedSection === 'sms'}
              isCollapsed={isCollapsed}
              onToggle={() => setExpandedSection(prev => prev === 'sms' ? null : 'sms')}
          >
              <NavItem to={APP_ROUTES.CRM_CONNECT.SMS} icon={ChatBubbleOvalLeftIcon} label="SMS Logs" isActive={isActive('/sms')} isCollapsed={isCollapsed} />
          </CollapsibleSection>
      </div>
      
      <div className="p-4 bg-slate-900/50 border-t border-slate-800">
          <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'}`}>
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-xs shrink-0">DW</div>
              {!isCollapsed && (
                <div className="text-sm min-w-0">
                    <p className="text-white font-semibold truncate">Dustin Wyatt</p>
                    <p className="text-slate-500 text-xs">Admin Account</p>
                </div>
              )}
          </div>
          
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="mt-6 w-full flex items-center justify-center py-2 text-slate-500 hover:text-white hover:bg-slate-800 rounded-lg transition-colors hidden md:flex"
          >
            {isCollapsed ? <ChevronDoubleRightIcon className="w-5 h-5" /> : <ChevronDoubleLeftIcon className="w-5 h-5" />}
          </button>
      </div>
    </>
  );

  return (
    <div className="flex h-screen w-full bg-slate-50 overflow-hidden relative">
      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-slate-950/50 z-[60] md:hidden backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar - Desktop & Mobile */}
      <aside className={`
        fixed inset-y-0 left-0 z-[70] bg-slate-950 flex flex-col border-r border-slate-800 transition-all duration-300
        ${isMobileMenuOpen ? 'translate-x-0 w-64' : '-translate-x-full w-64'}
        md:relative md:translate-x-0 
        ${isCollapsed ? 'md:w-20' : 'md:w-64'}
      `}>
        <SidebarContent />
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full relative overflow-hidden bg-gray-50 min-w-0">
        {/* Mobile Header Toggle */}
        <header className="md:hidden flex items-center justify-between px-4 h-16 bg-white border-b border-slate-200 shrink-0">
          <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 -ml-2 text-slate-600">
            <MenuIcon className="w-6 h-6" />
          </button>
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-indigo-500 rounded flex items-center justify-center font-bold text-white text-[10px]">C</div>
            <span className="text-slate-900 font-bold text-sm">CRM CONNECT</span>
          </div>
          <div className="w-6 h-6" /> {/* Spacer */}
        </header>

        <div className="flex-1 overflow-hidden">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

