"use client";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/axios";

export const fetchPharmacies = createAsyncThunk(
  "pharmacy/fetchPharmacies",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("admin/pharmacy/all");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch pharmacies"
      );
    }
  }
);

const pharmacySlice = createSlice({
  name: "pharmacy",
  initialState: {
    pharmacies: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPharmacies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPharmacies.fulfilled, (state, action) => {
        state.loading = false;
        state.pharmacies = action.payload.data ?? action.payload;
      })
      .addCase(fetchPharmacies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export default pharmacySlice.reducer;
