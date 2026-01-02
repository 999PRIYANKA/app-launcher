/**
 * Utility functions for status colors and icons
 * Handles various status types used across the application
 */

import React from "react";
import {
  CheckCircle,
  Clock,
  XCircle,
  Eye,
  Send,
  CheckCircle2,
} from "lucide-react";

/**
 * Get status color and background based on status value
 * Supports multiple status types:
 * - Walkthrough statuses: "confirmed", "pending", "canceled"
 * - Document statuses: "completed", "viewed", "opened", "sent"
 *
 * @param {string|null|undefined} status - The status value
 * @returns {Object} - Object with color and bg properties
 *
 * @example
 * getStatusColor("confirmed") // { color: "#10b981", bg: "#d1fae5" }
 * getStatusColor("completed") // { color: "#10b981", bg: "#d1fae5" }
 * getStatusColor(null) // { color: "#6b7280", bg: "#f3f4f6" }
 */
export const getStatusColor = (status) => {
  if (!status) return { color: "#6b7280", bg: "#f3f4f6" };

  switch (status.toLowerCase()) {
    // Walkthrough statuses
    case "confirmed":
      return { color: "#10b981", bg: "#d1fae5" }; // green
    case "canceled":
      return { color: "#ef4444", bg: "#fee2e2" }; // red

    case "declined":
      return {
        color: "#dc2626",
        bg: "#fecdd3",
        border: "#dc2626",
        dot: "#dc2626",
        text: "#b91c1c", // red-700
      }; // red-500
    case "accepted":
      return {
        color: "#10b981",
        bg: "#d1fae5",
        border: "#22c55e",
        dot: "#22c55e",
        text: "#16a34a", // green-700
      };
    case "pending":
      return {
        color: "#ca8a04", // yellow-700 (text color)
        bg: "#fef3c7", // yellow-100 (background)
        border: "#ca8a04",
        dot: "#ca8a04",
        text: "#ca8a04", // yellow-700
      };
    case "ongoing":
    case "lead":
    case "new":
      return {
        color: "#3b82f6", // blue-500
        bg: "#dbeafe", // blue-100
        border: "#3b82f6",
        dot: "#3b82f6",
        text: "#1e40af", // blue-700
      }; // blue
    case "contacted":
      return {
        color: "#8b5cf6", // purple-500
        bg: "#ede9fe", // purple-100
        border: "#8b5cf6",
        dot: "#8b5cf6",
        text: "#6d28d9", // purple-700
      }; // purple
    case "qualified":
      return {
        color: "#f59e0b", // amber-500
        bg: "#fef3c7", // amber-100
        border: "#f59e0b",
        dot: "#f59e0b",
        text: "#d97706", // amber-700
      }; // amber
    case "converted":
      return {
        color: "#10b981", // green-500
        bg: "#d1fae5", // green-100
        border: "#22c55e",
        dot: "#22c55e",
        text: "#16a34a", // green-700
      }; // green
    case "active":
      return {
        color: "#10b981",
        bg: "#d1fae5",
        border: "#22c55e",
        dot: "#22c55e",
        text: "#16a34a",
      };
    case "inactive":
      return {
        color: "#ca8a04",
        bg: "#fef3c7",
        border: "#ca8a04",
        dot: "#ca8a04",
        text: "#ca8a04",
      };
    case "archived":
      return {
        color: "#6b7280",
        bg: "#f3f4f6",
        border: "#9ca3af",
        dot: "#9ca3af",
        text: "#4b5563",
      };
    case "discussion":
      return {
        color: "#fef3c7",
        bg: "#fef3c7",
        border: "#ca8a04",
        dot: "#ca8a04",
        text: "#ca8a04", // yellow-700
      }; // amber/yellow
    case "finalized":
      return {
        color: "#10b981",
        bg: "#d1fae5",
        border: "#22c55e",
        dot: "#22c55e",
        text: "#16a34a", // green-700
      }; // green

    // Document statuses
    case "completed":
      return {
        color: "#10b981",
        bg: "#d1fae5",
        border: "#22c55e",
        dot: "#22c55e",
        text: "#16a34a", // green-700
      }; // green
    case "viewed":
      return { color: "#4f46e5", bg: "#e0e7ff" }; // indigo/blue
    case "opened":
      return { color: "#f59e0b", bg: "#fef3c7" }; // light yellow/amber
    case "sent":
      return { color: "#6b7280", bg: "#f3f4f6" }; // gray

    default:
      return {
        color: "#9ca3af", // gray-400
        bg: "#f3f4f6",
        border: "#9ca3af", // gray-400
        dot: "#9ca3af", // gray-400
      }; // gray
  }
};

/**
 * Get status icon based on status value
 * Returns a React component for the appropriate icon
 *
 * @param {string|null|undefined} status - The status value
 * @returns {React.Component|null} - Icon component or null
 *
 * @example
 * getStatusIcon("confirmed") // <CheckCircle2 size={14} />
 * getStatusIcon("completed") // <CheckCircle size={14} />
 * getStatusIcon("viewed") // <Eye size={14} />
 * getStatusIcon(null) // null
 */
export const getStatusIcon = (status) => {
  if (!status) return null;

  switch (status.toLowerCase()) {
    // Walkthrough statuses
    case "confirmed":
      return <CheckCircle2 size={14} />;
    case "pending":
      return <Clock size={14} />;
    case "canceled":
      return <XCircle size={14} />;

    // Document statuses
    case "completed":
      return <CheckCircle size={14} />;
    case "viewed":
      return <Eye size={14} />;
    case "opened":
      return <Eye size={14} />;
    case "sent":
      return <Send size={14} />;

    default:
      return null;
  }
};

