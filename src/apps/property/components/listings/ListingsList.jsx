import React, { useState, useMemo, useCallback } from 'react';
import DataTable from '../../../../components/common/DataTable';
import SearchBox from '../../../../components/common/SearchBox';
import Pagination from '../../../../components/common/Pagination';
import * as Icons from '../../../../constants/icons';

const ListingsList = ({ listings, onAddListingClick, onSelectListing }) => {
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
    { value: 'property', label: 'Property' },
    { 
      value: 'headline', 
      label: 'Headline',
      render: (item) => item.headline || '-'
    },
    { 
      value: 'price', 
      label: 'Rent',
      render: (item) => <span className="font-semibold">{formatCurrency(item.price)}</span>
    },
    { 
      value: 'listedDate', 
      label: 'Listed Date',
      render: (item) => formatDate(item.listedDate)
    },
    { value: 'status', label: 'Status' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return { color: '#166534', bg: '#dcfce7' };
      case 'Leased': return { color: '#1e40af', bg: '#dbeafe' };
      case 'Off-market': return { color: '#1f2937', bg: '#f3f4f6' };
      default: return { color: '#854d0e', bg: '#fef9c3' };
    }
  };

  const filteredData = useMemo(() => {
    let filtered = listings;

    if (filter !== 'All') {
      filtered = filtered.filter(listing => listing.status === filter);
    }

    if (searchTerm.trim()) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(listing =>
        listing.property?.toLowerCase().includes(search) ||
        listing.headline?.toLowerCase().includes(search) ||
        listing.status?.toLowerCase().includes(search)
      );
    }

    return filtered;
  }, [listings, filter, searchTerm]);

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
              <option value="All">All Listings</option>
              <option value="Active">Active</option>
              <option value="Off-market">Off-market</option>
              <option value="Leased">Leased</option>
            </select>
            <div className="flex-1">
              <SearchBox
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by property, headline, status..."
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
            onClick={onAddListingClick} 
            className="flex items-center bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded-md shadow-sm whitespace-nowrap text-sm h-full"
          >
            <span className="mr-1">+</span> New Listing
          </button>
        </div>

        <div className="flex-1 flex flex-col space-y-4">
          <DataTable
            headers={headers}
            data={paginatedData}
            onRowClick={onSelectListing}
            statusField="status"
            showStatusAsText={true}
            getStatusColor={getStatusColor}
            emptyMessage="No listings found"
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

export default ListingsList;
