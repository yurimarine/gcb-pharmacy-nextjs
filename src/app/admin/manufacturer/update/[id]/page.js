"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchManufacturerById,
  updateManufacturer,
} from "@/app/store/manufacturerSlice";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { ClipboardDocumentListIcon } from "@heroicons/react/24/outline";
import LoadingSpinner from "@/app/components/LoadingSpinner";

export default function UpdateManufacturerPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = useParams();
  const { manufacturer, loading, error } = useSelector(
    (state) => state.manufacturer
  );

  const [form, setForm] = useState({
    name: "",
    description: "",
  });

  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(updateManufacturer({ ...form, id }))
      .unwrap()
      .then((res) => {
        console.log("Manufacturer updated:", res);
        router.push("/admin/manufacturer/list");
      })
      .catch((err) => console.error(err));
    setForm({
      name: "",
      description: "",
    });
  };

  useEffect(() => {
    dispatch(fetchManufacturerById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (manufacturer) {
      setForm({
        name: manufacturer.name,
        description: manufacturer.description,
      });
    }
  }, [manufacturer]);

  if (loading)
    return (
      <div className="relative min-h-screen w-full">
        <LoadingSpinner />
      </div>
    );

  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="w-full text-gray-700 ">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold">Update Manufacturer</h1>

        <Link
          href="/admin/manufacturer/list"
          className="bg-green-500 shadow-md font-semibold text-white px-4 py-2 rounded flex items-center gap-2 hover:scale-105 hover:bg-green-600 transition"
        >
          <ClipboardDocumentListIcon className="text-white w-5 h-5" />
          <span>Manufacturer List</span>
        </Link>
      </div>

      <form
        onSubmit={onSubmit}
        className="bg-white p-6 text-sm rounded-lg shadow-md flex flex-col gap-12"
      >
        <div className="flex w-full h-full">
          {/* LEFT COLUMN */}
          <div className="flex flex-col items-end w-[40%] gap-4">
            {/* Manufacturer Name */}
            <div className="flex items-center gap-4">
              <label className="block mb-1 w-32 text-right">
                Manufacturer Name :
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={onChange}
                className="w-100 border focus:border-green-600 focus:ring-0 outline-none border-gray-300 rounded px-3 py-2"
              />
            </div>
            {/* Description */}
            <div className="flex items-start gap-4">
              <label className="block mb-1 w-32 text-right mt-1">
                Description :
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={onChange}
                className="w-100 border border-gray-300 focus:border-green-600 focus:ring-0 outline-none rounded px-3 py-2 h-24"
              ></textarea>
            </div>
          </div>
        </div>
        {/* Submit Button */}
        <div className="flex justify-end gap-5">
          <Link
            href="/admin/manufacturer/list"
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
