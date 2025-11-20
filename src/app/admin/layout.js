"use client";

import useAuth from "../hooks/useAuth";
import Sidebar from "../components/Sidebar";

export default function AdminLayout({ children }) {
  const loading = useAuth();

  if (loading) return <p>Checking authentication...</p>;

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 bg-gray-100 p-6">{children}</main>
    </div>
  );
}
