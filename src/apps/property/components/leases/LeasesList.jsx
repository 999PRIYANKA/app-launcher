import React, { useState, useMemo, useCallback } from 'react';
import DataTable from '../../../../components/common/DataTable';
import SearchBox from '../../../../components/common/SearchBox';
import Pagination from '../../../../components/common/Pagination';
import * as Icons from '../../../../constants/icons';

const LeasesList = ({ leases, onAddLeaseClick, onSelectLease }) => {
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const formatCurrency = (amount) => {
    if (amount === undefined || amount === null) return '-';
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(amount);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const headers = [
    { 
      value: 'leaseNumber', 
      label: 'Lease #',
      render: (item) => item.leaseNumber || 'N/A'
    },
    { value: 'property', label: 'Property' },
    { value: 'tenant', label: 'Tenant' },
    { 
      value: 'startDate', 
      label: 'Start Date',
      render: (item) => formatDate(item.startDate)
    },
    { 
      value: 'endDate', 
      label: 'End Date',
      render: (item) => formatDate(item.endDate)
    },
    { 
      value: 'amount', 
      label: 'Amount',
      render: (item) => <span className="font-semibold">{formatCurrency(item.amount)}</span>
    },
    { value: 'status', label: 'Status' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return { color: '#166534', bg: '#dcfce7' };
      case 'Ended': return { color: '#1f2937', bg: '#f3f4f6' };
      case 'Draft': return { color: '#854d0e', bg: '#fef9c3' };
      default: return { color: '#1e40af', bg: '#dbeafe' };
    }
  };

  const filteredData = useMemo(() => {
    let filtered = leases;

    if (filter === 'Active Leases') {
      filtered = filtered.filter(lease => lease.status === 'Active');
    } else if (filter === 'Ended Leases') {
      filtered = filtered.filter(lease => lease.status === 'Ended');
    } else if (filter === 'Draft Leases') {
      filtered = filtered.filter(lease => lease.status === 'Draft');
    }

    if (searchTerm.trim()) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(lease =>
        lease.leaseNumber?.toLowerCase().includes(search) ||
        lease.property?.toLowerCase().includes(search) ||
        lease.tenant?.toLowerCase().includes(search)
      );
    }

    return filtered;
  }, [leases, filter, searchTerm]);

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
              <option value="All">All Leases</option>
              <option value="Active Leases">Active Leases</option>
              <option value="Ended Leases">Ended Leases</option>
              <option value="Draft Leases">Draft Leases</option>
            </select>
            <div className="flex-1">
              <SearchBox
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by tenant, property, lease number..."
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
            onClick={onAddLeaseClick} 
            className="flex items-center bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded-md shadow-sm whitespace-nowrap text-sm h-full"
          >
            <span className="mr-1">+</span> Add Lease
          </button>
        </div>

        <div className="flex-1 flex flex-col space-y-4">
          <DataTable
            headers={headers}
            data={paginatedData}
            onRowClick={onSelectLease}
            statusField="status"
            showStatusAsText={true}
            getStatusColor={getStatusColor}
            emptyMessage="No leases found"
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

export default LeasesList;
