import React, { useState, useMemo, useCallback } from 'react';
import DataTable from '../../../../components/common/DataTable';
import SearchBox from '../../../../components/common/SearchBox';
import Pagination from '../../../../components/common/Pagination';
import * as Icons from '../../../../constants/icons';

const InsuranceList = ({ policies, properties = [], onAddClick, onSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const formatCurrency = (amount) => {
    if (amount === undefined || amount === null) return '-';
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(amount);
  };

  const headers = [
    { value: 'carrierName', label: 'Carrier' },
    { 
      value: 'propertyName', 
      label: 'Property',
      render: (item) => {
        const property = properties.find(p => p.id === item.propertyId);
        return property?.propertyName || '-';
      }
    },
    { 
      value: 'policyNumber', 
      label: 'Policy #',
      render: (item) => item.policyNumber || '-'
    },
    { 
      value: 'policyType', 
      label: 'Type',
      render: (item) => item.policyType || '-'
    },
    { 
      value: 'annualPremium', 
      label: 'Annual Premium',
      render: (item) => <span className="font-semibold">{formatCurrency(item.annualPremium)}</span>
    },
    { 
      value: 'status', 
      label: 'Status',
      render: (item) => item.isPolicyActive ? 'Active' : 'Inactive'
    },
  ];

  const getStatusColor = (status) => {
    return status === 'Active' 
      ? { color: '#166534', bg: '#dcfce7' } 
      : { color: '#1f2937', bg: '#f3f4f6' };
  };

  const processedData = useMemo(() => {
    return policies.map(policy => ({
      ...policy,
      status: policy.isPolicyActive ? 'Active' : 'Inactive'
    }));
  }, [policies]);

  const filteredData = useMemo(() => {
    if (!searchTerm.trim()) return processedData;
    const search = searchTerm.toLowerCase();
    return processedData.filter((policy) => {
      const property = properties.find(p => p.id === policy.propertyId);
      return (
        policy.carrierName?.toLowerCase().includes(search) ||
        policy.policyNumber?.toLowerCase().includes(search) ||
        property?.propertyName?.toLowerCase().includes(search)
      );
    });
  }, [processedData, properties, searchTerm]);

  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

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
            <div className="flex-1">
              <SearchBox
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by carrier, policy number, property..."
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
            <span className="mr-1">+</span> Add Policy
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
            emptyMessage="No insurance policies found"
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

export default InsuranceList;

