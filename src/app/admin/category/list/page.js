"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../../store/categorySlice";
import Table from "../../../components/Table";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";

export default function CategoryList() {
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector((state) => state.category);

  const columns = [
    { key: "id", label: "ID" },
    { key: "name", label: "Category Name" },
        { key: "description", label: "Description" },

  ];

  const tableData = categories.map((c) => ({
    id: c.id,
    name: c.name,
    description: c.description,
  }));

  useEffect(() => {
    dispatch(fetchCategories());
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
        <h1 className="text-xl font-bold">Categories</h1>

        <Link
          href="/admin/category/add"
          className="bg-green-500 shadow-md font-semibold text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-green-600 transition"
        >
          <FaPlus className="text-white w-4 h-4" />
          <span>Add Category</span>
        </Link>
      </div>

      <Table columns={columns} data={tableData} />
    </div>
  );
}
