"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { addSupplier } from "@/app/store/supplierSlice";
import { useRouter } from "next/navigation";
import { ClipboardDocumentListIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function AddSupplierPage() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    contact_person: "",
    email: "",
    phone: "",
    address: "",
  });

  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(addSupplier(form))
      .unwrap()
      .then((res) => {
        console.log("Supplier added:", res);
        router.push("/admin/supplier/list");
      })
      .catch((err) => console.error(err));
    setForm({
      name: "",
      contact_person: "",
      email: "",
      phone: "",
      address: "",
    });
  };

  return (
    <div className="w-full text-gray-700 ">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold">Add Supplier</h1>

        <Link
          href="/admin/supplier/list"
          className="bg-green-500 shadow-md font-semibold text-white px-4 py-2 rounded flex items-center gap-2 hover:scale-105 hover:bg-green-600 transition"
        >
          <ClipboardDocumentListIcon className="text-white w-5 h-5" />
          <span>Supplier List</span>
        </Link>
      </div>

      <form
        onSubmit={onSubmit}
        className="bg-white p-6 text-sm rounded-lg shadow-md flex flex-col gap-12"
      >
        <div className="flex w-full h-full">
          {/* LEFT COLUMN */}
          <div className="flex flex-col items-end w-[40%] gap-4">
            {/* Supplier Name */}
            <div className="flex items-center gap-4">
              <label className="block mb-1 w-32 text-right">
                Supplier Name :
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={onChange}
                className="w-100 border focus:border-green-600 focus:ring-0 outline-none border-gray-300 rounded px-3 py-2"
              />
            </div>
            {/* Contact Person */}
            <div className="flex items-center gap-4">
              <label className="block mb-1 w-32 text-right">
                Contact Person :
              </label>
              <input
                type="text"
                name="contact_person"
                value={form.contact_person}
                onChange={onChange}
                className="w-100 border focus:border-green-600 focus:ring-0 outline-none border-gray-300 rounded px-3 py-2"
              />
            </div>
            {/* Email */}
            <div className="flex items-center gap-4">
              <label className="block mb-1 w-32 text-right">Email :</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={onChange}
                className="w-100 border focus:border-green-600 focus:ring-0 outline-none border-gray-300 rounded px-3 py-2"
              />
            </div>
            {/* Phone Number */}
            <div className="flex items-center gap-4">
              <label className="block mb-1 w-32 text-right">
                Phone Number :
              </label>

              <input
                type="text"
                name="phone"
                value={form.phone}
                onChange={onChange}
                placeholder="09123456789"
                className="w-100 border focus:border-green-600 focus:ring-0 outline-none border-gray-300 rounded px-3 py-2"
              />
            </div>
            {/* Address */}
            <div className="flex items-center gap-4">
              <label className="block mb-1 w-32 text-right">Address :</label>
              <input
                type="text"
                name="address"
                value={form.address}
                onChange={onChange}
                className="w-100 border focus:border-green-600 focus:ring-0 outline-none border-gray-300 rounded px-3 py-2"
              />
            </div>
          </div>
        </div>
        {/* Submit Button */}
        <div className="flex justify-end gap-5">
          <Link
            href="/admin/supplier/list"
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
