"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter, useParams } from "next/navigation";
import {
  fetchInventoryById,
  updateInventory,
} from "../../../../../store/inventorySlice";
import { ClipboardDocumentListIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import LoadingSpinner from "@/app/components/LoadingSpinner";

export default function UpdateInventoryPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { pharmacy_id, product_id } = useParams();
  const { item, loading, error } = useSelector((state) => state.inventory);

  const [form, setForm] = useState({
    product_name: "",
    stock_quantity: "",
    reorder_quantity: "",
    unit_cost: "",
    markup_percentage: "",
    selling_price: "",
    expiry_date: "",
  });

  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(updateInventory({ pharmacy_id, product_id, form }))
      .unwrap()
      .then((res) => {
        console.log("Inventory updated:", res);
        router.push("/admin/inventory/list");
      })
      .catch(console.error);
  };

  useEffect(() => {
    dispatch(fetchInventoryById({ pharmacy_id, product_id }));
  }, [dispatch, pharmacy_id, product_id]);

  useEffect(() => {
    if (item) {
      setForm({
        product_name: item.product?.product_name ?? "",
        stock_quantity: item.stock_quantity ?? "",
        reorder_quantity: item.reorder_quantity ?? "",
        unit_cost: item.product?.unit_cost ?? "",
        markup_percentage: item.markup_percentage ?? "",
        selling_price: item.selling_price ?? "",
        expiry_date: item.expiry_date ?? "",
      });
    }
  }, [item]);

  useEffect(() => {
    if (form.unit_cost && form.markup_percentage !== "") {
      const unit = parseFloat(form.unit_cost) || 0;
      const markup = parseFloat(form.markup_percentage) || 0;

      const computed = unit + unit * (markup / 100);

      setForm((prev) => ({
        ...prev,
        selling_price: computed.toFixed(2),
      }));
    }
  }, [form.unit_cost, form.markup_percentage]);

  if (loading)
    return (
      <div className="relative min-h-screen w-full">
        <LoadingSpinner />
      </div>
    );
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="w-full text-gray-700 ">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold">Update Product</h1>
        <Link
          href="/admin/inventory/list"
          className="bg-green-500 shadow-md font-semibold text-white px-4 py-2 rounded flex items-center gap-2 hover:scale-105 hover:bg-green-600 transition"
        >
          <ClipboardDocumentListIcon className="text-white w-5 h-5" />
          <span>Inventory List</span>
        </Link>
      </div>
      <form
        onSubmit={onSubmit}
        className="bg-white p-6 text-sm rounded-lg shadow-md flex flex-col gap-12"
      >
        <div className="flex w-full h-full">
          {/* LEFT COLUMN */}
          <div className="flex flex-col items-end w-[40%] gap-4">
            {/* Product Name */}
            <div className="flex items-center gap-4">
              <label className="block mb-1 w-32 text-right">
                Product Name :
              </label>
              <span className="px-3 py-2 w-100 mb-1">{form.product_name}</span>
            </div>
            {/* Stock Quantity */}
            <div className="flex items-center gap-4">
              <label className="block mb-1 w-32 text-right">
                Stock Quantity :
              </label>
              <input
                type="number"
                name="stock_quantity"
                value={form.stock_quantity}
                onChange={onChange}
                className="w-100 border focus:border-green-600 focus:ring-0 outline-none border-gray-300 rounded px-3 py-2"
              />
            </div>
            {/* Reorder Quantity */}
            <div className="flex items-center gap-4">
              <label className="block mb-1 w-32 text-right">
                Reorder Quantity :
              </label>
              <input
                type="number"
                name="reorder_quantity"
                onChange={onChange}
                value={form.reorder_quantity}
                className="w-100 border focus:border-green-600 focus:ring-0 outline-none border-gray-300 rounded px-3 py-2"
              />
            </div>
            {/* Unit Cost */}
            <div className="flex items-center gap-4">
              <label className="block mb-1 w-32 text-right">Unit Cost :</label>
              <span className="px-3 py-2 w-100 mb-1">₱ {form.unit_cost}</span>
            </div>
            {/* Markup Percentage */}
            <div className="flex items-center gap-4">
              <label className="block mb-1 w-32 text-right">Markup % :</label>
              <input
                type="number"
                name="markup_percentage"
                value={form.markup_percentage}
                onChange={onChange}
                className="w-100 border focus:border-green-600 focus:ring-0 outline-none border-gray-300 rounded px-3 py-2"
              />
            </div>
            {/* Selling Price */}
            <div className="flex items-center gap-4">
              <label className="block mb-1 w-32 text-right">
                Selling Price :
              </label>
              <span className="px-3 py-2 w-100 mb-1">
                ₱ {form.selling_price}
              </span>
            </div>
            {/* Expiry Date */}
            <div className="flex items-center gap-4">
              <label className="block mb-1 w-32 text-right">
                Expiry Date :
              </label>
              <input
                type="date"
                name="expiry_date"
                value={form.expiry_date}
                onChange={onChange}
                className="w-100 border focus:border-green-600 focus:ring-0 outline-none border-gray-300 rounded px-3 py-2"
              />
            </div>
          </div>
        </div>
        {/* Submit Button */}
        <div className="flex justify-end gap-5">
          <Link
            href="/admin/inventory/list"
            className="w-auto px-6 py-2 text-md bg-red-600 shadow-md font-semibold text-white rounded hover:bg-red-700 hover:scale-105 transition mt-4"
          >
            Cancel
          </Link>

          <button
            type="submit"
            className="w-auto px-6 py-2 text-md bg-green-500 shadow-md font-semibold text-white rounded hover:bg-green-600 hover:scale-105 transition mt-4"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
