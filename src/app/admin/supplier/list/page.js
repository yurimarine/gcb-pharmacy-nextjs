"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteSupplier, fetchSuppliers } from "../../../store/supplierSlice";
import { useRouter } from "next/navigation";
import { FaPlus } from "react-icons/fa";
import Table from "../../../components/Table";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import Link from "next/link";

export default function SupplierList() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { suppliers, loading, error } = useSelector((state) => state.supplier);

  console.log(suppliers);

  const columns = [
    { key: "id", label: "ID" },
    { key: "name", label: "Supplier Name" },
    { key: "contact_person", label: "Contact Person" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone Number" },
    { key: "address", label: "Address" },
  ];

  const tableData = suppliers.map((s) => ({
    id: s.id,
    name: s.name,
    contact_person: s.contact_person,
    email: s.email,
    phone: s.phone,
    address: s.address,
  }));

  const handleUpdate = (row) => {
    router.push(`/admin/supplier/update/${row.id}`);
  };

  const handleDelete = (row) => {
    if (!confirm(`Are you sure you want to delete ${row.name}?`)) return;

    dispatch(deleteSupplier(row.id));
  };

  useEffect(() => {
    dispatch(fetchSuppliers());
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
        <h1 className="text-xl font-bold">Suppliers</h1>

        <Link
          href="/admin/supplier/add"
          className="bg-green-500 shadow-md font-semibold text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-green-600 transition"
        >
          <FaPlus className="text-white w-4 h-4" />
          <span>Add Supplier</span>
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
