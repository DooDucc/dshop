import { createAsyncThunk } from "@reduxjs/toolkit"
import { toast } from "react-toastify"
import authService from "./services"

export const login = createAsyncThunk("auth/login", async (userData: any) => {
  try {
    const res = await authService.login(userData.body)
    userData.navigate("/")
    toast.success("Login successully")
    return res
  } catch (error) {
    // @ts-ignore
    toast.error(error?.response?.data.message)
  }
})

export const register = createAsyncThunk(
  "auth/register",
  async (userData: any) => {
    try {
      const res = await authService.register(userData)
      userData.navigate("/")
      toast.success("Signup successully")
      return res
    } catch (error) {
      // @ts-ignore
      toast.error(error?.response?.data.message)
    }
  },
)

export const forgotPasswordToken = createAsyncThunk(
  "auth/forgotPasswordToken",
  async (email: string, thunkAPI) => {
    try {
      await authService.forgotPasswordToken(email)
      toast.success("Check your email to reset your password")
    } catch (error) {
      // @ts-ignore
      toast.error(error.response.data.message)
      return thunkAPI.rejectWithValue(error)
    }
  },
)

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (data, thunkAPI) => {
    try {
      // @ts-ignore
      await authService.resetPassword(data.body)
      toast.success("Reset password successfully")
      // @ts-ignore
      data.navigate("/login")
    } catch (error) {
      toast.error("Reset password failed")
      return thunkAPI.rejectWithValue(error)
    }
  },
)

export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async (userData, thunkAPI) => {
    try {
      // @ts-ignore
      const res = await authService.updateProfile(userData.body)
      toast.success("Update profile successfully")
      // @ts-ignore
      userData.navigate("/")
      return res
    } catch (error) {
      toast.success("Update profile failed")
      return thunkAPI.rejectWithValue(error)
    }
  },
)

export const getFavProducts = createAsyncThunk(
  "auth/getFavProducts",
  async (_, thunkAPI) => {
    try {
      return await authService.getFavProducts()
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  },
)
