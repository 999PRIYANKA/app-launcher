import React, { useState } from 'react';

export function StandardListView({
  title,
  columns,
  data,
  onRowClick,
  actions,
}) {
  const [searchTerm, setSearchTerm] = useState('');

  // Basic filtering for demo purposes
  const filteredData = data.filter((item) =>
    Object.values(item).some(
      (val) =>
        val !== null &&
        val !== undefined &&
        String(val).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col h-full overflow-hidden">
      <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-white rounded-t-lg flex-shrink-0">
        <div>
            <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
            <p className="text-sm text-gray-500 mt-1">{filteredData.length} records found</p>
        </div>
        <div className="flex space-x-4 items-center">
          <input
            type="text"
            placeholder="Search..."
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {actions}
        </div>
      </div>
      <div className="overflow-auto flex-1 bg-white min-h-[300px]">
        <table className="w-full text-left text-sm text-gray-600">
          <thead className="bg-gray-100 text-xs uppercase text-gray-500 font-semibold sticky top-0 z-10 shadow-sm">
            <tr>
              {columns.map((col, idx) => (
                <th key={idx} className={`px-6 py-4 bg-gray-100 ${col.className || ''}`}>
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredData.map((item) => (
              <tr
                key={item.id}
                onClick={() => onRowClick && onRowClick(item)}
                className={`hover:bg-blue-50 transition-colors ${
                  onRowClick ? 'cursor-pointer' : ''
                }`}
              >
                {columns.map((col, idx) => (
                  <td key={idx} className="px-6 py-4 whitespace-nowrap">
                    {typeof col.accessor === 'function'
                      ? col.accessor(item)
                      : (item[col.accessor] || '')}
                  </td>
                ))}
              </tr>
            ))}
            {filteredData.length === 0 && (
                <tr>
                    <td colSpan={columns.length} className="px-6 py-10 text-center text-gray-400 italic">
                        No records found
                    </td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="p-4 border-t border-gray-200 bg-gray-50 rounded-b-lg flex justify-between items-center text-sm text-gray-500 flex-shrink-0">
          <span>Page 1 of 1</span>
          <div className="space-x-2">
              <button disabled className="px-3 py-1 border rounded bg-white text-gray-300">Previous</button>
              <button disabled className="px-3 py-1 border rounded bg-white text-gray-300">Next</button>
          </div>
      </div>
    </div>
  );
}

