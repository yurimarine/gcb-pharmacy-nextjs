"use client";

import Link from "next/link";
import { useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import {
  HomeIcon,
  CubeIcon,
  ClipboardDocumentListIcon,
  PlusCircleIcon,
  ListBulletIcon,
  PencilSquareIcon,
  ArchiveBoxIcon,
  ChevronLeftIcon,
  ArrowLeftStartOnRectangleIcon,
} from "@heroicons/react/24/outline";

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logout()); 
    router.replace("/login"); 
  }

  function toggleMenu(name) {
    setOpenMenu((prev) => (prev === name ? "" : name));
  }

  const menuItems = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: <HomeIcon className="w-5 h-5" />,
    },

    {
      name: "Product",
      path: "/admin/product",
      icon: <CubeIcon className="w-5 h-5" />,
      children: [
        {
          name: "Product List",
          path: "/admin/product/list",
          icon: <ListBulletIcon className="w-4 h-4" />,
        },
        {
          name: "Add Product",
          path: "/admin/product/add",
          icon: <PlusCircleIcon className="w-4 h-4" />,
        },
        {
          name: "Update Product",
          path: "/admin/product/update",
          icon: <PencilSquareIcon className="w-4 h-4" />,
        },
      ],
    },

    {
      name: "Inventory",
      path: "/admin/inventory",
      icon: <ClipboardDocumentListIcon className="w-5 h-5" />,
      children: [
        {
          name: "Update Inventory",
          path: "/admin/inventory/update",
          icon: <ArchiveBoxIcon className="w-4 h-4" />,
        },
      ],
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
              className={`w-full flex items-center justify-between p-3 rounded transition
                hover:bg-gray-200
                ${pathname === item.path ? "bg-gray-200 font-semibold" : ""}
              `}
            >
              <div className="flex items-center gap-3">
                {item.icon}
                {item.name}
              </div>

              {/* Chevron for dropdown items */}
              {item.children && (
                <motion.div
                  animate={{ rotate: openMenu === item.name ? -90 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronLeftIcon className="w-5 h-5" />
                </motion.div>
              )}
            </button>

            {/* Children dropdown */}
            {item.children && (
              <AnimatePresence>
                {openMenu === item.name && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="ml-7 mt-1  flex flex-col space-y-1 overflow-hidden"
                  >
                    {item.children.map((child) => (
                      <Link
                        key={child.path}
                        href={child.path}
                        className={`flex items-center  gap-2 p-2 rounded transition text-sm
                          hover:bg-gray-200
                          ${
                            pathname === child.path
                              ? "bg-gray-200 font-semibold"
                              : ""
                          }
                        `}
                      >
                        {child.icon}
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
        className="mt-auto flex items-center gap-2 py-2 px-4 rounded hover:bg-gray-300 transition"
      >
        <ArrowLeftStartOnRectangleIcon className="w-5 h-5" />
        Logout
      </button>
    </aside>
  );
}
