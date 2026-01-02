import React from "react";
import { Search } from "lucide-react";
import StatusDropdown from "./StatusDropdown";
import CustomButton from "./CustomButton";

const DataTable = ({
  headers = [],
  data = [],
  loading = false,
  onRowClick,
  onStatusChange,
  statuses = [],
  statusField = "status",
  emptyMessage = "No data found",
  className = "",
  showStatusAsText = false,
  getStatusColor,
  getStatusIcon,
  fontSize = "0.875rem",
  actionField = "actions",
  disableRowClick = false,
  disableRowHover = false,
}) => {
  const getCellValue = (item, fieldValue) => {
    const value = item[fieldValue];

    if (value === null || value === undefined) {
      return "-";
    }

    // Format numbers with commas for prices
    if (
      fieldValue === "originalPrice" ||
      (fieldValue === "listPrice" && typeof value === "number")
    ) {
      return value.toLocaleString();
    }

    return value;
  };

  const isStatusField = (headerValue) => headerValue === statusField;
  const isActionField = (headerValue) => headerValue === actionField;

  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        border: "1px solid #e5e7eb",
        borderRadius: "0.375rem",
        overflow: "visible",
        boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
      }}
      className={className}
    >
      <div className="hidden md:block relative">
        {/* Header */}
        {headers.length > 0 && (
          <div
            className="grid"
            style={{
              gridTemplateColumns: `repeat(${headers.length}, 1fr)`,
            }}
          >
            {headers.map((header, index) => (
              <div
                key={header.value}
                style={{
                  fontSize: fontSize,
                  fontWeight: "500",
                  color: "#4b5563",
                  backgroundColor: "#f9fafb",
                  padding: "0.5rem 1rem",
                  textAlign: "center",
                  borderRight:
                    index === headers.length - 1 ? "none" : "1px solid #e5e7eb",
                  borderBottom: "1px solid #e5e7eb",
                }}
              >
                {header.label}
              </div>
            ))}
          </div>
        )}

        {loading && data.length > 0 ? (
          <div
            style={{
              padding: "1rem 1.5rem",
              textAlign: "center",
              color: "#6b7280",
              fontSize: "0.875rem",
              backgroundColor: "#f9fafb",
              borderBottom: "1px solid #e5e7eb",
            }}
          >
            <div className="flex items-center justify-center gap-2">
              <div className="animate-spin h-4 w-4 border-2 border-gray-300 border-t-blue-600 rounded-full"></div>
              <span>Loading new data...</span>
            </div>
          </div>
        ) : null}

        {/* Empty State */}
        {data.length === 0 && !loading ? (
          <div
            style={{
              padding: "3rem 1.5rem",
              textAlign: "center",
              color: "#6b7280",
              fontSize: "1.125rem",
            }}
          >
            <div
              style={{
                width: "2.5rem",
                height: "2.5rem",
                borderRadius: "50%",
                margin: "0 auto 0.75rem",
                backgroundColor: "#f3f4f6",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Search
                style={{
                  height: "1.25rem",
                  width: "1.25rem",
                  color: "#9ca3af",
                }}
              />
            </div>
            <p className="text-lg">{emptyMessage}</p>
          </div>
        ) : (
          data.map((item, index) => (
            <div
              key={item._id || item.id || index}
              className={`grid ${disableRowClick ? "" : "cursor-pointer"} ${
                disableRowHover ? "" : "hover:bg-gray-100"
              } transition-colors duration-150`}
              style={{
                gridTemplateColumns: `repeat(${headers.length}, 1fr)`,
                fontSize: fontSize,
                color: "#4b5563",
                textAlign: "center",
                borderBottom:
                  index === data.length - 1 ? "none" : "1px solid #e5e7eb",
              }}
              onClick={() => {
                if (!disableRowClick && onRowClick) {
                  onRowClick(item);
                }
              }}
            >
              {headers.length > 0 ? (
                headers.map((header, colIndex) => {
                  const isStatus = isStatusField(header.value);
                  const isAction = isActionField(header.value);

                  return (
                    <div
                      key={`${item._id || item.id || index}-${header.value}`}
                      style={{
                        borderRight:
                          colIndex === headers.length - 1
                            ? "none"
                            : "1px solid #e5e7eb",
                        padding: "0.75rem 1rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        whiteSpace: "normal",
                        wordBreak: "break-word",
                        minWidth: 0,
                        overflow: "hidden",
                        color:
                          colIndex === 0 && !disableRowClick
                            ? "#2563eb"
                            : "#4b5563",
                        fontWeight: colIndex === 0 ? "500" : "400",
                      }}
                      title={
                        isStatus
                          ? "Click to change status"
                          : isAction
                          ? "Click to perform action"
                          : getCellValue(item, header.value)
                      }
                      onClick={(e) => {
                        if (isStatus || isAction) {
                          e.stopPropagation(); // Prevent row click
                        }
                      }}
                    >
                      {isAction ? (
                        <div
                          onClick={(e) => e.stopPropagation()}
                          style={{
                            position: "relative",
                          }}
                        >
                          <CustomButton
                            label={getCellValue(item, header.value)}
                            variant="darkGray"
                            size="small"
                            icon={false}
                            onClick={() => {
                              onActionChange && onActionChange(item, item._id || item.id);
                            }}
                          />
                        </div>
                      ) : isStatus ? (
                        showStatusAsText ? (
                          getStatusColor ? (
                            (() => {
                              const statusValue = getCellValue(
                                item,
                                header.value
                              );
                              const statusConfig = getStatusColor(statusValue);
                              const statusColors =
                                typeof statusConfig === "object"
                                  ? statusConfig
                                  : { color: statusConfig, bg: "#f3f4f6" };
                              const StatusIcon = getStatusIcon
                                ? getStatusIcon(statusValue)
                                : null;
                              return (
                                <span
                                  style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "0.375rem",
                                    padding: "0.25rem 0.75rem",
                                    borderRadius: "0.375rem",
                                    backgroundColor: statusColors.bg,
                                    color: statusColors.color,
                                    fontSize: fontSize,
                                    fontWeight: "500",
                                  }}
                                >
                                  {StatusIcon}
                                  {statusValue}
                                </span>
                              );
                            })()
                          ) : (
                            <span
                              style={{
                                color:
                                  getStatusColor &&
                                  getStatusColor(
                                    getCellValue(item, header.value)
                                  ),
                              }}
                            >
                              {getCellValue(item, header.value)}
                            </span>
                          )
                        ) : (
                          <div
                            onClick={(e) => e.stopPropagation()}
                            style={{
                              position: "relative",
                            }}
                          >
                            <StatusDropdown
                              options={statuses.map((status) => ({
                                value: status.name || status,
                                label: status.name || status,
                              }))}
                              value={getCellValue(item, header.value) || ""}
                              onChange={(value) => {
                                onStatusChange &&
                                  onStatusChange(item._id || item.id, value);
                              }}
                              placeholder="Select Status"
                              className="w-32"
                            />
                          </div>
                        )
                      ) : (
                        // Custom render function support
                        header.render ? (
                          header.render(item)
                        ) : (
                          getCellValue(item, header.value)
                        )
                      )}
                    </div>
                  );
                })
              ) : (
                <div className="col-span-full p-4 text-center text-gray-500">
                  No table headers available
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DataTable;

