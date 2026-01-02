import React, { useState } from 'react';
import CollectionStats from '../../../components/CollectionStats';
import OccupancyStats from '../../../components/OccupancyStats';
import OpenMaintenanceRequests from '../../../components/OpenMaintenanceRequests';
import UnsignedLeases from '../../../components/UnsignedLeases';
import ApplicationsProcessing from '../../../components/ApplicationsProcessing';
import * as Icons from '../../../constants/icons';

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const YEARS = ['2025', '2024']; //check

const DashboardPage = () => {
  const currentMonthIdx = new Date().getMonth();
  const [selectedMonth, setSelectedMonth] = useState(MONTHS[currentMonthIdx]);
  const [selectedYear, setSelectedYear] = useState('2025');

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-6">
      {/* Global Plecto-Style Filter Bar */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
            <Icons.CalendarDaysIcon className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-black text-gray-900 uppercase tracking-tight">Report Period</h2>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Global Dashboard Filter</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center bg-gray-50 rounded-xl p-1 border border-gray-200">
            <select 
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="bg-transparent text-sm font-black text-gray-700 px-3 py-1.5 outline-none cursor-pointer"
            >
              {MONTHS.map(m => <option key={m} value={m}>{m.toUpperCase()}</option>)}
            </select>
          </div>

          <div className="flex items-center bg-gray-50 rounded-xl p-1 border border-gray-200">
            {YEARS.map(year => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={`px-4 py-1.5 text-xs font-black rounded-lg transition-all ${selectedYear === year ? 'bg-blue-700 text-white shadow-md' : 'text-gray-400 hover:text-gray-600'}`}
              >
                {year}
              </button>
            ))}
          </div>

          <button 
            onClick={() => {
              setSelectedMonth(MONTHS[currentMonthIdx]);
              setSelectedYear('2025');
            }}
            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
            title="Reset to current"
          >
            <Icons.RefreshIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Main content area */}
        <div className="xl:col-span-2 flex flex-col gap-6">
          <CollectionStats month={selectedMonth} year={selectedYear} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <UnsignedLeases />
            <ApplicationsProcessing />
          </div>
        </div>

        {/* Right sidebar area */}
        <div className="xl:col-span-1 flex flex-col gap-6">
          <OccupancyStats month={selectedMonth} year={selectedYear} />
          <OpenMaintenanceRequests month={selectedMonth} year={selectedYear} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

