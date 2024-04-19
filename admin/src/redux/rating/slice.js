import { createSlice, createAction } from "@reduxjs/toolkit";
import { getRatings, getRating } from "./actions";

export const resetState = createAction("Reset_all");

const initialState = {
  ratings: [],
  currentRating: null,
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};
export const ratingSlice = createSlice({
  name: "rating",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRatings.fulfilled, (state, action) => {
        state.ratings = action.payload;
      })
      .addCase(getRating.fulfilled, (state, action) => {
        state.currentRating = action.payload;
      })
      .addCase(resetState, () => initialState);
  },
});

export default ratingSlice.reducer;
