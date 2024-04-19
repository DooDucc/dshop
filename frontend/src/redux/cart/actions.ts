import { createAsyncThunk } from "@reduxjs/toolkit"
import { toast } from "react-toastify"
import cartService from "./services"

export const getCart = createAsyncThunk("cart/getCart", async (_, thunkAPI) => {
  try {
    return await cartService.getCart()
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (cartData, { dispatch }) => {
    try {
      // @ts-ignore
      const res = await cartService.addToCart(cartData.body)
      dispatch(getCart())
      toast.success("Added to Cart")
      // @ts-ignore
      cartData.navigate("/cart")
      return res
    } catch (error) {
      toast.error("Failed to Add to Cart")
    }
  },
)

export const updateProductQuantity = createAsyncThunk(
  "cart/updateProductQuantity",
  async (cartData, { dispatch }) => {
    try {
      const res = await cartService.updateProductQuantity(cartData)
      dispatch(getCart())
      toast.success("Updated")
      return res
    } catch (error) {
      toast.error("Failed to updated")
    }
  },
)

export const deleteProductInCart = createAsyncThunk(
  "cart/deleteProductInCart",
  async (cartData, { dispatch }) => {
    try {
      const res = await cartService.deleteProductInCart(cartData)
      dispatch(getCart())
      toast.success("Deleted")
      return res
    } catch (error) {
      toast.error("Failed to delete Product")
    }
  },
)

export const clearCart = createAsyncThunk(
  "cart/clearCart",
  async (_, { dispatch }) => {
    try {
      const res = await cartService.clearCart()
      dispatch(getCart())
      return res
    } catch (error) {}
  },
)
