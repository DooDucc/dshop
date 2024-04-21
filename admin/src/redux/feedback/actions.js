import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
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

export const updateFeedbackStatus = createAsyncThunk(
  "feedback/updateFeedbackStatus",
  async (feedback, thunkAPI) => {
    try {
      return await feedbackService.updateFeedbackStatus(feedback);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const replyFeedback = createAsyncThunk(
  "feedback/replyFeedback",
  async (feedback, { dispatch }) => {
    try {
      await feedbackService.replyFeedback(feedback.body);
      feedback.navigate("/feedbacks");
      dispatch(
        updateFeedbackStatus({ id: feedback.body.id, status: "Replied" })
      );
      toast.success("Reply successfully");
    } catch (error) {
      toast.error("Reply failed");
    }
  }
);
