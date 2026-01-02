import React, { useState, useMemo, useCallback } from 'react';
import DataTable from '../../../../components/common/DataTable';
import SearchBox from '../../../../components/common/SearchBox';
import Pagination from '../../../../components/common/Pagination';
import * as Icons from '../../../../constants/icons';

const TurnsList = ({ turns, onAddTurnClick, onSelectTurn }) => {
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

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return { color: '#166534', bg: '#dcfce7' };
      case 'In Progress': return { color: '#1e40af', bg: '#dbeafe' };
      case 'Scoping': return { color: '#854d0e', bg: '#fef9c3' };
      case 'Planned': return { color: '#1f2937', bg: '#f3f4f6' };
      default: return { color: '#1f2937', bg: '#f3f4f6' };
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Rush': return { color: '#991b1b', bg: '#fee2e2' };
      case 'High': return { color: '#9a3412', bg: '#fed7aa' };
      case 'Medium': return { color: '#854d0e', bg: '#fef9c3' };
      case 'Low': return { color: '#166534', bg: '#dcfce7' };
      default: return { color: '#1f2937', bg: '#f3f4f6' };
    }
  };

  const headers = [
    { value: 'turnNumber', label: 'Turn #' },
    { value: 'property', label: 'Property' },
    { value: 'unit', label: 'Unit' },
    { 
      value: 'moveOutDate', 
      label: 'Move-Out',
      render: (item) => formatDate(item.moveOutDate)
    },
    { 
      value: 'targetReadyDate', 
      label: 'Target Ready',
      render: (item) => formatDate(item.targetReadyDate)
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
      value: 'budget', 
      label: 'Budget',
      render: (item) => <span className="font-semibold">{formatCurrency(item.budget)}</span>
    },
  ];

  const filteredData = useMemo(() => {
    let filtered = turns;

    // Apply status filter
    if (filter !== 'All') {
      filtered = filtered.filter(turn => turn.status === filter);
    }

    // Apply search filter
    if (searchTerm.trim()) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(turn =>
        turn.turnNumber?.toLowerCase().includes(search) ||
        turn.property?.toLowerCase().includes(search) ||
        turn.unit?.toLowerCase().includes(search)
      );
    }

    return filtered;
  }, [turns, filter, searchTerm]);

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
              <option value="All">All Turns</option>
              <option value="Planned">Planned</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
            <div className="flex-1">
              <SearchBox
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by turn number, property, unit..."
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
            onClick={onAddTurnClick} 
            className="flex items-center bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded-md shadow-sm whitespace-nowrap text-sm h-full"
          >
            <span className="mr-1">+</span> New Turn
          </button>
        </div>

        {/* DataTable */}
        <div className="flex-1 flex flex-col space-y-4">
          <DataTable
            headers={headers}
            data={paginatedData}
            onRowClick={onSelectTurn}
            emptyMessage="No turns found"
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

export default TurnsList;

