import React from 'react';
import * as Icons from '../../../../constants/icons';

const RecordTypeModal = ({ onClose, onSelect }) => {
  const recordTypes = [
    { id: 'residential', label: 'Residential Lease', icon: <Icons.PropertiesIcon className="w-8 h-8" />, description: 'Standard residential rental agreement' },
    { id: 'commercial', label: 'Commercial Lease', icon: <Icons.BuildingOfficeIcon className="w-8 h-8" />, description: 'Commercial property lease agreement' },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={onClose}></div>
        
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                Select Lease Type
              </h3>
              <button 
                onClick={onClose}
                className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
              >
                <Icons.XIcon className="h-6 w-6" />
              </button>
            </div>
            
            <div className="mt-4 space-y-3">
              {recordTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => onSelect(type.label)}
                  className="w-full p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all text-left group"
                >
                  <div className="flex items-center space-x-4">
                    <div className="text-blue-600 group-hover:text-blue-700">
                      {type.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{type.label}</h4>
                      <p className="text-sm text-gray-500">{type.description}</p>
                    </div>
                    <Icons.ChevronRightIcon className="w-5 h-5 text-gray-400 group-hover:text-blue-600" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecordTypeModal;

