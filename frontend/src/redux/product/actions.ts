import { createAsyncThunk } from "@reduxjs/toolkit"
import { toast } from "react-toastify"
import productService from "./services"

export const getProducts = createAsyncThunk(
  "product/getProducts",
  async (data, thunkAPI) => {
    try {
      return await productService.getProducts(data)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  },
)

export const getProduct = createAsyncThunk(
  "product/getProduct",
  async ({ id }: { id: string }, thunkAPI) => {
    try {
      return await productService.getProduct(id)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  },
)

export const addToFavProducts = createAsyncThunk(
  "product/addToFavProducts",
  async ({ id }: { id: string }, thunkAPI) => {
    try {
      const res = await productService.addToFavProducts(id)
      if (res?.favProducts?.some((product: string) => product === id)) {
        toast.success("Added to Favorite Products")
      } else {
        toast.success("Removed to Favorite Products")
      }
      return res
    } catch (error) {
      toast.success("Something wrong")
      return thunkAPI.rejectWithValue(error)
    }
  },
)

export const rating = createAsyncThunk(
  "product/rating",
  async (data: any, { dispatch }) => {
    try {
      const res = await productService.rating(data.body)
      toast.success("Submitted")
      dispatch(getProduct({ id: data.body.prodId }))
      dispatch(getRatings({ id: data.body.prodId }))
      return res
    } catch (error) {
      toast.error("Something wrong")
    }
  },
)

export const getRatings = createAsyncThunk(
  "product/getRatings",
  async ({ id }: { id: string }, thunkAPI) => {
    try {
      return await productService.getRatings(id)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  },
)

export const replyRating = createAsyncThunk(
  "product/replyRating",
  async (data: any, { dispatch }) => {
    try {
      await productService.replyRating(data.body)
      dispatch(getRatings({ id: data.prodId }))
    } catch (error) {
      toast.error("Something wrong")
    }
  },
)

export const getBrands = createAsyncThunk(
  "product/getBrands",
  async (_, thunkAPI) => {
    try {
      return await productService.getBrands()
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  },
)

export const getCategories = createAsyncThunk(
  "product/getCategories",
  async (_, thunkAPI) => {
    try {
      return await productService.getCategories()
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  },
)
