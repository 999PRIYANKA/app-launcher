import React from 'react';
import * as Icons from '../../constants/icons';



const DevModeToggle= ({ currentMode, onModeChange }) => {
  return (
    <div className="fixed bottom-4 right-4 z-50 bg-white border border-gray-300 rounded-lg shadow-lg p-2 flex items-center space-x-2">
      <div className="text-xs font-bold text-gray-500 uppercase mr-2 flex items-center">
        <Icons.SettingsIcon className="w-3 h-3 mr-1" />
        Dev Mode
      </div>
      <div className="flex bg-gray-100 rounded-md p-1">
        <button
          onClick={() => onModeChange('retail')}
          className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
            currentMode === 'retail' 
              ? 'bg-blue-600 text-white shadow-sm' 
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
          }`}
        >
          Retail
        </button>
        <button
          onClick={() => onModeChange('tenant')}
          className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
            currentMode === 'tenant' 
              ? 'bg-green-600 text-white shadow-sm' 
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
          }`}
        >
          Tenant
        </button>
        <button
          onClick={() => onModeChange('backend')}
          className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
            currentMode === 'backend' 
              ? 'bg-brand-dark-blue text-white shadow-sm' 
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
          }`}
        >
          Backend
        </button>
      </div>
    </div>
  );
};

export default DevModeToggle;


