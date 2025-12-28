import React from 'react';
import { ChevronLeftIcon } from '../../../../constants/icons';
import { useNavigate } from 'react-router-dom';

const RecordPanelLayout = ({
  title,
  subtitle,
  actions,
  children,
  onBack,
}) => {
  const navigate = useNavigate();
  const handleBack = onBack || (() => navigate(-1));

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-6 py-5 shadow-sm">
        <div className="flex items-center space-x-4 mb-4">
          <button
            onClick={handleBack}
            className="text-gray-400 hover:text-gray-700 transition-colors p-1 -ml-1"
          >
            <ChevronLeftIcon className="w-6 h-6" />
          </button>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
            {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
          </div>
          <div className="flex items-center space-x-3">{actions}</div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {children}
      </div>
    </div>
  );
};

export default RecordPanelLayout;

