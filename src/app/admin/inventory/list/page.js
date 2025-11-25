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
  const [selectedPharmacy, setSelectedPharmacy] = useState("");
  const columns = [
    { key: "product_id", label: "ID" },
    { key: "product_name", label: "Product" },
    { key: "stock_quantity", label: "Stock Quantity" },
    { key: "markup_percentage", label: "Markup %" },
    { key: "selling_price", label: "Selling Price" },
    { key: "reorder_quantity", label: "Reorder Level" },
    { key: "expiry_date", label: "Expiry Date" },
  ];
  
  const tableData = inventory.map((item) => ({
    id: item.id,
    pharmacy_id: item.pharmacy_id,
    product_id: item.product_id,
    product_name: item.product?.brand_name ?? "-",
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
    console.log(row);
  };

  useEffect(() => {
    dispatch(fetchPharmacies());
  }, [dispatch]);

  useEffect(() => {
    if (selectedPharmacy) {
      dispatch(fetchInventoryByPharmacy(selectedPharmacy));
    }
  }, [dispatch, selectedPharmacy]);

  if (loadingPharmacies)
    return (
      <div className="relative min-h-screen w-full">
        <LoadingSpinner />
      </div>
    );
  if (errorPharmacies) return <p className="text-red-600">{errorPharmacies}</p>;

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
        <Table columns={columns} data={tableData} onUpdate={handleUpdate} />
      )}
    </div>
  );
}
