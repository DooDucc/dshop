import { createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./services";

export const login = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      return await authService.login(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const blockUser = createAsyncThunk(
  "auth/blockUser",
  async (id, thunkAPI) => {
    try {
      return await authService.blockUser(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const unblockUser = createAsyncThunk(
  "auth/unblockUser",
  async (id, thunkAPI) => {
    try {
      return await authService.unblockUser(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
