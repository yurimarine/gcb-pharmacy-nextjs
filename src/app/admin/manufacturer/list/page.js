"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchManufacturers } from "../../../store/manufacturerSlice";
import Table from "../../../components/Table";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";

export default function ManufacturerList() {
  const dispatch = useDispatch();
  const { manufacturers, loading, error } = useSelector(
    (state) => state.manufacturer
  );

  console.log(manufacturers);

  const columns = [
    { key: "id", label: "ID" },
    { key: "name", label: "Manufacturer Name" },
    { key: "description", label: "Description" },
  ];

  const tableData = manufacturers.map((m) => ({
    id: m.id,
    name: m.name,
    description: m.description,
  }));

  useEffect(() => {
    dispatch(fetchManufacturers());
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
        <h1 className="text-xl font-bold">Manufacturers</h1>

        <Link
          href="/admin/manufacturer/add"
          className="bg-green-500 shadow-md font-semibold text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-green-600 transition"
        >
          <FaPlus className="text-white w-4 h-4" />
          <span>Add Manufacturer</span>
        </Link>
      </div>

      <Table columns={columns} data={tableData} />
    </div>
  );
}
