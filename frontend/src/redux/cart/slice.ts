import { createSlice, createAction } from "@reduxjs/toolkit"
import { addToCart, getCart } from "./actions"

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

export type ProductsCart = {
  price: number
  quantity: number
  productDetails: Product
}

export type CartState = {
  cart: {
    cartTotal: number
    orderby: string
    products: ProductsCart[]
  } | null
  isError: boolean
  isLoading: boolean
  isSuccess: boolean
  message: string
}

const initialState: CartState = {
  cart: null,
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
}

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(addToCart.pending, state => {
        state.isLoading = true
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.isSuccess = true
        state.cart = action.payload
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        state.message = action.error.message || ""
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.cart = action.payload
      })
      .addCase(resetState, () => initialState)
  },
})
export default cartSlice.reducer
