import { createSlice } from "@reduxjs/toolkit"
import { login, register, getFavProducts, updateProfile } from "./actions"

const getUserfromLocalStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user") || "")
  : null

const initialState = {
  user: getUserfromLocalStorage,
  favProducts: [],
}

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.user = {
          ...state.user,
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
          phone: action.payload.phone,
        }
      })
      .addCase(getFavProducts.fulfilled, (state, action) => {
        state.favProducts = action.payload.favProducts
      })
  },
})

export default authSlice.reducer
