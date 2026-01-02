import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { getStatusColor } from "../../utils/statusUtils";

const StatusDropdown = ({
  options,
  value,
  onChange,
  placeholder,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
  });
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  const selectedOption = options.find((option) => option.value === value);
  const statusColors = getStatusColor(value);

  // Calculate dropdown position and handle outside clicks
  useEffect(() => {
    const calculatePosition = () => {
      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        setDropdownPosition({
          top: rect.bottom + window.scrollY,
          left: rect.left + window.scrollX,
          width: rect.width,
        });
      }
    };

    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      calculatePosition();
      document.addEventListener("mousedown", handleClickOutside);
      window.addEventListener("resize", calculatePosition);
      window.addEventListener("scroll", calculatePosition);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("resize", calculatePosition);
      window.removeEventListener("scroll", calculatePosition);
    };
  }, [isOpen]);

  const handleSelect = (option) => {
    onChange(option.value);
    setIsOpen(false);
  };

  return (
    <div
      style={{
        position: "relative",
        isolation: "isolate",
      }}
      className={className}
      ref={dropdownRef}
    >
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0.125rem 0.375rem",
          fontSize: "0.8125rem",
          fontWeight: "400",
          borderRadius: "0.25rem",
          border: `1px solid ${statusColors.border}`,
          backgroundColor: statusColors.bg,
          color: statusColors.text,
          cursor: "pointer",
          transition: "all 0.15s ease",
          minHeight: "1.5rem",
          outline: "none",
        }}
        onMouseEnter={(e) => {
          e.target.style.boxShadow = "0 1px 2px 0 rgba(0, 0, 0, 0.05)";
        }}
        onMouseLeave={(e) => {
          e.target.style.boxShadow = "none";
        }}
        onFocus={(e) => {
          e.target.style.boxShadow = "none";
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
          <span
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        </div>
        <svg
          style={{
            width: "0.75rem",
            height: "0.75rem",
            transition: "transform 0.15s ease",
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            opacity: 0.6,
          }}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen &&
        createPortal(
          <div
            ref={dropdownRef}
            style={{
              position: "fixed",
              zIndex: 9999999,
              top: dropdownPosition.top,
              left: dropdownPosition.left,
              width: dropdownPosition.width,
              backgroundColor: "#ffffff",
              boxShadow:
                "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
              maxHeight: "8rem",
              borderRadius: "0.25rem",
              border: "1px solid #e5e7eb",
              outline: "none",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ maxHeight: "10rem", overflowY: "auto" }}>
              {options.map((option, index) => {
                const optionColors = getStatusColor(option.value);
                return (
                  <h1
                    key={`${option.value}-${index}`}
                    onClick={() => handleSelect(option)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "0.25rem",
                      padding: "0.25rem 0.375rem",
                      fontSize: "0.875rem",
                      cursor: "pointer",
                      color: optionColors.text,
                      transition: "background-color 0.1s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = "#f9fafb";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = "transparent";
                    }}
                  >
                    <span>{option.label}</span>
                    {value === option.value && (
                      <svg
                        style={{
                          width: "0.75rem",
                          height: "0.75rem",
                          color: optionColors.text,
                        }}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </h1>
                );
              })}
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};

export default StatusDropdown;

