"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchManufacturers } from "@/app/store/manufacturerSlice";
import { fetchCategories } from "@/app/store/categorySlice";
import { fetchGenerics } from "@/app/store/genericSlice";
import { fetchSuppliers } from "@/app/store/supplierSlice";

export default function AddProductPage() {
  const dispatch = useDispatch();

  const { manufacturers, loading: loadingManufacturers } = useSelector(
    (state) => state.manufacturer
  );
  const { categories, loading: loadingCategories } = useSelector(
    (state) => state.category
  );
  const { generics, loading: loadingGenerics } = useSelector(
    (state) => state.generic
  );
  const { suppliers, loading: loadingSuppliers } = useSelector(
    (state) => state.supplier
  );

  useEffect(() => {
    dispatch(fetchManufacturers());
    dispatch(fetchCategories());
    dispatch(fetchGenerics());
    dispatch(fetchSuppliers());
  }, [dispatch]);

  const [form, setForm] = useState({
    generic_id: "",
    supplier_id: "",
    manufacturer_id: "",
    category_id: "",
    brand_name: "",
    dosage_form: "",
    dosage_amount: "",
    dosage_unit: "",
    packaging_type: "",
    volume_amount: "",
    volume_unit: "",
    unit_cost: "",
    barcode: "",
    description: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting:", form);

    alert("Product submitted!");
  };

  return (
    <div className="w-full text-gray-700 ">
      <h1 className="text-3xl font-bold mb-6">Add Product</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 text-sm rounded-lg shadow-md flex"
      >
        <div className="flex flex-col items-end w-[40%] gap-4">
          <div className="flex items-center gap-4">
            <label className="block mb-1">Generic :</label>
            <select
              name="generic_id"
              value={form.generic_id}
              onChange={handleChange}
              className="w-50 border border-gray-300  rounded px-3 py-2"
            >
              <option value="">Select Generic</option>
              {loadingGenerics ? (
                <option>Loading...</option>
              ) : (
                generics.map((g) => (
                  <option key={g.id} value={g.id}>
                    {g.name}
                  </option>
                ))
              )}
            </select>
          </div>

          {/* Supplier */}
          <div className="flex items-center gap-4">
            <label className="block text-sm font-medium mb-1">
              Supplier :{" "}
            </label>
            <select
              name="supplier_id"
              value={form.supplier_id}
              onChange={handleChange}
              className="w-50 border border-gray-300 rounded px-3 py-2"
            >
              <option value="">Select Supplier</option>
              {loadingSuppliers ? (
                <option>Loading...</option>
              ) : (
                suppliers?.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))
              )}
            </select>
          </div>

          {/* Manufacturer */}
          <div className="flex items-center gap-4">
            <label className="block text-sm font-medium mb-1">
              Manufacturer :
            </label>
            <select
              name="manufacturer_id"
              value={form.manufacturer_id}
              onChange={handleChange}
              className="w-50 border border-gray-300 rounded px-3 py-2"
            >
              <option value="">Select Manufacturer</option>
              {loadingManufacturers ? (
                <option>Loading...</option>
              ) : (
                manufacturers?.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name}
                  </option>
                ))
              )}
            </select>
          </div>

          {/* Category */}
          <div className="flex items-center gap-4">
            <label className="block text-sm font-medium mb-1">Category :</label>
            <select
              name="category_id"
              value={form.category_id}
              onChange={handleChange}
              className="w-50 border border-gray-300 rounded px-3 py-2"
            >
              <option value="">Select Category</option>
              {loadingCategories ? (
                <option>Loading...</option>
              ) : (
                categories?.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))
              )}
            </select>
          </div>
        </div>
        <div className="flex flex-col  items-end w-[50%]">flex-col</div>
      </form>
    </div>
  );
}
