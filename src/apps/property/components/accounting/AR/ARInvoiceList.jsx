import React, { useState, useMemo, useCallback } from 'react';
import DataTable from '../../../../../components/common/DataTable';
import SearchBox from '../../../../../components/common/SearchBox';
import Pagination from '../../../../../components/common/Pagination';
import * as Icons from '../../../../../constants/icons';

const ARInvoiceList = ({ invoices, onAddClick, onSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const headers = [
    { value: 'invoiceNumber', label: 'Invoice #' },
    { value: 'tenantName', label: 'Tenant' },
    { 
      value: 'invoiceDate', 
      label: 'Date',
      render: (item) => item.invoiceDate || '-'
    },
    { 
      value: 'amount', 
      label: 'Amount',
      render: (item) => <span className="text-right">${item.amount.toLocaleString()}</span>
    },
    { 
      value: 'balance', 
      label: 'Balance',
      render: (item) => <span className="text-right">${item.balance.toLocaleString()}</span>
    },
    { 
      value: 'status', 
      label: 'Status',
      render: (item) => item.status || 'Draft'
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Paid': return { color: '#166534', bg: '#dcfce7' };
      case 'Posted': return { color: '#1e40af', bg: '#dbeafe' };
      case 'Draft': return { color: '#1f2937', bg: '#f3f4f6' };
      default: return { color: '#991b1b', bg: '#fee2e2' };
    }
  };

  const processedData = useMemo(() => {
    return invoices.map(inv => ({
      ...inv,
      status: inv.status || 'Draft'
    }));
  }, [invoices]);

  const filteredData = useMemo(() => {
    if (!searchTerm.trim()) return processedData;
    const search = searchTerm.toLowerCase();
    return processedData.filter(inv =>
      inv.invoiceNumber?.toLowerCase().includes(search) ||
      inv.tenantName?.toLowerCase().includes(search) ||
      inv.propertyName?.toLowerCase().includes(search)
    );
  }, [processedData, searchTerm]);

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
    <div className="flex h-full bg-white flex-col p-6">
        <div className="flex justify-between mb-6">
            <div className="w-64">
                <SearchBox
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search invoices..."
                    style={{
                        width: "100%",
                        height: "2rem",
                    }}
                    showSearchButton={true}
                    onSearch={() => {}}
                />
            </div>
            <button 
                onClick={onAddClick} 
                className="bg-blue-600 text-white px-4 py-2 rounded-md font-medium text-sm hover:bg-blue-700 flex items-center"
            >
                <Icons.PlusCircleIcon className="w-4 h-4 mr-2" /> New Invoice
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
                emptyMessage="No invoices found"
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
  );
};

export default ARInvoiceList;
