"use client";

import Protected from "../utils/Protected";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function AdminLayout({ children }) {
  return (
    <Protected>
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Navbar />
          <main className="flex-1 bg-gray-100 p-6">{children}</main>
        </div>
      </div>
    </Protected>
  );
}
