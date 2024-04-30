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
}

const initialState: CartState = {
  cart: null,
}

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(addToCart.fulfilled, (state, action) => {
        state.cart = action.payload
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.cart = action.payload
      })
      .addCase(resetState, () => initialState)
  },
})
export default cartSlice.reducer
