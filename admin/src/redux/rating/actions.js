import { createAsyncThunk } from "@reduxjs/toolkit";
import ratingService from "./services";
import { toast } from "react-toastify";

export const getRatings = createAsyncThunk(
  "rating/getRatings",
  async (thunkAPI) => {
    try {
      return await ratingService.getRatings();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getRating = createAsyncThunk(
  "rating/getRating",
  async (id, thunkAPI) => {
    try {
      return await ratingService.getRating(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteRating = createAsyncThunk(
  "rating/deleteRating",
  async (id, { dispatch }) => {
    try {
      await ratingService.deleteRating(id);
      dispatch(getRatings());
      toast.success("Delete Rating successfully");
    } catch (error) {
      toast.success("Delete Rating failed");
    }
  }
);

export const deleteSubRating = createAsyncThunk(
  "rating/deleteSubRating",
  async (data, { dispatch }) => {
    try {
      await ratingService.deleteSubRating(data);
      dispatch(getRatings());
      toast.success("Delete SubRating successfully");
    } catch (error) {
      toast.success("Delete SubRating failed");
    }
  }
);

export const replyRating = createAsyncThunk(
  "product/replyRating",
  async (data, { dispatch }) => {
    try {
      await ratingService.replyRating(data.body);
      dispatch(getRating(data.ratingId));
      toast.success("Reply successfully");
    } catch (error) {
      toast.error("Reply failed");
    }
  }
);
