"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchInventoryByPharmacy } from "../../../store/inventorySlice";
import { fetchPharmacies } from "../../../store/pharmacySlice";
import Table from "../../../components/Table";
import LoadingSpinner from "@/app/components/LoadingSpinner";

export default function InventoryList() {
  const dispatch = useDispatch();

  const { pharmacies } = useSelector((state) => state.pharmacy);
  const {
    items: inventory,
    loading,
    error,
  } = useSelector((state) => state.inventory);

  const [selectedPharmacy, setSelectedPharmacy] = useState("");

  useEffect(() => {
    dispatch(fetchPharmacies());
  }, [dispatch]);

  useEffect(() => {
    if (selectedPharmacy) {
      dispatch(fetchInventoryByPharmacy(selectedPharmacy));
    }
  }, [dispatch, selectedPharmacy]);

  const columns = [
    { key: "id", label: "ID" },
    { key: "product_name", label: "Product" },
    { key: "stock_quantity", label: "Stock Quantity" },
    { key: "reorder_quantity", label: "Reorder Level" },
    { key: "expiry_date", label: "Expiry Date" },
    { key: "selling_price", label: "Selling Price" },
  ];

  const tableData = inventory.map((item) => ({
    id: item.product_id,
    product_name: item.product?.brand_name ?? "-",
    stock_quantity: item.stock_quantity ?? "-",
    reorder_quantity: item.reorder_quantity ?? "-",
    expiry_date: item.expiry_date ?? "-",
    selling_price: item.selling_price ?? "-",
  }));

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Inventory </h1>

      {/* Pharmacy dropdown selector */}
      <div className="mb-4">
        <label className="font-semibold mr-3">Select Pharmacy:</label>
        <select
          className="border px-3 py-2 rounded"
          value={selectedPharmacy}
          onChange={(e) => setSelectedPharmacy(e.target.value)}
        >
          <option value="">-- Choose Pharmacy --</option>
          {pharmacies?.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
      </div>

      {loading && (
        <div className="relative min-h-screen w-full">
          <LoadingSpinner />
        </div>
      )}

      {error && <p className="text-red-600">{error}</p>}

      {!loading && selectedPharmacy && (
        <Table columns={columns} data={tableData} />
      )}
    </div>
  );
}
