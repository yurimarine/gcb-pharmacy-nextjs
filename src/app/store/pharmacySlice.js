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

export const fetchPharmacyById = createAsyncThunk(
  "pharmacy/fetchPharmacyById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/admin/pharmacy/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch pharmacy"
      );
    }
  }
);

export const addPharmacy = createAsyncThunk(
  "pharmacy/addPharmacy",
  async (pharmacyData, { rejectWithValue }) => {
    try {
      const response = await api.post("admin/pharmacy/add", pharmacyData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add pharmacy"
      );
    }
  }
);

export const updatePharmacy = createAsyncThunk(
  "pharmacy/updatePharmacy",
  async (pharmacyData, { rejectWithValue }) => {
    try {
      const response = await api.put(
        `admin/pharmacy/update/${pharmacyData.id}`,
        pharmacyData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update pharmacy"
      );
    }
  }
);

export const deletePharmacy = createAsyncThunk(
  "pharmacy/deletePharmacy",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/admin/pharmacy/delete/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Something went wrong"
      );
    }
  }
);

const pharmacySlice = createSlice({
  name: "pharmacy",
  initialState: {
    pharmacies: [],
    pharmacy: {},
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
    builder
      .addCase(addPharmacy.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addPharmacy.fulfilled, (state, action) => {
        state.loading = false;
        state.pharmacies.push(action.payload.data ?? action.payload);
      })
      .addCase(addPharmacy.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to add pharmacy";
      });
    builder
      .addCase(updatePharmacy.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePharmacy.fulfilled, (state, action) => {
        state.loading = false;
        const updatedPharmacy = action.payload.data ?? action.payload;
        const index = state.pharmacies.findIndex(
          (p) => p.id === updatedPharmacy.id
        );
        if (index !== -1) state.pharmacies[index] = updatedPharmacy;
      })
      .addCase(updatePharmacy.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder
      .addCase(deletePharmacy.pending, (state) => {
        state.loading = true;
      })
      .addCase(deletePharmacy.fulfilled, (state, action) => {
        state.loading = false;
        state.pharmacies = state.pharmacies.filter(
          (p) => p.id !== action.payload
        );
      })
      .addCase(deletePharmacy.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder
      .addCase(fetchPharmacyById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPharmacyById.fulfilled, (state, action) => {
        state.loading = false;
        state.pharmacy = action.payload.data ?? action.payload;
      })
      .addCase(fetchPharmacyById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default pharmacySlice.reducer;
