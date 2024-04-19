import { createSlice, createAction } from "@reduxjs/toolkit"
import {
  getProducts,
  addToFavProducts,
  getProduct,
  getBrands,
  getCategories,
  getRatings,
} from "./actions"

export const resetState = createAction("Reset_all")

export type Product = {
  _id: string
  title: string
  description: string
  price: 98
  category: string
  brand: string
  quantity: 98
  sold: 4
  images: {
    public_id: string
    url: string
    _id: string
  }[]
  tags: string[]
  totalRating: string
  ratings: any
  createdAt: string
  updatedAt: string
}

export type ProductState = {
  products: Product[]
  brands: any[]
  categories: any[]
  product: Product | null
  ratings: any
  isError: boolean
  isLoading: boolean
  isSuccess: boolean
  message: string
  addToFavProducts?: any
}

const initialState: ProductState = {
  products: [],
  brands: [],
  categories: [],
  product: null,
  ratings: null,
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
}

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getProducts.fulfilled, (state, action) => {
        state.products = action.payload
      })
      .addCase(getBrands.fulfilled, (state, action) => {
        state.brands = action.payload
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.categories = action.payload
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.product = action.payload
      })
      .addCase(addToFavProducts.fulfilled, (state, action) => {
        state.addToFavProducts = action.payload
      })
      .addCase(getRatings.fulfilled, (state, action) => {
        state.ratings = action.payload
      })
      .addCase(resetState, () => initialState)
  },
})
export default productSlice.reducer
