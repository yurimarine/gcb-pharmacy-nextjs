"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePharmacy, fetchPharmacies } from "../../../store/pharmacySlice";
import { useRouter } from "next/navigation";
import { FaPlus } from "react-icons/fa";
import Table from "../../../components/Table";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import Link from "next/link";

export default function PharmacyList() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { pharmacies, loading, error } = useSelector((state) => state.pharmacy);

  const columns = [
    { key: "id", label: "ID" },
    { key: "name", label: "Pharmacy Name" },
    { key: "manager", label: "Manager" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone" },
    { key: "address", label: "Address" },
    { key: "description", label: "Description" },
  ];

  const tableData = pharmacies.map((p) => ({
    id: p.id,
    name: p.name,
    manager: p.manager,
    email: p.email,
    phone: p.phone,
    address: p.address,
    description: p.description,
  }));

  const handleUpdate = (row) => {
    router.push(`/admin/pharmacy/update/${row.id}`);
  };

  const handleDelete = (row) => {
    if (!confirm(`Are you sure you want to delete ${row.name}?`)) return;
    dispatch(deletePharmacy(row.id));
  };

  useEffect(() => {
    dispatch(fetchPharmacies());
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
        <h1 className="text-xl font-bold">Pharmacies</h1>

        <Link
          href="/admin/pharmacy/add"
          className="bg-green-500 shadow-md font-semibold text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-green-600 transition"
        >
          <FaPlus className="text-white w-4 h-4" />
          <span>Add Pharmacy</span>
        </Link>
      </div>

      {/* Enable Actions */}
      <Table
        columns={columns}
        data={tableData}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
    </div>
  );
}
