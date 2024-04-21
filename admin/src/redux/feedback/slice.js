import { createSlice, createAction } from "@reduxjs/toolkit";
import { getFeedback, getFeedbacks } from "./actions";

export const resetState = createAction("Reset_all");

const initialState = {
  feedbacks: [],
};
export const feedbackSlice = createSlice({
  name: "feedback",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeedbacks.fulfilled, (state, action) => {
        state.feedbacks = action.payload;
      })
      .addCase(getFeedback.fulfilled, (state, action) => {
        state.currentFeedback = action.payload;
      })
      .addCase(resetState, () => initialState);
  },
});

export default feedbackSlice.reducer;
