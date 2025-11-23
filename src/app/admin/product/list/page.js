"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, deleteProduct } from "../../../store/productSlice";

import Table from "../../../components/Table";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";

export default function ProductList() {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.product);

  const columns = [
    { key: "id", label: "ID" },
    { key: "brand_name", label: "Brand Name" },
    { key: "generic_name", label: "Generic" },
    { key: "category_name", label: "Category" },
    { key: "unit_cost", label: "Unit Cost" },
  ];

  const tableData = products.map((p) => ({
    id: p.id,
    brand_name: p.brand_name,
    generic_name: p.generic?.name || "-",
    category_name: p.category?.name || "-",
    unit_cost: p.unit_cost,
  }));

  const handleUpdate = (row) => {
    console.log("Edit clicked:", row);
  };

  const handleDelete = (row) => {
    if (!confirm(`Are you sure you want to delete ${row.brand_name}?`)) return;

    dispatch(deleteProduct(row.id));
  };

  useEffect(() => {
    dispatch(fetchProducts());
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
        <h1 className="text-xl font-bold">Products</h1>

        <Link
          href="/admin/product/add"
          className="bg-green-500 shadow-md font-semibold text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-green-600 transition"
        >
          <FaPlus className="text-white w-4 h-4" />
          <span>Add Product</span>
        </Link>
      </div>

      <Table
        columns={columns}
        data={tableData}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
    </div>
  );
}
