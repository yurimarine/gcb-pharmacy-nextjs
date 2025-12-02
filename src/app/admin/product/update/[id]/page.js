"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchManufacturers } from "@/app/store/manufacturerSlice";
import { fetchCategories } from "@/app/store/categorySlice";
import { fetchGenerics } from "@/app/store/genericSlice";
import { fetchSuppliers } from "@/app/store/supplierSlice";
import { fetchProductById, updateProduct } from "@/app/store/productSlice";
import { useRouter, useParams } from "next/navigation";
import { ClipboardDocumentListIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import LoadingSpinner from "@/app/components/LoadingSpinner";

export default function UpdateProductPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = useParams();

  const {
    product,
    loading: loadingProduct,
    error: errorProduct,
  } = useSelector((state) => state.product);
  const {
    manufacturers,
    loading: loadingManufacturers,
    error: errorManufacturers,
  } = useSelector((state) => state.manufacturer);
  const {
    categories,
    loading: loadingCategories,
    error: errorCategories,
  } = useSelector((state) => state.category);
  const {
    generics,
    loading: loadingGenerics,
    error: errorGenerics,
  } = useSelector((state) => state.generic);
  const {
    suppliers,
    loading: loadingSuppliers,
    error: errorSuppliers,
  } = useSelector((state) => state.supplier);

  const [form, setForm] = useState({
    generic_id: "",
    supplier_id: "",
    manufacturer_id: "",
    category_id: "",
    product_name: "",
    dosage_form: "",
    packaging_type: "",
    volume_amount: "",
    volume_unit: "",
    unit_cost: "",
    barcode: "",
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
    dispatch(updateProduct({ ...form, id }))
      .unwrap()
      .then((res) => {
        console.log("Product updated:", res);
        router.push("/admin/product/list");
      })
      .catch((err) => console.error(err));
    setForm({
      generic_id: "",
      supplier_id: "",
      manufacturer_id: "",
      category_id: "",
      product_name: "",
      dosage_form: "",
      packaging_type: "",
      volume_amount: "",
      volume_unit: "",
      unit_cost: "",
      barcode: "",
      description: "",
    });
  };

  useEffect(() => {
    dispatch(fetchManufacturers());
    dispatch(fetchCategories());
    dispatch(fetchGenerics());
    dispatch(fetchSuppliers());
    if (id) dispatch(fetchProductById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (product) {
      setForm({
        generic_id: product.generic_id ?? "",
        supplier_id: product.supplier_id ?? "",
        manufacturer_id: product.manufacturer_id ?? "",
        category_id: product.category_id ?? "",
        product_name: product.product_name ?? "",
        dosage_form: product.dosage_form ?? "",
        packaging_type: product.packaging_type ?? "",
        volume_amount: product.volume_amount ?? "",
        volume_unit: product.volume_unit ?? "",
        unit_cost: product.unit_cost ?? "",
        barcode: product.barcode ?? "",
        description: product.description ?? "",
      });
    }
  }, [product]);

  if (
    loadingManufacturers ||
    loadingCategories ||
    loadingGenerics ||
    loadingSuppliers ||
    loadingProduct
  )
    return (
      <div className="relative min-h-screen w-full">
        <LoadingSpinner />
      </div>
    );

  if (
    errorManufacturers ||
    errorCategories ||
    errorGenerics ||
    errorSuppliers ||
    errorProduct
  )
    return (
      <p className="text-red-600">
        {errorManufacturers ||
          errorCategories ||
          errorGenerics ||
          errorSuppliers ||
          errorProduct}
      </p>
    );

  return (
    <div className="w-full text-gray-700 ">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold">Update Product</h1>

        <Link
          href="/admin/product/list"
          className="bg-green-500 shadow-md font-semibold text-white px-4 py-2 rounded flex items-center gap-2 hover:scale-105 hover:bg-green-600 transition"
        >
          <ClipboardDocumentListIcon className="text-white w-5 h-5" />
          <span>Product List</span>
        </Link>
      </div>

      <form
        onSubmit={onSubmit}
        className="bg-white p-6 text-sm rounded-lg shadow-md flex flex-col gap-12"
      >
        <div className="flex w-full h-full">
          {/* LEFT COLUMN */}
          <div className="flex flex-col items-end w-[40%] gap-4">
            {/* Generic */}
            <div className="flex items-center gap-4">
              <label className="block mb-1 w-32 text-right">Generic :</label>
              <select
                name="generic_id"
                value={form.generic_id}
                onChange={onChange}
                className="w-100 border border-gray-300 rounded px-3 py-2"
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
              <label className="block mb-1 w-32 text-right">Supplier :</label>
              <select
                name="supplier_id"
                value={form.supplier_id}
                onChange={onChange}
                className="w-100 border border-gray-300 rounded px-3 py-2"
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
              <label className="block mb-1 w-32 text-right">
                Manufacturer :
              </label>
              <select
                name="manufacturer_id"
                value={form.manufacturer_id}
                onChange={onChange}
                className="w-100 border border-gray-300 rounded px-3 py-2"
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
              <label className="block mb-1 w-32 text-right">Category :</label>
              <select
                name="category_id"
                value={form.category_id}
                onChange={onChange}
                className="w-100 border border-gray-300 rounded px-3 py-2"
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

            {/* Product Name */}
            <div className="flex items-center gap-4">
              <label className="block mb-1 w-32 text-right">Product Name :</label>
              <input
                type="text"
                name="product_name"
                value={form.product_name}
                onChange={onChange}
                className="w-100 border border-gray-300 rounded px-3 py-2 
             focus:border-green-600 focus:ring-0 outline-none"
                required
              />
            </div>

            {/* Dosage Form */}
            <div className="flex items-center gap-4">
              <label className="block mb-1 w-32 text-right">
                Dosage Form :
              </label>
              <input
                type="text"
                name="dosage_form"
                value={form.dosage_form}
                onChange={onChange}
                className="w-100 border border-gray-300 rounded focus:border-green-600 focus:ring-0 outline-none px-3 py-2"
              />
            </div>
            {/* Packaging Type */}
            <div className="flex items-center gap-4">
              <label className="block mb-1 w-32 text-right">Packaging :</label>
              <input
                type="text"
                name="packaging_type"
                value={form.packaging_type}
                onChange={onChange}
                className="w-100 border border-gray-300 rounded focus:border-green-600 focus:ring-0 outline-none px-3 py-2"
              />
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="flex flex-col items-end w-[50%] gap-4">
            {/* Volume Amount */}
            <div className="flex items-center gap-4">
              <label className="block mb-1 w-32 text-right">
                Volume Amount :
              </label>
              <input
                type="number"
                step="0.01"
                name="volume_amount"
                value={form.volume_amount}
                onChange={onChange}
                className="w-100 border border-gray-300 rounded focus:border-green-600 focus:ring-0 outline-none px-3 py-2"
              />
            </div>

            {/* Volume Unit */}
            <div className="flex items-center gap-4">
              <label className="block mb-1 w-32 text-right">
                Volume Unit :
              </label>

              <select
                name="volume_unit"
                value={form.volume_unit}
                onChange={onChange}
                className="w-100 border border-gray-300 rounded px-3 py-2 focus:border-blue-500 outline-none"
              >
                <option value="">Select Unit</option>
                <option value="ml">mL</option>
                <option value="l">L</option>
                <option value="ul">µL</option>
                <option value="cl">cL</option>
                <option value="dl">dL</option>
              </select>
            </div>

            {/* Unit Cost */}
            <div className="flex items-center gap-4">
              <label className="block mb-1 w-32 text-right">Unit Cost :</label>
              <input
                type="number"
                step="0.01"
                name="unit_cost"
                value={form.unit_cost}
                required
                onChange={onChange}
                className="w-100 border border-gray-300 focus:border-green-600 focus:ring-0 outline-none rounded px-3 py-2"
              />
            </div>

            {/* Barcode */}
            <div className="flex items-center gap-4">
              <label className="block mb-1 w-32 text-right">Barcode :</label>
              <input
                type="text"
                name="barcode"
                value={form.barcode}
                onChange={onChange}
                className="w-100 border border-gray-300 rounded px-3 py-2"
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
            href="/admin/product/list"
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
