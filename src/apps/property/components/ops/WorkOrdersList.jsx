import React, { useState, useMemo, useCallback } from 'react';
import DataTable from '../../../../components/common/DataTable';
import SearchBox from '../../../../components/common/SearchBox';
import Pagination from '../../../../components/common/Pagination';
import * as Icons from '../../../../constants/icons';

const WorkOrdersList = ({ workOrders, onAddWorkOrderClick, onSelectWorkOrder }) => {
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const formatCurrency = (amount) => {
    if (amount === undefined || amount === null) return '-';
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(amount);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Emergency': return { color: '#991b1b', bg: '#fee2e2' };
      case 'High': return { color: '#9a3412', bg: '#fed7aa' };
      case 'Medium': return { color: '#854d0e', bg: '#fef9c3' };
      case 'Low': return { color: '#166534', bg: '#dcfce7' };
      default: return { color: '#1f2937', bg: '#f3f4f6' };
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return { color: '#166534', bg: '#dcfce7' };
      case 'In Progress': return { color: '#1e40af', bg: '#dbeafe' };
      case 'Scheduled': return { color: '#854d0e', bg: '#fef9c3' };
      case 'Cancelled': return { color: '#1f2937', bg: '#f3f4f6' };
      default: return { color: '#1f2937', bg: '#f3f4f6' };
    }
  };

  const headers = [
    { value: 'workOrderNumber', label: 'WO #' },
    { value: 'title', label: 'Title' },
    { value: 'property', label: 'Property' },
    { 
      value: 'priority', 
      label: 'Priority',
      render: (item) => {
        const colors = getPriorityColor(item.priority);
        return (
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '0.25rem 0.75rem',
              borderRadius: '0.375rem',
              backgroundColor: colors.bg,
              color: colors.color,
              fontSize: '0.75rem',
              fontWeight: '600',
            }}
          >
            {item.priority}
          </span>
        );
      }
    },
    { 
      value: 'status', 
      label: 'Status',
      render: (item) => {
        const colors = getStatusColor(item.status);
        return (
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '0.25rem 0.75rem',
              borderRadius: '0.375rem',
              backgroundColor: colors.bg,
              color: colors.color,
              fontSize: '0.75rem',
              fontWeight: '600',
            }}
          >
            {item.status}
          </span>
        );
      }
    },
    { value: 'category', label: 'Category' },
    { 
      value: 'estimatedCost', 
      label: 'Est. Cost',
      render: (item) => <span className="font-semibold">{formatCurrency(item.estimatedCost)}</span>
    },
  ];

  const filteredData = useMemo(() => {
    let filtered = workOrders;

    // Apply status filter
    if (filter !== 'All') {
      filtered = filtered.filter(wo => wo.status === filter);
    }

    // Apply search filter
    if (searchTerm.trim()) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(wo =>
        wo.workOrderNumber?.toLowerCase().includes(search) ||
        wo.title?.toLowerCase().includes(search) ||
        wo.property?.toLowerCase().includes(search)
      );
    }

    return filtered;
  }, [workOrders, filter, searchTerm]);

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
        {/* Header Actions */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2 w-full">
            <select 
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-gray-700 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
            >
              <option value="All">All Work Orders</option>
              <option value="New">New</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
            <div className="flex-1">
              <SearchBox
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by work order number, title, property..."
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
            onClick={onAddWorkOrderClick} 
            className="flex items-center bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded-md shadow-sm whitespace-nowrap text-sm h-full"
          >
            <span className="mr-1">+</span> New Work Order
          </button>
        </div>

        {/* DataTable */}
        <div className="flex-1 flex flex-col space-y-4">
          <DataTable
            headers={headers}
            data={paginatedData}
            onRowClick={onSelectWorkOrder}
            emptyMessage="No work orders found"
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

export default WorkOrdersList;

