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

      .addCase(getOrders.fulfilled, (state, action) => {
        state.orders = action.payload
      })
      .addCase(resetState, () => initialState)
  },
})
export default orderSlice.reducer
