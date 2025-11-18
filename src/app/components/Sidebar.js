"use client";

import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-800 text-white p-6 flex flex-col min-h-screen">
      <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
      <nav className="flex flex-col space-y-3">
        <Link href="/admin/dashboard" className="hover:underline">
          Dashboard
        </Link>
        <Link href="/admin/inventory" className="hover:underline">
          Inventory
        </Link>
      </nav>
    </aside>
  );
}
