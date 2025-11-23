"use client";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/axios";

export const fetchSuppliers = createAsyncThunk(
  "supplier/fetchSuppliers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("admin/supplier/all");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch suppliers"
      );
    }
  }
);

export const addSupplier = createAsyncThunk(
  "supplier/addSupplier",
  async (supplierData, { rejectWithValue }) => {
    try {
      const response = await api.post("admin/supplier/add", supplierData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add supplier"
      );
    }
  }
);

export const deleteSupplier = createAsyncThunk(
  "supplier/deleteSupplier",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/admin/supplier/delete/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Something went wrong"
      );
    }
  }
);

const supplierSlice = createSlice({
  name: "supplier",
  initialState: {
    suppliers: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSuppliers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSuppliers.fulfilled, (state, action) => {
        state.loading = false;
        state.suppliers = action.payload.data ?? action.payload;
      })
      .addCase(fetchSuppliers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });

    builder
      .addCase(addSupplier.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addSupplier.fulfilled, (state, action) => {
        state.loading = false;
        state.suppliers.push(action.payload.data ?? action.payload);
      })
      .addCase(addSupplier.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to add supplier";
      });
    builder
      .addCase(deleteSupplier.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteSupplier.fulfilled, (state, action) => {
        state.loading = false;
        state.suppliers = state.suppliers.filter((p) => p.id !== action.payload);
      })
      .addCase(deleteSupplier.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default supplierSlice.reducer;
