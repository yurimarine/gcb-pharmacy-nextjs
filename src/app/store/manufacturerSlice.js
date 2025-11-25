"use client";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/axios";

export const fetchManufacturers = createAsyncThunk(
  "manufacturer/fetchManufacturers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("admin/manufacturer/all");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch manufacturers"
      );
    }
  }
);

export const addManufacturer = createAsyncThunk(
  "manufacturer/addManufacturer",
  async (manufacturerData, { rejectWithValue }) => {
    try {
      const response = await api.post(
        "admin/manufacturer/add",
        manufacturerData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add manufacturer"
      );
    }
  }
);

export const deleteManufacturer = createAsyncThunk(
  "manufacturer/deleteManufacturer",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/admin/manufacturer/delete/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Something went wrong"
      );
    }
  }
);

export const updateManufacturer = createAsyncThunk(
  "manufacturer/updateManufacturer",
  async (manufacturerData, { rejectWithValue }) => {
    try {
      const response = await api.put(
        `admin/manufacturer/update/${manufacturerData.id}`,
        manufacturerData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update Manufacturer"
      );
    }
  }
);

export const fetchManufacturerById = createAsyncThunk(
  "manufacturer/fetchManufacturerById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/admin/manufacturer/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch Manufacturer"
      );
    }
  }
);

const manufacturerSlice = createSlice({
  name: "manufacturer",
  initialState: {
    manufacturers: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchManufacturers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchManufacturers.fulfilled, (state, action) => {
        state.loading = false;
        state.manufacturers = action.payload.data ?? action.payload;
      })
      .addCase(fetchManufacturers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });

    builder
      .addCase(addManufacturer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addManufacturer.fulfilled, (state, action) => {
        state.loading = false;
        state.manufacturers.push(action.payload.data ?? action.payload);
      })
      .addCase(addManufacturer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to add manufacturer";
      });

    builder
      .addCase(deleteManufacturer.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteManufacturer.fulfilled, (state, action) => {
        state.loading = false;
        state.manufacturers = state.manufacturers.filter(
          (p) => p.id !== action.payload
        );
      })
      .addCase(deleteManufacturer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder
      .addCase(updateManufacturer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateManufacturer.fulfilled, (state, action) => {
        state.loading = false;
        const updatedManufacturer = action.payload.data ?? action.payload;
        const index = state.manufacturers.findIndex(
          (p) => p.id === updatedManufacturer.id
        );
        if (index !== -1) state.manufacturers[index] = updatedManufacturer;
      })
      .addCase(updateManufacturer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder
      .addCase(fetchManufacturerById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchManufacturerById.fulfilled, (state, action) => {
        state.loading = false;
        state.manufacturer = action.payload.data ?? action.payload;
      })
      .addCase(fetchManufacturerById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default manufacturerSlice.reducer;
