import { useState } from "react";

export default function AddProductModal({ isOpen, onClose, onAdd }) {
  if (!isOpen) return null;

  const [form, setForm] = useState({
    product_id: "",
    quantity: "",
    expiration_date: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(form); // send data back to parent
    setForm({ product_id: "", quantity: "", expiration_date: "" });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 w-[450px] rounded shadow-lg">
        <h2 className="text-lg font-bold mb-4">Add Product</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* PRODUCT ID */}
          <div>
            <label className="font-semibold">Product</label>
            <input
              type="text"
              name="product_id"
              value={form.product_id}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 rounded"
              placeholder="Product ID"
              required
            />
          </div>

          {/* QUANTITY */}
          <div>
            <label className="font-semibold">Quantity</label>
            <input
              type="number"
              name="quantity"
              value={form.quantity}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 rounded"
              placeholder="Enter quantity"
              required
            />
          </div>

          {/* EXPIRATION DATE */}
          <div>
            <label className="font-semibold">Expiration Date</label>
            <input
              type="date"
              name="expiration_date"
              value={form.expiration_date}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 rounded"
              required
            />
          </div>

          {/* BUTTONS */}
          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
