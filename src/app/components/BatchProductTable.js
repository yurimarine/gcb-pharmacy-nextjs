"use client";

import { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function BatchProductTable({ products, onChange }) {
  const [rows, setRows] = useState([]);

  const addRow = () => {
    const newRows = [...rows, { product_id: "", quantity: 1 }];
    setRows(newRows);
    onChange(newRows);
  };

  const updateRow = (index, field, value) => {
    const newRows = [...rows];
    newRows[index][field] = value;
    setRows(newRows);
    onChange(newRows);
  };

  const removeRow = (index) => {
    const newRows = rows.filter((_, i) => i !== index);
    setRows(newRows);
    onChange(newRows);
  };

  return (
    <div className="w-full">
      <button
        type="button"
        onClick={addRow}
        className="mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Add Product Row
      </button>

      <table className="w-full border border-gray-300 rounded">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Product</th>
            <th className="p-2 border">Quantity</th>
            <th className="p-2 border w-10">Remove</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td className="p-2 border">
                <select
                  className="w-full p-2 border rounded"
                  value={row.product_id}
                  onChange={(e) =>
                    updateRow(index, "product_id", e.target.value)
                  }
                >
                  <option value="">Select Product</option>
                  {products?.map((prod) => (
                    <option key={prod.id} value={prod.id}>
                      {prod.name}
                    </option>
                  ))}
                </select>
              </td>

              <td className="p-2 border">
                <input
                  type="number"
                  min="1"
                  className="w-full p-2 border rounded"
                  value={row.quantity}
                  onChange={(e) =>
                    updateRow(index, "quantity", e.target.value)
                  }
                />
              </td>

              <td className="p-2 border text-center">
                <button
                  type="button"
                  onClick={() => removeRow(index)}
                  className="text-red-600 hover:text-red-800"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
