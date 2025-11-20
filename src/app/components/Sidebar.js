"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  function handleLogout() {
    localStorage.removeItem("token");
    router.replace("/login");
  }

  function toggleMenu(name) {
    setOpenMenu((prev) => (prev === name ? "" : name));
  }

  const menuItems = [
    { name: "Dashboard", path: "/admin/dashboard" },

    {
      name: "Product",
      path: "/admin/product",
      children: [
        { name: "Add Product", path: "/admin/product/add" },
        { name: "Product List", path: "/admin/product/list" },
        { name: "Update Product", path: "/admin/product/update" },
      ],
    },

    {
      name: "Inventory",
      path: "/admin/inventory",
      children: [{ name: "Update Inventory", path: "/admin/inventory/update" }],
    },
  ];

  const [openMenu, setOpenMenu] = useState("");

  useEffect(() => {
    menuItems.forEach((item) => {
      if (item.children) {
        item.children.forEach((child) => {
          if (pathname.startsWith(child.path)) {
            setOpenMenu(item.name);
          }
        });
      }
    });
  }, [pathname]);

  return (
    <aside className="w-64 bg-white text-gray-700 font-bold p-6 border-r border-gray-300 flex flex-col min-h-screen">
      <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>

      <nav className="flex flex-col space-y-2">
        {menuItems.map((item) => (
          <div key={item.path}>
            <button
              onClick={() =>
                item.children ? toggleMenu(item.name) : router.push(item.path)
              }
              className={`w-full text-left p-3 rounded transition
                hover:bg-gray-200
                ${pathname === item.path ? "bg-gray-200 font-semibold" : ""}
              `}
            >
              {item.name}
            </button>
            {item.children && (
              <AnimatePresence>
                {openMenu === item.name && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="ml-4 mt-1 flex flex-col space-y-1 overflow-hidden"
                  >
                    {item.children.map((child) => (
                      <Link
                        key={child.path}
                        href={child.path}
                        className={`p-2 rounded transition text-sm
                          hover:bg-gray-200
                          ${
                            pathname === child.path
                              ? "bg-gray-200 font-semibold"
                              : ""
                          }
                        `}
                      >
                        {child.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </div>
        ))}
      </nav>

      <button
        onClick={handleLogout}
        className="mt-auto bg-amber-50 text-black py-2 px-4 rounded hover:bg-amber-600 transition duration-300"
      >
        Logout
      </button>
    </aside>
  );
}
