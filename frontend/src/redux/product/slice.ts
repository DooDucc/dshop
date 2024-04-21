import { createSlice, createAction } from "@reduxjs/toolkit"
import {
  getAllProducts,
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
  totalPages: number
  totalProducts: number
  brands: any[]
  categories: any[]
  product: Product | null
  ratings: any
  addToFavProducts?: any
}

const initialState: ProductState = {
  products: [],
  totalPages: 0,
  totalProducts: 0,
  brands: [],
  categories: [],
  product: null,
  ratings: null,
}

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.products = action.payload
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.products = action.payload?.data
        state.totalPages = action.payload?.totalPages
        state.totalProducts = action.payload?.totalProducts
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
