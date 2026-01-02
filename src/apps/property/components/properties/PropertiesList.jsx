import React, { useState, useMemo, useCallback } from 'react';
import DataTable from '../../../../components/common/DataTable';
import SearchBox from '../../../../components/common/SearchBox';
import Pagination from '../../../../components/common/Pagination';
import * as Icons from '../../../../constants/icons';

const PropertiesList = ({ properties, onAddPropertyClick, onSelectProperty }) => {
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  const totalUnits = properties.reduce((acc, prop) => acc + (prop.units?.length || 0), 0);

  const StatItem = ({ label, value }) => (
    <div className="flex items-center">
        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
            <span className="text-sm font-bold text-gray-600">%</span>
        </div>
        <div>
            <p className="font-semibold text-gray-800">{value}</p>
            <p className="text-sm text-gray-500">{label}</p>
        </div>
    </div>
  );

  const QuickFilterItem = ({ label, count, color = 'text-red-500' }) => (
    <div className="flex items-center justify-between bg-white p-3 rounded-md border">
        <div>
            <p className={`${color} font-bold`}>{count}</p>
            <p className="text-sm text-gray-600">{label}</p>
        </div>
        <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600 rounded" />
    </div>
  );

  const formatPrice = (price) => {
    if (price === undefined || price === null) return '-';
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(price);
  };

  const headers = [
    { 
      value: 'propertyName', 
      label: 'Address',
      render: (item) => (
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onSelectProperty(item);
          }} 
          className="text-blue-600 hover:text-blue-800 hover:underline font-medium text-sm"
        >
          {item.propertyName}
        </button>
      )
    },
    { 
      value: 'occupancy', 
      label: 'Occupancy',
      render: (item) => {
        const status = item.rentalStatus || item.status || 'Unknown';
        const getStatusColor = (status) => {
          switch (status) {
            case 'Occupied': return { color: '#166534', bg: '#dcfce7' };
            case 'Vacant': return { color: '#991b1b', bg: '#fee2e2' };
            default: return { color: '#1f2937', bg: '#f3f4f6' };
          }
        };
        const colors = getStatusColor(status);
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
            {status}
          </span>
        );
      }
    },
    { 
      value: 'rent', 
      label: 'Rent',
      render: (item) => formatPrice(item.currentMonthlyRent || item.price)
    },
    { 
      value: 'pitia', 
      label: 'PITIA (Mo)',
      render: (item) => formatPrice(item.pitiaTotalMonthly)
    },
    { 
      value: 'details', 
      label: 'Details',
      render: (item) => {
        const beds = (item.units || []).reduce((acc, u) => acc + (u.bedrooms || 0), 0);
        const baths = (item.units || []).reduce((acc, u) => acc + (u.bathrooms || 0), 0);
        const hasUnits = item.units && item.units.length > 0;
        return hasUnits ? `${beds} Beds / ${baths} Baths` : '-';
      }
    },
    { 
      value: 'propertyType', 
      label: 'Type',
      render: (item) => item.propertyType || '-'
    },
  ];

  const filteredData = useMemo(() => {
    let filtered = properties;

    // Apply occupancy filter
    if (filter === 'Vacant Properties') {
      filtered = filtered.filter(p => p.status === 'Vacant' || p.rentalStatus === 'Vacant');
    } else if (filter === 'Occupied Properties') {
      filtered = filtered.filter(p => p.status === 'Occupied' || p.rentalStatus === 'Occupied');
    }

    // Apply search filter
    if (searchTerm.trim()) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(prop =>
        prop.propertyName?.toLowerCase().includes(search) ||
        prop.propertyType?.toLowerCase().includes(search) ||
        (prop.rentalStatus || prop.status)?.toLowerCase().includes(search) ||
        prop.currentMonthlyRent?.toString().includes(search) ||
        prop.price?.toString().includes(search)
      );
    }

    return filtered;
  }, [properties, filter, searchTerm]);

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
      {/* Main Content */}
      <div className="flex-1 flex flex-col p-6 overflow-hidden">
        
        {/* Header Actions */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-2 w-full">
                <select 
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 text-gray-700 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                >
                    <option value="All">All Properties</option>
                    <option value="Vacant Properties">Vacant Properties</option>
                    <option value="Occupied Properties">Occupied Properties</option>
                </select>
                <div className="flex-1">
                    <SearchBox
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search by address, status, original price, bedrooms, bathrooms, property type"
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
                onClick={onAddPropertyClick} 
                className="flex items-center bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded-md shadow-sm whitespace-nowrap text-sm h-full"
            >
                <span className="mr-1">+</span> Add Property
            </button>
        </div>

        {/* DataTable */}
        <div className="flex-1 flex flex-col space-y-4">
            <DataTable
                headers={headers}
                data={paginatedData}
                onRowClick={onSelectProperty}
                emptyMessage="No properties found"
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

      {/* Right Sidebar - Reports */}
      <aside className="w-80 bg-gray-50 p-6 border-l h-full hidden xl:block overflow-y-auto">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <h3 className="font-bold text-lg mb-4 text-gray-800">{totalUnits} Units</h3>
            <div className="space-y-4">
                <StatItem label="Total Occupancy" value="0%" />
                <StatItem label="Behind in Rent Payments" value="0%" />
            </div>
        </div>

        <div className="mt-6">
            <h3 className="font-bold text-lg mb-4 text-gray-800">Quick Filter</h3>
            <div className="space-y-3">
                <QuickFilterItem label="Vacant" count={properties.filter(p => p.status === 'Vacant' || p.rentalStatus === 'Vacant').length} color="text-orange-500" />
                <QuickFilterItem label="Overdue" count={0} />
                <QuickFilterItem label="Open Maintenance" count={0} />
            </div>
        </div>
      </aside>
    </div>
  );
};

export default PropertiesList;

