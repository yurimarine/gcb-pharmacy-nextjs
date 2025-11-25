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

export const fetchInventoryById = createAsyncThunk(
  "inventory/fetchInventoryById",
  async ({ pharmacy_id, product_id }, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `admin/inventory/${pharmacy_id}/${product_id}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch inventory"
      );
    }
  }
);

export const updateInventory = createAsyncThunk(
  "inventory/updateInventory",
  async ({ pharmacy_id, product_id, form }, { rejectWithValue }) => {
    try {
      const response = await api.put(
        `admin/inventory/update/${pharmacy_id}/${product_id}`,
        form
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update inventory"
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
    builder
      .addCase(fetchInventoryById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInventoryById.fulfilled, (state, action) => {
        state.loading = false;
        state.item = action.payload.data ?? action.payload;
      })
      .addCase(fetchInventoryById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
    builder
      .addCase(updateInventory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateInventory.fulfilled, (state, action) => {
        state.loading = false;
        const updatedGeneric = action.payload.data ?? action.payload;
        const index = state.items.findIndex((p) => p.id === updatedGeneric.id);
        if (index !== -1) state.items[index] = updatedGeneric;
      })
      .addCase(updateInventory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default inventorySlice.reducer;
