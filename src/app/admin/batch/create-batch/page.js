"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "@/app/store/productSlice";
import { fetchPharmacies } from "@/app/store/pharmacySlice";
import { addBatchProducts } from "@/app/store/batchSlice";
import { useRouter } from "next/navigation";
import { ClipboardDocumentListIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import BatchTable from "@/app/components/BatchTable";

export default function AddBatchProductPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [selectedPharmacy, setSelectedPharmacy] = useState("");
  const [form, setForm] = useState({
    pharmacy_id: selectedPharmacy,
    items: [],
  });
  const {
    pharmacies,
    loading: loadingPharmacies,
    error: errorPharmacies,
  } = useSelector((state) => state.pharmacy);
  const {
    products,
    loading: loadingProducts,
    error: errorProducts,
  } = useSelector((state) => state.product);

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("form", form);
    dispatch(addBatchProducts(form))
      .unwrap()
      .then((res) => {
        console.log("Batch Products added:", res);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    dispatch(fetchPharmacies());
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    if (pharmacies?.length > 0 && !selectedPharmacy) {
      setSelectedPharmacy(pharmacies[0].id);
    }
  }, [pharmacies, selectedPharmacy]);

  useEffect(() => {
    if (selectedPharmacy) {
      setForm((prev) => ({ ...prev, pharmacy_id: selectedPharmacy }));
    }
  }, [selectedPharmacy]);

  if (loadingPharmacies)
    return (
      <div className="relative min-h-screen w-full">
        <LoadingSpinner />
      </div>
    );
  if (errorPharmacies) return <p className="text-red-600">{errorPharmacies}</p>;

  return (
    <div className="w-full text-gray-900 ">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-xl font-bold">Add Batch Products</h1>
        </div>
        <div className="flex gap-2 ">
          <Link
            href="/admin/batch/list"
            className="bg-green-500 shadow-md font-semibold text-white px-4 py-2 rounded flex items-center gap-2 hover:scale-105 hover:bg-green-600 transition"
          >
            <ClipboardDocumentListIcon className="text-white w-5 h-5" />
            <span>Batch List</span>
          </Link>
          <Link
            href="/admin/inventory/list"
            className="bg-green-500 shadow-md font-semibold text-white px-4 py-2 rounded flex items-center gap-2 hover:scale-105 hover:bg-green-600 transition"
          >
            <ClipboardDocumentListIcon className="text-white w-5 h-5" />
            <span>Inventory List</span>
          </Link>
        </div>
      </div>
      <div className="mb-4 flex items-center gap-6">
        {/* SELECT DROPDOWN */}
        <select
          value={selectedPharmacy}
          onChange={(e) => {
            setSelectedPharmacy(e.target.value);
            setForm((prev) => ({ ...prev, pharmacy_id: e.target.value }));
          }}
          className="border border-gray-300 bg-gray-200 focus:border-green-600 focus:ring-0 outline-none px-3 py-2 rounded"
        >
          {pharmacies?.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
      </div>
      <form onSubmit={onSubmit} className="text-sm flex flex-col gap-12">
        <BatchTable
          products={products}
          onItemsChange={(items) => setForm((prev) => ({ ...prev, items }))}
        />
        {/* Submit Button */}
        <div className="flex justify-end gap-5">
          <Link
            href="/admin/batch/list"
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
