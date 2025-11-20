"use client";

import { useState, useMemo } from "react";
import {
  PencilIcon,
  TrashIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from "@heroicons/react/24/outline";

export default function Table({ columns, data, onEdit, onDelete }) {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const sortedData = useMemo(() => {
    if (!sortConfig.key) return data;
    return [...data].sort((a, b) => {
      const valA = a[sortConfig.key];
      const valB = b[sortConfig.key];

      if (typeof valA === "string") {
        return (
          valA.localeCompare(valB) * (sortConfig.direction === "asc" ? 1 : -1)
        );
      } else if (typeof valA === "number") {
        return (valA - valB) * (sortConfig.direction === "asc" ? 1 : -1);
      }
      return 0;
    });
  }, [data, sortConfig]);

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const renderSortIcon = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === "asc" ? (
      <ArrowUpIcon className="w-4 h-4 inline ml-1 text-gray-500" />
    ) : (
      <ArrowDownIcon className="w-4 h-4 inline ml-1 text-gray-500" />
    );
  };

  return (
    <div className="overflow-x-auto bg-white shadow rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-4 py-2 text-left text-sm font-semibold text-gray-700 cursor-pointer select-none"
                onClick={() => handleSort(col.key)}
              >
                {col.label}
                {renderSortIcon(col.key)}
              </th>
            ))}
            {(onEdit || onDelete) && (
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                Actions
              </th>
            )}
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {sortedData.length === 0 && (
            <tr>
              <td
                colSpan={columns.length + (onEdit || onDelete ? 1 : 0)}
                className="px-4 py-6 text-center text-gray-400"
              >
                No data available
              </td>
            </tr>
          )}

          {sortedData.map((row, idx) => (
            <tr key={idx} className="hover:bg-gray-50">
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-2 text-sm text-gray-700">
                  {row[col.key]}
                </td>
              ))}

              {(onEdit || onDelete) && (
                <td className="px-4 py-2 flex space-x-2">
                  {onEdit && (
                    <button
                      onClick={() => onEdit(row)}
                      className="p-1 rounded hover:bg-gray-100"
                    >
                      <PencilIcon className="w-5 h-5 text-blue-500" />
                    </button>
                  )}
                  {onDelete && (
                    <button
                      onClick={() => onDelete(row)}
                      className="p-1 rounded hover:bg-gray-100"
                    >
                      <TrashIcon className="w-5 h-5 text-red-500" />
                    </button>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
