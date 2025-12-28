import React from 'react';
import * as Icons from '../../constants/icons';

const apps = [
  { id: 'founder', name: 'Founder App', description: 'Executive command center and aggregated KPIs.', icon: <Icons.ChartBarIcon className="w-8 h-8 text-indigo-600" /> },
  { id: 'property', name: 'Property App', description: 'Manage leases, maintenance, and tenants.', icon: <Icons.BuildingOfficeIcon className="w-8 h-8 text-blue-600" /> },
  { id: 'sales', name: 'Sales App', description: 'Manage leads, opportunities, and revenue.', icon: <Icons.BanknotesIcon className="w-8 h-8 text-green-600" /> },
  { id: 'hr', name: 'HR App', description: 'Manage employees, recruiting, and training.', icon: <Icons.UserGroupIcon className="w-8 h-8 text-purple-600" /> },
  { id: 'hardmoney', name: 'Hard Money Loan App', description: 'Manage lending origination and servicing.', icon: <Icons.BankIcon className="w-8 h-8 text-emerald-600" /> },
  { id: 'partnersites', name: 'Partner Sites App', description: 'Manage partner websites and templates.', icon: <Icons.BuildingStoreIcon className="w-8 h-8 text-orange-600" /> },
  { id: 'crmconnect', name: 'CRM Connect App', description: 'Communications intelligence and SoftPhone widget.', icon: <Icons.PhoneIcon className="w-8 h-8 text-blue-600" /> },
];

function AppLauncherModal({ isOpen, onClose, onSelectApp }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-gray-900 bg-opacity-60 backdrop-blur-sm" onClick={onClose}></div>

      {/* Modal Content */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden transform transition-all animate-fade-in-up">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex-shrink-0 flex justify-between items-center bg-gray-50/50">
          <h2 className="text-xl font-bold text-gray-800 flex items-center">
            <Icons.AppGridIcon className="w-6 h-6 mr-2 text-brand-dark-blue" />
            App Launcher
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100 transition-colors">
            <Icons.XIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Grid - Scrollable Area */}
        <div className="p-8 grid grid-cols-1 sm:grid-cols-2 gap-6 bg-white overflow-y-auto">
          {apps.map((app) => (
            <div
              key={app.id}
              onClick={() => onSelectApp(app.name)}
              className="group flex flex-col items-center p-6 border border-gray-200 rounded-xl hover:border-blue-500 hover:shadow-lg hover:bg-blue-50/30 cursor-pointer transition-all duration-200 text-center"
            >
              <div className="p-4 bg-gray-100 rounded-full mb-4 group-hover:scale-110 transition-transform duration-200 group-hover:bg-white group-hover:shadow-sm">
                {app.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-700">{app.name}</h3>
              <p className="text-sm text-gray-500 leading-relaxed group-hover:text-gray-600">{app.description}</p>
            </div>
          ))}
        </div>
        
        {/* Footer/Tip */}
        <div className="px-6 py-3 bg-gray-50 text-center border-t border-gray-100 flex-shrink-0">
            <p className="text-xs text-gray-400">Select an app to switch contexts</p>
        </div>
      </div>
    </div>
  );
}

export default AppLauncherModal;

