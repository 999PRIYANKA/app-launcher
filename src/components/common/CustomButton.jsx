import React from 'react';
import { Plus } from 'lucide-react';

function CustomButton({
  onClick,
  label = 'Add',
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  icon = true,
  className = '',
  iconComponent = <Plus size={16} />,
  style = {},
  type = 'button',
  ...props
}) {
  const sizeConfig = {
    extraSmall: {
      padding: '0.125rem 0.375rem',
      fontSize: '0.75rem',
      iconSize: 14,
      gap: '0.5rem',
    },
    small: {
      padding: '.25rem 0.5rem',
      fontSize: '0.875rem',
      iconSize: 16,
      gap: '0.25rem',
    },
    medium: {
      padding: '0.375rem 0.75rem',
      iconSize: 18,
      fontSize: '0.9rem',
      gap: '0.5rem',
    },
    large: {
      padding: '.375rem 0.75rem',
      fontSize: '1.25rem',
      iconSize: 20,
    },
  };

  const variantConfig = {
    primary: {
      backgroundColor: '#1e40af',
      color: '#ffffff',
      border: '1px solid #3b82f6',
      hoverShadow: '0 0 10px 0 rgba(29, 78, 216, 0.5)',
    },
    secondary: {
      backgroundColor: '#f8fafc',
      color: '#475569',
      border: '1px solid #cbd5e1',
      hoverBackground: '#e2e8f0',
      hoverBorder: '#94a3b8',
    },
    outline: {
      backgroundColor: 'transparent',
      color: '#475569',
      border: '1px solid #cbd5e1',
      hoverBackground: '#e2e8f0',
      hoverBorder: '#94a3b8',
    },
    ghost: {
      backgroundColor: 'transparent',
      color: '#1e40af',
      border: '1px solid transparent',
      hoverBackground: '#f3f4f6',
    },
    gray: {
      backgroundColor: '#374151',
      color: '#ffffff',
      border: '1px solid #4b5563',
      hoverBackground: '#1f2937',
    },
    green: {
      backgroundColor: '#0f9d58',
      border: '1px solid #0b7a43',
      hoverBackground: '#0f9d58',
      color: '#ffffff',
    },
    darkGray: {
      backgroundColor: '#1f2937',
      color: '#ffffff',
      border: '1px solid #111827',
      hoverBackground: '#111827',
    },
    delete: {
      backgroundColor: '#b91c1c',
      color: '#ffffff ',
      border: '1px solid #b91c1c',
      hoverBackground: '#b91c1c',
    },
  };

  const currentSize = sizeConfig[size];
  const currentVariant = variantConfig[variant];

  const buttonStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: currentSize.gap,
    padding: currentSize.padding,
    fontSize: currentSize.fontSize,
    fontWeight: '500',
    borderRadius: '0.375rem',
    border: disabled ? '1px solid #9ca3af' : currentVariant.border,
    backgroundColor: disabled ? '#9ca3af' : currentVariant.backgroundColor,
    color: disabled ? '#ffffff' : currentVariant.color,
    cursor: disabled || loading ? 'not-allowed' : 'pointer',
    transition: 'all 0.2s ease-in-out',
    opacity: disabled || loading ? 0.6 : 1,
    outline: 'none',
    ...style,
  };

  const handleMouseEnter = (e) => {
    if (!disabled && !loading) {
      const target = e.currentTarget;
      if (currentVariant.hoverBackground) {
        target.style.backgroundColor = currentVariant.hoverBackground;
      }
      if (currentVariant.hoverBorder) {
        target.style.borderColor = currentVariant.hoverBorder;
      }
      if (currentVariant.hoverColor) {
        target.style.color = currentVariant.hoverColor;
      }
      if (currentVariant.hoverShadow) {
        target.style.boxShadow = currentVariant.hoverShadow;
      }
    }
  };

  const handleMouseLeave = (e) => {
    if (!disabled && !loading) {
      const target = e.currentTarget;
      target.style.backgroundColor = currentVariant.backgroundColor;
      target.style.borderColor = currentVariant.border;
      target.style.color = currentVariant.color;
      target.style.boxShadow = 'none';
    }
  };

  return (
    <button
      type={type}
      onClick={disabled || loading ? undefined : onClick}
      disabled={disabled || loading}
      style={buttonStyle}
      className={className}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {loading ? (
        <div
          style={{
            width: currentSize.iconSize,
            height: currentSize.iconSize,
            border: '2px solid transparent',
            borderTop: '2px solid currentColor',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            backgroundColor: 'transparent',
            pointerEvents: 'none',
          }}
        />
      ) : (
        icon && (
          <span style={{ backgroundColor: 'transparent', pointerEvents: 'none' }}>
            {iconComponent}
          </span>
        )
      )}
      <span style={{ backgroundColor: 'transparent', pointerEvents: 'none' }}>
        {label}
      </span>
    </button>
  );
}

export default CustomButton;

