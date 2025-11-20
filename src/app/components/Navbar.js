"use client";

import { BellIcon, UserCircleIcon } from "@heroicons/react/24/outline";

export default function Navbar() {
  return (
    <header className="flex items-center justify-start border-b border-gray-300 bg-white shadow px-4 py-2">
      {/* Right */}
      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <button className="relative p-1 rounded hover:bg-gray-100">
          <BellIcon className="w-6 h-6 text-gray-600" />
          <span className="absolute top-0 right-0 inline-flex items-center justify-center w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* User Icon */}
        <button className="p-1 rounded hover:bg-gray-100">
          <UserCircleIcon className="w-6 h-6 text-gray-600" />
        </button>
      </div>
    </header>
  );
}
