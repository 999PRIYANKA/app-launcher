import React, { useState } from 'react';
import * as Icons from '../../constants/icons';



const RecordSection= ({ title, defaultOpen = true, children }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors focus:outline-none"
      >
        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">{title}</h3>
        <Icons.ChevronRightIcon className={`w-5 h-5 text-gray-400 transform transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`} />
      </button>
      
      {isOpen && (
        <div className="px-6 pb-6 pt-2 border-t border-gray-100">
            {children}
        </div>
      )}
    </div>
  );
};

export default RecordSection;


