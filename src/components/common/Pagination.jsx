import React from "react";

const Pagination = ({
  currentPage,
  totalPages,
  hasNextPage,
  hasPrevPage,
  onPageChange,
  onPrevPage,
  onNextPage,
  className = "",
}) => {
  if (totalPages < 1) return null;

  return (
    <div className={`w-full flex justify-end ${className}`}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          gap: "0.75rem",
          padding: "0.75rem 1rem",
          border: "1px solid #e5e7eb",
          borderRadius: "1.5rem",
          backgroundColor: "#ffffff",
          boxShadow: "0 2px 6px rgba(0, 0, 0, 0.05)",
        }}
      >
        {/* Previous Button */}
        <button
          onClick={onPrevPage}
          disabled={!hasPrevPage || totalPages <= 1}
          style={{
            padding: "0.5rem 1rem",
            fontSize: "0.875rem",
            fontWeight: "500",
            borderRadius: "9999px", // pill shape
            border: "none",
            color: hasPrevPage && totalPages > 1 ? "#374151" : "#9ca3af",
            backgroundColor:
              hasPrevPage && totalPages > 1 ? "#f3f4f6" : "#f9fafb",
            cursor: hasPrevPage && totalPages > 1 ? "pointer" : "not-allowed",
            transition: "all 0.25s ease",
            boxShadow:
              hasPrevPage && totalPages > 1
                ? "0 1px 2px rgba(0, 0, 0, 0.05)"
                : "none",
          }}
          onMouseEnter={(e) => {
            if (hasPrevPage && totalPages > 1) {
              e.target.style.backgroundColor = "#e5e7eb";
              e.target.style.transform = "translateY(-1px)";
            }
          }}
          onMouseLeave={(e) => {
            if (hasPrevPage && totalPages > 1) {
              e.target.style.backgroundColor = "#f3f4f6";
              e.target.style.transform = "translateY(0)";
            }
          }}
        >
          ← Prev
        </button>

        {/* Page Numbers */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(
            (pageNum) => (
              <button
                key={pageNum}
                onClick={() => onPageChange(pageNum)}
                style={{
                  minWidth: "2.25rem",
                  height: "2.25rem",
                  fontSize: "0.875rem",
                  fontWeight: currentPage === pageNum ? "600" : "500",
                  borderRadius: "50%",
                  border: "none",
                  cursor: "pointer",
                  color: currentPage === pageNum ? "#ffffff" : "#374151",
                  backgroundColor:
                    currentPage === pageNum
                      ? "#3b82f6"
                      : "#f3f4f6",
                  boxShadow:
                    currentPage === pageNum
                      ? "0 3px 6px rgba(59,130,246,0.3)"
                      : "0 1px 2px rgba(0,0,0,0.05)",
                  transition: "all 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  if (currentPage !== pageNum) {
                    e.target.style.backgroundColor = "#e5e7eb";
                    e.target.style.transform = "translateY(-1px)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (currentPage !== pageNum) {
                    e.target.style.backgroundColor = "#f3f4f6";
                    e.target.style.transform = "translateY(0)";
                  }
                }}
              >
                {pageNum}
              </button>
            )
          )}
        </div>

        {/* Next Button */}
        <button
          onClick={onNextPage}
          disabled={!hasNextPage || totalPages <= 1}
          style={{
            padding: "0.5rem 1rem",
            fontSize: "0.875rem",
            fontWeight: "500",
            borderRadius: "9999px",
            border: "none",
            color: hasNextPage && totalPages > 1 ? "#374151" : "#9ca3af",
            backgroundColor:
              hasNextPage && totalPages > 1 ? "#f3f4f6" : "#f9fafb",
            cursor: hasNextPage && totalPages > 1 ? "pointer" : "not-allowed",
            transition: "all 0.25s ease",
            boxShadow:
              hasNextPage && totalPages > 1
                ? "0 1px 2px rgba(0, 0, 0, 0.05)"
                : "none",
          }}
          onMouseEnter={(e) => {
            if (hasNextPage && totalPages > 1) {
              e.target.style.backgroundColor = "#e5e7eb";
              e.target.style.transform = "translateY(-1px)";
            }
          }}
          onMouseLeave={(e) => {
            if (hasNextPage && totalPages > 1) {
              e.target.style.backgroundColor = "#f3f4f6";
              e.target.style.transform = "translateY(0)";
            }
          }}
        >
          Next →
        </button>

        {/* Page Info */}
        <div
          style={{
            marginLeft: "0.75rem",
            fontSize: "0.875rem",
            color: "#6b7280",
            fontWeight: "500",
            whiteSpace: "nowrap",
          }}
        >
          Page{" "}
          <span style={{ color: "#111827", fontWeight: "600" }}>
            {currentPage}
          </span>{" "}
          of{" "}
          <span style={{ color: "#111827", fontWeight: "600" }}>
            {totalPages}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Pagination;

