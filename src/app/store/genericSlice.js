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

export const deleteGeneric = createAsyncThunk(
  "generic/deleteGeneric",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/admin/generic/delete/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Something went wrong"
      );
    }
  }
);

export const updateGeneric = createAsyncThunk(
  "generic/updateGeneric",
  async (genericData, { rejectWithValue }) => {
    try {
      const response = await api.put(
        `admin/generic/update/${genericData.id}`,
        genericData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update generic"
      );
    }
  }
);

export const fetchGenericById = createAsyncThunk(
  "generic/fetchGenericById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/admin/generic/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch generic"
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
    builder
      .addCase(deleteGeneric.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteGeneric.fulfilled, (state, action) => {
        state.loading = false;
        state.generics = state.generics.filter((p) => p.id !== action.payload);
      })
      .addCase(deleteGeneric.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder
      .addCase(updateGeneric.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateGeneric.fulfilled, (state, action) => {
        state.loading = false;
        const updatedGeneric = action.payload.data ?? action.payload;
        const index = state.generics.findIndex(
          (p) => p.id === updatedGeneric.id
        );
        if (index !== -1) state.generics[index] = updatedGeneric;
      })
      .addCase(updateGeneric.rejected, (state, action ) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder
      .addCase(fetchGenericById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGenericById.fulfilled, (state, action) => {
        state.loading = false;
        state.generic = action.payload.data ?? action.payload;
      })
      .addCase(fetchGenericById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default genericSlice.reducer;
