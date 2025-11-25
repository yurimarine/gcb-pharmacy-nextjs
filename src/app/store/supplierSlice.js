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

export const updateSupplier = createAsyncThunk(
  "supplier/updateSupplier",
  async (supplierData, { rejectWithValue }) => {
    try {
      const response = await api.put(
        `admin/supplier/update/${supplierData.id}`,
        supplierData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update Supplier"
      );
    }
  }
);

export const fetchSupplierById = createAsyncThunk(
  "supplier/fetchSupplierById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/admin/supplier/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch Supplier"
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
        state.suppliers = state.suppliers.filter(
          (p) => p.id !== action.payload
        );
      })
      .addCase(deleteSupplier.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder
      .addCase(updateSupplier.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSupplier.fulfilled, (state, action) => {
        state.loading = false;
        const updatedSupplier = action.payload.data ?? action.payload;
        const index = state.suppliers.findIndex(
          (p) => p.id === updatedSupplier.id
        );
        if (index !== -1) state.suppliers[index] = updatedSupplier;
      })
      .addCase(updateSupplier.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder
      .addCase(fetchSupplierById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSupplierById.fulfilled, (state, action) => {
        state.loading = false;
        state.supplier = action.payload.data ?? action.payload;
      })
      .addCase(fetchSupplierById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default supplierSlice.reducer;
