"use client";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/axios";

export const fetchBatches = createAsyncThunk(
  "batch/fetchBatches",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("admin/batch/all");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch batches"
      );
    }
  }
);

export const fetchBatchById = createAsyncThunk(
  "batch/fetchBatchById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`admin/batch/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch batch"
      );
    }
  }
);

export const addBatchProducts = createAsyncThunk(
  "batch/addBatchProducts",
  async (batchData, { rejectWithValue }) => {
    try {
      const response = await api.post("admin/batch/add", batchData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add batch"
      );
    }
  }
);

const batchSlice = createSlice({
  name: "batch",
  initialState: {
    batches: [],
    batchItems: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBatches.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBatches.fulfilled, (state, action) => {
        state.loading = false;
        state.batches = action.payload.data ?? action.payload;
      })
      .addCase(fetchBatches.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
    builder
      .addCase(fetchBatchById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBatchById.fulfilled, (state, action) => {
        state.loading = false;
        state.batchItems = action.payload.data ?? action.payload;
      })
      .addCase(fetchBatchById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
    builder
      .addCase(addBatchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addBatchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.batches.push(action.payload.data ?? action.payload);
      })
      .addCase(addBatchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to add Batch";
      });
  },
});

export default batchSlice.reducer;
