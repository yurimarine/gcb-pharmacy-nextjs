"use client";

import { useState, useMemo } from "react";
import {
  PencilIcon,
  TrashIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from "@heroicons/react/24/outline";

export default function Table({
  columns,
  data,
  onUpdate,
  onDelete,
  onRowClick,
}) {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [selectedRow, setSelectedRow] = useState(null);

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

  const getRowClass = (row) => {
    let baseClass = "transition hover:bg-blue-200";

    if (row.status) {
      switch (row.status) {
        case "low_stock":
          baseClass = "bg-yellow-100 hover:bg-yellow-200 transition";
          break;
        case "critical":
          baseClass = "bg-red-100 hover:bg-red-200 transition";
          break;
        case "expired":
          baseClass = "bg-gray-300 hover:bg-gray-400 transition";
          break;
        default:
          baseClass = "bg-white hover:bg-blue-200 transition";
      }
    }

    return baseClass;
  };

  return (
    <div className="max-h-[74vh] overflow-x-auto bg-white shadow rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-blue-300 sticky top-0 z-10">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-4 py-3 text-left text-sm font-semibold text-gray-700 cursor-pointer select-none"
                onClick={() => handleSort(col.key)}
              >
                <div className="flex items-center">
                  {col.label}
                  {renderSortIcon(col.key)}
                </div>
              </th>
            ))}

            {(onUpdate || onDelete) && (
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                Actions
              </th>
            )}
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {sortedData.length === 0 && (
            <tr>
              <td
                colSpan={columns.length + (onUpdate || onDelete ? 1 : 0)}
                className="px-4 py-6 text-center text-gray-400"
              >
                No data available
              </td>
            </tr>
          )}

          {sortedData.map((row, idx) => (
            <tr
              key={idx}
              className={getRowClass(row)}
              onClick={() => {
                setSelectedRow(row);
                if (onRowClick) onRowClick(row);
              }}
            >
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-2 text-sm text-gray-700">
                  {col.render ? col.render(row[col.key], row) : row[col.key]}
                </td>
              ))}

              {(onUpdate || onDelete) && (
                <td className="px-4 py-2">
                  <div className="flex items-center space-x-2">
                    {onUpdate && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); 
                          onUpdate(row);
                        }}
                        className="p-1.5 rounded border border-orange-500 bg-orange-100 hover:bg-orange-300 transition"
                        title="Edit"
                      >
                        <PencilIcon className="w-5 h-5 text-orange-500" />
                      </button>
                    )}
                    {onDelete && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); 
                          onDelete(row);
                        }}
                        className="p-1.5 border border-red-600 bg-red-100 rounded hover:bg-red-200 transition"
                        title="Delete"
                      >
                        <TrashIcon className="w-5 h-5 text-red-600" />
                      </button>
                    )}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
