import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import userService from "./services";

export const getUsers = createAsyncThunk("user/getUsers", async (thunkAPI) => {
  try {
    return await userService.getUsers();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const getUser = createAsyncThunk(
  "user/getUser",
  async (id, thunkAPI) => {
    try {
      return await userService.getUser(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (data, thunkAPI) => {
    try {
      await userService.updateUser(data.body);
      toast.success("Update User successfully");
      data.navigate("/users");
    } catch (error) {
      toast.error("Update User failed");
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (id, thunkAPI) => {
    try {
      return await userService.deleteUser(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
