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
  },
});

export default manufacturerSlice.reducer;
