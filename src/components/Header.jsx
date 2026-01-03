import React from 'react';
import * as Icons from '../constants/icons';

function Header({ setSidebarOpen, title, onRecordPayment, onRecordExpense }) {
  return (
    <header className="flex items-center justify-between p-4 bg-white border-b">
      <div className="flex items-center">
        <button onClick={() => setSidebarOpen(true)} className="text-gray-500 focus:outline-none">
          <Icons.MenuIcon className="h-6 w-6" />
        </button>
        <h1 className="text-2xl font-semibold text-gray-800 ml-2">{title}</h1>
      </div>

      <div className="flex items-center space-x-4">
        <div className="hidden md:flex flex-col items-end">
          <div className="flex items-center justify-between w-64">
            <span className="text-sm font-semibold text-brand-teal">Dwellio Guided Setup</span>
            <span className="text-sm text-gray-500">0/5</span>
          </div>
          <div className="w-64 bg-gray-200 rounded-full h-1.5 mt-1">
            <div className="bg-brand-teal h-1.5 rounded-full w-0"></div>
          </div>
        </div>
        
        <button className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100">
          <Icons.SearchIcon className="h-5 w-5" />
        </button>

        <div className="hidden sm:flex items-center space-x-2">
            <button 
                onClick={onRecordPayment}
                className="flex items-center bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-4 py-2 rounded-md text-sm border border-gray-200"
            >
                <Icons.RecordPaymentIcon className="mr-2 w-5 h-5" />
                Record Payment
            </button>
            <button 
                onClick={onRecordExpense}
                className="flex items-center bg-red-100 hover:bg-red-200 text-red-700 font-semibold px-4 py-2 rounded-md text-sm border border-red-200"
            >
                <Icons.ExpensesIcon className="mr-2 w-5 h-5" />
                Record Expense
            </button>
            {title === 'Dashboard' && (
              <button className="flex items-center bg-blue-100 hover:bg-blue-200 text-blue-700 font-semibold px-4 py-2 rounded-md text-sm border border-blue-200">
                  <Icons.AddTenantIcon className="mr-2 w-5 h-5" />
                  Add Tenant
              </button>
            )}
        </div>
      </div>
    </header>
  );
}

export default Header;

