"use client";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { BellIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { fetchAllLowStock, fetchAllExpired } from "@/app/store/inventorySlice";
import Link from "next/link";

export default function Navbar() {
  const dispatch = useDispatch();
  const lowStockItems = useSelector((s) => s.inventory.lowStockItems);
  const expiredItems = useSelector((s) => s.inventory.expiredItems);

  useEffect(() => {
    dispatch(fetchAllLowStock());
    dispatch(fetchAllExpired());
  }, [dispatch]);

  return (
    <header className="flex items-center justify-start border-b border-gray-300 bg-white shadow px-4 py-2">
      {/* Right */}
      <div className="flex items-center space-x-2">
        {/* Notifications */}
        <Link
          href="/admin/notification/expired"
          className="relative p-3 rounded border border-gray-300 hover:bg-gray-100"
        >
          <BellIcon className="w-6 h-6 text-gray-600" />
          <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 bg-red-500 rounded-full border-white text-white text-xs font-bold">
            {expiredItems.length}
          </span>
        </Link>

        {/* User Icon */}
        <Link
          href="/admin/notification/low-stock"
          className="relative p-3 rounded border border-gray-300 hover:bg-gray-100"
        >
          <ExclamationTriangleIcon className="w-6 h-6 text-gray-600" />
          <span className="absolute  top-0 right-0 inline-flex items-center justify-center w-5 h-5 bg-red-500 text-white rounded-full text-red text-xs font-bold">
            {lowStockItems.length}
          </span>
        </Link>
      </div>
    </header>
  );
}
