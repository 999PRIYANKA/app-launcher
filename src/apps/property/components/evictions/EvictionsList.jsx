import React, { useState, useMemo, useCallback } from 'react';
import DataTable from '../../../../components/common/DataTable';
import SearchBox from '../../../../components/common/SearchBox';
import Pagination from '../../../../components/common/Pagination';
import * as Icons from '../../../../constants/icons';

const EvictionsList = ({ evictions, properties = [], tenants = [], onAddClick, onSelect }) => {
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const headers = [
    { value: 'evictionNumber', label: 'Case #' },
    { 
      value: 'tenantName', 
      label: 'Tenant',
      render: (item) => {
        const tenant = tenants.find(t => t.id === item.tenantId);
        return tenant?.name || '-';
      }
    },
    { 
      value: 'propertyName', 
      label: 'Property',
      render: (item) => {
        const property = properties.find(p => p.id === item.propertyId);
        return property?.propertyName || '-';
      }
    },
    { 
      value: 'evictionType', 
      label: 'Type',
      render: (item) => item.evictionType || '-'
    },
    { 
      value: 'filingDate', 
      label: 'Filing Date',
      render: (item) => formatDate(item.filingDate)
    },
    { value: 'evictionStatus', label: 'Status' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Closed': return { color: '#1f2937', bg: '#f3f4f6' };
      case 'Filed with Court': return { color: '#1e40af', bg: '#dbeafe' };
      default: return { color: '#991b1b', bg: '#fee2e2' };
    }
  };

  const filteredData = useMemo(() => {
    let filtered = evictions;

    if (filter === 'Active') {
      filtered = filtered.filter(e => e.evictionStatus !== 'Closed');
    } else if (filter === 'Closed') {
      filtered = filtered.filter(e => e.evictionStatus === 'Closed');
    }

    if (searchTerm.trim()) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(eviction => {
        const property = properties.find(p => p.id === eviction.propertyId);
        const tenant = tenants.find(t => t.id === eviction.tenantId);
        return (
          eviction.evictionNumber?.toLowerCase().includes(search) ||
          tenant?.name?.toLowerCase().includes(search) ||
          property?.propertyName?.toLowerCase().includes(search)
        );
      });
    }

    return filtered;
  }, [evictions, properties, tenants, filter, searchTerm]);

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
              <option value="All">All Evictions</option>
              <option value="Active">Active</option>
              <option value="Closed">Closed</option>
            </select>
            <div className="flex-1">
              <SearchBox
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by case number, tenant, property..."
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
            <span className="mr-1">+</span> New Eviction
          </button>
        </div>

        <div className="flex-1 flex flex-col space-y-4">
          <DataTable
            headers={headers}
            data={paginatedData}
            onRowClick={onSelect}
            statusField="evictionStatus"
            showStatusAsText={true}
            getStatusColor={getStatusColor}
            emptyMessage="No evictions found"
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

export default EvictionsList;
