"use client";

import Link from "next/link";
import { useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeftStartOnRectangleIcon,
  ChevronLeftIcon,
} from "@heroicons/react/24/outline";

import { SidebarItems } from "./SidebarItems";

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();

  const [openMenu, setOpenMenu] = useState("");
  const [openSubMenu, setOpenSubMenu] = useState("");

  function handleLogout() {
    dispatch(logout());
    router.replace("/login");
  }

  function toggleMenu(name) {
    setOpenMenu((prev) => (prev === name ? "" : name));
  }

  function toggleSubMenu(name) {
    setOpenSubMenu((prev) => (prev === name ? "" : name));
  }

  useEffect(() => {
    SidebarItems.forEach((item) => {
      if (item.children) {
        item.children.forEach((child) => {
          if (pathname.startsWith(child.path)) {
            setOpenMenu(item.name);
            if (child.subChildren) {
              child.subChildren.forEach((sub) => {
                if (pathname.startsWith(sub.path)) {
                  setOpenSubMenu(child.name);
                }
              });
            }
          }
        });
      }
    });
  }, [pathname]);

  return (
    <aside className="w-64 bg-white text-gray-700 p-6 border-r border-gray-300 flex flex-col min-h-screen">
      <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>

      <nav className="flex flex-col font-semibold space-y-2">
        {SidebarItems.map((item) => (
          <div key={item.path}>
            {/* Main Menu Button */}
            <button
              onClick={() =>
                item.children ? toggleMenu(item.name) : router.push(item.path)
              }
              className={`w-full flex items-center justify-between p-3 rounded hover:bg-gray-200 transition
                ${pathname === item.path ? "bg-gray-200 font-semibold" : ""}
              `}
            >
              <div className="flex items-center gap-3">
                {item.icon}
                {item.name}
              </div>

              {item.children && (
                <motion.div
                  animate={{ rotate: openMenu === item.name ? -90 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronLeftIcon className="w-5 h-5" />
                </motion.div>
              )}
            </button>

            {/* Child Level */}
            {item.children && (
              <AnimatePresence>
                {openMenu === item.name && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="ml-7 mt-1 flex flex-col space-y-1 overflow-hidden"
                  >
                    {item.children.map((child) => (
                      <div key={child.path}>
                        <button
                          onClick={() =>
                            child.subChildren
                              ? toggleSubMenu(child.name)
                              : router.push(child.path)
                          }
                          className={`flex items-center gap-2 p-2 rounded text-sm w-full hover:bg-gray-200 transition
                            ${
                              pathname === child.path
                                ? "bg-gray-200 font-semibold"
                                : ""
                            }
                          `}
                        >
                          {child.icon}
                          {child.name}

                          {child.subChildren && (
                            <motion.div
                              animate={{
                                rotate: openSubMenu === child.name ? -90 : 0,
                              }}
                              transition={{ duration: 0.3 }}
                              className="ml-auto"
                            >
                              <ChevronLeftIcon className="w-4 h-4" />
                            </motion.div>
                          )}
                        </button>

                        {/* Sub-Child Level */}
                        {child.subChildren && (
                          <AnimatePresence>
                            {openSubMenu === child.name && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="ml-6 mt-1 flex flex-col space-y-1 overflow-hidden"
                              >
                                {child.subChildren.map((sub) => (
                                  <Link
                                    key={sub.path}
                                    href={sub.path}
                                    className={`p-2 text-sm rounded gap-2 hover:bg-gray-200 flex items-center
                                      ${
                                        pathname === sub.path
                                          ? "bg-gray-200 font-semibold"
                                          : ""
                                      }
                                    `}
                                  >
                                    {sub.icon && (
                                      <div className="w-4 h-4 flex items-center justify-center">
                                        {sub.icon}
                                      </div>
                                    )}
                                    {sub.name}
                                  </Link>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        )}
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </div>
        ))}
      </nav>

      {/* Logout */}
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
