"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCategory, fetchCategories } from "../../../store/categorySlice";
import { useRouter } from "next/navigation";
import { FaPlus } from "react-icons/fa";
import Table from "../../../components/Table";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import Link from "next/link";

export default function CategoryList() {
  const dispatch = useDispatch();
  const router = useRouter();

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

  const handleUpdate = (row) => {
    router.push(`/admin/category/update/${row.id}`);
  };

  const handleDelete = (row) => {
    if (!confirm(`Are you sure you want to delete ${row.name}?`)) return;

    dispatch(deleteCategory(row.id));
  };

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
          className="bg-green-500 shadow-md font-semibold text-white px-4 py-2 rounded flex items-center gap-2 hover:scale-105 hover:bg-green-600 transition"
        >
          <FaPlus className="text-white w-4 h-4" />
          <span>Add Category</span>
        </Link>
      </div>

      <Table columns={columns} data={tableData} onUpdate={handleUpdate} onDelete={handleDelete} />
    </div>
  );
}
