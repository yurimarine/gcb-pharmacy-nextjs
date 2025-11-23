"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { addGeneric } from "@/app/store/genericSlice";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ListBulletIcon } from "@heroicons/react/24/outline";

export default function AddGenericPage() {
  const dispatch = useDispatch();
  const router = useRouter();

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
    dispatch(addGeneric(form))
      .unwrap()
      .then((res) => {
        console.log("Generic added:", res);
        router.push("/admin/generic/list"); 
      })
      .catch((err) => console.error(err));
    setForm({
      name: "",
      description: "",
    });
  };

  return (
    <div className="w-full text-gray-700 ">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold">Add Generic</h1>

        <Link
          href="/admin/generic/list"
          className="bg-green-500 shadow-md font-semibold text-white px-4 py-2 rounded flex items-center gap-2 hover:scale-105 hover:bg-green-600 transition"
        >
          <ListBulletIcon className="text-white w-5 h-5" />
          <span>Generic List</span>
        </Link>
      </div>

      <form
        onSubmit={onSubmit}
        className="bg-white p-6 text-sm rounded-lg shadow-md flex flex-col gap-12"
      >
        <div className="flex w-full h-full">
          {/* LEFT COLUMN */}
          <div className="flex flex-col items-end w-[40%] gap-4">
            {/* Generic Name */}
            <div className="flex items-center gap-4">
              <label className="block mb-1 w-32 text-right">
                Generic Name :
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
            href="/admin/generic/list"
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
