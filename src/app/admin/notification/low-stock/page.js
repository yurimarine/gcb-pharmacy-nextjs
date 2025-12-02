"use client";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchAllLowStock } from "@/app/store/inventorySlice";
import { ClipboardDocumentListIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Table from "@/app/components/Table";
import LoadingSpinner from "@/app/components/LoadingSpinner";

export default function LowStockPage() {
  const dispatch = useDispatch();
  const { lowStockItems, loading, error } = useSelector((s) => s.inventory);

  const columns = [
    { key: "id", label: "ID" },
    { key: "pharmacy_name", label: "Pharmacy Name" },
    { key: "generic_name", label: "Generic Name" },
    { key: "name", label: "Product Name" },
    { key: "stock_quantity", label: "Stock Quantity" },
    { key: "reorder_quantity", label: "Reorder Quantity" },
  ];

  const tableData = lowStockItems.map((item) => ({
    id: item.id,
    generic_name: item.product?.generic?.name,
    pharmacy_name: item.pharmacy?.name,
    name: item.product?.product_name,
    status: item.status,

    stock_quantity: (
      <span className="text-red-600 font-semibold">{item.stock_quantity}</span>
    ),

    reorder_quantity: (
      <span className="text-green-600 font-semibold">
        {item.reorder_quantity}
      </span>
    ),
  }));

  useEffect(() => {
    dispatch(fetchAllLowStock());
  }, [dispatch]);

  if (loading)
    return (
      <div className="relative min-h-screen w-full">
        <LoadingSpinner />
      </div>
    );
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold">Low Stock Items</h1>

        <Link
          href="/admin/inventory/list"
          className="bg-green-500 shadow-md font-semibold text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-green-600 transition"
        >
          <ClipboardDocumentListIcon className="text-white w-4 h-4" />
          <span>Inventory List</span>
        </Link>
      </div>

      {/* Enable Actions */}
      <Table columns={columns} data={tableData} />
    </div>
  );
}
