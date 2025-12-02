"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useRouter } from "next/navigation";
import { fetchBatchById } from "../../../store/batchSlice";
import Table from "../../../components/Table";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import Link from "next/link";
import { ClipboardDocumentListIcon } from "@heroicons/react/24/outline";

export default function BatchItemList() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { batchItems, loading, error } = useSelector((state) => state.batch);
  const batchNumber =
    batchItems.length > 0 ? batchItems[0].batch?.batch_number : "";
  const batchDate =
    batchItems.length > 0 ? batchItems[0].batch?.batch_date : "";

  const columns = [
    { key: "id", label: "ID" },
    { key: "product_name", label: "Product Name" },
    { key: "prev_stock_quantity", label: "Current Stock Quantity" },
    { key: "in_stock_quantity", label: "In Stock Quantity" },
    { key: "out_stock_quantity", label: "Out Stock Quantity" },
    { key: "new_stock_quantity", label: "New Stock Quantity" },
    { key: "new_expiry_date", label: "New Expiry Date" },
  ];

  const tableData = batchItems.map((item) => ({
    id: item.id,
    product_name: item.product?.product_name,
    in_stock_quantity: item.in_stock_quantity,
    out_stock_quantity: item.out_stock_quantity,
    prev_stock_quantity: item.prev_stock_quantity,
    new_stock_quantity: item.new_stock_quantity,
    new_expiry_date: item.new_expiry_date,
    batch_number: item.batch?.batch_number,
    batch_date: item.batch?.batch_date,
  }));

  useEffect(() => {
    dispatch(fetchBatchById(id));
  }, [dispatch, id]);

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
        <h1 className="text-xl font-bold">
          Batch Number: {batchNumber} | Batch Date: {batchDate}
        </h1>
        <Link
          href="/admin/batch/list"
          className="bg-green-500 shadow-md font-semibold text-white px-4 py-2 rounded flex items-center gap-2 hover:scale-105 hover:bg-green-600 transition"
        >
          <ClipboardDocumentListIcon className="text-white w-4 h-4" />
          <span>Batch List</span>
        </Link>
      </div>
      <Table columns={columns} data={tableData} />
    </div>
  );
}
