import React from "react";
import { Search } from "lucide-react";
import CustomButton from "./CustomButton";

const SearchBox = ({
  value = "",
  onChange,
  placeholder = "Search...",
  className = "",
  style = {},
  onKeyDown,
  showSearchButton = false,
  onSearch,
  searchLoading = false,
  disabled = false,
  isWidthFull = false,
  fontSize = "1rem",
}) => {
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && onSearch && value?.trim()) {
      e.preventDefault();
      onSearch();
    }
    if (onKeyDown) {
      onKeyDown(e);
    }
  };

  const isSearchDisabled = !value?.trim() || searchLoading;

  return (
    <div className={`flex items-center gap-2 ${isWidthFull ? "w-full" : ""}`}>
      <form
        onSubmit={(e) => e.preventDefault()}
        style={{
          fontSize: fontSize,
          fontWeight: "semibold",
          color: "#374151",
          backgroundColor: "#ffffff",
          padding: "0.5rem 0 0.5rem 0.5rem",
          transition: "all 0.2s ease",
          border: "1px solid #d1d5db",
          ...style,
        }}
        className={`flex items-center gap-2 border border-gray-300 rounded-md ${className} ${
          isWidthFull ? "w-full" : ""
        }`}
      >
        <Search className="size-4" color="gray" />
        <input
          placeholder={placeholder}
          disabled={disabled}
          style={{
            fontSize: fontSize,
            fontWeight: "semibold",
            color: "#374151",
            cursor: disabled ? "not-allowed" : "text",
            opacity: disabled ? 0.2 : 1,
          }}
          className="w-full outline-none bg-transparent disabled:cursor-not-allowed"
          type="text"
          value={value || ""}
          onChange={onChange || (() => {})}
          onKeyDown={handleKeyDown}
          onFocus={(e) => {
            if (disabled) {
              e.target.blur();
            }
          }}
        />
      </form>
      {showSearchButton && (
        <CustomButton
          onClick={onSearch}
          label={searchLoading ? "Searching..." : "Search"}
          variant={isSearchDisabled ? "ghost" : "secondary"}
          size="small"
          icon={false}
          loading={searchLoading}
          disabled={isSearchDisabled || disabled}
        />
      )}
    </div>
  );
};

export default SearchBox;

