"use client";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/axios";

export const fetchInventoryByPharmacy = createAsyncThunk(
  "inventory/fetchInventoryByPharmacy",
  async (pharmacy_id, { rejectWithValue }) => {
    try {
      const response = await api.get(`admin/inventory/${pharmacy_id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch inventory"
      );
    }
  }
);

const inventorySlice = createSlice({
  name: "inventory",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInventoryByPharmacy.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInventoryByPharmacy.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.data ?? action.payload;
      })
      .addCase(fetchInventoryByPharmacy.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export default inventorySlice.reducer;
