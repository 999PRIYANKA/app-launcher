import React, { useState, useMemo, useCallback } from 'react';
import DataTable from '../../../../components/common/DataTable';
import SearchBox from '../../../../components/common/SearchBox';
import Pagination from '../../../../components/common/Pagination';
import * as Icons from '../../../../constants/icons';

const TenantsList = ({ tenants, onAddTenantClick, onSelectTenant }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const headers = [
    { value: 'name', label: 'Name' },
    { value: 'property', label: 'Property' },
    { value: 'email', label: 'Email' },
    { value: 'phone', label: 'Phone' },
    { value: 'status', label: 'Status' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Current':
        return { color: '#166534', bg: '#dcfce7' }; // green-800, green-100
      case 'Past':
        return { color: '#1f2937', bg: '#f3f4f6' }; // gray-800, gray-100
      default:
        return { color: '#854d0e', bg: '#fef9c3' }; // yellow-800, yellow-100
    }
  };

  const filteredData = useMemo(() => {
    let filtered = tenants;

    // Apply status filter
    if (statusFilter !== 'All') {
      filtered = filtered.filter(tenant => tenant.status === statusFilter);
    }

    // Apply search filter
    if (searchTerm.trim()) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter((tenant) =>
        Object.values(tenant).some(
          (val) =>
            val !== null &&
            val !== undefined &&
            String(val).toLowerCase().includes(search)
        )
      );
    }

    return filtered;
  }, [tenants, statusFilter, searchTerm]);

  // Reset to page 1 when search term or filter changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter]);

  // Calculate pagination
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
        {/* Header Actions */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2 w-full">
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-gray-700 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
            >
              <option value="All">All Tenants</option>
              <option value="Current">Current Tenants</option>
              <option value="Past">Past Tenants</option>
            </select>
            <div className="flex-1">
              <SearchBox
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name, email, phone, property..."
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
            onClick={onAddTenantClick} 
            className="flex items-center bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded-md shadow-sm whitespace-nowrap text-sm h-full"
          >
            <span className="mr-1">+</span> Add Tenant
          </button>
        </div>

        {/* DataTable */}
        <div className="flex-1 flex flex-col space-y-4">
          <DataTable
            headers={headers}
            data={paginatedData}
            onRowClick={onSelectTenant}
            statusField="status"
            showStatusAsText={true}
            getStatusColor={getStatusColor}
            emptyMessage="No tenants found"
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

export default TenantsList;

