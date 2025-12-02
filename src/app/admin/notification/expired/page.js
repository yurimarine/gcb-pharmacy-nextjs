"use client";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchAllExpired } from "@/app/store/inventorySlice";
import { ClipboardDocumentListIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Table from "@/app/components/Table";
import LoadingSpinner from "@/app/components/LoadingSpinner";

export default function ExpiredPage() {
  const dispatch = useDispatch();
  const { expiredItems, loading, error } = useSelector((s) => s.inventory);

  const columns = [
    { key: "id", label: "ID" },
    { key: "pharmacy_name", label: "Pharmacy Name" },
    { key: "generic_name", label: "Generic Name" },
    { key: "name", label: "Product Name" },
    { key: "expiry_date", label: "Expiry Date" },
  ];

  const tableData = expiredItems.map((item) => ({
    id: item.id,
    pharmacy_name: item.pharmacy?.name,
    generic_name: item.product?.generic?.name,
    name: item.product?.product_name,
    expiry_date: (
      <span className="text-red-600 font-semibold">{item.expiry_date}</span>
    ),
  }));

  useEffect(() => {
    dispatch(fetchAllExpired());
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
        <h1 className="text-xl font-bold">Expired Items</h1>

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
