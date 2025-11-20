"use client";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/axios";

export const fetchGenerics = createAsyncThunk(
  "generic/fetchGenerics",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("admin/generic/all");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch generics"
      );
    }
  }
);

const genericSlice = createSlice({
  name: "generic",
  initialState: {
    generics: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGenerics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGenerics.fulfilled, (state, action) => {
        state.loading = false;
        state.generics = action.payload.data ?? action.payload;
      })
      .addCase(fetchGenerics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export default genericSlice.reducer;
