"use server";

import axios from "axios";

export async function loginUser(formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    const res = await axios.post("http://localhost:8000/api/login", {
      email,
      password,
    });
    return {
      success: true,
      token: res.data.token ?? res.data.access_token ?? null,
      user: res.data.user ?? null,
    };
  } catch (error) {
    const message =
      error.response?.data?.message || "Login failed. Please try again.";
    return { success: false, message };
  }
}
