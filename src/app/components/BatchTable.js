"use client";

import { useState, useEffect } from "react";
import { TrashIcon } from "@heroicons/react/24/outline";
import { FaPlus } from "react-icons/fa";

export default function BatchTable({ products, onItemsChange }) {
  const [rows, setRows] = useState([
    {
      product_name: "",
      product_id: null,
      in_stock_quantity: "",
      out_stock_quantity: "",
      new_expiry_date: "",
    },
  ]);
  const [openDropdown, setOpenDropdown] = useState(null);

  const addRow = () => {
    setRows((prev) => [
      ...prev,
      {
        product_name: "",
        product_id: null,
        in_stock_quantity: "",
        out_stock_quantity: "",
        new_expiry_date: "",
      },
    ]);
  };

  const removeRow = (index) => {
    setRows(rows.filter((_, i) => i !== index));
  };

  const updateRow = (index, key, value) => {
    const updated = [...rows];
    updated[index][key] = value;
    setRows(updated);
  };

  useEffect(() => {
    if (onItemsChange) {
      onItemsChange(rows);
    }
  }, [rows]);

  return (
    <div className="relative overflow-x-auto bg-white shadow rounded-lg">
      <table className="min-w-full divide-y divide-gray-300">
        <thead className="bg-gray-300">
          <tr>
            <th className="px-4 py-3 text-left font-semibold text-sm text-gray-700">
              #
            </th>
            <th className="px-4 py-3 text-left font-semibold text-sm text-gray-700">
              Product Name
            </th>
            <th className="px-4 py-3 text-left font-semibold text-sm text-gray-700">
              Incoming Stock
            </th>
            <th className="px-4 py-3 text-left font-semibold text-sm text-gray-700">
              Outgoing Stock
            </th>
            <th className="px-4 py-3 text-left font-semibold text-sm text-gray-700">
              New Expiry Date
            </th>
            <th className="px-4 py-2"></th>
          </tr>
        </thead>

        <tbody>
          {rows.map((row, idx) => {
            const filteredProducts = products.filter((p) =>
              p.product_name
                .toLowerCase()
                .includes(row.product_name.toLowerCase())
            );

            return (
              <tr key={idx} className="group relative">
                {/* Row Number */}
                <td className="px-4 py-2 text-sm text-gray-700">{idx + 1}</td>

                {/* Product Name Input */}
                <td className="px-4 py-2 relative">
                  <input
                    required
                    type="text"
                    value={row.product_name}
                    onChange={(e) => {
                      updateRow(idx, "product_name", e.target.value);
                      setOpenDropdown(idx); // open dropdown ONLY for this row
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-green-500 focus:border-green-500"
                    placeholder="Enter product name"
                  />

                  {/* AUTOCOMPLETE DROPDOWN */}
                  {openDropdown === idx && row.product_name !== "" && (
                    <ul className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded max-h-40 overflow-y-auto shadow-lg z-20">
                      {filteredProducts.length === 0 && (
                        <li className="px-3 py-2 text-gray-500">
                          No results found
                        </li>
                      )}

                      {filteredProducts.map((p) => (
                        <li
                          key={p.id}
                          className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => {
                            updateRow(idx, "product_name", p.product_name);
                            updateRow(idx, "product_id", p.id);
                            setOpenDropdown(null);
                          }}
                        >
                          {p.product_name}{" "}
                          <span className="text-gray-500">(ID: {p.id})</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </td>

                {/* Incoming Qty Input */}
                <td className="px-4 py-2">
                  <input
                    type="number"
                    value={row.in_stock_quantity}
                    onChange={(e) =>
                      updateRow(idx, "in_stock_quantity", e.target.value)
                    }
                    placeholder="Enter quantity"
                    disabled={
                      row.out_stock_quantity !== "" &&
                      row.out_stock_quantity !== 0
                    }
                    className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-green-500 focus:border-green-500
      ${
        row.out_stock_quantity !== "" && row.out_stock_quantity !== 0
          ? "bg-gray-100 border-gray-300 text-gray-400 cursor-not-allowed"
          : "bg-white border-gray-300 text-black"
      }`}
                  />
                </td>

                {/* Outgoing Qty Input */}
                <td className="px-4 py-2">
                  <input
                    type="number"
                    value={row.out_stock_quantity}
                    onChange={(e) =>
                      updateRow(idx, "out_stock_quantity", e.target.value)
                    }
                    placeholder="Enter quantity"
                    disabled={
                      row.in_stock_quantity !== "" &&
                      row.in_stock_quantity !== 0
                    }
                    className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-green-500 focus:border-green-500
      ${
        row.in_stock_quantity !== "" && row.in_stock_quantity !== 0
          ? "bg-gray-100 border-gray-300 text-gray-400 cursor-not-allowed"
          : "bg-white border-gray-300 text-black"
      }`}
                  />
                </td>

                {/* New Expiry Input */}
                <td className="px-4 py-2">
                  <input
                    type="date"
                    value={row.new_expiry_date}
                    onChange={(e) =>
                      updateRow(idx, "new_expiry_date", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-green-500 focus:border-green-500"
                  />
                </td>

                {/* Remove Button */}
                <td className="p-2 text-center">
                  <button
                    type="button"
                    onClick={() => removeRow(idx)}
                    className="p-1.5 border border-red-600 bg-red-100 rounded hover:bg-red-200 transition"
                  >
                    <TrashIcon className="w-5 h-5 text-red-600" />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Add Row Button */}
      <div className="flex justify-center p-4">
        <button
          type="button"
          onClick={addRow}
          className="w-full p-2 flex text-gray-300 justify-center items-center border-2 border-dashed border-gray-300 bg-gray-100 rounded hover:bg-gray-200 hover:border-gray-500  hover:text-gray-500 transition"
        >
          <FaPlus className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
