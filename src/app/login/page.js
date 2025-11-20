"use client";

import { useDispatch, useSelector } from "react-redux";
import { loginThunk, clearError } from "../store/authSlice";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LoginPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { token, loading, error } = useSelector((s) => s.auth);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (token) {
      router.replace("/admin/dashboard");
    }
  }, [token, router]);

  useEffect(() => {
    if (error)
      setMessage(typeof error === "string" ? error : JSON.stringify(error));
  }, [error]);

  function onInput() {
    if (message) {
      setMessage("");
      dispatch(clearError());
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    const res = await dispatch(loginThunk({ email, password }));
    if (res.meta.requestStatus === "fulfilled") {
      setMessage("Login successful!");
      // redirect handled by token effect
    } else {
      // message set by error effect
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-6 text-center">Login</h1>

        <form onSubmit={handleSubmit} className="space-y-4" onInput={onInput}>
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              name="email"
              type="email"
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Password</label>
            <input
              name="password"
              type="password"
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-black text-white rounded-md"
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </form>

        {message && <p className="mt-4 text-center text-red-600">{message}</p>}
      </div>
    </div>
  );
}
