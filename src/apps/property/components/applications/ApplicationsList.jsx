import React, { useState, useMemo, useCallback } from 'react';
import DataTable from '../../../../components/common/DataTable';
import SearchBox from '../../../../components/common/SearchBox';
import Pagination from '../../../../components/common/Pagination';
import * as Icons from '../../../../constants/icons';

const ApplicationsList = ({ applications, onAddApplicationClick, onSelectApplication }) => {
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const formatCurrency = (amount) => {
    if (amount === undefined || amount === null) return '-';
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(amount);
  };

  const headers = [
    { value: 'applicationNumber', label: 'App #' },
    { 
      value: 'applicantName', 
      label: 'Applicant',
      render: (item) => item.applicantName || `${item.legalFirstName || ''} ${item.legalLastName || ''}`.trim() || 'N/A'
    },
    { value: 'propertyName', label: 'Property' },
    { 
      value: 'desiredMoveInDate', 
      label: 'Move-In Date',
      render: (item) => item.desiredMoveInDate || '-'
    },
    { 
      value: 'proposedMonthlyRent', 
      label: 'Rent',
      render: (item) => <span className="font-semibold">{formatCurrency(item.proposedMonthlyRent)}</span>
    },
    { 
      value: 'applicationStatus', 
      label: 'Status',
      render: (item) => item.applicationStatus || 'Pending'
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved': return { color: '#166534', bg: '#dcfce7' };
      case 'Denied': return { color: '#991b1b', bg: '#fee2e2' };
      case 'Submitted': return { color: '#1e40af', bg: '#dbeafe' };
      default: return { color: '#854d0e', bg: '#fef9c3' };
    }
  };

  const filteredData = useMemo(() => {
    let filtered = applications;

    if (filter !== 'All') {
      filtered = filtered.filter(app => (app.applicationStatus || 'Pending') === filter);
    }

    if (searchTerm.trim()) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(app =>
        app.applicationNumber?.toLowerCase().includes(search) ||
        app.applicantName?.toLowerCase().includes(search) ||
        (app.legalFirstName && app.legalFirstName.toLowerCase().includes(search)) ||
        (app.legalLastName && app.legalLastName.toLowerCase().includes(search)) ||
        app.propertyName?.toLowerCase().includes(search)
      );
    }

    return filtered;
  }, [applications, filter, searchTerm]);

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
              <option value="All">All Applications</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Denied">Denied</option>
            </select>
            <div className="flex-1">
              <SearchBox
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by applicant name, property, application number..."
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
            onClick={onAddApplicationClick} 
            className="flex items-center bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded-md shadow-sm whitespace-nowrap text-sm h-full"
          >
            <span className="mr-1">+</span> New Application
          </button>
        </div>

        <div className="flex-1 flex flex-col space-y-4">
          <DataTable
            headers={headers}
            data={paginatedData}
            onRowClick={onSelectApplication}
            statusField="applicationStatus"
            showStatusAsText={true}
            getStatusColor={getStatusColor}
            emptyMessage="No applications found"
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

export default ApplicationsList;
