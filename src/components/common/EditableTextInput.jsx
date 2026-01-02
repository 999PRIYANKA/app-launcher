import React, { useState, useEffect, useRef, cloneElement } from 'react';

function EditableTextInput({
  value,
  onChange,
  placeholder,
  width = '100%',
  startIcon,
  endIcon,
  disabled = false,
  error = '',
  allowedPattern = null,
  valueFormatter = null,
  commitOnBlur = false,
  inputType = 'text',
  className = '',
}) {
  const [inputValue, setInputValue] = useState(value || '');
  const [isFocused, setIsFocused] = useState(false);
  const previousValueRef = useRef(value || '');
  const inputRef = useRef(null);

  useEffect(() => {
    if (!isFocused && value !== previousValueRef.current) {
      setInputValue(value || '');
      previousValueRef.current = value || '';
    }
  }, [value, isFocused]);

  const handleFocus = () => {
    setIsFocused(true);
    previousValueRef.current = inputValue;
  };

  const formatValue = (val) =>
    typeof valueFormatter === 'function' ? valueFormatter(val) : val;

  const commitChange = (val) => {
    const formattedValue = formatValue(val);
    if (formattedValue !== value) {
      onChange(formattedValue);
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
    previousValueRef.current = inputValue;
    if (commitOnBlur) {
      commitChange(inputValue);
    } else {
      const formattedValue = formatValue(inputValue);
      if (formattedValue !== value) {
        onChange(formattedValue);
      }
    }
  };

  const handleKeyDown = (e) => {
    if (commitOnBlur && e.key === 'Enter') {
      e.preventDefault();
      inputRef.current?.blur();
    }
  };

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    if (allowedPattern && !allowedPattern.test(newValue)) {
      return;
    }
    setInputValue(newValue);
    if (!commitOnBlur) {
      onChange(formatValue(newValue));
    }
  };

  const iconWrapperStyle = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
    opacity: 0.5,
    width: '1rem',
    height: '1rem',
    pointerEvents: 'none',
    color: '#6b7280',
  };

  const cloneIconWithSize = (icon, size = 14) => {
    if (!icon) return null;
    return cloneElement(icon, { size });
  };

  const startIconStyle = {
    ...iconWrapperStyle,
    left: '0.5rem',
  };

  const endIconStyle = {
    ...iconWrapperStyle,
    right: '0.5rem',
  };

  return (
    <div
      style={{
        width: width,
        display: 'flex',
        flexDirection: 'column',
        gap: '0.25rem',
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          fontSize: '0.875rem',
          fontWeight: 'normal',
          color: disabled ? '#9ca3af' : inputValue ? '#1e40af' : '#9ca3af',
          backgroundColor: disabled ? '#f9fafb' : 'rgba(241, 245, 249, 0.5)',
          border: `1px solid ${error ? '#ef4444' : isFocused ? '#3b82f6' : '#e5e7eb'}`,
          borderRadius: '0.375rem',
          padding: '0.375rem 0.5rem',
          paddingLeft: startIcon ? '2rem' : '0.5rem',
          paddingRight: endIcon ? '2rem' : '0.5rem',
          outline: 'none',
          transition: 'all 0.2s ease-in-out',
        }}
        className={className}
      >
        {startIcon && (
          <div style={startIconStyle}>{cloneIconWithSize(startIcon)}</div>
        )}
        <input
          ref={inputRef}
          type={inputType}
          value={inputValue}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          style={{
            width: '100%',
            fontSize: '0.875rem',
            fontWeight: 'normal',
            color: disabled ? '#9ca3af' : '#1e40af',
            backgroundColor: 'transparent',
            border: 'none',
            outline: 'none',
            padding: 0,
          }}
        />
        {endIcon && (
          <div style={endIconStyle}>{cloneIconWithSize(endIcon)}</div>
        )}
      </div>
      {error && (
        <p className="text-sm text-red-600 mt-1" style={{ margin: 0 }}>
          {error}
        </p>
      )}
    </div>
  );
}

export default EditableTextInput;

