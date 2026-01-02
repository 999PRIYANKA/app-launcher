import React, { useState, useMemo, useCallback } from 'react';
import DataTable from '../../../../../components/common/DataTable';
import SearchBox from '../../../../../components/common/SearchBox';
import Pagination from '../../../../../components/common/Pagination';
import * as Icons from '../../../../../constants/icons';

const LedgerTransactionList = ({ transactions, onAddClick, onSelect }) => {
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const headers = [
    { value: 'entryNumber', label: 'Entry #' },
    { 
      value: 'transactionDate', 
      label: 'Date',
      render: (item) => formatDate(item.transactionDate)
    },
    { 
      value: 'memo', 
      label: 'Memo',
      render: (item) => item.memo || '-'
    },
    { 
      value: 'lines', 
      label: 'Lines',
      render: (item) => `${item.lines?.length || 0} line(s)`
    },
    { 
      value: 'status', 
      label: 'Status',
      render: (item) => item.status || 'Draft'
    },
  ];

  const getStatusColor = (status) => {
    return status === 'Posted' 
      ? { color: '#166534', bg: '#dcfce7' } 
      : { color: '#854d0e', bg: '#fef9c3' };
  };

  const processedData = useMemo(() => {
    return transactions.map(trx => ({
      ...trx,
      status: trx.status || 'Draft'
    }));
  }, [transactions]);

  const filteredData = useMemo(() => {
    let filtered = processedData;

    if (filter === 'Posted') {
      filtered = filtered.filter(trx => trx.status === 'Posted');
    } else if (filter === 'Draft') {
      filtered = filtered.filter(trx => trx.status === 'Draft');
    }

    if (searchTerm.trim()) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(trx =>
        trx.entryNumber?.toLowerCase().includes(search) ||
        trx.memo?.toLowerCase().includes(search)
      );
    }

    return filtered;
  }, [processedData, filter, searchTerm]);

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
              <option value="All">All Entries</option>
              <option value="Posted">Posted</option>
              <option value="Draft">Draft</option>
            </select>
            <div className="flex-1">
              <SearchBox
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by entry number, memo..."
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
            <span className="mr-1">+</span> New Entry
          </button>
        </div>

        <div className="flex-1 flex flex-col space-y-4">
          <DataTable
            headers={headers}
            data={paginatedData}
            onRowClick={onSelect}
            statusField="status"
            showStatusAsText={true}
            getStatusColor={getStatusColor}
            emptyMessage="No journal entries found"
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

export default LedgerTransactionList;
