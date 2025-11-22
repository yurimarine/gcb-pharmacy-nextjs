"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGenerics } from "../../../store/genericSlice";
import Table from "../../../components/Table";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";

export default function GenericList() {
  const dispatch = useDispatch();
  const { generics, loading, error } = useSelector((state) => state.generic);

  const columns = [
    { key: "id", label: "ID" },
    { key: "name", label: "Generic Name" },
    { key: "description", label: "Description" },
  ];

  const tableData = generics.map((g) => ({
    id: g.id,
    name: g.name,
    description: g.description,
  }));

  useEffect(() => {
    dispatch(fetchGenerics());
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
        <h1 className="text-xl font-bold">Generics</h1>

        <Link
          href="/admin/generic/add"
          className="bg-green-500 shadow-md font-semibold text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-green-600 transition"
        >
          <FaPlus className="text-white w-4 h-4" />
          <span>Add Generic</span>
        </Link>
      </div>

      <Table columns={columns} data={tableData} />
    </div>
  );
}
