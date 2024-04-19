import { createAsyncThunk } from "@reduxjs/toolkit";
import feedbackService from "./services";

export const getFeedbacks = createAsyncThunk(
  "feedback/getFeedbacks",
  async (thunkAPI) => {
    try {
      return await feedbackService.getFeedbacks();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteFeedback = createAsyncThunk(
  "feedback/deleteFeedback",
  async (id, thunkAPI) => {
    try {
      return await feedbackService.deleteFeedback(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getFeedback = createAsyncThunk(
  "feedback/getFeedback",
  async (id, thunkAPI) => {
    try {
      return await feedbackService.getFeedback(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateFeedback = createAsyncThunk(
  "feedback/updateFeedback",
  async (feedback, thunkAPI) => {
    try {
      return await feedbackService.updateFeedback(feedback);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
