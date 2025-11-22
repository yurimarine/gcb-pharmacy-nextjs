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

export const addGeneric = createAsyncThunk(
  "generic/addGeneric",
  async (genericData, { rejectWithValue }) => {
    try {
      const response = await api.post("admin/generic/add", genericData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add generic"
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

    builder
      .addCase(addGeneric.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addGeneric.fulfilled, (state, action) => {
        state.loading = false;
        state.generics.push(action.payload.data ?? action.payload);
      })
      .addCase(addGeneric.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to add generic";
      });
  },
});

export default genericSlice.reducer;
