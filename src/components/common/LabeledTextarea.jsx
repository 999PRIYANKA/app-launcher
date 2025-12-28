import React, { useState, useEffect, useRef } from 'react';

function LabeledTextarea({
  label,
  value,
  onChange,
  placeholder,
  required = false,
  width = '100%',
  minHeight = '80px',
  instruction = '',
  error = '',
  disabled = false,
  rows = 3,
  className = '',
}) {
  const [isFocused, setIsFocused] = useState(false);
  const [textareaValue, setTextareaValue] = useState(value || '');
  const textareaRef = useRef(null);
  const previousValueRef = useRef(value || '');

  useEffect(() => {
    if (!isFocused && value !== previousValueRef.current) {
      setTextareaValue(value || '');
      previousValueRef.current = value || '';
    }
  }, [value, isFocused]);

  const handleFocus = () => {
    setIsFocused(true);
    previousValueRef.current = textareaValue;
  };

  const handleBlur = () => {
    setIsFocused(false);
    previousValueRef.current = textareaValue;
    if (textareaValue !== (value || '')) {
      onChange(textareaValue);
    }
  };

  const handleChange = (e) => {
    const newValue = e.target.value;
    setTextareaValue(newValue);
    onChange(newValue);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.25rem',
      }}
    >
      {label && (
        <label
          style={{
            fontSize: '0.875rem',
            fontWeight: '500',
            color: '#475569',
          }}
          className="block font-medium"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <textarea
        ref={textareaRef}
        rows={rows}
        style={{
          width: width,
          resize: 'none',
          border: `1px solid ${error ? '#ef4444' : isFocused ? '#3b82f6' : '#e5e7eb'}`,
          color: disabled ? '#9ca3af' : textareaValue ? '#1e40af' : '#9ca3af',
          borderRadius: '0.375rem',
          padding: '0.2rem 0.5rem',
          fontSize: '0.875rem',
          fontFamily: 'inherit',
          outline: 'none',
          minHeight: minHeight,
          transition: 'all 0.2s ease-in-out',
          backgroundColor: disabled ? '#f9fafb' : 'rgba(241, 245, 249, 0.5)',
        }}
        className={className}
        placeholder={placeholder}
        value={textareaValue}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        disabled={disabled}
      />
      {error && (
        <p className="text-sm text-red-600 mt-1" style={{ margin: 0 }}>
          {error}
        </p>
      )}
      {instruction && (
        <p
          style={{
            fontSize: '0.675rem',
            color: '#64748b',
          }}
        >
          {instruction}
        </p>
      )}
    </div>
  );
}

export default LabeledTextarea;

