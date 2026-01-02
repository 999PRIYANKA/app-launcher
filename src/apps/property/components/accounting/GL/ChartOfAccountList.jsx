import React, { useState, useMemo, useCallback } from 'react';
import DataTable from '../../../../../components/common/DataTable';
import SearchBox from '../../../../../components/common/SearchBox';
import Pagination from '../../../../../components/common/Pagination';
import * as Icons from '../../../../../constants/icons';

const ChartOfAccountList = ({ accounts, onAddClick, onSelect }) => {
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  const formatCurrency = (amount) => {
    if (amount === undefined || amount === null) return '-';
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(amount);
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'Asset': return '#2563eb';
      case 'Liability': return '#dc2626';
      case 'Equity': return '#9333ea';
      case 'Income': return '#16a34a';
      case 'Expense': return '#ea580c';
      default: return '#6b7280';
    }
  };

  const headers = [
    { value: 'accountCode', label: 'Code' },
    { value: 'name', label: 'Account Name' },
    { 
      value: 'type', 
      label: 'Type',
      render: (item) => (
        <span style={{ color: getTypeColor(item.type), fontWeight: '500' }}>
          {item.type}
        </span>
      )
    },
    { value: 'normalBalance', label: 'Normal Balance' },
    { 
      value: 'balance', 
      label: 'Balance',
      render: (item) => <span className="font-semibold">{formatCurrency(item.balance)}</span>
    },
  ];

  const filteredData = useMemo(() => {
    let filtered = accounts;

    if (filter !== 'All') {
      const filterMap = {
        'Assets': 'Asset',
        'Liabilities': 'Liability',
        'Equity': 'Equity',
        'Income': 'Income',
        'Expenses': 'Expense'
      };
      const typeFilter = filterMap[filter];
      if (typeFilter) {
        filtered = filtered.filter(account => account.type === typeFilter);
      }
    }

    if (searchTerm.trim()) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(account =>
        account.accountCode?.toLowerCase().includes(search) ||
        account.name?.toLowerCase().includes(search)
      );
    }

    return filtered;
  }, [accounts, filter, searchTerm]);

  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filter]);

  const totalItems = filteredData.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  const pagination = useMemo(() => ({
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    hasNextPage: currentPage < totalPages,
    hasPrevPage: currentPage > 1,
  }), [currentPage, totalPages, totalItems]);

  const handlePageChange = useCallback((newPage) => {
    if (newPage >= 1 && newPage <= totalPages && newPage !== currentPage) {
      setCurrentPage(newPage);
    }
  }, [totalPages, currentPage]);

  const handlePrevPage = useCallback(() => {
    if (pagination.hasPrevPage) {
      setCurrentPage(currentPage - 1);
    }
  }, [pagination.hasPrevPage, currentPage]);

  const handleNextPage = useCallback(() => {
    if (pagination.hasNextPage) {
      setCurrentPage(currentPage + 1);
    }
  }, [pagination.hasNextPage, currentPage]);

  return (
    <div className="flex h-full bg-white">
      <div className="flex-1 flex flex-col p-6 overflow-hidden">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2 w-full">
            <select 
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-gray-700 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
            >
              <option value="All">All Accounts</option>
              <option value="Assets">Assets</option>
              <option value="Liabilities">Liabilities</option>
              <option value="Equity">Equity</option>
              <option value="Income">Income</option>
              <option value="Expenses">Expenses</option>
            </select>
            <div className="flex-1">
              <SearchBox
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by account code, name..."
                style={{
                  width: "100%",
                  height: "2rem",
                }}
                showSearchButton={true}
                onSearch={() => {}}
              />
            </div>
          </div>
          <button
            onClick={onAddClick} 
            className="flex items-center bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded-md shadow-sm whitespace-nowrap text-sm h-full"
          >
            <span className="mr-1">+</span> New Account
          </button>
        </div>

        <div className="flex-1 flex flex-col space-y-4">
          <DataTable
            headers={headers}
            data={paginatedData}
            onRowClick={onSelect}
            emptyMessage="No accounts found"
          />
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            hasNextPage={pagination.hasNextPage}
            hasPrevPage={pagination.hasPrevPage}
            onPageChange={handlePageChange}
            onPrevPage={handlePrevPage}
            onNextPage={handleNextPage}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartOfAccountList;
