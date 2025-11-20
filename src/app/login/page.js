"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "./actions";

export default function LoginPage() {
  const [message, setMessage] = useState("");
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.replace("admin/dashboard");
    }
  }, [router]);

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const result = await loginUser(formData);

    if (result.success) {
      setMessage("Login successful!");
      if (result.token) localStorage.setItem("token", result.token);
      router.replace("admin/dashboard");
    } else {
      setMessage(result.message);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-6 text-center">Login</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              name="email"
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Password</label>
            <input
              type="password"
              name="password"
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-black text-white rounded-md hover:bg-gray-800"
          >
            Login
          </button>
        </form>

        {message && <p className="mt-4 text-center text-red-600">{message}</p>}
      </div>
    </div>
  );
}
