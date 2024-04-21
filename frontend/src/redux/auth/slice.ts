import { createSlice } from "@reduxjs/toolkit"
import { login, register, getFavProducts, updateProfile } from "./actions"
import { toast } from "react-toastify"

const getUserfromLocalStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user") || "")
  : null

const initialState = {
  user: getUserfromLocalStorage,
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
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
      .addCase(register.pending, state => {
        state.isLoading = true
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isError = false
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
        state.message = "success"
      })
      .addCase(register.rejected, (state, action) => {
        state.isError = true
        state.isSuccess = false
        state.isLoading = false
        // @ts-ignore
        toast.error(action.payload.response.data.message)
      })
      .addCase(updateProfile.pending, state => {
        state.isLoading = true
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isError = false
        state.isLoading = false
        state.isSuccess = true
        state.user = {
          ...state.user,
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
          phone: action.payload.phone,
        }
        state.message = "success"
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isError = true
        state.isSuccess = false
        state.message = action.error.message || ""
        state.isLoading = false
      })
      .addCase(getFavProducts.pending, state => {
        state.isLoading = true
      })
      .addCase(getFavProducts.fulfilled, (state, action) => {
        state.isError = false
        state.isLoading = false
        state.isSuccess = true
        state.favProducts = action.payload.favProducts
      })
      .addCase(getFavProducts.rejected, (state, action) => {
        state.isError = true
        state.isSuccess = false
        state.message = action.error.message || ""
        state.isLoading = false
      })
  },
})

export default authSlice.reducer
