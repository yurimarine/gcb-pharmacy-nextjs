"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { FaPlus } from "react-icons/fa";
import { fetchBatches } from "../../../store/batchSlice";
import Table from "../../../components/Table";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import Link from "next/link";

export default function BatchList() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { batches, loading, error } = useSelector((state) => state.batch);

  const columns = [
    { key: "id", label: "ID" },
    { key: "batch_number", label: "Batch Number" },
    { key: "pharmacy_name", label: "Pharmacy Name" },
    { key: "date", label: "Date" },
  ];

  const tableData = batches.map((batch) => ({
    id: batch.id,
    batch_number: batch.batch_number,
    pharmacy_name: batch.pharmacy?.name,
    date: batch.batch_date,
  }));

  const onRowClick = (row) => {
    router.push(`/admin/batch/${row.id}`);
  };

  useEffect(() => {
    dispatch(fetchBatches());
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
        <h1 className="text-xl font-bold">Batch List</h1>

        <Link
          href="/admin/batch/create-batch"
          className="bg-green-500 shadow-md font-semibold text-white px-4 py-2 rounded flex items-center gap-2 hover:scale-105 hover:bg-green-600 transition"
        >
          <FaPlus className="text-white w-4 h-4" />
          <span>Create Batch</span>
        </Link>
      </div>
      <div className="overflow-auto">
        <Table columns={columns} data={tableData} onRowClick={onRowClick} />
      </div>
    </div>
  );
}
