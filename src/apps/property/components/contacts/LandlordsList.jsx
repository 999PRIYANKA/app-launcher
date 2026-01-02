import React, { useState, useMemo, useCallback } from 'react';
import DataTable from '../../../../components/common/DataTable';
import SearchBox from '../../../../components/common/SearchBox';
import Pagination from '../../../../components/common/Pagination';
import * as Icons from '../../../../constants/icons';

const LandlordsList = ({ landlords, onAddClick, onSelect }) => {
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const headers = [
    { value: 'name', label: 'Name' },
    { value: 'companyName', label: 'Company' },
    { value: 'email', label: 'Email' },
    { value: 'phone', label: 'Phone' },
    { value: 'propertiesOwnedCount', label: 'Properties' },
    { value: 'status', label: 'Status' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return { color: '#166534', bg: '#dcfce7' }; // green-800, green-100
      case 'Inactive':
        return { color: '#1f2937', bg: '#f3f4f6' }; // gray-800, gray-100
      default:
        return { color: '#1f2937', bg: '#f3f4f6' };
    }
  };

  const filteredLandlords = useMemo(() => {
    let filtered = landlords;

    // Apply status filter
    if (filter !== 'All') {
      filtered = filtered.filter(l => l.status === filter);
    }

    // Apply search filter
    if (searchTerm.trim()) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(l => 
        l.name.toLowerCase().includes(search) ||
        (l.companyName && l.companyName.toLowerCase().includes(search)) ||
        (l.email && l.email.toLowerCase().includes(search))
      );
    }

    return filtered;
  }, [landlords, filter, searchTerm]);

  // Reset to page 1 when search term or filter changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filter]);

  // Calculate pagination
  const totalItems = filteredLandlords.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = filteredLandlords.slice(startIndex, endIndex);

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
        {/* Actions & Filters */}
        <div className="flex justify-between mb-6">
            <div className="flex space-x-4">
                <select 
                    value={filter} 
                    onChange={e => setFilter(e.target.value)}
                    className="border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                    <option value="All">All Landlords</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                </select>
                <div className="w-64">
                    <SearchBox
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search name, company..."
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
                className="bg-blue-600 text-white px-4 py-2 rounded-md font-medium text-sm hover:bg-blue-700 flex items-center"
            >
                <Icons.PlusCircleIcon className="w-4 h-4 mr-2" /> Add Landlord
            </button>
        </div>
        
        {/* DataTable */}
        <div className="flex-1 flex flex-col space-y-4">
            <DataTable
                headers={headers}
                data={paginatedData}
                onRowClick={onSelect}
                statusField="status"
                showStatusAsText={true}
                getStatusColor={getStatusColor}
                emptyMessage="No landlords found"
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

export default LandlordsList;

