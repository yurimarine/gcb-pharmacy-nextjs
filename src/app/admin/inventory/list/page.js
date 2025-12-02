"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchInventoryByPharmacy } from "../../../store/inventorySlice";
import { fetchPharmacies } from "../../../store/pharmacySlice";
import { useRouter } from "next/navigation";
import Table from "../../../components/Table";
import LoadingSpinner from "@/app/components/LoadingSpinner";

export default function InventoryList() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [selectedPharmacy, setSelectedPharmacy] = useState("");

  const {
    pharmacies,
    loading: loadingPharmacies,
    error: errorPharmacies,
  } = useSelector((state) => state.pharmacy);
  const {
    items: inventory,
    loading,
    error,
  } = useSelector((state) => state.inventory);
  
  const columns = [
    { key: "product_id", label: "ID" },
    { key: "generic_name", label: "Generic Name" },
    { key: "product_name", label: "Product" },
    { key: "markup_percentage", label: "Markup %" },
    { key: "selling_price", label: "Selling Price" },
    { key: "stock_quantity", label: "Stock Quantity" },
    { key: "reorder_quantity", label: "Reorder Level" },
    { key: "expiry_date", label: "Expiry Date" },
  ];

  const tableData = inventory.map((item) => ({
    id: item.id,
    status: item.status,
    pharmacy_id: item.pharmacy_id,
    product_id: item.product_id,
    generic_name: item.product?.generic?.name ?? "-",
    product_name: item.product?.product_name ?? "-",
    stock_quantity: item.stock_quantity ?? "-",
    markup_percentage:
      item.markup_percentage != null ? `${item.markup_percentage} %` : "-",
    reorder_quantity: item.reorder_quantity ?? "-",
    expiry_date: item.expiry_date ?? "-",
    selling_price:
      item.selling_price != null
        ? `₱ ${Number(item.selling_price).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`
        : "-",
  }));

  const handleUpdate = (row) => {
    router.push(`/admin/inventory/update/${row.pharmacy_id}/${row.product_id}`);
  };

  useEffect(() => {
    dispatch(fetchPharmacies());
  }, [dispatch]);

  useEffect(() => {
    if (selectedPharmacy) {
      dispatch(fetchInventoryByPharmacy(selectedPharmacy));
    }
  }, [dispatch, selectedPharmacy]);

  useEffect(() => {
    if (pharmacies?.length > 0 && !selectedPharmacy) {
      setSelectedPharmacy(pharmacies[0].id); 
    }
  }, [pharmacies, selectedPharmacy]);

  if (loadingPharmacies)
    return (
      <div className="relative min-h-screen w-full">
        <LoadingSpinner />
      </div>
    );
  if (errorPharmacies) return <p className="text-red-600">{errorPharmacies}</p>;

  return (
    <div className="text-gray-900">
      <h1 className="text-xl font-bold mb-4 ">Inventory </h1>

      {/* Pharmacy dropdown selector */}
      <div className="mb-4 flex items-center gap-6">
        {/* SELECT DROPDOWN */}
        <select
          className="border border-gray-300 bg-gray-200 focus:border-green-600 focus:ring-0 outline-none px-3 py-2 rounded"
          value={selectedPharmacy}
          onChange={(e) => setSelectedPharmacy(e.target.value)}
        >
          {pharmacies?.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>

        {/* LEGEND */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-yellow-100 border border-yellow-500"></div>
            <span className="text-sm text-gray-700">Low Stock</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-gray-300 border border-gray-500"></div>
            <span className="text-sm text-gray-700">Expired</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-red-300 border border-red-500"></div>
            <span className="text-sm text-gray-700">Critical</span>
          </div>
        </div>
      </div>

      {loading && (
        <div className="relative min-h-screen w-full">
          <LoadingSpinner />
        </div>
      )}

      {error && <p className="text-red-600">{error}</p>}

      {!loading && selectedPharmacy && (
        <Table columns={columns} data={tableData} onUpdate={handleUpdate} />
      )}
    </div>
  );
}
