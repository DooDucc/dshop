import { createSlice, createAction } from "@reduxjs/toolkit"
import { getOrders } from "./actions"

export const resetState = createAction("Reset_all")

const initialState = {
  orders: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
}

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getOrders.pending, state => {
        state.isLoading = true
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.isSuccess = true
        state.orders = action.payload
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        state.message = action.error.message || ""
      })
      .addCase(resetState, () => initialState)
  },
})
export default orderSlice.reducer
