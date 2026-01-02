import React, { useState, useRef, useEffect } from 'react';

function Dropdown({
  options = [],
  value,
  onChange,
  placeholder = 'Select an option',
  className = '',
  disabled = false,
  label = '',
  error = '',
  required = false,
  instruction = '',
  onLoadMore,
  hasMore = false,
  loading = false,
  size = 'default',
  width = '100%',
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleCount, setVisibleCount] = useState(10);
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);
  const scrollRef = useRef(null);

  const filteredOptions = options.filter(
    (option) =>
      option.label?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      option.value?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const visibleOptions = filteredOptions.slice(0, Math.max(5, visibleCount));
  const selectedOption = options.find((option) => option.value === value);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  useEffect(() => {
    setVisibleCount(10);
  }, [searchTerm]);

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollHeight - scrollTop <= clientHeight + 10) {
      if (hasMore && !loading && onLoadMore) {
        onLoadMore();
      } else if (!hasMore && visibleCount < filteredOptions.length) {
        setVisibleCount((prev) => Math.min(prev + 10, filteredOptions.length));
      }
    }
  };

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
      if (!isOpen) {
        setSearchTerm('');
      }
    }
  };

  const handleSelect = (option) => {
    onChange(option.value);
    setIsOpen(false);
    setSearchTerm('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
      setSearchTerm('');
    }
  };

  const sizeConfig = {
    small: {
      maxHeight: '12rem',
      buttonPadding: '0.25rem 0.5rem',
      fontSize: '0.8rem',
    },
    default: {
      maxHeight: '15rem',
      buttonPadding: '0.3rem 0.5rem',
      fontSize: '0.875rem',
    },
    large: {
      maxHeight: '20rem',
      buttonPadding: '0.5rem 0.75rem',
      fontSize: '0.9rem',
    },
  };

  const currentSize = sizeConfig[size] || sizeConfig.default;

  return (
    <div className={`relative ${className}`} style={{ width }} data-dropdown="true">
      {label && (
        <label
          style={{
            fontSize: '0.875rem',
            fontWeight: '500',
            color: '#475569',
          }}
          className="block font-medium mb-1"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div ref={dropdownRef} className="relative">
        <button
          type="button"
          onClick={handleToggle}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          style={{
            width: '100%',
            padding: currentSize.buttonPadding || '0.375rem 0.5rem',
            border: `1px solid ${error ? '#ef4444' : '#d1d5db'}`,
            borderRadius: '0.375rem',
            outline: 'none',
            fontSize: currentSize.fontSize,
            color: disabled ? '#9ca3af' : '#374151',
            backgroundColor: disabled ? '#f9fafb' : '#ffffff',
            transition: 'all 0.2s ease',
            cursor: disabled ? 'not-allowed' : 'pointer',
            textAlign: 'left',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingRight: '2.5rem',
          }}
          onFocus={(e) => {
            if (!disabled) {
              e.currentTarget.style.borderColor = error ? '#ef4444' : '#3b82f6';
              e.currentTarget.style.boxShadow = error
                ? '0 0 0 1px #ef4444'
                : '0 0 0 1px #3b82f6';
            }
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = error ? '#ef4444' : '#d1d5db';
            e.currentTarget.style.boxShadow = 'none';
          }}
          onMouseEnter={(e) => {
            if (!disabled) {
              e.currentTarget.style.borderColor = '#9ca3af';
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = '#d1d5db';
          }}
        >
          <span className="block truncate">
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <svg
              className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${
                isOpen ? 'rotate-180' : ''
              }`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </button>

        {isOpen && (
          <div
            className="absolute overflow-y-auto overflow-x-hidden mt-1 w-full bg-white shadow-lg rounded-md text-base border-gray-300 focus:outline-none flex flex-col"
            style={{
              zIndex: 9999,
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              maxHeight: currentSize.maxHeight,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {options.length > 5 && (
              <div
                style={{
                  position: 'sticky',
                  top: 0,
                  padding: '0.1rem 0.5rem',
                  borderBottom: '1px solid #e5e7eb',
                  color: '#374151',
                  backgroundColor: '#ffffff',
                  transition: 'all 0.2s ease',
                  zIndex: 51,
                  backdropFilter: 'blur(8px)',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
                }}
                className="px-1 py-2"
              >
                <input
                  style={{
                    padding: '0.1rem 0.5rem',
                    fontSize: '0.875rem',
                    color: '#374151',
                    backgroundColor: '#ffffff',
                    transition: 'all 0.2s ease',
                  }}
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-2 py-1 text-sm rounded outline-none"
                />
              </div>
            )}

            <div
              ref={scrollRef}
              onScroll={handleScroll}
              className="flex-1 overflow-y-auto"
              style={{
                scrollBehavior: 'smooth',
                maxHeight:
                  currentSize.maxHeight === '12rem'
                    ? '8rem'
                    : currentSize.maxHeight === '15rem'
                    ? '12rem'
                    : '16rem',
              }}
            >
              {visibleOptions.length === 0 ? (
                <div className="px-3 py-2 text-md text-gray-500">
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin h-5 w-5 border-2 border-gray-300 border-t-blue-600 rounded-full mr-2"></div>
                      Loading...
                    </div>
                  ) : searchTerm ? (
                    `No options found for "${searchTerm}"`
                  ) : (
                    'No options available'
                  )}
                </div>
              ) : (
                visibleOptions.map((option, index) => (
                  <div
                    style={{ fontSize: currentSize.fontSize }}
                    key={`${option.value}-${index}`}
                    onClick={() => handleSelect(option)}
                    title={option.label || option.value}
                    className={`
                    cursor-pointer select-none relative py-2 pl-3 pr-9
                    ${
                      value === option.value
                        ? 'bg-blue-50 text-blue-900'
                        : 'text-gray-900 hover:bg-gray-50'
                    }
                  `}
                  >
                    <span
                      className="block truncate font-normal"
                      title={option.label || option.value}
                    >
                      {option.label}
                    </span>
                    {value === option.value && (
                      <span className="absolute inset-y-0 right-0 flex items-center pr-4">
                        <svg
                          className="h-5 w-5 text-blue-600"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                    )}
                  </div>
                ))
              )}

              {loading && hasMore && (
                <div className="px-3 py-2 text-center text-gray-500 text-sm">
                  <div className="flex items-center justify-center">
                    <div className="animate-spin h-4 w-4 border-2 border-gray-300 border-t-blue-600 rounded-full mr-2"></div>
                    Loading more...
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      {instruction && (
        <p
          style={{
            fontSize: '0.675rem',
            color: '#64748b',
            marginTop: error ? '0.25rem' : '0.25rem',
          }}
        >
          {instruction}
        </p>
      )}
    </div>
  );
}

export default Dropdown;

